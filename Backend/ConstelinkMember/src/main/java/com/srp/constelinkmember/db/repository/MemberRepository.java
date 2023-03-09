package com.srp.constelinkmember.db.repository;

import java.util.Optional;

import com.srp.constelinkmember.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findBySocialId(String socialId);
}
