
dogjs.on('pageload', function () {

  // placeholder cycling
  // -------------------

  var exampleProjects, exampleSkills, interval, carousels;
  exampleProjects = [
    'make a thanksgiving dinner',
    'climb the Dish',
    'drop some rhymes',
    'build my own website'
  ];
  exampleSkills = [
    'cook',
    'hike',
    'rap',
    'programming'
  ];
  interval = 2000; // in ms
  carousels = {};

  function setupCarousel(selector, parade) {
    var elem = document.querySelector(selector);
    if (!elem || carousels[selector]) { return }
    carousels[selector] = true;
    var i = 0;
    function cycle() {
      if (elem && document.activeElement !== elem && elem.value === '') {
        elem.placeholder = parade[i];
        i = (i+1) % parade.length;
      }
    }
    setInterval(cycle, interval);
  }

  // cycle through placeholders for learnables
  function checkAllCarousels() {
    [ '#conversation input[name="value"]', '#conversation input[name="skill"]', '#conversation input[name="teachable"]' ].forEach(function (s, i) {
      setupCarousel(s, (i == 0) ? exampleProjects: exampleSkills);
    });
  }
  dogjs.on('add:node', checkAllCarousels);
  checkAllCarousels();

  function changePlaceholder(elem, ptext) {
  }

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

}, this, true);
