import test from 'ava';
import Game from '../src/game.js';
import Grid, {
    LivingNeighbours
} from '../src/grid.js';

const gameAndGrid = (x, y) => ({
    game: new Game(),
    grid: new Grid(x, y)
})

test('a game should know the current generation', t => {
    const game = new Game();
    t.is(game.generation, 0);
});

test('a new game should be started with a maximum number of generations', async t => {
    const {
        game,
        grid
    } = gameAndGrid(3, 3);
    const gen = await game.startGame(grid, 5);
    console.log('nach game', gen);
    t.is(game.generation, 5);
});

test('a game should generate a new generation', t => {
    const {
        game,
        grid
    } = gameAndGrid(3, 3);
    const nextGeneration = game.nextGeneration(grid);
    t.pass('message');
});

test('bug', t => {
    const game = new Game();
    let secondGrid = new Grid(4, 4);
    secondGrid.cellAt(1, 2).toggleState();
    secondGrid.cellAt(2, 0).toggleState();
    secondGrid.cellAt(2, 1).toggleState();
    secondGrid.cellAt(3, 1).toggleState();

    t.is(secondGrid.neighbours(secondGrid.cellAt(1, 2), LivingNeighbours).length, 1);
    t.is(secondGrid.neighbours(secondGrid.cellAt(2, 0), LivingNeighbours).length, 2);
    t.is(secondGrid.neighbours(secondGrid.cellAt(2, 1), LivingNeighbours).length, 3);
    t.is(secondGrid.neighbours(secondGrid.cellAt(3, 1), LivingNeighbours).length, 2);

    secondGrid.grid = game.nextGeneration(secondGrid);

    t.true(secondGrid.cellAt(1, 1).isAlive);
    t.true(secondGrid.cellAt(2, 0).isAlive);
    t.true(secondGrid.cellAt(2, 1).isAlive);
    t.true(secondGrid.cellAt(2, 2).isAlive);
    t.true(secondGrid.cellAt(3, 0).isAlive);
    t.true(secondGrid.cellAt(3, 1).isAlive);
});