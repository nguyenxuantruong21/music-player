var now_playing = document.querySelector('.now-playing');
var track_art = document.querySelector('.track-art img');
var track_name = document.querySelector('.track-name');
var track_artist = document.querySelector('.track-artist');
var time = document.querySelector('.time')
var play_pause_btn = document.querySelector('.play-pause-track');
var next_btn = document.querySelector('.next-track');
var prev_btn = document.querySelector('.prev-track');
var ran_btn = document.querySelector('.random-track')
var repeat = document.querySelector('.repeat-track')
var soundOff = document.querySelector('.volume i')
var seek_slider = document.querySelector('.seek_slider');
var volume_slider = document.querySelector('.volume_slider');
var curr_time = document.querySelector('.current-time');
var total_duration = document.querySelector('.total-duration');
var curr_track = document.createElement('audio');


var track_index = 0;
var isPlaying = false;
var isRandom = false;
var updateTimer;

const music_list = [
    {
        img: 'images/faded.png',
        name: 'Faded',
        artist: 'Alan Walker',
        music: 'music/Faded.mp3'
    },
    {
        img: 'images/stay.png',
        name: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        music: 'music/stay.mp3'
    },
    {
        img: 'images/fallingdown.jpg',
        name: 'Falling Down',
        artist: 'Wid Cards',
        music: 'music/fallingdown.mp3'
    },
    {
        img: 'images/ratherbe.jpg',
        name: 'Rather Be',
        artist: 'Clean Bandit',
        music: 'music/Rather Be.mp3'
    },
    {
        img: 'images/faded.png',
        name: 'Faded',
        artist: 'Alan Walker',
        music: 'music/Faded.mp3'
    },
    {
        img: 'images/stay.png',
        name: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        music: 'music/stay.mp3'
    },
    {
        img: 'images/fallingdown.jpg',
        name: 'Falling Down',
        artist: 'Wid Cards',
        music: 'music/fallingdown.mp3'
    },
    {
        img: 'images/ratherbe.jpg',
        name: 'Rather Be',
        artist: 'Clean Bandit',
        music: 'music/Rather Be.mp3'
    }
];

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// set time update cho currentTime and durationsTime
function setUpdate() {
    var seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        var currentMinutes = Math.floor(curr_track.currentTime / 60);
        var currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        var durationMinutes = Math.floor(curr_track.duration / 60);
        var durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// loadTrack show
function loadTrack(track_index) {
    reset()
    curr_track.load()
    curr_track.src = music_list[track_index].music
    track_art.style.backgroundImage = 'url(' + music_list[track_index].img + ')'
    track_name.textContent = music_list[track_index].name
    track_artist.textContent = music_list[track_index].artist
    now_playing.textContent = 'Music ' + (track_index + 1) + ' of ' + music_list.length
    updateTimer = setInterval(setUpdate, 1000);
}

loadTrack(track_index)

function playTrack() {
    curr_track.play();
    isPlaying = true;
    play_pause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    track_art.classList.add('playing')
}

function pauseTrack() {
    setTimeout(() => {
        curr_track.pause();
        isPlaying = false
    }, 600);
    play_pause_btn.innerHTML = `<i class="fa fa-play-circle fa-5x"></i>`
    if (track_art.classList.contains('playing')) {
        track_art.classList.add('speedup')
        setTimeout(() => {
            track_art.classList.remove('playing', 'speedup')
        }, 500);
    }
}

volume_slider.addEventListener('change', function () {
    curr_track.volume = volume_slider.value / 100
})

seek_slider.addEventListener('change', function () {
    var seek_to = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seek_to;
})

// play and pause 
play_pause_btn.addEventListener('click', function () {
    isPlaying ? pauseTrack() : playTrack()
})

// next
next_btn.addEventListener('click', function () {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        var random_index = Math.floor(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
})

// prev
prev_btn.addEventListener('click', function () {
    if (track_index > 0) {
        track_index -= 1
    } else {
        track_index = music_list.length - 1
    }
    loadTrack(track_index)
    playTrack()
})

// ended
curr_track.addEventListener('ended', function () {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        var random_index = Math.floor(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
})

// repeat track
repeat.addEventListener('click', function () {
    loadTrack(track_index)
    playTrack()
})

// random music
ran_btn.addEventListener('click', function () {
    if (!isRandom) {
        ran_btn.classList.add('active')
        isRandom = true
    } else {
        ran_btn.classList.remove('active')
        isRandom = false;
    }
})

// sound off
soundOff.addEventListener('click', function () {
    curr_track.volume = 0
    volume_slider.value = 0
})

