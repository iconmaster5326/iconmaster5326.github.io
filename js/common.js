$("#header").load("/html/header.html");
$("#footer").load("/html/footer.html");
$("#main-content").load("/html/index.html");

iconus = {};

iconus.loadPage = function(page, id, handler) {
	$(".nav-pills .active").removeClass("active");
	$("#menu-item-"+id).addClass("active");
	$("#main-content").fadeOut(100,function() {
		$("#main-content").load(page, function() {
			if (handler) handler();
			$("#main-content").fadeIn(100);
		});
	});
};

iconus.urldata = function(options) {
    "use strict";
    /*global window, document*/

    var url_search_arr,
        option_key,
        i,
        urlObj,
        get_param,
        key,
        val,
        url_query,
        url_get_params = {},
        a = document.createElement('a'),
        default_options = {
            'url': window.location.href,
            'unescape': true,
            'convert_num': true
        };

    if (typeof options !== "object") {
        options = default_options;
    } else {
        for (option_key in default_options) {
            if (default_options.hasOwnProperty(option_key)) {
                if (options[option_key] === undefined) {
                    options[option_key] = default_options[option_key];
                }
            }
        }
    }

    a.href = options.url;
    url_query = a.search.substring(1);
    url_search_arr = url_query.split('&');

    if (url_search_arr[0].length > 1) {
        for (i = 0; i < url_search_arr.length; i += 1) {
            get_param = url_search_arr[i].split("=");

            if (options.unescape) {
                key = decodeURI(get_param[0]);
                val = decodeURI(get_param[1]);
            } else {
                key = get_param[0];
                val = get_param[1];
            }

            if (options.convert_num) {
                if (val.match(/^\d+$/)) {
                    val = parseInt(val, 10);
                } else if (val.match(/^\d+\.\d+$/)) {
                    val = parseFloat(val);
                }
            }

            if (url_get_params[key] === undefined) {
                url_get_params[key] = val;
            } else if (typeof url_get_params[key] === "string") {
                url_get_params[key] = [url_get_params[key], val];
            } else {
                url_get_params[key].push(val);
            }

            get_param = [];
        }
    }

    urlObj = {
        protocol: a.protocol,
        hostname: a.hostname,
        host: a.host,
        port: a.port,
        hash: a.hash.substr(1),
        pathname: a.pathname,
        search: a.search,
        parameters: url_get_params
    };

    return urlObj;
};

iconus.loadPost = function(url) {
	$.get(url, function(data) {
		var e = $("<div></div>");
		e.html(data);
		var panel = $("<div class='panel panel-primary'><div class='panel-heading'></div><div class='panel-body'></div><div class='panel-footer'></div></div>");
		$("#post-area").html(panel);
		var title_link = $("<a></a>");
		title_link.click(function() {
			iconus.loadPage("/html/post.html", null, function() {
				iconus.loadPost(url);
			});
		});
		panel.find(".panel-heading").html(title_link);
		panel.find(".panel-heading a").html(e.find("title").html());
		panel.find(".panel-body").html(e.find("content").html());
		panel.find(".panel-footer").html("Posted on "+e.find("date").html()+" at "+e.find("time").html()+" by <strong>"+e.find("poster").html()+"</strong>.");
	});
};

var postsJson;
iconus.getAllPosts = function(callback) {
	if (!postsJson) {
		$.get("/posts.json", function(data) {
			postsJson = data;
			if (callback) callback(postsJson.posts);
		});
	} else {
		if (callback) callback(postsJson.posts);
	}
};

iconus.getPostUrl = function(postJson) {
	return "/html/posts/"+postJson.name+".html";
}