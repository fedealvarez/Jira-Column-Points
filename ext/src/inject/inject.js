var jiraPoints = function(){
    try {
    	var headers = document.querySelectorAll('.ghx-column-headers .ghx-column'),
        	cols = document.querySelectorAll('.ghx-columns')[0].childNodes,
        	results = [],
        	total_points = 0,
        	board_name = document.getElementById('ghx-board-name');

        if(!document.getElementById('jcp-board-points')) {
        	board_name.innerHTML += '<div id="jcp-board-points" style="background: #cdcdcd; border-radius: 10px; font-size: 12px; min-width: 20px; display: inline; padding: 0 2px; font-weight: bold; margin: 6px; position: absolute; text-align: center"></div>';
        }

	    for (var i = 0; i < headers.length; i++) {
	        headers[i].querySelector('h2').innerHTML += '<div style="background: #cdcdcd; border-radius: 10px; font-size: 12px; min-width: 20px; text-align: center; position: absolute; bottom: 5px; right: 5px; padding: 0 2px;"></div>';
	    }

	    for (var i = 0; i < headers.length; i++) {
	        var col_points = 0,
	            curr_col = cols[i],
	            issues = curr_col.querySelectorAll('.ghx-issue');

	        for (var j = 0; j < issues.length; j++) {
	            var curr_issue = issues[j],
	                issue_points = curr_issue.querySelector('span.aui-badge');

	            if (issue_points && !isNaN(parseFloat(issue_points.innerHTML))) {
	                col_points += parseFloat(issue_points.innerHTML);
	            }
	        }
	        results.push({'name': headers[i].querySelector('h2').innerHTML,'points' : col_points});
	        headers[i].querySelector('h2 div').innerHTML = '<b>' + col_points + '</b>';
	        total_points += col_points;
	    }
	    
	    document.getElementById('jcp-board-points').innerHTML = total_points;
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