package com.srp.constelinkbeneficiary.db.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkbeneficiary.db.dto.enums.BeneficiarySortType;
import com.srp.constelinkbeneficiary.db.dto.enums.HospitalSortType;
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

	@Operation(summary = "수혜자 정보 조회", description = "수혜자 id로 수혜자 정보 가져오기 (id) 기입")
	@GetMapping("/{id}")
	// 해당 수혜자 정보 가져오기
	public ResponseEntity<BeneficiaryInfoResponse> findBeneficiaryById(@PathVariable(value = "id") Long id) {

		BeneficiaryInfoResponse beneficiary = beneficiaryService.findBeneficiaryById(id);
		return ResponseEntity.ok(beneficiary);
	}

	@Operation(summary = "수혜자 목록 조회", description = "hospitalId, page, size, sort_by 필요. default값 page=1, size=5, sort_by = ALL ")
	@GetMapping("")
	// 하나의 병원에 있는 모든 수혜자 목록 가져오기
	public ResponseEntity<Page<BeneficiaryInfoResponse>> findBeneficiaryByHospitalId(
		@RequestParam(value = "hospitalId") Long hospitalId,
		@RequestParam(value = "page", required = false, defaultValue = "1") int page,
		@RequestParam(value = "size", required = false, defaultValue = "5") int size,
		@RequestParam(value = "sort_by", required = false, defaultValue = "ALL") BeneficiarySortType sortType
	) {
		Page<BeneficiaryInfoResponse> beneficiaryInfoList = beneficiaryService.findBeneficiariesByHospitalId(hospitalId,
			page - 1, size);
		return ResponseEntity.ok(beneficiaryInfoList);
	}

	@Operation(summary = "수혜자 등록", description = "hospitalId, name, birthday, disease, photo, amountGoal 기입")
	@PostMapping("")
	public ResponseEntity<BeneficiaryInfoResponse> addBeneficiary(
		@RequestBody BeneficiaryReqeust beneficiaryReqeust
	) {
		BeneficiaryInfoResponse beneficiaryInfoResponse = beneficiaryService.addBeneficiary(beneficiaryReqeust);

		return ResponseEntity.ok(beneficiaryInfoResponse);
	}

}
