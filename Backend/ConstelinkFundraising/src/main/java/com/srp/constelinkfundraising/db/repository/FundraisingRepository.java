package com.srp.constelinkfundraising.db.repository;

import java.sql.Timestamp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.srp.constelinkfundraising.db.entity.Fundraising;


public interface FundraisingRepository extends JpaRepository<Fundraising, Long> {

	Page<Fundraising> findAll(Pageable pageable);

	Page<Fundraising> findFundraisingsByFundraisingIsDone(Boolean done,Pageable pageable);
	Page<Fundraising> findFundraisingsByFundraisingIsDoneFalse(Pageable pageable);

	Page<Fundraising> findFundraisingsByBeneficiaryId (Long beneficiary, Pageable pageable);

	Fundraising findFundraisingById(Long id);
	Page<Fundraising> findFundraisingsByFundraisingTitleContaining(String search, Pageable pageable);


	Page<Fundraising> findFundraisingsByFundraisingEndTimeAfter(Timestamp timestamp, Pageable pageable);

	Page<Fundraising> findFundraisingsByFundraisingEndTimeBefore(Timestamp timestamp, Pageable pageable);

}
