package com.techspine.ecommerce.service.cart;

import com.techspine.ecommerce.entity.Cart;
import com.techspine.ecommerce.entity.CartItem;
import com.techspine.ecommerce.entity.Product;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.CartitemException;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.repository.CartRepository;
import com.techspine.ecommerce.request.AddItemRequest;
import com.techspine.ecommerce.service.cartiItem.CartItemService;
import com.techspine.ecommerce.service.product.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final CartItemService cartItemService;
    private final ProductService productService;

    public CartServiceImpl(CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    @Transactional
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(req.getProductId());

        CartItem cartItem = cartItemService.isCartItemExist(cart,product, req.getSize(), userId);

        if (cartItem == null){
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setCart(cart);
            newItem.setQuantity(req.getQuantity());
            newItem.setUserId(userId);
            newItem.setPrice(req.getQuantity()* product.getDiscountedPrice());
            newItem.setSize(req.getSize());

            CartItem createCartItem = cartItemService.createCartItem(newItem);
            cart.getCartItems().add(createCartItem);
        }
        return "Item Added";
    }

    @Override
    public Cart findUserCart(Long userId) {
//        System.out.println("findUserCart");
        Cart cart = cartRepository.findByUserId(userId);
//        System.out.println("get cart " + cart);
        int totalPrice=0;
        int totalDiscountedPrice=0;
        int totalItem=0;

        for (CartItem cartItem : cart.getCartItems()){
            totalPrice+=cartItem.getPrice();
            totalDiscountedPrice+=cartItem.getDiscountedPrice();
            totalItem+=cartItem.getQuantity();
        }

        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItem(totalItem);
        cart.setDiscount(totalPrice-totalDiscountedPrice);
        return  cartRepository.save(cart);
    }

    @Override
    @Transactional
    public String removeCartItem(Long userId, Long itemId) throws UserException, CartitemException {
        Cart cart = cartRepository.findByUserId(userId);
        CartItem item = cartItemService.findCartItemById(itemId);
        cart.getCartItems().remove(item);
        return "Item Removed";
    }
}
