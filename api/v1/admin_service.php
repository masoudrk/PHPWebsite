<?php

$app->post('/savePost', function() use ($app) {
    $response = array();
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    
    $updateMode = isset($rObj->postID);

    $object = (object) [
        'Title' => $rObj->title,
        'Content' => $rObj -> postContent,
        'BriefContent' => $rObj -> postBrief,
        'ReleaseDate' => $rObj -> releaseDate,
        'WriteDate' => $rObj -> writeDate
    ];

    try{

        $db->beginTransaction();

        $column_names = array( 'Title','Content','BriefContent','ReleaseDate','WriteDate');
        $result = null;

        if(!$updateMode){
            $result = $db->insertIntoTable($object, $column_names, "post");
        }else{
                                        
            $result = $db->updateRecord("post","`Title`='".$object->Title."' , `Content`='".$object->Content."' , `BriefContent`='".$object->BriefContent.
                                         "' , `WriteDate`='".$object->WriteDate."' ,`ReleaseDate`='".$object->ReleaseDate."',`Image`='"."kk"."'" 
                                        , "post.ID=".$rObj->postID);

            $resDelS = $db->deleteFromTable("post_subject","PostID=".$rObj->postID);
            $resDelA = $db->deleteFromTable("post_author","PostID=".$rObj->postID);
        }
    
        foreach ($rObj->subjects as $value) {
            $s = (object) [
                'PostID' => $result,
                'SubjectID' => $value -> ID
            ];
            $db->insertIntoTable($s, array( 'PostID','SubjectID'), 'post_subject');
        }

        foreach ($rObj->authors as $value) {
            $a = (object) [
                'PostID' => $result,
                'AdminID' => $value -> AdminID
            ];
            $db->insertIntoTable($a, array( 'PostID','AdminID'), 'post_author');
        }

        $db->commitTransaction();
    } catch (Exception $e) {
        $db->rollbackTransaction();
        echoResponse(201, $e);
        return;
    }
    echoResponse(200, $result);
});


$app->post('/deletePost', function() use ($app) {
    $response = array();
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    $result = $db->deleteFromTable('post','ID='.$rObj);
    echoResponse(200, $result);
});

$app->post('/getAllAuthors', function() use ($app)  {
    $db = new DbHandler();
    $authorsQ = $db->makeQuery("SELECT admin.ID as AdminID , concat(FirstName , ' ' ,LastName) as FullName FROM admin 
                                    Left Join user on user.ID = admin.UserID");
    $authors = array();
    while($resAuthor = $authorsQ->fetch_assoc()){
        $authors[] = $resAuthor;
    }
    echoResponse(200, $authors);
});
?>