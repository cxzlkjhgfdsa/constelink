package com.srp.constelinkfundraising.db.repository;

import java.util.HashSet;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.srp.constelinkfundraising.db.entity.Fundraising;

public interface FundraisingRepository extends JpaRepository<Fundraising, Long> {

	@Query(value = "SELECT u FROM Fundraising u join FETCH u.category",
	countQuery = "SELECT count(u) FROM Fundraising u")
	Page<Fundraising> findAll(Pageable pageable);

	Page<Fundraising> findFundraisingsByFundraisingIsDone(Boolean done, Pageable pageable);

	Page<Fundraising> findFundraisingsByFundraisingIsDoneFalse(Pageable pageable);

	Page<Fundraising> findFundraisingsByBeneficiaryId(Long beneficiary, Pageable pageable);

	Optional<Fundraising> findFundraisingById(Long id);
	// Page<Fundraising> findFundraisingsByFundraisingTitleContaining(String search, Pageable pageable);

	// Page<Fundraising> findFundraisingsByFundraisingEndTimeAfter(Timestamp timestamp, Pageable pageable);

	// Page<Fundraising> findFundraisingsByFundraisingEndTimeBefore(Timestamp timestamp, Pageable pageable);
	HashSet<Fundraising> findFundraisingsByIdIsIn(HashSet<Long> idList);
}
