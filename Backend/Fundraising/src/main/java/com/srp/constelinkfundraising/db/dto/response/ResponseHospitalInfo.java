package com.srp.constelinkfundraising.db.dto.response;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseHospitalInfo {
	private Long id;
	private String hospitalName;
	private int hospitalTotalAmountRaised;
	private int hospitalTotalBeneficiary;
	private String hospitalWalletAddress;
	private String hospitalLink;
}
