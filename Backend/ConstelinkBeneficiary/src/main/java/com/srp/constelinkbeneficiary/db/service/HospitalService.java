package com.srp.constelinkbeneficiary.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkbeneficiary.common.exception.CustomException;
import com.srp.constelinkbeneficiary.common.exception.CustomExceptionType;
import com.srp.constelinkbeneficiary.db.dto.response.HospitalInfoResponse;
import com.srp.constelinkbeneficiary.db.entity.Hospital;
import com.srp.constelinkbeneficiary.db.repository.HospitalRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HospitalService {

	private final HospitalRepository hospitalRepository;

	public HospitalInfoResponse findHospitalById(Long id) {
		Hospital hospital = hospitalRepository.findHospitalById(id);
		if(hospital == null){
			throw new CustomException(CustomExceptionType.HOSPITAL_NOT_FOUND);
		}
		HospitalInfoResponse hospitalInfoResponse
			= HospitalInfoResponse.builder()
			.hospitalLink(hospital.getHospitalLink())
			.hospitalName(hospital.getHospitalName())
			.hospitalWalletAddress(hospital.getHospitalWalletAddress())
			.hospitalTotalBeneficiary(hospital.getHospitalTotalBeneficiary())
			.hospitalTotalAmountRaised(hospital.getHospitalTotalAmountRaised())
			.id(hospital.getId())
			.build();
		return hospitalInfoResponse;
	}

	public Page<Hospital> hospitalInfoList(int page, int size, int sortBy) {
		Page<Hospital> ResponseHospitalInfoList;
		// 0이면 오름차순+
		switch(sortBy){
			case 0:
				ResponseHospitalInfoList = hospitalRepository.findAll(PageRequest.of(page,size, Sort.by("id").ascending()));
				break;
			case 1:
				ResponseHospitalInfoList = hospitalRepository.findAll(PageRequest.of(page,size, Sort.by("id").descending()));
				break;
			default:
				ResponseHospitalInfoList = hospitalRepository.findAll(PageRequest.of(page,size, Sort.by("id").descending()));
				break;
		}

		return ResponseHospitalInfoList;
	}

}
