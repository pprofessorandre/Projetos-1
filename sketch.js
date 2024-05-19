//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;
 
//velocidade da bolinha
let velocidadexBolinha = 3;
let velocidadeyBolinha = 3;

// variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
 trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  }

function mostraBolinha(){
  circle(xBolinha ,yBolinha ,diametro );
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;  
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || 
      xBolinha - raio < 0){ 
    velocidadexBolinha *= -1;
  }
    if (yBolinha + raio > height ||
       yBolinha - raio <0){
      velocidadeyBolinha *= -1;
    }
}

function mostraRaquete(x, y){
  rect(x , y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;  
 }
  if (keyIsDown(83)){
    yRaquete += 10;  
 }
}

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
    colidiu = 
  collideRectCircle(x, y ,raqueteComprimento ,raqueteAltura ,xBolinha , yBolinha, raio);
  if (colidiu){
   velocidadexBolinha *= -1; 
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(UP_ARROW)){
    yRaqueteOponente -= 10;  
 }
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteOponente += 10;  
 }  
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(152, 251, 152));
  rect(150, 10, 40, 20);
  fill(0);
  text(meusPontos, 170, 26); 
  fill(color(255, 255, 0));
  rect(450, 10, 40, 20);
  fill(0);
  text(pontosDoOponente, 470, 26);
  }

function marcaPonto(){
  if (xBolinha > 593){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 8){
    pontosDoOponente += 1;
    ponto.play();
  }
}