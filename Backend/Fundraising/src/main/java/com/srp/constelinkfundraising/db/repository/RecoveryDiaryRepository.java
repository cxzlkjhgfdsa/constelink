package com.srp.constelinkfundraising.db.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.srp.constelinkfundraising.db.entity.RecoveryDiary;

public interface RecoveryDiaryRepository extends JpaRepository<RecoveryDiary,Long> {
	Page<RecoveryDiary> findAll(Pageable pageable);
	List<RecoveryDiary> getRecoveryDiariesByBeneficiaryId(Long id);


}
