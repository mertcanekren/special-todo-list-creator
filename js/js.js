 /*
 * @author      Mertcan Ekren
 * @license		http://en.wikipedia.org/wiki/MIT_License
 */
$(function(){
	// Get lists
	gettodolists();
	$('.newlist').click(function(){	
		$('.newlist').fadeOut('slow',function(){
			$('.newlistadd').fadeIn('slow');
		});
	});

	// new list
	$('#listsubmit').click(function(){
		if($('#listname').val() != ""){			
				newlist($('#listname').val());
		}else{
			$('#listname').css('border','1px solid red');
			$('#listname').attr('placeholder',"List Name Required!");
		}
	});	

	// new todo
	$("body").delegate("#newtodoinput", "keypress", function(){
		if(event.which == 13){
			newtodo($("#newtodoinput").val(),$('#projectid').val());  
	   }			  
	});

	// todo check
	$("body").delegate(".todolist ul li div.todolistcheck", "click", function(){
		updatetodo($(this).attr('todo-id'),'passive');
	    $(".todolist ul li#"+$(this).attr('data-id')+" div.todolistcontent").addClass('todolistcontentfnish');
	    $(".todolist ul li#"+$(this).attr('data-id')+" div.todolistcheck").addClass('todolistchecked');
	});
});

// new list creator
function newlist(listname) {
    $.ajax({
        type: "POST",
        url: "crd/db.php",
        dataType: "json",
        data: {
            'listname': listname
        },
        success: function (data) {
            if(data["status"]){
            	$('#listname').css('border','1px solid green');
               	$('.newlistadd').fadeOut('slow',function(){       
            		createtodolist(data['listname'],data['listid']);
            	});
            } else {   
            	$('#listname').css('border','1px solid red');
            }
        }
    });
}

// new todo list creator
function createtodolist(listname,listid){
	$('.main').append('<div class="todolist"><div class="todolisttitle">'+listname+'</div><div class="new"><div class="newtodo"></div><input type="text" id="newtodoinput" placeholder="What you going to do?"><input type="hidden" id="projectid" value="'+listid+'"></div><ul></ul></div>');
	$('.todolist').fadeIn('slow');
}

// new todo post
function newtodo(todo,listid){
 $.ajax({
        type: "POST",
        url: "crd/db.php",
        dataType: "json",
        data: {
            'listid': listid,
            'todo' : todo
        },
        success: function (data) {
    		$("#newtodoinput").val("")
    		craatetodo(data['todo'],data['todoid'],"todolistcheck","todolistcontent");
        }
    });
}

//new todo creator
function craatetodo(todo,todoid,checkclass,contentclass){
	$(".todolist ul").append("<li id='"+$(".todolist ul li").size()+"'><div class='"+checkclass+"' todo-id='"+todoid+"' data-id='"+$(".todolist ul li").size()+"'></div><div class='"+contentclass+"'>"+todo+"</div><div class='clear'></div></li>");
}

// check todo post
function updatetodo(todoid,process){
	$.ajax({
        type: "POST",
        url: "crd/db.php",
        dataType: "json",
        data: {
            'todoid': todoid,
            'process' : process
        }
    });
}

//get todo lists
function gettodolists(){
	$.ajax({
        type: "GET",
        url: "crd/select.php?getlist=1",
        success: function (data) {
        	if(data != ""){        		
				results = JSON.parse(data);
				if(results.length > 0){
					$('.newlist').hide();
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

}