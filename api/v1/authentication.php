<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    //$response["UserID"] = $session['UserID'];
    //$response["Email"] = $session['Email'];
    //$response["Username"] = $session['Username'];
    //$response["LastName"] = $session['LastName'];
    //$response["FirstName"] = $session['FirstName'];
    echoResponse(200, $session);
});


$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select ID,LastName,FirstName,Email,Password,Username from user where Username='$email' or Email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['Password'],$password)){
            $response['Status'] = "success";
            $response['Message'] = 'Logged in successfully.';
            $response['UserID'] = $user['ID'];
            $response['LastName'] = $user['LastName'];
            $response['FirstName'] = $user['FirstName'];
            $response['Username'] = $user['Username'];
            $response['Email'] = $user['Email'];

            $IsAdmin=false;
            $admin = $db->getOneRecord("select * from admin where UserID=".$response['UserID']);
            if($admin){
                $response['AdminID'] = $admin["ID"];
                $IsAdmin=true;
            }

            if (!isset($_SESSION)) {
                session_start();
            }
            if($IsAdmin){
                $_SESSION['AdminID'] = $admin['ID'];
            }
            $_SESSION['UserID'] = $user['ID'];
            $_SESSION['Email'] = $email;
            $_SESSION['LastName'] = $user['LastName'];
            $_SESSION['FirstName'] = $user['FirstName'];
        } else {
            $response['Status'] = "error";
            $response['Message'] = 'Login failed. Incorrect credentials';
        }
    }else {
            $response['Status'] = "error";
            $response['Message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'lastName' ,'firstName' , 'username', 'password'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $lastName = $r->customer->lastName;
    $firstName = $r->customer->firstName;
    $email = $r->customer->email;
    $password = $r->customer->password;
    $username = $r->customer->username;

    $isUserExists = $db->getOneRecord("select 1 from user where Email='$email' or Username='$username'");
    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "user";
        $column_names = array( 'Email','LastName', 'FirstName', 'Username', 'Password');
        
        $object = (object) [
            'Username' => $username,
            'Email' => $email,
            'LastName' => $lastName,
            'FirstName' => $firstName,
            'Password' => $r->customer->password,
          ];

        $result = $db->insertIntoTable($object, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["UserID"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['UserID'] = $response["UserID"];
            $_SESSION['FirstName'] = $firstName;
            $_SESSION['Username'] = $username;
            $_SESSION['LastName'] = $lastName;
            $_SESSION['Email'] = $email;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error-exists";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

?>