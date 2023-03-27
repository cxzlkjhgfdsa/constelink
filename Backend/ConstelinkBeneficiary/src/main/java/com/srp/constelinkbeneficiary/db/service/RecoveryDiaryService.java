package com.srp.constelinkbeneficiary.db.service;

import java.time.ZoneId;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkbeneficiary.common.exception.CustomException;
import com.srp.constelinkbeneficiary.common.exception.CustomExceptionType;
import com.srp.constelinkbeneficiary.db.dto.enums.RecoveryDiarySortType;
import com.srp.constelinkbeneficiary.db.dto.request.RecoveryDiaryRequest;
import com.srp.constelinkbeneficiary.db.dto.response.BeneficiaryInfoResponse;
import com.srp.constelinkbeneficiary.db.dto.response.RecoveryDiaryBeneficiaryResponse;
import com.srp.constelinkbeneficiary.db.dto.response.RecoveryDiaryResponse;
import com.srp.constelinkbeneficiary.db.entity.Beneficiary;
import com.srp.constelinkbeneficiary.db.entity.RecoveryDiary;
import com.srp.constelinkbeneficiary.db.repository.BeneficiaryRepository;
import com.srp.constelinkbeneficiary.db.repository.RecoveryDiaryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecoveryDiaryService {
	private final RecoveryDiaryRepository recoveryDiaryRepository;
	private final BeneficiaryRepository beneficiaryRepository;

	public Page<RecoveryDiaryResponse> getRecoveryDiaryList(int page, int size, RecoveryDiarySortType sortType) {
		Page<RecoveryDiary> recoveryDiaryPage;

		switch (sortType) {
			case ID_ASC:
				recoveryDiaryPage = recoveryDiaryRepository.findAll(
					PageRequest.of(page, size, Sort.by("id").ascending()));
				break;
			case ID_DESC:
				recoveryDiaryPage = recoveryDiaryRepository.findAll(
					PageRequest.of(page, size, Sort.by("id").descending()));
				break;
			case DATE_ASC:
				recoveryDiaryPage = recoveryDiaryRepository.findAll(
					PageRequest.of(page, size, Sort.by("recoveryDiaryRegdate").ascending()));
				break;
			case DATE_DESC:
				recoveryDiaryPage = recoveryDiaryRepository.findAll(
					PageRequest.of(page, size, Sort.by("recoveryDiaryRegdate").descending()));
				break;
			default:
				recoveryDiaryPage = recoveryDiaryRepository.findAll(
					PageRequest.of(page, size, Sort.by("id").ascending()));
				break;
		}
		Page<RecoveryDiaryResponse> recoveryDiaryResponsesPage = recoveryDiaryPage.map(
			recoveryDiary -> new RecoveryDiaryResponse().builder()
				.diaryTitle(recoveryDiary.getRecoveryDiaryTitle())
				.diaryPhoto(recoveryDiary.getRecoveryDiaryPhoto())
				.diaryContent(recoveryDiary.getRecoveryDiaryContent())
				.beneficiaryId(recoveryDiary.getBeneficiary().getId())
				.beneficiaryName(recoveryDiary.getBeneficiary().getBeneficiaryName())
				.diaryId(recoveryDiary.getId())
				.diaryAmountSpent(recoveryDiary.getRecoveryDiaryAmountSpent())
				.diaryRegisterDate(recoveryDiary.getRecoveryDiaryRegdate()
					.now()
					.atZone(ZoneId.of("Asia/Seoul"))
					.toInstant()
					.toEpochMilli())
				.build());

		return recoveryDiaryResponsesPage;
	}

	public RecoveryDiaryBeneficiaryResponse getRecoveryDiaryBeneficiaryList(int page, int size, Long beneficiaryId, RecoveryDiarySortType sortType) {
		Beneficiary beneficiary = beneficiaryRepository.findBeneficiaryById(beneficiaryId).orElseThrow(()->new CustomException(CustomExceptionType.BENEFICIARY_NOT_FOUND));
		BeneficiaryInfoResponse beneficiaryInfoResponse = BeneficiaryInfoResponse.builder()
			.beneficiaryDisease(beneficiary.getBeneficiaryDisease())
			.beneficiaryAmountGoal(beneficiary.getBeneficiaryAmountGoal())
			.beneficiaryAmountRaised(beneficiary.getBeneficiaryAmountRaised())
			.beneficiaryName(beneficiary.getBeneficiaryName())
			.beneficiaryPhoto(beneficiary.getBeneficiaryPhoto())
			.beneficiaryBirthday(beneficiary.getBeneficiaryBirthday().getTime())
			.hospitalId(beneficiary.getHospital().getId())
			.hospitalName(beneficiary.getHospital().getHospitalName())
			.hospitalLink(beneficiary.getHospital().getHospitalLink())
			.build();

		Page<RecoveryDiary> recoveryDiaryPage;
		switch (sortType) {
			case ID_ASC:
				recoveryDiaryPage = recoveryDiaryRepository.getRecoveryDiariesByBeneficiaryId(
					beneficiaryId, PageRequest.of(page, size, Sort.by("id").ascending()));
				break;
			case ID_DESC:
				recoveryDiaryPage = recoveryDiaryRepository.getRecoveryDiariesByBeneficiaryId(
					beneficiaryId, PageRequest.of(page, size, Sort.by("id").descending()));
				break;
			case DATE_ASC:
				recoveryDiaryPage = recoveryDiaryRepository.getRecoveryDiariesByBeneficiaryId(
					beneficiaryId, PageRequest.of(page, size, Sort.by("recoveryDiaryRegdate").ascending()));
				break;
			case DATE_DESC:
				recoveryDiaryPage = recoveryDiaryRepository.getRecoveryDiariesByBeneficiaryId(
					beneficiaryId, PageRequest.of(page, size, Sort.by("recoveryDiaryRegdate").descending()));
				break;
			default:
				recoveryDiaryPage = recoveryDiaryRepository.getRecoveryDiariesByBeneficiaryId(
					beneficiaryId, PageRequest.of(page, size, Sort.by("id").ascending()));
				break;
		}
		Page<RecoveryDiaryResponse> recoveryDiaryResponsesPage = recoveryDiaryPage.map(
			recoveryDiary -> new RecoveryDiaryResponse().builder()
				.diaryTitle(recoveryDiary.getRecoveryDiaryTitle())
				.diaryPhoto(recoveryDiary.getRecoveryDiaryPhoto())
				.diaryContent(recoveryDiary.getRecoveryDiaryContent())
				.beneficiaryId(recoveryDiary.getBeneficiary().getId())
				.beneficiaryName(recoveryDiary.getBeneficiary().getBeneficiaryName())
				.diaryId(recoveryDiary.getId())
				.diaryAmountSpent(recoveryDiary.getRecoveryDiaryAmountSpent())
				.diaryRegisterDate(recoveryDiary.getRecoveryDiaryRegdate()
					.now()
					.atZone(ZoneId.of("Asia/Seoul"))
					.toInstant()
					.toEpochMilli())
				.build());

		return RecoveryDiaryBeneficiaryResponse.builder().beneficiaryDiaries(recoveryDiaryResponsesPage)
			.beneficiaryInfo(beneficiaryInfoResponse)
			.build();
	}
	@Transactional
	public RecoveryDiaryResponse addRecoveryDiary(RecoveryDiaryRequest recoveryDiaryRequest) {
		RecoveryDiary recoveryDiary = new RecoveryDiary().builder()
			.beneficiary(beneficiaryRepository.findBeneficiaryById(recoveryDiaryRequest.getBeneficiaryId())
				.orElseThrow(() -> new CustomException(
					CustomExceptionType.BENEFICIARY_NOT_FOUND)))
			.recoveryDiaryContent(recoveryDiaryRequest.getDiaryContent())
			.recoveryDiaryPhoto(recoveryDiaryRequest.getDiaryPhoto())
			.recoveryDiaryTitle(recoveryDiaryRequest.getDiaryTitle())
			.recoveryDiaryAmountSpent(recoveryDiaryRequest.getDiaryAmountSpent())
			.build();
		recoveryDiary = recoveryDiaryRepository.saveAndFlush(recoveryDiary);

		return new RecoveryDiaryResponse().builder()
			.diaryId(recoveryDiary.getId())
			.diaryAmountSpent(recoveryDiary.getRecoveryDiaryAmountSpent())
			.beneficiaryId(recoveryDiary.getBeneficiary().getId())
			.beneficiaryName(recoveryDiary.getBeneficiary().getBeneficiaryName())
			.diaryContent(recoveryDiaryRequest.getDiaryContent())
			.diaryPhoto(recoveryDiaryRequest.getDiaryPhoto())
			.diaryTitle(recoveryDiary.getRecoveryDiaryTitle())
			.diaryRegisterDate(recoveryDiary.getRecoveryDiaryRegdate()
				.now()
				.atZone(ZoneId.of("Asia/Seoul"))
				.toInstant()
				.toEpochMilli())
			.build();

	}

}
