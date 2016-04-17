package project.service;

import java.sql.SQLException;

import javax.servlet.http.HttpSession;

public class util {

	public boolean isUserAlreadyFriend(String [] friendList, String friend ){
		
		for(int i = 0; i < friendList.length; i++){
			if(friendList[i].equals(friend)){
				return true;
			}
		}
		return false;
	}
	
	public String[] parseFriendsList(String list){
		
		String[] returning =  list.split(",");
		return returning;
	}

	public int[] extractScoresFromData(String data) {
		String[] temp2 =  data.split(",");
		String[] temp = new String[temp2.length-1];
		
		
		for(int i = 1; i< temp2.length; i++){
			temp[i-1] = temp2[i];
		}
		
		int[] returning = new int[temp.length/2];
		
		
		for(int i = 1; i<temp.length; i += 2){
			returning[i/2] = Integer.parseInt(temp[i]);
			
		}
		
		return returning;
	}

	public String[] extractUsersFromData(String data) {
		String[] temp2 =  data.split(",");
		String[] temp = new String[temp2.length-1];
		
		for(int i = 1; i< temp2.length; i++){
			temp[i-1] = temp2[i];
		}
		
		String[] returning = new String[temp.length/2];
		
		for(int i = 0; i<temp.length-1; i += 2){
			
			returning[i/2] = temp[i];
		}
		
		return returning;
	}
	
	
	public String getGameState(DBconnector dbconnector, HttpSession session, String name){
		
		String gamestate = "";
		try {
			gamestate = dbconnector.getGameState(name);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return gamestate;
	}
}
