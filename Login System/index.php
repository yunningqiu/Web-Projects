#!/usr/local/bin/php
<?php
	ob_start();
	session_name('HW5');      // name the session
	session_start();        // start a session
	$_SESSION['registered'] = false;
	$_SESSION['loggedin'] = false;
?>


<!DOCTYPE html>
<html lang="en">
<head>
	<title>hello</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
	<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		<fieldset>
			<label for="email">email address:</label>
			<input type="text" class="info" id="email" name="email" pattern="[A-Za-z\d._%+-]+@[A-Za-z\d._%+-]+"/>
			<br>
			<label for="password">password (&ge; 6 characters letters or digits): </label>
			<input type="password" class="indo" id="pass" name="pass" pattern="[A-Za-z\d]{6,}"/>
		</fieldset>
			<input type="submit" value="Register" name="register"/>
			<input type="submit" value="Log in" name="login"/>
	</form>

	<?php
		$found = false;
		$validated = fopen("validated_email.txt", 'r');
		while(!feof($validated)) {              // while still more to read 
			$line = fgets($validated);          // get a line in the file
			$field = explode("\t", $line);        // create array of string for data on one line
			if ($field[0] === $_POST['email']){
				$found = true;
			}
		}
		fclose($validated);
		// check if email exist in validated_email.txt

		if ($found === true) {
			$_SESSION['registered'] = true;
		}
		// if found, set registered to true

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// if click register
		if (isset($_POST['register'])){
			if (isset($_SESSION['registered']) && $_SESSION['registered']){
				?>
				<p> Already registered. Please log in.</p>
			<?php
			}
			// if click register and email has registered and validated before, display message.

			else{
				$n = rand(100, 50000);
				$token = hash('md2', $n);
				$unvalidated = fopen("unvalidated_email.txt", 'a');
				$email = $_POST['email'];
				$pass = hash('md2', $_POST['pass']);
				fwrite($unvalidated, "$email\t$pass\t$token\n");
				fclose($unvalidated);
				//add the email, password and token of this user to the unvalidated_email.txt file

				$validation_url = "http://www.pic.ucla.edu/~yunningqiu/HW5/validate.php?token=$token";
				$mess = 'Validate by clicking here: ';
				$message = "$mess $validation_url";
				mail($_POST['email'], 'validation', $message);
			}
			// if click register and email has not been registered before, add email, password, token to unvalidated file and send the validation link to the email
		}
		
		
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// if click login
		if(isset($_POST['login'])){
			if(isset($_SESSION['registered']) && $_SESSION['registered']){
				$pass = hash('md2', $_POST['pass']);
				checkpass($pass);
			}
			// if click login and email has registered, check if the password matches the record


			else{
				?>
				<p> No such email address. Please register or validate.</p>
			<?php
			}
			// if click login and email has not been registered, display message
		}


		/**
		This function determines if a user's supplied password is correct
		@param string $password the password from the form
		*/
		function checkpass($password){
			$validated = fopen('validated_email.txt', 'r');
			while(!feof($validated)) {              // while still more to read 
				$line = fgets($validated);                 // get a line in the file
				$field = explode("\t", $line);        // create array of string for data on one line
				if ($field[0] === $_POST['email']){
					$true_pass = $field[1];
				}
			}
			fclose($validated);
			// get the correct corresponding password to the email entered

			$true_pass = trim($true_pass);
			// trim white space just in case of weirdness

			if($password === $true_pass){ 
				$_SESSION['loggedin'] = true;
				$email = $_POST['email'];
			    header("Location: welcome.php?email=$email");
			} 
			// if they match, redirect to welcome page

			else { 
			  ?>
				<p> Your password is invalid.</p>
			<?php
			}
			// if bad password, print error message
		}


	?>
</body>
</html>