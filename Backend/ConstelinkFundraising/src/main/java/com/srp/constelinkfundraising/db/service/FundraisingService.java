package com.srp.constelinkfundraising.db.service;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.beneficiaryrpc.BeneficiariesInfoReq;
import com.srp.beneficiaryrpc.BeneficiariesInfoRes;
import com.srp.beneficiaryrpc.BeneficiaryGrpcServiceGrpc;
import com.srp.beneficiaryrpc.BeneficiaryInfoRes;
import com.srp.constelinkfundraising.common.exception.CustomException;
import com.srp.constelinkfundraising.common.exception.CustomExceptionType;
import com.srp.constelinkfundraising.db.dto.enums.FundraisingSortType;
import com.srp.constelinkfundraising.db.dto.request.DonateRequest;
import com.srp.constelinkfundraising.db.dto.request.MakeFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.FundraisingBeneficiaryResponse;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.entity.Category;
import com.srp.constelinkfundraising.db.entity.Fundraising;
import com.srp.constelinkfundraising.db.repository.BookmarkRepository;
import com.srp.constelinkfundraising.db.repository.CategoryRepository;
import com.srp.constelinkfundraising.db.repository.FundraisingRepository;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundraisingService {

	private final FundraisingRepository fundraisingRepository;
	private final CategoryRepository categoryRepository;
	private final BookmarkRepository bookmarkRepository;
	private final ManagedChannel channel = ManagedChannelBuilder.forAddress(
			"j8a206.p.ssafy.io", 8899)
		.usePlaintext()
		.build();
	public BeneficiaryGrpcServiceGrpc.BeneficiaryGrpcServiceBlockingStub stub = BeneficiaryGrpcServiceGrpc.newBlockingStub(
		channel);

	public Page<FundraisingResponse> getFundraisings(int page, int size,
		FundraisingSortType sortType, Long memberId) {
		Page<Fundraising> fundraising;
		HashSet<Long> memberBookmark =
			memberId < 1 ? new HashSet<>() : bookmarkRepository.findBookmarksByIdMemberId(memberId);

		switch (sortType) {
			case ALL:
				fundraising = fundraisingRepository.findAll(PageRequest.of(page, size));
				break;
			case FINISHED:
				fundraising = fundraisingRepository.findFundraisingsByFundraisingIsDone(true,
					PageRequest.of(page, size));
				break;
			case UNFINISHED:
				fundraising = fundraisingRepository.findFundraisingsByFundraisingIsDone(false,
					PageRequest.of(page, size));
				break;
			case START_DATE_ASC:
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingStartTime").ascending()));
				break;
			case START_DATE_DESC:
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingStartTime").descending()));
				break;
			case END_DATE_ASC:
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingEndTime").ascending()));
				break;
			case END_DATE_DESC:
				System.out.println("DESC");
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingEndTime").descending()));
				break;
			default:
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingStartTime").descending()));
				break;
		}
		HashSet<Long> idList = new HashSet<>();
		Page<FundraisingResponse> fundraisingResponsePage = fundraising.map(
			fund -> {
				idList.add(fund.getBeneficiaryId());
				return new FundraisingResponse().builder()
					.fundraisingIsDone(fund.isFundraisingIsDone())
					.fundraisingPeople(fund.getFundraisingPeople())
					.fundraisingStory(fund.getFundraisingStory())
					.fundraisingThumbnail(fund.getFundraisingThumbnail())
					.fundraisingTitle(fund.getFundraisingTitle())
					.fundraisingAmountRaised(fund.getFundraisingAmountRaised())
					.fundraisingStartTime(
						fund.getFundraisingStartTime()
							.atZone(ZoneId.of("Asia/Seoul"))
							.toInstant()
							.toEpochMilli())
					.id(fund.getId())
					.fundraisingEndTime(
						fund.getFundraisingEndTime().atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
					.fundraisingAmountGoal(fund.getFundraisingAmountGoal())
					.beneficiaryId(fund.getBeneficiaryId())
					.categoryName(fund.getCategory().getCategoryName())
					.fundraisingBookmarked(memberBookmark.contains(fund.getId()))
					.build();
			}
		);

		//List 중복제거
		BeneficiariesInfoReq beneficiariesInfoReq = BeneficiariesInfoReq.newBuilder()
			.addAllId(idList.stream().toList()).build();
		BeneficiariesInfoRes beneficiariesInfoRes = stub.getBeneficiariesRpc(beneficiariesInfoReq);

		fundraisingResponsePage.getContent().stream().forEach(item -> {
			BeneficiaryInfoRes beneficiaryInfoRes = beneficiariesInfoRes.getBeneficiariesMap()
				.get(item.getBeneficiaryId());
			item.setBeneficiaryName(beneficiaryInfoRes.getName());
			item.setBeneficiaryDisease(beneficiaryInfoRes.getDisease());
			item.setBeneficiaryBirthday(beneficiaryInfoRes.getBirthday().getSeconds() * 1000);
			item.setBeneficiaryStatus(beneficiaryInfoRes.getStatus());
			item.setPhoto(beneficiaryInfoRes.getPhoto());
			item.setHospitalName(beneficiaryInfoRes.getHospital());
		});
		return fundraisingResponsePage;
	}

	public Page<FundraisingBeneficiaryResponse> getFundraisingsBeneficiaries(int page, int size,
		FundraisingSortType sortType, Long memberId) {
		Page<Fundraising> fundraising;
		HashSet<Long> memberBookmark =
			memberId < 1 ? new HashSet<>() : bookmarkRepository.findBookmarksByIdMemberId(memberId);
		List<Category> categories = categoryRepository.findAll();
		Map<Long, String> categoriesMap = categories.stream()
			.collect(Collectors.toMap(Category::getId, Category::getCategoryName));
		switch (sortType) {
			case ALL:
				fundraising = fundraisingRepository.findAll(PageRequest.of(page, size));
				break;
			case FINISHED:
				fundraising = fundraisingRepository.findFundraisingsByFundraisingIsDone(true,
					PageRequest.of(page, size));
				break;
			case UNFINISHED:
				fundraising = fundraisingRepository.findFundraisingsByFundraisingIsDone(false,
					PageRequest.of(page, size));
				break;
			case START_DATE_ASC:
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingStartTime").ascending()));
				break;
			case START_DATE_DESC:
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingStartTime").descending()));
				break;
			case END_DATE_ASC:
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingEndTime").ascending()));
				break;
			case END_DATE_DESC:
				System.out.println("DESC");
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingEndTime").descending()));
				break;
			default:
				fundraising = fundraisingRepository.findAll(
					PageRequest.of(page, size, Sort.by("fundraisingStartTime").descending()));
				break;
		}

		Page<FundraisingBeneficiaryResponse> getFundraisingResponsePage = fundraising.map(
			fund -> new FundraisingBeneficiaryResponse().builder()
				.fundraisingIsDone(fund.isFundraisingIsDone())
				.fundraisingPeople(fund.getFundraisingPeople())
				.fundraisingStory(fund.getFundraisingStory())
				.fundraisingThumbnail(fund.getFundraisingThumbnail())
				.fundraisingTitle(fund.getFundraisingTitle())
				.fundraisingAmountRaised(fund.getFundraisingAmountRaised())
				.fundraisingStartTime(
					fund.getFundraisingStartTime().atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
				.id(fund.getId())
				.fundraisingEndTime(
					fund.getFundraisingEndTime().atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
				.fundraisingAmountGoal(fund.getFundraisingAmountGoal())
				.beneficiaryId(fund.getBeneficiaryId())
				.categoryName(fund.getCategory().getCategoryName())
				.fundraisingBookmared(memberBookmark.contains(fund.getId()))
				.build()
		);

		return getFundraisingResponsePage;
	}

	@Transactional
	public FundraisingResponse donateFundraising(DonateRequest donateRequest) {
		// 돈 0원 이상 체크, 해당 기부 id 체크
		Fundraising fundraising = fundraisingRepository.findFundraisingById(donateRequest.getId())
			.orElseThrow(() -> new CustomException(CustomExceptionType.FUNDRAISING_NOT_FOUND));
		if (donateRequest.getCash() <= 0) {
			throw new CustomException(CustomExceptionType.DONATION_MONEY_ERROR);
		}

		fundraising.setFundraisingAmountRaised(fundraising.getFundraisingAmountRaised() + donateRequest.getCash());
		FundraisingResponse fundraisingResponse = FundraisingResponse.builder()
			.fundraisingIsDone(fundraising.isFundraisingIsDone())
			.fundraisingPeople(fundraising.getFundraisingPeople())
			.fundraisingStory(fundraising.getFundraisingStory())
			.fundraisingThumbnail(fundraising.getFundraisingThumbnail())
			.fundraisingTitle(fundraising.getFundraisingTitle())
			.fundraisingAmountRaised(fundraising.getFundraisingAmountRaised())
			.fundraisingStartTime(
				fundraising.getFundraisingStartTime().atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
			.id(fundraising.getId())
			.fundraisingEndTime(
				fundraising.getFundraisingEndTime().atZone(ZoneId.of("Asia/Seoul")).toInstant().toEpochMilli())
			.fundraisingAmountGoal(fundraising.getFundraisingAmountGoal())
			.beneficiaryId(fundraising.getBeneficiaryId())
			.categoryName(fundraising.getCategory().getCategoryName())
			.build();
		return fundraisingResponse;
	}

	@Transactional
	public Fundraising makeFundraising(MakeFundraisingRequest makeFundraisingRequest) {
		Fundraising fundraising = Fundraising.builder()
			.fundraisingAmountGoal(makeFundraisingRequest.getFundraisingAmountGoal())
			.fundraisingThumbnail(makeFundraisingRequest.getFundraisingThumbnail())
			.fundraisingTitle(makeFundraisingRequest.getFundraisingTitle())
			.fundraisingStory(makeFundraisingRequest.getFundraisingStory())
			.fundraisingEndTime(new Timestamp(makeFundraisingRequest.getFundraisingEndTime()).toLocalDateTime()
				.atZone(ZoneId.of("Asia/Seoul"))
				.toLocalDateTime())
			.beneficiaryId(makeFundraisingRequest.getBeneficiaryId())
			.category(categoryRepository.findCategoryById(makeFundraisingRequest.getCategoryId()))
			.build();
		fundraisingRepository.saveAndFlush(fundraising);

		return fundraising;
	}

}
