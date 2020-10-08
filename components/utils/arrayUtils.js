export function FisherYatesShuffle(array) {
	let randomIndex;
	let tempElement;
	for (let index = array.length - 1; index > 0; index--) {
		randomIndex = Math.floor(Math.random() * (index + 1));
		tempElement = array[randomIndex];
		array[randomIndex] = array[index];
		array[index] = tempElement;
	}

	return array;
}
