package com.srp.constelinkbeneficiary.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkbeneficiary.db.dto.request.RecoveryDiaryRequest;
import com.srp.constelinkbeneficiary.db.dto.response.RecoveryDiaryResponse;
import com.srp.constelinkbeneficiary.db.entity.RecoveryDiary;
import com.srp.constelinkbeneficiary.db.repository.BeneficiaryRepository;
import com.srp.constelinkbeneficiary.db.repository.RecoveryDiaryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RecoveryDiaryService {
	private final RecoveryDiaryRepository recoveryDiaryRepository;
	private final BeneficiaryRepository beneficiaryRepository;

	public Page<RecoveryDiary> getRecoveryDiaryList(int page, int size, int sortBy) {
		Page<RecoveryDiary> recoveryDiaryList;
		switch (sortBy) {
			case 1:
				recoveryDiaryList = recoveryDiaryRepository.findAll(PageRequest.of(page,size, Sort.by("id").ascending()));
				break;
			default:
				recoveryDiaryList = recoveryDiaryRepository.findAll(PageRequest.of(page,size, Sort.by("id").descending()));
				break;
		}
		return recoveryDiaryList;
	}

	public RecoveryDiaryResponse addRecoveryDiary(RecoveryDiaryRequest recoveryDiaryRequest) {
		RecoveryDiary recoveryDiary = new RecoveryDiary().builder()
			.beneficiary(beneficiaryRepository.findBeneficiaryById(recoveryDiaryRequest.getBeneficiaryId()))
			.recoveryDiaryContent(recoveryDiaryRequest.getContent())
			.recoveryDiaryPhoto(recoveryDiaryRequest.getPhoto())
			.recoveryDiaryTitle(recoveryDiaryRequest.getTitle())
			.recoveryDiaryAmountSpent(recoveryDiaryRequest.getAmountSpent())
			.build();
		recoveryDiary = recoveryDiaryRepository.saveAndFlush(recoveryDiary);

		return new RecoveryDiaryResponse().builder()
			.id(recoveryDiary.getId())
			.amountSpent(recoveryDiary.getRecoveryDiaryAmountSpent())
			.beneficiaryId(recoveryDiary.getBeneficiary().getId())
			.content(recoveryDiaryRequest.getContent())
			.photo(recoveryDiaryRequest.getPhoto())
			.recoveryDiaryTitle(recoveryDiary.getRecoveryDiaryTitle())
			.regdate(recoveryDiary.getRecoveryDiaryRegdate())
			.build();

	}


}
