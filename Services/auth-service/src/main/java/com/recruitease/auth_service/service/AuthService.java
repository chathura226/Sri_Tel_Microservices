package com.recruitease.auth_service.service;

import com.recruitease.auth_service.DTO.*;
import com.recruitease.auth_service.DTO.roleDetails.AdminRoleDetail;
import com.recruitease.auth_service.DTO.roleDetails.CustomerRoleDetail;
import com.recruitease.auth_service.entity.Admin;
import com.recruitease.auth_service.entity.Customer;
import com.recruitease.auth_service.entity.UserCredential;
import com.recruitease.auth_service.repository.AdminRepository;
import com.recruitease.auth_service.repository.CustomerRepository;
import com.recruitease.auth_service.repository.UserCredentialRepository;
import com.recruitease.auth_service.util.CodeList;
import com.recruitease.auth_service.util.RoleList;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserCredentialRepository repository;
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AdminRepository adminRepository;
    private final KafkaTemplate<String, NotificationEvent> kafkaTemplate;

    public String saveUser(AuthRequest request) {

        //mapping
        UserCredential userCredential= modelMapper.map(request,UserCredential.class);
        //encrypting password
        userCredential.setPassword(passwordEncoder.encode(userCredential.getPassword()));
        //saving to db
        var user=repository.save(userCredential);
        return user.getId();
    }

    public String generateToken(String userId,Map<String, Object> claims){
        return jwtService.generateToken(userId,claims);
    }

    public Boolean validateToken(String token){
        System.out.println(token);
        return jwtService.validateToken(token);
    }

    @Transactional //to make it save both as one transaction
    public ResponseDTO registerCustomer(CustomerRequest request) {
        var responseDTO=new ResponseDTO();

        var errors=new HashMap<String,String >();


        //mapping
        UserCredential userCredential= modelMapper.map(request,UserCredential.class);
        Customer customer = modelMapper.map(request, Customer.class);
        //encrypting password
        userCredential.setPassword(passwordEncoder.encode(userCredential.getPassword()));
        //set role
        userCredential.setRole(RoleList.ROLE_CUSTOMER);


        //validations
        if(repository.existsByEmail(userCredential.getEmail())){
            errors.put("email","Email address already exists!");
        }
        if(customerRepository.existsByMobileNumber(customer.getMobileNumber())){
            errors.put("mobileNumber","Mobile Number already exists!");
        }

        if(errors.isEmpty()){
            //saving to db
            var user=repository.save(userCredential);
            customer.setUser(user);
            var candidateObj= customerRepository.save(customer);

            responseDTO.setCode(CodeList.RSP_SUCCESS);
            responseDTO.setMessage("Customer registered successfully");
            responseDTO.setContent(user.getId());

            NotificationEvent notificationEvent = new NotificationEvent();
            notificationEvent.setRecipient(request.email());
            notificationEvent.setType("email");
            notificationEvent.setMessage("We are pleased to inform you that have registered with our customer care app successfully.\n" +
                    "\n" +
                    "If you have any questions or need further assistance, feel free to contact our support team.\n" +
                    "\n" +
                    "Thank you for choosing SriTel.");
            kafkaTemplate.send("new-topic", notificationEvent);

        }else {
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occurred!");
            responseDTO.setErrors(errors);

        }
        return responseDTO;


    }



    @Transactional
    public ResponseDTO registerAdmin(AdminModeratorRequest request) {
        var responseDTO=new ResponseDTO();

        var errors=new HashMap<String,String >();
        //mapping
        UserCredential userCredential= modelMapper.map(request,UserCredential.class);
        Admin admin= modelMapper.map(request,Admin.class);
        //encrypting password
        userCredential.setPassword(passwordEncoder.encode(userCredential.getPassword()));
        //set role
        userCredential.setRole(RoleList.ROLE_ADMIN);

//validations
        if(repository.existsByEmail(userCredential.getEmail())){
            errors.put("email","Email address already exists!");
        }
        if(adminRepository.existsByMobileNumber(admin.getMobileNumber())){
            errors.put("mobileNumber","Mobile Number already exists!");
        }

        if(errors.isEmpty()){
            //saving to db
            var user=repository.save(userCredential);
            admin.setUser(user);
            var adminObj=adminRepository.save(admin);

            responseDTO.setCode(CodeList.RSP_SUCCESS);
            responseDTO.setMessage("Admin registered successfully");
            responseDTO.setContent(user.getId());

        }else {
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occurred!");
            responseDTO.setErrors(errors);

        }

        return responseDTO;

    }

    public SessionObjectResponse generateSessionObj(String userId) throws AuthenticationException {
            //not checking whether its present since we already authenticated
        try{
            UserCredential user=repository.findById(userId).get();

            SessionObjectResponse res=modelMapper.map(user,SessionObjectResponse.class);



            //roleDetails object to add to jwt without sensitive data
            Map<String, Object> roleDetails=new HashMap<>();



            //get  obj relevant to role
            if(user.getRole().equals(RoleList.ROLE_CUSTOMER)){
                res.setRole("customer");
                Customer customer = customerRepository.findByUserId(userId).get();
                CustomerRoleDetail roleDetail=modelMapper.map(customer, CustomerRoleDetail.class);
                res.setRoleDetails(roleDetail);

                //details for jwt claims
                roleDetails.put("firstName", customer.getFirstName());
                roleDetails.put("lastName", customer.getLastName());
                roleDetails.put("customerId", customer.getCustomerId());
                roleDetails.put("mobileNumber", customer.getMobileNumber());

            } else if (user.getRole().equals(RoleList.ROLE_ADMIN)) {
                res.setRole("admin");
                Admin admin=adminRepository.findByUserId(userId).get();
                AdminRoleDetail roleDetail=modelMapper.map(admin,AdminRoleDetail.class);
                res.setRoleDetails(roleDetail);


                //details for jwt claims
                roleDetails.put("firstName",admin.getFirstName());
                roleDetails.put("lastName",admin.getLastName());
                roleDetails.put("adminId",admin.getAdminId());
                roleDetails.put("mobileNumber", admin.getMobileNumber());

            }

            //claims to add to jwt without sensitive data
            Map<String, Object> claims=new HashMap<>();
            claims.put("id",userId);
            claims.put("email",res.getEmail());
            claims.put("role",res.getRole());
            claims.put("createdAt",res.getCreatedAt());
            claims.put("roleDetails",roleDetails);


            res.setAccessToken(this.generateToken(userId,claims));
            return res;
        }catch (Exception e){
            throw new AuthenticationException("Error while authenticating!");
        }


    }

    public ResponseDTO getSecurityQuestion(String email) {
        var responseDTO=new ResponseDTO();

            Optional<UserCredential> user=repository.findByEmail(email);
            if(user.isPresent()){
                responseDTO.setCode(CodeList.RSP_SUCCESS);
                responseDTO.setMessage("Security Question retrieved successfully");
                responseDTO.setContent(user.get().getSecurityQuestion());
                return responseDTO;
            }
        responseDTO.setCode(CodeList.RSP_NO_DATA_FOUND);
        responseDTO.setMessage("User not found");

        return responseDTO;
    }

    @Transactional
    public ResponseDTO resetPassword(@Valid ResetPass request) {
        var responseDTO=new ResponseDTO();
        try{
            UserCredential user=repository.findByEmail(request.email()).get();

            if(user.getSecurityQuestion().equals(request.securityQuestion()) && user.getAnswer().equals(request.answer())){
                user.setPassword(passwordEncoder.encode(request.newPassword()));
                responseDTO.setCode(CodeList.RSP_SUCCESS);
                responseDTO.setMessage("Password changed successfully");
                return responseDTO;

            }
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occured!");
            return responseDTO;

        }catch (Exception e){
            responseDTO.setCode(CodeList.RSP_ERROR);
            responseDTO.setMessage("Error Occured!");
            return responseDTO;
        }

    }
}
