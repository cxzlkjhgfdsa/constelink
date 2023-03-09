package com.srp.constelinkmember.security.jwt;

import java.security.Key;
import java.util.Date;

import com.srp.constelinkmember.common.exception.CustomException;
import com.srp.constelinkmember.common.exception.CustomExceptionType;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.srp.constelinkmember.dto.enums.Role;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class TokenProvider implements InitializingBean {

	private static final String AUTHORITIES_KEY = "role";
	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.access}")
	private long accessTokenValidTime;
	@Value("${jwt.refresh}")
	private long refreshTokenValidTime;

	private Key key;

	@Override
	public void afterPropertiesSet() {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public String createAccessToken(Long memberId, Role role) {

		Date now = new Date();

		return Jwts.builder()
			.setSubject(String.valueOf(memberId))
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + accessTokenValidTime*1000))
			.claim(AUTHORITIES_KEY, role)
			.signWith(key, SignatureAlgorithm.HS512)
			.compact();
	}

	public String createRefreshToken() {
		Date now = new Date();

		String refreshToken = Jwts.builder()
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() +refreshTokenValidTime*1000))
			.signWith(key, SignatureAlgorithm.HS512)
			.compact();

		return  refreshToken;
	}

	public String resolveToken(String token) {
		if(!isBearerToken(token)){
			throw new CustomException(CustomExceptionType.NULL_TOKEN_EXCEPTION);
		}
		log.info("token resolver working.....");
		String accessToken = token.replace("Bearer ", "");
		return Jwts.parser()
				.setSigningKey(key)
				.parseClaimsJws(accessToken)
				.getBody()
				.getSubject();
	}


	private boolean isBearerToken(String header) {
		return header.startsWith("Bearer ");

	}

}
