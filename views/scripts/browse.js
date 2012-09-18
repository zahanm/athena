dogjs.configure({
  templates: '/templates-browse.html'
});

dogjs.on('pageload', function () {

  var peoplefilter = document.getElementById('peoplefilter');
  peoplefilter && peoplefilter.addEventListener('keyup', function (ev) {
    var corpus = document.querySelectorAll('.thumbnails > li');
    if (ev.target && ev.target.value) {
      console.log('search:', ev.target.value);
      var query = ev.target.value.split(/\s+/).join('|');
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
	debugger;
    ['form[ask="teacher"]', 'form[ask="student"]'].forEach(function (selector) {
      step = document.querySelector(selector);
      if (!step) { return; }
      step.reset();
      step.style.display = 'none';
    });
    document.querySelector('#thanks-pairing').style.display = 'block';
    setTimeout(function () {
      fadeOut(document.querySelector('#thanks-pairing'), function () {
        window.location = '/index.html';
      });
    }, 2000);
  });
}, this, true);
