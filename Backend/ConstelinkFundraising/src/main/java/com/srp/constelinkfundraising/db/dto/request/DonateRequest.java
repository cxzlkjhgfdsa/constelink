package com.srp.constelinkfundraising.db.dto.request;

import lombok.Getter;

@Getter
public class DonateRequest {
	private Long id;
	private int cash;

	public void setId(Long id) {
		this.id = id;
	}

	public void setCash(int cash) {
		this.cash = cash;
	}
}
