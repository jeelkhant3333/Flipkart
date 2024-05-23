package com.techspine.ecommerce.request;

public class RatingRequest {

    private Long id;
    private double rating;

    public RatingRequest() {
    }

    public RatingRequest(Long id, double rating) {
        this.id = id;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
