import { Component, OnInit } from '@angular/core';
import { Map, List, Range } from 'immutable';
import { Tile, DIRECTION } from './tile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  tiles = List();
  history = List();
  isSolved: boolean = false;
  private square: number = 4;
  private labels;

  ngOnInit() { 
    this.newGame();
  }

  onStart() {
    this.newGame();
  }

  onUndo() {
    if (this.history.size > 0) {
      this.tiles = this.history.last() as List<{}>;
      this.history = this.history.pop();
    }
  }

  onMove(tile) {
    const [x, y, direction] = this.getFreeSlot(tile);

    if (x !== undefined && y !== undefined) {
      this.history = this.history.push(this.tiles);
      this.tiles = this.swapTwoTiles(tile, x, y, direction);
      this.isSolved = this.checkIsSolved();
    }
  }

  private getFreeSlot(tile) {
    const x = tile.get('x');
    const y = tile.get('y');
    
    if (x - 1 >= 0 && !this.tiles.find(tile => (tile as Map<{}, {}>).get('x') === x - 1 && (tile as Map<{}, {}>).get('y') === y)) {
      return [x - 1, y, DIRECTION.W];
    }
    
    if (x + 1 < this.square && !this.tiles.find(tile => (tile as Map<{}, {}>).get('x') === x + 1 && (tile as Map<{}, {}>).get('y') === y)) {
      return [x + 1, y, DIRECTION.E];
    }

    if (y - 1 >= 0 && !this.tiles.find(tile => (tile as Map<{}, {}>).get('x') === x && (tile as Map<{}, {}>).get('y') === y - 1)) {
      return [x, y - 1, DIRECTION.S];
    }

    if (y + 1 < this.square && !this.tiles.find(tile => (tile as Map<{}, {}>).get('x') === x && (tile as Map<{}, {}>).get('y') === y + 1)) {
      return [x, y + 1, DIRECTION.N];
    }

    return [];
  }

  private swapTwoTiles(tile, x, y, direction) {
    const index = this.tiles.indexOf(tile);
    tile = tile.set('x', x).set('y', y).set('direction', direction);
    return this.tiles.set(index, tile);
  }

  private checkIsSolved() {
     const byLabel = this.tiles.sort(this.sortByLabel.bind(this));
     const byXY =  this.tiles.sort(this.sortByXY.bind(this));

     return byLabel.equals(byXY);
  }

  private sortByLabel(a, b) {
    return a.get('label') > b.get('label') ? 1 : -1;
  }

  private sortByXY(a, b) {
    const axy = a.get('x') * this.square + a.get('y');
    const bxy = b.get('x') * this.square + b.get('y');
    
    return axy > bxy ? 1 : -1;
  }

  private newGame() {
    this.isSolved = false;
    this.labels = this.createLabels();
    this.tiles = this.createTiles();
    
    this.labels = this.shuffleLabels(this.labels);

    setTimeout(() => {
      this.tiles = this.createTiles();
    }, 1000);
  }

  private createTiles() {
    let tiles = List();
    this.tiles = this.tiles.clear();
    this.history = this.history.clear();

    for (let x = 0; x < this.square; x++) {
      for (let y = 0; y < this.square; y++) {        
        const tile = this.createTile(x, y);

        if (tile.label) {
          tiles = tiles.push(Map(tile));
        }
      }
    }

    return tiles;
  }

  private createTile(x: number, y: number): Tile {
    const label = this.labels.get(x * this.square + y);
    
    return {x, y, label};
  }

  private createLabels() {
    return Range(1, Math.pow(this.square, 2));
  }

  private shuffleLabels(labels) {
    const array = labels.toArray();
    let counter = array.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter--);
        const temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return List(array);
  }
}
