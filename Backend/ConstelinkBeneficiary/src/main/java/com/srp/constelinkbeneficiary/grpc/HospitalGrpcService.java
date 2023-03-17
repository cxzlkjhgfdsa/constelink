package com.srp.constelinkbeneficiary.grpc;


import org.springframework.stereotype.Service;

import com.srp.constelinkbeneficiary.db.entity.Hospital;
import com.srp.constelinkbeneficiary.db.repository.HospitalRepository;
import com.srp.hospitalrpc.HospitalGrpcServiceGrpc;
import com.srp.hospitalrpc.HospitalInfoReq;
import com.srp.hospitalrpc.HospitalInfoRes;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HospitalGrpcService extends HospitalGrpcServiceGrpc.HospitalGrpcServiceImplBase {

	private final HospitalRepository hospitalRepository;

	@Override
	public void getHospitalRpc(HospitalInfoReq request, StreamObserver<HospitalInfoRes> responseObserver) {
		Long hospitalId = request.getId();
		Hospital hospital = hospitalRepository.findHospitalById(hospitalId);
		HospitalInfoRes hospitalInfoRes = HospitalInfoRes
			.newBuilder()
			.setName(hospital.getHospitalName())
			.setTotalAmount(hospital.getHospitalTotalAmountRaised())
			.setBeneficiaryCount(hospital.getHospitalTotalBeneficiary())
			.setWalletAddress(hospital.getHospitalWalletAddress())
			.setLink(hospital.getHospitalLink())
			.build();

		responseObserver.onNext(hospitalInfoRes);
		responseObserver.onCompleted();
	}
}
