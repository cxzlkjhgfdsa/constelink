package com.srp.constelinkbeneficiary.db.service;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkbeneficiary.common.exception.CustomException;
import com.srp.constelinkbeneficiary.common.exception.CustomExceptionType;
import com.srp.constelinkbeneficiary.db.dto.common.BeneficiariesByRegDateDTO;
import com.srp.constelinkbeneficiary.db.dto.enums.BeneficiarySortType;
import com.srp.constelinkbeneficiary.db.dto.request.BeneficiaryReqeust;
import com.srp.constelinkbeneficiary.db.dto.response.BeneficiaryInfoResponse;
import com.srp.constelinkbeneficiary.db.entity.Beneficiary;
import com.srp.constelinkbeneficiary.db.entity.Hospital;
import com.srp.constelinkbeneficiary.db.entity.RecoveryDiary;
import com.srp.constelinkbeneficiary.db.repository.BeneficiaryRepository;
import com.srp.constelinkbeneficiary.db.repository.HospitalRepository;
import com.srp.constelinkbeneficiary.db.repository.RecoveryDiaryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BeneficiaryService {

	private final BeneficiaryRepository beneficiaryRepository;
	private final HospitalRepository hospitalRepository;
	private final RecoveryDiaryRepository recoveryDiaryRepository;

	public BeneficiaryInfoResponse findBeneficiaryById(Long id) {
		System.out.println("확인1");
		Beneficiary beneficiary = beneficiaryRepository.findBeneficiaryById(id)
			.orElseThrow(() -> new CustomException(CustomExceptionType.BENEFICIARY_NOT_FOUND));
		System.out.println("확인2");
		BeneficiaryInfoResponse beneficiaryInfoDto = BeneficiaryInfoResponse.builder()
			.beneficiaryDisease(beneficiary.getBeneficiaryDisease())
			.beneficiaryAmountGoal(beneficiary.getBeneficiaryAmountGoal())
			.beneficiaryAmountRaised(beneficiary.getBeneficiaryAmountRaised())
			.beneficiaryName(beneficiary.getBeneficiaryName())
			.beneficiaryPhoto(beneficiary.getBeneficiaryPhoto())
			.beneficiaryBirthday(beneficiary.getBeneficiaryBirthday().getTime())
			.hospitalId(beneficiary.getHospital().getId())
			.hospitalName(beneficiary.getHospital().getHospitalName())
			.hospitalLink(beneficiary.getHospital().getHospitalLink())
			.beneficiaryId(beneficiary.getId())
			.build();
		System.out.println("확인3");
		return beneficiaryInfoDto;
	}

	public Page<BeneficiaryInfoResponse> findBeneficiariesByHospitalId(Long hospitalId, int page, int size) {
		Page<Beneficiary> beneficiaryPage = beneficiaryRepository.findBeneficiariesByHospitalId(hospitalId,
			PageRequest.of(page, size));
		Page<BeneficiaryInfoResponse> beneficiaryInfoList = beneficiaryPage.map(m -> BeneficiaryInfoResponse.builder()
			.beneficiaryName(m.getBeneficiaryName())
			.beneficiaryBirthday(m.getBeneficiaryBirthday().getTime())
			.beneficiaryPhoto(m.getBeneficiaryPhoto())
			.beneficiaryAmountRaised(m.getBeneficiaryAmountRaised())
			.beneficiaryAmountGoal(m.getBeneficiaryAmountGoal())
			.beneficiaryDisease(m.getBeneficiaryDisease())
			.hospitalLink(m.getHospital().getHospitalLink())
			.hospitalId(m.getHospital().getId())
			.hospitalName(m.getHospital().getHospitalName())
			.beneficiaryId(m.getId())
			.build()
		);

		return beneficiaryInfoList;
	}

	@Transactional
	public BeneficiaryInfoResponse addBeneficiary(BeneficiaryReqeust beneficiaryReqeust) {
		Beneficiary beneficiary = new Beneficiary().builder()
			.hospital(hospitalRepository.findHospitalById(beneficiaryReqeust.getHospitalId())
				.orElseThrow(() -> new CustomException(
					CustomExceptionType.HOSPITAL_NOT_FOUND)))
			.beneficiaryName(beneficiaryReqeust.getBeneficiaryName())
			.beneficiaryDisease(beneficiaryReqeust.getBeneficiaryDisease())
			.beneficiaryPhoto(beneficiaryReqeust.getBeneficiaryPhoto())
			.beneficiaryAmountGoal(beneficiaryReqeust.getBeneficiaryAmountGoal())
			.beneficiaryStatus("RAISING")
			.beneficiaryBirthday(beneficiaryReqeust.getBeneficiaryBirthday())
			.build();
		beneficiary = beneficiaryRepository.saveAndFlush(beneficiary);

		BeneficiaryInfoResponse beneficiaryInfoDto = BeneficiaryInfoResponse.builder()
			.beneficiaryDisease(beneficiary.getBeneficiaryDisease())
			.beneficiaryAmountGoal(beneficiary.getBeneficiaryAmountGoal())
			.beneficiaryAmountRaised(beneficiary.getBeneficiaryAmountRaised())
			.beneficiaryName(beneficiary.getBeneficiaryName())
			.beneficiaryPhoto(beneficiary.getBeneficiaryPhoto())
			.beneficiaryBirthday(beneficiary.getBeneficiaryBirthday().getTime())
			.beneficiaryId(beneficiary.getId())
			.hospitalName(beneficiary.getHospital().getHospitalName())
			.hospitalId(beneficiary.getHospital().getId())
			.hospitalLink(beneficiary.getHospital().getHospitalLink())
			.beneficiaryId(beneficiary.getId())
			.build();
		return beneficiaryInfoDto;
	}

	public Page<BeneficiaryInfoResponse> findAllBeneficiary(int page, int size, BeneficiarySortType beneficiarySortType) {

		Page<Beneficiary> beneficiaryPage;
		switch (beneficiarySortType) {
			case ALL:
				beneficiaryPage = beneficiaryRepository.findAll(PageRequest.of(page, size, Sort.by("id").ascending()));
				break;
			case NAME_ASC:
				beneficiaryPage = beneficiaryRepository.findAll(PageRequest.of(page, size, Sort.by("beneficiaryName").ascending()));
				break;
			case NAME_DESC:
				beneficiaryPage = beneficiaryRepository.findAll(PageRequest.of(page, size, Sort.by("beneficiaryName").descending()));
				break;
			case AGE_ASC:
				beneficiaryPage = beneficiaryRepository.findAll(PageRequest.of(page, size, Sort.by("beneficiaryBirthday").ascending()));
				break;
			case AGE_DESC:
				beneficiaryPage = beneficiaryRepository.findAll(PageRequest.of(page, size, Sort.by("beneficiaryBirthday").descending()));
				break;
			case FUND_RAISED_ASC:
				beneficiaryPage = beneficiaryRepository.findAll(PageRequest.of(page, size, Sort.by("beneficiaryAmountRaised").ascending()));
				break;
			case FUND_RAISED_DESC:
				beneficiaryPage = beneficiaryRepository.findAll(PageRequest.of(page, size, Sort.by("beneficiaryAmountRaised").descending()));
				break;
			default:
				beneficiaryPage = beneficiaryRepository.findAll(PageRequest.of(page, size, Sort.by("id").ascending()));
				break;
		}
		Page<BeneficiaryInfoResponse> beneficiaryInfoResponsePage = beneficiaryPage.map(beneficiary ->
			BeneficiaryInfoResponse.builder()
				.beneficiaryDisease(beneficiary.getBeneficiaryDisease())
				.beneficiaryAmountGoal(beneficiary.getBeneficiaryAmountGoal())
				.beneficiaryAmountRaised(beneficiary.getBeneficiaryAmountRaised())
				.beneficiaryName(beneficiary.getBeneficiaryName())
				.beneficiaryPhoto(beneficiary.getBeneficiaryPhoto())
				.beneficiaryBirthday(beneficiary.getBeneficiaryBirthday().getTime())
				.hospitalId(beneficiary.getHospital().getId())
				.hospitalName(beneficiary.getHospital().getHospitalName())
				.hospitalLink(beneficiary.getHospital().getHospitalLink())
				.beneficiaryId(beneficiary.getId())
				.build()
			);
		return beneficiaryInfoResponsePage;
	}

	public Page<BeneficiaryInfoResponse> findBeneficiariesByRegdate(int page, int size, BeneficiarySortType beneficiarySortType) {

		Page<Map<String,Object>> beneficiariesByRegDateDTOPage;
		switch (beneficiarySortType) {
			case DIARY_DATE_DESC:
				beneficiariesByRegDateDTOPage = recoveryDiaryRepository.findAlltoPageDesc(PageRequest.of(page,size));

				break;
			case DIARY_DATE_ASC:
			default:
				beneficiariesByRegDateDTOPage = recoveryDiaryRepository.findAlltoPageAsc(PageRequest.of(page,size));
				break;
		}
		// Page<BeneficiaryInfoResponse> beneficiaryInfoResponsePage = null;
		// System.out.println(beneficiariesByRegDateDTOPage);
		// System.out.println(beneficiariesByRegDateDTOPage.getContent().get(0));
		// System.out.println("값 ======= " + beneficiariesByRegDateDTOPage.getContent().get(0).get("beneficiary"));
		// Beneficiary beneficiary = (Beneficiary)beneficiariesByRegDateDTOPage.getContent().get(0).get("beneficiary");
		// System.out.println(beneficiary.getId());
		// System.out.println(beneficiariesByRegDateDTOPage.getContent().get(0).get("beneficiary"));

		Page<BeneficiaryInfoResponse> beneficiaryInfoResponsePage = beneficiariesByRegDateDTOPage.map(item ->
			{
				Beneficiary beneficiary = (Beneficiary)item.get("beneficiary");
				Hospital hospital = (Hospital)item.get("hospital");
				return BeneficiaryInfoResponse.builder()
					.beneficiaryDisease(beneficiary.getBeneficiaryDisease())
					.beneficiaryAmountGoal(beneficiary.getBeneficiaryAmountGoal())
					.beneficiaryAmountRaised(beneficiary.getBeneficiaryAmountRaised())
					.beneficiaryName(beneficiary.getBeneficiaryName())
					.beneficiaryPhoto(beneficiary.getBeneficiaryPhoto())
					.beneficiaryBirthday(beneficiary.getBeneficiaryBirthday().getTime())
					.hospitalId(hospital.getId())
					.hospitalName(hospital.getHospitalName())
					.hospitalLink(hospital.getHospitalLink())
					.beneficiaryId(beneficiary.getId())
					.build();
			}

		);
		// System.out.println("123123");
		return beneficiaryInfoResponsePage;
	}

}
