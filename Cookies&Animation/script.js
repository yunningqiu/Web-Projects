let user_name = "";
let speed = 0;
let color = "red";
window.onload=checkCookie();



/////////////////////////////////////////////////////////////////////////////////////

/**
This function check if cookie user_name is empty.
If so, prompt the user for user_name and set cookie
*/
function checkCookie(){
	if (getCookie("user_name") != ""){
		user_name = getCookie("user_name");
		console.log("checkCookie username" + document.cookie);
	}
	//if checkCookie returns true, cookie for user name exists, use that user_name
	
	else{
		user = prompt("What is your name?", "");
		if (user !== "" && user !== null){
			user_name = user;
			makeCookie("user_name", user_name);
			console.log(document.cookie);
		}
	}
	//if checkCookie returns false, promp for user name and make it into cookie
}


/**
This function returns the value of a specified cookie.
*/
function getCookie(cname) {
	let name = cname + "=";
	let cook = document.cookie;
	let ca = cook.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
	    while (c.charAt(0) === ' ') {
	    	c = c.substring(1);
	    }
		//remove empty space at the beginning
	    if (c.indexOf(name) === 0) {
	        return c.substring(name.length, c.length);
	    }
		//extract the cookie value corresponding to the cookie name
	}
	  return "";
}


/**
This function makes a cookie out of username, speed and color.
It expires in 10 second.
*/
function makeCookie(cname, cvalue){
	let n = new Date(), expires = n;
	expires.setTime(expires.getTime() + (10*1000));
	let cookie_expires = "expires=" + expires.toUTCString() + ";";
	//let the cookie expire in 10 seconds
	
	let cookie_path = "path=/;";

	if (cname === "user_name" && cvalue !== getCookie("user_name")){
		cookie_name = "user_name=" + cvalue + ";";
		document.cookie = cookie_name + cookie_expires + cookie_path;
	}
	// if input "user-name", fill corresponding user_name in cookie

	if (cname === "speed" && cvalue !== getCookie("speed")){
		cookie_speed = "speed=" + cvalue + ";";
		document.cookie = cookie_speed + cookie_expires + cookie_path;
	}
	// if input "speed", fill corresponding speed in cookie

	if (cname === "color" && cvalue !== getCookie("color")){
		cookie_color = "color=" + cvalue + ";";
		document.cookie = cookie_color + cookie_expires + cookie_path;
	}
	// if input "color", fill corresponding color in cookie
}


/////////////////////////////////////////////////////////////////////////////////////


let response = "";
let important = false;

