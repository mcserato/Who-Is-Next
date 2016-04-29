var kek = document.getElementById("master");
var kekduke = document.getElementById("temp");
var limit = 0;
$("#yas").click(function(){
	limit = $("input[type='radio'][name='times']:checked").val();
	var t = 0;
	var g = document.getElementById("yassity");
	g.className += " shake-slow shake-constant";
	$("#yas").attr("disabled",true);
	setTimeout(function(){
			buraticator();
	},3000); 		
});


function buraticator (){
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
	kek.appendChild(v_container);
	$(v_container).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(e) {
		$(v_container).attr('class','');
   		kekduke.appendChild(v_container);
   		buratata(document.getElementById("temp").children.length);
	});
}

function buratata(t){
	while(kek.firstChild){
		kek.removeChild(document.getElementById("master").firstChild);
	}
	if(t == (limit)){
		alert("yas");
		$("#yassity").attr('class','container');
		$("#yas").attr("disabled",false);
		setTimeout(function(){
			while(kekduke.firstChild){
				kekduke.removeChild(kekduke.firstChild);
			}
		},1000);
	}else{
		buraticator();
	}
}