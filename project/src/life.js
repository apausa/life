/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
let [first, second] = [[], []];
let [interval, state] = [null, false];
const [row, column] = [50, 50];
const cells = document.querySelectorAll('td');
const play = document.querySelector('.play');

class Life {
  constructor() {
    const table = document.querySelector('table');
    for (let x = 0; x <= row; x++) {
      const tr = document.createElement('tr');
      [first[x], second[x]] = [[], []];
      for (let y = 0; y <= column; y++) {
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
    for (let x = 1; x < row; x++) {
      for (let y = 1; y < column; y++) {
        const neighbours = this.find(first, x, y);
        (neighbours === 3 || (neighbours === 2 && first[x][y] === 1))
          ? this.isAlive(second, x, y)
          : this.isDead(second, x, y);
      }
    }
    [first, second] = [second, first];
  }

  isAlive(array, x, y) {
    [this.array, this.x, this.y] = [array, x, y];
    const cell = document.getElementById(`${this.x}-${this.y}`);
    cell.setAttribute('class', 'alive');
    this.array[this.x][this.y] = 1;
  }

  isDead(array, x, y) {
    [this.array, this.x, this.y] = [array, x, y];
    const cell = document.getElementById(`${this.x}-${this.y}`);
    cell.setAttribute('class', 'dead');
    this.array[this.x][this.y] = 0;
  }

  find(array, x, y) {
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

cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    life.user(cell);
  });
});

play.addEventListener('click', () => {
  if (state === false) {
    state = true;
    interval = setInterval(() => {
      life.computer();
    }, 100);
  } else {
    state = false;
    clearInterval(interval);
  }
});
