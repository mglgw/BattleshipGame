import { useSelector } from "react-redux";
import { RootState } from "../store";

const GameOver = () => {
    const grid = useSelector((state: RootState) => state.board);
    return (
        <div>
            Game over!{" "}
            {grid.board1.isWinner ? (
                <div>You Won!
                  <img alt={"Victorious image"} src={"src/assets/img/battleship-fleet-victorious.png"}/>
                  <button onClick={() => window.location.reload()} >Play again</button>
                </div>
            ) : (
                <div>You are defeated!
                  <img alt={"Defeated image"} src={"src/assets/img/battleship-fleet-defeated.png"}/>
                  <button onClick={() => window.location.reload()} >Play again</button>
                </div>
            )}
        </div>
    );
};

export default GameOver;
