import { useSelector } from "react-redux";
import { RootState } from "../store";
import Cell from "./cell.tsx";
import BottomCell from "./bottomCell.tsx";
import EnemyBoard from "./enemyBoard.tsx";
import Topper from "./topper.tsx";
import GameOver from "./gameOver.tsx";

const Board = () => {
    const game = useSelector((state: RootState) => state.game);
    return (
        <div>
            <div className={"flex flex-row w-[480px] justify-evenly"}>
                {game.gameOver ? <GameOver /> : <Topper />}
            </div>
            {game.gameOver ? (
                ""
            ) : (
                <div
                    className={`flex flex-row justify-items-center static gap-12`}
                >
                    <div className={"w-[480px]"}>
                        <div
                            className={
                                " border-gray-400 grid grid-rows-[10] grid-cols-10 gap-0 static"
                            }
                        >
                            {game.playerBoard.cells?.map((y) => {
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
                                                            game.hoverY &&
                                                        game.previewXCoords.indexOf(
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
                        <BottomCell gameId={game.invCode} />
                    </div>
                    <div className={``}>
                        <EnemyBoard />
                    </div>
                </div>
            )}
        </div>
    );
};
export default Board;
