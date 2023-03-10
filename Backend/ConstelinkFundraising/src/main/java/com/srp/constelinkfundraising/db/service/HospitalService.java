package com.srp.constelinkfundraising.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkfundraising.common.exception.CustomException;
import com.srp.constelinkfundraising.common.exception.CustomExceptionType;
import com.srp.constelinkfundraising.db.dto.response.ResponseHospitalInfo;
import com.srp.constelinkfundraising.db.entity.Hospital;
import com.srp.constelinkfundraising.db.repository.HospitalRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HospitalService {

	private final HospitalRepository hospitalRepository;

	public ResponseHospitalInfo findHospitalById(Long id) {
		Hospital hospital = hospitalRepository.findHospitalById(id);
		if(hospital == null){
			throw new CustomException(CustomExceptionType.HOSPITAL_NOT_FOUND);
		}
		ResponseHospitalInfo responseHospitalInfo
			= ResponseHospitalInfo.builder()
			.hospitalLink(hospital.getHospitalLink())
			.hospitalName(hospital.getHospitalName())
			.hospitalWalletAddress(hospital.getHospitalWalletAddress())
			.hospitalTotalBeneficiary(hospital.getHospitalTotalBeneficiary())
			.hospitalTotalAmountRaised(hospital.getHospitalTotalAmountRaised())
			.id(hospital.getId())
			.build();
		return responseHospitalInfo;
	}

	public Page<ResponseHospitalInfo> hospitalInfoList(int page, int size, int order) {
		Page<Hospital> ResponseHospitalInfoList;
		// 0이면 오름차순
		switch(order){
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

		return ResponseHospitalInfoList.map(hospital -> new ResponseHospitalInfo()
				.builder()
				.id(hospital.getId())
				.hospitalLink(hospital.getHospitalLink())
				.hospitalTotalAmountRaised(hospital.getHospitalTotalAmountRaised())
				.hospitalName(hospital.getHospitalName())
				.hospitalTotalBeneficiary(hospital.getHospitalTotalBeneficiary())
				.hospitalWalletAddress(hospital.getHospitalWalletAddress())
				.build()
		);
	}

}
