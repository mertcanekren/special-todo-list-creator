$(function(){

    Storage();

	/**
     * Todo list viewer 
     */
	getTodoLists();

	$('.newlist').click(function(){
		$('.newlist').fadeOut('fast',function(){
			$('.newlistadd').fadeIn('slow');
		});
	});

	/** 
     * New list submit button
     */
	$('#listsubmit').click(function(){
	    newList($('#listname').val());
	});	 

	// new todo
	$("body").delegate("#newtodoinput", "keypress", function(){
		if(event.which == 13){
            var todo = $("#newtodoinput").val();
            if(todo){
                newTodo(todo,$('#projectid').val());
                localStorage.setItem("row["+$(".todolist ul li").size()+"].todo", todo);
                localStorage.setItem("row["+$(".todolist ul li").size()+"].checkclass","todolistcheck");
                localStorage.setItem("row["+$(".todolist ul li").size()+"].contentclass", "todolistcontent");
                if (localStorage.rowcount){
                    localStorage.rowcount=Number(localStorage.rowcount)+1;
                }else{
                    localStorage.rowcount=Number(0)+1;
                }
            }
	    }
	});

	/**
     * Todo check
     */
	$("body").delegate(".todolist ul li div.todolistcheck", "click", function(){
		updateTodo($(this).attr('todo-id'));
	    $(".todolist ul li#"+$(this).attr('data-id')+" div.todolistcontent").addClass('todolistcontentfnish');
	    $(".todolist ul li#"+$(this).attr('data-id')+" div.todolistcheck").addClass('todolistchecked');
	});

});

// new list creator
function newList(listname) {
    if(listname){
        localStorage.setItem("listname", listname);
        $('#listname').css('border','1px solid green');
        $('.newlist').fadeOut('fast');
        $('.newlistadd').fadeOut('slow',function(){
            createTodoList(localStorage.getItem("listname"),"2");
        });
    }else{
        $('#listname').css('border','1px solid red');
        $('#listname').attr('placeholder',"List Name Required!");
    }
}

function deleteList(){
    
}

// new todo list creator
function createTodoList(listname,listid){
	$('.main').append(
        '<div class="todolist">' +
            '<div class="todolisttitle">'+listname+'</div>' +
            '<div class="new">' +
                '<div class="newtodo"></div>' +
                '<input type="text" id="newtodoinput" placeholder="What you going to do?">' +
                '<input type="hidden" id="projectid" value="'+listid+'">' +
            '</div>' +
            '<ul></ul>' +
        '</div>'
    );
	$('.todolist').fadeIn('slow');
}

// new todo post
function newTodo(todo,listid){
    $("#newtodoinput").val("")
    craateTodo(todo,listid,"todolistcheck","todolistcontent");
}

//new todo creator
function craateTodo(todo,todoid,checkclass,contentclass){
	$(".todolist ul").append(
        "<li id='"+$(".todolist ul li").size()+"'>" +
            "<div class='"+checkclass+"' todo-id='"+todoid+"' data-id='"+$(".todolist ul li").size()+"'></div>" +
            "<div class='"+contentclass+"'>"+todo+"</div>" +
            "<div class='clear'></div>" +
        "</li>"
    );
}

// check todo post
function updateTodo(todoid){
    localStorage.setItem("row["+todoid+"].checkclass","todolistcheck todolistcontentfnish");
    localStorage.setItem("row["+todoid+"].contentclass", "todolistcontent todolistchecked");
}

//get todo lists
function getTodoLists(){
    /*
	$.ajax({
        type: "GET",
        url: "crd/select.php?getlist=1",
        success: function (data) {
        	if(data != ""){        		
				results = JSON.parse(data);
				if(results.length > 0){
					$('.newlist').hide();
					$('.reset').fadeIn();
				}
				for (var i = 0, len = results.length; i < len; i++) {				
					createtodolist(results[i].name,results[i].id)
				}
			}				      
        }            
    });
    $.ajax({
        type: "GET",
        url: "crd/select.php?gettodo=1",
        success: function (data) {
        	if(data){        		
				results = JSON.parse(data);
				for (var i = 0, len = results.length; i < len; i++) {	
					if(results[i].status == "1"){
						var checkclass = "todolistcheck";
						var contentclass = "todolistcontent";
					}else{
						var checkclass = "todolistcheck todolistchecked";
						var contentclass = "todolistcontent todolistcontentfnish";
					}
					craatetodo(results[i].title,results[i].id,checkclass,contentclass);
				}
			}				      
        }            
    });
    */

    if (localStorage.getItem("listname") !== 'undefined' && localStorage.getItem("listname") !== null){
        $('.newlist').hide();
        createTodoList(localStorage.getItem("listname"),"1");
        for(var i = 1; i <= localStorage.getItem('rowcount'); i++){
            craateTodo(
                localStorage.getItem('row['+i+'].todo'),
                i,
                localStorage.getItem('row['+i+'].checkclass'),
                localStorage.getItem('row['+i+'].contentclass')
            );
        }
    }
    //localStorage.removeItem("name");
}

function Storage(){
    if(typeof(Storage) === "undefined"){
        alert("doesn't browser web storage");
    }
}
