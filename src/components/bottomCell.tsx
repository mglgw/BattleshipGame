import { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setGameId } from "../store/gameSlice.ts";

interface BottomCellProps {
    gameId: number;
}

const BottomCell: FC<BottomCellProps> = ({ gameId }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const game = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const handleChange = () => {
        dispatch(setGameId(Number(inputRef.current?.value)));
    };
    return (
        <div>
            {game.isInGame ? (
                <div className={"bg-blue-500"}>Your Game ID {gameId}</div>
            ) : (
                <div>
                    {game.isInGame ? (
                        <div className={"bg-blue-500"}>
                            Your Game ID {gameId}
                        </div>
                    ) : (
                        <div
                            className={`flex flex-row justify-center bg-blue-500 $`}
                        >
                            Type in game ID
                                <input
                                    type="number"
                                    id="gameId"
                                    onChange={handleChange}
                                    ref={inputRef}
                                />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BottomCell;
