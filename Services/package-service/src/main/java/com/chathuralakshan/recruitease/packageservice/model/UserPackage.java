package com.chathuralakshan.recruitease.packageservice.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class UserPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id")
    private String userId;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private SriPackage sriPackage;
}
