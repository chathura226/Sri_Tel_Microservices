package com.recruitease.auth_service.DTO;

import com.recruitease.auth_service.DTO.LoggedUser.LoggedAdmin;
import com.recruitease.auth_service.DTO.LoggedUser.LoggedCustomer;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDetailsResponseDTO{

        //reqested ids
        private List<String> customerIdList;
        private List<String> adminIdList;

        //response lists
        private List<LoggedCustomer> customerList;
        private List<LoggedAdmin> adminList;

}
