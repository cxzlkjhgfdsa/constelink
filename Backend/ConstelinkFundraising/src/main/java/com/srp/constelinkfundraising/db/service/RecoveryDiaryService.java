package com.srp.constelinkfundraising.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkfundraising.db.entity.RecoveryDiary;
import com.srp.constelinkfundraising.db.repository.RecoveryDiaryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RecoveryDiaryService {
	private final RecoveryDiaryRepository recoveryDiaryRepository;

	public Page<RecoveryDiary> getRecoveryDiaryList(int page, int size, int order) {
		Page<RecoveryDiary> recoveryDiaryList;
		switch (order) {
			case 1:
				recoveryDiaryList = recoveryDiaryRepository.findAll(PageRequest.of(page,size, Sort.by("id").ascending()));
				break;
			default:
				recoveryDiaryList = recoveryDiaryRepository.findAll(PageRequest.of(page,size, Sort.by("id").descending()));
				break;
		}
		return recoveryDiaryList;
	}
}
