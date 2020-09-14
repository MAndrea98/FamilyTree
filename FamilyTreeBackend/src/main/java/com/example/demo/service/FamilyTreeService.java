package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.FamilyTreeDTO;
import com.example.demo.dto.WithPartnerDTO;
import com.example.demo.model.FamilyTree;
import com.example.demo.model.LogedUser;
import com.example.demo.model.Person;
import com.example.demo.repository.FamilyTreeRepository;
import com.example.demo.repository.PersonRepository;

@Service
@Transactional
public class FamilyTreeService {

	@Autowired
	private FamilyTreeRepository familyTreeRepository;
	
	@Autowired
	private PersonRepository personRepository;
	
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

	public FamilyTree addWithPartner(WithPartnerDTO withPartnerDTO) {
		FamilyTree familyTree = familyTreeRepository.findById(withPartnerDTO.getId()).orElse(null);
		System.out.println("Before: " + familyTree.getMembers().size());
		Person person = new Person();
		person.setName(withPartnerDTO.getName());
		person.setTitle(withPartnerDTO.getTitle());
		person.setImage(withPartnerDTO.getImg());
		person.setDate(withPartnerDTO.getBirth() + "-" + withPartnerDTO.getDeath());
		String[] splitter = withPartnerDTO.getPartner().split("\\(");
		String[] splitter1 = splitter[1].split("\\[");
		String partnerName = splitter[0].substring(0, splitter[0].length() - 1);
		String partnerTitle = splitter1[0].substring(0, splitter1[0].length() - 2);
		String partnerDate = splitter1[1].substring(0, splitter1[1].length() - 1);
		Person spouse = personRepository.findByNameAndTitleAndDate(partnerName, partnerTitle, partnerDate);
		System.out.println(spouse.getName());
		person.setSpouse(spouse);
		familyTree.getMembers().add(person);
		person.setFamilyTree(familyTree);
		Person p = personRepository.save(person);
		FamilyTree ft = familyTreeRepository.save(familyTree);
		System.out.println("After:" + ft.getMembers().size());
		return ft;
	}
	
}
