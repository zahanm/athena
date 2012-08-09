
dogjs.on('pageload', function () {

  // placeholder cycling
  // -------------------

  var examples, i, interval;
  examples = [
    'learn to rap',
    'cook a thanksgiving dinner',
    'hike the Dish',
    'build your own website'
  ];
  i = 0;
  interval = 2000; // in ms
  function cycle(argument) {
    // cycle through placeholders for learnables
    var learnable, teachable;
    learnable = document.querySelector('#conversation input[name="skill"]');
    teachable = document.querySelector('#conversation input[name="teachable"]');
    [ learnable, teachable ].forEach(function (elem) {
      if (elem && document.activeElement !== elem && elem.value === '') {
        elem.placeholder = examples[i];
        i = (i+1) % examples.length;
      }
    });
    // setTimeout(cycle, interval);
  }
  // no need to defer: we wait for `dogjs` to load
  cycle();

  function changePlaceholder(elem, ptext) {
  }

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

  // setting up event handlers
  // -------------------------

  // this is the identify_yourself form submission
  dogjs.on('submitted:ask:identify_yourself', function (data) {
    ['form[listen="goals"]', 'form[ask="state_skill_needed"]', 'form[ask="state_teachable"]', 'form[ask="identify_yourself"]'].forEach(function (selector) {
      step = document.querySelector(selector);
      if (!step) { return; }
      step.reset();
      step.style.display = 'none';
    });
    document.querySelector('#thanks-holder').style.display = 'block';
    setTimeout(function () {
      fadeOut(document.querySelector('#thanks-holder'), function () {
        dogjs.changePage('browse');
      });
    }, 2000);
  });

  var changer = document.querySelector('#change-page');
  changer && changer.addEventListener('submit', function (ev) {
    ev.preventDefault();
    destination = changer.querySelector('input[type="text"]');
    dogjs.changePage(destination.value);
    return false;
  });

  // JS for word cloud on browse page
  // --------------------------------
  //
  // Finding it difficult to include cutom Javascript on a loaded page

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
        tagCounts[tag] = tagCounts[tag] || 0;
        tagCounts[tag] += 1;
      });
    });

    target.innerHTML = '<ul>';
    Utilities.forEach(tagCounts, function (count, tag) {
      target.innerHTML += '<li>' + tag + ' => ' + count + '</li>';
    });
    target.innerHTML += '</ul>';
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
      console.warn('Unrecognized active tab: ' + activetab.id);
    }
  }

  if (document.querySelector('#browse-skills')) {
    // FIXME using jQuery here for tabbing
    $('a[data-toggle="tab"]').on('shown', rebuildTagState);
    rebuildTagState();
  }

});
