//Puissance 4

function make2DArray(cols, rows) {				//Fonction pour créer un tableau en 2 dimensions 
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

// Déclaration de toutes les variables
var grid;
var cols;
var rows;
var w = 50;
var player;
var winner = 0;

// Mise en place du jeu par défaut
function setup() {
	createCanvas(600, 301);
	cols = 7;
	rows = 6;
	player = 1;
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}
}

// Fonction permettant de détecter la victoire
function checkWin() {
	// Victoire horizontale
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].joueur() == 1 || grid[i][j].joueur() == 2) {
				if ((grid[i][j].joueur()) == (grid[i+1][j].joueur()) && (grid[i+1][j].joueur()) == (grid[i+2][j].joueur()) && (grid[i+2][j].joueur()) == (grid[i+3][j].joueur())) {
					winner = 1;
					return winner;
				}
			}			
		}
	}

	// Victoire verticale
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < 3; j++) {
			if (grid[i][j].joueur() == 1 || grid[i][j].joueur() == 2) {
				if ((grid[i][j].joueur()) == (grid[i][j+1].joueur()) && (grid[i][j+1].joueur()) == (grid[i][j+2].joueur()) && (grid[i][j+2].joueur()) == (grid[i][j+3].joueur())) {
					winner = 1;
					return winner;
				}
			}			
		}
	}

	// Victoire diagonale haut.gauche-bas.droite
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if (grid[i][j].joueur() == 1 || grid[i][j].joueur() == 2) {
				if ((grid[i][j].joueur()) == (grid[i+1][j+1].joueur()) && (grid[i+1][j+1].joueur()) == (grid[i+2][j+2].joueur()) && (grid[i+2][j+2].joueur()) == (grid[i+3][j+3].joueur())) {
					winner = 1;
					return winner;
				}
			}			
		}
	}

	// Victoire diagonale haut.droite-bas.gauche
	for (var i = 0; i < 4; i++) {
		for (var j = 3; j < rows; j++) {
			if (grid[i][j].joueur() == 1 || grid[i][j].joueur() == 2) {
				if ((grid[i][j].joueur()) == (grid[i+1][j-1].joueur()) && (grid[i+1][j-1].joueur()) == (grid[i+2][j-2].joueur()) && (grid[i+2][j-2].joueur()) == (grid[i+3][j-3].joueur())) {
					winner = 1;
					return winner;
				}
			}			
		}
	}
}

// Actions/Modifications quand les joueurs cliquent sur le clic gauche
function mousePressed() {
	if (winner == 0) {
		if (mouseX >= 0 && mouseX <= 350 && mouseY >= 0 && mouseY <= 300) {
			for (var i = 0; i < cols; i++){
				for (var j = 0; j < rows; j++){
					if (grid[i][j].contains(mouseX, mouseY) && grid[i][j].etat() == false) {

						if (grid[i][5].etat() == false) {
							grid[i][5] = new Cell(i, 5, w, player);
							grid[i][5].reveal();
						} else if (grid[i][4].etat() == false) {
							grid[i][4] = new Cell(i, 4, w, player);
							grid[i][4].reveal();
						} else if (grid[i][3].etat() == false) {
							grid[i][3] = new Cell(i, 3, w, player);
							grid[i][3].reveal();
						} else if (grid[i][2].etat() == false) {
							grid[i][2] = new Cell(i, 2, w, player);
							grid[i][2].reveal();
						} else if (grid[i][1].etat() == false) {
							grid[i][1] = new Cell(i, 1, w, player);
							grid[i][1].reveal();
						} else {
							grid[i][0] = new Cell(i, 0, w, player);
							grid[i][0].reveal();
						}
						
						if (player == 1){
							player = 2;
						} else {
							player = 1;
						}
					}
				}
			}	
		}
	}
}

// Boucle de rafraîchissement
function draw() {
	background(230); 	
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}	
	}
	// Petite bordure rouge
	push();
	noFill();
	strokeWeight(2);
	stroke(255, 0, 0);
	rect(1,1,598,299);
	pop();

	// Texte affichant le tour du joueur
	push();
	textAlign(CENTER);
	textSize(30);
	fill(0);
	noStroke();
	text("C'est au tour du :", 475, 50);
	pop();
	if (player == 1) {
		push();
		textAlign(CENTER);
		textSize(50);
		fill(255, 255, 0);
		noStroke();
		text("Joueur 1", 475, 100);
		pop();
	} else {
		push();
		textAlign(CENTER);
		textSize(50);
		fill(255, 0, 0);
		noStroke();
		text("Joueur 2", 475, 100);
		pop();
	}

	// Élément en cas de victoire
	if (winner == 1 && player == 2) {
		push();
		fill(255);
		rect(0,0,600,301);
		textAlign(CENTER);
		textSize(50);
		fill(255, 255, 0);
		stroke(0);
		text("Victoire du Joueur 1", width/2, height/2);
		pop();
	} else if (winner == 1 && player == 1) {
		push();
		fill(255);
		rect(0,0,600,301);
		textAlign(CENTER);
		textSize(50);
		fill(255, 0, 0);
		stroke(0);
		text("Victoire du Joueur 2", width/2, height/2);
		pop();
	}

	// Utilisation constante de la fonction checkWin() pour vérifier si il y a une victoire
	checkWin();
}