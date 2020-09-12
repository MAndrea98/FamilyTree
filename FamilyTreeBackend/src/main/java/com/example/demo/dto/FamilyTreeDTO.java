package com.example.demo.dto;

import java.util.List;

import com.example.demo.model.FamilyTree;
import com.example.demo.model.Person;
import com.example.demo.model.User;

public class FamilyTreeDTO {

	private Long id;
	private String name;
	private String description;
	private List<Person> members;
	private User user;
	
	public FamilyTreeDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public FamilyTreeDTO(Long id, String name, String description, List<Person> members, User user) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.members = members;
		this.user = user;
	}

	public FamilyTreeDTO(FamilyTree familyTree) {
		this(familyTree.getId(), familyTree.getName(), familyTree.getDescription(), familyTree.getMembers(), familyTree.getUser());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Person> getMembers() {
		return members;
	}

	public void setMembers(List<Person> members) {
		this.members = members;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
