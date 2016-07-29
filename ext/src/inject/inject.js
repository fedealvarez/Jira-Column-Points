(function(doc) {
    var target = doc.getElementById('gh'),
        observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                init();
            });
        }),
        config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
    doc.addEventListener('DOMContentLoaded', function(){
        doc.removeEventListener('DOMContentLoaded', arguments.callee, false );
        init();
    }, false );

    function init(){
        try {
            var headers = doc.querySelectorAll('.ghx-column-headers .ghx-column'),
                cols = doc.querySelectorAll('.ghx-columns')[0].childNodes,
                results = [],
                total_points = 0,
                board_header = doc.getElementById('ghx-modes-tools');

            if(!doc.getElementById('jcp-board-points')) {
                board_header.innerHTML += '<div id="jcp-board-points"></div>';
            }

            for (var i = 0; i < headers.length; i++) {
                headers[i].querySelector('h2').innerHTML += '<div class="jcp-col-points"></div>';
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

            doc.getElementById('jcp-board-points').innerHTML = total_points;
        }
        catch(e) {}
    };

})(document)
