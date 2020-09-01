package com.example.demo.model;

import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "first_name", nullable = false)
	private String firstName;
	
	@Column(name = "middle_name")
	private String middleName;
	
	@Column(name = "last_name", nullable = false)
	private String lastName;
	
	@Column(name = "maiden_name")
	private String maidenName;
	
	@Column(name = "gender", nullable = false)
	private Gender gender;
	
	@Column(name = "date_of_bith", nullable = false)
	private Calendar dateOfBirth;
	
	@Column(name = "date_of_death")
	private Calendar dateOfDeath;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Person father;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Person mother;

	public Person() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMaidenName() {
		return maidenName;
	}

	public void setMaidenName(String maidenName) {
		this.maidenName = maidenName;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Calendar getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Calendar dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Calendar getDateOfDeath() {
		return dateOfDeath;
	}

	public void setDateOfDeath(Calendar dateOfDeath) {
		this.dateOfDeath = dateOfDeath;
	}

	public Person getFather() {
		return father;
	}

	public void setFather(Person father) {
		this.father = father;
	}
	
	public Person getMother() {
		return mother;
	}

	public void setMother(Person mother) {
		this.mother = mother;
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", firstName=" + firstName + ", middleName=" + middleName + ", lastName=" + lastName
				+ ", maidenName=" + maidenName + ", gender=" + gender + ", dateOfBirth=" + dateOfBirth
				+ ", dateOfDeath=" + dateOfDeath + ", father=" + father + ", mother=" + mother + "]";
	}
	
	
}
