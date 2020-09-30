import test from 'ava';
import Game from '../src/game.js';
import Grid, { LivingNeighbours } from '../src/grid.js';

const initGame = (x, y) => ({
    game: new Game(),
    grid: new Grid(x, y)
})

test('a game should know the current generation', t => {
    const game = new Game();
    t.is(game.generation, 0);
});


test('a game should generate a new generation', t => {
    const { game, grid } = initGame(3, 3);
    grid.cellAt(1, 0).toggleState();
    grid.cellAt(1, 1).toggleState();
    grid.cellAt(1, 2).toggleState();
    const nextGeneration = game.nextGeneration(grid);

    t.false(nextGeneration[0][0].isAlive);
    t.true(nextGeneration[0][1].isAlive);
    t.false(nextGeneration[0][2].isAlive);
    t.false(nextGeneration[1][0].isAlive);
    t.true(nextGeneration[1][1].isAlive);
    t.false(nextGeneration[1][2].isAlive);
    t.false(nextGeneration[2][0].isAlive);
    t.true(nextGeneration[2][1].isAlive);
    t.false(nextGeneration[2][2].isAlive);
});