import { useSelector } from "react-redux";
import { RootState } from "../store";

const GameOver = () => {
    const game = useSelector((state: RootState) => state.game);
    return (
        <div>
            Game over!{" "}
            {game.winners[0] == game.playerId ? (
                <div>
                    You Won!
                    <img
                        alt={"Victorious image"}
                        src={"src/assets/img/battleship-fleet-victorious.png"}
                    />
                    <button onClick={() => window.location.reload()}>
                        Play again
                    </button>
                </div>
            ) : (
                <div>
                    You are defeated!
                    <img
                        alt={"Defeated image"}
                        src={"src/assets/img/battleship-fleet-defeated.png"}
                    />
                    <button onClick={() => window.location.reload()}>
                        Play again
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameOver;
