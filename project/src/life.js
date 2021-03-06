let [first, second] = [[], []];
let [interval, state] = [null, false];
const [row, column] = [42, 44];

class Life {
  constructor() {
    const table = document.querySelector('table');
    for (let x = 0; x <= row; x += 1) {
      const tr = document.createElement('tr');
      [first[x], second[x]] = [[], []];
      for (let y = 0; y <= column; y += 1) {
        const td = document.createElement('td');
        td.setAttribute('id', `${x}-${y}`);
        td.setAttribute('class', 'dead');
        [first[x][y], second[x][y]] = [0, 0];
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }

  user(cell) {
    this.cell = cell;
    const [x, y] = this.cell.id.split('-');
    if (first[x][y] === 0) return this.isAlive(first, x, y);
    return this.isDead(first, x, y);
  }

  computer() {
    for (let x = 1; x < row; x += 1) {
      for (let y = 1; y < column; y += 1) {
        const neighbours = this.find(first, x, y);
        if (neighbours === 3 || (neighbours === 2 && first[x][y] === 1)) {
          this.isAlive(second, x, y);
        } else this.isDead(second, x, y);
      }
    }
    [first, second] = [second, first];
  }

  isAlive(array, x, y) { // Closure function.
    [this.array, this.x, this.y] = [array, x, y];
    const cell = document.getElementById(`${this.x}-${this.y}`);
    cell.setAttribute('class', 'alive');
    this.array[this.x][this.y] = 1;
  }

  isDead(array, x, y) { // Closure function.
    [this.array, this.x, this.y] = [array, x, y];
    const cell = document.getElementById(`${this.x}-${this.y}`);
    cell.setAttribute('class', 'dead');
    this.array[this.x][this.y] = 0;
  }

  find(array, x, y) { // Closure function.
    [this.array, this.x, this.y] = [array, x, y];
    let neighbours = 0;
    neighbours += (first[x - 1][y - 1] === 1) ? 1 : 0; // Top left.
    neighbours += (first[x][y - 1] === 1) ? 1 : 0; // Top center.
    neighbours += (first[x + 1][y - 1] === 1) ? 1 : 0; // Top right.
    neighbours += (first[x - 1][y] === 1) ? 1 : 0; // Middle left.
    neighbours += (first[x + 1][y] === 1) ? 1 : 0; // Middle right.
    neighbours += (first[x - 1][y + 1] === 1) ? 1 : 0; // Bottom left.
    neighbours += (first[x][y + 1] === 1) ? 1 : 0; // Bottom center.
    neighbours += (first[x + 1][y + 1] === 1) ? 1 : 0; // Bottom right.
    return neighbours;
  }
}

const life = new Life();
const cells = document.querySelectorAll('td');
const button = document.querySelector('button');

const main = document.querySelector('main');
cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (state === true) {
      main.setAttribute('class', 'off');
      state = false;
      clearInterval(interval);
      return;
    }
    life.user(cell);
  });
});

button.addEventListener('click', () => {
  if (state === false) {
    main.setAttribute('class', 'on');
    state = true;
    interval = setInterval(() => {
      life.computer();
    }, 200);
  } else {
    main.setAttribute('class', 'off');
    state = false;
    clearInterval(interval);
  }
});
