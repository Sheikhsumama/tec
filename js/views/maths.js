/* Level 1 Mathematics lesson page. One screen, no classrooms: the teacher is shown above and
   a single long board is below. The teacher speaks each line (voice can be switched off), and a
   pointing arrow moves to the things he talks about (counting one, two, three; sorting; addition).
   Lessons follow the methodology: experience, observe, discover, explain, apply, recap.
   Only Sorting, Counting and Addition are written so far (samples for review). */
TEC.views = TEC.views || {};

/* ---------- Drawing helpers (SVG, board is 1000 x 300) ---------- */
TEC.mathDraw = (function(){
  var ob = 'M0,-14 C10,-24 30,-18 28,4 C26,26 12,30 0,22 C-12,30 -26,26 -28,4 C-30,-18 -10,-24 0,-14 Z';
  function wrap(id, hl, inner, x, y, s){
    return '<g class="m-obj' + (hl ? ' is-on' : '') + '"' + (id ? ' data-id="' + id + '"' : '') +
      ' transform="translate(' + x + ',' + y + ') scale(' + (s || 1) + ')"><g class="m-in">' +
      '<ellipse cx="0" cy="32" rx="26" ry="6" fill="#1F2A44" opacity=".14"/>' + inner + '</g></g>';
  }
  var kinds = {
    apple: function(){ return '<path d="' + ob + '" fill="url(#gApple)"/><ellipse cx="-9" cy="-4" rx="5" ry="9" fill="#fff" opacity=".35" transform="rotate(20 -9 -4)"/><path d="M0,-14 q2,-14 9,-18" stroke="#6B4A2B" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="14" cy="-27" rx="11" ry="6" fill="#2BA56B" transform="rotate(-20 14 -27)"/>'; },
    banana: function(){ return '<path d="M-32,-20 C-10,22 22,28 34,-8 C26,10 2,16 -18,-8 C-22,-12 -28,-16 -32,-20 Z" fill="url(#gBanana)"/>'; },
    block: function(){ return '<rect x="-26" y="-26" width="52" height="52" rx="9" fill="url(#gBlue)"/><rect x="-22" y="-22" width="44" height="8" rx="4" fill="#fff" opacity=".3"/>'; },
    ball: function(){ return '<circle r="26" fill="url(#gBall)"/><circle cx="-8" cy="-9" r="7" fill="#fff" opacity=".45"/>'; },
    circle: function(){ return '<circle r="26" fill="url(#gOrange)"/>'; },
    square: function(){ return '<rect x="-26" y="-26" width="52" height="52" rx="5" fill="url(#gGreen)"/>'; }
  };
  function item(kind, x, y, opts){ opts = opts || {}; return wrap(opts.id, opts.hl, kinds[kind](), x, y, opts.s || 1); }
  /* A row of n objects centred on cx. */
  function row(kind, cx, cy, n, opts){
    var out = '', gap = (opts && opts.gap) || 66;
    for (var i = 0; i < n; i++) {
      var x = cx + (i - (n - 1) / 2) * gap;
      out += item(kind, x, cy, opts && opts.idOf ? { id: opts.idOf(i), hl: opts.hl && opts.hl(i), s: (opts && opts.s) || 0.9 } : { s: (opts && opts.s) || 0.9 });
    }
    return out;
  }
  function person(x, name, color){
    return '<g transform="translate(' + x + ',60)"><ellipse cx="0" cy="98" rx="34" ry="6" fill="#1F2A44" opacity=".12"/>' +
      '<circle cx="0" cy="-30" r="21" fill="url(#gSkin)"/>' +
      '<path d="M-20,-36 Q0,-58 20,-36 Q14,-44 0,-44 Q-14,-44 -20,-36 Z" fill="#3B2A1E"/>' +
      '<path d="M-28,-6 h56 v40 a22,22 0 0 1 -22,22 h-12 a22,22 0 0 1 -22,-22 Z" fill="' + color + '"/>' +
      '<text x="0" y="96" text-anchor="middle" font-size="26" font-weight="700" fill="#1F2A44">' + name + '</text></g>';
  }
  function text(x, y, t, size){
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + (size || 40) + '" font-weight="700" fill="#1F2A44">' + t + '</text>';
  }
  /* Two-person scene: each person with a row of apples under them. */
  function people(list){
    return list.map(function(p){
      return person(p.x, p.name, p.color) + row('apple', p.x, 215, p.apples, { gap: 58, s: 0.8 });
    }).join('');
  }
  var defs = '<defs>' +
    '<radialGradient id="gApple" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#FF9B9B"/><stop offset=".55" stop-color="#E5484D"/><stop offset="1" stop-color="#A4232A"/></radialGradient>' +
    '<radialGradient id="gBanana" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#FFE27A"/><stop offset="1" stop-color="#E2A100"/></radialGradient>' +
    '<linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5AA0F5"/><stop offset="1" stop-color="#1F6BD1"/></linearGradient>' +
    '<radialGradient id="gBall" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#B9A4FF"/><stop offset="1" stop-color="#6A4BD6"/></radialGradient>' +
    '<radialGradient id="gOrange" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#FFB27A"/><stop offset="1" stop-color="#D9560B"/></radialGradient>' +
    '<linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4CC48A"/><stop offset="1" stop-color="#1F8A57"/></linearGradient>' +
    '<radialGradient id="gSkin" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#F9D6B5"/><stop offset="1" stop-color="#E8B48A"/></radialGradient>' +
    '<linearGradient id="gFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFE3CC"/><stop offset="1" stop-color="#D9C3A0"/></linearGradient>' +
    '</defs>';
  function svg(inner){
    return '<svg viewBox="0 0 1000 300" role="img" aria-label="Lesson picture" preserveAspectRatio="xMidYMid meet">' + defs +
      '<rect x="0" y="262" width="1000" height="38" fill="url(#gFloor)" opacity=".55"/>' + inner + '</svg>';
  }
  return { svg: svg, item: item, row: row, people: people, text: text, person: person, kinds: kinds };
})();

