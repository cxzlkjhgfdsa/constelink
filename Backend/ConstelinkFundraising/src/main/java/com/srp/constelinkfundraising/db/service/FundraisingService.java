package com.srp.constelinkfundraising.db.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkfundraising.db.dto.request.DonateRequest;
import com.srp.constelinkfundraising.db.dto.request.MakeFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.entity.Fundraising;
import com.srp.constelinkfundraising.db.repository.CategoryRepository;
import com.srp.constelinkfundraising.db.repository.FundraisingRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FundraisingService {

	private final FundraisingRepository fundraisingRepository;
	private final CategoryRepository categoryRepository;
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

	public Fundraising makeFundraising(MakeFundraisingRequest makeFundraisingRequest) {
		Fundraising fundraising = Fundraising.builder()
			.fundraisingAmountGoal(makeFundraisingRequest.getFundraisingAmountGoal())
			.fundraisingThumbnail(makeFundraisingRequest.getFundraisingThumbnail())
			.fundraisingTitle(makeFundraisingRequest.getFundraisingTitle())
			.fundraisingStory(makeFundraisingRequest.getFundraisingStory())
			.fundraisingEndTime(new Timestamp(makeFundraisingRequest.getFundraisingEndTime()).toLocalDateTime())
			.beneficiaryId(makeFundraisingRequest.getBeneficiaryId())
			.category(categoryRepository.findCategoryById(makeFundraisingRequest.getCategoryId()))
			.build();
		fundraisingRepository.saveAndFlush(fundraising);

		return fundraising;
	}

	public FundraisingResponse bookmarkFundraising(Long fundrasingId){
		FundraisingResponse fundraisingResponse = new FundraisingResponse();


		return fundraisingResponse;


	}
}
