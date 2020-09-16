package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.FamilyTree;
import com.example.demo.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long>{

	Person findByFamilyTreeAndFamilyTreeId(FamilyTree familyTree, Long familyTreeId);
}
