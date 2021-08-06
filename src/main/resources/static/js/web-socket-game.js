var stompClient = null;
var gameState;

//acoes a serem executadas quando tela for carregada
window.onload = function() {
    conectar(receiveGameState);
}

function conectar(callback){

    var socket = new SockJS('/endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
       stompClient.debug = null;
       stompClient.subscribe('/topic/gamestate', function (response) {
           this.gameState = JSON.parse(response.body);
           buildElementsGame();
       })

       stompClient.subscribe('/topic/createmoveplayer', function (response) {
           this.gameState = JSON.parse(response.body)
           buildCanvasGame();
       })

        stompClient.subscribe('/topic/pontuacao', function (response) {
            var pontuacao = JSON.parse(response.body).pontuacao;
            exibirPontuacao(pontuacao);
        })
        callback();
    });
}

function receiveGameState() {
    if(stompClient != null){
        stompClient.send("/app/gamestate", {}, "solicitando game state!!!");
    } else{
        console.log("Favor, conectar no webSocket");
    }
}

function buildElementsGame(){
    sendCreateMovePlayer(this.gameState);
    //sendPontuacao();
    requestAnimationFrame(buildElementsGame, canvas);
//    criarCometa(gameState);
//    criarMunicao(gameState);
}

function sendCreateMovePlayer(gameState) {
    stompClient.send("/app/createmoveplayer", {}, JSON.stringify({"left": esquerda, "right": direita, "space": espaco}));
}

function buildCanvasGame(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    this.gameState.players.forEach(
        function (player, index) {
            ctx.fillStyle = 'green';
            ctx.drawImage(img, player.playerX, player.playerY, 80,40);
            if(player.municao.move){
                console.log("municao.x: " + player.municao.municaoX + "municao.y: " + player.municao.municaoX);
                ctx.fillStyle = "red";
                ctx.fillRect(player.municao.municaoX, player.municao.municaoY, 20, 40);
            }
        }
    );
}

//funcoes globais a serem usadas em outros scripts
window.sendPontuacao = function (pontuacao) {
    if(stompClient != null){
        stompClient.send("/app/pontuacao", {}, JSON.stringify({"pontuacao": pontuacao}));
    } else{
        console.log("Favor, conectar no webSocket");
    }
}

//funcoes para interagir com html
function exibirPontuacao(pontuacao) {
    $("#pontuacao").text(pontuacao);
}

