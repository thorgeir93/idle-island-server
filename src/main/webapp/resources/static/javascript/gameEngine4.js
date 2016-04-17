/******************************/
function gameEngine2(image, audio, user, userData, isFriend){
    isFriend = !isFriend;
    
    if (isFriend) {
        
    } else {
        
    }

    this.userName = user;
    this.userdata = new UserData2(userData);
    this.calculator = new Calculator2();
    this.coconutImage = image.coconut;
    this.userdata.setCurrency(this.calculator.calculateOfflineCurrency(this.userdata.timestamp,this.userdata.getCurrency(), this.userdata.getCurrFactor()));
    this.score = this.userdata.score + this.calculator.calculateOfflineScore(this.userdata.timestamp,this.userdata.getCurrency(), this.userdata.getCurrFactor());
    
    this.displayScreen = this.lvl1;
    this.audio = audio;
    this.isFriend = isFriend;
    this.time = 0;

    //this.userdata.currency = 100000000000;

    if (isFriend) {

        ////////////////////////////////////////////////////////
        //              THE UPGRADES DISPLAY 1
        ////////////////////////////////////////////////////////

        var names = ['item1upgrade1', 'item2upgrade1', 'item3upgrade1', 'item1upgrade2', 'item2upgrade2', 'item3upgrade2', 'item1upgrade3', 'item2upgrade3', 'item3upgrade3' ,'item1upgrade1_bought', 'item2upgrade1_bought', 'item3upgrade1_bought', 'item1upgrade2_bought', 'item2upgrade2_bought', 'item3upgrade2_bought', 'item1upgrade3_bought', 'item2upgrade3_bought', 'item3upgrade3_bought'];

        this.makeUpgradeDisplay(names, image, 0);

        ////////////////////////////////////////////////////////
        //              THE UPGRADES DISPLAY 2
        ////////////////////////////////////////////////////////

        names = ['item4upgrade1', 'item5upgrade1', 'item6upgrade1', 'item4upgrade2', 'item5upgrade2', 'item6upgrade2', 'item4upgrade3', 'item5upgrade3', 'item6upgrade3', 'item4upgrade1_bought', 'item5upgrade1_bought', 'item6upgrade1_bought', 'item4upgrade2_bought', 'item5upgrade2_bought', 'item6upgrade2_bought', 'item4upgrade3_bought', 'item5upgrade3_bought', 'item6upgrade3_bought'];

        this.makeUpgradeDisplay(names, image, 1);

        ////////////////////////////////////////////////////////
        //              LEVEL 1
        ////////////////////////////////////////////////////////

    } else {
        this.displays.push([]);
        this.displays.push([]);
    } 


    var buttons = [];

    pos = {     width: image.island.width,
                        height: image.island.height,

                        topX: islandPos.x,
                        topY: islandPos.y
          };

    buttons.push(new Button2(pos, image.island, undefined));
    
    //takki1 - tré
    var pos = {     width: image.tree.width,
                        height: image.tree.height,
                        topX: treePos.x,
                        topY: treePos.y
               };
    if (isFriend) {
        buttons.push(new Button2(pos, image.tree, this.punch.bind(this)));
    } else {
        buttons.push(new Button2(pos, image.tree, undefined));
    }    
 


    var Sprites = [];
    var sprite = [];

    var numberOfFrames = 5;
    var frameheight = image.kall.height;
    var framewidth = image.kall.width / numberOfFrames;
    var topX = manPos.x;
    var topY = manPos.y;
    var animationTime = 0.7;
    var scale = 0.5;

    sprite.push(animation = new Sprite(image.kall,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, scale, false));
    sprite.push(animation = new Sprite(image.kall1,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, scale, false));
    sprite.push(animation = new Sprite(image.kall2,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, scale, false));
    sprite.push(animation = new Sprite(image.kall3,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, scale, false));

    Sprites.push(sprite);

    sprite = [];


    sprite.push(animation = new Sprite(image.veidistong1,104,128,veidistong.x,veidistong.y, 2, 18, 1, true));
    sprite.push(animation = new Sprite(image.veidistong2,200,128,veidistong.x,veidistong.y-96, 1.5, 18, 1, true));
    sprite.push(animation = new Sprite(image.veidistong3,200,128,veidistong.x,veidistong.y-96, 1, 18, 1, true)); 

    Sprites.push(sprite);

    sprite = [];

    sprite.push(animation = new Sprite(image.bird1,400,200,birdPos.x,birdPos.y, 3, 22, 1.5, true));
    sprite.push(animation = new Sprite(image.bird2,400,200,birdPos.x,birdPos.y, 3, 22, 1.5, true));  
    sprite.push(animation = new Sprite(image.bird3,400,200,birdPos.x,birdPos.y, 3, 22, 1.5, true)); 

    Sprites.push(sprite);




    this.displays.push(new Display2(buttons,undefined, Sprites));

    /////////////////////////////////////////////////
    //                  Sp TWO
    ////////////////////////////////////////////////

    //takki1 - pile
    buttons = [];
    pos = {     width: image.pile.width,
                height: image.pile.height,
                topX: treePos.x-100,
                topY: treePos.y+80
               };
    if (isFriend) {      
        buttons.push(new Button2(pos, image.pile, this.punch.bind(this)));
    } else {
        buttons.push(new Button2(pos, image.pile, undefined));
    }  

    pos = {     width: image.pile.width/2,
                height: image.pile.height/2,
                topX: treePos.x+800,
                topY: treePos.y+200
               };
    
    buttons.push(new Button2(pos, image.pile, undefined));

    pos = {     width: image.pile.width/3,
                height: image.pile.height/3,
                topX: treePos.x+770,
                topY: treePos.y+30
               };
    
    buttons.push(new Button2(pos, image.pile, undefined));

    pos = {     width: image.pile.width/3.5,
                height: image.pile.height/3.5,
                topX: treePos.x + 150,
                topY: treePos.y - 70
               };
    
    buttons.push(new Button2(pos, image.pile, undefined));    

    Sprites = [];
    sprite = [];

    numberOfFrames = 5;
    frameheight = image.molekall1.height;
    framewidth = image.molekall1.width / numberOfFrames;
    topX = 360;
    topY = 380;
    animationTime = 1;
    scale = 1;
    
    sprite.push(animation = new Sprite(image.molekall,241,449,500,topY,1, 1, 1, false));
    sprite.push(animation = new Sprite(image.molekall1,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, 0.5, true));
    sprite.push(animation = new Sprite(image.molekall2,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, 0.75, true));
    sprite.push(animation = new Sprite(image.molekall3,frameheight,framewidth,310,290,animationTime, numberOfFrames, scale, true));

    Sprites.push(sprite);

    numberOfFrames = 20;
    frameheight = 46;
    framewidth = 38;
    topX = (manPos.x + 30);
    topY = (manPos.y - 320);
    animationTime = 1;
    scale = 1.5;

    sprite = [];

    sprite.push(animation = new Sprite(image.mole1,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, scale, true));
    sprite.push(animation = new Sprite(image.mole2,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, scale, true));
    sprite.push(animation = new Sprite(image.mole3,frameheight,framewidth,topX,topY,animationTime, numberOfFrames, scale, true));

    Sprites.push(sprite);

    topX = (veidistong.x + 110);
    topY = (manPos.y - 270);
    numberOfFrames = 10;
    frameheight = image.miner1.height;
    framewidth = image.miner1.width / numberOfFrames;
    animationTime = 1;
    scale = 2;

    sprite = [];

    sprite.push(animation = new Sprite(image.miner1,frameheight,framewidth,topX,topY,animationTime,numberOfFrames, scale, true));
    sprite.push(animation = new Sprite(image.miner2,frameheight,framewidth,topX,topY,animationTime,numberOfFrames, scale, true));
    sprite.push(animation = new Sprite(image.miner3,frameheight,framewidth,topX,topY,animationTime,numberOfFrames, scale, true));    

    Sprites.push(sprite);



    this.displays.push(new Display2(buttons, undefined, Sprites));


    
}

