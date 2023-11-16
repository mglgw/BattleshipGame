import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CellState } from "../types.ts";
import { HitBoard } from "../connection.ts";
import { RootState } from "../store";
import { changeHoveredOpponentCell } from "../store/gameSlice.ts";

export interface CellProps {
    rowX: number;
    rowY: number;
    state: CellState;
}

const RivalCell: FC<CellProps> = ({ rowX, rowY, state }) => {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game);
    const Shoot = async () => {
        if (
            game.currentTurnPlayerId === game.playerId &&
            state !== CellState.HIT &&
            state !== CellState.MISSED
        ) {
            await HitBoard();
        }
    };
    const handleMouseEnter = () => {
        dispatch(
            changeHoveredOpponentCell({
                x: rowX,
                y: rowY,
            }),
        );
    };
    return (
        <div
            onClick={Shoot}
            onMouseEnter={handleMouseEnter}
            className={`hover:bg-red-800 border-solid border-gray-400 border-2 bg-blue-500 h-12 w-12 c 
            ${state === CellState.MISSED ? "bg-red-950" : " "}
            ${state === CellState.HIT ? "bg-green-950" : " "}`}
        ></div>
    );
};
export default RivalCell;
