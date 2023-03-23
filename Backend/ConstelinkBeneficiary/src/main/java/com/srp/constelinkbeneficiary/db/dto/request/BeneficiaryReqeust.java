package com.srp.constelinkbeneficiary.db.dto.request;

import java.sql.Date;

import lombok.Getter;

@Getter
public class BeneficiaryReqeust {
	private Long hospitalId;
	private String beneficiaryName;
	private Date beneficiaryBirthday;
	private String beneficiaryDisease;
	private String beneficiaryPhoto;
	private int beneficiaryAmountGoal;
}
