let songsArray = [
    {name:'Master Of Puppets', artist:'Metallica', genre:'Rock', url:"Songs/Master Of Puppets.mp3", img:"Song thumbnails/master of puppets.jpg"},
    {name:'Talking To Myself', artist:'Linkin Park', genre:'Rock', url:"Songs/Talking To Myself.mp3", img:"Song thumbnails/talking to myself.jpg"},
    {name:'Another Brick In The Wall', artist:'Pink Floyd', genre:'Rock', url:"Songs/Another Brick In The Wall.mp3", img:"Song thumbnails/another brick in the wall.jpg"},
    {name:'The Night We Met', artist:'Lord Huron', genre:'Rock', url:"Songs/The Night We Met.mp3", img:"Song thumbnails/the night we met.jpg"},
    {name: "Don't Let Me Down", artist: 'The Beatles', genre:'Rock', url:"Songs/Don't Let Me Down.mp3", img:"Song thumbnails/dont let me down.jpg"},

    {name:'Blinding Lights', artist:'The Weeknd', genre:'Pop', url:"Songs/Blinding Lights.mp3", img:"Song thumbnails/blinding lights.jpg"},
    {name:'Love Me Like You Do', artist:'Ellie Goulding', genre:'Pop', url:"Songs/Love Me Like You Do.mp3", img:"Song thumbnails/love me like you do.jpg"},
    {name:'Cruel Summer', artist:'Taylor Swift', genre:'Pop', url:"Songs/Cruel Summer.mp3", img:"Song thumbnails/cruel summer.jpg"},

    {name:'Tera Yaar Hun Mein', artist:'Arijit Singh', genre:'Bollywood', url:"Songs/Tera Yaar Hoon Mein.mp3", img:"Song thumbnails/tera yaar hun mein.jpg"},
    {name:'Tujhe Kitna Chahein Aur Ham', artist:'Jubin Nautiyal', genre:'Bollywood', url:"Songs/Tujhe Kitna Chahein Aur Ham.mp3", img:"Song thumbnails/tujhe kitna chahe aur ham.jpg"},
    {name:'Milne Hai Mujhse Ayi', artist:'Arijit Singh', genre:'Bollywood', url:"Songs/Milne Hai Mujhse Aayi.mp3", img:"Song thumbnails/milne hai mujhse aayi.jpg"},
    
    {name:'Kisi Ki Muskurahaton Pe', artist:'Mukesh', genre:'Retro', url:"Songs/Kisi ki Muskurahaton Pe.mp3", img:"Song thumbnails/kisiki muskurahaton pe ho nisaar.jpg"},
    {name:'Zindagi Ke Safar Mein', artist:'Kishore Kumar', genre:'Retro', url:"Songs/Zindagi Ke Safar Mein.mp3", img:"Song thumbnails/zindagi ke safar me.jpg"},
    {name:'Lag Jaa Gale', artist:'Lata Mangeshkar', genre:'Retro', url:"Songs/Lag Jaa Gale.mp3", img:"Song thumbnails/lag ja gale.jpg"}];

let playlists = [];
let currentSongPlayingElement;
let beadLeft = true;
let songSelected = false;;


function shuffleArray(array) {                                                                     // SHUFFLE ARRAY
    let shuffledSongsArray = [...array];
    for(let i=shuffledSongsArray.length-1; i>0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [shuffledSongsArray[i], shuffledSongsArray[j]] = [shuffledSongsArray[j], shuffledSongsArray[i]];
    }
    return shuffledSongsArray;
}

function songClicked(songName) {                                     // PLAYS SONG CLICKED and UPDATES MIDDLE DIV
    let songObj = songsArray.find( currentSongObj => currentSongObj.name == songName );
    let artist = songObj.artist;
    let url = songObj.url;
    let audElement = document.querySelector("audio");
    let audElSource = document.querySelector("source");
    audElSource.setAttribute("src", url);
    audElement.load();                                                      // IMPORTANT
    audElement.play();

    let songNameInMiddleDiv = document.querySelector("#song-name-being-played");
    songNameInMiddleDiv.textContent = songObj.name;
    let artistNameInMiddleDiv = document.querySelector("#artist-of-song-being-played");
    artistNameInMiddleDiv.textContent = songObj.artist;
    let songImage = document.querySelector("#card-middle img");
    songImage.setAttribute("src", songObj.img);

    currentSongPlayingElement.classList.add("playing");
}

