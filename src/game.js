import {
    LivingNeighbours
} from "./grid.js";
import render from "./console-renderer.js";

class Game {
    constructor() {
        this.generation = 0;
    }

    startGame = (grid, generations = -1, headless = true) => {
        let genCount = generations;
        let currentGen = grid;
        if (!headless) render(currentGen, this.generation);
        while (genCount > 0 || generations === -1) {
            currentGen.grid = this.nextGeneration(currentGen);
            this.generation++;
            if (!headless) render(currentGen, this.generation);
            genCount--;
        }
    }

    nextGeneration = (currentGen) => currentGen.grid.map(row => {
        return row.map(cell => {
            const n = currentGen.neighbours(cell, LivingNeighbours);
            const cellCopy = JSON.parse(JSON.stringify(cell));
            if (cellCopy.isAlive) {
                if (n.length < 2) cellCopy.isAlive = false;
                if (n.length > 3) cellCopy.isAlive = false;
            } else if (n.length === 3) cellCopy.isAlive = true;
            return cellCopy;
        });
    });
}

export default Game;