gameEngine2.prototype.playTheme = function(){

    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        if(this.audio.gameTheme.currentTime === 0){
            this.audio.gameTheme.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio.gameTheme.play();

        }

        if(this.audio.ocean.currentTime === 0){
            this.audio.ocean.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio.ocean.play();
        }
                

        if(this.audio.ocean.currentTime === this.audio.ocean.duration){
            this.audio.ocean.currentTime = 0;
        }

        if(this.audio.gameTheme.currentTime === this.audio.gameTheme.duration){
            this.audio.gameTheme.currentTime = 0;
        }
    }    
    
};


//
function decidePosition(img2, top, left, img1Pos){
    //var img1WH = getWidthHeight( img1 );
    var img2WH = getWidthHeight( img2 );
}

function getWidthHeight(img){
    return {w:img.width, h:img.height};
}


gameEngine2.prototype.lvl1 = 2;
gameEngine2.prototype.lvl2 = 3;
gameEngine2.prototype.UpgrLvl1 = 0;
gameEngine2.prototype.UpgrLvl2 = 1;

gameEngine2.prototype.audio = undefined;

gameEngine2.prototype.userName = undefined;

gameEngine2.prototype.userData = undefined;

gameEngine2.prototype.calculator = undefined;
gameEngine2.prototype.dataBaseConnector = undefined;

