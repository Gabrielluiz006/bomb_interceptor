
var pontuacao;

//movimenta os elementos do jogo
function move(){
    if(espaco && municao.y >= (548 - 40)){
        municao.x = player.x + 25;
    }
}

function criarMunicao(){
    if(municao.deslocar == true){
        municao.y -= municao.velocidade;
        ctx.fillStyle = municao.cor;
        ctx.fillRect(municao.x, municao.y,20,40);
        if(municao.y < 30){
        player.municao.move
            municao.deslocar = false;
            municao.y = 548 - 40;
        }
    }
}

function criarMeteoro(){
    if(meteoro.deslocar){
        meteoro.x += meteoro.velocidade;
        ctx.fillStyle = meteoro.cor;
        ctx.fillRect(meteoro.x,meteoro.y, 50, 50);
        if(meteoro.x > 1260){
            meteoro.x = -50;
            meteoro.velocidade = getRandom(8, 12);
        }
    }
}

function criarSegundoMeteoro(){
    if(segundoMeteoro.deslocar){
        segundoMeteoro.x -= meteoro.velocidade;
        ctx.fillStyle = segundoMeteoro.cor;
        ctx.fillRect(segundoMeteoro.x,segundoMeteoro.y, 50, 50);
        if(segundoMeteoro.x < 10){
            segundoMeteoro.x = 1200;
            segundoMeteoro.velocidade = getRandom(2, 5);
        }
    }
}

function colisao(){
    if(municao.y < meteoro.y + 50 
        && municao.x >= meteoro.x
         && municao.x <= meteoro.x + 50 ){
            meteoro.x = -70;
            //enviarPontuacao(pontuacao);

    }

    if(municao.y < segundoMeteoro.y + 50 
        && municao.x >= segundoMeteoro.x
         && municao.x <= segundoMeteoro.x + 50 ){
            segundoMeteoro.x = 1300;
            //enviarPontuacao(pontuacao);
    }
}

//faz uma chamada recursiva
function startGame(){
    requestAnimationFrame(startGame, canvas);
    move();
    criarMunicao();
    criarMeteoro();
    criarSegundoMeteoro();
    colisao();
}