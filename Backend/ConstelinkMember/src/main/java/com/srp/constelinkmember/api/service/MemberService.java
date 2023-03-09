package com.srp.constelinkmember.api.service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import com.srp.constelinkmember.db.entity.Member;
import com.srp.constelinkmember.dto.enums.Role;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
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

	private final RedisTemplate<String, Object> redisTemplate;
	private final TokenProvider tokenProvider;

	public LoginInfoDto login(LoginRequest loginRequest){
		String key = loginRequest.getKey();
		log.info("key == " +key);

		Integer integerId = (Integer)redisTemplate.opsForValue().get(key);
		Long memberId = Long.valueOf(integerId);

		if(memberId == null) {
			throw new CustomException(CustomExceptionType.ABNORMAL_ACCESS_EXCEPTION);
		}

		Optional<Member> findMember = memberRepository.findById(memberId);

		LoginInfoDto loginInfoDto;

		if(findMember.isPresent()){
			Member member = findMember.get();
			String accessToken = tokenProvider.createAccessToken(member.getId(), member.getRole());
			String refreshToken = tokenProvider.createRefreshToken();
			String redisKey = "RT:"+refreshToken;

			redisTemplate.opsForValue().set(redisKey, member.getId(), 7, TimeUnit.DAYS);
			loginInfoDto = LoginInfoDto.builder()
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.nickname(member.getUsername())
				.profile(member.getMemberProfileImg())
				.build();
		}else{
			throw new CustomException(CustomExceptionType.USER_NOT_FOUND);
		}

		return loginInfoDto;
	}

	public String reGenerateToken(HttpServletRequest request, String refreshToken) {

		String token = request.getHeader(HttpHeaders.AUTHORIZATION);
		String memberId = tokenProvider.resolveToken(token);
		log.info("find by Token memberId = "+memberId);
		String redisKey = "RT:"+refreshToken;

		Integer intMemberId = (Integer) redisTemplate.opsForValue().get(redisKey);
		String saveMemberId = Integer.toString(intMemberId);
		if(saveMemberId == null){
			throw new CustomException(CustomExceptionType.NOT_LOGINED_EXCEPTION);
		}
		if(memberId.equals(saveMemberId)){
			String accessToken = tokenProvider.createAccessToken(Long.valueOf(memberId), Role.MEMBER);
			return accessToken;
		}else{
			throw new CustomException(CustomExceptionType.ABNORMAL_ACCESS_EXCEPTION);
		}

	}
}
