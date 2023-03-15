package com.srp.constelinkfundraising.db.grpc;

import java.io.IOException;

import org.springframework.stereotype.Component;

import io.grpc.Server;
import io.grpc.ServerBuilder;


public class HelloWorldServer {
	public int PORT = 9090;
	public static Server server;
	public void start() throws IOException {
		System.out.println("여기옴");
		this.server = ServerBuilder.forPort(PORT)
			.addService(new HelloWorldServiceImpl())
			.build()
			.start();
	}

	public void blockUntilShutdown() throws InterruptedException {
		if (server == null) {
			return;
		}

		server.awaitTermination();
	}

	public int getServer() {
		return server.getPort();
	}

	public static void main(String[] args)
		throws InterruptedException, IOException {
		int PORT = 9090;
		server = ServerBuilder.forPort(PORT).addService(
			new HelloWorldServiceImpl()
		).build();
		server.start();
		server.awaitTermination();

	}
}