//AJAX call: sought user_name in ”important.txt”
function read_text(){
	let xhttp = new XMLHttpRequest();       //create request object

	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){      //request finished and response ready
			response = xhttp.responseText;
			console.log(response);
			
			let names = response.split('\n');
			for (let i of names){
				if (user_name === i || user_name + '\r' === i){
					important = true;
				}
			}
			// if find the user_name string in name, the arrays of string, set important to true
			console.log(important);
			
			
			if (!important){
				document.getElementById("message").innerHTML = "No greeting for you!";
			}
			// if user_name is not found in important.txt, show text

			else if (important)
			{
				document.getElementById("welcome").innerHTML = "Welcome " + user_name;
				// create the text inside the rectangle
				
				document.getElementById("colorbuttons").style.display="block";
				document.getElementById("speedbuttons").style.display="block";
				document.getElementById("rectangle").style.display="block";
				document.getElementById("container").style.display="block";
				document.getElementById("container").style.width=window.innerWidth;
				// if user name is in important.txt, show the colorbuttons, speedbuttons, container and rectangle
				
				for (let i = 0; i < 51; i++)
				{
					let label = document.createElement('label');
					label.setAttribute('for', i);
					// create radio button labels

					if(i===1 || i===11 || i===21 || i===31 || i===41){
						label.innerHTML = "<br>" + "Speed " + i;
					}
					else{
						label.innerHTML = "Speed " + i;
					}
					// start from new line if Speed equals 1/11/21/31/41

					document.getElementById("speedbuttons").appendChild(label);
					// append labels to fieldset

					let speed = document.createElement('input');
					speed.setAttribute("type", "radio");
					speed.setAttribute("name", "buttons");
					speed.setAttribute("id", i);
					document.getElementById("speedbuttons").appendChild(speed);
					// create radio buttons and append to fieldset
				}
				// create 51 radio buttons using for loop
				
				
				
				let redlabel = document.createElement('label');
				redlabel.setAttribute('for', "red");
				redlabel.innerHTML = "red";
				document.getElementById("colorbuttons").appendChild(redlabel);
				let red = document.createElement('input');
				red.setAttribute("type", "radio");
				red.setAttribute("name", "colorbuttons");
				red.setAttribute("id", "red");
				document.getElementById("colorbuttons").appendChild(red);
				
				let yellowlabel = document.createElement('label');
				yellowlabel.setAttribute('for', "yellow");
				yellowlabel.innerHTML = "yellow";
				document.getElementById("colorbuttons").appendChild(yellowlabel);
				let yellow = document.createElement('input');
				yellow.setAttribute("type", "radio");
				yellow.setAttribute("name", "colorbuttons");
				yellow.setAttribute("id", "yellow");
				document.getElementById("colorbuttons").appendChild(yellow);
				
				let bluelabel = document.createElement('label');
				bluelabel.setAttribute('for', "blue");
				bluelabel.innerHTML = "blue";
				document.getElementById("colorbuttons").appendChild(bluelabel);
				let blue = document.createElement('input');
				blue.setAttribute("type", "radio");
				blue.setAttribute("name", "colorbuttons");
				blue.setAttribute("id", "blue");
				document.getElementById("colorbuttons").appendChild(blue);
				// create three colorbuttons
				
				
				
				document.getElementById("0").setAttribute("checked", true);
				document.getElementById("red").setAttribute("checked", true);
				// set default speed to 0 and default color to red
				
				
				/**
				This function gets the current checked speed and color	
				*/
				function get_speed_color(){
					for (let i = 0; i< 51; i++)
					{
						if (document.getElementById(i).checked === true){
							speed = i;
						}
					}
					// set speed to the checked button color
					
					
					if (document.getElementById("red").checked){
						document.getElementById("rectangle").style.backgroundColor="red";
						color = "red";
					}
					// if red button checked, set color to red
					else if (document.getElementById("yellow").checked){
						document.getElementById("rectangle").style.backgroundColor="yellow";
						color = "yellow";
					}
					// if yellow button checked, set color to yellow
					else if (document.getElementById("blue").checked){
						document.getElementById("rectangle").style.backgroundColor="blue";
						color = "blue";
					}
					// if blue button checked, set color to blue
					
					makeCookie("speed", speed);
					makeCookie("color", color);
				}

				setInterval(get_speed_color, 1000);
				// update new speed and color every second
				
				

				/**
				This function move the triangle every 10 miliseconds, creating an animation
				*/
				(function animation(){
					console.log("in animation");
					
					if (getCookie("speed") !== ""){
						speed = getCookie("speed");
						console.log(speed);
						document.getElementById(speed).setAttribute("checked", true);
					}	
					else{
						get_speed_color();
					}
					// check if speed exists in cookie, if yes use the speed stored in cookie, if no get current checked speed
					
					if (getCookie("color") !== ""){
						color = getCookie("color");
						console.log(color);
						document.getElementById(color).setAttribute("checked", true);
					}
					else{
						get_speed_color();
					}
					// check if color exists in cookie, if yes use the color stored in cookie, if no get current checked color
					

					
					console.log("animation " + document.cookie);
					
					let element = document.getElementById("rectangle");
					let pos = 0;
					let move_right = true;

					setInterval(move, 10);

					
					/**
					This function move the triangle by different speed
					*/
					function move(){								
						if(move_right){
							pos+=speed;
							element.style.left = pos + 'px';
							if(pos>window.innerWidth-300)
								move_right=false;
						}
						
						else if (!move_right)
						{
							pos-=speed;
							element.style.left = pos + 'px';
							if(pos<0)
								move_right=true;
						}
						// alternating the direction once the triangle reaches edges on either side
					}
				})();
				
				

				

			}	
			
		}
	}       //define the function that's called when request sent

	
	
	xhttp.open("GET", "important.txt", true);        //specify the request
	xhttp.send();             //send the request to the server
	
	console.log(important);
}

read_text();

/////////////////////////////////////////////////////////////////////////////////////












