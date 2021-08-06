package com.bombinterceptor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {

    @GetMapping("/game")
    public String pageGame(){
        return "bomb_interceptor_game";
    }
}
