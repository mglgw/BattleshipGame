import { CreateBoard, GetRivalBoard, JoinGame } from "../connection.ts";
import { useState } from "react";
import { setIfHost, setIfJoined } from "../store/boardSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import ScoreCounter from "./scoreCounter.tsx";
import { RootState } from "../store";

const Topper = () => {
    const [isNewGame, setIsNewGame] = useState(true);
    const grid = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();
    const joinGame = async () => {
        await JoinGame();
        await GetRivalBoard();
        if (!grid.board1.isHost) {
            setIsNewGame(false);
            dispatch(setIfJoined(true));
        }
    };
    const generateBoard = async () => {
        await CreateBoard();
        dispatch(setIfHost(true));
        await GetRivalBoard();
        setIsNewGame(false);
    };
    return (
        <div>
            <div>
                {isNewGame ? (
                    <div>
                        <button onClick={generateBoard}>
                            Start Game - Host
                        </button>
                        <button onClick={joinGame}> Start Game - Join</button>
                    </div>
                ) : (
                    <div>
                        {grid.board1.isReady && grid.board2.isReady ? (
                            <ScoreCounter />
                        ) : (
                            <div>
                                Place your ships on board! Your opponent is{" "}
                                {grid.board2.isReady
                                    ? "ready!"
                                    : "not yet ready!"}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Topper;
