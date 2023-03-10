package com.srp.constelinkfundraising.db.dto.request;

import java.time.LocalDateTime;

import com.srp.constelinkfundraising.db.entity.Category;

public class MakeFundraisingRequest {

	private Long beneficiaryId;

	private Category category;

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
