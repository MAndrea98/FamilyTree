package com.example.demo.model;

public class LogedUser {

	private User user;
	private static LogedUser instance;
	
	public LogedUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public static LogedUser getInstance() {
		if (instance == null)
			instance = new LogedUser();
		return instance;
	}

	public static void setInstance(LogedUser instance) {
		LogedUser.instance = instance;
	}

	@Override
	public String toString() {
		return "LogedUser [user=" + user + "]";
	}
	
	
	
}
