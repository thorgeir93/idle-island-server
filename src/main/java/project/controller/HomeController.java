package project.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Objects;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import project.service.UserInfo;
import project.service.DBconnector;
import project.service.util;


//
// The user name and password are not encrypted via http transfer
//

@Controller
public class HomeController {

	private DBconnector DBconn;
	private util util = new util();
	
	@RequestMapping(value="/logout")
	public String logout(HttpSession session){
		
		session.setAttribute("loggedInUser", null);

		return "/login";
		
	}
	
	
	public DBconnector getDBInstance() throws SQLException{
		if( DBconn == null ){
			DBconn = new DBconnector();
			return DBconn;
		} else {
			return DBconn;
		}
	}
	
	/*@RequestMapping(value = "/resturl", method = RequestMethod.GET, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @Transactional(value = "jpaTransactionManager")
    public @ResponseBody List<DomainObject> findByResourceID(@PathParam("resourceID") String resourceID) {*/
	
	@RequestMapping(path="/auth/{username}/{password}", method=RequestMethod.GET)
	@ResponseBody 
	public Boolean authorize(@PathVariable("password") String pw, @PathVariable("username") String un, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		Boolean valid = db.isValidUser(un, pw);
		if( valid ){
			session.setAttribute("user", un);	
		}
		return valid;
	}
	
	
	@RequestMapping(path="/register/{username}/{password}/{userdata}", method=RequestMethod.GET)
	@ResponseBody
	public String register(
			@PathVariable("password") String pw, 
			@PathVariable("username") String un,
			@PathVariable("userdata") String encodedUD,
			HttpSession session) throws SQLException{

		DBconnector db = getDBInstance();
		
		String ud = null;
		try {
			//ud = URLDecoder.decode(encodedUD, "UTF-8");
			
			ud = URLDecoder.decode(encodedUD, "UTF-8").replace("%2E", ".");
			System.out.println("USERDATA: " + ud);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String message = null;
		
		if( un != null && pw != null){
			if( db.isValidUserName(un) ){
				message="This username is already taken :/";
			} else {
				message="Success registry!";
				db.createNewUserWithData(un, pw, ud);
				session.setAttribute("user", un);
			}
		}
		return message;
	}
	
	
	@RequestMapping(path="/userdata/{username}", method=RequestMethod.GET)
	@ResponseBody 
	public String register(@PathVariable("username") String username, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		
		String message = null;
		String userdata = null;
		
		if( username != null ){		
			userdata = db.getGameState(username);
			if( userdata==null ){
				message="user "+username+" has no userdata in server Database!";
			} else {
				message="Userdata is "+userdata;
			}
		} else{
			message="User name is "+username+"not allowed!";
		}
		
		System.out.println(message);
		
		return userdata;
	}
	
	@RequestMapping(path="/userdata/{username}/{score}/{userdata}", method=RequestMethod.GET)
	@ResponseBody 
	public String getuserdata(
			@PathVariable("username") String username,
			@PathVariable("score") String score,
			@PathVariable("userdata") String userdata,
			HttpSession session) throws SQLException{
		
		DBconnector db = getDBInstance();
		
		String message = null;
		String ud = null;
		
		if( username != null ){
			db.setGameState(username, userdata, score);
			////
			//userdata = db.getGameState(username);
			if( userdata==null ){
				message="user "+username+" has no userdata in server Database!";
			} else {
				message="Userdata is "+userdata;
			}
		} else{
			message="User name is "+username+"not allowed!";
		}
		
		System.out.println(message);
		
		return userdata;
	}
	
	@RequestMapping(path="/setuserdata/{username}/{score}/{userdata}", method=RequestMethod.POST)
	@ResponseBody 
	public void setUserData(
			@PathVariable("username") String username,
			@PathVariable("score") String score,
			@PathVariable("userdata") String encodedUD,
			HttpSession session) throws SQLException{
		
		DBconnector db = getDBInstance();
		

		String message = null;
		String ud = null;
		
		try {
			ud = URLDecoder.decode(encodedUD, "UTF-8").replace("%2E", ".");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		if( username != null ){
			db.setGameState(username, ud, score);
			////
			//userdata = db.getGameState(username);
			if( ud==null ){
				message="user "+username+" has no userdata in server Database!";
			} else {
				message="Userdata is "+ud;
			}
		} else{
			message="User name is "+username+"not allowed!";
		}
		
		System.out.println(message);

	}
	
	@RequestMapping(path="/userexist/{username}", method=RequestMethod.GET)
	@ResponseBody 
	public Boolean userExist(@PathVariable("username") String username, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		
		if(db.findUser(username) != null){
			return true;
		} else {
			return false;
		}
	}
	
	
	@RequestMapping(path="/addpending/{requester}/{receiver}", method=RequestMethod.POST)
	@ResponseBody 
	public void friendRequest(
			@PathVariable("requester") String requester,
			@PathVariable("receiver") String receiver,
				HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		System.out.println("Inside add pending...."+
		"The requester is "+requester+
		"And the receiver is "+receiver);
		if( requester!=null && receiver!=null ) {
			db.addToPending(requester, receiver);
		}
	}
	
	@RequestMapping(path="/addfriend/{accepter}/{requester}", method=RequestMethod.POST)
	@ResponseBody 
	public String addFriend(
			@PathVariable("accepter") String accepter,
			@PathVariable("requester") String requester,
				HttpSession session) throws SQLException{
		
		DBconnector db = getDBInstance();
		
		String m;
		
		if(db.findUser(requester) != null){
			String friendList = db.findFriendList(accepter);
			String[] list = this.util.parseFriendsList(friendList);
			//String friendList = db.findFriendList((String)session.getAttribute("loggedInUser"));
			//String[] list = this.util.parseFriendsList(friendList);
			if(util.isUserAlreadyFriend(list, requester)){
				m = "User is already your friend";
			}else{
				m = "User has been added to your friends list";
				db.removeFromPending(accepter, requester);
				db.updateFriendsList(accepter, requester);
				db.updateFriendsList(requester,accepter);
			}
		}else{
			m = "User does not exist";
		}
		return m;
	}
	
	@RequestMapping(path="/rejectrequest/{rejecter}/{requester}", method=RequestMethod.POST)
	@ResponseBody 
	public String rejectFriendRequest(
			@PathVariable("rejecter") String rejecter,
			@PathVariable("requester") String requester,
				HttpSession session) throws SQLException{
		
		DBconnector db = getDBInstance();
		
		String m = null;
		
		/*if(db.findUser(requester) != null){
			db.removeFromPending( rejecter, requester );
			
			String friendList = db.findFriendList(accepter);
			String[] list = this.util.parseFriendsList(friendList);
			//String friendList = db.findFriendList((String)session.getAttribute("loggedInUser"));
			//String[] list = this.util.parseFriendsLisft(friendList);
			if(util.isUserAlreadyFriend(list, requester)){
				m = "User is already your friend";
			}else{
				m = "User has been added to your friends list";
				db.updateFriendsList(accepter, requester);
				db.updateFriendsList(requester,accepter);
			}
		}else{
			m = "User does not exist";
		}*/
		return m;
	}
	
	
	@RequestMapping(path="/gift/{username}/{receiver}/{gift}", method=RequestMethod.POST)
	@ResponseBody 
	public String gift(
			@PathVariable("username") String username,
			@PathVariable("receiver") String receiver,
			@PathVariable("gift") int gift,
				HttpSession session) throws SQLException{
		
		DBconnector db = getDBInstance();
		db.gift(username, receiver, gift);
		
		String m = null;
		
		return m;
	}
	
	
	
	@RequestMapping(path="/pendinglist/{username}", method=RequestMethod.GET)
	@ResponseBody 
	public String getPendinglist(
			@PathVariable("username") String username,
				HttpSession session) throws SQLException{
		
		DBconnector db = getDBInstance();
		
		String res = db.getPendinglist( username );
		
		System.out.println("Pending list is -> "+res);

		return res;
	}
	
	
	@RequestMapping(path="/friendlist/{username}", method=RequestMethod.GET)
	@ResponseBody 
	public String getFriendlist(
			@PathVariable("username") String username,
				HttpSession session) throws SQLException{
	
		DBconnector db = getDBInstance();
		String res = db.findFriendList(username);
		
		//TODO: do it more efficient code her below 
		String[] splittedRes = res.split(",");
		System.out.println("splittedRes.length" + splittedRes.length);
		System.out.println("splittedRes[0]" + splittedRes[0]);
		if(splittedRes.length > 1){
				
			// removes the first friend, because it is
			// the current user itself.
			String[] splitRes = res.split(",",2);
			
			System.out.println("Friend list is -> "+splitRes[1]);
	
			return splitRes[1];
		} else {
			return null;
		}
	}
	
	

	
	
	/*@RequestMapping(path="/createuser/{username}/{password}", method=RequestMethod.GET)
	@ResponseBody 
	public String register(@PathVariable("password") String pw, @PathVariable("username") String un, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		
		String message = null;
		
		if( un != null && pw != null){
			if( db.isValidUserName(un) ){
				message="This username is already taken :/";
			} else {
				message="Success registry!";
				db.createNewUser(un, pw);
				session.setAttribute("user", un);
			}
		}
		return message;
	}*/
	
	
	
	
	
	
	public Boolean auth(String un, String pw){
		return true;
	}
	
	
	
	
	@RequestMapping(value="/")
	@ResponseBody
	public String redirectToLogin(){
		//System.out.print("1001");
		return "Hallo thetta er server!";
	}
	
	@RequestMapping(value="/login", method = RequestMethod.GET)
	public String displayLogInPage(Model model, HttpSession session) throws SQLException{
		//db = new DBconnector();
		/*ModelAndView jsp = new ModelAndView("login1");
		System.out.print("hallo");*/
		return "login";
	}
	
	@RequestMapping(value="/login", method = RequestMethod.POST)
	public String Authorize(@ModelAttribute("notandi") UserInfo notandi, BindingResult result, Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		if(result.hasErrors()){
			return "login";
		}
		
		if(db.isValidUser(notandi.getUserName(), notandi.getPW())){
			String Message = notandi.getPW()+" thetta test";
			model.addAttribute("skilabod", Message);
			session.setAttribute("loggedInUser", notandi.getUserName());
			System.out.println("ege er herna nuna hvad er ad");
			return "redirect:/menu";
		}else{
			model.addAttribute("skilabod", "Invalid credentials");
			return "login";
		}
	}
	
	
	

	@RequestMapping(value="/newRegestry")
	public String registerNewUser(Model model, HttpSession session){
		
		return "register";
	}
	
	@RequestMapping(value="/menu")
	public String displayMenu(Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String gamestate = this.util.getGameState( db, session, session.getAttribute("loggedInUser").toString() );
		model.addAttribute("gamestate", gamestate);

		session.getAttribute("loggedInUser");
		model.addAttribute("skilabod", session.getAttribute("loggedInUser")+ " er skradur inn");
		
		return "menu";
	}
	
	@RequestMapping(value = "/addFriend", method = RequestMethod.GET)
	public String addFirend(Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String gamestate = this.util.getGameState( db, session, session.getAttribute("loggedInUser").toString() );
		model.addAttribute("gamestate", gamestate);
		
		return "addFriend";
	}
	
	@RequestMapping(value = "/addFriend", method = RequestMethod.POST)
	public String addFirends(@ModelAttribute("UserName") String user, Model model, HttpSession session)throws SQLException{
		DBconnector db = getDBInstance();
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String gamestate = this.util.getGameState( db, session, session.getAttribute("loggedInUser").toString() );
		model.addAttribute("gamestate", gamestate);
		
		String m; 
		
		if(db.findUser(user) != null){
			String friendList = db.findFriendList((String)session.getAttribute("loggedInUser"));
			String[] list = this.util.parseFriendsList(friendList);
			if(util.isUserAlreadyFriend(list, user)){
				m = "User is already your friend";
			}else{
				m = "User has been added to your friends list";
				db.updateFriendsList(session.getAttribute("loggedInUser").toString(), user);
				db.updateFriendsList(user, session.getAttribute("loggedInUser").toString());
			}
		}else{
			m = "User does not exist";
		}
		
		model.addAttribute("skilabod", m);
		
		return "addFriend";
	}
	
	@RequestMapping(value="/registered")
	public String RegisterSuccess(@ModelAttribute("notandi") UserInfo notandi, BindingResult result, Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		String Message = "ny skraning tokst fyrir notenda";
		model.addAttribute("skilabod", Message);
		
		if(notandi.getUserName().contains(",")){
			model.addAttribute("skilabod", "Username contains ','");
			return "register";
		}
		
		String gamestate = this.util.getGameState( db, session, notandi.getUserName() );
		model.addAttribute("gamestate", gamestate);
		
		if(db.registrationSuccess(notandi.getUserName(), notandi.getPW())){
			db.createNewUser(notandi.getUserName(), notandi.getPW());
			
			session.setAttribute("loggedInUser", notandi.getUserName());
			return "redirect:/menu";
		}else{
			model.addAttribute("skilabod", "already taken choose another username");
			return "register";
		}
		
	}
	
	
	@RequestMapping(value="/settings", method = RequestMethod.GET)
	public String settings( Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		int settings = db.getSettings((String) session.getAttribute("loggedInUser"));

		String Message = "inn i settings";
		model.addAttribute("value", settings);
		model.addAttribute("skilabod", Message);
		return "settings";
	}
	
	@RequestMapping(value="/settings", method = RequestMethod.POST)
	public String settingspost(@ModelAttribute("action") String value,@ModelAttribute("audio-slider") int volume,  Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		db.setSettings(session.getAttribute("loggedInUser").toString(), volume);
		
		if(value.equals("save")){
			return "redirect:/menu";
		}else if(value.equals("default")){
			db.setSettings(session.getAttribute("loggedInUser").toString(), 20);
			return "redirect:/settings";
		}
		return "settings";

	}
	
	
	@RequestMapping(value="/highScores", method = RequestMethod.POST)
	public String highScores(@ModelAttribute("select") int value, Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String gamestate = this.util.getGameState( db, session, session.getAttribute("loggedInUser").toString() );
		model.addAttribute("gamestate", gamestate);
		
		String[] users = null;
		int[] scores = null;
		String data = null;
		
		if(value == 1){
			data = db.findHighScoreForALL();
		}else{
			String friendList = db.findFriendList((String)session.getAttribute("loggedInUser"));
			String[] list = this.util.parseFriendsList(friendList);
			data = db.findHighScoreForUser((String)session.getAttribute("loggedInUser"),list);
		}
		
		users = this.util.extractUsersFromData(data);
		scores = this.util.extractScoresFromData(data);
		LinkedHashMap<String, Integer> userScores = new LinkedHashMap<String, Integer>();
		
		for(int i = 0; i<users.length;i++){
			userScores.put(users[i],scores[i]);
			System.out.println("user = " + users[i]+" score = "+scores[i]);
		}
		
		
		
		model.addAttribute("data", userScores);
		String Message = "inn i highScores";
		model.addAttribute("skilabod", Message);
		return "highScores";
	}
	
	@RequestMapping(value="/highScores", method = RequestMethod.GET)
	public String highScores( Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		
		
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String gamestate = this.util.getGameState( db, session, session.getAttribute("loggedInUser").toString() );
		model.addAttribute("gamestate", gamestate);
		
		String Message = "inn i highScores";
		model.addAttribute("skilabod", Message);
		return "highScores";
	}
	
	
	@RequestMapping(value="/viewFriends", method = RequestMethod.GET)
	public String viewFriends( Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String gamestate = this.util.getGameState( db, session, session.getAttribute("loggedInUser").toString() );
		model.addAttribute("gamestate", gamestate);
		
		String friendList = db.findFriendList((String)session.getAttribute("loggedInUser"));
		String[] list = this.util.parseFriendsList(friendList);
		
		model.addAttribute("users", list);
		for(int i = 0; i<list.length;i++){
			model.addAttribute("user"+(i+1), list[i]);
			System.out.println(list[i]);
		}
		
		return "viewFriends";
	}
	
	/*@RequestMapping(value="/viewFriends", method = RequestMethod.POST)
	public String chooseFriend(@ModelAttribute("who") String chosen, Model model, HttpSession session) throws SQLException{
		
		
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String gamestate = db.getGameState(chosen);
		model.addAttribute("user",chosen);
		model.addAttribute("userData", gamestate);
		model.addAttribute("isFriend", true);
		
		return "play";
	}
	*/

	
	
	
	@RequestMapping(value="/refresh", method = RequestMethod.POST)
	public String goggafaggi(
				@ModelAttribute("submitString3") String submitString, 
				@ModelAttribute("score3") String score, Model model,
				HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		System.out.println("halo er ekki thad godur leikur");
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String UN = session.getAttribute("loggedInUser").toString();
		    
		db.setGameState(UN, submitString, score);
		
		return "redirect:/play";
	}
	
	@RequestMapping(value="/play")
	public String play( Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String UN = session.getAttribute("loggedInUser").toString();
		String gamestate;
		gamestate = db.getGameState(UN);


		model.addAttribute("user",UN);
		model.addAttribute("userData", gamestate);
		model.addAttribute("isFriend", false);
		return "play";
	}
	
	
	
	@RequestMapping(value="/exit", method = RequestMethod.POST)
	public String exitGame(@ModelAttribute("submitString") String submitString, @ModelAttribute("score") String score, @ModelAttribute("checkFriend") boolean checkFriend, Model model, HttpSession session) throws SQLException{
		DBconnector db = getDBInstance();
		
		if(session.getAttribute("loggedInUser") == null){
			return "redirect:/login";
		}
		
		String UN = session.getAttribute("loggedInUser").toString();
		if (checkFriend) {
		    
		    db.setGameState(UN, submitString, score);
		    	return "redirect:/menu";
		  } else {
			  return "redirect:/viewFriends";
		  }
		}
	}
