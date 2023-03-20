package com.srp.constelinkmember.db.repository;

import java.util.Map;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.srp.constelinkmember.db.entity.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {

	@Query("select count(distinct d.fundraisingId) as totalFundCount, sum(d.donationPrice) as totalDonationPrice "
		+ "from Donation d where d.memberId = :memberId")
	Map<String, Objects> getDonationInfo(@Param("memberId") Long memberId);

	Page<Donation> findByMemberId(Long memberId, Pageable pageable);

}
