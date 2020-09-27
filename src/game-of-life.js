import Grid from './grid.js';
import Game from './game.js';


const render = (grid, generation) => {
    const renderedGrid = grid.grid
        .map(row => row.map(cell => cell.isAlive ? 'O' : ':')
            .reduce((a, b) => a + b, ''))
        .reduce((a, b) => a + '\n' + b, '');
};

(() => {
    const btn = document.getElementById('btn');
    const next = document.getElementById('next');
    const container = document.getElementById('container');
    const height = 4;
    const width = 4;
    container.style.gridTemplateColumns = '1fr '.repeat(width).trim();

    const game = new Game();
    const grid = new Grid(height, width);
    grid.cellAt(1, 2).toggleState();
    grid.cellAt(2, 0).toggleState();
    grid.cellAt(2, 1).toggleState();
    grid.cellAt(3, 1).toggleState();

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            if (grid.cellAt(i, j).isAlive) cell.classList.add('is-alive');
            cell.id = 'cell-' + i + '-' + j;
            container.appendChild(cell);
        }
    }



    btn.onclick = () => console.log('ich wurde geklickt');
    next.onclick = () => {
        grid.grid = game.nextGeneration(grid);

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const cell = document.getElementById(`cell-${i}-${j}`);
                if (grid.cellAt(i, j).isAlive && !cell.classList.contains('is-alive')) cell.classList.add('is-alive');
                if (!grid.cellAt(i, j).isAlive && cell.classList.contains('is-alive')) cell.classList.remove('is-alive');
            }
        }
    };
})();