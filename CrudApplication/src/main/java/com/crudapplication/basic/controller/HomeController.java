package com.crudapplication.basic.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crudapplication.basic.entity.StudentEntity;
import com.crudapplication.basic.repository.StudentRepository;
import com.crudapplication.myresponse.MyResponse;
import com.crudapplication.dtos.*;

@RestController
public class HomeController {
	
	@Autowired
	private StudentRepository studentRepository;
	
	
	@GetMapping("/")
	public MyResponse homeFun() {
		try {
		System.out.println("home controller running");
		List<StudentEntity> studentList = studentRepository.findAll();
		System.out.println(studentList);
		MyResponse newResponse = new MyResponse(200,"Success",studentList);
		return newResponse;
		}catch(Exception err) {
			System.out.println(err);
			MyResponse newResponse = new MyResponse(500,"Failed",err);
			return newResponse;
		}
		
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
	public ResponseEntity<?> getAll(){
		try {
			List<StudentEntity> studentList = studentRepository.findAll();
			var responseObj = new CommonResponse(200,true,"student data fetched",studentList);
			return ResponseEntity.status(HttpStatus.OK).body(responseObj);
			
		}catch(Exception e) {
			System.out.println("Error Happened "+e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
		}

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
