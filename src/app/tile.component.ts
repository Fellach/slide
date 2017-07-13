import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Tile, DIRECTION } from './tile';

@Component({
    selector: 'app-tile',
    templateUrl: 'tile.component.html',
    animations: [
        trigger('move', [
            transition('void => ' + DIRECTION.E.toString(), [
                style({transform: 'translateY(-100%) scale(1.1)'}),
                animate('0.2s ease-out')
            ]),
            transition('void => ' + DIRECTION.W.toString(), [
                style({transform: 'translateY(100%) scale(1.1)'}),
                animate('0.2s ease-in')
            ]),
            transition('void => ' + DIRECTION.N.toString(), [
                style({transform: 'translateX(-100%) scale(1.1)'}),
                animate('0.2s ease-out')
            ]),
            transition('void => ' + DIRECTION.S.toString(), [
                style({transform: 'translateX(100%) scale(1.1)'}),
                animate('0.2s ease-in')
            ]),
        ])
    ]
})
export class TileComponent {
    @Input() tile: Map<{}, Tile>;
    @Output() onMove: EventEmitter<void> = new EventEmitter<void>();
    readonly factor: number = 5;

    move() {
        this.onMove.next();
    }
}