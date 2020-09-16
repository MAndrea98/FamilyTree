package com.example.demo.dto;

import java.util.ArrayList;

public class ChartDTO {

	private Long id;
	private Long pid;
	private Long ppid;
	private String name;
	private String title;
	private String img;
	private String date;
	private ArrayList<String> tags;
	
	public ChartDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPid() {
		return pid;
	}

	public void setPid(Long pid) {
		this.pid = pid;
	}

	public Long getPpid() {
		return ppid;
	}

	public void setPpid(Long ppid) {
		this.ppid = ppid;
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

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public ArrayList<String> getTags() {
		return tags;
	}

	public void setTags(ArrayList<String> tags) {
		this.tags = tags;
	}

	@Override
	public String toString() {
		return "ChartDTO [id=" + id + ", pid=" + pid + ", ppid=" + ppid + ", name=" + name + ", title=" + title
				+ ", img=" + img + ", date=" + date + ", tags=" + tags + "]";
	}
	
	
	
}
