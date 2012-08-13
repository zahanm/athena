
dogjs.on('pageload', function () {

  // JS for word cloud on browse page
  // --------------------------------
  //
  // Finding it difficult to include cutom Javascript on a loaded page

  var stopwords = /^(a|the|and|of|on|over|do|let|in|\d+)$/;

  function buildTagCloud(sourceQ, targetQ) {
    var sources, target, tagCounts;
    sources = document.querySelectorAll(sourceQ);
    target = document.querySelector(targetQ);
    tagCounts = {};

    if (!sources.length) {
      console.warn("Data for tag cloud hasn't loaded yet");
      return;
    }

    Array.prototype.forEach.call(sources, function (s) {
      var content = s.innerText || s.textContent;
      content.split(/\s+/).forEach(function (tag) {
        if (!(stopwords.exec(tag))) {
          tagCounts[tag] = tagCounts[tag] || 0;
          tagCounts[tag] += 1;
        }
      });
    });

    // clear out `target`
    while(target.firstChild) {
      target.removeChild(target.firstChild);
    }
    // calculate sizes
    var maxcount, lmaxcountp1, maxsize;
    maxcount = Math.max.apply(Math, Utilities.map(tagCounts, function (v) { return v }));
    lmaxcountp1 = Math.log(maxcount + 1);
    maxsize = 32;

    // append the list
    var ul = document.createElement('div');
    Utilities.forEach(tagCounts, function (count, tag) {
      var li = document.createElement('span');
      li.innerHTML = tag;
      li.classList.add('tag-token');
      li.style.fontSize = String( Math.log(count+1) / lmaxcountp1 * maxsize ) + 'px';
      // nice try
      // if (Math.random() < 0.5) {
      //   li.classList.add('rotated');
      // }
      ul.appendChild(li);
    });
    target.appendChild(ul);
  }

  function rebuildTagState() {
    var activetab = document.querySelector('.tab-pane.active');
    switch(activetab.id) {
      case 'browse-skills':
      buildTagCloud('#admin .cell.skill', '#browse-skills .tag-cloud');
      break;
      case 'browse-goals':
      buildTagCloud('#admin .cell.goal', '#browse-goals .tag-cloud');
      break;
      default:
    }
  }

  // FIXME using jQuery here for tabbing
  $('a[data-toggle="tab"]').on('shown', rebuildTagState);
  rebuildTagState();

}, this, true);
