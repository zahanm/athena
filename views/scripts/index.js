
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
    var learnable = document.querySelector('#answer input[name="learnable"]');
    if (learnable && document.activeElement !== learnable && learnable.value === '') {
      learnable.placeholder = examples[i];
      i = (i+1) % examples.length;
    }
    setTimeout(cycle, interval);
  }
  // no need to defer: we wait for `dogjs` to load
  cycle();
});
