// Get a handle to the player
player       = document.getElementById('video-element');
btnPlayPause = document.getElementById('btn-play-pause');
btnMute      = document.getElementById('btn-mute');
progressBar  = document.getElementById('progress-bar');
volumeBar    = document.getElementById('volume-bar');
btnFaster    = document.getElementById('btn-faster');
btnSlower    = document.getElementById('btn-slower');
nowTime      = document.getElementById('now-time');
duration     = document.getElementById('duration');
speed        = document.getElementById('speed');


// Update the video volume
// volumeBar.addEventListener("change", function(evt) {
//   player.volume = evt.target.value;
// });
changeVolume("mousedown");
changeVolume("mousemove");

function changeVolume(evtType) {
  volumeBar.addEventListener(evtType, function(evt) {
    player.volume = evt.target.value;
  });
}
// document.getElementById('btn-full-screen').disabled = true;

// Add a listener for getting the video duration
player.addEventListener('loadedmetadata', function(){
  console.log('loadedmetadata');
  duration.textContent = parseTime(player.duration);
})
// Add a listener for the timeupdate event so we can update the progress bar
player.addEventListener('timeupdate', updateTime, false);

// Add a listener for the play and pause events so the buttons state can be updated
player.addEventListener('play', function() {
  // Change the button to be a pause button
  changeButtonType(btnPlayPause, 'pause');
}, false);

player.addEventListener('pause', function() {
  // Change the button to be a play button
  changeButtonType(btnPlayPause, 'play');
}, false);

player.addEventListener('volumechange', function(e) { 
  // Update the button to be mute/unmute
  if (player.muted) changeButtonType(btnMute, 'unmute');
  else changeButtonType(btnMute, 'mute');
}, false);  

player.addEventListener('ended', function() { this.pause(); }, false);  

progressBar.addEventListener("click", seek);

function seek(e) {
    var percent = e.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    e.target.value = Math.floor(percent / 100);
    e.target.innerHTML = progressBar.value + '% played';
}

function playPauseVideo() {
  if (player.paused || player.ended) {
    // Change the button to a pause button
    changeButtonType(btnPlayPause, 'pause');
    player.play();
  }
  else {
    // Change the button to a play button
    changeButtonType(btnPlayPause, 'play');
    player.pause();
  }
}

// Stop the current media from playing, and return it to the start position
function stopVideo() {
  player.pause();
  if (player.currentTime) player.currentTime = 0;
}

// Toggles the media player's mute and unmute status
function muteVolume() {
  if (player.muted) {
    // Change the button to a mute button
    changeButtonType(btnMute, 'mute');
    player.muted = false;
  }
  else {
    // Change the button to an unmute button
    changeButtonType(btnMute, 'unmute');
    player.muted = true;
  }
}

// Replays the media currently loaded in the player
function replayVideo() {
  resetPlayer();
  player.play();
}

// Update the progress bar & duration
function updateTime() {
  
  // Work out how much of the media has played via the duration and currentTime parameters
  var percentage = Math.floor((100 / player.duration) * player.currentTime);
  // Update the progress bar's value
  progressBar.value = percentage;
  // Update the progress bar's text (for browsers that don't support the progress element)
  progressBar.innerHTML = percentage + '% played';
  // update the current time
  nowTime.textContent = parseTime(player.currentTime);
}

// Updates a button's title, innerHTML and CSS class
function changeButtonType(btn, value) {
  btn.title     = value;
  btn.innerHTML = value;
  btn.className = value;
}

function resetPlayer() {
  progressBar.value = 0;
  // Move the media back to the start
  player.currentTime = 0;
  // Set the play/pause button to 'play'
  changeButtonType(btnPlayPause, 'play');
}

function fasterSpeed() {
  player.playbackRate = player.playbackRate + 0.1;
  speed.innerHTML = player.playbackRate.toFixed(1) + 'x';
}

function slowerSpeed() {
  player.playbackRate = player.playbackRate <= 0.15 ? 0.1 : player.playbackRate - 0.1;
  speed.innerHTML = player.playbackRate.toFixed(1) + 'x';
}

function parseTime(time){
  time = Math.floor(time);
  var _m, _s;
  _m = Math.floor(time/60);
  _s = time - _m*60;
  if(_m<10){
    _m = '0' + _m;
  }
  if(_s<10){
    _s = '0' + _s;
  }
  return _m + ':' + _s
}
// function exitFullScreen() {
//   if (document.exitFullscreen) {
//       document.exitFullscreen();
//   } else if (document.msExitFullscreen) {
//       document.msExitFullscreen();
//   } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen();
//   } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//   }
// }

// function toggleFullScreen() {
//   //var player = document.getElementById("player");

//   if (player.requestFullscreen)
//       if (document.fullScreenElement) {
//           document.cancelFullScreen();
//       } else {
//           player.requestFullscreen();
//       }
//       else if (player.msRequestFullscreen)
//       if (document.msFullscreenElement) {
//           document.msExitFullscreen();
//       } else {
//           player.msRequestFullscreen();
//       }
//       else if (player.mozRequestFullScreen)
//       if (document.mozFullScreenElement) {
//           document.mozCancelFullScreen();
//       } else {
//           player.mozRequestFullScreen();
//       }
//       else if (player.webkitRequestFullscreen)
//       if (document.webkitFullscreenElement) {
//           document.webkitCancelFullScreen();
//       } else {
//           player.webkitRequestFullscreen();
//       }
//   else {
//       alert("Fullscreen API is not supported");
      
//   }
// }