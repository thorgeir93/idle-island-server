<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

    <head>
        <title>LogIn</title>
        <link rel='stylesheet' href='../../resources/static/css/base.css'></link>
    </head>
    
    <body>
    <p hidden="hidden" id="gamestate">${gamestate}</p> 
	<script type="text/javascript" src="../../../resources/static/javascript/jquery.js"></script>
	<script type="text/javascript" src="../../../resources/static/javascript/soundsPreload2.js"></script>
	<script type="text/javascript" src="../../../resources/static/javascript/playTheme.js"></script>
	<div class="menu">
		<h1>Menu</h1>
		<div class="sand"></div>
		<div class="padd">
			<div class="island">
				<div class="options">
					<div class="text">
					
						<form action="/play" method="post">
							<input type="submit" value="Play" />
						</form>
						
						<form action="/highScores" method="get">
							<input type="submit" value="Highscores" />
						</form>
						
					    <form action="/addFriend" method="get">
							<input type="submit" value="Add Friend" />
						</form>
						
						<form action="/viewFriends" method="get">
							<input type="submit" value="View Friends" />
						</form>
						
						<form action="/settings" method="get">
							<input type="submit" value="Settings" />
						</form>
						<br>
						<form action="/logout" method="get">
							<input type="submit" value="Log out" />
						</form>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
