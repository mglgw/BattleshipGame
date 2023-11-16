import { RootState } from "../store";
import { useSelector } from "react-redux";
import RivalCell from "./rivalCell.tsx";

const EnemyBoard = () => {
    const game = useSelector((state: RootState) => state.game);
    return (
        <div>
            <div className={"w-[480px]"} id={"enemyBoard"}>
                <div className={" grid grid-rows-[10] grid-cols-10 gap-0"}>
                    {game.opponentBoard.cells?.map((y) => {
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
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div>
                    {game.isInGame ? (
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
