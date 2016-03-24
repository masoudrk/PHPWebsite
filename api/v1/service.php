<?php

$app->get('/getAllPosts', function() use ($app)  {
    $db = new DbHandler();
    $result = $db -> getRecords("SELECT * FROM `post`");
    echoResponse(200, $result);
});

?>