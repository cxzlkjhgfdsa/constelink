package com.srp.constelinkbeneficiary.db.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkbeneficiary.db.dto.request.BeneficiaryReqeust;
import com.srp.constelinkbeneficiary.db.dto.response.BeneficiaryInfoResponse;
import com.srp.constelinkbeneficiary.db.entity.Beneficiary;
import com.srp.constelinkbeneficiary.db.repository.BeneficiaryRepository;
import com.srp.constelinkbeneficiary.db.repository.HospitalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BeneficiaryService {

	private final BeneficiaryRepository beneficiaryRepository;
	private final HospitalRepository hospitalRepository;

	public BeneficiaryInfoResponse findBeneficiaryById(Long id) {

		Beneficiary beneficiary = beneficiaryRepository.findBeneficiaryById(id);

		BeneficiaryInfoResponse beneficiaryInfoDto = BeneficiaryInfoResponse.builder()
			.beneficiaryDisease(beneficiary.getBeneficiaryDisease())
			.beneficiaryAmountGoal(beneficiary.getBeneficiaryAmountGoal())
			.beneficiaryAmountRaised(beneficiary.getBeneficiaryAmountRaised())
			.beneficiaryName(beneficiary.getBeneficiaryName())
			.beneficiaryPhoto(beneficiary.getBeneficiaryPhoto())
			.beneficiaryBirthday(beneficiary.getBeneficiaryBirthday())
			.build();
		return beneficiaryInfoDto;
	}

	public Page<BeneficiaryInfoResponse> findBeneficiariesByHospitalId(Long hospitalId, int page, int size) {

		Page<Beneficiary>beneficiaryPage = beneficiaryRepository.findBeneficiariesByHospitalId(hospitalId, PageRequest.of(page, size));

		Page<BeneficiaryInfoResponse> beneficiaryInfoList = beneficiaryPage.map(m -> BeneficiaryInfoResponse.builder()
				.beneficiaryName(m.getBeneficiaryName())
				.beneficiaryBirthday(m.getBeneficiaryBirthday())
				.beneficiaryPhoto(m.getBeneficiaryPhoto())
				.beneficiaryAmountRaised(m.getBeneficiaryAmountRaised())
				.beneficiaryAmountGoal(m.getBeneficiaryAmountGoal())
				.beneficiaryDisease(m.getBeneficiaryDisease())
				.build()
			);

		return beneficiaryInfoList;
	}

	public BeneficiaryInfoResponse addBeneficiary(BeneficiaryReqeust beneficiaryReqeust) {
		Beneficiary beneficiary = new Beneficiary().builder()
			.hospital(hospitalRepository.findHospitalById(beneficiaryReqeust.getHospitalId()))
			.beneficiaryName(beneficiaryReqeust.getName())
			.beneficiaryDisease(beneficiaryReqeust.getDisease())
			.beneficiaryPhoto(beneficiaryReqeust.getPhoto())
			.beneficiaryAmountGoal(beneficiaryReqeust.getAmountGoal())
			.beneficiaryStatus("RAISING")
			.beneficiaryBirthday(beneficiaryReqeust.getBirthday())
			.build();
		beneficiary =beneficiaryRepository.saveAndFlush(beneficiary);

		BeneficiaryInfoResponse beneficiaryInfoDto = BeneficiaryInfoResponse.builder()
			.beneficiaryDisease(beneficiary.getBeneficiaryDisease())
			.beneficiaryAmountGoal(beneficiary.getBeneficiaryAmountGoal())
			.beneficiaryAmountRaised(beneficiary.getBeneficiaryAmountRaised())
			.beneficiaryName(beneficiary.getBeneficiaryName())
			.beneficiaryPhoto(beneficiary.getBeneficiaryPhoto())
			.beneficiaryBirthday(beneficiary.getBeneficiaryBirthday())
			.build();
		return beneficiaryInfoDto;
	}



}
