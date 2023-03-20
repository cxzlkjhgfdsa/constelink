package com.srp.constelinkmember.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkmember.db.entity.Donation;
import com.srp.constelinkmember.db.repository.DonationRepository;
import com.srp.constelinkmember.dto.DonationDetailDto;
import com.srp.constelinkmember.dto.request.SaveDonationRequest;
import com.srp.constelinkmember.dto.response.DonationDetailsResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DonationService {

	private final DonationRepository donationRepository;

	@Transactional
	public void saveDonation(SaveDonationRequest saveDonationRequest, Long memberId) {

		Donation donation = Donation.builder()
			.memberId(memberId)
			.fundraisingId(saveDonationRequest.getFundraisingId())
			.donationPrice(saveDonationRequest.getDonationPrice())
			.donationTime(LocalDateTime.now())
			.donationTransactionHash(saveDonationRequest.getDonationTransactionHash())
			.hospitalName(saveDonationRequest.getHospitalName())
			.beneficiaryDisease(saveDonationRequest.getBeneficiaryDisease())
			.fundraisingTitle(saveDonationRequest.getFundraisingTitle())
			.fundraisingThumbnail(saveDonationRequest.getFundraisingThumbnail())
			.build();

		donationRepository.save(donation);

	}

	public DonationDetailsResponse listDonation(Long memberId, int page) {
		PageRequest pageRequest = PageRequest.of(page, 8,
			Sort.by(Sort.Direction.DESC, "donationTime"));
		Page<Donation> donations = donationRepository.findByMemberId(memberId, pageRequest);

		List<DonationDetailDto> donationDetails = donations.getContent().stream().map(donation ->
			new DonationDetailDto().builder()
				.id(donation.getId())
				.donationPrice(donation.getDonationPrice())
				.donationTransactionHash(donation.getDonationTransactionHash())
				.hospitalName(donation.getHospitalName())
				.beneficiaryDisease(donation.getBeneficiaryDisease())
				.fundraisingTitle(donation.getFundraisingTitle())
				.fundraisingThumbnail(donation.getFundraisingThumbnail())
				.build()).collect(Collectors.toList());

		DonationDetailsResponse donationDetailsResponse = DonationDetailsResponse.builder()
			.donations(donationDetails)
			.totalElements(donations.getTotalElements())
			.totalPages(donations.getTotalPages())
			.build();

		return donationDetailsResponse;
	}

}
