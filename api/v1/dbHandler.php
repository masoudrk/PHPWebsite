<?php

class DbHandler {

    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }
    /**
     * Fetching single record
     */
    public function getOneRecord($query) {
        $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();    
    }
    /**
     * Fetching records
     */
    public function getRecords($query) {
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
        $result = array();
        while($res = $r->fetch_assoc()){
            $result[] = $res;
        }
        return $result;
    }
    /**
     * Fetching records
     */
    public function makeQuery($query) {
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
        return $r;
    }
    /**
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name) {
        
        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }
    public function deleteFromTable($table_name , $where) {
        
        $query = "DELETE FROM ".$table_name." WHERE ".$where;
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            return $r;
        }
        return NULL;
    }
public function getSession(){
    if (!isset($_SESSION)) {
        session_start();
    }
    $sess = array();
    if(isset($_SESSION['UserID']))
    {
        if(isset($_SESSION['AdminID']))
            $sess["AdminID"] = $_SESSION['AdminID'];

        $sess["UserID"] = $_SESSION['UserID'];
        $sess["LastName"] = $_SESSION['LastName'];
        $sess["FirstName"] = $_SESSION['FirstName'];
    }
    else
    {
        $sess["UserID"] = '';
        $sess["LastName"] = 'Guest';
        $sess["FirstName"] = '';
    }
    return $sess;
}
public function destroySession(){
    if (!isset($_SESSION)) {
    session_start();
    }
    if(isSet($_SESSION['UserID']))
    {
        unset($_SESSION['AdminID']);
        unset($_SESSION['UserID']);
        unset($_SESSION['LastName']);
        unset($_SESSION['FirstName']);
        $info='info';
        if(isSet($_COOKIE[$info]))
        {
            setcookie ($info, '', time() - $cookie_time);
        }
        $msg="Logged Out Successfully...";
    }
    else
    {
        $msg = "Not logged in...";
    }
    return $msg;
}
 
}

?>
