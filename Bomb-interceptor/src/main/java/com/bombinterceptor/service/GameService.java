package com.bombinterceptor.service;

import com.bombinterceptor.model.KeyBoard;
import com.bombinterceptor.model.Player;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    static final int DISTANCE_PLAYER = 12;
    static final int DISTANCE_MUNICAO = 15;
    static final int POSITION_INITIAL_SHOT = 508;

    public Player moveElementsPlayer(Player player, KeyBoard keyBoard){

        if(keyBoard.isLeft() && player.getPlayerX() > 30){
            player.setPlayerX(player.getPlayerX() - DISTANCE_PLAYER);
        }

        if(keyBoard.isRight() && player.getPlayerX() < 1210){
            player.setPlayerX(player.getPlayerX() + DISTANCE_PLAYER);
        }

        if(keyBoard.isSpace() && player.getMunicao().getMunicaoY() >= POSITION_INITIAL_SHOT){
            player.getMunicao().setMunicaoX(player.getPlayerX() + 25);
            player.getMunicao().setMove(true);
        }

        if(player.getMunicao().isMove()){
            //desloca a munição para cima
            player.getMunicao().setMunicaoY(player.getMunicao().getMunicaoY() - DISTANCE_MUNICAO);
            System.out.println("Movimentando" + "Y: " + player.getMunicao().getMunicaoY());
            //verifica se a munição sumiu da tela
            if(player.getMunicao().getMunicaoY() < 30){
                player.getMunicao().setMove(false);
                player.getMunicao().setMunicaoY(POSITION_INITIAL_SHOT);
            }
        }

        return player;
    }
}
