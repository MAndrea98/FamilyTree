package com.example.demo.dto;

public class WithPartnerDTO {
	
	private Long id;
	private String name;
	private String title;
	private String birth;
	private String death;
	private String partner;
	private String img;
	
	public WithPartnerDTO() {
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

	public String getPartner() {
		return partner;
	}

	public void setPartner(String partner) {
		this.partner = partner;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	@Override
	public String toString() {
		return "WithPartnerDTO [id=" + id + ", name=" + name + ", title=" + title + ", birth=" + birth + ", death="
				+ death + ", partner=" + partner + ", img=" + img + "]";
	}

	
}
