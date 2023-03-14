package com.srp.constelinkfundraising.db.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.srp.constelinkfundraising.db.dto.enums.SortType;
import com.srp.constelinkfundraising.db.entity.Category;
import com.srp.constelinkfundraising.db.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
	private final CategoryRepository categoryRepository;

	public String addCategory(String categoryName) {
		if(categoryRepository.existsCategoryByCategoryName(categoryName)){
			return "이미 존재합니다.";
		} else {
			Category category = new Category();
			category.setCategoryName(categoryName);
			categoryRepository.saveAndFlush(category);
		}

		return "카테고리 추가 성공";
	}

	public String deleteCategory(Long categoryId) {
		categoryRepository.deleteById(categoryId);
		return "카테고리 삭제 성공";
	}

	public Page<Category> getCategories(int page, int size, SortType sortType) {
		Page<Category> categories;
		switch (sortType){
			case NAME_ASC:
				categories = categoryRepository.findAll(PageRequest.of(page, size, Sort.by("categoryName").ascending()));
				break;
			case NAME_DESC:
				categories = categoryRepository.findAll(PageRequest.of(page, size,  Sort.by("categoryName").descending()));
				break;
			case ALL:
				categories = categoryRepository.findAll(PageRequest.of(0, Integer.MAX_VALUE, Sort.by("categoryName").ascending()));
				break;
			default:
				categories = categoryRepository.findAll(PageRequest.of(page, size));
				break;
		}

		return categories;
	}
}
