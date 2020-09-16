package com.example.demo.model;

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
	
	@Column(name = "id_in_family_tree", nullable = false)
	private Long familyTreeId;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "gender")
	private Gender gender;
	
	@Column(name = "date", nullable = false)
	private String date;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "image", length=10485760)
	private String image;
	
	@Column(name = "father_id")
	private Long fatherID;
	
	@Column(name = "mother_id")
	private Long motherID;
	
	@Column(name = "spouse_id")
	private Long spouseID;
	
	@ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.EAGER)
	private FamilyTree familyTree;

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

	public Long getFamilyTreeId() {
		return familyTreeId;
	}

	public void setFamilyTreeId(Long familyTreeId) {
		this.familyTreeId = familyTreeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Long getFatherID() {
		return fatherID;
	}

	public void setFatherID(Long fatherID) {
		this.fatherID = fatherID;
	}

	public Long getMotherID() {
		return motherID;
	}

	public void setMotherID(Long motherID) {
		this.motherID = motherID;
	}

	public Long getSpouseID() {
		return spouseID;
	}

	public void setSpouseID(Long spouseID) {
		this.spouseID = spouseID;
	}

	public FamilyTree getFamilyTree() {
		return familyTree;
	}

	public void setFamilyTree(FamilyTree familyTree) {
		this.familyTree = familyTree;
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", familyTreeId=" + familyTreeId + ", name=" + name + ", gender=" + gender
				+ ", date=" + date + ", title=" + title + ", image=" + image + ", fatherID=" + fatherID + ", motherID="
				+ motherID + ", spouseID=" + spouseID + ", familyTree=" + familyTree + "]";
	}

	
	
	
}
