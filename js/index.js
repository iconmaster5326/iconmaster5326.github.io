function load_content() {
	$("#main-content").load("html/test.html");
}

function load_content_2() {
	$.get("php/test.php", function(data, status) {
		$("#main-content").html(data);
	});
}