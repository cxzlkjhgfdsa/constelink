package com.srp.constelinkmember.security.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.srp.constelinkmember.api.service.MemberService;
import com.srp.constelinkmember.common.exception.CustomException;
import com.srp.constelinkmember.common.exception.CustomExceptionType;
import com.srp.constelinkmember.db.entity.Member;
import com.srp.constelinkmember.db.repository.MemberRepository;
import com.srp.constelinkmember.dto.GoogleMemberInfo;
import com.srp.constelinkmember.dto.KakaoMemberInfo;
import com.srp.constelinkmember.dto.OAuth2MemberInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;

	/**
	 * 해당 메소드에서 리턴한  PrincipalDetail 클래스가 SpringSecurity ContextHolder에 올라감
	 *
	 * @param userRequest the user request
	 * @return PricipalDetail을 Return
	 * @throws OAuth2AuthenticationException
	 */
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		log.info("회원 정보 ==" + oAuth2User.getAttributes().toString());
		return processOAuth2User(userRequest, oAuth2User);
	}

	private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
		OAuth2MemberInfo oAuth2MemberInfo = getOAuth2UserInfo(userRequest, oAuth2User.getAttributes());

		log.info("소셜 로그인 완료 후 PK 값 == " + oAuth2MemberInfo.getProviderId());

		// 유저 Entity, Repository 생성 후 현재 서비스에 가입중인 유저인지 확인하는 과정
		Optional<Member> findMember = memberRepository.findBySocialId(oAuth2MemberInfo.getProviderId());

		// 가입되어있지 않다면 강제 회원가입
		if(!findMember.isPresent()){
			log.info("회원가입 해야됨");

		}
		// 가입되어있다면 로그인
		else{
			log.info("로그인");
		}
		//PrincipalDetail을
		return oAuth2User;
	}

	/**
	 * SocialType 마다 리턴해주는 UserInfo의 형식이 다름 따라서 SocialType 을 구분해서 정보를 빼내야함
	 *
	 * @param userRequest -> SpringSecurity에서 OAuth 관련 작업을 모두 완료한 후 반환하는 UserInfo 가 들어있는 반환 값
	 * @param attributes  -> userRequest에서 추출한 실제 UserInfo가 들어있는 변수
	 * @return OAuth2UserInfo -> 각 타입에 맞게 정보를 추출해 OAuth2UserInfo를 상속받고 있는 클래스로 반환
	 */
	private OAuth2MemberInfo getOAuth2UserInfo(OAuth2UserRequest userRequest, Map<String, Object> attributes) {
		System.out.println("is google " + userRequest.getClientRegistration().getClientName());

		if (userRequest.getClientRegistration().getClientName().equalsIgnoreCase("GOOGLE")) {
			return new GoogleMemberInfo(attributes);
		} else if (userRequest.getClientRegistration().getClientName().equalsIgnoreCase("KAKAO")) {
			return new KakaoMemberInfo(attributes);
		} else {
			throw new CustomException(CustomExceptionType.OAUTH2_AUTHENTICATION_PROCESSING_EXCEPTION);
		}
	}
}
