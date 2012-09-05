
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
        if (search.exec(doc.children[0] && doc.children[0].dataset && doc.children[0].dataset.meta)) {
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

}, this, true);
