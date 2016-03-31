<?php

$app->post('/getPostByID', function() use ($app)  {
    $data = json_decode($app->request->getBody());

    $db = new DbHandler();

    $r = $db->makeQuery("SELECT * FROM `post` where ID=".$data->PostID);

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

        echoResponse(200, $res);
        return;
    }
    echoResponse(201, "Error not found post!");
});
$app->post('/getAllPosts', function() use ($app)  {
    $data = json_decode($app->request->getBody());
    $pageSize = 20;
    $pageIndex = 0;
    
    if(isset($data->pageSize) && isset($data->pageIndex)){
        $pageSize = $data->pageSize;
        $pageIndex = $data->pageIndex;
    }
    $hasCat = isset($data->catID);
    
    $db = new DbHandler();

    $offset = ($pageIndex-1) * $pageSize;
    $total = 0;
    $resCount=null;

    if(!$hasCat)
        $resCount = $db->makeQuery("SELECT count(*) as Total FROM `post`");
    else
        $resCount = $db->makeQuery("SELECT DISTINCT count(*) as Total FROM `post` JOIN post_subject on post_subject.PostID=post.ID 
                                    WHERE post_subject.SubjectID=".$data->catID);

    while($res = $resCount->fetch_assoc()){
        $total = $res["Total"];
    }
    
    $r = null;
    if(!$hasCat)
        $r = $db->makeQuery("SELECT * FROM `post` LIMIT $offset, $pageSize");
    else
        $r = $db->makeQuery("SELECT DISTINCT post.* FROM `post` JOIN post_subject on post_subject.PostID=post.ID 
                             WHERE post_subject.SubjectID=".$data->catID." LIMIT $offset, $pageSize");

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
    $data = (object)[
            'Items' => $result,
            'PageIndex' => $pageIndex,
            'PageSize' => $pageSize,
            'Total' => $total
    ];

    echoResponse(200, $data);
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


$app->post('/getSubjectByID', function() use ($app)  {
    $db = new DbHandler();
    $data = json_decode($app->request->getBody());
    $r = $db -> makeQuery("SELECT * FROM `subject` WHERE ID=".$data->CatID);
    
    while($res = $r->fetch_assoc()){
        echoResponse(200, $res);
        return ;
    }
    echoResponse(201, "No result found");
});


?>