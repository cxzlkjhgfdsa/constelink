package com.srp.constelinkmember.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkmember.db.entity.Donation;
import com.srp.constelinkmember.db.entity.Member;
import com.srp.constelinkmember.db.repository.DonationRepository;
import com.srp.constelinkmember.db.repository.MemberRepository;
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
	private final MemberRepository memberRepository;

	@Transactional
	public void saveDonation(SaveDonationRequest saveDonationRequest, Long memberId) {

		Donation donation = Donation.builder()
			.memberId(memberId)
			.fundraisingId(saveDonationRequest.getFundraisingId())
			.donationPrice(saveDonationRequest.getDonationPrice())
			.donationTime(LocalDateTime.now())
			.donationTransactionHash(saveDonationRequest.getDonationTransactionHash())
			.hospitalName(saveDonationRequest.getHospitalName())
			.beneficiaryId(saveDonationRequest.getBeneficiary_id())
			.beneficiaryName(saveDonationRequest.getBeneficiaryName())
			.beneficiaryDisease(saveDonationRequest.getBeneficiaryDisease())
			.fundraisingTitle(saveDonationRequest.getFundraisingTitle())
			.fundraisingThumbnail(saveDonationRequest.getFundraisingThumbnail())
			.build();
		donationRepository.save(donation);

		Optional<Member> findMember = memberRepository.findById(memberId);
		findMember.get().addAmountRaised(donation.getDonationPrice());
		findMember.get().addPoint(donation.getDonationPrice());

	}

	public DonationDetailsResponse listDonation(Long memberId, int page) {
		PageRequest pageRequest = PageRequest.of(page, 8,
			Sort.by(Sort.Direction.DESC, "donationTime"));
		Page<Map<String, Object>> donations = donationRepository.findByMemberId(memberId, pageRequest);
		List<DonationDetailDto> donationDetails = donations.getContent().stream().map(donation ->
			new DonationDetailDto().builder()
				.hospitalName((String)donation.get("hospitalName"))
				.beneficiaryDisease((String)donation.get("beneficiaryDisease"))
				.beneficiaryName((String)donation.get("beneficiaryName"))
				.totalDonationPrice(Integer.parseInt(String.valueOf(donation.get("totalDonationPrice"))))
				.lastDonationTime((LocalDateTime)donation.get("lastDonationTime"))
				.build()).collect(Collectors.toList());

		DonationDetailsResponse donationDetailsResponse = DonationDetailsResponse.builder()
			.donations(donationDetails)
			.totalElements(donations.getTotalElements())
			.totalPages(donations.getTotalPages())
			.build();

		return donationDetailsResponse;
	}

}
