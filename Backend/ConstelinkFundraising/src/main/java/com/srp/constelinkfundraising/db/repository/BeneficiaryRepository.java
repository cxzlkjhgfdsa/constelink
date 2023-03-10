package com.srp.constelinkfundraising.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.srp.constelinkfundraising.db.entity.Beneficiary;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
	@Override
	<S extends Beneficiary> S save(S entity);
	Beneficiary findBeneficiaryById(Long id);
	List<Beneficiary> findBeneficiariesByHospitalId(Long id);


}
