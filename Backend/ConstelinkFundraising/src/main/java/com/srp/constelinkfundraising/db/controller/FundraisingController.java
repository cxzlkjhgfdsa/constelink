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

import com.srp.constelinkfundraising.db.dto.request.DonateRequest;
import com.srp.constelinkfundraising.db.dto.request.MakeFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.entity.Fundraising;
import com.srp.constelinkfundraising.db.service.FundraisingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "fundrasings", description = "기부 api")
@RestController
@RequestMapping("/api/fundraisings")
@RequiredArgsConstructor
public class FundraisingController {

	private final FundraisingService fundraisingService;

	@Operation(summary = "모든 기부가능 리스트 열람", description = "page, size 쿼리문으로 입력가능(default 값은 각각 1, 5)")
	@GetMapping("/all")
	public ResponseEntity<Page<FundraisingResponse>> getFundraisingsAll(
		@RequestParam(name = "page", required = false, defaultValue = "1") int page,
		@RequestParam(name = "size", required = false, defaultValue = "5") int size
	) {
		Page<FundraisingResponse> fundraisingResponsePage = fundraisingService.getFundraisings(page-1, size);
		return ResponseEntity.ok(fundraisingResponsePage);
	}
	@Operation(summary = "진행중인/마감된 기부들 열람", description = "page, size, done 쿼리문으로 입력가능(default 값은 각각 1, 5, false) done이 true면 닫힌 것 찾아옴")
	@GetMapping("")
	public ResponseEntity<Page<FundraisingResponse>> getFundraisingsByDone(
		@RequestParam(name = "page", required = false, defaultValue = "1") int page,
		@RequestParam(name = "size", required = false, defaultValue = "5") int size,
		@RequestParam(name = "done", required = false, defaultValue = "false") boolean done
	) {
		Page<FundraisingResponse> fundraisingResponsePage = fundraisingService.getFundraisingsByDone(page-1,size, done);
		return ResponseEntity.ok(fundraisingResponsePage);
	}
	@Operation(summary = "기부하기", description = "cash만큼 해당 기부 id로 더해줌")
	@PutMapping ("")
	public ResponseEntity<FundraisingResponse> donateFundraising(
		@RequestBody DonateRequest donateRequest
	) {
		FundraisingResponse fundraisingResponse = fundraisingService.donateFundraising(donateRequest);
		return ResponseEntity.ok(fundraisingResponse);
	}

	@Operation(summary = "기부 만들기", description = "기부 만들기")
	@PostMapping ("")
	public ResponseEntity<Fundraising> makeFundraising(
		@RequestBody MakeFundraisingRequest makeFundraisingRequest
	) {
		Fundraising fundraisingResponse = fundraisingService.makeFundraising(makeFundraisingRequest);
		return ResponseEntity.ok(fundraisingResponse);
	}
}
