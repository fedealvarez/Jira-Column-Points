var jiraPoints = (function(document){
    var headers = document.querySelectorAll('.ghx-column-headers .ghx-column'),
        cols = document.querySelectorAll('.ghx-column.ui-sortable'),
        results = [],
        initialized = false;

    var initialize = function() {
        for (var i = 0; i < headers.length; i++) {
            headers[i].querySelector('h2').innerHTML += "<div></div>";
        };
        initialized = true;
        calculate();
    };
    
    var calculate = function() {
        for (var i = 0; i < headers.length; i++) {
            var col_points = 0,
                curr_col = cols[i],
                issues = curr_col.querySelectorAll('.ghx-issue');

            for (var j = 0; j < issues.length; j++) {
                var curr_issue = issues[j],
                    issue_points = parseFloat(curr_issue.querySelector('span.aui-badge').innerHTML);

                if (issue_points && !isNaN(issue_points)) {
                    col_points += issue_points;
                }
            }
            results.push({"name": headers[i].querySelector('h2').innerHTML,"points" : col_points});
            headers[i].querySelector('h2 div').innerHTML = "<b>(" + col_points + ")</b>";

        };
        console.log('Done!');
    }

    if(!initialized) {
        initialize();
    }
    else {
        calculate();
    }

    return {
        update : calculate
    }
    // Type jiraPoints.update() to refresh
})(document);
