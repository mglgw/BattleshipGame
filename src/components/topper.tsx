import { CreateGame, JoinToGame } from "../connection.ts";
import { useDispatch, useSelector } from "react-redux";
import ScoreCounter from "./scoreCounter.tsx";
import { RootState, store } from "../store";
import { setIsInGame } from "../store/gameSlice.ts";

const Topper = () => {
    const game = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const currentState = store.getState();
    const joinGame = async () => {
        await JoinToGame();
        dispatch(setIsInGame(true));
        console.log(currentState.game);
    };
    const generateBoard = async () => {
        await CreateGame();
        dispatch(setIsInGame(true));
        console.log(currentState.game);
    };
    return (
        <div>
            <div>
                {!game.isInGame ? (
                    <div>
                        <button onClick={generateBoard}>
                            Start Game - Host
                        </button>
                        <button onClick={joinGame}> Start Game - Join</button>
                    </div>
                ) : (
                    <div>
                        {game.ready ? (
                            <ScoreCounter />
                        ) : (
                            <div>Place your ships on board!</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Topper;
