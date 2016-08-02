<?php
/**
 * Created by PhpStorm.
 * User: -MR-
 * Date: 13/05/2016
 * Time: 07:33 PM
 */

function hasInfo(){
    return isset($_SESSION['UserID']) || isset($_COOKIE['UserID']) ;
}

function generateSessionAsJavascriptVariable()
{
    if (!isset($_SESSION)) {
        session_start();
    }

    if(isset($_SESSION["UserID"])){
        $adminScript= '';
        if(isset($_SESSION["IsAdmin"]) && $_SESSION["IsAdmin"] == 1){
            $adminScript = "session.AdminID = '".$_SESSION["AdminID"]."';" ;
        }

        echo "<script>".
            "var session = {};".
            "session.UserID = '".$_SESSION["UserID"]."';".
            "session.SSN = '".$_SESSION["SSN"]."';".
            "session.IsAdmin = '".$_SESSION["IsAdmin"]."';".
             $adminScript.
            "</script>";
    }else{
        if(isset($_COOKIE['UserID'])){

            $_SESSION['SSN'] = $_COOKIE['SSN'];
            $_SESSION['IsAdmin'] = $_COOKIE['IsAdmin'];
            $_SESSION['UserID'] = $_COOKIE['UserID'];

            if($_SESSION['IsAdmin']){
                $_SESSION['AdminID'] = $_COOKIE['AdminID'];
            }

            generateSessionAsJavascriptVariable();
        }else{

            echo "<script>".
                "var session = {};".
                "</script>";
        }

    }
}
?>
