<?php

$app->post('/savePost', function() use ($app) {
    $response = array();
    $rObj = json_decode($app->request->getBody());
    verifyRequiredParams(array('title', 'postContent' ,'postBrief' ),$rObj);
    $db = new DbHandler();
    
    $tabble_name = "post";
    $column_names = array( 'Title','Content');

    $object = (object) [
        'Title' => $rObj->title,
        'Content' => $rObj -> postContent
    ];

    $result = $db->insertIntoTable($object, $column_names, $tabble_name);
        
});
?>