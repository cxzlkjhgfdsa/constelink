package com.srp.constelinkmember.dto;

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
public class LoginInfoDto {
	String accessToken;
	String refreshToken;
	String nickname;
	String profile;
}
