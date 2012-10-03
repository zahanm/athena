dogjs.configure({
  templates: '/templates-browse.html'
});

dogjs.on('pageload', function () {

  // Filter function
  function filterCards(ev, filterString) {
    var corpus = document.querySelectorAll('profile');
	if (ev && ev.target && ev.target.value) {
		filterString = ev.target.value;
	}
    if (filterString) {
      console.log('search:',filterString);
      var query = filterString.split(/\s+/).join('|');
      var search = new RegExp('\\b(' + query + ')', 'i');
      Array.prototype.forEach.call(corpus, function (doc) {
        if (search.exec(doc.dataset && doc.dataset.meta)) {
          doc.style.display = 'list-item';
        } else {
          doc.style.display = 'none';
        }
      });
	} else {
      console.log('clear search');
      Array.prototype.forEach.call(corpus, function (doc) {
        doc.style.display = 'list-item';
      });
    }
  }

  // Get URL params
  var searchString = document.location.search;
  searchString = searchString.substring(1);
  var nvPairs = searchString.split("&");

  for (i = 0; i < nvPairs.length; i++)
  {
	var nvPair = nvPairs[i].split("=");
	var name = nvPair[0];
	var value = nvPair[1];
	if (name=='interest') {
		console.log("url param: ",name+" "+value);
		filterCards(null, value);
		var peoplefilter = document.getElementById('peoplefilter');
		peoplefilter.value = value;
		console.log("url param: ", peoplefilter.value);
	}
  }

  var peoplefilter = document.getElementById('peoplefilter');
  peoplefilter && peoplefilter.addEventListener('keyup', function (ev) {
    filterCards(ev, '');
  });

  // Fill in ID for new pair dialog, so we can launch from
  // the user card
  function formatDialog() {	
	var dialog_id = 'pairDialog';
	var dialog = document.getElementById(dialog_id);
	console.log($(dialog).data('profile'));
	var profile_id = $(dialog).data('profile');
	$(dialog).attr("id", dialog_id+"-"+profile_id);
  }
  dogjs.on('add:node', formatDialog);
}, this, true);
