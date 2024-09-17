package com.chathuralakshan.recruitease.billservice.DTO;

import java.time.LocalDate;

public record BillCreationRequest(
        String billAccId,
        Double amount,
        String status,
        LocalDate billingPeriodStart,
        LocalDate billingPeriodEnd
) {
}