gameEngine2.prototype.displayScreen = undefined;
gameEngine2.prototype.displays = [];

gameEngine2.prototype.isMuted = false;

gameEngine2.prototype.coconutImage = undefined;

gameEngine2.prototype.score = undefined;

gameEngine2.prototype.makeUpgradeDisplay = function(names,image,func){

    if (this.isFriend) {
        buttons = [];

       /* pos = {     width: image[names[0]].width,
                            height: image[names[0]].height,
                            topX: 900,
                            topY: 10
              };

        if(func === 0){
            buttons.push(new Button(pos, image[names[0]], this.chanceDisplayToLvl1.bind(this)));
        }else{
            buttons.push(new Button(pos, image[names[0]], this.chanceDisplayToLvl2.bind(this)));

        }*/

        //////////////////////////////////////////
        //              PARTUR FYRIR BUY MENU
        ///////////////////////////////////////////

        buyMenu = [];

        //////////////////////////////////////////
        //              UPGRADES
        ///////////////////////////////////////////
        var upgrades = [[0,0,0],[0,0,0],[0,0,0]];

        var x= 100;
        var y= 100;

        var nameCounter = 0;
        for(var i = 0; i< 3; i++){
            for(var j = 0; j< 3; j++){
                pos = {     width: image[names[nameCounter]].width,
                            height: image[names[nameCounter]].height,
                            topX: findX(j,x, image[names[nameCounter]].width),
                            topY: findY(i,y, image[names[nameCounter]].height)
                };

                upgrades[i][j] = new Button2(pos, image[names[nameCounter]], this.buyUpgrade.bind(this));
                nameCounter++;
            }
        }

        buyMenu.push(upgrades);

        //////////////////////////////////////////
        //              unavalible
        ///////////////////////////////////////////

        var unavailabe = [[0,0,0],[0,0,0],[0,0,0]];

        for(i = 0; i < 3; i++){
                for(var k = 0; k < 3; k++){ 
                    pos = {     width: image.unavalible.width,
                                height: image.unavalible.height,
                                topX: findX(k,x, image[names[nameCounter]].width),
                                topY: findY(i,y, image[names[nameCounter]].height)
                     };
                    unavailabe[i][k] = new Button2(pos, image.unavalible, undefined); 
                }
            }

        
        buyMenu.push(unavailabe);

        //////////////////////////////////////////
        //              bought
        ///////////////////////////////////////////

        var bought = [[0,0,0],[0,0,0],[0,0,0]];
        nameCounter = 9;
        for(i = 0; i < 3; i++){
                for(var l = 0; l < 3; l++){ 
                    
                    pos = {     width: image[names[nameCounter]].width,
                            height: image[names[nameCounter]].height,
                            topX: findX(l,x, image[names[nameCounter]].width),
                            topY: findY(i,y, image[names[nameCounter]].height)
                     };

                    bought[i][l] = new Button2(pos, image[names[nameCounter]], undefined);
                    nameCounter++;
                }
            }

       
        buyMenu.push(bought);
    }


    this.displays.push(new Display2(buttons, buyMenu));


};

