import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShipProps } from "../components/ship.tsx";
import { ICell } from "../types.ts";
export interface BoardProps {
    boardId: number;
    score: number;
    ships: ShipProps[];
    cells: ICell[][];
    rivalBoardId: number;
    numberOfPlacedShips: number;
    isYourTurn: boolean,
    isGameOver : boolean;
}
interface BoardState {
    board1:{
        hoverX:number,
        hoverY:number,
        previewXCoords:number[],
        shipLength:number,
        boardId:number,
        inputGameId:number,
        isHost:boolean,
        score: number,
        ships: ShipProps[],
        cells: ICell[][],
        rivalBoardId: number,
        numberOfPlacedShips:number,
        isYourTurn: boolean,
        isGameOver:boolean;
    },
    board2:{
        hoverX:number,
        hoverY:number,
        previewXCoords:number[],
        shipLength:number,
        boardId:number,
        inputGameId:number,
        isHost:boolean,
        score: number,
        ships: ShipProps[],
        cells: ICell[][],
        rivalBoardId: number,
        numberOfPlacedShips:number,
        isYourTurn: boolean,
        isGameOver: boolean;
    }
}
const initialState : BoardState = {
    board1: {
        hoverX:0,
        hoverY:0,
        previewXCoords:[],
        shipLength:0,
        boardId:0,
        inputGameId:0,
        isHost:false,
        score: 0,
        ships: [],
        cells: [],
        rivalBoardId:0,
        numberOfPlacedShips:0,
        isYourTurn: false,
        isGameOver:false,
    },
    board2: {
        hoverX:0,
        hoverY:0,
        previewXCoords:[],
        shipLength:0,
        boardId:0,
        inputGameId:0,
        isHost:false,
        score: 0,
        ships: [],
        cells: [],
        rivalBoardId:0,
        numberOfPlacedShips:0,
        isYourTurn: false,
        isGameOver:false,
}
}
export const boardSlice = createSlice ({
    name: 'Board',
    initialState,
    reducers: {
        changeHovered:(state, action: PayloadAction<{x:number, y:number}>) =>{
            state.board1.hoverX = action.payload.x;
            state.board1.hoverY = action.payload.y;
            state.board2.hoverX = action.payload.x;
            state.board2.hoverY = action.payload.y;
            state.board1.previewXCoords = [];
            for (let i = 0; i<= state.board1.shipLength-1; i++){
                state.board1.previewXCoords[i] = state.board1.hoverX +i;
            }
        },
        selectShipLength: (state, action:PayloadAction<number>) =>{
            state.board1.shipLength = action.payload;
        },
        setInputGameId: (state,action:PayloadAction<number>) =>{
            state.board1.inputGameId = action.payload;
        },
        setIfHost:(state,action:PayloadAction<boolean>) =>{
            state.board1.isHost = action.payload;
        },
        setDataOnBoard1:(state, action:PayloadAction<BoardProps>) =>{
            state.board1.cells = action.payload.cells;
            state.board1.score = action.payload.score;
            state.board1.ships = action.payload.ships;
            state.board1.boardId = action.payload.boardId;
            state.board1.rivalBoardId = action.payload.rivalBoardId;
            state.board1.numberOfPlacedShips = action.payload.numberOfPlacedShips;
            state.board1.isYourTurn = action.payload.isYourTurn;
            state.board1.isGameOver = action.payload.isGameOver;
        },
        setDataOnBoard2:(state, action:PayloadAction<BoardProps>) =>{
            state.board2.cells = action.payload.cells;
            state.board2.score = action.payload.score;
            state.board2.ships = action.payload.ships;
            state.board2.boardId = action.payload.boardId;
            state.board2.rivalBoardId = action.payload.rivalBoardId;
            state.board2.numberOfPlacedShips = action.payload.numberOfPlacedShips;
            state.board2.isYourTurn = action.payload.isYourTurn;
            state.board2.isGameOver = action.payload.isGameOver;
        },
    }
})
export const {changeHovered, selectShipLength, setInputGameId,setIfHost, setDataOnBoard1,  setDataOnBoard2} =boardSlice.actions
export default boardSlice.reducer