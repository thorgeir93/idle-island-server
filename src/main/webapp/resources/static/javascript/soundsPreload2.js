// Multi-Audio Preloader

"use strict";


Audio.prototype.asyncLoad = function(src, asyncCallback) {

	this.oncanplaythrough	= asyncCallback;
	this.onerror 		 	= asyncCallback;
	this.onloadstart 	 	= asyncCallback;

	
    this.src = src;
};



function soundsPreload(requiredSounds,
                       loadedSounds,
					   finalCallback) {


    var numSoundsRequired,
        numSoundsHandled = 0,
        currentName,
        currentSound,
        preloadHandler;


    numSoundsRequired = Object.keys(requiredSounds).length;


    preloadHandler = function () {

       // 
        loadedSounds[this.name] = this;

		this.oncanplaythrough = null;
		this.onerror = null;
		this.onloadstart = null;


        numSoundsHandled += 1;


        if (numSoundsHandled === numSoundsRequired) {
            
            
            
            
            
			finalCallback();

            
            

		} else {
			
		}

    };



    for (currentName in requiredSounds) {

        if (requiredSounds.hasOwnProperty(currentName)) {

            
            currentSound = new Audio();
            currentSound.name = currentName;
            currentSound.asyncLoad(requiredSounds[currentName], preloadHandler);
        }
    }
}
