package com.srp.constelinkmember.api.controller;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkmember.api.service.MemberService;
import com.srp.constelinkmember.common.exception.CustomException;
import com.srp.constelinkmember.common.exception.CustomExceptionType;
import com.srp.constelinkmember.db.entity.Member;
import com.srp.constelinkmember.dto.LoginInfoDto;
import com.srp.constelinkmember.dto.request.LoginRequest;
import com.srp.constelinkmember.dto.response.LoginResponse;
import com.srp.constelinkmember.security.jwt.TokenProvider;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Tag(name = "멤버", description = "멤버 관련 api 입니다.")
@Slf4j
public class AuthController {
	private final MemberService memberService;

	@Operation(summary = "로그인 메서드", description = "로그인 메서드입니다.")
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){

		LoginInfoDto loginInfoDto = memberService.login(loginRequest);

		HttpHeaders httpHeaders = new HttpHeaders();
		//httpHeaders.add("Access-Control-Expose-Headers", "Authorization, Set-Cookie");
		httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + loginInfoDto.getAccessToken());
		httpHeaders.add("refresh",  loginInfoDto.getRefreshToken());

		LoginResponse loginResponse = LoginResponse.builder()
			.nickname(loginInfoDto.getNickname())
			.profile(loginInfoDto.getProfile())
			.build();

		return ResponseEntity.ok().headers(httpHeaders).body(loginResponse);
	}
}
