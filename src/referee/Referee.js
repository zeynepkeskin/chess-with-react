import {
  PieceType,
  TeamType,
  Piece,
} from "../components/Chessboard/Chessboard";

export default class Referee {
  tileIsOccupied(x, y, boardState) {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove(px, py, x, y, type, team, boardState) {
    if (type === PieceType[0]) {
      const specialRow = team === TeamType[1] ? 1 : 6;
      const pawnDirection = team === TeamType[1] ? 1 : -1;

      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }
    }

    return false;
  }
}
