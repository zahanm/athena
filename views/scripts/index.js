
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

  // setting up event handlers
  // -------------------------

  var changer = document.querySelector('#change-page');
  changer && changer.addEventListener('submit', function (ev) {
    ev.preventDefault();
    destination = changer.querySelector('input[type="text"]');
    dogjs.changePage(destination.value);
    return false;
  });

});
