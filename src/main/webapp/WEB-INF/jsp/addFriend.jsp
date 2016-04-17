<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

    <head>
        <title>Add Friends</title>
        <link rel='stylesheet' href='../../resources/static/css/base.css'></link>
        <link rel='stylesheet' href='../../resources/static/css/addFriend.css'></link>
    </head>
    <body>
	    <p hidden="hidden" id="gamestate">${gamestate}</p> 
	    <script type="text/javascript" src="../../../resources/static/javascript/jquery.js"></script>
	    <script type="text/javascript" src="../../../resources/static/javascript/soundsPreload2.js"></script>
		<script type="text/javascript" src="../../../resources/static/javascript/playTheme.js"></script>

	    <h1>Add Friend</h1>
	    <div class="middle">
		    <form action="/addFriend" method="post">
		    	<h3>${skilabod}</h3>
				<input type="text" name="UserName" placeholder="Enter friend's name..." />
				<p><input type="submit" value="Add +" /></p>
			</form>
			<form action="/menu" method="get">
				<p><input type="submit" value="Back" /></p>
			</form>
		</div>
    </body>
</html>