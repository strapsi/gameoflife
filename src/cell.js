import {
    isNullOrUndefined
} from "util";


class Cell {
    constructor(isAlive, row, column) {
        if (isNullOrUndefined(isAlive) ||
            isNullOrUndefined(row) ||
            isNullOrUndefined(column))
            throw new Error("constructor value is null or undefinded")

        this.isAlive = isAlive;
        this.row = row;
        this.column = column;
    }

    toggleState = () => this.isAlive = !this.isAlive;
}

export default Cell;