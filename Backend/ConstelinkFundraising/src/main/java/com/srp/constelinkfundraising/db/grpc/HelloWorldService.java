package com.srp.constelinkfundraising.db.grpc;

import org.springframework.stereotype.Service;

import com.srp.constelinkfundraising.db.repository.FundraisingRepository;
import com.srp.grpc.HelloRequest;
import com.srp.grpc.HelloResponse;
import com.srp.grpc.HelloWorldServiceGrpc;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HelloWorldService
	extends HelloWorldServiceGrpc.HelloWorldServiceImplBase {
	private final FundraisingRepository fundraisingRepository;
	@Override
	public void hello(
		HelloRequest request,
		StreamObserver<HelloResponse> responseObserver) {
		System.out.println(
			"Handling hello endpoint: " + request.toString());

		String text = request.getText() + " World";
		HelloResponse response =
			HelloResponse.newBuilder()
				.setText(text).build();

		responseObserver.onNext(response);
		responseObserver.onCompleted();
	}
}
