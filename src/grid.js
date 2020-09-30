import Cell from './cell.js';

class Grid {

    cellAt(row, column) {
        this.rangeCheck(row, column);
        return this.grid[row][column];
    }

    neighbours(cell, condition) {
        const { row, column } = cell;
        this.rangeCheck(row, column);
        const neighbours = new Array(8);
        neighbours.push(this.cellOrUndefined(row - 1, column - 1, condition));
        neighbours.push(this.cellOrUndefined(row - 1, column, condition));
        neighbours.push(this.cellOrUndefined(row - 1, column + 1, condition));
        neighbours.push(this.cellOrUndefined(row, column - 1, condition));
        neighbours.push(this.cellOrUndefined(row, column + 1, condition));
        neighbours.push(this.cellOrUndefined(row + 1, column - 1, condition));
        neighbours.push(this.cellOrUndefined(row + 1, column, condition));
        neighbours.push(this.cellOrUndefined(row + 1, column + 1, condition));
        return neighbours.filter(it => it);
    }

    constructor(height, width) {
        if (!(height && width)) throw new Error("constructor value is null or undefinded");
        this.height = height;
        this.width = width;
        this.grid = [];
        this.populateGrid(height, width);
    }

    rowInRange(row) { return row >= 0 && row < this.grid.length; }
    columnInRange(row, column) { return row >= 0 && row < this.grid.length && column >= 0 && column < this.grid[row].length; }
    rangeCheck(row, column) {
        if (!this.rowInRange(row))
            throw new Error("row out of bounds")
        if (!this.columnInRange(row, column))
            throw new Error("column out of bounds")
    };
    cellOrUndefined(row, column, condition) {
        if (this.columnInRange(row, column)) {
            const cell = this.cellAt(row, column)
            if (!condition || condition(cell)) return cell;
        }
        return undefined;
    };
    populateGrid(height, width) {
        for (let i = 0; i < height; i++) {
            this.grid.push([]);
            for (let j = 0; j < width; j++) {
                this.grid[i].push(new Cell(false, i, j));
            }
        }
    }
}

export default Grid;
export const LivingNeighbours = cell => cell.isAlive;
export const DeadNeighbours = cell => !cell.isAlive;