package com.srp.constelinkbeneficiary.db.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkbeneficiary.db.dto.enums.SortType;
import com.srp.constelinkbeneficiary.db.dto.request.RecoveryDiaryRequest;
import com.srp.constelinkbeneficiary.db.dto.response.RecoveryDiaryResponse;
import com.srp.constelinkbeneficiary.db.entity.RecoveryDiary;
import com.srp.constelinkbeneficiary.db.service.RecoveryDiaryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "회복일지 API", description = "회복일지 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recoverydiaries")
public class RecoveryDiaryController {
	private final RecoveryDiaryService recoveryDiaryService;

	@Operation(summary = "회복일지 목록 조회", description = "page, size, sortBy 값 필요. dafault값 오름차순 ")
	@GetMapping("")
	public ResponseEntity<Page<RecoveryDiaryResponse>> getRecoveryDiaries(
		@RequestParam(value = "page", required = false, defaultValue = "1") int page,
		@RequestParam(value = "size", required = false, defaultValue = "5") int size,
		@RequestParam(value = "sort_by", required = false, defaultValue = "ID_ASC") SortType sortType) {
		Page<RecoveryDiaryResponse> recoveryDiaries = recoveryDiaryService.getRecoveryDiaryList(page-1, size, sortType);
		return ResponseEntity.ok(recoveryDiaries);
	}


	@Operation(summary = "회복일지 등록", description = "수혜자 id, 일기 제목, 일기 내용, 사용한 돈, 사진url 기입가능")
	@PostMapping("")
	public ResponseEntity<RecoveryDiaryResponse> addRecoveryDiary(
		@RequestBody RecoveryDiaryRequest recoveryDiaryRequest
	) {
		return ResponseEntity.ok(recoveryDiaryService.addRecoveryDiary(recoveryDiaryRequest));
	}


}
