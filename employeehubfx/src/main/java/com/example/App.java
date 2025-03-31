package com.example;

import java.io.IOException;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
//LOGON - Remember to make it look pretty
public class App extends Application {

    @Override
    public void start(Stage stage) throws IOException {
        // Create UI elements
        Label empIdLabel = new Label("Employee ID:");
        TextField empIdField = new TextField();
        Label passwordLabel = new Label("Password:");
        PasswordField passwordField = new PasswordField();
        Label messageLabel = new Label();
        Button loginButton = new Button("Login");
        
        // Set login action
        loginButton.setOnAction(e -> {
            String empId = empIdField.getText();
            String password = passwordField.getText();
            
            if (authenticate(empId, password)) {
                messageLabel.setText("Login successful!");
            } else {
                messageLabel.setText("Invalid Employee ID or Password");
            }
        });
        
        // Layout setup
        VBox vbox = new VBox(10, empIdLabel, empIdField, passwordLabel, passwordField, loginButton, messageLabel);
        vbox.setAlignment(Pos.CENTER);
        vbox.setMinSize(300, 200);
        
        // Create scene and set stage
        Scene scene = new Scene(vbox, 400, 300);
        stage.setScene(scene);
        stage.setTitle("Employee Login");
        stage.show();
    }

    private boolean authenticate(String empId, String password) {
        // Hardcoded credentials for demonstration
        return "admin".equals(empId) && "password123".equals(password);
    }

    public static void main(String[] args) {
        launch();
    }
}
