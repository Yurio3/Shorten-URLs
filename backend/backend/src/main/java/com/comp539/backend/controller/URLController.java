package com.comp539.backend.controller;

import com.comp539.backend.dto.UrlDTO;
import com.comp539.backend.model.UrlData;
import com.comp539.backend.service.UrlGenerationService;
import com.comp539.backend.service.UrlStorageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/url", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class URLController {

    private final UrlGenerationService urlGenerationService;
    private final UrlStorageService urlStorageService;

    @GetMapping("{shortUrl}")
    public ResponseEntity<UrlDTO> getUrl(@PathVariable String shortUrl) {
        UrlData data = urlStorageService.get(shortUrl);
        return data != null ? ResponseEntity.ok(new UrlDTO(data)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<UrlDTO> postUrl(@RequestBody UrlDTO urlDTO, @RequestHeader("User-Agent") String userAgent, HttpServletRequest request) {
        UrlData data = urlGenerationService.generateUrl(urlDTO.getLongUrl(), userAgent, request.getRemoteHost());
        return ResponseEntity.ok(new UrlDTO(data));
    }

}