function findX(j,x, width){
    return (j*110) + g_canvasW/2 - (2*(110)+width)/2 - 15;
}

function findY(i,y, height){
    return (i*110) + g_canvasH/2 - (2*(110)+height)/2;
}

//var coc = new Coconut({width:35, height:43, topX:300, topY:300,this.coconutImage,undefined);
gameEngine2.prototype.update = function(time){

    var currentCurrency = this.userdata.getCurrency();
    var currency = this.calculator.calculateCurrency(time,this.userdata.getCurrency(),this.userdata.getCurrFactor());
    var gained = currency - currentCurrency;
    if (this.isFriend) {    
        this.score += gained;
        this.userdata.score = this.score;
    }

    if(this.displayScreen === this.lvl1){

        for(var i = 0; i < gained && i < 1; i++){


            for(var j = 0; j<4; j++){

                this.displays[this.displayScreen].sprites[0][j].shouldAnimate = true;
            }   

            var pos = { width: this.coconutImage.width,
                        height: this.coconutImage.height,
                        topX: coconutPos.x,
                        topY: coconutPos.y
                   };

            var coconut = new Coconut(pos,this.coconutImage,undefined);
            this.displays[this.displayScreen].createCoconut(coconut);
        }

    }else if(this.displayScreen === this.lvl2){

        for(var i = 0; i < gained/5 && i < 1; i++){

            var pos = { width: this.coconutImage.width,
                        height: this.coconutImage.height,
                        topX: coconutPos.x-100,
                        topY: coconutPos.y+80
                   };

            var coconut = new Coconut(pos,this.coconutImage,undefined);
            this.displays[this.displayScreen].createCoconut(coconut);
        }

    }else{
        this.displays[this.displayScreen].destroyCoconuts();
    }
    
    if (this.isFriend) {
        this.userdata.setCurrency(currency);
    } 
    this.displays[this.displayScreen].update(time);

};

gameEngine2.prototype.render = function(){
        
    this.displays[this.displayScreen].render(this.userdata.currency, this.score, this.isFriend);
    //
    if(this.displayScreen === this.lvl1){
        this.displays[this.displayScreen].renderSprites(this.userdata.upgrades1);
    }else if(this.displayScreen === this.lvl2){
        this.displays[this.displayScreen].renderSprites(this.userdata.upgrades2);
    }

    if(this.displayScreen === this.UpgrLvl1){

        this.displays[this.displayScreen].renderUpgrades(this.userdata.upgrades1, this.calculator.prices1);
    }else if( this.displayScreen === this.UpgrLvl2){
        this.displays[this.displayScreen].renderUpgrades(this.userdata.upgrades2, this.calculator.prices2);
    } 
};

gameEngine2.prototype.receiveInputs = function(e){

    if(this.displayScreen === this.UpgrLvl1){
        this.displays[this.displayScreen].findButtonForClick(e,this.userdata.upgrades1);

    }else if( this.displayScreen === this.UpgrLvl2){
        this.displays[this.displayScreen].findButtonForClick(e,this.userdata.upgrades2);
    }else{
        this.displays[this.displayScreen].findButtonForClick(e);
    }
    //implementa
};

