'use strict';

let input = 'L2 L5 L5 R5 L2 L4 R1 R1 L4 R2 R1 L1 L4 R1 L4 L4 R5 R3 R1 L1 R1 L5 L1 R5 L4 R2 L5 L3 L3 R3 L3 R4 R4 L2 L5 R1 R2 L2 L1 R3 R4 L193 R3 L5 R45 L1 R4 R79 L5 L5 R5 R1 L4 R3 R3 L4 R185 L5 L3 L1 R5 L2 R1 R3 R2 L3 L4 L2 R2 L3 L2 L2 L3 L5 R3 R4 L5 R1 R2 L2 R4 R3 L4 L3 L1 R3 R2 R1 R1 L3 R4 L5 R2 R1 R3 L3 L2 L2 R2 R1 R2 R3 L3 L3 R4 L4 R4 R4 R4 L3 L1 L2 R5 R2 R2 R2 L4 L3 L4 R4 L5 L4 R2 L4 L4 R4 R1 R5 L2 L4 L5 L3 L2 L4 L4 R3 L3 L4 R1 L2 R3 L2 R1 R2 R5 L4 L2 L1 L3 R2 R3 L2 L1 L5 L2 L1 R4';

let movements = input.split(' ');

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

