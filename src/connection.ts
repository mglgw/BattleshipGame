import {
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel,
} from "@microsoft/signalr";
import { store } from "./store";
import {
    addNewShipToList,
    getHitInfo, selectShipLength,
    setGameData,
    setPlayerId,
    updatePlayerBoard,
    updatePlayerBoardAfterMove,
    updateScore
} from "./store/gameSlice.ts";

const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7122/game", { withCredentials: false })
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
connection.on("SendError", (args) => {
    console.log(args);
    if (args != "") {
        alert(args);
    }
});
connection.on("UpdatePlayerBoard", (args) => {
    store.dispatch(updatePlayerBoard(args));
});

connection.on("SendPlayerId", (args) => {
    store.dispatch(setPlayerId(args));
});

connection.on("UpdatePlayerBoardAfterMove", (args) => {
    store.dispatch(updatePlayerBoardAfterMove(args));
});

connection.on("ShipPlaced", (args) => {
    store.dispatch(addNewShipToList(args));
});

connection.on("SendGameInfo", (args) => {
    store.dispatch(setGameData(args));
});

connection.on("SendHitInfo", (args) => {
    store.dispatch(getHitInfo(args));
});

connection.on("SendScore", (args) => {
    store.dispatch(updateScore(args));
});

export async function CreateGame() {
    await connection.send("CreateGame");
}

export async function JoinToGame() {
    const currentState = store.getState();
    await connection.invoke("JoinGame", currentState.game.invCode);
}

export async function HitBoard() {
    const currentState = store.getState();
    await connection.invoke(
        "HitBoard",
        currentState.game.opponentBoardHoverX,
        currentState.game.opponentBoardHoverY,
    );

}
export function SetShipOnBoard() {
    const currentState = store.getState();
    connection.invoke(`SetShipOnBoard`, {
        ShipSize: currentState.game.shipLength,
        X: currentState.game.hoverX,
        Y: currentState.game.hoverY,
        ShipId: currentState.game.pickedShipId,
    });
    store.dispatch(selectShipLength(0));
}
