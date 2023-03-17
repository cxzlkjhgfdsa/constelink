package com.srp.constelinkmember.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HospitalGrpcResponse {

	String name;

	int totalAmount;
	int beneficiaryCount;
	String walletAddress;
	String link;
	;
}
