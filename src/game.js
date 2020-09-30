import Cell from "./cell.js";
import { LivingNeighbours } from "./grid.js";

class Game {

    start(grid, render, delay = 1) {
        this.gameLoop = setInterval(() => {
            if (!this.isPaused) {
                grid.grid = this.nextGeneration(grid);
                if (render) render();
            }
        }, delay);
    }

    stop() {
        if (this.gameLoop > -1) {
            clearInterval(this.gameLoop);
            this.gameLoop = -1;
        }
    }

    pause() { this.isPaused = true; }

    resume() { this.isPaused = false; }

    isRunning() { return this.gameLoop > -1 && !this.isPaused; }

    nextGeneration(currentGeneration) {
        this.generation++;
        return currentGeneration.grid.map(gridRow => {
            return gridRow.map(cell => {
                const livingNeighbours = currentGeneration.neighbours(cell, LivingNeighbours).length;
                const { isAlive, row, column } = cell;
                const isNextGenAlive = (isAlive && livingNeighbours >= 2 && livingNeighbours <= 3) || (!isAlive && livingNeighbours === 3)
                return new Cell(isNextGenAlive, row, column);
            });

        })
    };

    constructor() {
        this.generation = 0;
        this.state = 'generated';
        this.gameLoop = -1;
        this.isPaused = false;
    }
}

export default Game;