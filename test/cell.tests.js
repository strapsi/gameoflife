import test from 'ava';
import Cell from '../src/cell.js';

test('a cell should know that it is avlie', t => {
    const cell = new Cell(true, 1, 1);
    t.true(cell.isAlive);
});

test('a cell should know that it is dead', t => {
    const cell = new Cell(false, 1, 1);
    t.false(cell.isAlive);
});

test('a cell should be in a row', t => {
    const cell = new Cell(true, 1, 1);
    t.deepEqual(cell.row, 1);
});

test('a cell should be in a column', t => {
    const cell = new Cell(true, 1, 1);
    t.deepEqual(cell.column, 1);
});

test('a cell should no be initialized with null as isAlive state', t => {
    t.throws(() => new Cell(null, 1, 1), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('a cell should no be initialized with undefined as isAlive state', t => {
    t.throws(() => new Cell(undefined, 1, 1), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('a cell should no be initialized with null as row', t => {
    t.throws(() => new Cell(true, null, 1), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('a cell should no be initialized with undefined as row', t => {
    t.throws(() => new Cell(true, undefined, 1), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('a cell should no be initialized with null as column', t => {
    t.throws(() => new Cell(true, 1, null), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('a cell should no be initialized with undefined as column', t => {
    t.throws(() => new Cell(true, 1, undefined), {
        instanceOf: Error,
        message: "constructor value is null or undefinded"
    });
});

test('a cells state should be toggable to alive', t => {
    const cell = new Cell(false, 1, 1);
    cell.toggleState();
    t.true(cell.isAlive);
});

test('a cells state should be toggable to dead', t => {
    const cell = new Cell(true, 1, 1);
    cell.toggleState();
    t.false(cell.isAlive);
});