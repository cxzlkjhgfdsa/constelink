package com.srp.constelinkmember.security.dto;

import java.util.Map;

public class KakaoMemberInfo extends OAuth2MemberInfo {
	private Map<String, Object> profile_item;

	public KakaoMemberInfo(Map<String, Object> attributes) {
		super(attributes);
		this.profile_item = (Map<String, Object>)attributes.get("kakao_account");
	}

	@Override
	public String getProviderId() {
		return String.valueOf(attributes.get("id"));
	}

	@Override
	public SocialType getProvider() {
		return SocialType.KAKAO;
	}

	@Override
	public String getEmail() {
		return (String)profile_item.get("email");
	}

	@Override
	public String getNickName() {
		return (String)attributes.get("nickname");
	}

	@Override
	public String getProfile() {
		return (String)attributes.get("profile_image");
	}
}
