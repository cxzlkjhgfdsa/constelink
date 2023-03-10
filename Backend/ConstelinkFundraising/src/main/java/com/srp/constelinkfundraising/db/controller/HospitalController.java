package com.srp.constelinkfundraising.db.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkfundraising.db.dto.response.ResponseHospitalInfo;
import com.srp.constelinkfundraising.db.entity.Hospital;
import com.srp.constelinkfundraising.db.service.HospitalService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@Tag(name = "hospitals", description = "병원 API")
@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

	private final HospitalService hospitalService;

	@GetMapping("/{id}")
	public ResponseEntity<ResponseHospitalInfo> findHospital(@PathVariable("id") Long id) {
		ResponseHospitalInfo responseHospitalInfo = hospitalService.findHospitalById(id);
		return ResponseEntity.ok(responseHospitalInfo);
	}

	@GetMapping("")
	public ResponseEntity<Page<Hospital>> getHospitalPage(
		@RequestParam(value = "page", required = false, defaultValue = "1") int page,
		@RequestParam(value = "showNum", required = false, defaultValue = "5") int showNum,
		@RequestParam(value = "order", required = false, defaultValue = "0") int order) {
		// order:0 오름차순, order:1 내림차순
		// page는 0페이지부터 시작
		Page<Hospital> hospitalPage = hospitalService.hospitalInfoList(page-1, showNum, order);
		return ResponseEntity.ok(hospitalPage);
	}

}
