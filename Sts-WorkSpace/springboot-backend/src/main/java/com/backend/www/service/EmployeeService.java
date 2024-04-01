package com.backend.www.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.backend.www.exception.ResourceNotFoundException;
import com.backend.www.model.Employee;
import com.backend.www.repo.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	EmployeeRepository employeeRepo;
	
	public List<Employee> getAllEmployees(){
		return employeeRepo.findAll();
	}
	
	public Employee createEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}
	
	public Employee getEmployeeById( Long id) {
		return employeeRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id Not Found.....!!"));
	}
	
	public ResponseEntity<Employee> updateEmployee(Long id, Employee employee){
		Employee emp = employeeRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id Not Found....!!"));
		emp.setFirstName(employee.getFirstName());
		emp.setLastName(employee.getLastName());
		emp.setEmail(employee.getEmail());
		Employee updateEmp = employeeRepo.save(emp);
		return ResponseEntity.ok(updateEmp);
	}
	
	public ResponseEntity<HttpStatus> deleteEmployee(long id){
		Employee employee = employeeRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id Not Found Exception...!!!"));
		
		employeeRepo.delete(employee);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
	
	
	
}
