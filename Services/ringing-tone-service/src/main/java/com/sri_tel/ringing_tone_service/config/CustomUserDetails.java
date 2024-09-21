package com.sri_tel.ringing_tone_service.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@Setter
@ToString
public class CustomUserDetails implements UserDetails {

    private final ModelMapper modelMapper;


    private final String id;
    private final String email;
    private final String role;
    private final String isActive;
    private final String createdAt;
    private AdminDetails adminDetails=null;
    private CustomerDetails customerDetails =null;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(String id, String email, String role, String isActive, String createdAt, Object roleDetails, Collection<? extends GrantedAuthority> authorities,ModelMapper modelMapper){
        this.modelMapper = modelMapper;
        this.id = id;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.authorities = authorities;
        if(role.equals("customer")){
            customerDetails =modelMapper.map(roleDetails, CustomerDetails.class);
        }else if (role.equals("admin")) {
            adminDetails=modelMapper.map(roleDetails, AdminDetails.class);
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return id;
    }
}
