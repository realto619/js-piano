const now_playing = document.getElementById('now_playing');
const allButtons = document.querySelectorAll("button");
// const oct1 = document.getElementById('oct1');
const oct2 = document.getElementById('oct2');
const oct3 = document.getElementById('oct3');
const oct4 = document.getElementById('oct4');
const oct5 = document.getElementById('oct5');
const oct6 = document.getElementById('oct6');
// const oct7 = document.getElementById('oct7');
// const oct1All = document.querySelectorAll('.oct1');
const oct2All = document.querySelectorAll('.oct2');
const oct3All = document.querySelectorAll('.oct3');
const oct4All = document.querySelectorAll('.oct4');
const oct5All = document.querySelectorAll('.oct5');
const oct6All = document.querySelectorAll('.oct6');
// const oct7All = document.querySelectorAll('.oct7');
const keys = document.querySelectorAll('.keys');
const octave = document.querySelectorAll('.octave');
const chords = document.getElementById('chords');
    
// function play2(id){
//     if(document.getElementById('_'+id)) {
//         audio = document.getElementById('_'+id);
//         clearInterval(int);
//         audio.currentTime = 0.5;
//         audio.play();
//     }
// }

// function stop(){
//     audio.stop();
// }

    
// function pause(id){
//     audio = document.getElementById('_'+id);
//     audio.pause();
// }

// function play(id) {
//     //   let note = id.toUpperCase();
//     alert(id);
//     document.getElementById('_'+id).play();
// }

function playNote(file){
    var audio = document.createElement('audio');
    audio.src = '/_media/'+file+'.mp3';
    // console.log(audio.src);
    document.body.appendChild(audio);
    audio.play();
    
    audio.onended = function () {
      this.parentNode.removeChild(this);
    }
}


allButtons.forEach(function (button) {
    button.addEventListener("click", () => {
        removeHilite();
        //console.log(button.dataset.note);
        // let thisID = button.dataset.note.replace('_', '');
        let thisID = button.dataset.note;
        // console.log(thisID);
        if(document.getElementById(thisID).classList.contains('blk')) {
            document.getElementById(thisID).classList.add('hilite2');
        } else {
            document.getElementById(thisID).classList.add('hilite');
        }
        playNote(button.dataset.note);
        // console.log(button.dataset.note);
        now_playing.innerText = button.dataset.note;
    });
});


oct2.addEventListener('click', function() {
    removeHilite();
    this.classList.replace('gray', 'oct_hilite');
    oct2All.forEach(item => item.classList.add('hilite'));    
});

oct3.addEventListener('click', function() {
    removeHilite();
    this.classList.replace('gray', 'oct_hilite');
    oct3All.forEach(item => item.classList.add('hilite'));    
});

oct4.addEventListener('click', function() {
    removeHilite();
    this.classList.replace('gray', 'oct_hilite');
    oct4All.forEach(item => item.classList.add('hilite'));    
});

oct5.addEventListener('click', function() {
    removeHilite();
    this.classList.replace('gray', 'oct_hilite');
    oct5All.forEach(item => item.classList.add('hilite'));    
});

oct6.addEventListener('click', function() {
    removeHilite();
    this.classList.replace('gray', 'oct_hilite');
    oct6All.forEach(item => item.classList.add('hilite'));    
});

// oct7.addEventListener('click', function() {
//     removeHilite();
//     this.classList.replace('gray', 'oct_hilite');
//     oct7All.forEach(item => item.classList.add('hilite'));    
// });


function removeHilite() {
    keys.forEach(item => {
        item.classList.remove('hilite');    
        item.classList.remove('hilite2');
    });    
    octave.forEach(item =>  item.classList.replace('oct_hilite', 'gray'));        
}


function getClass(id)  {  
  var e = document.getElementById(id);  
  alert(e.classList);  
}  

function chord(array) {
    array.forEach(item => playNote(item));
    arrayText = array.toString();
    now_playing.innerText = arrayText;
}


function title(title, artist = "") {
    document.getElementById('title').classList.remove('none');
    if(artist!=='') { artist = ` <span class="artist">by ${artist}</span>`}
    document.getElementById('title').innerHTML = title + artist;
}

function createChord(id, array, section = "chords") {
    let button = document.createElement('button');
    button.setAttribute('id', id);
    button.setAttribute('class', 'chord');
    const reg = /_/g;
    button.textContent = id.replace(reg, '');
    document.getElementById(section).classList.remove('none');
    document.getElementById(section).appendChild(button);
    document.getElementById(id).addEventListener('click', function() {
        // let chord = "";
        removeHilite();
        array.forEach(item => {
            if(item.includes('Fb')) {
                item = item.replace('Fb','E');
            } else if(item.includes('Cb')) {
                item = item.replace('Cb','B');
            }
            var item1 = '', item2 = '';
            if(item.includes('#')) {
                item1 = 'actual = ' + item;
                if(item.charAt(0)==='A') {
                    item = item.replace('A','B').replace('#','b');
                } else if(item.charAt(0)==='B') {
                    item = item.replace('B','C').replace('#','');
                } else if(item.charAt(0)==='C') {
                    item = item.replace('C','D').replace('#','b');
                } else if(item.charAt(0)==='D') {
                    item = item.replace('D','E').replace('#','b');
                } else if(item.charAt(0)==='E') {
                    item = item.replace('E','F').replace('#','');
                } else if(item.charAt(0)==='F') {
                    item = item.replace('F','G').replace('#','b');
                } else if(item.charAt(0)==='G') {
                    item = item.replace('G','A').replace('#','b');
                } 
                item2 = 'changed = ' + item;
            }
            playNote(item);
            addHilite(item);
            if(item1 !== '' && item2 !== '') { console.log(item1 +'\n' + item2); }
        });    
        now_playing.innerHTML = `${id.replace(reg,'')}: <span class="normal">${array}</span>`;
        });
}

function addBreak(ele = "chords") {
    let brk = document.createElement('br');
    if(ele !== "chords") {
        console.log(document.getElementById(ele));
        document.getElementById(ele).appendChild(brk);
    } else {
        chords.appendChild(brk);
    }
}

function addHilite(id) {
    if(document.getElementById(id).classList.contains('blk')) {
        document.getElementById(id).classList.add('hilite2');
    } else {
        document.getElementById(id).classList.add('hilite');
    }
}

function getQSVar(val) {
    const query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == val) {
        return pair[1];
        }
    }
    return false;
}

if(getQSVar('js')) {
    js = getQSVar('js');
    let script = document.createElement('script');
    script.src = `${js}.js`;
    script.setAttribute('id', 'song-js');
    document.body.appendChild(script);
}