package com.srp.constelinkfundraising.db.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FundraisingResponse {

	private Long id;
	private Long beneficiaryId;
	private Long categoryId;
	private int fundraisingAmountRaised;
	private int fundraisingAmountGoal;
	private LocalDateTime fundraisingStartTime;
	private LocalDateTime fundraisingEndTime;
	private String fundraisingTitle;
	private String fundraisingStory;
	private String fundraisingThumbnail;
	private int fundraisingPeople;
	private boolean fundraisingIsDone;
}
