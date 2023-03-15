package com.srp.constelinkfundraising;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.srp.constelinkfundraising.db.grpc.HelloWorldServer;
import com.srp.constelinkfundraising.db.grpc.HelloWorldServiceImpl;

import io.grpc.Server;
import io.grpc.ServerBuilder;

@SpringBootApplication
public class ConstelinkFundraisingApplication { ;
	public static void main(String[] args) throws InterruptedException, IOException {

		SpringApplication.run(ConstelinkFundraisingApplication.class, args);


		int PORT = 9090;
		Server server = ServerBuilder.forPort(PORT).addService(
			new HelloWorldServiceImpl()
		).build();
		server.start();
		server.awaitTermination();
	}

}
