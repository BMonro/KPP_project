package kpp.project.pizza.sockets;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new WebSocketTextHandler(), "/ws")
                .setAllowedOrigins("*"); // Дозволяємо з'єднання з будь-якого джерела (для локальної розробки)
        registry.addHandler(new WebSocketStateHandler(), "/new/state")
                .setAllowedOrigins("*");
        registry.addHandler(new WebSocketPauseHandler(), "/pause")
                .setAllowedOrigins("*");
    }
}
