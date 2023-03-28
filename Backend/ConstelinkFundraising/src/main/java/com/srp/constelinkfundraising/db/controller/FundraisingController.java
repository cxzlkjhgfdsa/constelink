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
import com.srp.constelinkfundraising.db.dto.response.StatisticsResponse;
import com.srp.constelinkfundraising.db.entity.Fundraising;
import com.srp.constelinkfundraising.db.service.FundraisingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "fundrasings", description = "기부 api")
@RestController
@RequestMapping("/fundraisings")
@RequiredArgsConstructor
@Slf4j
public class FundraisingController {

	private final FundraisingService fundraisingService;

	@Operation(summary = "기부 리스트 열람 (memberId적으면 bookmark 반영되어 나옴), 병원이름 + 수혜자 이름 다 나옴", description =
		"page = 페이지, size = 한 페이지당 데이터 수, sortBy = 정렬타입, "
			+ "☆ memberId 적으면 bookmark가 체크되어서 나옴(나중에는 Header token까서 반영 예정) memberId = 회원 Id ")
	@GetMapping("")
	public ResponseEntity<Page<FundraisingResponse>> getFundraisings(
		@RequestParam(name = "page", required = false, defaultValue = "1") int page,
		@RequestParam(name = "size", required = false, defaultValue = "5") int size,
		@RequestParam(name = "sortBy", required = false, defaultValue = "ALL") FundraisingSortType sortType,
		@RequestParam(name = "memberId", required = false, defaultValue = "0") Long memberId
	) {
		Page<FundraisingResponse> fundraisingResponses
			= fundraisingService.getFundraisings(page - 1, size, sortType, memberId);
		return ResponseEntity.ok(fundraisingResponses);
	}

	@Operation(summary = "기부 리스트보기(병원 이름, 수혜자이름X)", description =
		"page = 페이지, size = 한 페이지당 데이터 수, sortBy = 정렬 타입")
	@GetMapping("/withbeneficiary")
	public ResponseEntity<Page<FundraisingBeneficiaryResponse>> getFundraisingsBeneficiaries(
		@RequestParam(name = "page", required = false, defaultValue = "1") int page,
		@RequestParam(name = "size", required = false, defaultValue = "5") int size,
		@RequestParam(name = "sortBy", required = false, defaultValue = "ALL") FundraisingSortType sortType
	) {
		Page<FundraisingBeneficiaryResponse> fundraisingBeneficiaryResponses
			= fundraisingService.getFundraisingsBeneficiaries(page - 1, size, sortType, 0L);
		return ResponseEntity.ok(fundraisingBeneficiaryResponses);
	}

	@Operation(summary = "기부하기 (서버간 통신 전용)", description = "fundraisingId = 기부 Id, cash = 기부금액"
		+ ", 이 API는 기부내역 테이블에 반영한뒤 함께 반영되길 권장.(백엔드에서 통신 연결 예정)")
	@PostMapping("/donate")
	public ResponseEntity<String> donateFundraising(
		@RequestBody DonateRequest donateRequest
	) {
		log.info("요청 도착 == " + donateRequest.getFundraisingId() + " 확인 " + donateRequest.getCash());
		Boolean check = fundraisingService.donateFundraising(donateRequest);
		return ResponseEntity.ok("ok");
	}

	@Operation(summary = "기부 만들기", description = "beneficiaryId = 수혜자 Id, categoryId = 카테고리 Id,"
		+ " fundraisingAmountGoal = 기부 목표 금액, fundraisingEndTime = 기부 마감 시간,"
		+ " fundraisingTitle = 기부 제목, fundraisingStory = 기부 사연(내용), fundraisingThumbnail = 기부 썸네일")
	@PostMapping("")
	public ResponseEntity<Fundraising> makeFundraising(
		@RequestBody MakeFundraisingRequest makeFundraisingRequest
	) {
		Fundraising fundraisingResponse = fundraisingService.makeFundraising(makeFundraisingRequest);
		return ResponseEntity.ok(fundraisingResponse);
	}

	@Operation(summary = "기부 통계 가져오기", description = "기부 통계 가져오기")
	@GetMapping("/statistics")
	public ResponseEntity<StatisticsResponse> donateFundraising() {
		StatisticsResponse statisticsResponse = fundraisingService.getFundraisingStatistics();
		return ResponseEntity.ok(statisticsResponse);
	}
}
