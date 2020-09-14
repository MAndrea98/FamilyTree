package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
	
	Person findByNameAndTitleAndDate(String name, String title, String date);

}