gameEngine2.prototype.buyUpgrade = function(index){  
    if (this.isFriend) {

        if(this.displayScreen === this.UpgrLvl1){


            if(this.userdata.currency >= this.calculator.prices1[index[0]][index[1]]){
                

                if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

                    this.audio.purchase.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
                    this.audio.purchase.cloneNode().play();
                }

                if(index[0] === 0 && index[1] === 2){
                    
                    this.displays[this.lvl2].showArrow = true;
                    this.displays[this.lvl1].showArrow = true;

                }
                this.userdata.upgrades1[index[0]][index[1]] = 2;

                if(index[0] === 0){
                    if(index[1] !== 2){
                        this.userdata.upgrades1[index[0]][index[1]+1] = 1;
                        this.userdata.upgrades1[index[0]+1][index[1]+1] = 0;
                    }
                }

                if(index[0] !== 2){
                    this.userdata.upgrades1[index[0]+1][index[1]] = 1;
                }
                if(index[0] < 1){
                    this.userdata.upgrades1[index[0]+2][index[1]] = 0;
                }
                if(index[1]< 1 && index[0] === 0 ){
                    this.userdata.upgrades1[index[0]][index[1]+2] = 0;
                }


                this.userdata.currency -= this.calculator.prices1[index[0]][index[1]];
            
                this.userdata.setCurrFactor(this.calculator.createFactor(this.userdata.getUpgrades1(),this.userdata.getUpgrades2()));
                this.userdata.setTreeFactor(this.calculator.calculateTreeFactor(this.userdata.getUpgrades1(),this.userdata.getUpgrades2()));

                
            }
            else if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

                this.audio.noMoney.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
                this.audio.noMoney.cloneNode().play();
            }

        

        }else if( this.displayScreen === this.UpgrLvl2){

            if(this.userdata.currency >= this.calculator.prices2[index[0]][index[1]]){

                if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

                    this.audio.purchase.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
                    this.audio.purchase.cloneNode().play();
                }

                if(index[0] === 0 && index[1] === 2){
                    
                    this.displays[this.lvl2].showArrow = true;
                    this.displays[this.lvl1].showArrow = true;

                }

                this.userdata.upgrades2[index[0]][index[1]] = 2;

                if(index[0] === 0){
                    if(index[1] !== 2){
                        this.userdata.upgrades2[index[0]][index[1]+1] = 1;
                        this.userdata.upgrades2[index[0]+1][index[1]+1] = 0;
                    }
                }

                if(index[0] !== 2){
                    this.userdata.upgrades2[index[0]+1][index[1]] = 1;
                }
                if(index[0] < 1){
                    this.userdata.upgrades2[index[0]+2][index[1]] = 0;
                }
                if(index[1]< 1 && index[0] === 0 ){
                    this.userdata.upgrades2[index[0]][index[1]+2] = 0;
                }

                this.userdata.currency -= this.calculator.prices2[index[0]][index[1]];
            
                this.userdata.setCurrFactor(this.calculator.createFactor(this.userdata.getUpgrades1(),this.userdata.getUpgrades2()));
                this.userdata.setTreeFactor(this.calculator.calculateTreeFactor(this.userdata.getUpgrades1(),this.userdata.getUpgrades2()));

            }else if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

                this.audio.noMoney.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
                this.audio.noMoney.cloneNode().play();
            }
        

            
        }
    }
    //implementa
};

//láta hann taka inn factor frá´user data. þessi callback milli prótótýpa er vonlaus
gameEngine2.prototype.punch = function(){

    if (this.isFriend) {
        
        this.userdata.currency += 1 * this.userdata.treeFactor;

        this.score += 1 * this.userdata.treeFactor;
        this.userdata.score = this.score;
        if(this.displayScreen === this.lvl1){

            var pos = {     width: this.coconutImage.width,
                            height: this.coconutImage.height,
                                topX: coconutPos.x,
                                topY: coconutPos.y
                       };

            var coconut = new Coconut(pos,this.coconutImage,undefined);
            this.displays[this.displayScreen].createCoconut(coconut);
        }

        if(this.displayScreen === this.lvl2){

            var pos = {     width: this.coconutImage.width,
                            height: this.coconutImage.height,
                                topX: coconutPos.x-100,
                                topY: coconutPos.y+80
                       };

            var coconut = new Coconut(pos,this.coconutImage,undefined);
            this.displays[this.displayScreen].createCoconut(coconut);
        }

        for(var i = 0; i<4; i++){

            this.displays[this.displayScreen].sprites[0][i].shouldAnimate = true;
        }

        if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

            this.audio.punch.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio.punch.cloneNode().play();
        }
    }
};

