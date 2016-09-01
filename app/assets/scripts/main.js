/* jshint browser: true */

function actionMenu(){
	document.getElementById("gg-menu").classList.toggle("open");
	document.getElementById("gg-menu-mobile").classList.toggle("opened");
}

document.getElementById("gg-menu-mobile").addEventListener("click", actionMenu);
