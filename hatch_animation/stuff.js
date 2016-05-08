var basin = document.getElementById("basin");
var temp = document.getElementById("temp");
var limit = 0; //number of volunteers


/*Animation trigger*/
$("#yas").click(function(){
	limit = $("input[type='radio'][name='times']:checked").val();
	var g = document.getElementById("yassity");
	g.className += " shake-slow shake-constant";
	$("#yas").attr("disabled",true);
	setTimeout(function(){
			fall();
	},3000); 		
});


/* "Egg" div creation and animation*/
function fall (){
	var v_container = document.createElement("div");
	$(v_container).attr('style','background:#333333;color:white;width:60%;height:105px;position:relative;z-index:-1;margin:2px;');
	v_container.className += "bouncing";
	var wspace = document.createElement("div");
	$(wspace).attr('style','width:100%;height:2.5px;color:blue;background:blue;');

	/*Get name for each egg*/
	var n_container = document.createElement("div");
	$(n_container).attr('style','background-image:url("tem.gif");float:left;');
	$(n_container).attr('class','ball');
	var content = document.createElement("span");
	content.innerHTML = "Kekmaster 6000";
	$(content).attr("style","float:left;height:20px;width:85%;margin-top:35px;margin-left:5px;");

	v_container.appendChild(wspace);
	v_container.appendChild(n_container);
	v_container.appendChild(content);
	basin.appendChild(v_container);
	$(v_container).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(e) {
		$(v_container).attr('class','');
   		temp.appendChild(v_container);
   		animationEnd(document.getElementById("temp").children.length);
	});
}

/*Determines when will the series of animation end.*/
function animationEnd(children){
	while(basin.firstChild){
		basin.removeChild(basin.firstChild);
	}
	if(children == (limit)){
		alert("yas");
		$("#yassity").attr('class','container');
		$("#yas").attr("disabled",false);
		setTimeout(function(){
			while(temp.firstChild){
				temp.removeChild(temp.firstChild);
			}
		},10000);
	}else{
		fall();
	}
}