package com.chathuralakshan.recruitease.billservice.controller;

import com.chathuralakshan.recruitease.billservice.DTO.BillCreationRequest;
import com.chathuralakshan.recruitease.billservice.DTO.BillPayment;
import com.chathuralakshan.recruitease.billservice.DTO.ResponseDTO;
import com.chathuralakshan.recruitease.billservice.entity.Bill;
import com.chathuralakshan.recruitease.billservice.entity.BillAccount;
import com.chathuralakshan.recruitease.billservice.service.BillService;
import com.chathuralakshan.recruitease.billservice.util.CodeList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillController {
    private final BillService billService;

    // Retrieve current acc
    @GetMapping("/my-account")
    public ResponseEntity<ResponseDTO> getCurrentBalance() {
        ResponseDTO res= billService.getCurrentBalance();
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res, HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create-bill-acc")
    public ResponseEntity<ResponseDTO> newAcc(@RequestBody BillAccount req) {
        ResponseDTO res= billService.createBillAcc(req);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res, HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create-bill")
    public ResponseEntity<ResponseDTO> newBill(@RequestBody BillCreationRequest req) {
        ResponseDTO res= billService.createBill(req);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res, HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }
    }

    // Retrieve bills
    @GetMapping("/my-bills")
    public ResponseEntity<ResponseDTO> getBills() {
        ResponseDTO res= billService.getMyBills();
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res, HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/pay-bill/{billId}")
    public ResponseEntity<ResponseDTO> newBill(@PathVariable String billId,@RequestBody BillPayment req) {
        ResponseDTO res= billService.payBill(billId,req);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res, HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }
    }
}
