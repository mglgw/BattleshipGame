import { useSelector } from "react-redux";
import { RootState } from "../store";

const ScoreCounter = () => {
    const game = useSelector((state: RootState) => state.game);
    return (
        <div>
            <div>
                {game.currentTurnPlayerId === game.playerId ? (
                    <div>Your Turn!</div>
                ) : (
                    <div>Enemy Turn!</div>
                )}
            </div>
            Your score: {game.playerBoard.score}/20
        </div>
    );
};
export default ScoreCounter;
