<?php

$app->get('/getAllPosts', function() use ($app)  {
    $db = new DbHandler();
    $result = $db -> getRecords("SELECT `ID`, `Title`, `Content`, `WriteDate`, `Image` FROM `post`");
    echoResponse(200, $result);
});

?>