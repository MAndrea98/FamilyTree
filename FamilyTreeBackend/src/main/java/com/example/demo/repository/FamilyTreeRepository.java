package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.FamilyTree;
import com.example.demo.model.User;

public interface FamilyTreeRepository extends JpaRepository<FamilyTree, Long>{

	List<FamilyTree> findByUser(User user);
}
