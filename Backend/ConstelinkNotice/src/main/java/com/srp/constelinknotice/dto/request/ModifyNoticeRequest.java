package com.srp.constelinknotice.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModifyNoticeRequest {

	private Long id;
	private String noticeTitle;
	private String noticeContent;

}
