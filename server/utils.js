const e = require('express');

function getRoomByCode(io, roomCode) {
	if (io.sockets && io.sockets.adapter && io.sockets.adapter.rooms) {
		return io.sockets.adapter.rooms[roomCode];
	}
	return null;
}

function getNewRoom(existingRoomCodes) {
	let newRoomCode;
	do {
		newRoomCode = Math.random().toString(36).substr(2, 4);
	} while (getRoomByCode(existingRoomCodes, newRoomCode));

	existingRoomCodes.push(newRoomCode);

	return newRoomCode;
}

function getScore(transcript, answer) {
	if (!transcript.length) {
		return 0;
	}

	let transcriptFreq = getFrequency(
		transcript.toLowerCase().replace(/\s+/g, ''),
	);
	let answerFreq = getFrequency(answer.toLowerCase().replace(/\s+/g, ''));

	let diff = 0;

	let tempFreq;
	for (let [key, value] of transcriptFreq) {
		tempFreq = answerFreq.get(key);
		if (tempFreq) {
			diff += Math.abs(tempFreq - value);
		} else {
			diff += value;
		}
	}

	for (let [key, value] of answerFreq) {
		if (!transcriptFreq.has(key)) {
			diff += value;
		}
	}

	if (diff < 8) return 3;

	if (diff < 13) return 1;

	return 0;
}

function getFrequency(inputString) {
	let letterFreq = new Map();
	let tempFreq;

	for (const letter of inputString) {
		tempFreq = letterFreq.get(letter);
		if (tempFreq) {
			letterFreq.set(letter, tempFreq + 1);
		} else {
			letterFreq.set(letter, 1);
		}
	}

	return letterFreq;
}

module.exports.getScore = getScore;
module.exports.getRoomByCode = getRoomByCode;
module.exports.getNewRoom = getNewRoom;
