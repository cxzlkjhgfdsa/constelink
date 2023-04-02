package com.srp.constelinknotice.dto;

import com.srp.constelinknotice.dto.enums.NoticeType;
import jakarta.persistence.Lob;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeInfoDto {
	private Long id;
	private String noticeTitle;
	@Lob
	private String noticeContent;
	private LocalDateTime noticeRegDate;
	private NoticeType noticeType;
	private boolean noticeIsPinned;

}
