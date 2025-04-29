package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payrolls")
public class PayrollController {

    @Autowired
    private PayrollRepository payrollRepository;

    @GetMapping
    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

    @GetMapping("/{payID}")
    public Payroll getPayrollById(@PathVariable int payID) {
        return payrollRepository.findById(payID).orElse(null);
    }

    @PostMapping
    public Payroll createPayroll(@RequestBody Payroll payroll) {
        return payrollRepository.save(payroll);
    }

    @PutMapping("/{payID}")
    public Payroll updatePayroll(@PathVariable int payID, @RequestBody Payroll payroll) {
        payroll.setPayID(payID);
        return payrollRepository.save(payroll);
    }

    @DeleteMapping("/{payID}")
    public void deletePayroll(@PathVariable int payID) {
        payrollRepository.deleteById(payID);
    }
}

