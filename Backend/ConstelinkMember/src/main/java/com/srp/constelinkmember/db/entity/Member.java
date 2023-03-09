package com.srp.constelinkmember.db.entity;

import com.srp.constelinkmember.dto.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "member")
public class Member {
    @Id
    @Column(name = "member_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Size(max = 50)
    @NotNull
    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Size(max = 50)
    @NotNull
    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Size(max = 100)
    @Column(name = "member_profile_img", length = 100)
    private String memberProfileImg;

    @NotNull
    @Column(name = "member_regdate", nullable = false)
    private LocalDateTime memberRegdate;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 10)
    private Role role;

    @Size(max = 100)
    @NotNull
    @Column(name = "social_id", nullable = false, length = 100)
    private String socialId;

    @NotNull
    @Column(name = "member_total_amount_raised", nullable = false)
    private int memberTotalAmountRaised;

    @NotNull
    @Column(name = "member_point", nullable = false)
    private int memberPoint;

    @NotNull
    @Column(name = "member_inactive", nullable = false)
    private Boolean memberInactive = false;

    @OneToMany
    private Set<Donation> donations = new LinkedHashSet<>();

}