gameEngine2.prototype.chanceDisplayToLvl2 = function(){
    this.displayScreen = this.lvl2;
    this.displays[this.lvl1].coconuts = [];

    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        this.audio.changeDisp.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
        this.audio.changeDisp.cloneNode().play();
    }
};

gameEngine2.prototype.chanceDisplayToLvl1 = function(){

    this.displayScreen = this.lvl1;

    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        this.audio.changeDisp.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
        this.audio.changeDisp.cloneNode().play();
    }
};

gameEngine2.prototype.chanceDisplayToUpgradeslvl1 = function(){
    if (this.isFriend) {

        this.displayScreen = this.UpgrLvl1;
        this.displays[this.lvl1].coconuts = [];

        if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

            this.audio.changeDisp.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio.changeDisp.cloneNode().play();
        }        
    }
};

gameEngine2.prototype.chanceDisplayToUpgradeslvl2 = function(){

    if (this.isFriend) {
        this.displayScreen = this.UpgrLvl2;
        this.displays[this.lvl1].coconuts = [];

        if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

            this.audio.changeDisp.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio.changeDisp.cloneNode().play();
        }
    }
};



gameEngine2.prototype.chanceDisplayToSettings = function(){
    if (this.isFriend) {    

        this.displayScreen = 4;

        this.displays[0].coconuts = [];

        if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

            this.audio.changeDisp.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
            this.audio.changeDisp.cloneNode().play();
        }
    }
};

gameEngine2.prototype.time = undefined;
gameEngine2.prototype.saveAndRefresh = function(dt){
    this.time += dt;

    if(this.time > 600000){
        if(this.isFriend){


            var refresh = $('#save');
            var field = refresh[0][0];
            var scoreField = refresh[0][1];
    


            this.userdata.score = this.score;
            field.value = this.userdata.createJSONstring();
            scoreField.value = this.score;
            console.log(refresh);
            refresh.submit();
        }

        this.time = 0;
    }
}


gameEngine2.prototype.exitToSettings = function(){
    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        this.audio.exit.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
        this.audio.exit.cloneNode().play();
    }
    
    this.userdata.score = this.score;
    
    var form  = $('.form-settings');
    var submitString = form[0][0];
    var score = form[0][1];
    var checkFr = form[0][2];

    submitString.value = this.userdata.createJSONstring();
    score.value = this.score;
    checkFr.value = (this.isFriend).toString();
    form.submit();
};

gameEngine2.prototype.exit = function(){

    if(Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100 !== 0){

        this.audio.exit.volume = Math.round((this.userdata.settings['audio-slider']/100) * 100) / 100;
        this.audio.exit.cloneNode().play();
    }

    
    
    this.userdata.score = this.score;
    
    var form  = $('.form-settings');
    var submitString = form[0][0];
    var score = form[0][1];
    var checkFr = form[0][2];

    submitString.value = this.userdata.createJSONstring();
    score.value = this.score;
    checkFr.value = (this.isFriend).toString();
    form.submit();

    var exit  = $('#exit');
    var field = exit[0][0];
    var scoreField = exit[0][1];
    var checkFriend = exit[0][2];

    //this.userdata.score = this.score;
    field.value = this.userdata.createJSONstring();
    scoreField.value = this.score;
    checkFriend.value = (this.isFriend).toString();
    exit.submit();
    
};