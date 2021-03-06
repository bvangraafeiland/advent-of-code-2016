input = open('./input/day2.txt', 'r').read()

lines = input.split("\n")

def navigate(startAt, instructionLine):
    currentPos = startAt
    for direction in instructionLine:
        currentPos = moveToNext(currentPos, direction)
    return currentPos

def moveToNext(currentDigit, direction):
    keypad = "  1   234 56789 ABC   D "
    keypadWidth = 5
    keypadHeight = 5
    currentIndex = keypad.index(currentDigit)
    if direction == "U" and currentIndex > (keypadWidth - 1):
        result = keypad[currentIndex - keypadWidth]
    elif direction == "D" and currentIndex < (keypadWidth * (keypadHeight - 1)):
        result = keypad[currentIndex + keypadWidth]
    elif direction == "R" and (currentIndex + 1) % keypadWidth > 0:
        result = keypad[currentIndex + 1]
    elif direction == "L" and currentIndex % keypadWidth > 0:
        result = keypad[currentIndex - 1]
    else:
        result = currentDigit
    return result if result != " " else currentDigit

currentPos = "5"
for line in lines:
    currentPos = navigate(currentPos, line)
    print(currentPos)
