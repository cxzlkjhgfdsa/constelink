package com.srp.constelinkmember.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkmember.api.service.KakaoPayService;
import com.srp.constelinkmember.dto.request.KakaoPayRequest;
import com.srp.constelinkmember.dto.response.KakaoApproveResponse;
import com.srp.constelinkmember.dto.response.KakaoReadyResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment")
public class KakaoPayController {

	private final KakaoPayService kakaoPayService;

	@PostMapping("/ready")
	public KakaoReadyResponse readyToKakaoPay(@RequestBody KakaoPayRequest kakaoPayRequest) {
		return kakaoPayService.kakaoPayReady(kakaoPayRequest);
	}

	@GetMapping("/cancel")
	public ResponseEntity cancelKakaoPay() {
		return ResponseEntity.ok("결제취소");
	}

	@GetMapping("/fail")
	public ResponseEntity failKakaoPay() {
		return ResponseEntity.ok("결제 실패");
	}

	@GetMapping("/success")
	public ResponseEntity successKakaoPay(@RequestParam("pg_token") String pgToken) {
		System.out.println("여기왔어?");
		KakaoApproveResponse kakaoApprove = kakaoPayService.approveResponse(pgToken);
		return ResponseEntity.ok(kakaoApprove);
	}

}
