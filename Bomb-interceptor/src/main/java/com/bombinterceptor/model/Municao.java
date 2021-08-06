package com.bombinterceptor.model;

public class Municao {

    private int municaoX;
    private int municaoY;
    private boolean move;

    public Municao(int municaoY) {
        this.municaoY = municaoY;
    }

    public int getMunicaoX() {
        return municaoX;
    }

    public void setMunicaoX(int municaoX) {
        this.municaoX = municaoX;
    }

    public int getMunicaoY() {
        return municaoY;
    }

    public void setMunicaoY(int municaoY) {
        this.municaoY = municaoY;
    }

    public boolean isMove() {
        return move;
    }

    public void setMove(boolean move) {
        this.move = move;
    }
}