/* ---------- Lessons ----------
   Step kinds: teach (optionally with points the pointer visits), ask (typed answer),
   choose (tap the right things), end (recap). points: [{x, y, label, say}] in board coordinates. */
TEC.mathLessons = {
  sorting: {
    n: 3, title: 'Sorting and Classification',
    steps: [
      { kind:'teach', say:'Look at these fruits. Some are apples, and some are bananas.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('apple', 230, 120, 3, {gap:90, s:1}) + D.row('banana', 700, 120, 3, {gap:90, s:1}) + D.text(500, 255, 'Apples and bananas', 36)); },
        points: [
          { x:230, y:120, label:'Apples', say:'These are apples. Apples are round and red.' },
          { x:700, y:120, label:'Bananas', say:'These are bananas. Bananas are long and yellow.' }
        ] },
      { kind:'choose', say:'Tap all the apples.', target:'apple',
        items: [['apple'],['banana'],['apple'],['banana'],['apple'],['banana']],
        hint:['Look for the round red fruit.'], reveal:'Apples are round and red. Tap each one.',
        right:'Yes! Those are all the apples. Apples go together, and bananas go together.' },
      { kind:'teach', say:'Now we sort shapes. Circles go in one group, and squares go in another.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('circle', 230, 120, 2, {gap:110, s:1}) + D.row('square', 700, 120, 2, {gap:110, s:1}) + D.text(500, 255, 'Circles and squares', 36)); },
        points: [
          { x:230, y:120, label:'Circle', say:'This is a circle. It has no corners.' },
          { x:700, y:120, label:'Square', say:'This is a square. It has four corners.' }
        ] },
      { kind:'choose', say:'Tap all the circles.', target:'circle',
        items: [['circle'],['square'],['circle'],['square'],['circle'],['square']],
        hint:['Circles have no corners.'], reveal:'A circle is round all the way around. Tap the round ones.',
        right:'Yes! Circles have no corners, and squares have four corners.' },
      { kind:'end', say:'What did we discover? Things that are alike can go in one group. This is called sorting.' }
    ]
  },
  counting: {
    n: 9, title: 'Counting Real Objects',
    steps: [
      { kind:'teach', say:'Let us count the apples together. Watch the arrow.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('apple', 500, 110, 5, {gap:120, s:1})); },
        points: [
          { x:260, y:110, label:'1', say:'This is one.' },
          { x:380, y:110, label:'2', say:'This is two.' },
          { x:500, y:110, label:'3', say:'This is three.' },
          { x:620, y:110, label:'4', say:'This is four.' },
          { x:740, y:110, label:'5', say:'This is five. Five apples altogether!' }
        ] },
      { kind:'ask', say:'Now you count. How many apples are there?', answer:4,
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('apple', 500, 130, 4, {gap:120, s:1})); },
        hint:['Touch each apple once, and say the numbers in order.'], reveal:'Count with me: one, two, three, four. The last number tells us how many there are.',
        right:'Yes! There are 4 apples. The last number we say tells us how many.' },
      { kind:'ask', say:'Let us try again. How many balls are there?', answer:5,
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('ball', 500, 130, 5, {gap:112, s:0.9})); },
        hint:['Point to each ball, one at a time, and count out loud.'], reveal:'One, two, three, four, five. Five balls.',
        right:'Yes! Five balls. You counted each one and kept the last number.' },
      { kind:'end', say:'What did we discover? When we count one by one, the last number tells us how many there are.' }
    ]
  },
  addition: {
    n: 19, title: 'Understanding Addition',
    steps: [
      { kind:'teach', say:'Look! Ali has two apples. Watch the arrow.',
        scene: function(){ return TEC.mathDraw.svg(TEC.mathDraw.people([{x:280,name:'Ali',color:'#2F80ED',apples:2},{x:720,name:'Hassan',color:'#2BA56B',apples:0}])); },
        points: [
          { x:251, y:215, label:'1', say:'Ali has one apple.' },
          { x:309, y:215, label:'2', say:'And two apples.' }
        ] },
      { kind:'teach', say:'Hassan also has two apples.',
        scene: function(){ return TEC.mathDraw.svg(TEC.mathDraw.people([{x:280,name:'Ali',color:'#2F80ED',apples:2},{x:720,name:'Hassan',color:'#2BA56B',apples:2}])); },
        points: [
          { x:691, y:215, label:'1', say:'Hassan has one apple.' },
          { x:749, y:215, label:'2', say:'And another apple.' }
        ] },
      { kind:'teach', say:'Ali gives his two apples to Hassan. Watch what happens.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.person(280,'Ali','#2F80ED') + D.person(720,'Hassan','#2BA56B') + D.row('apple', 720, 215, 2, {gap:58, s:0.8}) + D.row('apple', 500, 150, 2, {gap:70, s:0.9}) + D.text(500, 255, 'From Ali', 30)); },
        points: [
          { x:465, y:150, label:'Ali', say:'Ali gives one apple.' },
          { x:535, y:150, label:'Ali', say:'And another apple.' }
        ] },
      { kind:'ask', say:'Now Hassan has his apples and Ali\'s apples. How many apples does Hassan have?', answer:4,
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.person(280,'Ali','#2F80ED') + D.person(720,'Hassan','#2BA56B') + D.row('apple', 720, 215, 2, {gap:58, s:0.8}) + D.row('apple', 500, 150, 2, {gap:70, s:0.9}) + D.text(500, 255, 'From Ali', 30)); },
        after: function(){ var D = TEC.mathDraw; return D.svg(D.person(280,'Ali','#2F80ED') + D.person(720,'Hassan','#2BA56B') + D.row('apple', 720, 215, 4, {gap:58, s:0.8})); },
        hint:['Count Hassan\'s apples one by one. Then count the ones Ali gave him.'],
        reveal:'Put them together: two apples and two apples. Count all of them: one, two, three, four.',
        right:'Yes! 4 apples. Two apples and two apples make four apples. When we bring two groups together, we are adding. This is called addition.' },
      { kind:'teach', say:'We write addition with symbols. The plus sign means "put together". Two plus two is four.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('apple', 500, 110, 4, {gap:80, s:0.9}) + D.text(500, 260, '2 + 2 = 4', 56)); } },
      { kind:'ask', say:'Your turn. Sara has 3 blocks. Her friend gives her 1 block. How many blocks does Sara have now?', answer:4,
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('block', 380, 130, 3, {gap:70, s:0.85}) + D.row('block', 700, 130, 1, {gap:70, s:0.85})); },
        hint:['Put all the blocks into one group.'], reveal:'Three blocks and one block: one, two, three, four. Sara has 4 blocks.',
        right:'Yes! 3 blocks and 1 block make 4 blocks. That is addition, with toys and blocks too.' },
      { kind:'end', say:'What did we discover? When we put two groups together, the total becomes bigger. This is addition.' }
    ]
  }
};

