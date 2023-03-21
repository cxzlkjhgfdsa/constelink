package com.srp.constelinkfundraising.common.exception;

import org.springframework.http.HttpStatus;

public enum CustomExceptionType {
	RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "E201", "잘못된 요청입니다."),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E202", "서버 오류 입니다."),
	BOOKMARK_NOT_FOUND(HttpStatus.NOT_FOUND, "E203", "해당 id 북마크가 존재하지 않습니다."),
	CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "E204", "해당 id 카테고리가 존재하지 않습니다."),
	FUNDRAISING_NOT_FOUND(HttpStatus.NOT_FOUND, "E205", "해당 id 기부가 존재하지 않습니다."),
	DONATION_MONEY_ERROR(HttpStatus.NOT_ACCEPTABLE, "E206", "기부 금액은 0원 이상이어야합니다."),

	;

	private final HttpStatus httpStatus;
	private final String code;
	private String message;

	CustomExceptionType(HttpStatus httpStatus, String code) {
		this.httpStatus = httpStatus;
		this.code = code;
	}

	CustomExceptionType(HttpStatus httpStatus, String code, String message) {
		this.httpStatus = httpStatus;
		this.code = code;
		this.message = message;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}
}