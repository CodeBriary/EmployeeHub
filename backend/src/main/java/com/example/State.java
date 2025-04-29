package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class State {

    @Id
    private int stateId;
    private String stateName;

    // Getters and Setters
    public int getStateId() {
        return stateId;
    }

    public void setStateId(int stateId) {
        this.stateId = stateId;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }
}


