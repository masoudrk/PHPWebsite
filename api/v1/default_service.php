<?php

$app->get('/getAllPosts', function() use ($app)  {
    $db = new DbHandler();
    $r = $db->makeQuery("SELECT * FROM `post`");
    $result = array();
    while($res = $r->fetch_assoc()){
    
        $authorsQ = $db->makeQuery("SELECT admin.ID as AdminID , concat(FirstName , ' ' ,LastName) as FullName FROM post_author 
                                        Left Join admin on admin.ID = post_author.AdminID
                                        Left Join user on user.ID = admin.UserID
                                        where PostID=".$res["ID"]);
        $authors = array();
        while($resAuthor = $authorsQ->fetch_assoc()){
            $authors[] = $resAuthor;
        }
        $res["Authors"] = $authors;
        
        $subjectsQ = $db->makeQuery("SELECT * FROM post_subject 
                                        Left Join subject on subject.ID = post_subject.SubjectID
                                        where PostID=".$res["ID"]);
        $subjects = array();
        while($resSubject = $subjectsQ->fetch_assoc()){
            $subjects[] = $resSubject;
        }
        $res["Subjects"] = $subjects;

        $result[] = $res;
    }
    echoResponse(200, $result);
});

$app->get('/getAllSubjects', function() use ($app)  {
    $db = new DbHandler();
    $r = $db -> makeQuery("SELECT * FROM `subject` WHERE ParentID is null");
    
    $result = array();
    while($res = $r->fetch_assoc()){
    
        $childsQ = $db->makeQuery("SELECT * FROM subject where ParentID=".$res["ID"]);
        $childs = array();
        while($child = $childsQ->fetch_assoc()){
            $childs[] = $child;
        }

        $res["childs"] = $childs;
        $result[] = $res;
    }
    echoResponse(200, $result);
});


?>