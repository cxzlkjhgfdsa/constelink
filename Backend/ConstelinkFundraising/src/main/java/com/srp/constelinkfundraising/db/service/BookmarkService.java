package com.srp.constelinkfundraising.db.service;

import java.awt.print.Book;

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
		System.out.println("도착");
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

	public Page<Fundraising> getBookmarks(Long memberId, int page, int size) {
		System.out.println("북마크서비스");
		Page<Bookmark> bookmarks = bookmarkRepository.findBookmarksById_MemberId (memberId, PageRequest.of(page,size));
		Page<Fundraising> bookmarkResponses = bookmarks.map(bookmark -> bookmark.getFundraising());
		System.out.println("북마크끝");
		return bookmarkResponses;
	}
}
