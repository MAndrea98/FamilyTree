package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.LogedUser;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User login(UserDTO userDTO) {
		User user = userRepository.findByUsername(userDTO.getUsername());
		if (user == null)
			return null;
		if (!user.getPassword().equals(userDTO.getPassword()))
			return null;
		LogedUser.getInstance().setUser(user);
		return user;
	}

	public User registration(UserDTO userDTO) {
		User user = userRepository.findByUsername(userDTO.getUsername());
		if (user != null)
			return null;

		if (!userDTO.getPassword().equals(userDTO.getRepeatPassword()))
			return null;
		
		if (!userDTO.getEmail().contains("@"))
			return null;
		
		User u = new User(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail());
		return userRepository.save(u);
	}

	public void logout(UserDTO userDTO) {
		User user = userRepository.findByUsername(userDTO.getUsername());
		if (LogedUser.getInstance().getUser().getId().equals(user.getId())) 
			LogedUser.getInstance().setUser(null);
	}
	
	
	
	
}
