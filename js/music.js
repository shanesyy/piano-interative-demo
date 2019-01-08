var svgContainer = document.getElementById("svg-container");
var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(svgContainer, {disabledCursor: false});
osmd.load("http://127.0.0.1:8080/Minuet_in_G_Major_Bach_first_16bars.musicxml").then(
	function(){
		osmd.zoom=0.75;
		osmd.cursor.show();
		osmd.render();
		window.addEventListener("resize", () => {
            osmd.render();
        });
	})

console.log("done");