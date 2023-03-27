package com.srp.authserver.filters;

import java.io.IOException;
import org.springframework.http.HttpHeaders;

import com.srp.authserver.common.exception.CustomException;
import com.srp.authserver.common.exception.CustomExceptionType;
import com.srp.authserver.dto.enums.Role;
import com.srp.authserver.jwt.TokenProvider;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class HospitalFilter implements Filter {
	private final TokenProvider tokenProvider;

	public HospitalFilter(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		Filter.super.init(filterConfig);
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException, ServletException {
		log.info("HospitalFilter 진입!");
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		String accessToken = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
		log.info(" " + accessToken);
		if(accessToken == null){
			throw new CustomException(CustomExceptionType.NULL_HEADER_EXCEPTION);
		}
		String roleByToken = tokenProvider.getRoleByToken(accessToken);
		log.info("role = " + roleByToken +" : "+ Role.MEMBER);
		if(!Role.MEMBER.toString().equals(roleByToken)){
			throw new CustomException(CustomExceptionType.JWT_ROLE_EXCEPTION);
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		Filter.super.destroy();
	}
}