/* ---------- Strand outline of the 50 Level 1 topics (open topics have a lesson) ---------- */
TEC.mathStrands = [
  ['A. Foundations of Mathematics', ['One and Many','Matching Objects','Sorting and Classification','Same and Different','Grouping Objects','Comparing Objects','Recognising and Describing Attributes']],
  ['B. Numbers and Counting', ['Understanding Quantities','Counting Real Objects','Forward Counting','Number Recognition','Number and Quantity Association','Ordering Numbers','Before, After and Between','More, Less and Equal','Comparing Two Groups']],
  ['C. Basic Arithmetic', ['Combining Groups','Separating Groups','Understanding Addition','Addition Using Objects','Understanding Subtraction','Subtraction Using Objects','Simple Number Relationships','Everyday Mathematical Problems']],
  ['D. Shapes and Geometry', ['Recognising Basic Shapes','Circles, Squares, Triangles and Rectangles','Shapes in Everyday Objects','Understanding Size and Shape','Basic Spatial Awareness','Position and Direction']],
  ['E. Patterns and Logical Thinking', ['Recognising Patterns','Repeating Patterns','Completing Patterns','Creating Simple Patterns','Sorting by Rules','Basic Logical Reasoning']],
  ['F. Measurement and Comparison', ['Big and Small','Long and Short','Tall and Short','Heavy and Light','Full and Empty','More and Less','Comparing Lengths and Heights','Understanding Basic Time and Daily Sequences']],
  ['G. Practical Mathematics', ['Counting Everyday Objects','Sharing and Grouping','Matching Quantities','Simple Practical Measurement','Mathematical Thinking in Daily Activities','Solving Simple Real-Life Problems']]
];
/* Topic number = position in the 50-topic outline (1-based). Open lessons by number. */
TEC.mathOpenTopics = { 3:'sorting', 9:'counting', 19:'addition' };

