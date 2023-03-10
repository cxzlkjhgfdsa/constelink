package com.srp.constelinkfundraising.db.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.srp.constelinkfundraising.db.entity.Hospital;


public interface HospitalRepository extends JpaRepository<Hospital, Long> {
	Hospital findHospitalById(Long id);
	Page<Hospital> findAll(Pageable pageable);
}
