package com.chathuralakshan.recruitease.billservice.service;

import com.chathuralakshan.recruitease.billservice.DTO.BillCreationRequest;
import com.chathuralakshan.recruitease.billservice.DTO.BillPayment;
import com.chathuralakshan.recruitease.billservice.DTO.NotificationEvent;
import com.chathuralakshan.recruitease.billservice.DTO.ResponseDTO;
import com.chathuralakshan.recruitease.billservice.config.CustomUserDetails;
import com.chathuralakshan.recruitease.billservice.entity.Bill;
import com.chathuralakshan.recruitease.billservice.entity.BillAccount;
import com.chathuralakshan.recruitease.billservice.entity.Payment;
import com.chathuralakshan.recruitease.billservice.repository.BillAccountRepository;
import com.chathuralakshan.recruitease.billservice.repository.BillRepository;
import com.chathuralakshan.recruitease.billservice.repository.PaymentRepository;
import com.chathuralakshan.recruitease.billservice.util.CodeList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BillService {
    private final BillAccountRepository billAccountRepository;
    private final BillRepository billRepository;
    private final ModelMapper modelMapper;
    private final PaymentRepository paymentRepository;

    private final KafkaTemplate<String, NotificationEvent> kafkaTemplate;

    public ResponseDTO getCurrentBalance() {
        var responseDTO=new ResponseDTO();
        try{
        //get mobileNumber of logged user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String mobileNumber=userDetails.getCustomerDetails().getMobileNumber();
            System.out.println("mobile num:;;;;;;;;;;;;;;;; "+mobileNumber);
            Optional<BillAccount> acc=billAccountRepository.findByMobileNumber(mobileNumber);
            if(acc.isPresent()) {

                System.out.println(acc);
                responseDTO.setCode(CodeList.RSP_SUCCESS);
                responseDTO.setMessage("Account found!");
                responseDTO.setContent(acc);
            }else{
                responseDTO.setCode(CodeList.RSP_ERROR);
                responseDTO.setMessage("Account not found!");
                responseDTO.setContent(acc);
            }
            return responseDTO;

        }catch (Exception e){
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occured!");
            return responseDTO;
        }
    }

    public ResponseDTO createBillAcc(BillAccount req) {
        var responseDTO=new ResponseDTO();
        try{
            BillAccount acc=billAccountRepository.save(req);
            responseDTO.setCode(CodeList.RSP_SUCCESS);
            responseDTO.setMessage("Account created successfully!");
            responseDTO.setContent(acc.getBillAccId());
            return responseDTO;

        }catch (Exception e){
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occured!");
            return responseDTO;
        }
    }

    public ResponseDTO getMyBills() {
        var responseDTO=new ResponseDTO();
        try{
            //get mobileNumber of logged user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            String mobileNumber=userDetails.getCustomerDetails().getMobileNumber();
            System.out.println("mobile num:;;;;;;;;;;;;;;;; "+mobileNumber);
            Optional<BillAccount> acc=billAccountRepository.findByMobileNumber(mobileNumber);
            if(acc.isPresent()) {


                List<Bill> billList=billRepository.findAllByBillAccount(acc.get());


                System.out.println(acc);
                responseDTO.setCode(CodeList.RSP_SUCCESS);
                responseDTO.setMessage("Bill List retrieved successfully!");
                responseDTO.setContent(billList);
            }else{
                responseDTO.setCode(CodeList.RSP_ERROR);
                responseDTO.setMessage("Account not found!");
                responseDTO.setContent(acc);
            }
            return responseDTO;

        }catch (Exception e){
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occured!");
            return responseDTO;
        }
    }

    @Transactional
    public ResponseDTO createBill(BillCreationRequest req) {
        var responseDTO=new ResponseDTO();
        try{
            Optional<BillAccount> acc=billAccountRepository.findById(req.billAccId());
            if(acc.isPresent()) {

                Bill bill= modelMapper.map(req,Bill.class);
                bill.setBillAccount(acc.get());
                Bill billRes = billRepository.save(bill);
                acc.get().setCurrentBalance(acc.get().getCurrentBalance()+billRes.getAmount()); //updating balance
                responseDTO.setCode(CodeList.RSP_SUCCESS);
                responseDTO.setMessage("Bill created successfully!");
                responseDTO.setContent(billRes.getBillId());
            }else{
                responseDTO.setCode(CodeList.RSP_ERROR);
                responseDTO.setMessage("Account not found!");
                responseDTO.setContent(acc);
            }
            return responseDTO;

        }catch (Exception e){
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occured!");
            return responseDTO;
        }
    }

    @Transactional
    public ResponseDTO payBill(String billId, BillPayment req) {
        var responseDTO=new ResponseDTO();
        try{
            Optional<Bill> bill=billRepository.findById(billId);

            if(bill.isPresent()) {
                Bill billGet=bill.get();
                Payment payment=new Payment();
                payment.setPaymentMethod(req.paymentMethod());
                payment.setAmount(billGet.getAmount());

                Payment resPayment=paymentRepository.save(payment);

                BillAccount billAccount=billAccountRepository.findById(bill.get().getBillAccount().getBillAccId()).get();
                billAccount.setCurrentBalance(billAccount.getCurrentBalance()-resPayment.getAmount());
                billGet.setPayment(resPayment);
                billGet.setStatus("PAID");

                billRepository.save(billGet);
                billAccountRepository.save(billAccount);

                responseDTO.setCode(CodeList.RSP_SUCCESS);
                responseDTO.setMessage("Bill payment was successful!");

                NotificationEvent notificationEvent = new NotificationEvent();
                notificationEvent.setRecipient(req.email());
                notificationEvent.setType("email");
                notificationEvent.setMessage("We are pleased to inform you that your recent payment has been successfully processed.\n" +
                        "\n" +
                        "If you have any questions or need further assistance, feel free to contact our support team.\n" +
                        "\n" +
                        "Thank you for choosing SriTel.");
                kafkaTemplate.send("new-topic", notificationEvent);
            }else{
                responseDTO.setCode(CodeList.RSP_ERROR);
                responseDTO.setMessage("Bill not found!");
            }
            return responseDTO;

        }catch (Exception e){
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occured!");
            return responseDTO;
        }
    }
}
