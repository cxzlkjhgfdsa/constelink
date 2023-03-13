package com.srp.constelinkbeneficiary.db.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.srp.constelinkbeneficiary.db.entity.Beneficiary;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
	@Override
	<S extends Beneficiary> S saveAndFlush(S entity);

	Beneficiary findBeneficiaryById(Long id);
	Page<Beneficiary> findBeneficiariesByHospitalId(Long id, Pageable pageable);


}
