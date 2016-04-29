var kek = document.getElementById("master");

$("#yas").click(function(){
	var limit = $("input[type='radio'][name='times']:checked").val();
	var t = 0;
	var g = document.getElementById("yassity");
	g.className += " shake-slow shake-constant";
	$("#yas").attr("disabled",true);
	setTimeout(function(){
		while(t < limit){
			/*Create div element for each egg*/
			var v_container = document.createElement("div");
			$(v_container).attr('style','background:#333333;color:white;width:60%;height:105px;position:relative;z-index:-1;margin:2px;');
			v_container.className += "bouncing";
			var wspace = document.createElement("div");
			$(wspace).attr('style','width:100%;height:2.5px;color:blue;background:blue;');

			/*Get name for each egg*/
			var n_container = document.createElement("div");
			$(n_container).attr('style','background:#b42529;');
			$(n_container).attr('class','ball');
			var content = document.createElement("span");
			content.innerHTML = "Kekmaster 6000";
			n_container.appendChild(content);

			v_container.appendChild(wspace);
			v_container.appendChild(n_container);
			kek.appendChild(v_container);
			$(v_container).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(e) {
   				alert("yas");
				$("#yassity").attr('class','container');
				$("#yas").attr("disabled",false);
				while(kek.firstChild){
					kek.removeChild(kek.firstChild);
				}
			});
			t++;
		}
	},3000); 		
});