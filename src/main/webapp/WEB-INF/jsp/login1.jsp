<!DOCTYPE html>

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

    <head>
        <title>LogIn</title>
        <link rel='stylesheet' href='../../resources/static/css/base.css'></link>
        <link rel='stylesheet' href='../../resources/static/css/autheration.css'></link>
    </head>
    <body>
	
	<h1>Log in</h1>
	
	<div class="middle">
		<form:errors path="notandi.*" class="form1"/>
	    
	    <form action="/login" method="post">
	    	<h3>${skilabod}</h3>
			<input class="login" type="text" name="UserName" placeholder="username"/>
			
			<input class="login" type="password" name="PW" placeholder="password"/>
			
			<input type="submit" value="Login" />
			
		</form>
		
		
		<form action="/newRegestry" method="post" class="form2">
			
			<input type="submit" value="Create new User" />
			
		</form>
    </div>
    </body>
</html>
