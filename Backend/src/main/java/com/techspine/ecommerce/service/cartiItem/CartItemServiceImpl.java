package com.techspine.ecommerce.service.cartiItem;

import com.techspine.ecommerce.entity.Cart;
import com.techspine.ecommerce.entity.CartItem;
import com.techspine.ecommerce.entity.Product;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.CartitemException;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.repository.CartItemRepository;
import com.techspine.ecommerce.repository.CartRepository;
import com.techspine.ecommerce.service.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService{
    private final CartItemRepository cartItemRepository;
    private CartRepository cartRepository;
    private final UserService userService;

    public CartItemServiceImpl(CartItemRepository cartItemRepository, CartRepository cartRepository, UserService userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.userService = userRepository;
    }

    @Override
    @Transactional
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());
        return cartItemRepository.save(cartItem);
    }

    @Override
    @Transactional
    public void updateCartItem(Long userId, Long id, int quantity) throws CartitemException, UserException {
        CartItem item = findCartItemById(id);
        User user = userService.findUserById(userId);

        if(userId.equals(user.getId())){
            item.setQuantity(quantity);
            item.setPrice(item.getProduct().getPrice()*item.getQuantity());
            item.setDiscountedPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());
        }
        cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
        return cartItemRepository.isCartItemExist(cart,product,size,userId);
    }

    @Override
    @Transactional
    public void removeCartItem(Long userId, Long cartItemId) throws CartitemException, UserException {

        CartItem item = findCartItemById(cartItemId);
        System.out.println("item " + item.getProduct().getColor());
        User user = userService.findUserById(item.getUserId());
        User reqUser = userService.findUserById(userId);

        if (user.getId() == reqUser.getId()){
            System.out.println("hello");
            cartItemRepository.deleteById(item.getId());
            System.out.println("delete ");
        }else{
            throw new UserException("You Can't Remove It");
        }


    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartitemException {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);

        if (cartItem.isPresent()){
            return cartItem.get();
        }
        throw new CartitemException("Item is not available");
    }
}
