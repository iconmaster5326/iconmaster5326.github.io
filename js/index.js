function load_content() {
	$("#main-content").load("/html/test.html");
}

$(document).ready(function() {
	iconus.loadPost("/html/test.html");
});