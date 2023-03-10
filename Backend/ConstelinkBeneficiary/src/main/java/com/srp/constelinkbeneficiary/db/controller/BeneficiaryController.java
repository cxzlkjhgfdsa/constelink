package com.srp.constelinkfundraising.db.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkfundraising.db.dto.response.ResponseBeneficiaryInfo;
import com.srp.constelinkfundraising.db.service.BeneficiaryService;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "beneficiaries", description = "수혜자 API")
@RestController
@RequestMapping("/api/beneficiaries")
@RequiredArgsConstructor
public class BeneficiaryController {

	private final BeneficiaryService beneficiaryService;

	@GetMapping("/{id}")
	// 해당 수혜자 정보 가져오기
	public ResponseEntity<ResponseBeneficiaryInfo> findBeneficiaryById (@PathVariable(value = "id") Long id) {

		ResponseBeneficiaryInfo beneficiary = beneficiaryService.findBeneficiaryById(id);
		return ResponseEntity.ok(beneficiary);
	}

	@GetMapping("")
	// 하나의 병원에 있는 모든 수혜자 목록 가져오기
	public ResponseEntity<List<ResponseBeneficiaryInfo>> findBeneficiaryByHospitalId (@RequestParam(value = "hospitalId") Long hospitalId) {

		List<ResponseBeneficiaryInfo> beneficiaryInfoList = beneficiaryService.findBeneficiariesByHospitalId(hospitalId);
		return ResponseEntity.ok(beneficiaryInfoList);
	}



}
