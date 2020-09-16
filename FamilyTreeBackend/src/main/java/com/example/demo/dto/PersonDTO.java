package com.example.demo.dto;

public class PersonDTO {

	private Long id;
	private String name;
	private String title;
	private String date;
	private Long motherId;
	private Long fatherId;
	private Long spouseId;
	private String image;
	private Long familyTreeId;
	
	public PersonDTO() {
		super();
		// TODO Auto-generated constructor stub
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Long getMotherId() {
		return motherId;
	}

	public void setMotherId(Long motherId) {
		this.motherId = motherId;
	}

	public Long getFatherId() {
		return fatherId;
	}

	public void setFatherId(Long fatherId) {
		this.fatherId = fatherId;
	}

	public Long getSpouseId() {
		return spouseId;
	}

	public void setSpouseId(Long spouseId) {
		this.spouseId = spouseId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Long getFamilyTreeId() {
		return familyTreeId;
	}

	public void setFamilyTreeId(Long familyTreeId) {
		this.familyTreeId = familyTreeId;
	}

	@Override
	public String toString() {
		return "PersonDTO [id=" + id + ", name=" + name + ", title=" + title + ", date=" + date + ", motherId="
				+ motherId + ", fatherId=" + fatherId + ", spouseId=" + spouseId + ", image=" + image
				+ ", familyTreeId=" + familyTreeId + "]";
	}
	
	
}
