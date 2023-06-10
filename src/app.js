const joke = document.getElementById('joke');
const refresh_button = document.getElementById('refresh_btn');
const share_button = document.getElementById('share_btn');
const api_link = document.getElementById('api_link');

const popup_btn = document.getElementById('popup-btn');
const popup = document.getElementById('popup');
const close_btn = document.getElementById('close-btn');

const dropdown = document.querySelector('.dropdown');
const select = document.querySelector('.select');
const caret = document.querySelector('.caret');
const menu = document.querySelector('.menu');
const options = document.querySelectorAll('.menu li');
const selected = document.querySelector('.selected');

let category = 'Dad Jokes';
let api = 'https://icanhazdadjoke.com/api';


// Add Event Listener to the buttons and links
refresh_button.addEventListener('click', getJoke );
share_button.addEventListener('click', () => {
    share();
})

api_link.onclick = api_link.addEventListener('click', () => {
    window.open(api, '_blank');
})

popup_btn.addEventListener('click', () => {
    popup.classList.toggle('active');
})

close_btn.addEventListener('click', () => {
    popup.classList.remove('active');
})


select.addEventListener('click', () => {
    select.classList.toggle('clicked');
    menu.classList.toggle('opened');
})


options.forEach(option => {
    option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        let temp = selected.innerText;
        category = temp.replace('/ ', '');
        getJoke();
        select.classList.remove('clicked');
        menu.classList.remove('opened');
    })

    options.forEach(option => {
        option.classList.remove('active');
    })
})



window.addEventListener('click', ({target}) => {
    if(target == popup) {
        popup.classList.remove('active');
    }

    if(target != selected && menu.classList.contains('opened')) {
        menu.classList.remove('opened');
    }
})


getJoke();


async function getJoke() {
    switch(category) {
        case 'Dad Jokes': {
            getDadJoke();
            api = 'https://icanhazdadjoke.com/api';
            break;
        }
        case 'Chuck Norris': {
            getChuckNorrisJoke();
            api = 'https://api.chucknorris.io';
            break;
        }
        default: {
            getJokeByCategory(category);
            api = 'https://v2.jokeapi.dev';
            break;
        }
    }

    // location.href = api; 
}

async function getDadJoke() {
    // Call the API
    const res = await fetch('https://icanhazdadjoke.com/', 
    {
        headers: {
            accept: 'application/json'
        }
    });

    const joke = await res.json();

    //Set a random joke
    document.getElementById('joke').innerHTML = joke.joke; 
}


async function getChuckNorrisJoke() {
    // Call the API
    const res = await fetch('https://api.chucknorris.io/jokes/random/', 
    {
        headers: {
            accept: 'application/json'
        }
    });

    const joke = await res.json();

    //Set a random joke
    document.getElementById('joke').innerHTML = joke.value;
}


async function getJokeByCategory(category) {
    const url = 'https://v2.jokeapi.dev/joke/';

    // Call the API
    const res = await fetch(url + category, 
    {
        headers: {
            accept: 'application/json'
        }
    });

    const joke = await res.json();

    if(joke.type == 'twopart') {
        document.getElementById('joke').innerHTML = joke.setup +  '<br>' +  '<br>' + ' ' + joke.delivery;
    }
    else {
        document.getElementById('joke').innerHTML = joke.joke;
    }
}

async function share() {

    const url = encodeURI(window.location.href);
    let text = encodeURIComponent('Best joke of the day! Just listen to this: ');

    window.open(
        `https://t.me/share/url?url=${url}&text=${text + '\n' + ' "' + document.querySelector('.joke-text').textContent + '"' }`, 
        '_blank'
    );
}





