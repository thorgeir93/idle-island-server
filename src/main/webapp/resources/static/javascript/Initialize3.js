var g_audio   = {};
var g_images = {};

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var g_canvasW = g_canvas.parentElement.clientWidth;
var g_canvasH = g_canvas.parentElement.clientHeight;

g_ctx.globalCompositeOperation='destination-over';

var islandPos = { 
  x:(g_canvasW/10), 
  y:(g_canvasH/1.4)
};

var treePos = {
  x:(islandPos.x),
  y:(islandPos.y-350)
};

var coconutPos = {
  x:(treePos.x+170),
  y:(treePos.y+60)
};

var manPos = {
  x:(treePos.x+240),
  y:(treePos.y+280)
};


//
var upgradePos = {
  x:(g_canvasW-100),
  y:(30)
};

var veidistong = {
  x:islandPos.x+580,
  y:islandPos.y
};


var birdPos = {
  x:treePos.x+300,
  y:treePos.y-140
};



var leikur;

var user;

function AudioPreload(callback){
  
  var requiredSounds = {
    punch : "/../../resources/static/javascript/sounds/punch.ogg",
    gameTheme : "/../../resources/static/javascript/sounds/GameTheme.ogg",
    purchase  : "/../../resources/static/javascript/sounds/purchase.ogg",
    noMoney   : "/../../resources/static/javascript/sounds/noMoney.ogg",
    ocean     : "/../../resources/static/javascript/sounds/ocean.ogg",
    changeDisp: "/../../resources/static/javascript/sounds/changeDisp.ogg",
    exit      : "/../../resources/static/javascript/sounds/exit.ogg"
  };

  soundsPreload(requiredSounds, g_audio, callback);
}


