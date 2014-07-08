var headers = $(".ghx-column-headers .ghx-column");
var cols = $('.ghx-column.ui-sortable');
var results = [];
var initialized = false;
var initialize = function() {
	for (var i = 0; i < headers.length; i++) {
		headers[i].children[0].innerHTML += "<div></div>";
	}
	initialized = true;
	calculate();
};
var calculate = function() {
	for (var i = 0; i < headers.length; i++) {
	    var col_points = 0;
	    var curr_col = cols[i];
	    var issues = $(curr_col).find('div.ghx-issue');
	    for (var j = 0; j < issues.length; j++) {
	      var curr_issue = issues[j];
	      var issue_points = parseFloat($(curr_issue).find('span.aui-badge').html());
	      if (issue_points && !isNaN(issue_points)) {
	          col_points += issue_points;
	      }
	    }
	    results.push({"name": headers[i].children[0].innerHTML,
	     "points" : col_points});
		headers[i].children[0].children[0].innerHTML = "<b>(" + col_points + ")</b>";
	    /*console.log(headers[i].children[0].innerHTML +
	     ": " + col_points)*/
	};
	console.log('Done!');
}

if(!initialized) {
	initialize();
}
else {
	calculate();
}
//Type calculate() on console to execute it on demand