package com.techspine.ecommerce.service.user;

import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.repository.UserRepository;
import com.techspine.ecommerce.security.JwtProvider;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements com.techspine.ecommerce.service.user.UserService {

    private final UserRepository userRepository;
    protected JwtProvider jwtProvider;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserById(long userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()){
            return user.get();
        }
        throw new UserException("User Not Found");

    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromJwt(jwt);
        User user = userRepository.findByEmail(email);
        if (user==null){
            throw new UserException("User Not Found");
        }
        return user;
    }
}
