package com.srp.constelinkfile.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.srp.constelinkfile.service.FileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FileController {

	private final FileService fileService;
	@PostMapping(value = "save/card", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity uploadFile(@RequestParam("files") MultipartFile file){
		fileService.upload(file);

		return ResponseEntity.ok("파일 업로드가 정상적으로 완료되었습니다");
	}

}
