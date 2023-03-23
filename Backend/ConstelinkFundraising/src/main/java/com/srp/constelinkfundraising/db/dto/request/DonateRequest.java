package com.srp.constelinkfundraising.db.dto.request;

import lombok.Getter;

@Getter
public class DonateRequest {
	private Long fundraisingId;
	private int cash;

	public void setId(Long id) {
		this.fundraisingId = id;
	}

	public void setCash(int cash) {
		this.cash = cash;
	}
}
