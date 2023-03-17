package com.srp.constelinkmember.grpc.service;

import org.springframework.stereotype.Service;

import com.srp.constelinkmember.HospitalGrpcServiceGrpc;
import com.srp.constelinkmember.HospitalInfoReq;
import com.srp.constelinkmember.HospitalInfoRes;
import com.srp.constelinkmember.dto.response.HospitalGrpcResponse;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class HospitalGrpcClientService {

	private final ManagedChannel channel = ManagedChannelBuilder.forAddress("127.0.0.1", 8898)
		.usePlaintext()
		.build();
	private HospitalGrpcServiceGrpc.HospitalGrpcServiceBlockingStub stub = HospitalGrpcServiceGrpc.newBlockingStub(
		channel);

	public HospitalGrpcResponse getHospitalInfo(Long id) {
		log.info("여기 왔음?=-==================");
		try {
			final HospitalInfoRes response = this.stub.getHospitalRpc(HospitalInfoReq.newBuilder().setId(id).build());

			return null;
		} catch (final StatusRuntimeException e) {
			return null;
		}
	}
}
