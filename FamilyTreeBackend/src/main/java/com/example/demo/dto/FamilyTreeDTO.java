package com.example.demo.dto;

import com.example.demo.model.FamilyTree;
import com.example.demo.model.Person;
import com.example.demo.model.User;

public class FamilyTreeDTO {

	private Long id;
	private String name;
	private String description;
	private Person member;
	private User user;
	
	public FamilyTreeDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FamilyTreeDTO(Long id, String name, String description, Person member, User user) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.member = member;
		this.user = user;
	}
	
	public FamilyTreeDTO(FamilyTree familyTree) {
		this(familyTree.getId(), familyTree.getName(), familyTree.getDescription(), familyTree.getMember(), familyTree.getUser());
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

	public Person getMember() {
		return member;
	}

	public void setMember(Person member) {
		this.member = member;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
