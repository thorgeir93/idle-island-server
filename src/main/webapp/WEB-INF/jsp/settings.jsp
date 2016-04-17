<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

    <head>
        <title>User Page</title>
        <link rel='stylesheet' href='../../resources/static/css/base.css'></link>
        <link rel='stylesheet' href='../../resources/static/css/settings.css'></link>
    </head>
    <body>
	 <h1>Settings</h1>
    <script type="text/javascript" src="/../../resources/static/javascript/settings2.js"></script>
    <div class="settings">
      <div class="container">
        <hr>
        <form method="post" action="/settings">
          <div class="formgroup">
            <div class="container-slider">
            <c:set var=" pVolume" value="${value}"/>
            <c:set var=" iVolume" value="${value}"/>
            <c:set var=" className"  value="${"audio-on"}"/>
			<c:choose> 
			  <c:when test="${value == 0}">
			    <c:set var="pVolume" value="${"Mute"}"/>
	            <c:set var="iVolume"  value="${"0"}"/>
	            <c:set var="className"  value="${"audio-off"}"/>
			  </c:when>
			  <c:otherwise>
			    <c:set var="pVolume"  value="${value}"/>
	            <c:set var="iVolume"  value="${"value"}"/>
	            <c:set var="className"  value="${"audio-on"}"/>
			  </c:otherwise>
			</c:choose>
			
              <label for="audio-slider" class="label-audio ${className}">Audio</label>
              <p value="33" text="332" class="audio-number ${className}">${pVolume}</p>
            </div>
            <div id="input-slider" class="container-slider">
              <input type="range" name="audio-slider" min="0" max="100" value="${pVolume}" class="audio-slider ${className}">
            </div>
          </div>
          <button type="submit" name="action" value="default">Restore Defaults</button>
  		  <button type="submit" name="action" value="save">Save and back</button>
        </form>
      </div>
    </div>
	    
	</div>

    </body>

</html>