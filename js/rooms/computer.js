/* Technology Laboratory — Mr. Jensen (placeholder portrait, not final).
   Dark blue discovery laboratory. The big screen on the back wall is the board. Lessons are about parts,
   cause and effect and order of steps. There is no internet, no video and no screen-time activity. */
window.TEC = window.TEC || {};
TEC.rooms = TEC.rooms || {};
TEC.rooms.tech = (function(){
  var S = TEC.stage;
  function scene(){
    var s = S.shell({ ceil:'#1B2A4E', side:'#2B4272', back:'#22365E', floor:'#3A4E7A', seam:'#2F4268' });
    // ceiling lights
    s += '<rect x="540" y="22" width="120" height="12" rx="6" fill="#CFF3FF"/>';
    s += '<rect x="180" y="26" width="90" height="10" rx="5" fill="#8FE3FF" opacity=".7"/>';
    // the big screen on the back wall (the board sits over it)
    s += '<rect x="410" y="140" width="380" height="230" rx="12" fill="#0B1530" stroke="#5EC8FF" stroke-width="10"/>';
    s += '<rect x="580" y="370" width="40" height="30" fill="#5EC8FF"/><rect x="520" y="398" width="160" height="12" rx="6" fill="#5EC8FF"/>';
    // robot on a shelf, back left
    s += '<rect x="300" y="300" width="130" height="14" rx="4" fill="#8E6CEF"/>';
    s += '<line x1="365" y1="200" x2="365" y2="182" stroke="#F7B500" stroke-width="4"/><circle cx="365" cy="178" r="6" fill="#F7B500"/>';
    s += '<rect x="335" y="200" width="60" height="40" rx="10" fill="#CFE3FF"/>';
    s += '<circle cx="353" cy="219" r="5" fill="#2F80ED"/><circle cx="377" cy="219" r="5" fill="#2F80ED"/>';
    s += '<rect x="340" y="246" width="50" height="46" rx="8" fill="#CFE3FF"/>';
    // left wall: keyboard and mouse chart
    s += '<polygon points="' + S.quad('left',0.08,0.36,0.14,0.56) + '" fill="#EAF4FF" stroke="#5EC8FF" stroke-width="3"/>';
    s += S.textOn('left',0.22,0.28,'⌨',44) + S.textOn('left',0.22,0.46,'🖱',44);
    // right wall: sequence chart
    s += '<polygon points="' + S.quad('right',0.12,0.46,0.14,0.56) + '" fill="#EAF4FF" stroke="#5EC8FF" stroke-width="3"/>';
    s += S.textOn('right',0.20,0.34,'🔌',34) + S.textOn('right',0.29,0.34,'→',30,'#2F4268') + S.textOn('right',0.38,0.34,'🔘',34);
    s += S.textOn('right',0.20,0.50,'💡',34) + S.textOn('right',0.29,0.50,'→',30,'#2F4268') + S.textOn('right',0.38,0.50,'👋',34);
    // two desks in front, with keyboards on them (illustrations only)
    s += '<rect x="70" y="570" width="250" height="26" rx="8" fill="#7C8FB5"/><rect x="92" y="596" width="12" height="60" fill="#5A6E98"/><rect x="290" y="596" width="12" height="60" fill="#5A6E98"/>';
    s += '<rect x="130" y="548" width="110" height="18" rx="4" fill="#DDE6F5"/>';
    s += '<rect x="880" y="570" width="250" height="26" rx="8" fill="#7C8FB5"/><rect x="902" y="596" width="12" height="60" fill="#5A6E98"/><rect x="1100" y="596" width="12" height="60" fill="#5A6E98"/>';
    s += '<rect x="940" y="548" width="110" height="18" rx="4" fill="#DDE6F5"/>';
    return S.svg(s, 'Technology Laboratory, looking at the screen board');
  }
  function pressLight(desk, api){
    var on = api.isDone('press');
    desk.innerHTML =
      '<div class="desk-prompt">Press the big button. What happens?</div>' +
      '<div class="tech-row"><button type="button" class="tech-btn" id="tb-press" aria-label="Big button">🔘<b>Press</b></button>' +
      '<div class="tech-lamp' + (on ? ' is-on' : '') + '" id="tb-lamp" aria-live="polite">💡<b>' + (on ? 'On!' : 'Off') + '</b></div></div>';
    desk.querySelector('#tb-press').onclick = function(){
      api.done('press');
      desk.querySelector('#tb-lamp').classList.add('is-on');
      desk.querySelector('#tb-lamp b').textContent = 'On!';
      api.board('<div class="bf-big">🔘 → 💡</div><div class="bf-word">When we press the button, the light comes on.</div>');
      api.say('Press! The light comes on. When we press a button, something happens.');
    };
  }
  function orderSteps(desk, api){
    var steps = [
      {pic:'🔌', word:'Plug in', n:1}, {pic:'🔘', word:'Press start', n:2}, {pic:'👋', word:'Robot waves', n:3}
    ];
    var show = [steps[2], steps[0], steps[1]];   // shown out of order
    var next = 1;
    function draw(){
      desk.innerHTML =
        '<div class="desk-prompt">Put the steps in order. Start with step 1.</div>' +
        '<div class="desk-tiles">' + show.map(function(st){
          var used = st.n < next;
          return '<button type="button" class="desk-tile' + (used ? ' is-ok' : '') + '" data-n="' + st.n + '"><span>' + st.pic + '</span><b>Step ' + st.n + '</b><small>' + st.word + '</small></button>';
        }).join('') + '</div>';
      desk.querySelectorAll('.desk-tile').forEach(function(b){
        b.onclick = function(){
          var n = +b.getAttribute('data-n');
          if (n < next) return;
          if (n === next) {
            next++;
            api.say('Step ' + n + ': ' + steps[n - 1].word + '.');
            if (next > steps.length) {
              api.done('order');
              api.board('<div class="bf-big">🔌 → 🔘 → 👋</div><div class="bf-word">Plug in, press start, the robot waves.</div>');
              api.say('Well done! Plug in, press start, and the robot waves.');
            }
            draw();
          } else {
            api.say('Not yet. Start with step ' + next + ', then go on in order.');
          }
        };
      });
    }
    draw();
  }
  var lessons = [
    { title:'Parts', letter:'', pic:'🖱', word:'Keyboard, mouse, screen', sound:'Parts of a computer',
      hint:'Look at the screen board. Which part do we move to point at things?',
      board:'<div class="bf-big">🖥 ⌨ 🖱</div><div class="bf-word">Screen, keyboard and mouse</div>',
      say:'Here are the screen, the keyboard and the mouse.',
      prompt:'Find the mouse.',
      objects:[ {pic:'🖱', word:'Mouse', en:'we move it to point', ok:true}, {pic:'⌨', word:'Keyboard', en:'we press the keys'}, {pic:'🖥', word:'Screen', en:'we see pictures'}, {pic:'🔊', word:'Speaker', en:'we hear sound'} ],
      okLine:'Yes! This is the mouse. We move it to point at things.', noLine:'Not this one. Look for the small thing we move with our hand.' },
    { title:'Cause and effect', letter:'', pic:'💡', word:'Press → light', sound:'Press and see',
      hint:'Press the button and watch the lamp.',
      board:'<div class="bf-big">🔘 → 💡</div><div class="bf-word">Press the button and see</div>',
      say:'Press the button and watch what happens.',
      render: pressLight },
    { title:'Order', letter:'', pic:'🔌', word:'Plug in, press, wave', sound:'Put the steps in order',
      hint:'Some steps are mixed up. Start with step 1.',
      board:'<div class="bf-big">1 · 2 · 3</div><div class="bf-word">Put the steps in order</div>',
      say:'Some steps are mixed up. Put them in order.',
      render: orderSteps }
  ];
  return {
    id:'tech', title:'Technology Laboratory', teacher:'tech', boardClass:'board--screen',
    intro:'Hi! Welcome to the Technology Laboratory. Let us look at the parts of a computer, and what happens when we press a button.',
    scene: scene,
    hotspots: [
      { id:'keyboard', label:'Keyboard and mouse chart', at: S.at('left',0.3,0.72), dialog:{ title:'Keyboard and mouse', html: S.grid([
          {label:'Keyboard', pic:'⌨', say:'The keyboard has keys with letters and numbers.'},
          {label:'Mouse', pic:'🖱', say:'The mouse moves the pointer on the screen. We click with it.'} ]) } },
      { id:'sequence', label:'Sequence chart', at: S.at('right',0.29,0.72), dialog:{ title:'Steps in order', html: S.grid([
          {label:'Plug in', pic:'🔌', say:'First, plug in.'}, {label:'Press', pic:'🔘', say:'Then, press start.'}, {label:'Light', pic:'💡', say:'Something happens. The light comes on.'} ]) } },
      { id:'robot', label:'Robot', at: S.atXY(365,240), dialog:{ title:'Robot', html: S.grid([
          {label:'Robot', pic:'🤖', say:'A robot does what we tell it, step by step.'} ]) } }
    ],
    lessons: lessons
  };
})();
