const overlay = document.querySelector(".overlay");
const overlay_mid = [overlay.clientWidth / 2, overlay.clientHeight / 2];
const audio_beep = document.querySelector("audio");
const help_region = [
	Math.round(Math.random() * (document.body.clientWidth - 50)),
	Math.round(Math.random() * (document.body.clientHeight - 50)),
];
(function () {
	overlay.style.left = document.body.clientWidth / 2 - overlay_mid[0] + "px";
	overlay.style.top = document.body.clientHeight / 2 - overlay_mid[1] + "px";
})();
window.onmousemove = function (e) {
	overlay.style.left = e.x - overlay_mid[0] + "px";
	overlay.style.top = e.y - overlay_mid[1] + "px";

	// Calculate the distance between the mouse position and the "liberation" area
	const distanceX = Math.abs(e.x - help_region[0] - 25);
	const distanceY = Math.abs(e.y - help_region[1] - 25);
	const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

	// Check if the mouse is within a certain distance of the "liberation" area
	const beep_threshold = 175; // Adjust this value to control the proximity for beeping
	const anim_threshold = 40;
	if (distance <= beep_threshold) {
		// Play the beeping sound
		audio_beep.play();
	}
	if (distance <= anim_threshold) {
		// Play the beeping sound
		overlay.style.animation = "pulse 0.5s 0s linear forwards infinite";
	} else overlay.style.animation = "";
};
window.onclick = function (e) {
	if (e.x >= help_region[0] && e.x <= help_region[0] + 50) {
		if (e.y >= help_region[1] && e.y <= help_region[1] + 50) {
			overlay.style.display = "none";
			alert("You are liberated!");
			window.onmousemove = () => {};
			window.onclick = () => {};
		}
	}
};
window.addEventListener("DOMContentLoaded", () => audio_beep.play());
