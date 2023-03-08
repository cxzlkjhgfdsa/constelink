package com.srp.constelinkmember.db.entity;

import java.time.LocalDateTime;

import com.srp.constelinkmember.dto.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "member")
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id", nullable = false)
	private Long id;

	@Column(name = "username", length = 50)
	private String username;

	@Column(name = "email", length = 50)
	private String email;

	@Column(name = "member_profile_img", length = 100)
	private String memberProfileImg;

	@Column(name = "member_regdate", nullable = false)
	private LocalDateTime memberRegdate;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false, length = 10)
	private Role role;

	@Column(name = "social_id", length = 100)
	private String socialId;

	@Column(name = "member_total_amount_raised", nullable = false)
	private int memberTotalAmountRaised;

	@Column(name = "member_point", nullable = false)
	private int memberPoint;

}