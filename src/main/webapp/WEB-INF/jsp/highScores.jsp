<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en" >

    <head>
        <title>Idle Island</title>
       	<link rel='stylesheet' href='../../resources/static/css/base.css'></link>
        <link rel='stylesheet' href='../../resources/static/css/highscore.css'></link>
    </head>
    <body>
    	<p hidden="hidden" id="gamestate">${gamestate}</p> 
	    <script type="text/javascript" src="../../../resources/static/javascript/jquery.js"></script>
	    <script type="text/javascript" src="../../../resources/static/javascript/soundsPreload2.js"></script>
		<script type="text/javascript" src="../../../resources/static/javascript/playTheme.js"></script>
	
	 <h1>HIGH SCORES</h1>
	<div class="padd">
		<div class="middle">
		    
			<form action="/menu" method="get">
				<input type="submit" value="Back" />
			</form>
		    
		    <br>
		    <h3> Choose which highscores you want to see<h3>
		    
		    <form action="/highScores" method="post">
				<select name="select">
				  <option value="1">All users (global)</option> 
				  <option value="2">Your friends</option>
				</select>
				
				<input type="submit" value="Choose" />
				
			</form>
	    </div>
	    <div class="middle">
	    	<table class="table table-striped">
			  <thead>
			  	<tr>
			  		<th>User</th>
			  		<th>Score</th>
			  	</tr>
			  </thead>
			  
			   <c:forEach items="${data}" var="dats">
			   		<tr>
				  		<th>${dats.key}</th>
				  		<th>${dats.value}</th>
				  	</tr>
			    </c:forEach>
			    
			</table>
	    </div>

		<div class="middle">
			<form action="/menu" method="get">
				<input type="submit" value="Back" />
			</form>
		</div>
	</div>
    </body>

</html>