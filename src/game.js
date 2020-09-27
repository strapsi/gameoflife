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

    nextGeneration = (currentGen) => {
        const newGen = [];
        for (let i = 0; i < currentGen.grid.length; i++) {
            newGen.push([]);
            for (let j = 0; j < currentGen.grid[i].length; j++) {
                const n = currentGen.neighbours(i, j, LivingNeighbours);
                const cellCopy = JSON.parse(JSON.stringify(currentGen.cellAt(i, j)));
                if (cellCopy.isAlive) {
                    if (n.length < 2) cellCopy.isAlive = false;
                    if (n.length > 3) cellCopy.isAlive = false;
                } else {
                    if (n.length === 3) {
                        cellCopy.isAlive = true;
                    }
                }
                newGen[i].push(cellCopy);
            }
        }
        return newGen;
    };
}

export default Game;