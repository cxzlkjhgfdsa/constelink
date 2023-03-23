package com.srp.constelinkbeneficiary.db.service;

import java.time.ZoneId;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkbeneficiary.common.exception.CustomException;
import com.srp.constelinkbeneficiary.common.exception.CustomExceptionType;
import com.srp.constelinkbeneficiary.db.dto.enums.HospitalSortType;
import com.srp.constelinkbeneficiary.db.dto.enums.RecoveryDiarySortType;
import com.srp.constelinkbeneficiary.db.dto.request.RecoveryDiaryRequest;
import com.srp.constelinkbeneficiary.db.dto.response.RecoveryDiaryResponse;
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
			default:
				recoveryDiaryPage = recoveryDiaryRepository.findAll(
					PageRequest.of(page, size, Sort.by("id").ascending()));
				break;
		}
		Page<RecoveryDiaryResponse> recoveryDiaryResponses = recoveryDiaryPage.map(
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

		return recoveryDiaryResponses;
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
