import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { selectShipLength } from "../store/boardSlice.ts";

export interface ShipProps {
    length: number;
    coordX: number[];
    coordY: number[];
    boardId: number;
    totalCoords: number[];
}

const Ship: FC<{ length: number }> = (props) => {
    const [shipDisabled, setShipDisabled] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(selectShipLength(props.length));
        setShipDisabled(true);
    };
    return (
        <div>
            <div
                className={` h-12 p-2 flex ${
                    shipDisabled ? "" : "cursor-pointer "
                }`}
                onClick={shipDisabled ? undefined : handleClick}
            >
                {Array(props.length)
                    .fill(null, 0, props.length)
                    .map((value, index) => {
                        return (
                            <div
                                className={`h-12 w-12 border-solid border-2 border-orange-700 ${
                                    shipDisabled ? "" : "bg-amber-200"
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
