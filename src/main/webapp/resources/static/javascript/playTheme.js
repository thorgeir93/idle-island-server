

var g_audio   = {};

function AudioPreload(callback){
	var requiredSounds = {
		Theme	: "../../../resources/static/javascript/sounds/MenuTheme.ogg"
	};

	soundsPreload(requiredSounds, g_audio, callback);
}

var userData
var volume;
function init(){

    userData = $('#gamestate')['0'].innerHTML;

    var data = JSON.parse(userData);

    volume = data.settings['audio-slider'];
    console.log(volume)
		AudioPreload(function(){
            Loop();
		});
}


function playTheme(){
  if(g_audio['Theme'].currentTime === 0){
    g_audio['Theme'].volume = (volume/100);
    g_audio['Theme'].play();
  }

  if(g_audio.Theme.currentTime === g_audio.Theme.duration){
    g_audio.Theme.currentTime = 0;
  }

}

var _frameTime_ms = null;
var _frameTimeDelta_ms = null;


// Perform one iteration of the mainloop
iter = function (frameTime) {

    // Use the given frameTime to update all of our game-clocks
    _updateClocks(frameTime);

    // Perform the iteration core to do all the "real" work
    _iterCore(_frameTimeDelta_ms);
};

_updateClocks = function (frameTime) {

    // First-time initialisation
    if (_frameTime_ms === null) _frameTime_ms = frameTime;

    // Track frameTime and its delta
    this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
    this._frameTime_ms = frameTime;
};

_iterCore = function (dt) {

    playTheme();

    Loop();
};


// Annoying shim for Firefox and Safari
window.requestAnimationFrame =
    window.requestAnimationFrame ||        // Chrome
    window.mozRequestAnimationFrame ||     // Firefox
    window.webkitRequestAnimationFrame;    // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
    iter(frameTime);
}

_requestNextIteration = function () {
    window.requestAnimationFrame(mainIterFrame);
};


Loop = function () {

  _requestNextIteration();
};

init();