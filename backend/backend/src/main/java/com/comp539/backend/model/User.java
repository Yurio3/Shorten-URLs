package com.comp539.backend.model;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.spring.data.firestore.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collectionName = "user")
@NoArgsConstructor
@Getter
@Setter
public class User {

    @DocumentId
    private String id;

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}
