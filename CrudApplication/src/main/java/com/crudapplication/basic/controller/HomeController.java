package com.crudapplication.basic.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crudapplication.basic.entity.StudentEntity;
import com.crudapplication.basic.repository.StudentRepository;

@RestController
public class HomeController {
	
	@Autowired
	private StudentRepository studentRepository;
	
	@GetMapping("/")
	public String homeFun() {
		return "Springboot up and running";
	}
	
	@PostMapping("/saveStudent")
	public StudentEntity saveData(@RequestBody StudentEntity student) {
		studentRepository.save(student);
		return student;
	}
	
	@GetMapping("/singleStudent/{rollNo}")
	public StudentEntity getSingleStudent(@PathVariable int rollNo) {
		Optional<StudentEntity> student  = studentRepository.findById(rollNo);
		StudentEntity student1 = student.get();
		return student1;
	}
	
	@GetMapping("/getAllStudents")
	public List<StudentEntity> getAll(){
		List<StudentEntity> studentList = studentRepository.findAll();
		return studentList;
	}
	
	@DeleteMapping("/deleteStudent/{rollNo}")
	public String deleteStudent(@PathVariable int rollNo) {
		StudentEntity student = studentRepository.findById(rollNo).get();
		if(student != null) {
			studentRepository.delete(student);
			return "Student deleted successfully";
		}else {
			return "Student not found";
		}
	}
	
	@PutMapping("/updateStudent")
	public StudentEntity updateStudent(@RequestBody StudentEntity student) {
		studentRepository.save(student);
		return student;
	}
	

}
