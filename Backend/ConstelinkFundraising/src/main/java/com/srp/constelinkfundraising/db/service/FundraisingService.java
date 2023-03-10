package com.srp.constelinkfundraising.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkfundraising.db.dto.request.DonateRequest;
import com.srp.constelinkfundraising.db.dto.request.MakeFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.entity.Fundraising;
import com.srp.constelinkfundraising.db.repository.FundraisingRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FundraisingService {

	private final FundraisingRepository fundraisingRepository;
	public Page<FundraisingResponse> getFundraisings(int page, int size) {
		Page<Fundraising> fundraising = fundraisingRepository.findAll(PageRequest.of(page, size));
		Page<FundraisingResponse> getFundraisingResponsePage = fundraising.map(
			fund -> new FundraisingResponse().builder()
				.fundraisingIsDone(fund.isFundraisingIsDone())
				.fundraisingPeople(fund.getFundraisingPeople())
				.fundraisingStory(fund.getFundraisingStory())
				.fundraisingThumbnail(fund.getFundraisingThumbnail())
				.fundraisingTitle(fund.getFundraisingTitle())
				.fundraisingAmountRaised(fund.getFundraisingAmountRaised())
				.fundraisingStartTime(fund.getFundraisingStartTime())
				.id(fund.getId())
				.fundraisingEndTime(fund.getFundraisingEndTime())
				.fundraisingAmountGoal(fund.getFundraisingAmountGoal())
				.beneficiaryId(fund.getBeneficiaryId())
				.categoryId(fund.getId())
				.build()
		);

		return getFundraisingResponsePage;
	}



	public Page<FundraisingResponse> getFundraisingsByDone(int page, int size, Boolean done) {
		Page<Fundraising> fundraising = fundraisingRepository.findFundraisingsByFundraisingIsDone(done, PageRequest.of(page, size));
		Page<FundraisingResponse> fundraisingResponsePage = fundraising.map(
			fund -> new FundraisingResponse().builder()
				.fundraisingIsDone(fund.isFundraisingIsDone())
				.fundraisingPeople(fund.getFundraisingPeople())
				.fundraisingStory(fund.getFundraisingStory())
				.fundraisingThumbnail(fund.getFundraisingThumbnail())
				.fundraisingTitle(fund.getFundraisingTitle())
				.fundraisingAmountRaised(fund.getFundraisingAmountRaised())
				.fundraisingStartTime(fund.getFundraisingStartTime())
				.id(fund.getId())
				.fundraisingEndTime(fund.getFundraisingEndTime())
				.fundraisingAmountGoal(fund.getFundraisingAmountGoal())
				.beneficiaryId(fund.getBeneficiaryId())
				.categoryId(fund.getId())
				.build()
		);
		System.out.println("확인2");
		return fundraisingResponsePage;
	}

	public FundraisingResponse donateFundraising(DonateRequest donateRequest) {
		// 돈 0원 이상 체크, id체크
		Fundraising fundraising = fundraisingRepository.findFundraisingById(donateRequest.getId());
		fundraising.setFundraisingAmountRaised(fundraising.getFundraisingAmountRaised()+donateRequest.getCash());
		FundraisingResponse fundraisingResponse = FundraisingResponse.builder()
			.fundraisingIsDone(fundraising.isFundraisingIsDone())
			.fundraisingPeople(fundraising.getFundraisingPeople())
			.fundraisingStory(fundraising.getFundraisingStory())
			.fundraisingThumbnail(fundraising.getFundraisingThumbnail())
			.fundraisingTitle(fundraising.getFundraisingTitle())
			.fundraisingAmountRaised(fundraising.getFundraisingAmountRaised())
			.fundraisingStartTime(fundraising.getFundraisingStartTime())
			.id(fundraising.getId())
			.fundraisingEndTime(fundraising.getFundraisingEndTime())
			.fundraisingAmountGoal(fundraising.getFundraisingAmountGoal())
			.beneficiaryId(fundraising.getBeneficiaryId())
			.categoryId(fundraising.getId())
			.build();
		return 	fundraisingResponse;
	}

	public String makeFundraising(MakeFundraisingRequest makeFundraisingRequest) {
		
		return "펀드를 만들었습니다.";
	}
}
