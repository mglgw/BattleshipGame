import Ship from "./ship.tsx";

const ShipManager = () => {
    return (
        <div className={"border-2 border-solid border-orange-700"}>
            Choose a ship you would like to place on grid:
            <div className={" p-2 "}>
                <Ship length={4} />
                <Ship length={3} />
                <Ship length={3} />
                <Ship length={2} />
                <Ship length={2} />
                <Ship length={2} />
                <Ship length={1} />
                <Ship length={1} />
                <Ship length={1} />
                <Ship length={1} />
            </div>
        </div>
    );
};

export default ShipManager;
