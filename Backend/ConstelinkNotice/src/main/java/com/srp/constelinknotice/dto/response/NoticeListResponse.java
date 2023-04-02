package com.srp.constelinknotice.dto.response;

import com.srp.constelinknotice.dto.NoticeInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeListResponse {

	List<NoticeInfoDto> noticeList;
	private int totalPages;
	private long totalElements;
}
