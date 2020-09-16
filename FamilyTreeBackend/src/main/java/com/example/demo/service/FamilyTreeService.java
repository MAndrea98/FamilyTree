package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.FamilyTreeDTO;
import com.example.demo.dto.PersonDTO;
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

	public FamilyTree save(FamilyTreeDTO familyTreeDTO) {
		FamilyTree familyTree = familyTreeRepository.findById(familyTreeDTO.getId()).orElse(null);
		if (familyTree == null)
			return null;
		familyTree.setMembers(new ArrayList<Person>());
		System.out.println(familyTree.getMembers().size());
		for (Person person : familyTreeDTO.getMembers()) {
			Person p = personRepository.findById(person.getId()).orElse(null);
			if (p == null)
				p = new Person();
			
			p.setName(person.getName());
			p.setTitle(person.getTitle());
			p.setDate(person.getDate());
			p.setFather(person.getFather());
			p.setMother(person.getMother());
			p.setSpouse(person.getSpouse());
			p.setImage(person.getImage());
			p.setFamilyTree(familyTree);
			personRepository.save(p);
			familyTree.getMembers().add(p);
		}
		return familyTreeRepository.save(familyTree);
	}

	public List<Person> getMembers(Long id) {
		FamilyTree familyTree = familyTreeRepository.findById(id).orElse(null);
		return familyTree.getMembers();
	}

	public FamilyTree save(List<PersonDTO> members, Long id) {
		FamilyTree familyTree = familyTreeRepository.findById(id).orElse(null);
		if (familyTree == null)
			return null;
		familyTree.setMembers(new ArrayList<Person>());
		System.out.println(members.size());
		for (PersonDTO person : members) {
			Person p = personRepository.findById(person.getId()).orElse(null);
			if (p == null) {
				System.out.println("null");
				p = new Person();
			}
			
			p.setName(person.getName());
			p.setTitle(person.getTitle());
			p.setDate(person.getDate());
			
			if (person.getFatherId() != null) {
				Person father = personRepository.findById(person.getFatherId()).orElse(null);
				p.setFather(father);
			}
			else {
				p.setFather(null);
			}
			
			if (person.getMotherId() != null) {
				Person mother = personRepository.findById(person.getMotherId()).orElse(null);
				p.setMother(mother);
			}
			else {
				p.setMother(null);
			}
			
			if (person.getSpouseId() != null) {
				Person spouse = personRepository.findById(person.getSpouseId()).orElse(null);
				p.setSpouse(spouse);
			}
			else {
				p.setSpouse(null);
			}
			
			p.setImage(person.getImage());
			p.setFamilyTree(familyTree);
			personRepository.save(p);
			familyTree.getMembers().add(p);
		}
		return familyTreeRepository.save(familyTree);
	}
	
}
