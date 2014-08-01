var jiraPoints = function(){
    try {
    	var headers = document.querySelectorAll('.ghx-column-headers .ghx-column'),
        cols = document.querySelectorAll('.ghx-columns')[0].childNodes,
        results = [];

	    for (var i = 0; i < headers.length; i++) {
	        headers[i].querySelector('h2').innerHTML += '<div style="background: #cdcdcd; border-radius: 8px; font-size: 12px; width: 25px; text-align: center; position: absolute; bottom: 5px; right: 5px;"></div>';
	    }

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
	        results.push({'name': headers[i].querySelector('h2').innerHTML,'points' : col_points});
	        headers[i].querySelector('h2 div').innerHTML = '<b>' + col_points + '</b>';

	    }
	    console.log('Done!');
    }
    catch(e) {}
};

var target = document.getElementById('gh');
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        jiraPoints();
    });    
});
var config = { attributes: true, childList: true, characterData: true };
observer.observe(target, config);

document.addEventListener('DOMContentLoaded', function(){
	document.removeEventListener('DOMContentLoaded', arguments.callee, false );
	jiraPoints();
}, false );