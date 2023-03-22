package com.srp.constelinkfundraising.db.service;

import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.beneficiaryrpc.BeneficiariesInfoReq;
import com.srp.beneficiaryrpc.BeneficiariesInfoRes;
import com.srp.beneficiaryrpc.BeneficiaryGrpcServiceGrpc;
import com.srp.beneficiaryrpc.BeneficiaryInfoRes;
import com.srp.constelinkfundraising.common.exception.CustomException;
import com.srp.constelinkfundraising.common.exception.CustomExceptionType;
import com.srp.constelinkfundraising.db.dto.request.BookmarkFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.entity.Bookmark;
import com.srp.constelinkfundraising.db.entity.BookmarkId;
import com.srp.constelinkfundraising.db.entity.Category;
import com.srp.constelinkfundraising.db.repository.BookmarkRepository;
import com.srp.constelinkfundraising.db.repository.CategoryRepository;
import com.srp.constelinkfundraising.db.repository.FundraisingRepository;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookmarkService {
	private final BookmarkRepository bookmarkRepository;
	private final FundraisingRepository fundraisingRepository;
	private final CategoryRepository categoryRepository;
	private final ManagedChannel channel = ManagedChannelBuilder.forAddress(
			"j8a206.p.ssafy.io", 8899)
		.usePlaintext()
		.build();
	public BeneficiaryGrpcServiceGrpc.BeneficiaryGrpcServiceBlockingStub stub = BeneficiaryGrpcServiceGrpc.newBlockingStub(
		channel);

	public String bookmarkFundraising(BookmarkFundraisingRequest bookmarkFundraisingRequest) {
		BookmarkId bookmarkId = new BookmarkId(bookmarkFundraisingRequest.getMemberId(),
			bookmarkFundraisingRequest.getFundraisingId());
		Bookmark bookmark = bookmarkRepository.findBookmarksById(bookmarkId);

		if (bookmark == null) {
			bookmark = new Bookmark(bookmarkId,
				fundraisingRepository.findFundraisingById(bookmarkId.getFundraisingId()).orElseThrow(()
					-> new CustomException(CustomExceptionType.FUNDRAISING_NOT_FOUND)));
			bookmarkRepository.saveAndFlush(bookmark);
			return "북마크 추가 완료";
		} else {
			bookmarkRepository.deleteById(bookmarkId);
			return "북마크 삭제 완료";
		}
	}

	public Page<FundraisingResponse> getBookmarks(Long memberId, int page, int size) {

		Page<Bookmark> bookmarks = bookmarkRepository.findBookmarksByIdMemberId(memberId, PageRequest.of(page, size));
		HashSet<Long> memberBookmark =
			memberId < 1 ? new HashSet<>() : bookmarkRepository.findBookmarksByIdMemberId(memberId);
		List<Category> categories = categoryRepository.findAll();
		Map<Long, String> categoriesMap = categories.stream()
			.collect(Collectors.toMap(Category::getId, Category::getCategoryName));
		HashSet<Long> idList = new HashSet<>();

		Page<FundraisingResponse> bookmarkResponses = bookmarks.map(bookmark -> {
			idList.add(bookmark.getFundraising().getBeneficiaryId());
			return new FundraisingResponse().builder()
				.categoryName(categoriesMap.get(bookmark.getFundraising().getCategory().getId()))
				.beneficiaryId(bookmark.getFundraising().getBeneficiaryId())
				.fundraisingAmountGoal(bookmark.getFundraising().getFundraisingAmountGoal())
				.fundraisingEndTime(bookmark.getFundraising()
					.getFundraisingEndTime()
					.atZone(ZoneId.of("Asia/Seoul"))
					.toInstant()
					.toEpochMilli())
				.id(bookmark.getFundraising().getId())
				.fundraisingStartTime(bookmark.getFundraising()
					.getFundraisingStartTime()
					.atZone(ZoneId.of("Asia/Seoul"))
					.toInstant()
					.toEpochMilli())
				.fundraisingAmountRaised(bookmark.getFundraising().getFundraisingAmountRaised())
				.fundraisingTitle(bookmark.getFundraising().getFundraisingTitle())
				.fundraisingThumbnail(bookmark.getFundraising().getFundraisingThumbnail())
				.fundraisingStory(bookmark.getFundraising().getFundraisingStory())
				.fundraisingPeople(bookmark.getFundraising().getFundraisingPeople())
				.fundraisingBookmarked(true)
				.build();
		});

		BeneficiariesInfoReq beneficiariesInfoReq = BeneficiariesInfoReq.newBuilder()
			.addAllId(idList.stream().toList()).build();
		BeneficiariesInfoRes beneficiariesInfoRes = stub.getBeneficiariesRpc(beneficiariesInfoReq);

		bookmarkResponses.getContent().stream().forEach(item -> {
			BeneficiaryInfoRes beneficiaryInfoRes = beneficiariesInfoRes.getBeneficiariesMap()
				.get(item.getBeneficiaryId());
			item.setPhoto(beneficiaryInfoRes.getPhoto());
			item.setBeneficiaryStatus(beneficiaryInfoRes.getStatus());
			item.setHospitalName(beneficiaryInfoRes.getHospital());
			item.setBeneficiaryName(beneficiaryInfoRes.getName());
			item.setBeneficiaryDisease(beneficiaryInfoRes.getDisease());
			item.setBeneficiaryBirthday(beneficiaryInfoRes.getBirthday().getSeconds() * 1000);
		});

		System.out.println(memberId);
		System.out.println(memberBookmark);
		System.out.println(memberBookmark.contains(1L));
		System.out.println(1111111111);
		return bookmarkResponses;
	}
}
