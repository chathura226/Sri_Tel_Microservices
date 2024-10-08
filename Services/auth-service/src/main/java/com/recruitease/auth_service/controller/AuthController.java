package com.recruitease.auth_service.controller;

import com.recruitease.auth_service.DTO.*;
import com.recruitease.auth_service.config.CustomUserDetails;
import com.recruitease.auth_service.service.AuthService;
import com.recruitease.auth_service.util.CodeList;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;



    @PostMapping("/register-customer")
    public ResponseEntity<ResponseDTO> registerCandidate(@RequestBody @Valid CustomerRequest request) {
        ResponseDTO res= authService.registerCustomer(request);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res,HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }

    }



    @PostMapping("/register-admin")
    public ResponseEntity<ResponseDTO> registerAdmin(@RequestBody @Valid AdminModeratorRequest request) {
        ResponseDTO res= authService.registerAdmin(request);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res,HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }
    }

    //login?
    @PostMapping("/token")
    public ResponseEntity getToken(@RequestBody AuthRequest request) throws AuthenticationException {




        Authentication authenticate= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        if(authenticate.isAuthenticated()){
            CustomUserDetails obj= (CustomUserDetails) authenticate.getPrincipal();


            SessionObjectResponse tokenRes=authService.generateSessionObj(obj.getId());


            return new ResponseEntity<>(tokenRes,HttpStatus.OK);
        }else{
            var responseDto=new ResponseDTO();
            responseDto.setErrors("Incorrect email or password");
            return new ResponseEntity<>(responseDto,HttpStatus.UNAUTHORIZED);
        }
    }


    //todo: token validation refine for springboot gateway
    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestParam("token") String token) {
        if(authService.validateToken(token)){
            return ResponseEntity.ok().body("Token is valid");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }


    @GetMapping("/forgot-password")
    public ResponseEntity<ResponseDTO> getSecurityQ(@RequestParam("email") String email) {
        ResponseDTO res= authService.getSecurityQuestion(email);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res,HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/reset-password")
    public ResponseEntity<ResponseDTO> resetPassword(@RequestBody @Valid ResetPass request) {
        ResponseDTO res= authService.resetPassword(request);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res,HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/test")
//    public ResponseEntity<String> test(@RequestHeader("loggedInUser") String loggedInUser) throws JsonProcessingException {
//
//        //example of mapping user object in header to a DTO
//        ObjectMapper objectMapper = new ObjectMapper();
//        LoggedUserHeader user= objectMapper.readValue(loggedInUser, LoggedUserHeader.class);
//        if(user.role().equals("candidate")){
//            LoggedCandidate candidate=modelMapper.map(user.roleDetails(), LoggedCandidate.class);
//            candidate.setId(user.id());
//            candidate.setEmail(user.email());
//            candidate.setRole(user.role());
//            candidate.setIsActive(user.isActive());
//            candidate.setCreatedAt(user.createdAt());
//            return ResponseEntity.status(HttpStatus.OK).body(candidate.toString());
//        } else if (user.role().equals("recruiter")) {
//            LoggedRecruiter recruiter=modelMapper.map(user.roleDetails(), LoggedRecruiter.class);
//            recruiter.setId(user.id());
//            recruiter.setEmail(user.email());
//            recruiter.setRole(user.role());
//            recruiter.setIsActive(user.isActive());
//            recruiter.setCreatedAt(user.createdAt());
//            return ResponseEntity.status(HttpStatus.OK).body(recruiter.toString());
//        }else if (user.role().equals("admin")) {
//            LoggedAdmin admin=modelMapper.map(user.roleDetails(), LoggedAdmin.class);
//            admin.setId(user.id());
//            admin.setEmail(user.email());
//            admin.setRole(user.role());
//            admin.setIsActive(user.isActive());
//            admin.setCreatedAt(user.createdAt());
//            return ResponseEntity.status(HttpStatus.OK).body(admin.toString());
//        }else if (user.role().equals("moderator")){
//            LoggedModerator moderator=modelMapper.map(user.roleDetails(), LoggedModerator.class);
//            moderator.setId(user.id());
//            moderator.setEmail(user.email());
//            moderator.setRole(user.role());
//            moderator.setIsActive(user.isActive());
//            moderator.setCreatedAt(user.createdAt());
//            return ResponseEntity.status(HttpStatus.OK).body(moderator.toString());
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body("failed");
//    }

    //TODO: refresh token
//        @GetMapping("/refresh")
//        public ResponseEntity<String> validateToken(@RequestHeader
//                                                            Map<String, String> headers) {
//            headers.forEach((key, value) -> {
//                System.out.println(String.format("Header '%s' = %s", key, value));
//            });
//                return ResponseEntity.status(HttpStatus.OK).body("refresh");
//        }
}
