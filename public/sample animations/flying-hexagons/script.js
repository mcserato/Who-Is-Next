var i = Math.floor(Math.random() * 10 + 1);
var balloonDiv = $("#balloons");
var pics = ['pau.jpg', 'perico.jpg', 'dana.jpg', 'aleli.jpg', 'aron.jpg', 'gio.jpg', 'miles.jpg', 'maru.jpg', 'mike.jpg', 'chris.jpg']
var done = [];
var x, randomBalloonNum, flag = 0;

console.log(i);

for(var index = 0; index < i; index++) {

	while(1) {
		flag = 0;
		randomBalloonNum = parseInt(Math.floor(Math.random() * 28 + 1));

		for(x = 0; x < done.length; x++) {
			if(done[x] == randomBalloonNum) {
				flag = 1;
				break;
			}
		}

		if(flag == 0) break;
	}

	done.push(randomBalloonNum);

	var outerDiv = $("<div></div>");
	outerDiv.addClass("balloon");
	outerDiv.addClass("balloon" + randomBalloonNum);
	outerDiv.attr('style', 'background-image: url("images/' + pics[index] + '")');
	var hexTop = $("<div></div>");
	hexTop.addClass("hexTop");

	var hexBottom = $("<div></div>");
	hexBottom.addClass("hexBottom");

	outerDiv.append(hexTop);
	outerDiv.append(hexBottom);
	balloonDiv.append(outerDiv);

}

setTimeout(function(){
    document.getElementById("animation-css").remove();
}, 24000);