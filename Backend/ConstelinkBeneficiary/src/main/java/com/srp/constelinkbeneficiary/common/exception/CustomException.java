package com.srp.constelinkfundraising.common.exception;

public class CustomException extends RuntimeException {
	private final com.srp.constelinkfundraising.common.exception.CustomExceptionType exception;

	public CustomException(com.srp.constelinkfundraising.common.exception.CustomExceptionType exception) {
		super(exception.getMessage());
		this.exception = exception;
	}

	public com.srp.constelinkfundraising.common.exception.CustomExceptionType getException() {
		return exception;
	}
}