TEC.views['class'] = function(app, key){
  if (key !== 'maths') { TEC.toast('This classroom opens in a later update'); TEC.router.go('home'); return; }
  var t = TEC.teachers.maths;
  var mp = (TEC.state.progress || {}).maths || {};
  var topicId = mp.topic && TEC.mathLessons[mp.topic] ? mp.topic : 'addition';
  var L = TEC.mathLessons[topicId];
  var voiceOn = (function(){ try { return localStorage.getItem('tec-voice') !== 'off'; } catch (e) { return true; } })();
  var idx = 0, wrongs = 0, tapped = {}, locked = false;
  var timers = [], sayToken = 0, pointerEl = null;

  /* Topic outline with numbers */
  var num = 0, outline = TEC.mathStrands.map(function(s){
    return '<div class="m-strand"><h3>' + s[0] + '</h3><div class="m-topics-row">' + s[1].map(function(name){
      num++;
      var id = TEC.mathOpenTopics[num];
      return id
        ? '<button type="button" class="m-topic is-open' + (id === topicId ? ' on' : '') + '" data-lesson="' + id + '">' + num + '. ' + name + '</button>'
        : '<span class="m-topic is-later" aria-disabled="true">' + num + '. ' + name + '</span>';
    }).join('') + '</div></div>';
  }).join('');

  app.innerHTML =
    '<nav class="room-nav" aria-label="Where you are">' +
      '<a class="back" href="#/home">← My School</a>' +
      '<span class="room-pill" style="background:' + t.color + '">Mathematics · ' + L.title + '</span>' +
      '<span class="room-dots" id="m-dots"></span>' +
    '</nav>' +
    '<section class="m-lesson">' +
      '<div class="m-teacher">' +
        '<span class="m-av" id="m-av">' + TEC.portrait(t) + '</span>' +
        '<div class="m-bubble"><div class="m-who"><b>' + t.name + '</b>' +
          '<button type="button" class="m-sound" id="m-sound" aria-pressed="' + voiceOn + '" aria-label="Teacher voice">' + (voiceOn ? '🔊 Voice on' : '🔇 Voice off') + '</button></div>' +
          '<p id="m-say" aria-live="polite"></p></div>' +
      '</div>' +
      '<div class="m-board" id="m-board"></div>' +
      '<div class="m-answer" id="m-answer"></div>' +
    '</section>' +
    '<section class="m-outline dcard" aria-label="Mathematics topics"><h2>Mathematics topics</h2>' + outline + '</section>';

  var sayEl = document.getElementById('m-say');
  var boardEl = document.getElementById('m-board');
  var answerEl = document.getElementById('m-answer');
  var dotsEl = document.getElementById('m-dots');
  var avEl = document.getElementById('m-av');
  var soundBtn = document.getElementById('m-sound');

  function later(fn, ms){ timers.push(setTimeout(fn, ms)); }
  function clearTimers(){
    timers.forEach(function(id){ clearTimeout(id); clearInterval(id); });
    timers = []; sayToken++;
    if (avEl) avEl.classList.remove('talking');
  }
  function speakLine(text){ if (voiceOn) TEC.anis.speak(text, 'en-GB'); }

  /* The teacher says a line: it types out, is spoken, and then calls done. */
  function say(text, done){
    var my = ++sayToken;
    sayEl.textContent = '';
    speakLine(text);
    avEl.classList.add('talking');
    var i = 0;
    var iv = setInterval(function(){
      if (my !== sayToken) { clearInterval(iv); return; }
      sayEl.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(iv);
        avEl.classList.remove('talking');
        if (done) later(done, 300);
      }
    }, 18);
    timers.push(iv);
  }

  function save(patch){
    var p = TEC.state.progress || {};
    var m = p.maths || { done:{} };
    Object.keys(patch).forEach(function(k){ m[k] = patch[k]; });
    p.maths = m;
    TEC.setState({ progress: p });
  }

  function replay(el, cls){ if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  function setBoard(svg){
    boardEl.innerHTML = '<div class="m-canvas">' + svg +
      '<div class="m-pointer" aria-hidden="true" hidden><span></span></div></div>';
    pointerEl = boardEl.querySelector('.m-pointer');
    replay(boardEl, 'swap');
  }
  /* Board coordinates are 1000 x 300; the arrow tip sits just above the point. */
  function pointTo(x, y, label){
    if (!pointerEl) return;
    pointerEl.hidden = false;
    pointerEl.style.left = (x / 10) + '%';
    pointerEl.style.top = ((y - 40) / 3) + '%';
    pointerEl.firstChild.textContent = label || '';
  }
  function hidePointer(){ if (pointerEl) pointerEl.hidden = true; }

  /* Walk the arrow through the points, the teacher naming each one. */
  function runPoints(list, i, done){
    if (!list || i >= list.length) { if (done) done(); return; }
    var p = list[i];
    pointTo(p.x, p.y, p.label);
    say(p.say, function(){ later(function(){ runPoints(list, i + 1, done); }, 350); });
  }

  function drawDots(){
    dotsEl.innerHTML = L.steps.map(function(s, i){
      return '<i class="m-dot' + (i < idx ? ' done' : i === idx ? ' now' : '') + '"></i>';
    }).join('');
  }

  function showNext(label){
    answerEl.innerHTML = '<button class="big-btn m-appear" id="m-next" type="button">' + (label || 'Continue') + '</button>';
    document.getElementById('m-next').onclick = function(){ idx++; renderStep(); };
  }

  function chooseCoords(i){ var col = i % 6, r = Math.floor(i / 6); return { x: 120 + col * 150, y: r === 0 ? 120 : 200 }; }

  function renderStep(){
    clearTimers();
    var st = L.steps[idx];
    wrongs = 0; tapped = {}; locked = false;
    drawDots();
    hidePointer();
    replay(document.querySelector('.m-bubble'), 'swap');

    if (st.kind === 'end') {
      setBoard(TEC.mathDraw.svg('<text class="m-star" x="500" y="150" text-anchor="middle" font-size="120">⭐</text>' + TEC.mathDraw.text(500, 250, 'Well done, ' + (TEC.state.name || 'friend') + '!', 56)));
      say(st.say, function(){
        answerEl.innerHTML = '<button class="big-btn m-appear" id="m-finish" type="button">Finish lesson</button>';
        document.getElementById('m-finish').onclick = function(){
          var done = (TEC.state.progress && TEC.state.progress.maths && TEC.state.progress.maths.done) || {};
          done[topicId] = true;
          save({ done: done, topic: topicId, lesson: idx });
          TEC.router.go('home');
        };
      });
      celebrate();
      answerEl.innerHTML = '';
      return;
    }

    if (st.kind === 'teach') {
      setBoard(st.scene());
      answerEl.innerHTML = '';
      say(st.say, function(){
        if (st.points) runPoints(st.points, 0, function(){ showNext(); });
        else showNext();
      });
      return;
    }

    if (st.kind === 'ask') {
      setBoard(st.scene());
      answerEl.innerHTML =
        '<div class="m-ask"><input id="m-in" type="number" inputmode="numeric" min="0" max="99" aria-label="Your answer" autocomplete="off">' +
        '<button class="big-btn" id="m-check" type="button">Check</button></div>' +
        '<p class="m-hint" id="m-hint" aria-live="polite"></p>';
      var inp = document.getElementById('m-in');
      inp.focus();
      inp.onkeydown = function(e){ if (e.key === 'Enter') check(); };
      document.getElementById('m-check').onclick = check;
      say(st.say);
      function check(){
        if (locked || inp.value === '') return;
        var ok = parseInt(inp.value, 10) === st.answer;
        if (ok) {
          locked = true;
          clearTimers();
          if (st.after) setBoard(st.after());
          say(st.right, function(){ showNext(); });
          answerEl.innerHTML = '';
          celebrate();
          return;
        }
        wrongs++;
        wrongShake(inp);
        inp.value = ''; inp.focus();
        if (wrongs <= st.hint.length) {
          var line = 'Let us try together. ' + st.hint[wrongs - 1];
          setHint(line); say(line);
        } else {
          wrongs = 0;
          setBoard(st.scene());
          setHint(st.reveal); say(st.reveal);
        }
      }
      return;
    }

    if (st.kind === 'choose') {
      var targetKind = st.target;
      function drawChoose(){
        var items = st.items.map(function(it, i){ return { kind: it[0], id: 'i' + i }; });
        var inner = items.map(function(it, i){
          var c = chooseCoords(i);
          return TEC.mathDraw.item(it.kind, c.x, c.y, { id: it.id, hl: !!tapped[it.id], s: 0.95 });
        }).join('');
        setBoard(TEC.mathDraw.svg(inner));
        boardEl.querySelectorAll('[data-id]').forEach(function(g){
          g.onclick = function(){ if (locked) return; var id = g.getAttribute('data-id'); tapped[id] = !tapped[id]; drawChoose(); };
        });
      }
      drawChoose();
      answerEl.innerHTML = '<button class="big-btn" id="m-check" type="button">Check</button><p class="m-hint" id="m-hint" aria-live="polite"></p>';
      say(st.say);
      document.getElementById('m-check').onclick = function(){
        if (locked) return;
        var want = st.items.map(function(it, i){ return it[0] === targetKind ? 'i' + i : null; }).filter(Boolean);
        var got = Object.keys(tapped).filter(function(k){ return tapped[k]; });
        var ok = want.length === got.length && want.every(function(w){ return tapped[w]; });
        if (ok) {
          locked = true; clearTimers();
          say(st.right, function(){ showNext(); });
          answerEl.innerHTML = '';
          celebrate();
          return;
        }
        wrongs++;
        wrongShake(boardEl);
        var line;
        if (wrongs <= st.hint.length) line = 'Let us look again. ' + st.hint[wrongs - 1];
        else { line = st.reveal; wrongs = 0; }
        setHint(line); say(line);
        // Point at the first thing to tap
        var first = st.items.findIndex(function(it){ return it[0] === targetKind; });
        if (first !== -1) { var c = chooseCoords(first); pointTo(c.x, c.y, 'Tap me'); }
      };
      return;
    }
  }

  function setHint(text){ var h = document.getElementById('m-hint'); if (h) h.textContent = text; }

  function wrongShake(el){ if (el) replay(el, 'shake'); }

  function celebrate(){
    var box = document.createElement('div');
    box.className = 'm-confetti'; box.setAttribute('aria-hidden', 'true');
    var colors = ['#F5761A','#2BA56B','#2F80ED','#F7B500','#E5484D','#8E6CEF'];
    for (var i = 0; i < 34; i++) {
      var c = document.createElement('i');
      c.style.left = (Math.random() * 100) + '%';
      c.style.background = colors[i % colors.length];
      c.style.animationDelay = (Math.random() * 0.4) + 's';
      c.style.animationDuration = (1.6 + Math.random() * 1.2) + 's';
      box.appendChild(c);
    }
    app.querySelector('.m-lesson').appendChild(box);
    setTimeout(function(){ if (box.parentNode) box.parentNode.removeChild(box); }, 3200);
  }

  soundBtn.onclick = function(){
    voiceOn = !voiceOn;
    try { localStorage.setItem('tec-voice', voiceOn ? 'on' : 'off'); } catch (e) {}
    soundBtn.setAttribute('aria-pressed', voiceOn);
    soundBtn.textContent = voiceOn ? '🔊 Voice on' : '🔇 Voice off';
    if (!voiceOn) TEC.anis.cancel();
  };

  /* Topic menu: open topics start their lesson; others stay as a plan */
  app.querySelectorAll('.m-topic.is-open').forEach(function(b){
    b.onclick = function(){
      TEC.anis.cancel();
      save({ topic: b.getAttribute('data-lesson'), lesson: 0 });
      TEC.router.render();
    };
  });

  renderStep();
};
