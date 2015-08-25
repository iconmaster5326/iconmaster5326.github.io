$(document).ready(function() {
	iconus.getAllPosts(function(posts) {
		for (var post in posts) {
			iconus.loadPost(iconus.getPostUrl(posts[post]), true);
		}
	});
});