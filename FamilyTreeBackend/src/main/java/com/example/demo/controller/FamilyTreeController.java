package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.FamilyTree;
import com.example.demo.service.FamilyTreeService;

@RestController
@RequestMapping("/familyTree")
@CrossOrigin
public class FamilyTreeController {

	@Autowired
	private FamilyTreeService familyTreeService;
	
	@GetMapping
	public ResponseEntity<List<FamilyTree>> getAllMyTrees() {
		List<FamilyTree> trees = familyTreeService.getAllMyTrees();
		return new ResponseEntity<List<FamilyTree>>(trees, HttpStatus.OK);
	}
}
