package com.techspine.ecommerce.request;

public class UpdateCartItemRequest {
    private int quantity;

    public UpdateCartItemRequest(int quantity) {
        this.quantity = quantity;
    }

    public UpdateCartItemRequest() {
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
