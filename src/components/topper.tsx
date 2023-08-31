import {
    CreateBoard,
    GetRivalBoard,
    JoinGame,
    StartDuel,
} from "../connection.ts";
import { useState } from "react";
import { setIfHost } from "../store/boardSlice.ts";
import { useDispatch } from "react-redux";
import ScoreCounter from "./scoreCounter.tsx";

const Topper = () => {
    const [isNewGame, setIsNewGame] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const dispatch = useDispatch();
    const joinGame = async () => {
        await JoinGame();
        await GetRivalBoard();
        setIsNewGame(false);
    };
    const generateBoard = async () => {
        await CreateBoard();
        dispatch(setIfHost(true));
        await GetRivalBoard();
        setIsNewGame(false);
    };
    const startGame = async () => {
        await StartDuel();
        await GetRivalBoard();
        setGameStarted(true);
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
                        {gameStarted ? (
                            <ScoreCounter />
                        ) : (
                            <div>
                                Place your ships on board and press Start when
                                you are ready!
                                <button onClick={startGame}>Start!</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Topper;
