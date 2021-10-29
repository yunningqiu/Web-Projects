#!/usr/local/bin/php
<?php
	ob_start();
	session_name('HW5'); // continue the session
	session_start(); // start a session
?>

<!DOCTYPE html>
<?php
	if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']) { // if in session and logged in ?>
	  	<html lang="en">
			<head>
			  <meta charset="UTF-8">
			  <title>Welcome</title>
			</head>
			<body>
			  <p>
			  	<?php
				$email = $_GET['email'];
			  	echo 'Welcome. Your email address is ', $email, ".<br>";
			  	echo 'Here is a list of all registered addresses:';
			  	$validated = fopen("validated_email.txt", 'r');
			  	while(!feof($validated)) {                     // while still more to read 
					$line = fgets($validated);                 // get a line in the file
					$field = explode("\t", $line);
					echo $field[0], "\t";
				}
				// print all current emails in the validated_email.txt
				fclose($validated);
			  	?>
			  </p>
			  <form>
			  	<input type="button" value="log out" onclick="location.href='logout.php'">
			  </form>
			</body>
		</html> <?php
	  } 
?>