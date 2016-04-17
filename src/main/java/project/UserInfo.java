package project;

public class UserInfo {
	private String UservName;
	private String PvW;
	
	public void setPW(String pass){
		this.PvW = pass;
	}
	
	public void setUserName(String UN){
		this.UservName = UN;
	}
	
	public String getUsername(){
		return this.UservName;
	}
	
	public String getPW(){
		return this.PvW;
	}
}
