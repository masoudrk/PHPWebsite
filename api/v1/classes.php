<?php

class Pagingation {

    public $PageIndex = 1;
    public $PageSize = 20;

    function __construct($data) {  
	    if(isset($data->pageSize) && isset($data->pageIndex)){
	        $this->PageSize = $data->pageSize;
	        $this->PageIndex = $data->pageIndex;
	    }
    }
    
    public function getPage($db,$query){
		require_once('src/PHPSQLParser.php');
		$parser=new PHPSQLParser($query, true);
		
		$select = $parser->parsed['SELECT'];
		$from = $parser->parsed['FROM'];
		
		$startfromPos = $from[0]['position'];
		$startFromStr = substr($query,$startfromPos);
		$countQ = $db->makeQuery("SELECT count(*) as Total FROM ".$startFromStr);
		$countRes = $countQ->fetch_assoc();
		$total = $countRes['Total'];
		
    	$offset = ($this->PageIndex-1) * $this->PageSize;
		
		$q = $db->makeQuery($query." LIMIT $offset, $this->PageSize");
		
		$items = [];
		while($r = $q->fetch_assoc()){
            $items[] = $r;
        }
        
		$res = [];
		$res['Items'] = $items;
		$res['PageSize'] = $this->PageSize;
		$res['PageIndex'] = $this->PageIndex;
		$res['Total'] = $total;
		
		return $res;
		
		/*
    	$offset = ($pageIndex-1) * $pageSize;
    	
		$total = $this->getCount($table_name,$where);
		$total = $this->getCount($table_name,$where);
		
		$q = $this->makeQuery($query." LIMIT $offset, $pageSize");
		
		$items = [];
		while($r = $q->fetch_assoc()){
            $items[] = $r;
        }
        
		$res = [];
		$res['Items'] = $items;
		$res['PageSize'] = $pageSize;
		$res['PageIndex'] = $pageIndex;
		$res['Total'] = $total;
		return $res;*/
	}

}
?>