package com.recruitease.auth_service.service;

import com.recruitease.auth_service.DTO.LoggedUser.LoggedAdmin;
import com.recruitease.auth_service.DTO.LoggedUser.LoggedCustomer;
import com.recruitease.auth_service.DTO.ResponseDTO;
import com.recruitease.auth_service.entity.Admin;
import com.recruitease.auth_service.entity.Customer;
import com.recruitease.auth_service.repository.*;
import com.recruitease.auth_service.util.CodeList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class UserService {

    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;
    private final AdminRepository adminRepository;

    private LoggedAdmin mapToLoggedAdmin(Admin res) {
        LoggedAdmin admin=modelMapper.map(res, LoggedAdmin.class);

        admin.setId(res.getUser().getId());
        admin.setEmail(res.getUser().getEmail());
        admin.setRole("admin");
        admin.setCreatedAt(res.getUser().getCreatedAt().toString());

        return admin;
    }
    private LoggedCustomer mapToLoggedCandidate(Customer res) {
        LoggedCustomer candidate=modelMapper.map(res, LoggedCustomer.class);

        candidate.setId(res.getUser().getId());
        candidate.setEmail(res.getUser().getEmail());
        candidate.setRole("candidate");
        candidate.setCreatedAt(res.getUser().getCreatedAt().toString());

        return candidate;
    }



    public ResponseDTO getCustomerDetails(String customerId) {
        var responseDTO=new ResponseDTO();
        var errors=new HashMap<String,String >();



        Customer res= customerRepository.findById(customerId).orElse(null);
        if(res!=null){
            LoggedCustomer candidate=modelMapper.map(res, LoggedCustomer.class);

            candidate.setId(res.getUser().getId());
            candidate.setEmail(res.getUser().getEmail());
            candidate.setSecurityQuestion(res.getUser().getSecurityQuestion());
            candidate.setRole("candidate");
            candidate.setCreatedAt(res.getUser().getCreatedAt().toString());


            responseDTO.setCode(CodeList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(candidate);
        }else{
            errors.put("candidate","Not found!");
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occurred!");
            responseDTO.setErrors(errors);
        }
        return responseDTO;
    }


    public ResponseDTO getAdminDetails(String adminId) {
        var responseDTO = new ResponseDTO();
        var errors = new HashMap<String, String>();

        Admin res=adminRepository.findById(adminId).orElse(null);
        if(res!=null){
            LoggedAdmin admin=modelMapper.map(res, LoggedAdmin.class);

            admin.setId(res.getUser().getId());
            admin.setEmail(res.getUser().getEmail());
            admin.setSecurityQuestion(res.getUser().getSecurityQuestion());
            admin.setRole("admin");
            admin.setCreatedAt(res.getUser().getCreatedAt().toString());


            responseDTO.setCode(CodeList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(admin);
        }else{
            errors.put("recruiter","Not found!");
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occurred!");
            responseDTO.setErrors(errors);
        }
        return responseDTO;

    }


}
