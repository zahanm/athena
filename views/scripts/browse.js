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

  // Thank you banner
  // ----------------

  function fadeOut(elem, callback) {
    elem.style.opacity = '1';
    timegap = 100;
    delta = -0.1;
    function fadeDelta(elem, amount) {
      var opacity = Number(elem.style.opacity);
      opacity += amount;
      if (opacity <= 0.1) {
        opacity = 0;
      }
      elem.style.opacity = String(opacity);
      if (opacity > 0) {
        setTimeout(fadeDelta.bind(this, elem, delta), timegap);
      } else {
        elem.style.display = 'none';
        callback && callback();
      }
    }
    setTimeout(fadeDelta.bind(this, elem, delta), timegap);
  }

  dogjs.on('submitted:listen:pair_requests', function (data) {
    ['form[ask="teacher"]', 'form[ask="suggested_skill"]'].forEach(function (selector) {
      step = document.querySelector(selector);
      if (!step) { return; }
      step.reset();
      step.style.display = 'none';
    });
    document.querySelector('#thanks-pairing').style.display = 'block';
    setTimeout(function () {
      fadeOut(document.querySelector('#thanks-pairing'), function () {
        window.location = '/browse.html';
      });
    }, 2000);
  });
}, this, true);
