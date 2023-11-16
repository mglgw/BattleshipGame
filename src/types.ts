import { ShipProps } from "./components/ship.tsx";

export interface ICell {
    x: number;
    y: number;
    state: CellState;
    battleship: ShipProps;
}

export interface IPlayer {
    Board: BoardProps;
    ConnectionId: string;
    Id: string;
    IsHost: boolean;
}

export interface IShip {
    boardId: number;
    x: number;
    y: number;
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

export interface BoardProps {
    boardId: number;
    ships: IShip[];
    cells: ICell[][];
    score:number;
}
