import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeHovered } from "../store/boardSlice.ts";
import { CellState } from "../types.ts";
import { RootState } from "../store";
import { GetBoard, GetRivalBoard, SetBoard } from "../connection.ts";

export interface CellProps {
    rowX: number;
    rowY: number;
    state: CellState;
    isPreview: boolean;
}

const Cell: FC<CellProps> = ({ rowX, rowY, state, isPreview }) => {
    const dispatch = useDispatch();
    const grid = useSelector((state: RootState) => state.board);
    const handleClick = async () => {
        if (
            state === CellState.EMPTY &&
            grid.board1.shipLength > 0 &&
            grid.board1.numberOfPlacedShips < 10
        ) {
            await SetBoard();
            await GetBoard();
            await GetRivalBoard();
        }
    };
    const handleMouseEnter = () => {
        dispatch(
            changeHovered({
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
