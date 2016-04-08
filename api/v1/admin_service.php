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
                                         "' , `WriteDate`='".$object->WriteDate."' ,`ReleaseDate`='".$object->ReleaseDate."' , `ImageID`='".$object->ImageID."'" 
                                        , "post.ID=".$rObj->postID );

            $resDelS = $db->deleteFromTable("post_subject","PostID=".$rObj->postID);
            $resDelA = $db->deleteFromTable("post_author","PostID=".$rObj->postID);
        }
    
        foreach ($rObj->subjects as $value) {
            $s = (object) [
            	'PostID' => ($updateMode)? $rObj->postID : $result,
                'SubjectID' => $value -> ID
            ];
            $db->insertIntoTable($s, array( 'PostID','SubjectID'), 'post_subject');
        }

        foreach ($rObj->authors as $value) {
            $a = (object) [
            	'PostID' => ($updateMode)? $rObj->postID : $result,
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

$app->post('/savePage', function() use ($app) {
    $response = array();
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    
    $updateMode = isset($rObj->PageID);

    $result = null;
	$httpRes = [];
	$sess = $db->getSession();

    if(!$updateMode){
         $result = $db->insertToTable('page','Name,NameEN,HtmlContent,HtmlContentEN,PageTypeID,AdminID'
         ,"'".$rObj->Name."','".$rObj->NameEN."','".$rObj->HtmlContent."','".$rObj->HtmlContentEN."','".$rObj->PageTypeID."','".$sess['AdminID']."'");
         if($result)
         {
			$httpRes['Status'] = "success";
    		echoResponse(200, $httpRes);
    		return;
		 }
    }else{
                                    
        $result = $db->updateRecord("page","`Name`='".$rObj->Name."' , `NameEN`='".$rObj->NameEN."' , `HtmlContent`='".$rObj->HtmlContent."' , `HtmlContentEN`='".$rObj->HtmlContentEN."' ,`PageTypeID`='".$rObj->PageTypeID."',`AdminID`='".$sess['AdminID']."'" , "page.ID=".$rObj->PageID );
         if($result)
         {
			$httpRes['Status'] = "success";
    		echoResponse(200, $httpRes);
    		return;
		 }
    }
    
    $httpRes['Status'] = 'error';
    echoResponse(201, $httpRes);
});

$app->post('/getUserProfile', function() use ($app) {
    $db = new DbHandler();
    $user = $db->getSession();
    $r = $db->makeQuery("SELECT user.* , gallery.FullPath FROM user LEFT JOIN gallery on gallery.ID = user.AvatarID WHERE user.ID=".$user["UserID"]);
    
    $res = $r->fetch_assoc();
    echoResponse(200, $res);
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

$app->post('/deletePage', function() use ($app) {
    $response = array();
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    $result = $db->deleteFromTable('page','ID='.$rObj);
   	if($result){
		$httpRes = [];
		$httpRes['Status'] = "success";
		echoResponse(200, $httpRes);
		return;
	}
	echoResponse(201, $result);
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

$app->post('/getAllPageTypes', function() use ($app)  {
    $db = new DbHandler();
    $resQ = $db->makeQuery("SELECT * FROM page_type");
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

$app->post('/getAllPages', function() use ($app)  {
    $data = json_decode($app->request->getBody());
    $pr = new Pagination($data);
    
    $db = new DbHandler();
    $pageRes = $db->getPage('page',$pr->PageSize,$pr->PageIndex,
		'page.* , TypeNameEN, TypeName , user.LastName ,user.FirstName','1=1','LEFT JOIN page_type on page_type.ID = page.PageTypeID LEFT JOIN admin on admin.ID=page.AdminID LEFT JOIN user on user.ID = admin.UserID ORDER BY ID DESC');
	$sess = $db->getSession();

    echoResponse(200, $pageRes);
});

$app->post('/getPageByID', function() use ($app)  {
    $data = json_decode($app->request->getBody());
    
    $db = new DbHandler();
    $page = $db->getOneRecord("SELECT page.* , TypeNameEN, TypeName , user.LastName ,user.FirstName FROM page LEFT JOIN page_type on page_type.ID = page.PageTypeID LEFT JOIN admin on admin.ID=page.AdminID LEFT JOIN user on user.ID = admin.UserID WHERE page.ID='".$data->PageID."'");

    echoResponse(200, $page);
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
			echoError("NoPrivilege");
		}
	}else{
		echoError("IsNoAdmin");
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
			echoError("NoPrivilege");
		}
	}else{
		echoError("IsNoAdmin");
	}
});

$app->post('/changeUserPassword', function() use ($app) {
    
    $rObj = json_decode($app->request->getBody());
    $db = new DbHandler();
    
    if(strlen ($rObj->newPassword) < 6){
		echoError("PasswordIsShort");
		return;
	}
    
    $sess = $db->getSession();
    if(isset($sess["UserID"])){
		$resM = $db->makeQuery("SELECT * FROM user WHERE user.ID=".$sess["UserID"]);
		$user = $resM->fetch_assoc();
		if(passwordHash::check_password($user['Password'],$rObj->oldPassword)){
			$newPass = passwordHash::hash($rObj->newPassword);
			$res = $db->updateRecord('user',"Password='".$newPass."'","ID='".$user['ID']."'");
			if(!$res){
				echoError("CannotUpdateData");
			}else{
    			$response = [];
				$response["Status"] = "success";
		   		echoResponse(200, $response);
		   		$db->destroySession();
			}
		}else{
		   	echoError("PasswordNotMatch");
		}
	}else{
		echoError("IsNoUser");
	}
});

$app->post('/changeUserAvatar', function() use ($app) {
    
    $filename = $_FILES['file']['name'];
    
	$rand = generateRandomString(18);
	$ext = pathinfo($filename, PATHINFO_EXTENSION);
	
    $destination = '../../content/img/'.$rand.".".$ext;
    move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );
    
    $db = new DbHandler();
    $column_names = array( 'FileTypeID','Path','FullPath','UserID','IsMedia');
    $object =(object)[
        "FileTypeID" => '1',
        "Path" => "content/img/",
        "Description" => "",
        "FullPath" => "content/img/".$rand.".".$ext,
        "UserID" => $sess["UserID"],
        "IsMedia"=>"0"
    ];
    $result = $db->insertIntoTable($object, $column_names, "gallery");

    $sess = $db->getSession();
    if(isset($sess["UserID"])){
		$res = $db->updateRecord('user',"AvatarID='".$result."'","ID='".$sess["UserID"]."'");
		if($res){
			$response["Status"] = "success";
	    	echoResponse(200, $response);
		}
		else
			echoError("ErrorUpdate");
	}else{
		echoError("IsNoUser");
	}
});

$app->post('/saveSubject', function() use ($app)  {
    $data = json_decode($app->request->getBody(),true);
    $db = new DbHandler();
    
    $result = null;
	if(isset($data["ParentID"])){
		$obj = array();
		$obj["ParentID"] = $data["ParentID"];
		$obj["Title"] = $data["Title"];
		$result = $db->insertIntoTable($obj, array('ParentID','Title'), 'subject');
	}else{
		$obj = array();
		$obj["ParentID"] = -1;
		$obj["Title"] = $data["Title"];
		$result = $db->insertIntoTable($obj, array('ParentID','Title'), 'subject');
	}
	
	$response = array();
	if($result){
		$response["Status"] = "success";
    	echoResponse(200, $response);
	}else{
		$response["Status"] = "error";
    	echoResponse(201, $response);
	}
});

$app->post('/saveSiteSettings', function() use ($app)  {
    $data = json_decode($app->request->getBody());
    $db = new DbHandler();
    $res = $db->insertToTable('global_settings',"AboutPageID,FooterPageID","'".$data->AboutPageID."','".$data->FooterPageID."'");
    
    if(!$res){
    	echoError('Error on inserting!');
    	return;
	}
	$response = array();
	$response["Status"] = "success";
	echoResponse(200, $response);
});

$app->post('/updateSubject', function() use ($app)  {
    $data = json_decode($app->request->getBody(),true);
    $db = new DbHandler();
    
	$result = $db->updateRecord('subject', "Title='".$data["Title"]."'",'ID='.$data["ID"]);
	
	$response = array();
	if($result){ 
		$response["Status"] = "success";
    	echoResponse(200, $response);
	}else{
		$response["Status"] = "error";
    	echoResponse(201, $response);
	}
});

$app->post('/deleteSubject', function() use ($app)  {
    $data = json_decode($app->request->getBody(),true);
    $db = new DbHandler();
    
	$result = $db->deleteFromTable('subject','ID='.$data["ID"]);
	
	$response = array();
	if($result){
		$response["Status"] = "success";
    	echoResponse(200, $response);
	}else{
		$response["Status"] = "error";
    	echoResponse(201, $response);
	}
});



?>