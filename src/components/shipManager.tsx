import Ship from "./ship.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ShipFooter from "./shipFooter.tsx";

const ShipManager = () => {
    const game = useSelector((state: RootState) => state.game);
    return (
        <div>
            {game.isInGame ? (
                <div>
                    {game.gameOver ? (
                        ""
                    ) : (
                        <div className={""}>
                            <div className={" "}>
                                <Ship length={4} id={1} />
                                <Ship length={3} id={2} />
                                <Ship length={3} id={3} />
                                <Ship length={2} id={4} />
                                <Ship length={2} id={5} />
                                <Ship length={2} id={6} />
                                <Ship length={1} id={7} />
                                <Ship length={1} id={8} />
                                <Ship length={1} id={9} />
                                <Ship length={1} id={10} />
                            </div>
                            <ShipFooter />
                        </div>
                    )}
                </div>
            ) : (
                " "
            )}
        </div>
    );
};

export default ShipManager;
