import { useSelector } from "react-redux";
import { RootState } from "../store";

const ScoreCounter = () => {
    const grid = useSelector((state: RootState) => state.board);
    return (
        <div>
            <div>
                {grid.board1.isYourTurn ? (
                    <div>Enemy Turn!</div>
                ) : (
                    <div>Your Turn!</div>
                )}
            </div>
            Your score: {grid.board1.score}/20
        </div>
    );
};
export default ScoreCounter;
