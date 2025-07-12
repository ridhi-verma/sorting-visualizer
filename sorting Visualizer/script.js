let array = [];
let originalArray = [];
const arrayContainer = document.getElementById('array');
const timeDisplay = document.getElementById('timeTaken');
const timeComplexityDisplay = document.getElementById('timeComplexity');
const spaceComplexityDisplay = document.getElementById('spaceComplexity');
const algoSelect = document.getElementById('algoSelect');
const speedControl = document.getElementById('speedControl');
const speedValueDisplay = document.getElementById('speedValue');

let delayTime = 50; // Default delay for sorting (in ms)

function generateArray() {
    array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    originalArray = [...array];
    drawArray();
    timeDisplay.innerText = '';
    timeComplexityDisplay.innerText = 'Time Complexity: O(n^2)';
    spaceComplexityDisplay.innerText = 'Space Complexity: O(1)';
}

function drawArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 2}px`;
        bar.style.width = '30px'; // Fixed width for bars
        bar.innerText = value; // Display the value on top of each bar
        arrayContainer.appendChild(bar);
    });
}

function selectAlgorithm() {
    const selectedAlgo = algoSelect.value;
    if (selectedAlgo === 'bubble' || selectedAlgo === 'selection') {
        timeComplexityDisplay.innerText = 'Time Complexity: O(n^2)';
        spaceComplexityDisplay.innerText = 'Space Complexity: O(1)';
    } else if (selectedAlgo === 'insertion') {
        timeComplexityDisplay.innerText = 'Time Complexity: O(n^2)';
        spaceComplexityDisplay.innerText = 'Space Complexity: O(1)';
    } else if (selectedAlgo === 'quick') {
        timeComplexityDisplay.innerText = 'Time Complexity: O(n log n)';
        spaceComplexityDisplay.innerText = 'Space Complexity: O(log n)';
    }
}

async function startSort() {
    const selectedAlgo = algoSelect.value;
    const startTime = performance.now();
    if (selectedAlgo === 'bubble') await bubbleSort();
    else if (selectedAlgo === 'selection') await selectionSort();
    else if (selectedAlgo === 'insertion') await insertionSort();
    else if (selectedAlgo === 'quick') await quickSort(0, array.length - 1);
    const endTime = performance.now();
    timeDisplay.innerText = `Execution Time: ${(endTime - startTime).toFixed(2)} ms`;
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            highlight(j, j + 1);
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                await pause(delayTime);
            }
            unhighlight(j, j + 1);
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            highlight(j, minIndex);
            if (array[j] < array[minIndex]) minIndex = j;
            unhighlight(j, minIndex);
        }
        if (minIndex !== i) {
            swap(i, minIndex);
            await pause(delayTime);
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            highlight(j, j + 1);
            array[j + 1] = array[j];
            drawArray();
            unhighlight(j, j + 1);
            await pause(delayTime);
            j--;
        }
        array[j + 1] = key;
        drawArray();
    }
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        highlight(j, high);
        if (array[j] < pivot) {
            i++;
            swap(i, j);
            await pause(delayTime);
        }
        unhighlight(j, high);
    }
    swap(i + 1, high);
    return i + 1;
}

function swap(i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    drawArray();
}

function highlight(i, j) {
    arrayContainer.children[i].style.backgroundColor = '#ff6347';
    arrayContainer.children[j].style.backgroundColor = '#ff6347';
}

function unhighlight(i, j) {
    arrayContainer.children[i].style.backgroundColor = '#32cd32';
    arrayContainer.children[j].style.backgroundColor = '#32cd32';
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function refreshArray() {
    array = [...originalArray];
    drawArray();
}

// Update the speed when the slider changes
speedControl.addEventListener('input', function() {
    delayTime = (101 - speedControl.value); // Adjust the delay time according to slider value
    speedValueDisplay.textContent = `${delayTime}ms`; // Display the speed value
});

generateArray();
