<?php

$roomLines = explode("\n", getInput());
$roomData = array_map(function ($line) {
    return getRoomInfo($line);
}, $roomLines);
$realRooms = array_filter($roomData, function ($room) {
    return roomIsReal(str_replace("-", "", $room['roomName']), $room['checksum']);
});
$decryptedRoomNames = array_map('decryptRoomName', $realRooms);

foreach ($decryptedRoomNames as $room) {
    if ($room['roomName'] == 'northpole object storage')
        echo($room['roomName'] . ' - ' . $room['sectorId'] . PHP_EOL);
}

function sortedCharacterOccurrences($string) {
    $result = [];
    foreach (str_split($string) as $character) {
        if (array_key_exists($character, $result))
            $result[$character]++;
        else
            $result[$character] = 1;
     }
     uksort($result, function ($one, $two) use ($result) {
        $difference = $result[$two] - $result[$one];
        return $difference ?: strcmp($one, $two);
     });
     return $result;
}

function mostOccurringLetters($roomName, $amount)
{
    $sortedString = implode('', array_keys(sortedCharacterOccurrences($roomName)));
    return substr($sortedString, 0, $amount);
}

function roomIsReal($roomName, $checksum) {
    return mostOccurringLetters($roomName, 5) == $checksum;
}

function getRoomInfo($roomString) {
    preg_match("%([a-z-]+)-(\d+)\[([a-z]+)\]%", $roomString, $roomData);
    $roomName = $roomData[1];
    $sectorId = $roomData[2];
    $checksum = $roomData[3];

    return compact('roomName', 'sectorId', 'checksum');
}

function decryptRoomName($room) {
    $alphabet = "abcdefghijklmnopqrstuvwxyz";

    $sectorId = (int) $room['sectorId'];
    $result = "";
    foreach (str_split($room['roomName']) as $character) {
        $rotatedPos = (strpos($alphabet, $character) + $sectorId) % 26;
        $result .= $character == '-' ? ' ' : $alphabet[$rotatedPos];
    }
    $room['roomName'] = $result;

    return $room;
}

function getInput() {
    return file_get_contents('./input/day4.txt');
}