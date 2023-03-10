package com.srp.constelinkfundraising.db.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkfundraising.db.entity.Fundraising;
import com.srp.constelinkfundraising.db.service.FundraisingService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "fundrasings", description = "펀드 api")
@RestController
@RequestMapping("/api/fundraisings")
@RequiredArgsConstructor
public class FundraisingController {

	private final FundraisingService fundraisingService;

	@GetMapping("")
	public ResponseEntity<Page<Fundraising>> getFundRaisingByDone(
		@RequestParam(name = "page", required = false, defaultValue = "1") int page,
		@RequestParam(name = "size", required = false, defaultValue = "5") int size,
		@RequestParam(name = "done", required = false, defaultValue = "true") boolean done
	) {
		Page<Fundraising> fundraisingPage = fundraisingService.getFundraisingsByDone(page,size, done);
		return ResponseEntity.ok(fundraisingPage);
	}

}
