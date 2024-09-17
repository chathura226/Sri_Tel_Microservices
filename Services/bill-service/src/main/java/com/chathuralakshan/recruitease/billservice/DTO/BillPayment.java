package com.chathuralakshan.recruitease.billservice.DTO;

public record BillPayment(
        String paymentMethod,
        Double amount
) {
}
