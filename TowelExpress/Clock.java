public class Clock{
	private int hr,
				min,
				sec;
	public Clock(){
		hr=12;
		min=00;
		sec=00;
	}
	public void printTime(){
		System.out.println(hr+":"+min+":"+sec);
	}
}