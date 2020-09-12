package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.FamilyTreeDTO;
import com.example.demo.model.FamilyTree;
import com.example.demo.service.FamilyTreeService;

@RestController
@RequestMapping("/familyTree")
@CrossOrigin
public class FamilyTreeController {

	@Autowired
	private FamilyTreeService familyTreeService;
	
	@PostMapping
	public ResponseEntity<FamilyTreeDTO> addNew(@RequestBody FamilyTreeDTO familyTreeDTO) {
		FamilyTree familyTree = familyTreeService.addNew(familyTreeDTO);
		return new ResponseEntity<FamilyTreeDTO>(new FamilyTreeDTO(familyTree), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<FamilyTree>> getAllMyTrees() {
		List<FamilyTree> trees = familyTreeService.getAllMyTrees();
		return new ResponseEntity<List<FamilyTree>>(trees, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<FamilyTreeDTO> editFamilyTree(@RequestBody FamilyTreeDTO familyTreeDTO) {
		System.out.println("#####");
		FamilyTree familyTree = familyTreeService.editFamilyTree(familyTreeDTO);
		if (familyTree == null) {
			System.out.println("####");
			return new ResponseEntity<FamilyTreeDTO>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<FamilyTreeDTO>(new FamilyTreeDTO(familyTree), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<FamilyTreeDTO> deleteFamilyTree(@PathVariable("id") Long id) {
		familyTreeService.deleteFamilyTree(id);
		return new ResponseEntity<FamilyTreeDTO>(HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<String> deleteAll() {
		familyTreeService.deleteAll();
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
