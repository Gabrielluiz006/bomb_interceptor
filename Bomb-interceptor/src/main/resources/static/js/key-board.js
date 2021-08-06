//recebe uma tecla digitada
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

function keydown(evento){
    tecla = evento.keyCode
    if(tecla === LEFT && tecla !== RIGHT){
        esquerda = true;
    }

    if(tecla === RIGHT && tecla !== LEFT){
        direita = true;
    }

    if(tecla === SPACE){
        espaco = true;
    }
}

function keyup(evento){
    tecla = evento.keyCode
    if(tecla === LEFT && tecla !== RIGHT){
        esquerda = false;
    }

    if(tecla === RIGHT && tecla !== LEFT){
        direita = false;
    }

    if(tecla === SPACE){
        espaco = false;
    }
}