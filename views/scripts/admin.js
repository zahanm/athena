
dogjs.on('pageload', function () {

  var ArrProto = Array.prototype;

  var pickers = {}, picking, pairingform, teacher, learner;
  pairingform = document.getElementById('pairing-form');

  function pickMode(modeButton) {
    picking = modeButton;
    ArrProto.forEach.call(pickers, function (p) { p.classList.remove('active'); });
    modeButton.classList.add('active');
  }

  pickers = document.querySelectorAll('#pairing .picker');
  ArrProto.forEach.call(pickers, function (picker) {
    picker.addEventListener('click', function (ev) {
      pickMode(ev.target);
    });
  });
  pickMode(pickers[0]);

  function pickPerson(clicked) {
    while (!clicked.classList.contains('people-row') && clicked != document.body) {
      clicked = clicked.parentNode;
    }
    var name = clicked.querySelector('.name');
    name = name.innerText || name.textContent;
    picking.innerHTML = (picking.dataset.picker === 't' ? 'Teacher: ' : 'Learner: ') + name;
    pairingform[picking.dataset.picker === 't' ? 'teacher' : 'learner'].value = name;
  }

  dogjs.on('add:node', function (node) {
    if (node.classList.contains('people-row')) {
      node.addEventListener('click', function (ev) {
        pickPerson(ev.target);
      });
    }
  });

  pairingform.querySelector('button[type="submit"]').addEventListener('click', function (ev) {
    if (!pairingform.teacher.value || !pairingform.learner.value) {
      alert('You must pick both a learner and a teacher.');
      ev.preventDefault();
      return false;
    }
    return true;
  })

}, this, true);
