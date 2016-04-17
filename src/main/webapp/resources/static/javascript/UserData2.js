'use strict';

UserData2.prototype.userName = undefined;
UserData2.prototype.upgrades1 = undefined;
UserData2.prototype.upgrades2 = undefined;
UserData2.prototype.currency = 0;
UserData2.prototype.settings = undefined;
UserData2.prototype.currFactor = 0;
UserData2.prototype.treeFactor = 1;
UserData2.prototype.timestamp = undefined;
UserData2.prototype.score = undefined;


//constructor
function UserData2(userDataFromDB){

	
	var data = JSON.parse(userDataFromDB);

	this.userName = data.userName;
	this.upgrades1 = data.upgrades1;
	this.upgrades2 = data.upgrades2;
	this.currency = data.currency;
	this.settings = data.settings;
	this.currFactor = data.currFactor;
	this.treeFactor = data.treeFactor;
	this.timestamp = data.timestamp;
	this.score = data.score;

	
	//implements
}


//getters
UserData2.prototype.getUpgrades1 = function(){
	return this.upgrades1;
};

UserData2.prototype.getUpgrades2 = function(){
	return this.upgrades2;
};

UserData2.prototype.getCurrency = function(){
	return this.currency;
};

UserData2.prototype.getSettings = function(){
	return this.settings;
};
				   
UserData2.prototype.getCurrFactor = function(){
	return this.currFactor;
};

UserData2.prototype.getTreeFactor = function(){
	return this.treeFactor;
};

UserData2.prototype.getTimestamp = function(){
	return this.timestamp;
};

//setters

UserData2.prototype.setupgrades1 = function(upgrades1){
	this.upgrades1 = upgrades1;
};

UserData2.prototype.setupgrades2 = function(upgrades2){
	this.upgrades2 = upgrades2;
};

UserData2.prototype.setCurrency = function(currency){
	this.currency = currency;
};

UserData2.prototype.setSettings = function(settings){
	this.settings = settings;
};

UserData2.prototype.setCurrFactor = function(currFactor){
	this.currFactor = currFactor;
};

UserData2.prototype.setTreeFactor = function(treeFactor){
	this.treeFactor = treeFactor;
};

UserData2.prototype.setTimestamp = function(timestamp){
	this.timestamp = timestamp;
};

UserData2.prototype.createJSONstring = function(){

	var string = '{"userName": "'+this.userName+'","upgrades1": [['+this.upgrades1[0].toString()+'],['+this.upgrades1[1].toString()+'],['+this.upgrades1[2].toString()+']],"upgrades2": [['+this.upgrades2[0].toString()+'],['+this.upgrades2[1].toString()+'],['+this.upgrades2[2].toString()+']], "currency": '+this.currency+', "settings": {"audio-slider":'+this.settings['audio-slider']+'}, "currFactor": '+this.currFactor+', "treeFactor": '+this.treeFactor+', "timestamp": '+ Date.now() +', "score": '+this.score+' }';

	
	return string;

};









