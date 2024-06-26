import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { selectShipId, selectShipLength } from "../store/gameSlice.ts";

export interface ShipProps {
    boardId: number;
    length: number;
    id: number;
    isSet: boolean;
}

const Ship: FC<{ length: number; id: number }> = (props) => {
    const game = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    const currentShipById = game.playerBoard.ships.find(
        (ship) => ship.id === props.id,
    );
    const handleClick = () => {
        dispatch(selectShipLength(props.length));
        dispatch(selectShipId(props.id));
        console.log(currentShipById?.isSet);
        console.log(props.id);
    };
    return (
        <div>
            <div
                className={` h-12 flex ${
                    currentShipById?.isSet ? "" : "cursor-pointer "
                }`}
                onClick={currentShipById?.isSet ? undefined : handleClick}
            >
                {Array(props.length)
                    .fill(null, 0, props.length)
                    .map((value, index) => {
                        return (
                            <div
                                id={value}
                                className={`h-12 w-12 border-solid border-2 border-orange-700 ${
                                    currentShipById?.isSet ? "" : "bg-amber-200"
                                }`}
                                key={index}
                            ></div>
                        );
                    })}
            </div>
        </div>
    );
};
export default Ship;
