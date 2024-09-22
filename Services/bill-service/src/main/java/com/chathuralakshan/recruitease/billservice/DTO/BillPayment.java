package com.chathuralakshan.recruitease.billservice.DTO;

public record BillPayment(
        String paymentMethod,
        String email,
        Double amount
) {
}
