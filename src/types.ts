import { ShipProps } from "./components/ship.tsx";

export interface ICell {
    x: number;
    y: number;
    state: CellState;
    battleship: ShipProps;
}

export interface IShip {
    boardId: number;
    length: number;
    id: number;
    isSet: boolean;
}

export enum CellState {
    EMPTY,
    TAKEN,
    SHIP,
    HIT,
    MISSED,
}
