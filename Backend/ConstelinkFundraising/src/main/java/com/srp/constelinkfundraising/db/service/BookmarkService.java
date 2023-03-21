package com.srp.constelinkfundraising.db.service;

import java.time.ZoneId;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkfundraising.common.exception.CustomException;
import com.srp.constelinkfundraising.common.exception.CustomExceptionType;
import com.srp.constelinkfundraising.db.dto.request.BookmarkFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.entity.Bookmark;
import com.srp.constelinkfundraising.db.entity.BookmarkId;
import com.srp.constelinkfundraising.db.repository.BookmarkRepository;
import com.srp.constelinkfundraising.db.repository.FundraisingRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookmarkService {
	private final BookmarkRepository bookmarkRepository;
	private final FundraisingRepository fundraisingRepository;

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

		Page<FundraisingResponse> bookmarkResponses = bookmarks.map(bookmark -> new FundraisingResponse().builder()
			.categoryName(bookmark.getFundraising().getCategory().getCategoryName())
			.beneficiaryId(bookmark.getFundraising().getBeneficiaryId())
			.fundraisingAmountGoal(bookmark.getFundraising().getFundraisingAmountGoal())
			.fundraisingEndTime(bookmark.getFundraising()
				.getFundraisingEndTime()
				.now()
				.atZone(ZoneId.of("Asia/Seoul"))
				.toInstant()
				.toEpochMilli())
			.id(bookmark.getFundraising().getId())
			.fundraisingStartTime(bookmark.getFundraising()
				.getFundraisingStartTime()
				.now()
				.atZone(ZoneId.of("Asia/Seoul"))
				.toInstant()
				.toEpochMilli())
			.fundraisingAmountRaised(bookmark.getFundraising().getFundraisingAmountRaised())
			.fundraisingTitle(bookmark.getFundraising().getFundraisingTitle())
			.fundraisingThumbnail(bookmark.getFundraising().getFundraisingThumbnail())
			.fundraisingStory(bookmark.getFundraising().getFundraisingStory())
			.fundraisingPeople(bookmark.getFundraising().getFundraisingPeople())
			.build());

		return bookmarkResponses;
	}
}
