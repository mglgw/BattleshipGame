import { useSelector } from "react-redux";
import { RootState } from "../store";
import Cell from "./cell.tsx";
import BottomCell from "./bottomCell.tsx";
import EnemyBoard from "./enemyBoard.tsx";
import Topper from "./topper.tsx";
import GameOver from "./gameOver.tsx";

const Board = () => {
    const grid = useSelector((state: RootState) => state.board);
    return (
        <div>
            <div>{grid.board1.isGameOver ? <GameOver /> : <Topper />}</div>
            <div className={`flex flex-row justify-items-center static gap-12`}>
                <div className={"w-[480px]"}>
                    <div
                        className={
                            "border-solid border-orange-700 grid grid-rows-[10] grid-cols-10 gap-0 static"
                        }
                    >
                        {grid.board1.cells?.map((y) => {
                            return (
                                <div className={""} key={y[0].x}>
                                    {y.map((cell) => (
                                        <div
                                            className={""}
                                            key={`${cell.x}${cell.y}`}
                                        >
                                            <Cell
                                                rowX={cell.x}
                                                rowY={cell.y}
                                                state={cell.state}
                                                isPreview={
                                                    cell.y ===
                                                        grid.board1.hoverY &&
                                                    grid.board1.previewXCoords.indexOf(
                                                        cell.x,
                                                    ) >= 0
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                    <BottomCell gameId={grid.board1.boardId} />
                </div>
                <div className={``}>
                    <EnemyBoard />
                </div>
            </div>
        </div>
    );
};
export default Board;
