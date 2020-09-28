import {
    LivingNeighbours
} from "./grid.js";

class Game {
    constructor() {
        this.generation = 0;
    }

    async startGame(grid, generations = -1, afterNewGen, delay = 1) {
        let genCount = generations;
        let currentGen = grid;        
        return new Promise(async resolve => {
            while (genCount > 0 || generations === -1) {
                const p = new Promise(resolveLoop => {
                    setTimeout(async () => {
                        currentGen.grid = this.nextGeneration(currentGen);
                        if (afterNewGen) afterNewGen();
                        resolveLoop();
                    }, delay);
                });
                await p;
                genCount--;
            }
            resolve(this.generation);
        });
    }

    nextGeneration(currentGen) {
        this.generation++;
        console.log("a");
        return currentGen.grid.map(row => {
            return row.map(cell => {
                const n = currentGen.neighbours(cell, LivingNeighbours);
                const cellCopy = JSON.parse(JSON.stringify(cell));
                if (cellCopy.isAlive) {
                    if (n.length < 2) cellCopy.isAlive = false;
                    if (n.length > 3) cellCopy.isAlive = false;
                } else if (n.length === 3) cellCopy.isAlive = true;
                return cellCopy;
            });

        })
    };
}

export default Game;