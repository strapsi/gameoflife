import Grid from './grid.js';
import render from './console-renderer.js';
import Game from './game.js';


(() => {

    const game = new Game();
    const grid = new Grid(9, 9);

    grid.cellAt(3, 4).toggleState();
    grid.cellAt(4, 3).toggleState();
    grid.cellAt(4, 4).toggleState();
    grid.cellAt(4, 5).toggleState();


    game.startGame(grid, 11, false);
})();