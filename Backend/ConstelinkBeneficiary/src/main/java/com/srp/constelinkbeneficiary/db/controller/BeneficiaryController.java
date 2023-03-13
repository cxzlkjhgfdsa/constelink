package com.srp.constelinkbeneficiary.db.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkbeneficiary.db.dto.request.BeneficiaryReqeust;
import com.srp.constelinkbeneficiary.db.dto.response.BeneficiaryInfoResponse;
import com.srp.constelinkbeneficiary.db.service.BeneficiaryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "수혜자 API", description = "수혜자 API")
@RestController
@RequestMapping("/api/beneficiaries")
@RequiredArgsConstructor
public class BeneficiaryController {

	private final BeneficiaryService beneficiaryService;

@Operation(summary = "수혜자 정보 조회", description = "수혜자 id로 수혜자 정보 가져오기")
	@GetMapping("/{id}")
	// 해당 수혜자 정보 가져오기
	public ResponseEntity<BeneficiaryInfoResponse> findBeneficiaryById (@PathVariable(value = "id") Long id) {

		BeneficiaryInfoResponse beneficiary = beneficiaryService.findBeneficiaryById(id);
		return ResponseEntity.ok(beneficiary);
	}

	@Operation(summary = "수혜자 목록 조회", description = "병원 id에 해당하는 수혜자들 모두 조회")
	@GetMapping("")
	// 하나의 병원에 있는 모든 수혜자 목록 가져오기
	public ResponseEntity<Page<BeneficiaryInfoResponse>> findBeneficiaryByHospitalId (
		@RequestParam(value = "hospitalId") Long hospitalId,
		@RequestParam(value = "page") int page,
		@RequestParam(value = "size") int size,
		@RequestParam(value = "sortBy") String sortby
	) {

		Page<BeneficiaryInfoResponse> beneficiaryInfoList = beneficiaryService.findBeneficiariesByHospitalId(hospitalId, page, size);
		return ResponseEntity.ok(beneficiaryInfoList);
	}

	@Operation(summary = "수혜자 등록", description = "병원 id, 수혜자 이름, 생년월일, 질병, 사진, 목표금액 필요. ")
	@PostMapping("")
	public ResponseEntity<BeneficiaryInfoResponse> addBeneficiary (
		@RequestBody BeneficiaryReqeust beneficiaryReqeust
	) {
		BeneficiaryInfoResponse beneficiaryInfoResponse = beneficiaryService.addBeneficiary(beneficiaryReqeust);

		return ResponseEntity.ok(beneficiaryInfoResponse);
	}



}
