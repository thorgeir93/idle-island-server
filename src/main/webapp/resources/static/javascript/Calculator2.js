'use strict';

function Calculator2(){
}


Calculator2.prototype.prices1 = [[10,2500,150000],[1000,15000,250000],[5000,100000,500000]];
Calculator2.prototype.factors1 = [[1,5,10],[2,7,15],[3,9,20]];

Calculator2.prototype.prices2 = [[300000,1000000,8000000],[700000,2000000,25000000],[1500000,10000000,100000000]];
Calculator2.prototype.factors2 = [[1*2,5*2,10*20],[2*2,7*2,15*2],[3*2,9*2,20*2]];

Calculator2.prototype.difference = 0;

Calculator2.prototype.calculateCurrency = function(time, currency, currFactor){
	var tala = (time/1000)*currFactor;
	var intTala = parseInt(tala, 10);
	var difference = tala - intTala;
	this.difference += difference;
	if(this.difference >= 1){
		this.difference -= 1;
		intTala += 1;
	}	

	return currency + intTala;


};

Calculator2.prototype.calculateCurrencyOffline = function(time, currency, currFactor){
	var tala = (time/1000)*currFactor;
	var intTala = parseInt(tala, 10);
	var difference = tala - intTala;
	this.difference += difference;
	if(this.difference >= 1){
		this.difference -= 1;
		intTala += 1;
	}	

	return intTala;


};

Calculator2.prototype.calculateTreeFactor = function(upgrades,upgrades2){

	var factor = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if(upgrades[i][j] === 2){
				factor += 1;
			}
		}
	}

	for (i = 0; i < 3; i++) {
		for (var k = 0; k < 3; k++) {
			if(upgrades2[i][k] === 2){
				factor += 1;
			}
		}
	}
	return factor;
};

Calculator2.prototype.calculateOfflineCurrency = function(date, currency, factor){
	var timeElapsedInSecs = (Date.now() - date);
	var curr = this.calculateCurrency(timeElapsedInSecs,currency, factor);
	
	return curr;


};

Calculator2.prototype.calculateOfflineScore = function(date, currency, factor){
	var timeElapsedInSecs = (Date.now() - date);
	var curr = this.calculateCurrencyOffline(timeElapsedInSecs,currency, factor);
	
	return curr;


};

Calculator2.prototype.createFactor = function(upgrades,upgrades2){
	
	var factor = 0;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if(upgrades[i][j] === 2){
					factor += this.factors1[i][j];
				}
			}
		}

		for (i = 0; i < 3; i++) {
			for (var k = 0; k < 3; k++) {
				if(upgrades2[i][k] === 2){
					factor += this.factors2[i][k];
				}
			}
		}

		
		return factor;
	
};