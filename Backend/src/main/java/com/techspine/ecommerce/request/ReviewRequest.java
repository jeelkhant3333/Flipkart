package com.techspine.ecommerce.request;

public class ReviewRequest {
    private Long id;
    private String review;

    public ReviewRequest() {
    }

    public ReviewRequest(Long id, String review) {
        this.id = id;
        this.review = review;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
