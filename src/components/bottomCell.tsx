import { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setInputGameId } from "../store/boardSlice.ts";

interface BottomCellProps {
    gameId: number;
}

const BottomCell: FC<BottomCellProps> = ({ gameId }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const grid = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();
    const handleChange = (event) => {
        dispatch(setInputGameId(Number(inputRef.current?.value)));
        event.preventDefault();
    };

    return (
        <div>
            {grid.board1.isHost ? (
                <div className={"bg-blue-500"}>Your Game ID {gameId}</div>
            ) : (
                <div className={`bg-blue-500 $`}>
                    Type in game ID
                    <form>
                        <input
                            type="number"
                            id="gameId"
                            onChange={handleChange}
                            ref={inputRef}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default BottomCell;
