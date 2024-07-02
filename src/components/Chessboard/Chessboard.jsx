import React, { useRef } from 'react';
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



export default function Chessboard() {
    const chessboardRef = useRef(null);

    
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
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard) {
            const minX = chessboard.offsetLeft-25;
            const minY = chessboard.offsetTop -25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth -75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight -75;
            const x = e.clientX -50;
            const y = e.clientY -50;
            activePiece.style.position = "absolute";
          //  activePiece.style.left = `${x}px`;
          //  activePiece.style.top = `${y}px`;


          //if x is smaller than minimun amount 
            if(x < minX) {
                activePiece.style.left = `${minX}px`;
            } 
            //If x is bigger than maximum amount
            else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } 
            //if x is in the constraints
            else {
                activePiece.style.left = `${x}px`;
            }

            //if y is smaller than minimun amount
            if(y < minY) {
                activePiece.style.top = `${minY}px`;
            } 
            //If y is bigger than maximum amount
            else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } 
            //if y is in the constraints
            else {
                activePiece.style.top = `${y}px`;
            }
 
        }
    }
    
    function dropPiece(e) {
        if(activePiece) {
            activePiece = null;
        }
    }

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
        ref={chessboardRef}
    >
        {board}
    </div>
    );
}
