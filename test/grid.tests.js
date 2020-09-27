import test from 'ava';
import Grid, {
    LivingNeighbours,
    DeadNeighbours
} from '../src/grid.js';
import Cell from '../src/cell.js';
import {
    isMainThread
} from 'worker_threads';

test('the grid should not be initialized with null as height', t => {
    t.throws(() => new Grid(null, 1), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('the grid should not be initialized with undefined as height', t => {
    t.throws(() => new Grid(undefined, 1), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('the grid should not be initialized with null as width', t => {
    t.throws(() => new Grid(1, null), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('the grid should not be initialized with undefined as width', t => {
    t.throws(() => new Grid(1, undefined), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('the grid should be an array of arrays of cells', t => {
    const grid = new Grid(3, 1);
    t.is(grid.grid.length, 3);
    t.true(grid.grid.every(row => row instanceof Array));
    t.true(grid.grid.every(row => row.every(column => column instanceof Cell)));
});

test('the grids should return a cell for a given row and column', t => {
    const grid = new Grid(3, 3);

    t.is(grid.cellAt(1, 1).row, 1);
    t.is(grid.cellAt(1, 2).column, 2);
});

test('the grid should handle out of range inputs', t => {
    const grid = new Grid(3, 1);
    t.throws(() => grid.cellAt(3, 0), {
        instanceOf: Error,
        message: "row out of bounds"
    });

    t.throws(() => grid.cellAt(2, 1), {
        instanceOf: Error,
        message: "column out of bounds"
    });

    t.throws(() => grid.cellAt(-1, 0), {
        instanceOf: Error,
        message: "row out of bounds"
    });

    t.throws(() => grid.cellAt(2, -1), {
        instanceOf: Error,
        message: "column out of bounds"
    });
});

test('the grid should return a list of all neighbours for a given row and column', t => {
    const grid = new Grid(3, 3);
    t.is(grid.neighbours(1, 1).length, 8);
    t.is(grid.neighbours(0, 0).length, 3);
    t.is(grid.neighbours(2, 2).length, 3);
    t.is(grid.neighbours(1, 2).length, 5);
});

test('the neighbours function should not accept invalid inputs', t => {
    const grid = new Grid(3, 3);
    t.throws(() => grid.neighbours(-1, 2), {
        message: "row out of bounds"
    });

    t.throws(() => grid.neighbours(3, 2), {
        message: "row out of bounds"
    });

    t.throws(() => grid.neighbours(1, -3), {
        message: "column out of bounds"
    });

    t.throws(() => grid.neighbours(2, 3), {
        message: "column out of bounds"
    });
});

test('the neigbours function should accept a function as parameter to set a condition for returning a neighbour', t => {
    const grid = new Grid(3, 3);
    t.is(grid.neighbours(0, 0, cell => cell.isAlive).length, 0);
    t.is(grid.neighbours(0, 0, cell => !cell.isAlive).length, 3);
    t.is(grid.neighbours(0, 0, LivingNeighbours).length, 0);
    t.is(grid.neighbours(0, 0, DeadNeighbours).length, 3);
    t.is(grid.neighbours(1, 1, LivingNeighbours).length, 0);
    t.is(grid.neighbours(1, 1, DeadNeighbours).length, 8);
});