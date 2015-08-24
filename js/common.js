$("#header").load("/html/header.html");
$("#footer").load("/html/footer.html");
$("#main-content").load("/html/index.html");

iconus = {};
iconus.loadPage = function(id, page) {
	$(".nav-pills .active").removeClass("active");
	$("#menu-item-"+id).addClass("active");
	$("#main-content").fadeOut(100,function() {
		$("#main-content").load(page);
		$("#main-content").fadeIn(100);
	});
	
	
};