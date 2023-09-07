import { RootState } from "../store";
import { useSelector } from "react-redux";
import RivalCell from "./rivalCell.tsx";

const EnemyBoard = () => {
    const grid = useSelector((state: RootState) => state.board);
    return (
        <div>
            <div className={"w-[480px]"} id={"enemyBoard"}>
                <div className={" grid grid-rows-[10] grid-cols-10 gap-0"}>
                    {grid.board2.cells?.map((y) => {
                        return (
                            <div className={""} key={y[0].x}>
                                {y.map((cell) => (
                                    <div
                                        className={"hover:text-red-700"}
                                        key={`${cell.x}${cell.y}`}
                                    >
                                        <RivalCell
                                            rowX={cell.x}
                                            rowY={cell.y}
                                            state={cell.state}
                                            isPreview={
                                                cell.y === grid.board2.hoverY &&
                                                grid.board2.previewXCoords.indexOf(
                                                    cell.x,
                                                ) >= 0 &&
                                                grid.board2.isYourTurn
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div>
                    {grid.board1.isHost || grid.board1.joinedToGame ? (
                        <div className={"bg-blue-500"}>Your Opponent Board</div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnemyBoard;
