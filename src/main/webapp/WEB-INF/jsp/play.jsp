<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="is" class="level-2-background-mine">
  <head>
    <meta charset="utf-8"/>
    <title>IDLE ISLAND</title>
    <link rel="stylesheet" href="/../../../resources/static/css/base.css"/>
    <link rel="stylesheet" href="/../../../resources/static/css/game.css"/>
  </head>
  <body>
    <p hidden="hidden" id="user">${user}</p>
    <p hidden="hidden" id="userData">${userData}</p>
    <p hidden="hidden" id="isFriend">${isFriend}</p>

    <canvas id="myCanvas"></canvas>
    <div class="buttons">
      <div class="circle-buttons">
        <div class="upg"></div>
        <form method="post" action="/gameSettings" hidden="hidden" class="form-settings">
          <input type="text" id="submitString2" name="submitString"/>
          <input type="text" id="score2" name="score"/>
          <input type="hidden" id="checkFriend2" name="checkFriend"/>
        </form>
        <div class="sett"></div>
      </div>
      <div class="arrows-buttons"></div>
      <!--div.quit-->
    </div>
    
    <form method="POST" action="/exit" id="exit" hidden="hidden">
      <input type="text" id="submitString" name="submitString"/>
      <input type="text" id="score" name="score"/>
      <input type="hidden" id="checkFriend" name="checkFriend"/>
      <div>
        <button class="game-exit"></button>
      </div>
    </form>
    
    <form method="post" action="/refresh" id="save" hidden="hidden">
      <input type="text" id="submitString3" name="submitString3"/>
      <input type="text" id="score3" name="score3"/>
      <button>send</button>
    </form>
    
    <!--button.game-lvl-2-coconutHeap-->
    <div class="backgrounds">
    	<div class="sky"></div>
    	<div class="sea"></div>
    	<div class="mine-wall"></div>
    	<div class="mine-floor"></div>
    </div>
 	<script src="/../../../resources/static/javascript/jquery.js"></script>
    <script src="/../../../resources/static/javascript/imagesPreload2.js"></script>
    <script src="/../../../resources/static/javascript/soundsPreload2.js"></script>
    <script src="/../../../resources/static/javascript/Coconut.js"></script>
    <script src="/../../../resources/static/javascript/Sprite.js"></script>
    <script src="/../../../resources/static/javascript/htmlButtons.js"></script>
    <script src="/../../../resources/static/javascript/Button2.js"></script>
    <script src="/../../../resources/static/javascript/Display2.js"></script>
    <script src="/../../../resources/static/javascript/UserData2.js"></script>
    <script src="/../../../resources/static/javascript/Calculator2.js"></script>
    <script src="/../../../resources/static/javascript/gameEngine4.js"></script>
    <script src="/../../../resources/static/javascript/Initialize3.js"></script>
  </body>
</html>