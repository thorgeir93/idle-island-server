package project.service;

import java.sql.Array;
import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.*;
import org.springframework.boot.json.JsonParserFactory;


//
//
//	INFORMATION	
//		pending table
//			- status column
//				+ 0: no request
//				+ 1: waiting for response
//				+ 2: request was reject
//				+ 3: accept




public class DBconnector {

	private Connection connection;
	private boolean isConnected = false;
	private Security security = new Security();
	
	
	public DBconnector() throws SQLException{
		
		if(this.isConnected){
			return;
		}
		this.connection = null;
		

		try {

			//this.connection = DriverManager.getConnection(
			//		"jdbc:postgresql://localhost:5432/postgres", "postgres","1234");
			this.connection = DriverManager.getConnection(
					"jdbc:postgres://kakguotrzpwkpj:sGn4MZYX6CL1gJoNTUwLx1Q5Xz@ec2-54-225-111-9.compute-1.amazonaws.com:5432/d7ddgflvauj7k3", "kakguotrzpwkpj","sGn4MZYX6CL1gJoNTUwLx1Q5Xz");
			

		} catch (SQLException e) {

			e.printStackTrace();
			return;

		}
		
		initTables();
		this.isConnected = true;
		
	}
	
	private void initTables() throws SQLException{
		Statement stmt = null;
	    String user = "CREATE TABLE IF NOT EXISTS users " +
                "(id VARCHAR(255), " +
                " username VARCHAR(255), " + 
                " password VARCHAR(255), " +
                " PRIMARY KEY ( id ))";
	    
	    try {
	    	
	        stmt = this.connection.createStatement();
	        stmt.executeUpdate(user);
	        
	    } catch (SQLException e ) {
	        System.out.print("ohh o, eitthvad for urskedis");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    
	    String gameState = "CREATE TABLE IF NOT EXISTS gameState " +
                "(id VARCHAR(255), " +
                " gameState VARCHAR(2000),"
                + "score INTEGER,"
                + "PRIMARY KEY ( id ))";
	    
	    try {
	    	
	        stmt = this.connection.createStatement();
	        stmt.executeUpdate(gameState);
	        
	    } catch (SQLException e ) {
	        System.out.print("ohh o, eitthvad for urskedis");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    
	    String friends = "CREATE TABLE IF NOT EXISTS friends " +
                "(id VARCHAR(255),  " +
                " friendID VARCHAR(255000),"
                + "PRIMARY KEY ( id ))";
	    
	    try {
	    	
	        stmt = this.connection.createStatement();
	        stmt.executeUpdate(friends);
	        
	    } catch (SQLException e ) {
	        System.out.print("ohh o, eitthvad for urskedis");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	   
	    //foreign key represents that the requester must be in the
	    //table users.
	    String pending = "CREATE TABLE IF NOT EXISTS pending " +
                "(requester VARCHAR(255), "+
                " receiver VARCHAR(255), "+
                " status INTEGER, "+
                " FOREIGN KEY(requester) REFERENCES users(id))";
	    
	    try {
	    	
	        stmt = this.connection.createStatement();
	        stmt.executeUpdate(pending);
	        
	    } catch (SQLException e ) {
	    	 System.out.println("e-> " + e);
	        System.out.println("ohh o, eitthvad for urskedis");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }   
	}
	
	
	public void addToPending(String requester, String receiver){
		
		PreparedStatement pst;
	    Statement stmt = null;
	    
	    try {
	    	
	    	System.out.println("Requester is " + requester+" and receiver is  "+receiver);
	    	
	    	pst = this.connection.prepareStatement("insert into pending (requester, receiver, status) "
	    			+ "values(?,?,?)");
	    
			pst.setString(1, requester);
			pst.setString(2, receiver);
			pst.setInt(3, 1); //status = waiting for response
	    	
	        pst.executeUpdate();
	        
	        System.out.println("ADD PENDING SUCCESS!");
	        
	    } catch (SQLException e ) {
	    	System.out.println("e->"+e);
	        System.out.println("add to pending table failed!");
	    } finally {
	        if (stmt != null) { try {
				stmt.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} }
	    }
	}

	public void removeFromPending(String rejecter, String requester){

		PreparedStatement pst;
	    Statement stmt = null;
	    
	    try {
	    	pst = this.connection.prepareStatement(
	    			"DELETE FROM pending WHERE receiver=? AND requester=?");
	    
			pst.setString(1, rejecter);
			pst.setString(2, requester);
	    	
	        pst.executeQuery();
	        
	        System.out.println("REMOVE FROM PENDING SUCCESS!"+
	        "Rejecter is "+rejecter+" and requester is "+requester);
	        
	    } catch (SQLException e ) {
	        System.out.println("e->"+e);
	        System.out.println("remove from pending table failed!");
	    } finally {
	        if (stmt != null) { try {
				stmt.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} }
	    }
	}
	
	
	public String getPendinglist(String username){
		
		PreparedStatement pst;
	    Statement stmt = null;
	    
	    String res = "";
	    
	    try {
	    	//TODO: there is strange request receiver thing.
	    	pst = this.connection.prepareStatement(
	    			"SELECT requester FROM pending WHERE receiver=?");
	    
			pst.setString(1, username);
	        
	        ResultSet rs = pst.executeQuery();
	       
	        ResultSetMetaData rsmd = rs.getMetaData();
	        int columnsNumber = rsmd.getColumnCount();
	        while (rs.next()) {
	            for (int i = 1; i <= columnsNumber; i++) {
	                if (i > 1) System.out.print(",  ");
	                res = res+rs.getString(i)+",";
	                System.out.print(rs.getString(i) + " " + rsmd.getColumnName(i));
	            }
	            System.out.println(res);
	        }

	        /*while (rs.next()) {
	        	String a = rs.getString("username");
	        	System.out.println("AAAAA->"+a);
	        	res = res+","+a;
	        }*/
	    } catch (SQLException e ) {
	        System.out.println("find user failed");
	        System.out.println(e);
	    } finally {
	        if (stmt != null) { try {
				stmt.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} }
	    }
	    
	    return res;
	}
	
	
	
	public boolean isValidUser(String UN, String PW)throws SQLException {

		PreparedStatement pst;
	    Statement stmt = null;
	    
	    String TableUN = null;
	    String TablePW = null;
	    
	    try {
	    	pst = this.connection.prepareStatement("select username, password " +
	                   "from users "+
	                   "where username = ? AND password = ?");
	    
			pst.setString(1, UN);
		    pst.setString(2, this.security.hashPassword(PW));
	    	
	        ResultSet rs = pst.executeQuery();
	        while (rs.next()) {
	            TableUN = rs.getString("username");
	            TablePW = rs.getString("password");
	            System.out.println(" gogn fra toflu: "+TableUN+ " "+TablePW);
	        }
	    } catch (SQLException e ) {
	        System.out.println("isValid user fail!");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		return (!(TableUN == null && TablePW == null));
	}
	
	
	public boolean isValidUserName(String UN)throws SQLException {

		PreparedStatement pst;
	    Statement stmt = null;
	    
	    String TableUN = null;
	    
	    try {
	    	pst = this.connection.prepareStatement("select username " +
	                   "from users "+
	                   "where username = ?");
	    
			pst.setString(1, UN);
	    	
	        ResultSet rs = pst.executeQuery();
	        while (rs.next()) {
	            TableUN = rs.getString("username");
	            System.out.println(" gogn fra toflu: "+TableUN);
	        }
	    } catch (SQLException e ) {
	        System.out.println("isValid username fail!");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		return (!(TableUN == null));
	}
	
	/*public String getGameState(String UN) throws SQLException {
		PreparedStatement pst;
	    Statement stmt = null;
	    String gamestate = "nothing";
	    
	    
	    try {
	    	pst = this.connection.prepareStatement("SELECT gamestate FROM gamestate WHERE id = ? ");
			pst.setString(1, UN);
	    	
	        ResultSet rs = pst.executeQuery();
	        while (rs.next()) {
	            gamestate = rs.getString("gamestate");
	        }
	    } catch (SQLException e ) {
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		return gamestate;
	}*/
	
	public String getGameState(String UN) throws SQLException {
		PreparedStatement pst;
	    Statement stmt = null;
	    String gamestate = "nothing";
	    
	    
	    try {
	    	pst = this.connection.prepareStatement("SELECT gamestate FROM gamestate WHERE id = ? ");
			pst.setString(1, UN);
	    	
	        ResultSet rs = pst.executeQuery();
	        while (rs.next()) {
	            gamestate = rs.getString("gamestate");
	        }
	    } catch (SQLException e ) {
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		return gamestate;
	}

	public boolean registrationSuccess(String UN, String PW) throws SQLException {
		PreparedStatement pst;
	    Statement stmt = null;
	    
	    String TableUN = null;
	    String TablePW = null;
	    
	    try {
	    	pst = this.connection.prepareStatement("select username, password " +
	                   "from users "+
	                   "where username = ? AND password = ?");
	    
			pst.setString(1, UN);
		    pst.setString(2, security.hashPassword(PW));
	    	
	        ResultSet rs = pst.executeQuery();
	        while (rs.next()) {
	            TableUN = rs.getString("username");
	            TablePW = rs.getString("password");
	            System.out.println(" gogn fra toflu: "+TableUN+ " "+TablePW);
	        }
	    } catch (SQLException e ) {
	        System.out.println("isValid user fail!");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		return (TableUN == null && TablePW == null);
	}

	public void createNewUserWithData(String UN, String PW, String UD)throws SQLException {

		PreparedStatement pst;
	    Statement stmt = null;
	    
	    try {
	    	pst = this.connection.prepareStatement("insert into users (id, username, password) "
	    			+ "values(?,?,?)");
	    
			pst.setString(1, UN);
			pst.setString(2, UN);
		    pst.setString(3, security.hashPassword(PW));
	    	
	        pst.executeUpdate();
	        
	    } catch (SQLException e ) {
	        System.out.println("createNewUser failed!");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    try {
	    	pst = this.connection.prepareStatement("insert into gameState (id, gamestate, score) "
	    			+ "values(?,?,0)");
	    
			pst.setString(1, UN);
			pst.setString(2, UD);
	    	
	        pst.executeUpdate();
	        System.out.println("hallo");
	    } catch (SQLException e ) {
	        System.out.println("createNewUser failed!");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    try {
	    	pst = this.connection.prepareStatement("insert into friends (id, friendid) "
	    			+ "values(?,?)");
	    
			pst.setString(1, UN);
			pst.setString(2, UN);
	    	
	        pst.executeUpdate();
	        
	    } catch (SQLException e ) {
	        System.out.println("createNewUser failed!");
	        System.out.println(e);
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		
	    return;
	}
	
	
	public void createNewUser(String UN, String PW)throws SQLException {

		PreparedStatement pst;
	    Statement stmt = null;
	    
	    try {
	    	pst = this.connection.prepareStatement("insert into users (id, username, password) "
	    			+ "values(?,?,?)");
	    
			pst.setString(1, UN);
			pst.setString(2, UN);
		    pst.setString(3, security.hashPassword(PW));
	    	
	        pst.executeUpdate();
	        
	    } catch (SQLException e ) {
	        System.out.println("createNewUser failed!");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    try {
	    	pst = this.connection.prepareStatement("insert into gameState (id, gamestate, score) "
	    			+ "values(?,?,0)");
	    
			pst.setString(1, UN);
			//pst.setString(2, "{\"userName\": \""+UN+"\", \"upgrades1\": [[1,0,3],[0,3,3],[3,3,3]], \"upgrades2\": [[1,0,3],[0,3,3],[3,3,3]], \"currency\": 0, \"settings\": {\"audio-slider\": 20}, \"currFactor\": 0, \"treeFactor\": 1, \"timestamp\": "+ System.currentTimeMillis() +",\"score\":0 }");
			//pst.setString(2, "{"available":1,"bought":2,"currFactor":0.0,"currency":11,"level":1,"numBoughtItems":0,"numItems":6,"numLevel":2,"userName":"ng","settings":{"nameValuePairs":{"volume":50.0,"mute":0.0}},"upgrades":[{"available":true,"level":1,"prices":[[10,2500,150000],[1000,15000,250000],[5000,100000,500000]],"upgrades":[[1,0,0],[0,0,0],[0,0,0]]},{"available":true,"level":2,"prices":[[300000,1000000,8000000],[700000,2000000,25000000],[1500000,10000000,100000000]],"upgrades":[[1,0,0],[0,0,0],[0,0,0]]}],"treeFactor":1.0,"unreachable":0,"score":11,"timestamp":10140629079150}");
	    	
	        pst.executeUpdate();
	        System.out.println("hallo");
	    } catch (SQLException e ) {
	        System.out.println("createNewUser failed!");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    try {
	    	pst = this.connection.prepareStatement("insert into friends (id, friendid) "
	    			+ "values(?,?)");
	    
			pst.setString(1, UN);
			pst.setString(2, UN);
	    	
	        pst.executeUpdate();
	        
	    } catch (SQLException e ) {
	        System.out.println("createNewUser failed!");
	        System.out.println(e);
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		
	    return;
	}

	public void updateFriendsList(String User, String friend) throws SQLException {
		
		PreparedStatement pst = null;
	    Statement stmt = null;
	   
	    String friendid = null;
	    		
	    try {
	    	pst = this.connection.prepareStatement("select friendid from friends where id = ?");
	    
			pst.setString(1, User);
	        
			 ResultSet rs = pst.executeQuery();
		        while (rs.next()) {
		        	friendid = rs.getString(1);
		        }
	    } catch (SQLException e ) {
	        System.out.println("updateFriendsList failed!");
	        System.out.println(e);
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    
	    friendid += ","+friend;
	    
	    
	    try {
	       	pst = this.connection.prepareStatement("update friends set friendid = ? where id = ?");
	       	
	       	pst.setString(1, friendid);
	       	pst.setString(2, User);
	        pst.executeUpdate();
	    	        
	    } catch (SQLException e ) {
	       	System.out.println("updateFriendsList failed 2!");
	        System.out.println(e);
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		
		
	}

	public String findUser(String user) throws SQLException {
		
		PreparedStatement pst;
	    Statement stmt = null;
	    
	    String TableUN = null;
	    
	    try {
	    	pst = this.connection.prepareStatement("Select username from users where username = ? ");
	    
			pst.setString(1, user);
			
	        ResultSet rs = pst.executeQuery();
	        while (rs.next()) {
	            TableUN = rs.getString("username");
	        }
	        
	    } catch (SQLException e ) {
	        System.out.println("find user failed");
	        System.out.println(e);
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    return TableUN;
	}
	
public String findFriendList(String user) throws SQLException {
		
		PreparedStatement pst;
	    Statement stmt = null;
	    
	    String TableFL = null;
	    
	    try {
	    	pst = this.connection.prepareStatement("Select friendid from friends where id = ? ");
	    
			pst.setString(1, user);
			
	        ResultSet rs = pst.executeQuery();
	        while (rs.next()) {
	            TableFL = rs.getString("friendid");
	        }
	        
	    } catch (SQLException e ) {
	        System.out.println("find friendlist failed");
	        System.out.println(e);
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
	    
	    return TableFL;
	}

public String findHighScoreForALL() throws SQLException {
	PreparedStatement pst;
    Statement stmt = null;
    
    String data = null;
    
    try {
    	pst = this.connection.prepareStatement("Select id, score from gamestate order by score desc limit 10");
		
        ResultSet rs = pst.executeQuery();
        
        
        while (rs.next()) {
        	data += ","+rs.getString("id");
            data += ","+Integer.toString(rs.getInt("score"));
        }
        
    } catch (SQLException e ) {
        System.out.println("find user failed");
        System.out.println(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
    
    return data;
}

public String findHighScoreForUser(String user, String[] friends) throws SQLException {
	PreparedStatement pst;
    Statement stmt = null;
    
    String data = null;
    Array listi = this.connection.createArrayOf("varchar", friends);
    
    try {
    	pst = this.connection.prepareStatement("Select id, score from gamestate Where id = ANY(?) order by score desc limit 10");
		
    	pst.setArray(1, listi);
    	
        ResultSet rs = pst.executeQuery();

        while (rs.next()) {
        	data += ","+rs.getString("id");
            data += ","+Integer.toString(rs.getInt("score"));
        }
        
    } catch (SQLException e ) {
        System.out.println("find user failed");
        System.out.println(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
    
    System.out.println(data);
    return data;
}

public void setGameState(String UN, String submitString, String score) throws SQLException {
	PreparedStatement pst;
    Statement stmt = null;
    
    try {
    	pst = this.connection.prepareStatement("UPDATE gamestate SET gamestate = ? WHERE id = ?");
		
    	pst.setString(1, submitString);
    	pst.setString(2, UN);
    	
        pst.executeUpdate();
    
    } catch (SQLException e ) {
        System.out.println("find user failed");
        System.out.println(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
    
    stmt = null;
    
    try {
    	pst = this.connection.prepareStatement("UPDATE gamestate SET score = ? WHERE id = ?");
		
    	pst.setInt(1, Integer.parseInt(score));
    	pst.setString(2, UN);
    	
        pst.executeUpdate();
    
    } catch (SQLException e ) {
        System.out.println("find user failed");
        System.out.println(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
}

public int getSettings(String user) throws SQLException {
	PreparedStatement pst;
    Statement stmt = null;
    
    String data = "";
    int settings = 0;
    
    try {
    	pst = this.connection.prepareStatement("SELECT gamestate FROM gamestate WHERE id=?");
		
    	pst.setString(1, user);
    	
        ResultSet rs = pst.executeQuery();
        int counter  = 0;
        while (rs.next()) {
        	System.out.println(counter);
        	counter++;
        	data += rs.getString("gamestate");
        }
        System.out.println(data);
        JSONObject obj = new JSONObject(data);
        settings = obj.getJSONObject("settings").getInt("audio-slider");


        System.out.println("herna er settings vonandi : "+settings);
        
    } catch (SQLException e ) {
        System.out.println(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
    return settings;
}


public void gift(String UN, String receiver, Integer gift) throws SQLException {
    
	System.out.println("User gift type is " + gift.getClass().getName());
	System.out.println("User gift is " + gift);
    String title = "currency";

    //Update user currency
    //
    String data = getGameState(UN);
    JSONObject gameState = new JSONObject( data );
    
    int userCurrency = gameState.getInt( title );
    double giftFactor = gift.doubleValue() / 100;
    Double giftCurrency = userCurrency*giftFactor;
    int newUserCurrency = userCurrency - giftCurrency.intValue();
    gameState.put(title, newUserCurrency);
    
    int score = gameState.getInt("score");
    String scr = Integer.toString(score);
    setGameState(UN,gameState.toString(), scr);
    
    //Update receiver currency
    //
    String reData = getGameState(receiver);
    JSONObject reGameState = new JSONObject( reData );
    
    int reCurrency = reGameState.getInt( title );
    reCurrency = reCurrency + giftCurrency.intValue();
    reGameState.put(title, reCurrency);
    
    // add the gift to the score
    int reScore = reGameState.getInt("score");
    Integer newScore = reScore + giftCurrency.intValue();
    String reScr = Integer.toString(newScore);
    reGameState.put("score", newScore);
    setGameState(receiver,reGameState.toString(), reScr);
}

public void setSettings(String user, int volume) throws SQLException {

    
    String Settings = getGameState(user);
    JSONObject obj = new JSONObject(Settings).getJSONObject("settings");
    obj.put("audio-slider",volume);
    JSONObject obj2 = new JSONObject(Settings);
    obj2.put("settings",obj);
    int score = obj2.getInt("score");
    String scr = Integer.toString(score);
    
    setGameState(user,obj2.toString(),scr);

    
}
/*var values = [userN];
var query = 
  'SELECT gamestate FROM gamestate WHERE username=$1;';

client.query(query, values, function (err, result) {      
  done();
  if (err) {
    return cb(err);
  } else {
    var newGamestate = JSON.parse(result.rows[0].gamestate);
    return cb(null, newGamestate.settings);
  }
});
});*/



}
