package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.FamilyTreeDTO;
import com.example.demo.model.FamilyTree;
import com.example.demo.model.LogedUser;
import com.example.demo.repository.FamilyTreeRepository;

@Service
@Transactional
public class FamilyTreeService {

	@Autowired
	private FamilyTreeRepository familyTreeRepository;
	
	public List<FamilyTree> getAllMyTrees() {
		return familyTreeRepository.findByUser(LogedUser.getInstance().getUser());
	}

	public FamilyTree addNew(FamilyTreeDTO familyTreeDTO) {
		FamilyTree familyTree = new FamilyTree();
		familyTree.setName(familyTreeDTO.getName());
		familyTree.setDescription(familyTreeDTO.getDescription());
		familyTree.setUser(LogedUser.getInstance().getUser());
		return familyTreeRepository.save(familyTree);
	}
	
	public FamilyTree editFamilyTree(FamilyTreeDTO familyTreeDTO) {
		FamilyTree familyTree = familyTreeRepository.findById(familyTreeDTO.getId()).orElse(null);
		if (familyTree == null) {
			System.out.println("1");
			return null;
		}
		
		if (!familyTree.getUser().getUsername().equals(LogedUser.getInstance().getUser().getUsername())) {
			System.out.println("2");
			return null;
		}
		
		familyTree.setName(familyTreeDTO.getName());
		familyTree.setDescription(familyTreeDTO.getDescription());
		return familyTreeRepository.save(familyTree);
	}

	public void deleteFamilyTree(Long id) {
		familyTreeRepository.deleteById(id);
	}
	
	public void deleteAll() {
		familyTreeRepository.deleteByUser(LogedUser.getInstance().getUser());
	}
	
}