function addSongsToLeftDiv (arr) {                                                         // ADD SONGS TO LEFT PLAYLIST
    let leftDivSongs = document.querySelector("#left-div-songs");
    leftDivSongs.innerHTML = '';
    arr.forEach( function(songObj) {
        let parentDiv = document.createElement("div");
        let nameDiv = document.createElement("div"); 
        let artistDiv = document.createElement("div");

        parentDiv.className = 'song-in-list-div';

        nameDiv.className = 'song-name-in-list';
        nameDiv.textContent = songObj.name;

        artistDiv.className = 'artist-name-in-left-div';
        artistDiv.textContent = songObj.artist;
        parentDiv.appendChild(nameDiv);
        parentDiv.appendChild(artistDiv);
        leftDivSongs.appendChild(parentDiv);

        parentDiv.addEventListener("click", function () {
            if(songSelected == false) {songSelected = true;
            }
            let songName = parentDiv.querySelector(".song-name-in-list").textContent;
            if(currentSongPlayingElement === undefined) {
                currentSongPlayingElement = parentDiv;
            }
            if(currentSongPlayingElement.classList.contains("playing")){
                currentSongPlayingElement.classList.remove("playing");
            };
            currentSongPlayingElement = parentDiv;
            currentSongPlayingElement.classList.add("playing");
            songClicked(songName);
        });
    });
    /*leftDivSongs.addEventListener("click", (event) => {
        let songName = event.target.textContent;
        console.log(songName);
        songClicked(songName);
    });*/
}

function updateLeftListOnGenreChange (genre) {                                               // UPDATE LEFT LIST ON GENRE CHANGE
    let songsOfTheGenre = [];
    if (genre === 'All') {
        let shuffledSongs = shuffleArray(songsArray);
        addSongsToLeftDiv(shuffledSongs);
    } else {
        for(let i=0; i<songsArray.length; i++) {
            let currentSongObject = songsArray[i];
            let currentSongGenre = songsArray[i].genre;
            if (currentSongGenre === genre) {
                songsOfTheGenre.push(currentSongObject);
            }
        }
        let shuffledSongs = shuffleArray(songsOfTheGenre);
        addSongsToLeftDiv(shuffledSongs);
    }
}

function addElementsToLeftDropDown () {                                                         // adding elements to filter-dropdown menu
    let dropdown = document.getElementById("filter-dropdown");
    let arrayOfGenres = ['All'];
    songsArray.forEach(function (songObject) {
        let genre = songObject.genre ;
        if (!arrayOfGenres.includes(genre)) {
            arrayOfGenres.push(genre);
        }
    });
    for(let i=0; i<arrayOfGenres.length; i++) { 
        let newGenreInFilter = document.createElement("option");
        newGenreInFilter.className = 'genres-in-filter-dropdown';
        newGenreInFilter.textContent = arrayOfGenres[i];
        dropdown.appendChild(newGenreInFilter);
    }
    dropdown.addEventListener("change", function(event) {
        updateLeftListOnGenreChange(event.target.value);
    });
}

function createFavouritePlaylist() {      // ADDS THE FIRST SONG OF EACH GENRE IN AN ARRAY
    let favouritePlaylistArray = [];
    for(let i=0; i<songsArray.length; i++) {
        let containsGenre = false;
        for(let j=0; j<favouritePlaylistArray.length; j++) {
            if(songsArray[i].genre === favouritePlaylistArray[j].genre) {
                containsGenre = true;
                break;
            }
        }
        if(containsGenre === false) {
            favouritePlaylistArray.push(songsArray[i]);
        }
    }
    let favouritePlaylistObject = { name:"Favourites", songs:favouritePlaylistArray};
    addPlaylistToPlaylistsArray(favouritePlaylistObject);

    updateRightDropDownOptions();

    alert("A 'Favourites' playlist containing the first song of each genre has been created by default!");
}

function addPlaylistToPlaylistsArray(arrayOfSongObjects){
    playlists.push(arrayOfSongObjects);
}

