package com.techspine.ecommerce.controller;

import com.techspine.ecommerce.entity.Cart;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.repository.UserRepository;
import com.techspine.ecommerce.request.LoginRequest;
import com.techspine.ecommerce.response.AuthResponse;
import com.techspine.ecommerce.security.JwtProvider;
import com.techspine.ecommerce.service.CustomUserServiceImpl;
import com.techspine.ecommerce.service.cart.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserServiceImpl customUserService;
    private final CartService cartService;

    AuthController( CartService cartService,UserRepository userRepository,PasswordEncoder passwordEncoder,CustomUserServiceImpl customUserService,JwtProvider jwtProvider){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.customUserService=customUserService;
        this.jwtProvider=jwtProvider;
        this.cartService=cartService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException{
        String email=user.getEmail();
        String password=user.getPassword();
        String firstName= user.getFirstName();
        String lastName= user.getLastName();

        User isEmailExist=userRepository.findByEmail(email);
        if(isEmailExist!=null){
            throw new UserException("This email is already used with another account.");
        }
        User createdUser=new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);

        User savedUser=userRepository.save(createdUser);
        Cart cart=cartService.createCart(savedUser);

        Authentication authentication=new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token=jwtProvider.generateToken(authentication);
        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signup Success...");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest){
        String username= loginRequest.getEmail();
        String password= loginRequest.getPassword();

        Authentication authentication=authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);
        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signin Success...");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails=customUserService.loadUserByUsername(username);
        if(userDetails==null){
            throw new BadCredentialsException("Invalid username...");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password...");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
