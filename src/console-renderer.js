const render = (grid, generation) => {
    const renderedGrid = grid.grid
        .map(row => row.map(cell => cell.isAlive ? 'O' : ':')
            .reduce((a, b) => a + b, ''))
        .reduce((a, b) => a + '\n' + b, '')
    process.stdout.clearLine();    
    process.stdout.cursorTo(0);
    process.stdout.write('\n');
    process.stdout.write('generation #' + generation);
    process.stdout.write('\n');
    process.stdout.write(renderedGrid);
    process.stdout.write('\n');
};


export default render;