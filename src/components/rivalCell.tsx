import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeHovered } from "../store/boardSlice.ts";
import { CellState } from "../types.ts";
import { HitBoard } from "../connection.ts";
import { RootState } from "../store";

export interface CellProps {
    rowX: number;
    rowY: number;
    state: CellState;
    isPreview: boolean;
}

const RivalCell: FC<CellProps> = ({ rowX, rowY, state, isPreview }) => {
    const dispatch = useDispatch();
    const grid = useSelector((state: RootState) => state.board);
    const Shoot = async () => {
        console.log(grid.board2.isYourTurn);
        console.log(state);
        if (
            grid.board2.isYourTurn &&
            state !== CellState.HIT &&
            state !== CellState.MISSED
        ) {
            await HitBoard();
            console.log(grid.board1.isGameOver);
            console.log(grid.board2.isGameOver);
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
            onClick={Shoot}
            onMouseEnter={handleMouseEnter}
            className={`border-solid border-orange-700 border-2 bg-blue-500 h-12 w-12 c 
            ${state === CellState.MISSED ? "bg-red-950" : " "}
            ${state === CellState.HIT ? "bg-green-950" : " "}
            ${isPreview ? "bg-red-800 " : " "}`}
        >
            id= {rowX},{rowY}
        </div>
    );
};
export default RivalCell;
