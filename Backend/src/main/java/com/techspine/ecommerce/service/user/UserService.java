package com.techspine.ecommerce.service.user;

import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.UserException;

public interface UserService {

    public User findUserById(long userId) throws UserException;
    public User findUserProfileByJwt(String jwt) throws UserException;
}
