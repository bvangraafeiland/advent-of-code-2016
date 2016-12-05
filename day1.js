'use strict';

const fs = require('fs');

let input = fs.readFileSync('./input/day1.txt', 'utf-8');
let movements = input.split(', ');

let x = 0, y = 0;
let currentDirectionAngle = 0;
let visitedLocations = [];

for (var i = 0; i < movements.length; i++) {
    if (turnAndMove(movements[i])) {
        break;
    }
}

function turnAndMove(movement) {
    let direction = movement[0];
    let steps = parseInt(movement.substring(1));

    let difference = 0;
    if (direction == 'L') {
        difference -= 90;
    }
    else if (direction == 'R') {
        difference += 90;
    }
    currentDirectionAngle = (currentDirectionAngle + difference + 360) % 360;

    for (var i = 0; i < steps; i++) {
        x += getDelta(Math.sin);
        y += getDelta(Math.cos);
        if (visitedLocations.some(coords => coords.x == x && coords.y == y)) {
            console.log(totalDistance());
            return true;
        }
        else {
            visitedLocations.push({x, y});
        }
    }

    return false;
}

function totalDistance() {
    return Math.abs(x) + Math.abs(y);
}

function getDelta(func) {
    return Math.round(func(currentDirectionAngle * (Math.PI / 180)));
}

