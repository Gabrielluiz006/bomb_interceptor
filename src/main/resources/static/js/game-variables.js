window.onload =

    //variáveis do teclado
    LEFT = 37 , RIGHT = 39, SPACE = 32;
    var esquerda = false, direita = false, espaco = false;

    //variável canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    //imagens do jogo
    var img = document.createElement("IMG");
    img.src = "./images/nave.png";

    player = {
        x : 600,
        y : 548,
        velocidade : 12,
    };

//    municao = {
//        municaoX : 615,
//        municaoY : 508,
//        move : false,
//        cor: "red"
//    };

    meteoro = {
        x : 10,
        y : 50,
        deslocar : true,
        velocidade : getRandom(5, 8),
        cor : "#FFA500"
    };

    segundoMeteoro = {
        x : 1100,
        y : 120,
        deslocar : true,
        velocidade :  getRandom(2, 5),
        cor : "green"
    };


    //valor aleatória para velocidade dos meteoros
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

