import { ShipProps } from "./components/ship.tsx";

export interface ICell{
  x:number,
  y:number,
  state: CellState,
  battleship:ShipProps
}
export enum CellState {
  EMPTY,
  TAKEN,
  SHIP,
  HIT,
  MISSED
}