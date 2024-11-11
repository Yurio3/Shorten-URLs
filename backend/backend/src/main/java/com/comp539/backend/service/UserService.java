package com.comp539.backend.service;

import com.comp539.backend.model.User;
import com.comp539.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email).blockFirst();
        return user != null && user.getPassword().equals(password) ? user : null;
    }

    public User register(User user) {
        User userOld = user.getPassword() != null ? userRepository.findByEmail(user.getEmail()).blockFirst() : null;
        return userOld == null ? userRepository.save(user).block() : null;
    }
}
