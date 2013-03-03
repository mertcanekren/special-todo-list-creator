<?php

	$db = new SQLite3('tododatabase.db');

	$db->exec("delete from projects");
	$db->exec("delete from todo");

	/*
	$db->exec('create table projects (id integer PRIMARY KEY, name STRING)');
	$db->exec('create table todo (id integer PRIMARY KEY, title STRING, createtime STRING, projectid STRING, status STRING)');
	*/

?>