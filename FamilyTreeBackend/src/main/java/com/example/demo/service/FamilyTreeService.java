package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.FamilyTree;
import com.example.demo.model.LogedUser;
import com.example.demo.repository.FamilyTreeRepository;

@Service
public class FamilyTreeService {

	@Autowired
	private FamilyTreeRepository familyTreeRepository;
	
	public List<FamilyTree> getAllMyTrees() {
		return familyTreeRepository.findByUser(LogedUser.getInstance().getUser());
	}
}
