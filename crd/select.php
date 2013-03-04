<?php
/*
 * @author      Mertcan Ekren
 * @license		http://en.wikipedia.org/wiki/MIT_License
 */
error_reporting(0);
ini_set('display_errors', false);
$db = new SQLite3('tododatabase.db');

// Get todo list
if($_GET["getlist"]){
	$projects = $db->query('select * from projects');
	$projects_row = array(); 
	$i = 0; 
	while($res = $projects->fetchArray(SQLITE3_ASSOC)){ 

		$projects_row[$i]['id'] = $res['id']; 
	    $projects_row[$i]['name'] = $res['name'];

	    $i++; 
	}
	echo json_encode($projects_row);
}

// Get things to do
if($_GET["gettodo"]){
	$todo = $db->query('select * from todo');
	$todo_row = array(); 
	$i = 0; 
	while($td = $todo->fetchArray(SQLITE3_ASSOC)){
		$todo_row[$i]['id'] = $td['id']; 
	    $todo_row[$i]['title'] = $td['title'];
	    $todo_row[$i]['status'] = $td['status'];
	    $i++; 
	}
	echo json_encode($todo_row);
}

?>