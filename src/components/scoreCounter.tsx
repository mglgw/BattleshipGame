import { useSelector } from "react-redux";
import { RootState } from "../store";

const ScoreCounter = () => {
    const grid = useSelector((state: RootState) => state.board);
    return <div>Your score: {grid.board1.score}/20</div>;
};

export default ScoreCounter;
