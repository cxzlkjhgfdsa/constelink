package com.srp.constelinkmember.grpc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkmember.HospitalInfoRes;
import com.srp.constelinkmember.db.repository.DonationRepository;
import com.srp.constelinkmember.dto.enums.Role;
import com.srp.constelinkmember.grpc.service.HospitalGrpcClientService;
import com.srp.constelinkmember.security.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TestController {

	private final HospitalGrpcClientService hospitalGrpcClientService;
	private final DonationRepository donationRepository;
	private final TokenProvider tokenProvider;

	@GetMapping("/test/grpc")
	public String testGrpc() {
		HospitalInfoRes hospitalInfo = hospitalGrpcClientService.getHospitalInfo(1L);

		StringBuilder sb = new StringBuilder();
		sb
			.append("이름 : " + hospitalInfo.getName()).append("\n")
			.append("총 금액: " + hospitalInfo.getTotalAmount()).append("\n")
			.append("수혜자 수: " + hospitalInfo.getBeneficiaryCount()).append("\n")
			.append("지갑 주소: " + hospitalInfo.getWalletAddress()).append("\n")
			.append("병원 링크: " + hospitalInfo.getLink());

		return sb.toString();
	}

	// @GetMapping("test/dona")
	// public String getDona() {
	// 	Map<String, Objects> donationInfo = donationRepository.getDonationInfo(1L);
	// 	String tf = donationInfo.get("totalFundCount") + "";
	// 	String td = donationInfo.get("totalDonationPrice") + "";
	// 	int itf = Integer.parseInt(tf);
	// 	int itd = Integer.parseInt(td);
	// 	System.out.println(itd + itf);
	//
	// 	return donationInfo.get("totalFundCount") + " : " + donationInfo.get("totalDonationPrice");
	// }

	@GetMapping("test/token")
	public String getToken() {
		String accessToken = tokenProvider.createAccessToken(1L, Role.MEMBER);
		return accessToken;
	}

}
