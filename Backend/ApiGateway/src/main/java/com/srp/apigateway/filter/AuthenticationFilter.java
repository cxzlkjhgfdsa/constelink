package com.srp.apigateway.filter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.srp.apigateway.util.JwtUtil;

@Component
public class AuthenticationFilter
	extends AbstractGatewayFilterFactory<AbstractGatewayFilterFactory.NameConfig>
{
	@Autowired
	private RouteValidator validator;
	@Autowired
	private RestTemplate template;

	// @Autowired
	// private JwtUtil jwtUtil;

	public AuthenticationFilter() {
		super(NameConfig.class);
	}

	@Override
	public GatewayFilter apply(NameConfig config) {
		return (((exchange, chain) -> {
			if (validator.isSecured.test(exchange.getRequest())) {
				//Header contains JWT token or not
				if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("헤더가 없습니다.");
				}
				String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				if (authHeader != null && authHeader.startsWith("Bearer ")) {
					authHeader = authHeader.substring(7);
					System.out.println(authHeader);
				}
				try {
					//REST template사용 or gRPC사용
					// String name = jwtUtil.resolveToken(authHeader);
					// template.getForObject("http://AUTH-SERVICE//validate?token" + authHeader, String.class);
				} catch (Exception e) {
					System.out.println("invalid access");
					throw new RuntimeException("unauthorized access to application");
				}
			}

			return chain.filter(exchange);
		})

		);
	}


}
