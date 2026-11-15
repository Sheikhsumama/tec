/* Mathematics Classroom — Mr. Muhammad. Bright colours, a number line on the back wall, shape and number charts,
   a clock and blocks. Children count, add and find patterns before any formal name is given. */
window.TEC = window.TEC || {};
TEC.rooms = TEC.rooms || {};
TEC.rooms.maths = (function(){
  var S = TEC.stage;
  function scene(){
    var s = S.shell({ ceil:'#F2FAFF', side:'#DDEFFF', back:'#FFF7E0', floor:'#B9E4C0', seam:'#9BD2A8' });
    // number line along the top of the back wall (0 to 10)
    s += '<line x1="300" y1="112" x2="900" y2="112" stroke="#2F6FB2" stroke-width="4"/>';
    var cols = ['#E5484D','#F5761A','#F7B500','#2BA56B','#2F80ED','#8E6CEF'];
    for (var n = 0; n <= 10; n++) {
      var x = 300 + n * 60;
      s += '<circle cx="' + x + '" cy="112" r="14" fill="' + cols[n % cols.length] + '"/>';
      s += S.textAt(x, 112, n, 15, '#FFFFFF');
    }
    // clock on the back wall, left of the board
    s += '<circle cx="360" cy="236" r="46" fill="#FFFFFF" stroke="#2F6FB2" stroke-width="6"/>';
    s += '<line x1="360" y1="236" x2="360" y2="204" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/>';
    s += '<line x1="360" y1="236" x2="384" y2="246" stroke="#E5484D" stroke-width="4" stroke-linecap="round"/>';
    // left wall: shapes chart
    s += '<polygon points="' + S.quad('left',0.08,0.36,0.14,0.56) + '" fill="#FFFFFF" stroke="#2F6FB2" stroke-width="3"/>';
    s += S.textOn('left',0.15,0.25,'●',40,'#E5484D') + S.textOn('left',0.29,0.25,'■',40,'#2F80ED');
    s += S.textOn('left',0.15,0.47,'▲',40,'#F5761A') + S.textOn('left',0.29,0.47,'★',40,'#F7B500');
    // right wall: number chart 1 to 6
    s += '<polygon points="' + S.quad('right',0.12,0.46,0.14,0.6) + '" fill="#FFFFFF" stroke="#2F6FB2" stroke-width="3"/>';
    [1,2,3,4,5,6].forEach(function(v, i){
      s += S.textOn('right', 0.19 + (i % 3) * 0.1, 0.27 + Math.floor(i / 3) * 0.2, v, 34, '#2F6FB2');
    });
    // blocks on the floor, left; balls on the floor, right
    s += '<rect x="120" y="560" width="60" height="44" rx="6" fill="#E5484D"/>';
    s += '<rect x="186" y="560" width="60" height="44" rx="6" fill="#F5761A"/>';
    s += '<rect x="150" y="516" width="60" height="44" rx="6" fill="#2F80ED"/>';
    s += '<circle cx="1040" cy="584" r="24" fill="#8E6CEF"/><circle cx="1090" cy="600" r="20" fill="#2BA56B"/>';
    // a counting table in front, under the board
    s += '<rect x="440" y="500" width="320" height="16" rx="6" fill="#F7B500"/>';
    s += '<rect x="456" y="516" width="12" height="60" fill="#D49A2E"/><rect x="732" y="516" width="12" height="60" fill="#D49A2E"/>';
    return S.svg(s, 'Mathematics Classroom, looking at the board');
  }
  function addApples(desk, api){
    var apples = 3, counted = {};
    function draw(){
      var tray = '';
      for (var i = 0; i < apples; i++) {
        var on = counted[i] ? ' is-ok' : '';
        tray += '<button type="button" class="mx-apple' + on + '" data-i="' + i + '" aria-label="Apple ' + (i + 1) + '">🍎</button>';
      }
      desk.innerHTML =
        '<div class="desk-prompt">' + (apples === 3 ? 'Here are three apples. Tap the basket to add two more.' : 'Tap each apple, one at a time, to count them.') + '</div>' +
        '<div class="mx-tray">' + tray + '</div>' +
        (apples === 3 ? '<div class="pager"><button class="chip-btn" type="button" id="mx-add">🧺 Add two apples</button></div>' : '');
      var add = desk.querySelector('#mx-add');
      if (add) add.onclick = function(){
        apples = 5;
        api.board('<div class="bf-big">3 + 2</div><div class="bf-word">Three apples and two more apples.</div>');
        api.say('Three apples, and two more apples. Let us count them.');
        draw();
      };
      desk.querySelectorAll('.mx-apple').forEach(function(b){
        b.onclick = function(){
          var i = +b.getAttribute('data-i');
          if (counted[i] || apples < 5) return;
          counted[i] = true;
          var n = Object.keys(counted).length;
          api.say(['One','Two','Three','Four','Five'][n - 1] + '.');
          b.classList.add('is-ok');
          if (n === apples) {
            api.done('total');
            api.board('<div class="bf-big">3 + 2 = 5</div><div class="bf-word">Five apples in all!</div>');
            api.say('Five! Three apples and two apples make five in all.');
          }
        };
      });
    }
    draw();
  }
  function countShapes(desk, api){
    desk.innerHTML = '<div class="desk-prompt">Find the shape that is a circle.</div><div class="desk-tiles" id="sh"></div>';
    var shapes = [
      {pic:'●', word:'Circle', ok:true}, {pic:'■', word:'Square'}, {pic:'▲', word:'Triangle'}, {pic:'★', word:'Star'}
    ];
    var box = desk.querySelector('#sh');
    box.innerHTML = shapes.map(function(o, i){
      return '<button type="button" class="desk-tile' + (api.isDone(i) ? ' is-ok' : '') + '" data-i="' + i + '"><span>' + o.pic + '</span><b>' + o.word + '</b></button>';
    }).join('');
    box.querySelectorAll('.desk-tile').forEach(function(b){
      b.onclick = function(){
        var i = +b.getAttribute('data-i');
        if (shapes[i].ok) { api.done(i); b.classList.add('is-ok'); api.say('Yes! This is a circle. It has no corners.'); }
        else api.say('That one is a ' + shapes[i].word.toLowerCase() + '. Look for the round one.');
      };
    });
  }
  var lessons = [
    { title:'Add', letter:'', pic:'🍎', word:'3 + 2 = 5', sound:'Three apples, add two more', hint:'Let us put apples together and count them.',
      board:'<div class="bf-big">3 🍎</div><div class="bf-word">Three apples on the table.</div>',
      say:'Three apples. Let us add two more.', render: addApples },
    { title:'Shapes', letter:'', pic:'●', word:'Circle', sound:'Shapes', hint:'Look at the shapes on the board. Which one is round?',
      board:'<div class="bf-big">● ■ ▲ ★</div><div class="bf-word">Shapes all around us</div>',
      say:'Here are four shapes. Which one is round?', render: countShapes },
    { title:'Pattern', letter:'', pic:'🔴', word:'Red, blue, red, blue', sound:'Pattern', hint:'Look at the pattern. What comes next?',
      board:'<div class="bf-big">🔴 🔵 🔴 🔵 ?</div><div class="bf-word">What comes next?</div>',
      say:'Red, blue, red, blue. What comes next?',
      prompt:'Red, blue, red, blue. What comes next?',
      objects:[ {pic:'🔴', word:'Red', en:'red', ok:true}, {pic:'🔵', word:'Blue', en:'blue'}, {pic:'🟢', word:'Green', en:'green'} ],
      okLine:'Yes! Red comes next. The pattern goes red, blue, and then red again.',
      noLine:'Look at the pattern again. Which colour comes after blue?' }
  ];
  return {
    id:'maths', title:'Mathematics Classroom', teacher:'maths', boardClass:'board--paper',
    intro:'Welcome to the Mathematics Classroom. Let us find out how many, and what comes next.',
    scene: scene,
    hotspots: [
      { id:'numberline', label:'Number line', at: S.atXY(300,160), dialog:{ title:'Number line', html: S.grid([
          {label:'0', say:'Zero'}, {label:'1', say:'One'}, {label:'2', say:'Two'}, {label:'3', say:'Three'}, {label:'4', say:'Four'}, {label:'5', say:'Five'},
          {label:'6', say:'Six'}, {label:'7', say:'Seven'}, {label:'8', say:'Eight'}, {label:'9', say:'Nine'}, {label:'10', say:'Ten'} ]) } },
      { id:'shapes', label:'Shapes chart', at: S.at('left',0.3,0.72), dialog:{ title:'Shapes', html: S.grid([
          {label:'Circle', pic:'●', say:'Circle. It is round.'}, {label:'Square', pic:'■', say:'Square. It has four equal sides.'},
          {label:'Triangle', pic:'▲', say:'Triangle. It has three sides.'}, {label:'Star', pic:'★', say:'Star. It has five points.'} ]) } },
      { id:'numbers', label:'Number chart', at: S.at('right',0.29,0.76), dialog:{ title:'Numbers 1 to 6', html: S.grid([
          {label:'1', say:'One'}, {label:'2', say:'Two'}, {label:'3', say:'Three'}, {label:'4', say:'Four'}, {label:'5', say:'Five'}, {label:'6', say:'Six'} ]) } }
    ],
    lessons: lessons
  };
})();
