(function () {
function timeChanger() {
    if (!congratulation.classList.contains('is-hidden')) clearInterval(timerId);
    let array=timer.innerText.split(':'),
    minutes = Number(array[0]),
    seconds = Number(array[1]);
    if (minutes < 59) {
        if (seconds < 59) {
            seconds++;
        } else {
            minutes++;
            seconds = 0;
        }
    }
    timer.innerText = `${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`
}

let timerId=setInterval(timeChanger, 1000);
})();