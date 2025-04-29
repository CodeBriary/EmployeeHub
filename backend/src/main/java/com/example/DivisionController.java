package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/divisions")
public class DivisionController {

    @Autowired
    private DivisionRepository divisionRepository;

    @GetMapping
    public List<Division> getAllDivisions() {
        return divisionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Division getDivisionById(@PathVariable int id) {
        return divisionRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Division createDivision(@RequestBody Division division) {
        return divisionRepository.save(division);
    }

    @PutMapping("/{id}")
    public Division updateDivision(@PathVariable int id, @RequestBody Division division) {
        division.setId(id);
        return divisionRepository.save(division);
    }

    @DeleteMapping("/{id}")
    public void deleteDivision(@PathVariable int id) {
        divisionRepository.deleteById(id);
    }
}

