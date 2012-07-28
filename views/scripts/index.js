
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
    learnable = document.querySelector('#conversation input[name="learnable"]');
    teachable = document.querySelector('#conversation input[name="teachable"]');
    [ learnable, teachable ].forEach(function (elem) {
      if (elem && document.activeElement !== elem && elem.value === '') {
        elem.placeholder = examples[i];
        i = (i+1) % examples.length;
      }
    });
    setTimeout(cycle, interval);
  }
  // no need to defer: we wait for `dogjs` to load
  cycle();

  function fadeOut(elem) {
    elem.style.opacity = '1';
    timegap = 100;
    delta = -0.1;
    function fadeDelta(elem, amount) {
      if (Math.abs(Number(elem.style.opacity) + amount) < 0.00001) {
        elem.style.opacity = '0';
      }
      else {
        elem.style.opacity = Number(elem.style.opacity) + amount;
      }
      if (Number(elem.style.opacity) > 0) {
        setTimeout(fadeDelta.bind(this, elem, delta), timegap);
      }
    }
    setTimeout(fadeDelta.bind(this, elem, delta), timegap);
  }

  var button = document.querySelector('#start-finding > button');
  button.addEventListener('click', function () {
    document.querySelector('#state-teachable').style.display = 'block';
  });
  button = document.querySelector('#state-teachable > button');
  button.addEventListener('click', function () {
    document.querySelector('#identify-themself').style.display = 'block';
  });
  button = document.querySelector('#identify-themself > input[type="submit"]');
  button.addEventListener('click', function () {
    document.querySelector('#state-teachable').style.display = 'none';
    document.querySelector('#identify-themself').style.display = 'none';
    document.querySelector('#thanks-holder').style.display = 'block';
    fadeOut(document.querySelector('#thanks-holder'));
  });
  button = document.querySelector('#admin-button');
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