function addSongsToRightDiv (array) {       // ADDS SONGS TO RIGHT DIV ACCORDING TO THE PLAYLIST
    let rightDivSongs = document.querySelector("#songs-in-current-playlist-div");
    rightDivSongs.innerHTML = '';

    let currentPlaylistName = document.querySelector("#playlist-name").value;
    let currentPlaylist = playlists.find(playlist => playlist.name === currentPlaylistName);

    array.forEach( function(songObj) {
        if(songSelected == false){songSelected = true;}

        let parentDiv = document.createElement("div");
        let nameDiv = document.createElement("div"); 
        let artistDiv = document.createElement("div");

        parentDiv.className = 'song-in-list-div';

        nameDiv.className = 'song-name-in-list';
        nameDiv.textContent = songObj.name;

        artistDiv.className = 'artist-name-in-right-div';
        artistDiv.textContent = songObj.artist;
        parentDiv.appendChild(nameDiv);
        parentDiv.appendChild(artistDiv);
        rightDivSongs.appendChild(parentDiv);

        // adding remove song option
        let removeDiv = document.createElement("div");
        let icon = document.createElement("i");
        icon.className = 'fa-solid fa-xmark';
        removeDiv.className = 'remove';
        removeDiv.appendChild(icon);
        artistDiv.appendChild(removeDiv);

        parentDiv.addEventListener("click", function (event) {                            // event listener play the clicked song
            console.log(event.target);
            if(event.target == icon){
                parentDiv.remove();
                let songObjInPlaylist = currentPlaylist.songs.find(songObjOfPlaylist => songObj === songObjOfPlaylist);
                let indexOfSong = currentPlaylist.songs.indexOf(songObjInPlaylist);
                for(let h=0; h<currentPlaylist.songs.length; h++) {
                    if(h === indexOfSong){
                        currentPlaylist.songs.splice(h, 1);
                    }
                }
            } else {
                if(songSelected == false) {songSelected = true;
                }
                let songName = parentDiv.querySelector(".song-name-in-list").textContent;
                if(currentSongPlayingElement === undefined) {
                    currentSongPlayingElement = parentDiv;
                }
                if(currentSongPlayingElement.classList.contains("playing")){
                    currentSongPlayingElement.classList.remove("playing");
                };
                currentSongPlayingElement = parentDiv;
                currentSongPlayingElement.classList.add("playing");
                songClicked(songName);
            }
        });
    });
}

function addSongToCurrentPlaylist(songObj) {  // adds song to current playlist when the button is pressed
    let currentPlaylistName = document.querySelector("#playlist-name").value;
    let playlistInArray = playlists.find((playlistObj) => currentPlaylistName === playlistObj.name);
    let flag = playlistInArray.songs.includes(songObj);
    if(flag === true){
        alert('Song is present in the playlist.');
    } else {
        playlistInArray.songs.push(songObj);
        addSongsToRightDiv(playlistInArray.songs);
    }
}

function createNewPlaylist (name) {             // creates a new empty playlist
    let selectElement = document.querySelector("#playlist-name");
    let newOption = document.createElement("option");
    newOption.textContent = name;
    newOption.value = name;
    selectElement.appendChild(newOption);
    selectElement.value = name;

    let input = document.querySelector("#new-playlist-name-input");
    input.value = '';

    let songsDiv = document.querySelector("#songs-in-current-playlist-div");
    songsDiv.innerHTML = '';
    alert(`A empty playlist "${name}" has been created.`);

    let newPlaylistObject = {name: name, songs:[]};
    playlists.push(newPlaylistObject);

    updateRightDropDownOptions();
    selectElement.value = name;
}

function updateRightDropDownOptions() {   // adds new playlists to the dropdown
    let rightDropDown = document.querySelector("#playlist-name");
    rightDropDown.innerHTML = '';
    playlists.forEach(function(playlist) {
        let option = document.createElement("option");
        option.value = playlist.name;
        option.textContent = playlist.name;
        rightDropDown.appendChild(option);
    });
}

function changePositionOfBead() {
    let bead = document.querySelector("#bead");
    if(beadLeft === true) {
        bead.style.left = "58%";
        beadLeft = false;
    } else {
        bead.style.left = "0";
        beadLeft = true;
    }
}

function toggleTheme() {
    let themeButton = document.querySelector("#switch-theme-button button");
    let root = document.documentElement;
    themeButton.addEventListener("click", function() {
        root.classList.toggle("dark-theme");
        changePositionOfBead();
        if(songSelected == false && root.classList.contains("dark-theme")){
            let image = document.querySelector("#current-song-img");
            image.setAttribute('src', 'Song thumbnails/no song dark.jpg');
        } else if (songSelected == false && (!root.classList.contains("dark-theme"))) {
            let image = document.querySelector("#current-song-img");
            image.setAttribute('src', 'Song thumbnails/no song.jpg');
        }
    });
}

