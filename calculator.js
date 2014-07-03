var headers = $(".ghx-column-headers .ghx-column");
var cols = $('.ghx-column.ui-sortable');
var results = [];
for (var i = 0; i < headers.length; i++) {
    var col_points = 0;
    var curr_col = cols[i];
    var issues = $(curr_col).find('div.ghx-issue');
    for (var j = 0; j < issues.length; j++) {
      var curr_issue = issues[j];
      var issue_points = $(curr_issue).find('span.aui-badge').html();
      if (issue_points && !isNaN(issue_points)) {
          col_points += parseInt(issue_points);
      }
    }
    results.push({"name": headers[i].children[0].innerHTML,
     "points" : col_points});
	headers[i].children[0].innerHTML += " (" + col_points + ")";
    console.log(headers[i].children[0].innerHTML +
     ": " + col_points)
};

