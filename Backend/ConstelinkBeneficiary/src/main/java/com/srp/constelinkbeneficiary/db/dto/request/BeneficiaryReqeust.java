package com.srp.constelinkbeneficiary.db.dto.request;

import java.sql.Date;

import lombok.Getter;

@Getter
public class BeneficiaryReqeust {
	private Long hospitalId;
	private String name;
	private Date birthday;
	private String disease;
	private String photo;
	private int amountGoal;
}