function addListenerToPreviousAndNextButtons() {
    let previousButton = document.querySelector("#previous");
    let nextButton = document.querySelector("#next");

    previousButton.addEventListener("click", function() {
        if(songSelected == false){alert("No Song Selected!");} else {
            let previousSongInCurrentPlaylist = currentSongPlayingElement.previousElementSibling;
            if(previousSongInCurrentPlaylist){
                if(currentSongPlayingElement.classList.contains("playing")){
                    currentSongPlayingElement.classList.remove("playing");  
                };
                currentSongPlayingElement = previousSongInCurrentPlaylist;
                currentSongPlayingElement.classList.add("playing");
                let previousSongName = currentSongPlayingElement.querySelector(".song-name-in-list").textContent;
                songClicked(previousSongName);
            } else {
                alert("No previous song.");
            }
        }
    });

    nextButton.addEventListener("click", function() {
        if(songSelected == false){alert("No Song Selected!");} else {
            let nextSongInCurrentPlaylist = currentSongPlayingElement.nextElementSibling;
            if(nextSongInCurrentPlaylist){
                if(currentSongPlayingElement.classList.contains("playing")){
                    currentSongPlayingElement.classList.remove("playing");  
                };
                currentSongPlayingElement = nextSongInCurrentPlaylist;
                currentSongPlayingElement.classList.add("playing");
                let previousSongName = currentSongPlayingElement.querySelector(".song-name-in-list").textContent;
                songClicked(previousSongName);
            } else {
                alert("No previous song.");
            }
        }
    });
}

function addListenerToAudio() {
    let audioElement = document.querySelector("#audio");
    audioElement.addEventListener("ended", function() {                            // IMPORTANT, 'ended' event has been used
        let nextSongDiv = currentSongPlayingElement.nextElementSibling;
        let nextSongName = nextSongDiv.querySelector(".song-name-in-list").textContent;
        if(nextSongName){
            songClicked(nextSongName);
            if(currentSongPlayingElement.classlist.contains("playing")){
                currentSongPlayingElement.classList.remove("playing");
            }
            currentSongPlayingElement = nextSongDiv;
            currentSongPlayingElement.classList.add("playing");
        } else {
            alert("End Of Playlist!");
        }
    });          
}

function main () {                                                                   // MAIN                                             
    addElementsToLeftDropDown();
    
    // adding songs to left side's div
    let shuffledSongs = shuffleArray(songsArray);
    addSongsToLeftDiv(shuffledSongs);

    createFavouritePlaylist();             // FAVOURITE PLAYLIST IS BY DEFAULT THE COLLECTION OF FIRST SONGS OF ALL GENRES IN "songsArray"

    let newPlaylistInput = document.querySelector("#new-playlist-name-input");    // adding event listener to the 'add-playlist' button
    let newPlaylistCreateButton = document.querySelector("#create-playlist-button");
    newPlaylistCreateButton.addEventListener("click", function () {
        if(newPlaylistInput.value) {
            createNewPlaylist(newPlaylistInput.value);
        } else {
            alert("Enter the name for your new playlist.");
        }
    });

    addSongsToRightDiv(playlists[0].songs); // add songs from 'favourites' to the right div

    let playlistsDropdown = document.querySelector('#playlist-name');  // adding event listsner to the dropdown
    playlistsDropdown.addEventListener('change', function() {
        let playlist = playlists.find(function(playlist){
            if(playlist.name === playlistsDropdown.value) {
                return playlist;
            }
        });
        if(playlist.hasOwnProperty('songs')){   // important
            let playlistSongs = playlist.songs;
            addSongsToRightDiv(playlistSongs);
        } else {
            alert('Playlist selected is empty.');
            let divWithSongs = document.querySelector('#songs-in-current-playlist-div');
            divWithSongs.innerHTML = '';
        }
    });

    songSelected = false;
    let buttonToAddSong = document.querySelector('#add-to-playlist'); // adding event listsner to the 'add song to playlist' button
    buttonToAddSong.addEventListener("click", function() {
        if(songSelected == false){alert("No Song Selected!");}
        else{
            let currentSongBeingPlayedName = document.querySelector('#song-name-being-played').textContent;
            let songObject = songsArray.find(function(songObj){
                if(songObj.name === currentSongBeingPlayedName){
                    return songObj;
                }
            });
            addSongToCurrentPlaylist(songObject);
        }
    });

   toggleTheme();

   addListenerToPreviousAndNextButtons();

   addListenerToAudio();                                               // to play the next song after a song is finished
}
main();