package com.srp.constelinkmember.api.service;

import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import com.srp.constelinkmember.db.entity.Member;
import com.srp.constelinkmember.dto.enums.Role;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkmember.common.exception.CustomException;
import com.srp.constelinkmember.common.exception.CustomExceptionType;
import com.srp.constelinkmember.db.repository.MemberRepository;
import com.srp.constelinkmember.dto.LoginInfoDto;
import com.srp.constelinkmember.dto.request.LoginRequest;
import com.srp.constelinkmember.security.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberService {

	private final MemberRepository memberRepository;
	private final TokenProvider tokenProvider;
	private final RedisTemplate<String, String> redisTemplate;

	@Transactional
	public void withdrawal(String accessToken, String refreshToken) {
		String getTokenSub = tokenProvider.resolveToken(accessToken);
		Long memberId = Long.valueOf(getTokenSub);
		Optional<Member> findMember = memberRepository.findById(memberId);
		if(!findMember.isPresent()){
			throw new CustomException(CustomExceptionType.USER_NOT_FOUND);
		}
		findMember.get().setMemberInactive(true);
		String redisKey = "RT:"+refreshToken;
		Boolean isDelete = redisTemplate.delete(redisKey);
		long expiration = tokenProvider.getExpiration(accessToken);
		Date now = new Date();
		redisTemplate.opsForValue().set(accessToken, accessToken, expiration - now.getTime());
	}

	public void getMemberInfo(String accessToken) {
		String roleByToken = tokenProvider.getRoleByToken(accessToken);
		log.info("Role == " + roleByToken);

		if(roleByToken.equals("MEMBER")){
			log.info("Member에용");
		}
	}
}
