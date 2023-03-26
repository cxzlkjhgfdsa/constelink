package com.srp.apigateway.filter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.srp.apigateway.common.exception.CustomException;
import com.srp.apigateway.common.exception.CustomExceptionType;
import com.srp.apigateway.util.JwtUtil;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

@Component
public class AuthenticationFilter
	extends AbstractGatewayFilterFactory<AbstractGatewayFilterFactory.NameConfig>
{
	@Autowired
	private RouteValidator validator;
	@Autowired
	private RestTemplate template;
	@Autowired
	private JwtUtil jwtUtil;

	public AuthenticationFilter() {
		super(NameConfig.class);
	}


	@Override
	public GatewayFilter apply(NameConfig config) {
		return (((exchange, chain) -> {
			if (validator.isSecured.test(exchange.getRequest())) {
				//Header contains JWT token or not
				if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					// 헤더가 없습니다.
					throw new CustomException(CustomExceptionType.NULL_HEADER_EXCEPTION);
				}
				String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				//토큰 추출(Bearer 토큰인지 확인과정 거쳐서 추출)
				authHeader = jwtUtil.parseJwt(authHeader);


				try {
					//REST template사용 or gRPC사용
					// String name = jwtUtil.resolveToken(authHeader);
					// template.getForObject("http://AUTH-SERVICE//validate?token" + authHeader, String.class);
				} catch (Exception e) {
					System.out.println("invalid access");
					throw new RuntimeException("unauthorized access to application");
				}
				if(!isJwtValid(authHeader)) {
					throw new CustomException(CustomExceptionType.JWT_EXPIRED_EXCEPTION);
				}
			}

			return chain.filter(exchange);
		})

		);
	}

	// Jwt유효성 검사
	public boolean isJwtValid(String token) {
		boolean isValid = true;
		String subject = null;
		try {
			subject = Jwts.parser()
				.setSigningKey("token.secret")
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
		} catch (Exception e) {
			isValid = false;
		}
		if(subject == null || subject.isEmpty()) {
			isValid = false;
		}
		return isValid;
	}


}
