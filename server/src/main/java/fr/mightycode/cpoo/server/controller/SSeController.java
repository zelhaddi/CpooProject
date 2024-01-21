package fr.mightycode.cpoo.server.controller;

import fr.mightycode.cpoo.server.service.SSeService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
public class SSeController {

    private final SSeService sseService;

    public SSeController(SSeService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeToSseEvents() {
        return this.sseService.subscribe();
    }
}