function imagePreload(callback){

    var requiredImages = {
      tree        : "/../../resources/static/javascript/images/game-coconut-tree.png",
      coconut       : "/../../resources/static/javascript/images/game-coconut-money.png",
      exit          : "/../../resources/static/javascript/images/game-button-exit.png",
      island        : "/../../resources/static/javascript/images/game-sand-3-01.png",
      pile          : "/../../resources/static/javascript/images/game-coconut-heap.png",


      item1upgrade1         : "/../../resources/static/javascript/images/item1upgrade1.png",
      item1upgrade1_bought  : "/../../resources/static/javascript/images/item1upgrade1_bought.png",
      item1upgrade2         : "/../../resources/static/javascript/images/item1upgrade2.png",
      item1upgrade2_bought  : "/../../resources/static/javascript/images/item1upgrade2_bought.png",
      item1upgrade3         : "/../../resources/static/javascript/images/item1upgrade3.png",
      item1upgrade3_bought  : "/../../resources/static/javascript/images/item1upgrade3_bought.png",

      item2upgrade1         : "/../../resources/static/javascript/images/item2upgrade1.png",
      item2upgrade1_bought  : "/../../resources/static/javascript/images/item2upgrade1_bought.png",
      item2upgrade2         : "/../../resources/static/javascript/images/item2upgrade2.png",
      item2upgrade2_bought  : "/../../resources/static/javascript/images/item2upgrade2_bought.png",
      item2upgrade3         : "/../../resources/static/javascript/images/item2upgrade3.png",
      item2upgrade3_bought  : "/../../resources/static/javascript/images/item2upgrade3_bought.png",

      item3upgrade1         : "/../../resources/static/javascript/images/item3upgrade1.png",
      item3upgrade1_bought  : "/../../resources/static/javascript/images/item3upgrade1_bought.png",
      item3upgrade2         : "/../../resources/static/javascript/images/item3upgrade2.png",
      item3upgrade2_bought  : "/../../resources/static/javascript/images/item3upgrade2_bought.png",
      item3upgrade3         : "/../../resources/static/javascript/images/item3upgrade3.png",
      item3upgrade3_bought  : "/../../resources/static/javascript/images/item3upgrade3_bought.png",

      item4upgrade1         : "/../../resources/static/javascript/images/item4upgrade12.png",
      item4upgrade1_bought  : "/../../resources/static/javascript/images/item4upgrade12_bought.png",
      item4upgrade2         : "/../../resources/static/javascript/images/item4upgrade22.png",
      item4upgrade2_bought  : "/../../resources/static/javascript/images/item4upgrade22_bought.png",
      item4upgrade3         : "/../../resources/static/javascript/images/item4upgrade32.png",
      item4upgrade3_bought  : "/../../resources/static/javascript/images/item4upgrade32_bought.png",

      item5upgrade1         : "/../../resources/static/javascript/images/item5upgrade12.png",
      item5upgrade1_bought  : "/../../resources/static/javascript/images/item5upgrade12_bought.png",
      item5upgrade2         : "/../../resources/static/javascript/images/item5upgrade22.png",
      item5upgrade2_bought  : "/../../resources/static/javascript/images/item5upgrade22_bought.png",
      item5upgrade3         : "/../../resources/static/javascript/images/item5upgrade32.png",
      item5upgrade3_bought  : "/../../resources/static/javascript/images/item5upgrade32_bought.png",

      item6upgrade1         : "/../../resources/static/javascript/images/item6upgrade12.png",
      item6upgrade1_bought  : "/../../resources/static/javascript/images/item6upgrade12_bought.png",
      item6upgrade2         : "/../../resources/static/javascript/images/item6upgrade22.png",
      item6upgrade2_bought  : "/../../resources/static/javascript/images/item6upgrade22_bought.png",
      item6upgrade3         : "/../../resources/static/javascript/images/item6upgrade32.png",
      item6upgrade3_bought  : "/../../resources/static/javascript/images/item6upgrade32_bought.png",




      unavalible    : "/../../resources/static/javascript/images/game-upgrade-lock-02.png",//"game/images/unavalible.png",

      kall          : "/../../resources/static/javascript/images/kall_animation.png",
      kall1         : "/../../resources/static/javascript/images/kall_animation-upgrade-1.png",
      kall2         : "/../../resources/static/javascript/images/kall_animation-upgrade-2.png",
      kall3         : "/../../resources/static/javascript/images/kall_animation-upgrade-3.png",

      bird1         : "/../../resources/static/javascript/images/bird_animation-upgrade-1.png",
      bird2         : "/../../resources/static/javascript/images/bird_animation-upgrade-2.png",
      bird3         : "/../../resources/static/javascript/images/bird_animation-upgrade-3.png",


      veidistong1   : "/../../resources/static/javascript/images/veidistong_animation-upgrade-1.png",
      veidistong2   : "/../../resources/static/javascript/images/veidistong_animation-upgrade-2.png",
      veidistong3   : "/../../resources/static/javascript/images/veidistong_animation-upgrade-3.png",


      mole1         : "/../../resources/static/javascript/images/mole_animation-upgrade-1.png",
      mole2         : "/../../resources/static/javascript/images/mole_animation-upgrade-2.png",
      mole3         : "/../../resources/static/javascript/images/mole_animation-upgrade-3.png",

      molekall      : "/../../resources/static/javascript/images/molekall_animation.png",
      molekall1     : "/../../resources/static/javascript/images/molekall_animation-upgrade-1.png",
      molekall2     : "/../../resources/static/javascript/images/molekall_animation-upgrade-2.png",
      molekall3     : "/../../resources/static/javascript/images/molekall_animation-upgrade-3.png",

      miner1        : "/../../resources/static/javascript/images/miner_animation-upgrade-1.png",
      miner2        : "/../../resources/static/javascript/images/miner_animation-upgrade-2.png",
      miner3        : "/../../resources/static/javascript/images/miner_animation-upgrade-3.png",

      
      moleheap      : "/../../resources/static/javascript/images/game-coconut-heap.png"



      };

  imagesPreload(requiredImages, g_images, callback);
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

    leikur.update(dt);
    leikur.saveAndRefresh(dt)
    leikur.render();
    leikur.playTheme();
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

    // Grabbing focus is good, but it sometimes screws up jsfiddle,
    // so it's a risky option during "development"
    //
    //window.focus(true);

    // We'll be working on a black background here,
    // so let's use a fillStyle which works against that...
    //
    g_ctx.fillStyle = "white";

  _requestNextIteration();
};


function init(){
  

  canvasInit();

  imagePreload(function(){

    AudioPreload(function(){

      

            user = $('#user')['0'].innerHTML;
            userData = $('#userData')['0'].innerHTML;
            

            var isFriend = $('#isFriend')['0'].innerHTML;
            if (isFriend === 'false') {
              isFriend = false;
            } else {
              isFriend = true;
            }

      leikur = new gameEngine2(g_images, g_audio, user, userData, isFriend);
      

      
      
      //debugger;
      
      //debugger;
      Buttons.init( leikur, isFriend);
      

      document.onmousedown = function(e){

        leikur.receiveInputs(e);
      };
      
      Loop();

    });
  });
}


function canvasInit(){
  canvas = document.getElementById("myCanvas");
  canvas.width = document.body.clientWidth; //document.width is obsolete
  canvas.height = document.body.clientHeight; //document.height is obsolete
  
  //canvasW = canvas.width;
  //canvasH = canvas.height;
  //canvas.globalAlpha = 0.0;
  //canvas.clearRect(0,0,200,200);
  //canvas.fillStyle = "rgba(0, 0, 0, 0.0)";
}


//Starting point of the game
init();