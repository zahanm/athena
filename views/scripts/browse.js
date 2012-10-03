dogjs.configure({
  templates: '/templates-browse.html'
});

dogjs.on('pageload', function () {

  // Filter function
  function createSearcher(corpusSelector) {
    return function (ev) {
      var corpus = document.querySelectorAll(corpusSelector);
      var filterString = ev && ev.target && ev.target.value;
      if (filterString && filterString.length) {
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
        Array.prototype.forEach.call(corpus, function (doc) {
          doc.style.display = 'list-item';
        });
      }
    }
  }

  var peoplefilter = document.getElementById('peoplefilter');
  peoplefilter && peoplefilter.addEventListener('keyup', createSearcher('.people-grid > li'));
  // Get URL params
  var urlparams = Utilities.fromqs(document.location.search);
  if (urlparams["interest"]) {
    peoplefilter.value = urlparams["interest"];
    var ev = document.createEvent("KeyboardEvent");
    ev.initKeyboardEvent('keyup', true, true, window, false, false, false, false, 0, 0);
    peoplefilter.dispatchEvent(ev);
  }

  // Fill in ID for new pair dialog, so we can launch from
  // the user card
  function formatDialog() {
    var dialog_id = 'pairDialog';
    var dialog = document.getElementById(dialog_id);
    var profile_id = $(dialog).data('profile');
    $(dialog).attr("id", dialog_id+"-"+profile_id);
  }
  dogjs.on('add:node', formatDialog);

}, this, true);
