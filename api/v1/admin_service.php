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
        'WriteDate' => $rObj -> writeDate,
        'ImageID' => $rObj -> imageID,
    ];

    try{

        $db->beginTransaction();

        $column_names = array( 'Title','Content','BriefContent','ReleaseDate','WriteDate','ImageID');
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

$app->post('/saveSlide', function() use ($app) {
    $response = array();
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    
    $data = (object)[
            'Link' => $rObj->Link,
            'ShowOrder' => $rObj->Order,
            'ImageID' => $rObj->ImageID,
            'Content' => $rObj->Content,
            'Title' => $rObj->Title
    ];
    
	$result = $db->insertIntoTable($data, array('Link','ShowOrder','ImageID','Title','Content'), 'slider');
	$response = [];
    if($result){
		$response["Status"] = "success";
    	echoResponse(200, $response);
	}else{
		$response["Status"] = "error";
    	echoResponse(201, $response);
	}
});


$app->post('/deletePost', function() use ($app) {
    $response = array();
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    $result = $db->deleteFromTable('post','ID='.$rObj);
});

$app->post('/deleteSlide', function() use ($app) {
    $response = array();
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    $result = $db->deleteFromTable('slider','ID='.$rObj->slideID);
    $response = [];
    if($result){
		$response["Status"] = "success";
	}else{
		$response["Status"] = "error";
	}
    echoResponse(200, $response);
});

$app->post('/deleteMedia', function() use ($app)  {
    $db = new DbHandler();
    $data = json_decode($app->request->getBody());
    $r = $db->makeQuery("SELECT * FROM gallery WHERE ID=".$data->mediaID." LIMIT 1");

    while($res = $r->fetch_assoc()){
        $filename = "../../".$res["FullPath"];
        if (file_exists($filename)) {
            unlink($filename);
            $result = $db->deleteFromTable('gallery','ID='.$data->mediaID);
            echoResponse(200, 'File '.$filename.' has been deleted');
            return;
        } else {
            $result = $db->deleteFromTable('gallery','ID='.$data->mediaID);
            echoResponse(201, 'Could not delete '.$filename.'');
            return;
        }
    }
    echoResponse(201, 'Could not delete '.$filename.', file does not exist');
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
$app->post('/getAllPrivileges', function() use ($app)  {
    $db = new DbHandler();
    $resQ = $db->makeQuery("SELECT ID as PrivilegeID , Privilege ,Description FROM admin_privilege");
    $result = array();
    while($res = $resQ->fetch_assoc()){
        $result[] = $res;
    }
    echoResponse(200, $result);
});

$app->post('/getAllSlides', function() use ($app)  {
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
    if($offset < 0)
    	$offset = 0;
    $total = 0;
    $resCount=null;

    if(!$hasCat)
        $resCount = $db->makeQuery("SELECT count(*) as Total FROM slider");
    else
        $resCount = $db->makeQuery("SELECT DISTINCT count(*) as Total FROM `post` JOIN post_subject on post_subject.PostID=post.ID 
                                    WHERE post_subject.SubjectID=".$data->catID);

    while($res = $resCount->fetch_assoc()){
        $total = $res["Total"];
    }
    
    $r = null;
    if(!$hasCat)
        $r = $db->makeQuery("SELECT slider.* , gallery.FullPath FROM slider LEFT JOIN gallery on gallery.ID = slider.ImageID ORDER BY ShowOrder DESC  LIMIT $offset, $pageSize");
    else
        $r = $db->makeQuery("SELECT DISTINCT post.* , gallery.FullPath as Image FROM `post` JOIN post_subject on post_subject.PostID=post.ID LEFT JOIN gallery on post.ImageID = gallery.ID 
                             WHERE post_subject.SubjectID=".$data->catID." LIMIT $offset, $pageSize");
 
    $result = array();
    while($res = $r->fetch_assoc()){
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

$app->post('/getAllUsers', function() use ($app)  {
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
    if($offset < 0)
    	$offset = 0;
    $total = 0;
    $resCount=null;

    if(!$hasCat)
        $resCount = $db->makeQuery("SELECT count(*) as Total FROM user");
    else
        $resCount = $db->makeQuery("SELECT DISTINCT count(*) as Total FROM `post` JOIN post_subject on post_subject.PostID=post.ID 
                                    WHERE post_subject.SubjectID=".$data->catID);

    while($res = $resCount->fetch_assoc()){
        $total = $res["Total"];
    }
    
    $r = null;
    if(!$hasCat)
        $r = $db->makeQuery("SELECT user.* ,admin_privilege.Privilege,admin_privilege.ID as PrivilegeID ,admin.ID as AdminID FROM user LEFT JOIN admin on admin.UserID = user.ID LEFT JOIN admin_privilege on admin_privilege.ID = admin.PrivilegeID ORDER BY user.ID LIMIT $offset, $pageSize");
    else
        $r = $db->makeQuery("SELECT DISTINCT post.* , gallery.FullPath as Image FROM `post` JOIN post_subject on post_subject.PostID=post.ID LEFT JOIN gallery on post.ImageID = gallery.ID 
                             WHERE post_subject.SubjectID=".$data->catID." LIMIT $offset, $pageSize");
 
    $result = array();
    while($res = $r->fetch_assoc()){
    	if(isset($res["PrivilegeID"])){
			$rpQ = $db->makeQuery("SELECT * FROM admin_privilege WHERE ID=".$res["PrivilegeID"]);
			$rp = $rpQ->fetch_assoc();
			$pr = array();
			if(isset($rp["ID"])){
				$pr["ID"] = $rp["ID"];
				$pr["Privilege"] = $rp["Privilege"];
				$pr["Description"] = $rp["Description"];
			}else{
				$pr["ID"] = null;
				$pr["Privilege"] =  null;
				$pr["Description"] =  null;
			}
			$res["Privilege"] = $pr;
		}
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

$app->post('/saveAdminPrivilege', function() use ($app)  {
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    $response = [];
    
    $sess = $db->getSession();
    if(isset($sess["AdminID"])){
		$resM = $db->makeQuery("SELECT * FROM admin LEFT JOIN admin_privilege on admin_privilege.ID = admin.PrivilegeID WHERE admin.ID=".$sess["AdminID"]);
		$admin = $resM->fetch_assoc();
		if($admin["Privilege"] == "Manager"){
			if(isset($rObj->AdminID)){
				if($rObj->PrivilegeID!=-1){
					$db->updateRecord('admin','PrivilegeID='.$rObj->PrivilegeID,'ID='.$rObj->AdminID);
				}else{
					$db->deleteFromTable('admin','ID='.$rObj->AdminID);
				}
			}else if($rObj->PrivilegeID!=-1){
				$adminObj = array();
				$adminObj["UserID"] = $rObj->UserID;
				$adminObj["PrivilegeID"] = $rObj->PrivilegeID;
				$db->insertIntoTable($adminObj,array('UserID','PrivilegeID'),'admin');
			}
			$response["Status"] = "success";
	   		echoResponse(200, $response);
		}else{
			$response["Status"] = "error";
			$response["Message"] = "NoPrivilege";
	   		echoResponse(201, $response);
		}
	}else{
		$response["Status"] = "error";
		$response["Message"] = "IsNoAdmin";
   		echoResponse(201, $response);
	}
});

$app->post('/deleteUser', function() use ($app) {
    
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    $response = [];
    
    $sess = $db->getSession();
    if(isset($sess["AdminID"])){
		$resM = $db->makeQuery("SELECT * FROM admin LEFT JOIN admin_privilege on admin_privilege.ID = admin.PrivilegeID WHERE admin.ID=".$sess["AdminID"]);
		$admin = $resM->fetch_assoc();
		if($admin["Privilege"] == "Manager"){
		    $result = $db->deleteFromTable('admin','UserID='.$rObj->UserID);
		    $result = $db->deleteFromTable('user','ID='.$rObj->UserID);
			$response["Status"] = "success";
	   		echoResponse(200, $response);
		}else{
			$response["Status"] = "error";
			$response["Message"] = "NoPrivilege";
	   		echoResponse(201, $response);
		}
	}else{
		$response["Status"] = "error";
		$response["Message"] = "IsNoAdmin";
   		echoResponse(201, $response);
	}
});


?>