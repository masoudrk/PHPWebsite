<?php

$app->get('/getAllPosts', function() use ($app)  {
    $db = new DbHandler();
    $result = $db -> getRecords("SELECT * FROM `post`");
    echoResponse(200, $result);
});

$app->get('/getAllBaseSubjects', function() use ($app)  {
    $db = new DbHandler();
    $result = $db -> getRecords("SELECT * FROM `subject` WHERE ParentID is null");
    echoResponse(200, $result);
});

$app->get('/getAllSubjects', function() use ($app)  {
    $db = new DbHandler();
    $result = $db -> getRecords("SELECT * FROM `subject` WHERE ParentID is not null");
    echoResponse(200, $result);
});

?>