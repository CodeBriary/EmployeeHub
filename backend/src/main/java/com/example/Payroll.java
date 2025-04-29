package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Payroll {

    @Id
    private int payID;
    private String payDate;
    private double earnings;
    private double fedTax;
    private double fedMed;
    private double fedSS;
    private double stateTax;
    private double retire401k;
    private double healthCare;
    private int empid;

    // Getters and Setters
    public int getPayID() {
        return payID;
    }

    public void setPayID(int payID) {
        this.payID = payID; // You may or may not need this if JPA manages it automatically
    }

    public String getPayDate() {
        return payDate;
    }

    public void setPayDate(String payDate) {
        this.payDate = payDate;
    }

    public double getEarnings() {
        return earnings;
    }

    public void setEarnings(double earnings) {
        this.earnings = earnings;
    }

    public double getFedTax() {
        return fedTax;
    }

    public void setFedTax(double fedTax) {
        this.fedTax = fedTax;
    }

    public double getFedMed() {
        return fedMed;
    }

    public void setFedMed(double fedMed) {
        this.fedMed = fedMed;
    }

    public double getFedSS() {
        return fedSS;
    }

    public void setFedSS(double fedSS) {
        this.fedSS = fedSS;
    }

    public double getStateTax() {
        return stateTax;
    }

    public void setStateTax(double stateTax) {
        this.stateTax = stateTax;
    }

    public double getRetire401k() {
        return retire401k;
    }

    public void setRetire401k(double retire401k) {
        this.retire401k = retire401k;
    }

    public double getHealthCare() {
        return healthCare;
    }

    public void setHealthCare(double healthCare) {
        this.healthCare = healthCare;
    }

    public int getEmpid() {
        return empid;
    }

    public void setEmpid(int empid) {
        this.empid = empid;
    }
}

