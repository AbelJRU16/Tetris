//1. inicializar el canvas
const canvas  = document.getElementById("tetris_box");
const context = canvas.getContext("2d");
const $score  = document.querySelector("div#score");
const $level  = document.querySelector("div#level");
const $lines  = document.querySelector("div#lines");
//siguientes piezas
const canvas_np  = document.getElementById("next-pieces");
const context_np = canvas_np.getContext("2d");

const BLOCK_SIZE   = 20;
const BOARD_WIDTH  = 14;
const BOARD_HEIGHT = 30;

let score = 0;
let level = 1;
let lines = 0;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;
//siguientes piezas
canvas_np.width  = 280;
canvas_np.height = 230;

context.scale(BLOCK_SIZE, BLOCK_SIZE);
//siguientes piezas
context_np.scale(BLOCK_SIZE, BLOCK_SIZE - 2);

context.lineWidth = 0.1;
context.lineCap = "square";	
context.miterLimit = 5;		

//3. board
const board = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
];

//proximas piezas
const board_np = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

//4. piezas

const piece = {
	position: { x: 5, y: 5 },
	shape: [
		[1, 1],
		[1, 1]
	]
};

let nextPieces = [];

const PIECES = [
	[
		[1, 1],
		[1, 1],
	],
	[
		[1, 1, 1, 1],
	],
	[
		[0, 1, 0],
		[1, 1, 1],
	],
	[
		[1, 1, 0],
		[0, 1, 1],
	],
	[
		[0, 1, 1],
		[1, 1, 0],
	],
	[
		[1, 0],
		[1, 0],
		[1, 1],
	],
	[
		[0, 1],
		[0, 1],
		[1, 1],
	],
];

let dropCounter = 0;
let lastTime = 0;

function init(){
	draw_np();
}

function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;

	if(dropCounter > (1000/$level.innerText)){
		piece.position.y++;
		dropCounter = 0;
		if(checkCollision()){
			piece.position.y--;
			solidifyPiece();
			removeRows();
		} 
	}

	draw();
	window.requestAnimationFrame(update);
}

//proximas piezas
function draw_np() {
	context_np.fillStyle = "#000";
	context_np.fillRect(0, 0, canvas_np.width, canvas_np.height);

	board.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value == 1){
				context.fillStyle = "gray";
				context.fillRect(x, y, 1, 1);
			}
		})
	})

	getNextPieces();

	let i = 1;
	nextPieces.forEach(piece => {
		piece.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value){
					context_np.fillStyle = "yellow";
					context_np.fillRect(x + piece.position.x, y + (piece.position.y), 1, 1);	
				}
			})
		})
		i++;
	})
}

function getNextPieces() {
	let aux = null;
	if(nextPieces.length){
		for (let i = 0; i < 2; i++) {
			nextPieces[i].position.y -= 4;
		}	
		aux = {
			position: { x: Math.floor(6), y: 9 },
			shape: PIECES[Math.floor(Math.random() * PIECES.length)],
		};
		nextPieces.push(aux);
	}else{
		for (let i = 0; i < 3; i++) {
			aux = {
				position: { x: Math.floor(6), y: 1+(i*4) },
				shape: PIECES[Math.floor(Math.random() * PIECES.length)],
			};
			nextPieces.push(aux);
		}		
	}
}

function getNextPiece(){
	let nextPiece = nextPieces[0].shape;
	nextPieces = nextPieces.splice(1,2);
	draw_np();
	return nextPiece;
}

function draw(){
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);

	board.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value == 1){
				context.fillStyle = "gray";
				context.fillRect(x, y, 1, 1);
			}
		})
	})

	piece.shape.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value){
				context.fillStyle = "yellow";
				context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
			}
		})
	})

	$score.innerText = score;
	$level.innerText = level;
	$lines.innerText = lines;
}

document.addEventListener("keydown", event => {
	if(event.key == "ArrowLeft") {
		piece.position.x--;
		if(checkCollision()){
			piece.position.x++;
		} 
	}
	if(event.key == "ArrowRight") {
		piece.position.x++;
		if(checkCollision()){
			piece.position.x--;
		} 
	}
	if(event.key == "ArrowDown") {
		piece.position.y++;
		if(checkCollision()){
			piece.position.y--;
			solidifyPiece();
			removeRows();
		} 
	}
	if(event.key == "ArrowUp") {
		const rotated = [];
		for(let i = 0; i < piece.shape[0].length; i++){
			const row = [];

			for(let j = piece.shape.length - 1; j >= 0; j--){
				row.push(piece.shape[j][i])
			}
			rotated.push(row);
		}
		const previousShape = piece.shape;
		piece.shape = rotated;
		if(checkCollision()){
			piece.shape = previousShape;
		}
	}
});

function checkCollision() {
	return piece.shape.find((row, y) => {
		return row.find((value, x) =>{
			return(
				value !== 0 &&
				board[y + piece.position.y]?.[x + piece.position.x] !== 0
			)
		})
	})
}

function solidifyPiece() {
	piece.shape.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value == 1){
				board[y + piece.position.y][x + piece.position.x] = 1
			}
		})
	})
	//get random shape
	//piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];
	piece.shape = getNextPiece();
	//reset position
	piece.position.x = Math.floor(BOARD_WIDTH/2-1);
	piece.position.y = 0;
	//gameover
	if(checkCollision()){
		window.alert("Game over!! Sorry");
		board.forEach((row) => row.fill(0));
		score = 0;
		lines = 0;
		level = 1;
	}
}

function removeRows(){
	const rowsToRemove = [];

	board.forEach((row, y) => {
		if(row.every(value => value == 1)) {
			rowsToRemove.push(y);
		}
	})

	rowsToRemove.forEach(y => {
		board.splice(y, 1);
		const newRow = Array(BOARD_WIDTH).fill(0);
		board.unshift(newRow);
		score+=10;
		lines+=1;
		if(lines%5 == 0) level+=1;
	})

}

update();
init();