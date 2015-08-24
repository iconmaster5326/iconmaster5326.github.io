$("#header").load("/html/header.html", function() {
	$("#"+active_menu_item).addClass("active");
});
$("#footer").load("/html/footer.html");