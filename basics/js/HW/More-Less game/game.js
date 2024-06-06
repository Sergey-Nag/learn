function numberGame() {
    function generateRandomNumber() {
        return Math.floor(Math.random() * 3) + 1;
    }
    let randomNumber = generateRandomNumber();
    let attempts = 0; // попытки
    while (true) {
        let userNumber = prompt("Угадайте число от 1 до 100:");
        if (userNumber === null || userNumber === "") {
            alert("Игра прервана");
            return;
        }
        userNumber = +userNumber;
        if (userNumber === NaN) {
            alert("Пожалуйста, введите число!");
            continue;
        }
        attempts++;
        if (userNumber === randomNumber){
            let newGame = confirm(`Поздравляем! Вы угадали число ${randomNumber} за ${attempts} попыток. Хотите сыграть ещё?`);
            if (newGame) {
                randomNumber = generateRandomNumber();
                attempts = 0;
            } else {
                alert("Спасибо за игру!");
                return;
            }
        } else if (userNumber > randomNumber) {
            alert("Много");
        } else {
            alert("Мало");
        }
    }
}

numberGame();