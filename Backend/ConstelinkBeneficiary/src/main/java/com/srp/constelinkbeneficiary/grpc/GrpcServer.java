package com.srp.constelinkbeneficiary.grpc;

import java.io.IOException;

import org.springframework.stereotype.Component;

import io.grpc.Server;
import io.grpc.ServerBuilder;

@Component
public class GrpcServer {
	public int PORT = 9090;
	private Server server;


	public GrpcServer(HospitalGrpcService hospitalGrpcService) throws IOException{
		this.server = ServerBuilder.forPort(this.PORT).addService(
			hospitalGrpcService
		).build().start();
		System.out.println("Grpc 서버시작 완료");

		// this.server.awaitTermination();

	}

}
