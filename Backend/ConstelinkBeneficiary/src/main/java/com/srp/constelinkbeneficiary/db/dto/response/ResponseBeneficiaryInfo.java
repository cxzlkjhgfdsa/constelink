package com.srp.constelinkfundraising.db.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseBeneficiaryInfo {

	private String beneficiaryName;
	private LocalDateTime beneficiaryBirthday;
	private String beneficiaryDisease;
	private String beneficiaryPhoto;
	private int beneficiaryAmountRaised;
	private int beneficiaryAmountGoal;
}
