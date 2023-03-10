package com.srp.constelinkfundraising.db.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkfundraising.db.dto.response.ResponseBeneficiaryInfo;
import com.srp.constelinkfundraising.db.entity.Beneficiary;
import com.srp.constelinkfundraising.db.repository.BeneficiaryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BeneficiaryService {

	private final BeneficiaryRepository beneficiaryRepository;

	public ResponseBeneficiaryInfo findBeneficiaryById(Long id) {

		Beneficiary beneficiary = beneficiaryRepository.findBeneficiaryById(id);

		ResponseBeneficiaryInfo beneficiaryInfoDto = ResponseBeneficiaryInfo.builder()
			.beneficiaryDisease(beneficiary.getBeneficiaryDisease())
			.beneficiaryAmountGoal(beneficiary.getBeneficiaryAmountGoal())
			.beneficiaryAmountRaised(beneficiary.getBeneficiaryAmountRaised())
			.beneficiaryName(beneficiary.getBeneficiaryName())
			.beneficiaryPhoto(beneficiary.getBeneficiaryPhoto())
			.beneficiaryBirthday(beneficiary.getBeneficiaryBirthday())
			.build();
		return beneficiaryInfoDto;
	}

	public List<ResponseBeneficiaryInfo> findBeneficiariesByHospitalId(Long hospitalId) {

		List<Beneficiary>beneficiaryList = beneficiaryRepository.findBeneficiariesByHospitalId(hospitalId);

		List<ResponseBeneficiaryInfo> beneficiaryInfoList = beneficiaryList.stream()
			.map(m -> ResponseBeneficiaryInfo.builder()
				.beneficiaryName(m.getBeneficiaryName())
				.beneficiaryBirthday(m.getBeneficiaryBirthday())
				.beneficiaryPhoto(m.getBeneficiaryPhoto())
				.beneficiaryAmountRaised(m.getBeneficiaryAmountRaised())
				.beneficiaryAmountGoal(m.getBeneficiaryAmountGoal())
				.beneficiaryDisease(m.getBeneficiaryDisease())
				.build()
			).collect(Collectors.toList());

		return beneficiaryInfoList;
	}
}
