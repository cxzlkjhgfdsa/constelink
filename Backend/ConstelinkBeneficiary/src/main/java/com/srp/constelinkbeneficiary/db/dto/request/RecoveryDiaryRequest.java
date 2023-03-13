package com.srp.constelinkbeneficiary.db.dto.request;

import lombok.Getter;

@Getter
public class RecoveryDiaryRequest {
	Long beneficiaryId;
	String photo;
	String title;
	String content;
	int amountSpent;
}
