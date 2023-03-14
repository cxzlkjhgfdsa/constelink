package com.srp.constelinkfundraising.db.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srp.constelinkfundraising.db.dto.enums.SortType;
import com.srp.constelinkfundraising.db.entity.Category;
import com.srp.constelinkfundraising.db.service.CategoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
@Tag(name = "category", description = "카테고리 북마크 api")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

	private final CategoryService categoryService;
	@Operation(summary = "카테고리 추가", description = "이름으로 추가, 중복시 추가안됌.")
	@PostMapping("")
	public String addCategory(
		@RequestBody String categoryName
	) {
		return categoryService.addCategory(categoryName);
	}

	@Operation(summary = "카테고리 삭제", description = "category id로 삭제")
	@DeleteMapping("")
	public String deleteCategory(
		@RequestBody Long categoryId
	) {
		return categoryService.deleteCategory(categoryId);
	}

	@Operation(summary = "모든 카테고리 열람", description = "page, size, sort_by 쿼리문으로 입력가능(default 값은 각각 1, 5, ALL), sort_by는 ALL, NAME_ASC, NAME_DESC이 있다.")
	@GetMapping("")
	public Page<Category> getCategories(
		@RequestParam(name = "page", defaultValue = "1", required = false) int page,
		@RequestParam(name = "size", defaultValue = "5", required = false) int size,
		@RequestParam(name = "sort_by", defaultValue = "ALL", required = false)SortType sortType
	) {
		Page<Category> categories = categoryService.getCategories(page-1, size, sortType);
		return categories;
	}
}
