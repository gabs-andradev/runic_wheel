function saveAsPng() {
    const pngelement = document.getElementById('circle');
    html2canvas(pngelement).then(function (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = 'rodarunica.png';
        link.click();
    });
}

function calculatePosition(index, total) {
    const angle = (index / total) * 360;
    const radius = 180;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    const rotationAngle = angle - 90;
    return { x, y, rotationAngle };
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function redefineDragAndDropEvents() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        letter.draggable = true;
        letter.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.textContent);
        });
        letter.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        letter.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggedLetter = event.dataTransfer.getData('text/plain');
            const currentIndex = alphabet.indexOf(event.target.textContent);
            const draggedIndex = alphabet.indexOf(draggedLetter);
            const temp = alphabet[currentIndex];

            alphabet[currentIndex] = alphabet[draggedIndex];
            alphabet[draggedIndex] = temp;

            circle.innerHTML = '';
            alphabet.forEach((letter, index) => {
                const { x, y, rotationAngle } = calculatePosition(index, alphabet.length);
                const newDiv = document.createElement('div');
                newDiv.textContent = letter;
                newDiv.className = 'letter';
                newDiv.style.left = `calc(50% + ${x}px)`;
                newDiv.style.top = `calc(50% + ${y}px)`;
                newDiv.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
                circle.appendChild(newDiv);
            });

            redefineDragAndDropEvents();
        });
    });
}

const alphabet = 'ABCDEFGHIJLMNOPQRSTUVXYZ'.split('');
let shuffledAlphabet = shuffle(alphabet);
const circle = document.getElementById('circle');

function generateRunicWeel() {
    var elements = document.querySelectorAll('.letter');
    elements.forEach(function (element) {
        element.remove();
    });

    shuffledAlphabet = shuffle(alphabet);
    shuffledAlphabet.forEach((letter, index) => {
        const { x, y, rotationAngle } = calculatePosition(index, alphabet.length);
        const div = document.createElement('div');
        div.textContent = letter;
        div.className = 'letter';
        div.style.left = `calc(50% + ${x}px)`;
        div.style.top = `calc(50% + ${y}px)`;
        div.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
        circle.appendChild(div);
    });

    redefineDragAndDropEvents();
}

redefineDragAndDropEvents();