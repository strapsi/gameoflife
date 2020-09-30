import Grid from './grid.js';
import Game from './game.js';

(() => {
    const next = document.getElementById('next');
    const container = document.getElementById('container');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const pause = document.getElementById('pause');
    const cont = document.getElementById('continue');
    const speed = document.getElementById('speed');
    const flish = document.getElementById('flish');
    const height = 45;
    const width = 90;
    container.style.gridTemplateColumns = '1fr '.repeat(width).trim();

    const game = new Game();
    const grid = new Grid(height, width);

    const toggleCell = cell => {
        const [row, column] = cell.id.split('-').slice(1);
        grid.cellAt(row, column).toggleState();
        cell.classList.toggle('is-alive');
    }

    const onCellClick = event => {
        if (!game.isRunning()) toggleCell(event.srcElement);
    }

    const mouseOverEvent = event => {
        if (!game.isRunning() && event.buttons == 1 && !event.srcElement.classList.contains('is-alive')) {
            flish.play();
            toggleCell(event.srcElement);
        }
    }

    const updateGrid = () => {
        const s = (new Date).getTime();
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const cell = document.getElementById(`cell-${i}-${j}`);
                if (grid.cellAt(i, j).isAlive && !cell.classList.contains('is-alive')) cell.classList.add('is-alive');
                if (!grid.cellAt(i, j).isAlive && cell.classList.contains('is-alive')) cell.classList.remove('is-alive');
            }
        }
    }

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (grid.cellAt(i, j).isAlive) cell.classList.add('is-alive');
            cell.id = 'cell-' + i + '-' + j;
            cell.onclick = onCellClick;
            cell.onmouseover = mouseOverEvent;
            container.appendChild(cell);
        }
    }

    speed.onchange = event => {
        if (game.isRunning()) {
            game.stop();
            game.start(grid, updateGrid, event.target.value);
        }
    }
    start.onclick = () => {
        game.start(grid, updateGrid, speed.value);
        game.resume();
        start.disabled = true;
        stop.disabled = false;
        pause.disabled = false;
        cont.disabled = true;
    }
    stop.onclick = () => {
        game.stop();
        start.disabled = false;
        stop.disabled = true;
        pause.disabled = true;
        cont.disabled = true;
    }
    pause.onclick = () => {
        game.pause();
        start.disabled = true;
        stop.disabled = false;
        pause.disabled = true;
        cont.disabled = false;
    }
    cont.onclick = () => {
        game.resume();
        start.disabled = true;
        stop.disabled = false;
        pause.disabled = false;
        cont.disabled = true;
    }
    next.onclick = () => {
        grid.grid = game.nextGeneration(grid);
        updateGrid();
    };
})();