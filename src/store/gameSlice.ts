import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardProps, CellState, ICell, IShip } from "../types.ts";

export interface gameSlice {
    id: string;
    invCode: number;
    ready: boolean;
    turn: boolean;
    host:boolean,
    winners: string[];
    playerBoard: BoardProps;
    hoverX: number;
    hoverY: number;
    previewXCoords: number[];
    shipLength: number;
    pickedShipId: number;
    numberOfPlacedShips: number;
    opponentBoard: {
        cells: ICell[][];
    };
    isInGame: boolean;
    playerId: string;
    currentTurnPlayerId: string;
    opponentBoardHoverX: number;
    opponentBoardHoverY: number;
    gameOver: boolean;
}

const initialState: gameSlice = {
    id: "empty",
    playerId: " ",
    currentTurnPlayerId: " ",
    invCode: 0,
    ready: false,
    turn: false,
    gameOver: false,
    isInGame: false,
    host:false,
    winners: [],
    playerBoard: {
        boardId: 0,
        ships: [],
        cells: [],
        score:0
    },
    opponentBoard: {
        cells: [],
    },
    shipLength: 0,
    pickedShipId: 0,
    numberOfPlacedShips: 0,
    hoverX: 0,
    hoverY: 0,
    previewXCoords: [],
    opponentBoardHoverX: 0,
    opponentBoardHoverY: 0,
};
export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGameData: (state, action: PayloadAction<gameSlice>) => {
            state.id = action.payload.id;
            state.turn = action.payload.turn;
            state.winners = action.payload.winners;
            state.ready = action.payload.ready;
            state.invCode = action.payload.invCode;
            state.currentTurnPlayerId = action.payload.currentTurnPlayerId;
            state.gameOver = action.payload.gameOver;
        },
        setGameId: (state, action: PayloadAction<number>) => {
            state.invCode = action.payload;
        },
        updatePlayerBoard: (state, action) => {
            state.playerBoard = action.payload;
            state.opponentBoard.cells = action.payload.cells;
        },
        changeHoveredCell: (
            state,
            action: PayloadAction<{ x: number; y: number }>,
        ) => {
            state.hoverX = action.payload.x;
            state.hoverY = action.payload.y;
            state.previewXCoords = [];
            for (let i = 0; i <= state.shipLength - 1; i++) {
                state.previewXCoords[i] = state.hoverX + i;
            }
        },
        selectShipLength: (state, action: PayloadAction<number>) => {
            state.shipLength = action.payload;
        },
        selectShipId: (state, action: PayloadAction<number>) => {
            state.pickedShipId = action.payload;
        },
        addNewShipToList: (state, action: PayloadAction<IShip>) => {
            state.playerBoard.ships.push(action.payload);
        },
        updatePlayerBoardAfterMove: (state, action) => {
            state.playerBoard = action.payload;
        },
        setIsInGame: (state, action: PayloadAction<boolean>) => {
            state.isInGame = action.payload;
        },
        setPlayerId: (state, action: PayloadAction<string>) => {
            state.playerId = action.payload;
        },
        changeHoveredOpponentCell: (
            state,
            action: PayloadAction<{ x: number; y: number }>,
        ) => {
            state.opponentBoardHoverX = action.payload.x;
            state.opponentBoardHoverY = action.payload.y;
        },
        getHitInfo: (
            state,
            action: PayloadAction<{
                playerId: string;
                cellState: CellState;
                x: number;
                y: number;
            }>,
        ) => {
            console.log(action.payload);
            console.log(state.playerId);
            if (action.payload.playerId === state.playerId)
                state.playerBoard.cells[action.payload.x][
                    action.payload.y
                ].state = action.payload.cellState;
            else
                state.opponentBoard.cells[action.payload.x][
                    action.payload.y
                ].state = action.payload.cellState;
        },
        updateScore: (state, action: PayloadAction<number>) => {
            state.playerBoard.score = action.payload;
        },
    },
});
export const {
    setGameData,
    setGameId,
    updatePlayerBoard,
    changeHoveredCell,
    selectShipLength,
    selectShipId,
    addNewShipToList,
    updatePlayerBoardAfterMove,
    setIsInGame,
    setPlayerId,
    changeHoveredOpponentCell,
    getHitInfo,
    updateScore,
} = gameSlice.actions;
export default gameSlice.reducer;
