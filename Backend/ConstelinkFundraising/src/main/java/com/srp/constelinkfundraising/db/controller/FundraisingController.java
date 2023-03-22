package com.srp.constelinkfundraising.db.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkfundraising.db.dto.enums.FundraisingSortType;
import com.srp.constelinkfundraising.db.dto.request.DonateRequest;
import com.srp.constelinkfundraising.db.dto.request.MakeFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.FundraisingBeneficiaryResponse;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.entity.Fundraising;
import com.srp.constelinkfundraising.db.service.FundraisingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "fundrasings", description = "기부 api")
@RestController
@RequestMapping("/fundraisings")
@RequiredArgsConstructor
public class FundraisingController {

	private final FundraisingService fundraisingService;

	@Operation(summary = "기부 리스트들 열람", description = "page, size, sortType 쿼리문으로 입력가능(default 값은 각각 1, 5, ALL) "
		+ "sort_by는 ALL, FINISHED, UNFINISHED, START_DATE_ASC, START_DATE_DESC, END_DATE_ASC, END_DATE_DESC 이 존재")
	@GetMapping("")
	public ResponseEntity<Page<FundraisingResponse>> getFundraisings(
		@RequestParam(name = "page", required = false, defaultValue = "1") int page,
		@RequestParam(name = "size", required = false, defaultValue = "5") int size,
		@RequestParam(name = "sort_by", required = false, defaultValue = "ALL") FundraisingSortType sortType,
		@RequestParam(name = "memerId", required = false, defaultValue = "0") Long memberId
	) {

		Page<FundraisingResponse> fundraisingResponses
			= fundraisingService.getFundraisings(page - 1, size, sortType, memberId);
		return ResponseEntity.ok(fundraisingResponses);
	}

	@Operation(summary = "기부 리스트들 수혜자정보와 함께 열람", description =
		"page, size, sortType 쿼리문으로 입력가능(default 값은 각각 1, 5, ALL) "
			+ "sort_by는 ALL, FINISHED, UNFINISHED, START_DATE_ASC, START_DATE_DESC, END_DATE_ASC, END_DATE_DESC 이 존재")
	@GetMapping("/withbeneficiary")
	public ResponseEntity<Page<FundraisingBeneficiaryResponse>> getFundraisingsBeneficiaries(
		@RequestParam(name = "page", required = false, defaultValue = "1") int page,
		@RequestParam(name = "size", required = false, defaultValue = "5") int size,
		@RequestParam(name = "sort_by", required = false, defaultValue = "ALL") FundraisingSortType sortType
	) {
		Page<FundraisingBeneficiaryResponse> fundraisingBeneficiaryResponses
			= fundraisingService.getFundraisingsBeneficiaries(page - 1, size, sortType, 0L);
		return ResponseEntity.ok(fundraisingBeneficiaryResponses);
	}

	@Operation(summary = "기부하기", description = "cash만큼 해당 기부 id로 더해줌 (id, cash) 기입")
	@PutMapping("")
	public ResponseEntity<FundraisingResponse> donateFundraising(
		@RequestBody DonateRequest donateRequest
	) {
		FundraisingResponse fundraisingResponse = fundraisingService.donateFundraising(donateRequest);
		return ResponseEntity.ok(fundraisingResponse);
	}

	@Operation(summary = "기부 만들기", description = "beneficiaryId, categoryId, fundraisingAmountGoal, fundraisingEndTime, fundraisingTitle, fundraisingStory, fundraisingThumbnail 기입")
	@PostMapping("")
	public ResponseEntity<Fundraising> makeFundraising(
		@RequestBody MakeFundraisingRequest makeFundraisingRequest
	) {
		Fundraising fundraisingResponse = fundraisingService.makeFundraising(makeFundraisingRequest);
		return ResponseEntity.ok(fundraisingResponse);
	}
}
