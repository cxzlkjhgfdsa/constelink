package com.srp.constelinkfundraising.db.service;

import java.awt.print.Book;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srp.constelinkfundraising.db.dto.request.BookmarkFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.BookmarkResponse;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.entity.Bookmark;
import com.srp.constelinkfundraising.db.entity.BookmarkId;
import com.srp.constelinkfundraising.db.entity.Fundraising;
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
				fundraisingRepository.findFundraisingById(bookmarkId.getFundraisingId()));
			bookmarkRepository.saveAndFlush(bookmark);
			return "추가";
		} else {
			bookmarkRepository.deleteById(bookmarkId);
			return "삭제";
		}
	}

	public Page<FundraisingResponse> getBookmarks(Long memberId, int page, int size) {

		Page<Bookmark> bookmarks = bookmarkRepository.findBookmarksByIdMemberId (memberId, PageRequest.of(page,size));

		Page<FundraisingResponse> bookmarkResponses = bookmarks.map(bookmark -> new FundraisingResponse().builder()
				.categoryName(bookmark.getFundraising().getCategory().getCategoryName())
				.beneficiaryId(bookmark.getFundraising().getBeneficiaryId())
				.fundraisingAmountGoal(bookmark.getFundraising().getFundraisingAmountGoal())
				.fundraisingEndTime(bookmark.getFundraising().getFundraisingEndTime())
				.id(bookmark.getFundraising().getId())
				.fundraisingStartTime(bookmark.getFundraising().getFundraisingStartTime())
				.fundraisingAmountRaised(bookmark.getFundraising().getFundraisingAmountRaised())
				.fundraisingTitle(bookmark.getFundraising().getFundraisingTitle())
				.fundraisingThumbnail(bookmark.getFundraising().getFundraisingThumbnail())
				.fundraisingStory(bookmark.getFundraising().getFundraisingStory())
				.fundraisingPeople(bookmark.getFundraising().getFundraisingPeople())
				.build());

		return bookmarkResponses;
	}
}
