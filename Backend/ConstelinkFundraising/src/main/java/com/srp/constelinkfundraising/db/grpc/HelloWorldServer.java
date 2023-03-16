package com.srp.constelinkfundraising.db.grpc;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.srp.constelinkfundraising.db.repository.FundraisingRepository;

import io.grpc.Server;
import io.grpc.ServerBuilder;

@Component
public class HelloWorldServer {
	public int PORT = 9090;
	private Server server;
	private final FundraisingRepository fundraisingRepository;


	public void blockUntilShutdown() throws InterruptedException {
		if (server == null) {
			return;
		}
		server.awaitTermination();
	}

	public HelloWorldServer(FundraisingRepository fundraisingRepository) throws IOException, InterruptedException{
		{
			System.out.println("hello");
		}
		this.fundraisingRepository = fundraisingRepository;
		this.server = ServerBuilder.forPort(this.PORT).addService(
			new HelloWorldService(fundraisingRepository)
		).build().start();
		// this.server.awaitTermination();
		System.out.println("ㅋㅌㅊㅋㅊㅌ");
		{
			System.out.println(fundraisingRepository.findFundraisingById(1L).getFundraisingTitle());
		}
		// this.server.awaitTermination();
		{
			System.out.println("아웃");
		}
	}

}