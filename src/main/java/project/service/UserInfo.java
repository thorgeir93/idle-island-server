package project.service;

public class UserInfo {
	private String UserName;
	private String PW;
	
	public void setPW(String pass){
		this.PW = pass;
	}
	
	public void setUserName(String UN){
		this.UserName = UN;
	}
	
	public String getUserName(){
		return this.UserName;
	}
	
	public String getPW(){
		return this.PW;
	}
}
