function nextMarket(date){
				
	const now = new Date(date);
	const year1 = 2019;
	var nextMonth, nextMarket, times, output;
	
	function getOrdinalDay(n) {
		return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
	}
	
	function getFirstSaturday(d){
	
		var date = new Date(d);
		date.setDate(1);
		while (date.getDay() !== 6) {
			date.setDate(date.getDate() + 1);
		}				
		return date;
	}
	
	switch (now.getMonth()){
		case 0:
			nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
			nextMarket = getFirstSaturday(nextMonth);
			output = nextMarket.toLocaleString('en-gb', {weekday:'long'}) + ' ' + getOrdinalDay(nextMarket.toLocaleString('en-gb', {day:'numeric'})) + ' ' + nextMarket.toLocaleString('en-gb', {month:'long',year:'numeric'}) + " 9:00am - 12.30pm<br />Our " + getOrdinalDay(nextMarket.getFullYear() - year1) + " birthday!";
			break;
		case 11:
			nextMarket = getFirstSaturday(now);
			nextMarket.setHours(19,0,0);
			break;
		default:
			nextMarket = getFirstSaturday(now);
			nextMarket.setHours(12,30,0);
	}

	if (now.getMonth() > 0){
		
		if (now < nextMarket) {
			
			if(nextMarket.getMonth() == 11) {
				times = " 12:00pm - 7:00pm";
			}
			else {
				times = " 9:00am - 12:30pm";
			}
			
			if (now.getDay() < nextMarket.getDay()){
				output = nextMarket.toLocaleString('en-gb', {weekday:'long'}) + ' ' + getOrdinalDay(nextMarket.toLocaleString('en-gb', {day:'numeric'})) + ' ' + nextMarket.toLocaleString('en-gb', {month:'long',year:'numeric'}) + times;
			}
			else {
				output = "Today" + times;
			}
			
			if(nextMarket.getMonth() == 1) {
				output += "<br />Our " + getOrdinalDay(nextMarket.getFullYear() - year1) + " birthday!";
			}
		}
		else {
			if (now.getMonth() == 11) {
				nextMonth = new Date(now.getFullYear() + 1, 1 , 1);
				nextMarket = getFirstSaturday(nextMonth);
				output = nextMarket.toLocaleString('en-gb', {weekday:'long'}) + ' ' + getOrdinalDay(nextMarket.toLocaleString('en-gb', {day:'numeric'})) + ' ' + nextMarket.toLocaleString('en-gb', {month:'long',year:'numeric'}) + " 9:00am - 12.30pm<br />Our " + getOrdinalDay(nextMarket.getFullYear() - year1) + " birthday!";
			}
			else {
				nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
				nextMarket = getFirstSaturday(nextMonth);
				
				if(nextMarket.getMonth() == 11) {
					times = " 12:00pm - 7:00pm";
				}
				else {
					times = " 9:00am - 12:30pm";
				}
				
				output = nextMarket.toLocaleString('en-gb', {weekday:'long'}) + ' ' + getOrdinalDay(nextMarket.toLocaleString('en-gb', {day:'numeric'})) + ' ' + nextMarket.toLocaleString('en-gb', {month:'long',year:'numeric'}) + times;
			}
		}
	}
	
	document.getElementById("nextmarket").innerHTML = output;
}

document.onreadystatechange = function() {
	if (document.readyState == "complete") {		
		nextMarket(new Date());		
	}
}