package com.srp.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import com.srp.apigateway.filter.RouteValidator;

@Configuration
public class AppConfig {
	@Bean
	public RestTemplate template() {
		return new RestTemplate();
	}

}
