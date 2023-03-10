package com.srp.constelinkfundraising.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkfundraising.db.entity.Fundraising;
import com.srp.constelinkfundraising.db.repository.FundraisingRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FundraisingService {

	private final FundraisingRepository fundraisingRepository;

	public Page<Fundraising> getFundraisingsByDone(int page, int size, Boolean done) {
		Page<Fundraising> fundraising = fundraisingRepository.findAll(PageRequest.of(page, size, Sort.by("fundraisingIsDone")));
		return fundraising;
	}
}
