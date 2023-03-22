package com.srp.constelinkfundraising.db.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkfundraising.db.dto.request.BookmarkFundraisingRequest;
import com.srp.constelinkfundraising.db.dto.response.FundraisingResponse;
import com.srp.constelinkfundraising.db.service.BookmarkService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "bookmark", description = "기부 북마크 api")
@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmarks")
public class BookmarkController {

	private final BookmarkService bookmarkService;

	// Bookmark 등록 or 해체
	@Operation(summary = "북마크 추가/삭제", description = "북마크에 이미 있으면 삭제, 없으면 추가")
	@PostMapping("")
	public Boolean bookmarkFundraising(
		@RequestBody BookmarkFundraisingRequest bookmarkFundraisingRequest
	) {
		return bookmarkService.bookmarkFundraising(bookmarkFundraisingRequest);
	}

	@Operation(summary = "북마크한 목록 조회", description = "query에 memberId 넣으면 해당 member 북마크 목록 조회")
	@GetMapping("")
	public Page<FundraisingResponse> getBookmarks(
		@RequestParam(name = "page", required = false, defaultValue = "1") int page,
		@RequestParam(name = "size", required = false, defaultValue = "5") int size,
		@RequestParam(name = "memberId", required = true) Long memberId
	) {

		return bookmarkService.getBookmarks(memberId, page - 1, size);
	}
}
