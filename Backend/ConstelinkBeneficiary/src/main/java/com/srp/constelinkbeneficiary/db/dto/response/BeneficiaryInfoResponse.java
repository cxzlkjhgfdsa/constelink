package com.srp.constelinkbeneficiary.db.dto.response;

import java.sql.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BeneficiaryInfoResponse {

	private String beneficiaryName;
	private Long beneficiaryBirthday;
	private String beneficiaryDisease;
	private String beneficiaryPhoto;
	private int beneficiaryAmountRaised;
	private int beneficiaryAmountGoal;
}
