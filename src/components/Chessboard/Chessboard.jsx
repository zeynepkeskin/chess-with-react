import React from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieces = [];

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "d" : "l";
    const y = (p === 0) ? 7 : 0;

    pieces.push({ image: `assets/images/r${type}.png`, x: 0, y });
    pieces.push({ image: `assets/images/r${type}.png`, x: 7, y });
    pieces.push({ image: `assets/images/h${type}.png`, x: 1, y });
    pieces.push({ image: `assets/images/h${type}.png`, x: 6, y });
    pieces.push({ image: `assets/images/b${type}.png`, x: 2, y });
    pieces.push({ image: `assets/images/b${type}.png`, x: 5, y });
    pieces.push({ image: `assets/images/q${type}.png`, x: 3, y });
    pieces.push({ image: `assets/images/k${type}.png`, x: 4, y });
}

for (let i = 0; i < 8; i++) {
    pieces.push({ image: "assets/images/pd.png", x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
    pieces.push({ image: "assets/images/pl.png", x: i, y: 1 });
}

let activePiece = null;

function grabPiece(e) {
    const element = e.target;
    if(element.classList.contains("chess-piece")) {
        const x = e.clientX -50;
        const y = e.clientY -50;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;
    }
}

function movePiece(e) {
    if(activePiece) {
        const x = e.clientX -50;
        const y = e.clientY -50;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;
    }
}

function dropPiece(e) {
    if(activePiece) {
        activePiece = null;
    }
}

export default function Chessboard() {
    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            let image;

            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image;
                }
            });

            board.push(<Tile key={`${i},${j}`} image={image} number={number} />);
        }
    }

    return (
    <div 
        onMouseMove={(e) => movePiece(e)} 
        onMouseDown={(e) => grabPiece(e)} 
        onMouseUp={(e) => dropPiece(e)}
        id="chessboard"
    >
        {board}
    </div>
    );
}
