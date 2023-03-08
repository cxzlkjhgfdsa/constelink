package com.srp.constelinkmember.security.principal;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.srp.constelinkmember.dto.enums.Role;
import com.srp.constelinkmember.dto.enums.SocialType;

public class MemberPrincipalDetail implements OAuth2User {

	private String memberId;
	private String memberName;
	private Map<String, Object> attributes;

	public MemberPrincipalDetail() {
	}

	public MemberPrincipalDetail(String memberId, String memberName, Map<String, Object> attributes) {
		this.memberId = memberId;
		this.memberName = memberName;
		this.attributes = attributes;
	}

	@Override
	public String getName() {
		return this.memberName;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return this.attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;

	}

}
