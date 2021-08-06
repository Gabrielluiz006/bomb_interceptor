package com.bombinterceptor.controller;

import com.bombinterceptor.model.GameState;
import com.bombinterceptor.model.KeyBoard;
import com.bombinterceptor.model.Municao;
import com.bombinterceptor.model.Player;
import com.bombinterceptor.service.GameService;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class PlayerController {

    @Autowired
    private GameService gameService;

    private Set<Player> players = new HashSet<>();

    private GameState gameState = new GameState();

    private static final Logger LOGGER = LoggerFactory.getLogger(PlayerController.class);

    @EventListener
    private void connectPlayerId(SessionConnectEvent event) {
        String userSessionId = SimpAttributesContextHolder.currentAttributes().getSessionId();
        LOGGER.info("Player conectado: {} ", userSessionId);
        LOGGER.info("Player criado: {} ", userSessionId);
    }

    @EventListener
    public void disconnectPlayerId(SessionDisconnectEvent event) {
        Player player = players.stream().filter(p -> p.getPlayerId().equals(event.getSessionId())).findFirst().orElse(null);
        players.remove(player);
        gameState.setPlayers(players.stream().collect(Collectors.toList()));
        LOGGER.info("Player desconhecato: {} ", event.getSessionId());
        LOGGER.info("Quantidade de Players conhectados: {} ", players.size());
    }

    @SendTo("/topic/gamestate")
    @MessageMapping(value = "/gamestate")
    public GameState sendGameState(@Payload String msg, @Header("simpSessionId") String sessionId) {
        String state = new Gson().toJson(gameState);
        LOGGER.info("Game state: {} ", state);
        return gameState;
    }

    @SendTo("/topic/createmoveplayer")
    @MessageMapping(value = "/createmoveplayer")
    public GameState createGame(@Payload KeyBoard keyBoard, @Header("simpSessionId") String sessionId) {
        Player player = players.stream().filter( p -> p.getPlayerId().equals(sessionId)).findFirst().orElse(null);

        if(Objects.isNull(player)){
            player = new Player(sessionId,numberRandom(30,1210), 548,0);
            player.setMunicao(new Municao(508));
        }else{
            player = gameService.moveElementsPlayer(player, keyBoard);
        }

        players.add(player);

        this.gameState.setPlayers(players.stream().collect(Collectors.toList()));
        return gameState;
    }

    public int numberRandom(int min, int max){
        return min + (int)(Math.random() * (max - min));
    }
}
