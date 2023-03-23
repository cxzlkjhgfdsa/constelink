package com.srp.constelinkmember.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkmember.api.service.KakaoPayService;
import com.srp.constelinkmember.common.exception.CustomException;
import com.srp.constelinkmember.common.exception.CustomExceptionType;
import com.srp.constelinkmember.dto.request.KakaoPayRequest;
import com.srp.constelinkmember.dto.response.KakaoApproveResponse;
import com.srp.constelinkmember.dto.response.KakaoReadyResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment")
@Tag(name = "카카오페이", description = "카카오페이 관련 API 입니다")
public class KakaoPayController {

	private final KakaoPayService kakaoPayService;

	@Operation(summary = "카카오페이 결제 준비", description = "카카오페이 결제 준비 메서드.")
	@PostMapping("/ready")
	public KakaoReadyResponse readyToKakaoPay(@RequestBody KakaoPayRequest kakaoPayRequest) {
		return kakaoPayService.kakaoPayReady(kakaoPayRequest);
	}

	@Operation(summary = "카카오페이 결제 취소 리다이렉트", description = "카카오페이 결제 취소시 리다이렉트 메서드.")
	@GetMapping("/cancel")
	public ResponseEntity cancelKakaoPay() {

		throw new CustomException(CustomExceptionType.KAKAO_PAY_CANCEL_EXCEPTION);
	}

	@Operation(summary = "카카오페이 결제 실패 리다이렉트", description = "카카오페이 결제 실패시 리다이렉트 메서드.")
	@GetMapping("/fail")
	public ResponseEntity failKakaoPay() {

		throw new CustomException(CustomExceptionType.KAKAO_PAY_FAIL_EXCEPTION);
	}

	@Operation(summary = "카카오페이 결제 성공시 리다이렉트", description = "카카오페이 결제 성공시 리다이렉트 메서드.")
	@GetMapping("/success")
	public ResponseEntity successKakaoPay(@RequestParam("pg_token") String pgToken) {
		System.out.println("여기왔어?");
		KakaoApproveResponse kakaoApprove = kakaoPayService.approveResponse(pgToken);
		return ResponseEntity.ok(kakaoApprove);
	}

}
