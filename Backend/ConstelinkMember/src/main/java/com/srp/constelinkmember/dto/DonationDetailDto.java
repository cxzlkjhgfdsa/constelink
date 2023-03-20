package com.srp.constelinkmember.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationDetailDto {

	private Long id;
	private int donationPrice;
	private String donationTransactionHash;
	private String hospitalName;
	private String beneficiaryDisease;
	private String fundraisingTitle;
	private String fundraisingThumbnail;
}
