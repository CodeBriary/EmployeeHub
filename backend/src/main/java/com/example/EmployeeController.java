package com.example;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Create a new employee
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    // Get all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Get employee by ID
    @GetMapping("/{empid}")
    public Employee getEmployeeById(@PathVariable int empid) {
        return employeeService.getEmployeeById(empid);
    }

    // Update an employee
    @PutMapping("/{empid}")
    public Employee updateEmployee(@PathVariable int empid, @RequestBody Employee employee) {
        employee.setEmpid(empid);
        return employeeService.updateEmployee(employee);
    }

    // Delete an employee
    @DeleteMapping("/{empid}")
    public void deleteEmployee(@PathVariable int empid) {
        employeeService.deleteEmployee(empid);
    }
}
