(function () {
    let characters = [{
            id: 1,
            x: 0
        },
        {
            id: 2,
            x: -125
        },
        {
            id: 3,
            x: -250
        },
        {
            id: 4,
            x: -375
        },
        {
            id: 5,
            x: -500
        },
        {
            id: 6,
            x: -625
        },
        {
            id: 7,
            x: -750
        },
        {
            id: 8,
            x: -875
        },
        {
            id: 9,
            x: -1000
        },
        {
            id: 10,
            x: -1125
        },
        {
            id: 11,
            x: -1250
        },
        {
            id: 12,
            x: -1375
        },
        {
            id: 13,
            x: -1500
        },
        {
            id: 14,
            x: -1625
        },
        {
            id: 15,
            x: -1750
        },
        {
            id: 16,
            x: -1875
        },
        {
            id: 17,
            x: -2000
        },
        {
            id: 18,
            x: -2125
        },
        {
            id: 19,
            x:-2250
        },
        {
            id:20,
            x:-2375
        },
        {
            id:21,
            x:-2500
        },
        {
            id:22,
            x:-2625
        },
        {
            id:23,
            x:-2750
        },
        {
            id:24,
            x:-2875
        },
        {
            id:25,
            x:-3000
        }
    ]

    function generateRandomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function includeScript(url) {
        let script = document.createElement('script');
        script.src = url;
        document.querySelector('head').appendChild(script);
    }

    function flip(element) {
        element.classList.toggle('flipped');
    }

    function endOfTheGame(){
        memory_board.innerHTML='';
        congratulation.classList.remove('is-hidden');
    }
    function checkTheBoardIsEmpty(){
        let wrappers=document.querySelectorAll('.wrapper_item').length,
            disappearedItems=document.querySelectorAll('.is-disappear').length;
        if(disappearedItems==wrappers&&disappearedItems>0) setTimeout(endOfTheGame, 200);
    }
    function deleteClassName(elements, element) {
        elements[0].classList.remove('flipped');
        elements[1].classList.remove('flipped');
    }
    function hideCards(elements){
        elements[0].style.visibility = 'hidden';
        elements[1].style.visibility = 'hidden';
        checkTheBoardIsEmpty();
    }
    function match() {
        let elements;
        let e = event || window.event,
        element = e.target.parentNode;
        if (!element.style.visibility) {
            if (element.className == 'wrapper_item' && e.target.classList.contains('back')&&document.querySelectorAll('.flipped').length<2) flip(element);
            elements = document.querySelectorAll('.flipped');
            if (elements.length == 2) {
                if (elements[0].lastElementChild.className == elements[1].lastElementChild.className) {
                    elements[0].lastElementChild.classList.add('is-disappear');
                    elements[1].lastElementChild.classList.add('is-disappear');
                    setTimeout(deleteClassName, 1000, elements, element);
                    setTimeout(hideCards, 1000, elements);
                } else {
                    
                    setTimeout(deleteClassName, 1000, elements, element);
                }
            }
        }
    }

    function addCard(item,back) {
        let  frontDiv = document.createElement('div'),
        backDiv = document.createElement('div'),
        wrapperDiv=document.createElement('div');
        backDiv.className = back;
        frontDiv.style.backgroundPositionX = `${item.x}px`;
        frontDiv.className = `front front--${item.id}`;
        wrapperDiv.className = 'wrapper_item';
        memory_board.appendChild(wrapperDiv);
        wrapperDiv.appendChild(backDiv);
        wrapperDiv.appendChild(frontDiv);
    }

    function initGame(value) { ///value - количество ячеек
        let array = [],
            timer = document.createElement('div'),
           temp, randomValue, i, startPage, back,parent,randomaizedArray;
        switch(value){
            case 12:
                window.memory_board.style.width='600px';
                break;
            case 20:    
                window.memory_board.style.width='750px';
                break;
        }
        if (document.querySelector('.js-difficulty-panel--light-side').classList.contains('is-hidden')) back='back back--dark-side';
        else back='back back--light-side';
        choose_the_side.classList.add('is-hidden');
        timer.id = 'timer';
        timer.innerText='00:00'
        document.querySelector('aside').appendChild(timer);
        memory_board.onclick=match;
        temp = [...characters];
        for (i = 0; i != value / 2; i++) {
            randomValue = generateRandomNumberInRange(0, temp.length - 1);
            array.push(temp[randomValue]);
            temp.splice(randomValue, 1);
        }
        array = array.concat(array);
        randomaizedArray=[];
        for(i=0; i<value;i++){
            randomaizedArray.push(array.splice(generateRandomNumberInRange(0,array.length),1)[0])
        }
        for (i = 0; i < randomaizedArray.length; i++) {
            addCard(randomaizedArray[i],back);
        }
        includeScript('sources/js/timer.js');
    }

    function createBoard() {
        let element, parent;
        element = event.target;
        parent = element.parentNode;
        if (element.tagName == 'BUTTON') {
            if (parent.firstElementChild == element) initGame(12);
            else if (parent.lastElementChild == element) initGame(30);
            else initGame(20);
        }
    }

    

    function makeTheChoise() {
        let element, parent;
        element = document.querySelector('.welcome-page');
        parent = element.parentNode;
        parent.removeChild(element);
        choose_the_side.classList.remove('is-hidden');
        document.querySelectorAll('.difficulty-panel')[0].onclick = createBoard;
        document.querySelectorAll('.difficulty-panel')[1].onclick = createBoard;
    }
    

    function changeTheSide(){
        let backPreview=document.querySelector('.back-preview');
            if (yoda_lightsaber.checked){
                document.querySelector('h1').style.color='rgb(70, 102, 201)';
                document.querySelector('.js-difficulty-panel--light-side').classList.remove('is-hidden');
                document.querySelector('.js-difficulty-panel--dark-side').classList.add('is-hidden');
                backPreview.classList.remove('back--dark-side');
                backPreview.classList.add('back--light-side');
            }
            else{
                document.querySelector('h1').style.color='rgb(161, 1, 1)';
                document.querySelector('.js-difficulty-panel--dark-side').classList.remove('is-hidden');
                document.querySelector('.js-difficulty-panel--light-side').classList.add('is-hidden');
                backPreview.classList.remove('back--light-side');
                backPreview.classList.add('back--dark-side');
            }

    }
    document.querySelector('.next-page__button').onclick = makeTheChoise;
    yoda_lightsaber.onchange = changeTheSide;
    darth_vader_lightsaber.onchange = changeTheSide;
})();