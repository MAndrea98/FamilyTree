package com.example.demo.dto;

public class WithParentDTO {
	
	private Long id;
	private String name;
	private String title;
	private String birth;
	private String death;
	private String parents;
	private String img;
	
	public WithParentDTO() {
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

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getDeath() {
		return death;
	}

	public void setDeath(String death) {
		this.death = death;
	}

	public String getParents() {
		return parents;
	}

	public void setParents(String parents) {
		this.parents = parents;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	@Override
	public String toString() {
		return "WithParentDTO [id=" + id + ", name=" + name + ", title=" + title + ", birth=" + birth + ", death="
				+ death + ", parents=" + parents + ", img=" + img + "]";
	}
	
	
}
