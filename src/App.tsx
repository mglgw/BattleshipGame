import "./App.css";
import Board from "./components/board.tsx";
import ShipManager from "./components/shipManager.tsx";
import {Provider} from "react-redux";
import {store} from "./store";
import {start} from "./connection.ts";

  start();

function App() {


  return (
      <Provider store={store}>
    <div className={"flex flex-row"}>
        <ShipManager/>
      <Board/>
    </div>
      </Provider>
  );
}

export default App;
