package com.bombinterceptor.model;

import java.io.Serializable;
import java.util.List;

public class GameState implements Serializable {

    private List<Player> players;

    public GameState() {
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }


    @Override
    public String toString() {
        return "GameState{" +
                "players=" + players +
                '}';
    }
}
