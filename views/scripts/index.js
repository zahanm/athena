
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
  });
  button = document.querySelector('#admin-button');
  button.addEventListener('click', function () {
    var holder = document.querySelector('#admin-holder');
    if (holder.style.display && holder.style.display === 'block') {
      holder.style.display = 'none';
    } else {
      holder.style.display = 'block';
    }
  })
});
