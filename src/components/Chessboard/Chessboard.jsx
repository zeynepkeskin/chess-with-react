import React, { useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';
import Referee from '../../referee/Referee';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const TeamType = [
    0, //opponent
    1  //our
];

export const PieceType = [
    0, //pawn
    1, //bishop
    2, //knight
    3, //rook
    4, //queen
    5  //king
];

const initialBoardState = [];


for (let p = 0; p < 2; p++) {
    const teamType = (p === 0) ? TeamType[0] : TeamType[1];
    const type = (teamType === TeamType[0]) ? "d" : "l";
    const y = (p === 0) ? 7 : 0;

    initialBoardState.push({ image: `assets/images/r${type}.png`, x: 0, y, "type": PieceType[3], "team": teamType });
    initialBoardState.push({ image: `assets/images/r${type}.png`, x: 7, y, "type": PieceType[3], "team": teamType });
    initialBoardState.push({ image: `assets/images/h${type}.png`, x: 1, y, "type": PieceType[2], "team": teamType });
    initialBoardState.push({ image: `assets/images/h${type}.png`, x: 6, y, "type": PieceType[2], "team": teamType });
    initialBoardState.push({ image: `assets/images/b${type}.png`, x: 2, y, "type": PieceType[1], "team": teamType });
    initialBoardState.push({ image: `assets/images/b${type}.png`, x: 5, y, "type": PieceType[1], "team": teamType });
    initialBoardState.push({ image: `assets/images/q${type}.png`, x: 3, y, "type": PieceType[4], "team": teamType });
    initialBoardState.push({ image: `assets/images/k${type}.png`, x: 4, y, "type": PieceType[5], "team": teamType });
};

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "assets/images/pd.png", x: i, y: 6, type: PieceType[0], "team": TeamType[0] });
}
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "assets/images/pl.png", x: i, y: 1, type: PieceType[0], "team": TeamType[1] });
}


export default function Chessboard() {
    const [activePiece, setActivePiece] = useState(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState(initialBoardState);
    const chessboardRef = useRef(null);
    const referee = new Referee();
    
    
    function grabPiece(e) {
        const element = e.target;
        const chessboard = chessboardRef.current;

        if(element.classList.contains("chess-piece") && chessboard) {
            
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
            const x = e.clientX -50;
            const y = e.clientY -50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        
            setActivePiece(element);
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
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
            

            //updates the piece position
            setPieces((value) => {
                
                const pieces = value.map(p => {
                    if(p.x === gridX && p.y === gridY) {
                        const validMove = referee.isValidMove(gridX, gridY, x, y, p.type, p.team, value);

                        if(validMove) {      
                            p.x = x;
                            p.y = y;
                        } else {
                            activePiece.style.position = 'relative';
                            activePiece.style.removeProperty('top');
                            activePiece.style.removeProperty('left');
                        };

                    }
                    return p;
                })
                return pieces;
            });
            setActivePiece(null);
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
