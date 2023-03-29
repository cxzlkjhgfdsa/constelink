package com.srp.constelinkbeneficiary.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.srp.constelinkbeneficiary.db.entity.Beneficiary;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
	@Override
	<S extends Beneficiary> S saveAndFlush(S entity);

	@Query("SELECT u from Beneficiary u join fetch u.hospital where u.id = :id ")
	Optional<Beneficiary> findBeneficiaryById(Long id);


	// Optional<Beneficiary> getBeneficiariesById(Long id);

	@Query(value = "SELECT u from Beneficiary u join fetch u.hospital",countQuery = "SELECT count(u) from Beneficiary u")
	Page<Beneficiary> findBeneficiariesByHospitalId(Long id, Pageable pageable);

	@Query(value = "SELECT u from Beneficiary u join fetch u.hospital",countQuery = "SELECT count(u) from Beneficiary u")
	Page<Beneficiary> findAll(Pageable pageable);

	List<Beneficiary> findAllByIdIn(List<Long> idList);

	@Query("select distinct(u.id) as benficiaryId, u.beneficiaryName as beneficiaryName "
		+ ", u.beneficiaryPhoto as beneficiaryPhoto, u.beneficiaryDisease as beneficiaryDisease "
		+ ", h.hospitalName as hospitalName "
		+ "from Beneficiary u join RecoveryDiary r "
		+ "on r.beneficiary.id = u.id "
		+ "join Hospital h on h.id = u.hospital.id "
		+ "group by benficiaryId "
		+ "order by max(r.recoveryDiaryRegdate)")
	Page<Beneficiary> findBeneficiariesByIdIsIn(List<Long> idList, Pageable pageable);
}
