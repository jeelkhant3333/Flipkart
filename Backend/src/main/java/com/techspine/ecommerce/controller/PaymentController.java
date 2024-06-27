package com.techspine.ecommerce.controller;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.techspine.ecommerce.entity.Order;
import com.techspine.ecommerce.exception.OrderException;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.repository.OrderRepository;
import com.techspine.ecommerce.response.PaymentLinkResponse;
import com.techspine.ecommerce.service.order.OrderService;
import com.techspine.ecommerce.service.user.UserService;
import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private OrderService orderService;
    private UserService userService;
    private OrderRepository orderRepository;

    @Autowired
    public PaymentController(OrderService orderService, UserService userService, OrderRepository orderRepository) {
        this.orderService = orderService;
        this.userService = userService;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, OrderException {
        Order order = orderService.findOrderById(orderId);

        try {
            RazorpayClient razorpayClient = new RazorpayClient("rzp_test_GxrdUt2fPKV4Q0", "fn2MP5OJHw3NAv0zteomIQOA");
            JSONObject paymentLinkRequest = getPaymentLinkRequest(order);

            PaymentLink paymentLink = razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentId = paymentLink.get("id");
            String paymentUrl = paymentLink.get("short_url");

            PaymentLinkResponse response = new PaymentLinkResponse();

            response.setPayment_link_id(paymentId);
            response.setPayment_link_url(paymentUrl);

            return new ResponseEntity<PaymentLinkResponse>(response, HttpStatus.CREATED);

        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/payments")
    public ResponseEntity<Order> updatePayment(
            @RequestParam (name = "payment_id") String paymentId,
            @RequestParam(name = "order_id") Long orderId
    ) throws OrderException, RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient("rzp_test_GxrdUt2fPKV4Q0", "fn2MP5OJHw3NAv0zteomIQOA");
        Order order = orderService.findOrderById(orderId);

        try {
            Payment orderPayment = razorpayClient.payments.fetch(paymentId);

            if (orderPayment.get("status").equals("captured")) {
                order.setOrderStatus("PLACED");
                order.getPaymentDetails().setPaymentId(paymentId);
                order.getPaymentDetails().setStatus("COMPLETED");

                orderRepository.save(order);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

//        ApiResponse response = new ApiResponse();
//        response.setMessage("Your Order IS Placed");
//        response.setStatus(true);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @NotNull
    private static JSONObject getPaymentLinkRequest(Order order) {
        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", order.getTotalDiscountedPrice() * 100);
        paymentLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", order.getUser().getFirstName());
        customer.put("contact", order.getUser().getMobile());
        customer.put("email", order.getUser().getEmail());

        paymentLinkRequest.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("SMS", true);
        notify.put("email", true);

        paymentLinkRequest.put("notify", notify);

        paymentLinkRequest.put("callback_url", "http://localhost:4200/payment-success?order_id=" + order.getId());
        paymentLinkRequest.put("callback_method", "get");
        return paymentLinkRequest;
    }
}
