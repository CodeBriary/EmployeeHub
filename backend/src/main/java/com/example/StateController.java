package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/states")
public class StateController {

    @Autowired
    private StateRepository stateRepository;

    @GetMapping
    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    @GetMapping("/{stateId}")
    public State getStateById(@PathVariable int stateId) {
        return stateRepository.findById(stateId).orElse(null);
    }

    @PostMapping
    public State createState(@RequestBody State state) {
        return stateRepository.save(state);
    }

    @PutMapping("/{stateId}")
    public State updateState(@PathVariable int stateId, @RequestBody State state) {
        state.setStateId(stateId);
        return stateRepository.save(state);
    }

    @DeleteMapping("/{stateId}")
    public void deleteState(@PathVariable int stateId) {
        stateRepository.deleteById(stateId);
    }
}

