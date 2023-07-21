package com.zerohip.server.security.auth.controller;

import com.zerohip.server.security.auth.serivce.AuthService;
import com.zerohip.server.security.response.ErrorResponder;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/refresh")
    public void sendToken(@CookieValue("Refresh") String refreshToken,
                          HttpServletResponse response) throws IOException {

        String newAccessToken = authService.createAccessToken(refreshToken);

        if (newAccessToken == null) {
            ErrorResponder.sendRefreshTokenExceptionError(response, HttpStatus.UNAUTHORIZED);
        }
            response.setHeader("Authorization", "Bearer " + newAccessToken);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue("Refresh") String refreshToken) {

        authService.deleteRefreshToken(refreshToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
