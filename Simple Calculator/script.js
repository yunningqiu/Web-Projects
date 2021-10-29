alert("Hello! This page is a simple calculator.");

/**
This function adds/subtracts/multiplies/divides two user input value.
No parameters.
*/
function compute()
{
	let value_one = Number(document.getElementById("value_one").value);
	let value_two = Number(document.getElementById("value_two").value);
	// get live value of input and convert to number

	if (document.getElementById("plus").checked)
	{
		document.getElementById("result").innerHTML = value_one + value_two;
	}
	// if input addition button

	else if (document.getElementById("minus").checked)
	{
		document.getElementById("result").innerHTML = value_one - value_two;
	}
	// if input minus button

	else if (document.getElementById("multiply").checked)
	{
		document.getElementById("result").innerHTML = value_one * value_two;
	}
	// if input multiplication button

	else if (document.getElementById("divide").checked)
	{
		document.getElementById("result").innerHTML = value_one / value_two;
	}
	// if input division button

}