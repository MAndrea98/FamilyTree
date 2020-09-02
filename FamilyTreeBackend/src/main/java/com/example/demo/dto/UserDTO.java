package com.example.demo.dto;

import java.util.List;

import com.example.demo.model.FamilyTree;
import com.example.demo.model.User;

public class UserDTO {

	private String username;
	private String password;
	private String repeatPassword;
	private String email;
	private List<FamilyTree> familyTrees;
	
	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserDTO(String username, String password, String repeatPassword, String email,
			List<FamilyTree> familyTrees) {
		super();
		this.username = username;
		this.password = password;
		this.repeatPassword = repeatPassword;
		this.email = email;
		this.familyTrees = familyTrees;
	}
	
	public UserDTO(String username, String password, String email, List<FamilyTree> familyTrees) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.familyTrees = familyTrees;
		this.repeatPassword = password;
	}

	public UserDTO(User u) {
		this(u.getUsername(), u.getPassword(), u.getEmail(), u.getFamilyTrees());
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRepeatPassword() {
		return repeatPassword;
	}

	public void setRepeatPassword(String repeatPassword) {
		this.repeatPassword = repeatPassword;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<FamilyTree> getFamilyTrees() {
		return familyTrees;
	}

	public void setFamilyTrees(List<FamilyTree> familyTrees) {
		this.familyTrees = familyTrees;
	}

	@Override
	public String toString() {
		return "UserDTO [username=" + username + ", password=" + password + ", repeatPassword=" + repeatPassword
				+ ", email=" + email + ", familyTrees=" + familyTrees + "]";
	}
	
	
}
