<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

    <head>
        <title>User Page</title>
    	<link rel='stylesheet' href='../../resources/static/css/base.css'></link>
        <link rel='stylesheet' href='../../resources/static/css/autheration.css'></link>
    </head>
    <body>

	<h1>Create User</h1>

	<div class="middle">
	    
	    <h3>${skilabod}</h3>
	    <form action="/registered" method="post">
			<input type="text" name="UserName" placeholder="username"/>
			
			<input type="password" name="PW" placeholder="password" />
			
			<input type="submit" value="Create" />
			
		</form>
	    
		<form action="/login" method="get">
			<input type="submit" value="Back to login" />
		</form>
	</div>
    </body>

</html>