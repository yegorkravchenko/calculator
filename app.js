const displayOutput = document.querySelector('.display__output');
const displayPrevEq = document.querySelector('.display__history');
const displayEqualsSign = document.querySelector('.display__equals-sign');
const numpadKeys = document.querySelectorAll('.numpad__num');
const topbarBtns = document.querySelectorAll('.topbar__btn');
const sidebarBtns = document.querySelectorAll('.sidebar__btn');

const operate = {
    '÷': function (a, b) { return a / b },
    'x': function (a, b) { return a * b },
    '-': function (a, b) { return a - b },
    '+': function (a, b) { return a + b }
};

function calculate(string) {
    const [a, operator, b] = string.split(' ');
    return operate[operator](parseFloat(a), parseFloat(b));
}

function toggleDisplayInfo(state) {
    displayOutput.textContent = '0';
    if (state === 'calculated') {
        displayPrevEq.style.visibility = 'visible';
        displayEqualsSign.style.display = 'block';
    } else if (state === 'started') {
        displayPrevEq.style.visibility = 'visible';
        displayEqualsSign.style.display = 'none';
    } else {
        displayPrevEq.style.visibility = 'hidden';
        displayEqualsSign.style.display = 'none';
    }
}

function selectOperation(operator) {
    displayPrevEq.textContent = `${displayOutput.textContent} ${operator}`;
    toggleDisplayInfo('started');
}

const outputObserver = new MutationObserver(() => {
    if (displayOutput.textContent.length > 9 && displayOutput.textContent.length < 18) {
        displayOutput.style.fontSize = `${48 - (3.5 * (displayOutput.textContent.length - 9))}px`;
    } else if (displayOutput.textContent.length >= 18) {
        displayOutput.style.fontSize = `22px`;
        displayOutput.textContent = displayOutput.textContent;
    } else {
        displayOutput.style.fontSize = '48px';
    }
});

outputObserver.observe(displayOutput, { childList: true });

topbarBtns.forEach(btn => btn.addEventListener('click', () => {
    switch (btn.textContent) {
        case 'AC':
            toggleDisplayInfo();
            break;
        case 'DEL':
            if (displayOutput.textContent !== '0' && displayOutput.textContent.length > 1) {
                displayOutput.textContent = displayOutput.textContent.slice(0, displayOutput.textContent.length - 1);
            } else {
                displayOutput.textContent = '0';
            }
            break;
    }
}));

numpadKeys.forEach(key => key.addEventListener('click', () => {
    displayEqualsSign.style.display = 'none';
    if (displayOutput.textContent.length <= 18) {
        if (displayOutput.textContent[0] === '0') {
            displayOutput.textContent = key.textContent;
        } else {
            displayOutput.textContent += key.textContent;
        }
    }
}));

sidebarBtns.forEach(btn => btn.addEventListener('click', () => {
    switch (btn.textContent) {
        case '÷':
            selectOperation('÷');
            break;
        case 'x':
            selectOperation('x');
            break;
        case '-':
            selectOperation('-');
            break;
        case '+':
            selectOperation('+');
            break;
        case '=':
            displayPrevEq.textContent += ` ${displayOutput.textContent}`;
            displayOutput.textContent = calculate(displayPrevEq.textContent);
            displayEqualsSign.style.display = 'block';
            break;
    }
}));

window.addEventListener('load', () => {
    displayOutput.textContent = '0';
    toggleDisplayInfo();
});
