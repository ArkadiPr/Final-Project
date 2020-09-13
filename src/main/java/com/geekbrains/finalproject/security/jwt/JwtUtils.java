package com.geekbrains.finalproject.security.jwt;

import com.geekbrains.finalproject.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
public class JwtUtils {
    private static final String JWT_SIGN = "Invalid JWT signature: {}";
    private static final String JWT_TOK = "Invalid JWT token: {}";
    private static final String JWT_EXP = "JWT token is expired: {}";
    private static final String JWT_UNS = "JWT token is unsupported: {}";
    private static final String JWT_EMPTY = "JWT claims string is empty: {}";

    @Value("${jwtSecret}")
    private String jwtSecret;

    @Value("${jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.error(JWT_SIGN, e.getMessage());
        } catch (MalformedJwtException e) {
            log.error(JWT_TOK, e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error(JWT_EXP, e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error(JWT_UNS, e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error(JWT_EMPTY, e.getMessage());
        }

        return false;
    }
}
