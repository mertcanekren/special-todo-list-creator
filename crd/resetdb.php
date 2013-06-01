<?php
	/*
	 * @author      Mertcan Ekren
	 * @license		http://en.wikipedia.org/wiki/MIT_License
	 */
	$db = new SQLite3('tododatabase.db');

	$db->exec("delete from projects");
	$db->exec("delete from todo");

	header('Location:../');

?>  