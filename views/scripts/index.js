
dogjs.on('load', function () {
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

  function fadeOut(elem) {
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
      }
    }
    setTimeout(fadeDelta.bind(this, elem, delta), timegap);
  }

  function setupHandlers(elem) {
    if (elem.attributes['ask'] && elem.attributes['ask'].value === "identify_yourself") {
      // this is the identify_yourself form
      elem.addEventListener('submitted:ask', function () {
        var step = document.querySelector('form[listen="goals"]');
        step && step.reset();
        ['form[ask="state_skill_needed"]', 'form[ask="state_teachable"]', 'form[ask="identify_yourself"]'].forEach(function (selector) {
          step = document.querySelector(selector);
          if (step) {
            step.reset();
            step.style.display = 'none';
          }
        });
        document.querySelector('#thanks-holder').style.display = 'block';
        fadeOut(document.querySelector('#thanks-holder'));
      });
    }
  }

  dogjs.on('add:node', setupHandlers);

  var button = document.querySelector('#admin-button');
  button.addEventListener('click', function () {
    var holder = document.querySelector('#admin-holder');
    if (holder.style.display && holder.style.display === 'block') {
      holder.style.display = 'none';
      document.querySelector('#signup-holder').style.display = 'block';
    } else {
      holder.style.display = 'block';
      document.querySelector('#signup-holder').style.display = 'none';
    }
  })
});
