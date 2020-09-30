function Cell(i, j, w, player) {				//Définition d'une cellule par défaut
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
					
	this.player = player;
	this.revealed = false;
}

// Fonction permettant de dévoiler la case
Cell.prototype.show = function() {
	stroke(0);
	fill(0, 0, 255);
	rect(this.x, this.y, this.w, this.w);
	fill(0);
	ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.75, this.w * 0.75);
	
	if (this.revealed) {
		if (this.player == 1) {
			fill(0, 0, 255);
			rect(this.x, this.y, this.w, this.w);
			fill(255, 255, 0);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.75, this.w * 0.75);

		} else if (this.player == 2) {
			fill(0, 0, 255);
			rect(this.x, this.y, this.w, this.w);
			fill(255, 0, 0);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.75, this.w * 0.75);
		}
	}
}

// Fonction retournant la position et les coordonnées de la case
Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

// Fonction retournant la valeur "player" de la case
Cell.prototype.joueur = function() {
	return this.player;
}

// Fonction retournant la valeur "revealed" de la case
Cell.prototype.etat = function() {
	return this.revealed;
}

// Fonction permettant de révéler la case
Cell.prototype.reveal = function() {
	this.revealed = true;
}