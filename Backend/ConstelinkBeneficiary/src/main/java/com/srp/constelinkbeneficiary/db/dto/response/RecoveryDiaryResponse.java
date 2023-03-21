package com.srp.constelinkbeneficiary.db.dto.response;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecoveryDiaryResponse {
	private Long id;
	private Long beneficiaryId;
	private String beneficiaryName;
	private Long regdate;
	private String photo;
	private String recoveryDiaryTitle;
	private String content;
	private int amountSpent;

}
