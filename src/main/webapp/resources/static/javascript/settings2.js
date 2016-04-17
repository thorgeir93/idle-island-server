/*settings.js*/
document.addEventListener('DOMContentLoaded',function() {
	
	settings.init();
});

var settings = (function() {
	
	//ELEMENTS
	var cBoxFullS = {};
	var slider1 = {};
	

	function init(){
		
		slider1.element1 = document.querySelector('.audio-slider');
		slider1.element2 = document.querySelector('.audio-number');
		slider1.element3 = document.querySelector('.label-audio');

		slider1.element1.addEventListener('mousedown', updateAudioNum);
		slider1.element1.addEventListener('mousemove', updateAudioNum);
		
		slider1.element2.addEventListener('click', toggleMute);
		slider1.element3.addEventListener('click', toggleMute);
	}


	function toggleMute(){
		if( slider1.element1.classList.contains('audio-on') ){
			for(var element in slider1){
				slider1[element].classList.remove('audio-on');
				slider1[element].classList.add('audio-off');
			}
			slider1.element2.innerHTML = 'Mute';
			slider1.element1.value = 0;
		} else{
			for(var element in slider1){
				slider1[element].classList.remove('audio-off');
				slider1[element].classList.add('audio-on');
			}
			slider1.element2.innerHTML=slider1.element1.value;
		}
	}

	function updateAudioNum( event ){
		if( slider1.element1.classList.contains('audio-on') ){
				var newNumber = slider1.element1.value;
				slider1.element2.innerHTML = newNumber;
		}
	}

	return {
		init: init
	};
})();