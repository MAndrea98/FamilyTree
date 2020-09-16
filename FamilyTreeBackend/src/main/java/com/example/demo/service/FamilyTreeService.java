package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.ChartDTO;
import com.example.demo.dto.FamilyTreeDTO;
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
	
	public FamilyTree addFirstPerson(Long id) {
		FamilyTree familyTree = familyTreeRepository.findById(id).orElse(null);
		Person person = new Person();
		person.setName("Undefined");
		person.setTitle("Undefined");
		person.setDate("2020-");
		person.setFamilyTreeId(1L);
		person.setFamilyTree(familyTree);
		person.setImage("../../../assets/images/no_image.png");
		familyTree.setMembers(new ArrayList<Person>());
		familyTree.getMembers().add(person);
		return familyTreeRepository.save(familyTree);
	}
	
	public FamilyTree editFamilyTree(FamilyTreeDTO familyTreeDTO) {
		FamilyTree familyTree = familyTreeRepository.findById(familyTreeDTO.getId()).orElse(null);
		if (familyTree == null) {
			return null;
		}
		
		if (!familyTree.getUser().getUsername().equals(LogedUser.getInstance().getUser().getUsername())) {
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

	public List<Person> getMembers(Long id) {
		FamilyTree familyTree = familyTreeRepository.findById(id).orElse(null);
		return familyTree.getMembers();
	}

	public FamilyTree save(List<ChartDTO> members, Long id) {
		System.out.println("=============== SAVE ==============");
		FamilyTree familyTree = familyTreeRepository.findById(id).orElse(null);
		if (familyTree == null)
			return null;
		if (familyTree.getMembers() == null)
			familyTree.setMembers(new ArrayList<Person>());
		
		familyTree.setMembers(new ArrayList<Person>());
		for (ChartDTO person : members) {
			Person p = personRepository.findByFamilyTreeAndFamilyTreeId(familyTree, person.getId());
			if (p == null) {
				p = new Person();
				p.setFamilyTreeId(person.getId());
				p.setName(person.getName());
				p.setTitle(person.getTitle());
				p.setDate(person.getDate());
				p.setFamilyTree(familyTree);
				personRepository.save(p);
			}
			
		}
		
		for (ChartDTO person : members) {
			Person p = personRepository.findByFamilyTreeAndFamilyTreeId(familyTree, person.getId());
			p.setName(person.getName());
			p.setTitle(person.getTitle());
			p.setDate(person.getDate());
			
			if (person.getTags().contains("partner")) {
				p.setSpouseID(person.getPid());
			}
			else {
				if (person.getPid() != null) {
					Person father = personRepository.findByFamilyTreeAndFamilyTreeId(familyTree, person.getPid());
					p.setFatherID(father.getFamilyTreeId());
				}
				else {
					p.setFatherID(null);
				}
				if (person.getPpid() != null) {
					Person mother = personRepository.findByFamilyTreeAndFamilyTreeId(familyTree, person.getPpid());
					p.setMotherID(mother.getFamilyTreeId());
				}
				else {
					p.setMotherID(null);
				}
			}
			
			p.setImage(person.getImg());
			p.setFamilyTree(familyTree);
			personRepository.save(p);
			familyTree.getMembers().add(p);
		}
		return familyTreeRepository.save(familyTree);
	}
	
}
