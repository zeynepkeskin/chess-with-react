import { PieceType, TeamType } from "../components/Chessboard/Chessboard";

export default class Referee {
  isValidMove(px, py, x, y, type, team) {
    if (type === PieceType[0]) {
      if (team === TeamType[1]) {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) return true;
        } else {
          if (px === x && y - py === 1) return true;
        }
      }
    }

    return false;
  }
}
