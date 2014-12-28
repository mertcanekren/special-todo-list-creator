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
            "<div class='delete_row delete_row"+$(".todolist ul li").size()+"' data-id='"+$(".todolist ul li").size()+"'>Delete</div>"+
            "<div class='clear'></div>" +
        "</li>"
    );
}

// check todo post
function updateTodo(todoid){
    localStorage.setItem("row["+todoid+"].checkclass","todolistcheck todolistchecked");
    localStorage.setItem("row["+todoid+"].contentclass", "todolistcontent todolistcontentfnish");
}

//get todo lists
function getTodoLists(){
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
}

function Storage(){
    if(typeof(Storage) === "undefined"){
        alert("doesn't browser web storage");
    }
}
