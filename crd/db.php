<?php
	/*
	 * @author      Mertcan Ekren
	 * @license		http://en.wikipedia.org/wiki/MIT_License
	 */
	error_reporting(0);
	ini_set('display_errors', false);

	$db = new SQLite3('tododatabase.db');

		if($_POST["todoid"] && $_POST["process"]){
			if($_POST["process"] == "passive"){
				if($db->exec("update todo set status='0' where id=".$_POST["todoid"])){
					echo json_encode(array('status' => true));
				}else{
					echo json_encode(array('status' => false));
				}
			}
		}

		if($_POST["listid"] && $_POST["todo"]){
			if($db->exec("insert into todo (title, createtime, projectid, status) values ('".$_POST["todo"]."', '".time()."', '".$_POST["listid"]."', '".true."')" )){
				echo json_encode(array('status' => '1','todo' => $_POST["todo"], 'todoid' => $db->lastInsertRowID()));
			}else{
				echo json_encode(array('status' => false));
			}
		}

		if($_POST["listname"] != ""){

			if($db->exec("insert into projects (name) values ( '".$_POST["listname"]."')")){
				echo json_encode(array('status' => true,'listname' => $_POST["listname"], 'listid' => $db->lastInsertRowID()));
			}else{
				echo json_encode(array('status' => false));
			}
		}

?>