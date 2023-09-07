import {
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel,
} from "@microsoft/signalr";
import { store } from "./store";
import {
    selectShipLength,
    setDataOnBoard1,
    setDataOnBoard2,
} from "./store/boardSlice.ts";

const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7122/board", { withCredentials: false })
    .configureLogging(LogLevel.Information)
    .build();

export async function start() {
    if (
        connection.state !== HubConnectionState.Connected &&
        connection.state !== HubConnectionState.Reconnecting
    ) {
        try {
            await connection.start();
            console.log("Connected");
        } catch (err) {
            console.log(err);
            setTimeout(start, 5000);
        }
    }
}

connection.onclose(async () => {
    await start();
});
connection.on("SendInfo", (args) => {
    console.log(args);
    if (args != "") {
        alert(args);
        args = " ";
    }
});
connection.on("GetBoard", (args) => {
    store.dispatch(setDataOnBoard1(args));
});
connection.on("JoinGame", (args) => {
    store.dispatch(setDataOnBoard1(args));
});
connection.on("HitBoard", (args) => {
    store.dispatch(setDataOnBoard2(args));
});
connection.on("GetRivalBoard", (args) => {
    store.dispatch(setDataOnBoard2(args));
});
connection.on("StartDuel", (args) => {
    store.dispatch(setDataOnBoard1(args));
});

export async function CreateBoard() {
    await connection.invoke("CreateBoard");
}

connection.on("CreateBoard", (args) => {
    store.dispatch(setDataOnBoard1(args));
});

export function SetBoard() {
    const currentState = store.getState();
    connection.invoke(`SetBoard`, {
        BoardId: currentState.board.board1.boardId,
        ShipSize: currentState.board.board1.shipLength,
        X: currentState.board.board1.hoverX,
        Y: currentState.board.board1.hoverY,
        ShipId: currentState.board.board1.pickedShipId,
    });
    store.dispatch(selectShipLength(0));
}

export async function GetBoard() {
    const currentState = store.getState();
    await connection.invoke("GetBoard", currentState.board.board1.boardId);
}

export async function GetRivalBoard() {
    const currentState = store.getState();
    await connection.invoke(
        "SendRivalBoard",
        currentState.board.board1.rivalBoardId,
    );
}

export async function JoinGame() {
    const currentState = store.getState();
    await connection.invoke("JoinGame", currentState.board.board1.inputGameId);
}

export async function HitBoard() {
    const currentState = store.getState();
    await connection.invoke(
        "HitBoard",
        currentState.board.board2.boardId,
        currentState.board.board2.hoverX,
        currentState.board.board2.hoverY,
    );
}

export async function StartDuel() {
    const currentState = store.getState();
    await connection.invoke("StartDuel", currentState.board.board1.boardId);
}
