import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CellState } from "../types.ts";
import { RootState } from "../store";
import { SetShipOnBoard } from "../connection.ts";
import { changeHoveredCell } from "../store/gameSlice.ts";

export interface CellProps {
    rowX: number;
    rowY: number;
    state: CellState;
    isPreview: boolean;
}

const Cell: FC<CellProps> = ({ rowX, rowY, state, isPreview }) => {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game);
    const handleClick = async () => {
        if (
            state === CellState.EMPTY &&
            game.shipLength > 0 &&
            game.numberOfPlacedShips < 10
        ) {
            await SetShipOnBoard();
        }
    };
    const handleMouseEnter = () => {
        dispatch(
            changeHoveredCell({
                x: rowX,
                y: rowY,
            }),
        );
    };
    return (
        <div
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            className={`border-solid border-gray-400 border-2 bg-blue-500 h-12 w-12 c 
            ${state === CellState.TAKEN ? "bg-blue-700" : " "} 
            ${state === CellState.SHIP ? "bg-gray-700" : " "} 
            ${state === CellState.MISSED ? "bg-red-950" : " "}
            ${state === CellState.HIT ? "bg-green-950" : " "}
            ${isPreview ? "bg-white " : " "}`}
        ></div>
    );
};
export default Cell;
