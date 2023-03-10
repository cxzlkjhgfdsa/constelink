package com.srp.constelinkfundraising.db.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkfundraising.db.entity.RecoveryDiary;
import com.srp.constelinkfundraising.db.service.RecoveryDiaryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recoverydiaries")
public class RecoveryDiaryController {
	private final RecoveryDiaryService recoveryDiaryService;

	@GetMapping("")
	public Page<RecoveryDiary> getRecoveryDiaries(
		@RequestParam(value = "page", required = false, defaultValue = "1") int page,
		@RequestParam(value = "showNum", required = false, defaultValue = "5") int showNum,
		@RequestParam(value = "order", required = false, defaultValue = "0") int order) {
		Page<RecoveryDiary> recoveryDiaries = recoveryDiaryService.getRecoveryDiaryList(page-1, showNum, order);
		return recoveryDiaries;
	}

}
