/* Level 1 Mathematics lesson page. One screen, no classrooms: the teacher is shown above and
   a single long board is below. The teacher explains, the child answers, hints come before
   any demonstration, and the answer is confirmed with a short explanation.
   Lessons follow the methodology: experience, observe, discover, explain, apply, recap.
   Only Sorting, Counting and Addition are written so far (samples for review). */
TEC.views = TEC.views || {};

/* ---------- Drawing helpers (SVG, board is 1000 x 300) ---------- */
TEC.mathDraw = (function(){
  var ob = 'M0,-14 C10,-24 30,-18 28,4 C26,26 12,30 0,22 C-12,30 -26,26 -28,4 C-30,-18 -10,-24 0,-14 Z';
  function wrap(id, hl, inner, x, y, s){
    return '<g class="m-obj' + (hl ? ' is-on' : '') + '"' + (id ? ' data-id="' + id + '"' : '') +
      ' transform="translate(' + x + ',' + y + ') scale(' + (s || 1) + ')"><g class="m-in">' + inner + '</g></g>';
  }
  var kinds = {
    apple: function(){ return '<path d="' + ob + '" fill="#E5484D"/><path d="M0,-14 q2,-14 9,-18" stroke="#6B4A2B" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="14" cy="-27" rx="11" ry="6" fill="#2BA56B" transform="rotate(-20 14 -27)"/>'; },
    banana: function(){ return '<path d="M-32,-20 C-10,22 22,28 34,-8 C26,10 2,16 -18,-8 C-22,-12 -28,-16 -32,-20 Z" fill="#F7B500"/>'; },
    block: function(){ return '<rect x="-26" y="-26" width="52" height="52" rx="8" fill="#2F80ED"/>'; },
    ball: function(){ return '<circle r="26" fill="#8E6CEF"/><circle cx="-8" cy="-9" r="7" fill="#fff" opacity=".45"/>'; },
    circle: function(){ return '<circle r="26" fill="#F5761A"/>'; },
    square: function(){ return '<rect x="-26" y="-26" width="52" height="52" rx="4" fill="#2BA56B"/>'; }
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
    return '<g transform="translate(' + x + ',60)"><circle cx="0" cy="-30" r="20" fill="#F4C7A1"/>' +
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
  function svg(inner){
    return '<svg viewBox="0 0 1000 300" role="img" aria-label="Lesson picture" preserveAspectRatio="xMidYMid meet">' + inner + '</svg>';
  }
  return { svg: svg, item: item, row: row, people: people, text: text, person: person, kinds: kinds };
})();

/* ---------- Lessons. Each step has: kind (teach | ask | choose | end), say, scene(ctx) ---------- */
TEC.mathLessons = {
  sorting: {
    n: 3, title: 'Sorting and Classification',
    steps: [
      { kind:'teach', say:'Look at these fruits. Some are apples, and some are bananas.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('apple', 230, 120, 3, {gap:90, s:1}) + D.row('banana', 700, 120, 3, {gap:90, s:1}) + D.text(500, 260, 'Apples and bananas', 36)); } },
      { kind:'choose', say:'Tap all the apples.', target:'apple',
        items: [['apple'],['banana'],['apple'],['banana'],['apple'],['banana']],
        hint:['Look for the round red fruit.'], reveal:'Apples are round and red. Tap each one.',
        right:'Yes! Those are all the apples. Apples go together, and bananas go together.' },
      { kind:'teach', say:'Now we sort shapes. Circles go in one group, and squares go in another.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('circle', 230, 120, 2, {gap:110, s:1}) + D.row('square', 700, 120, 2, {gap:110, s:1}) + D.text(500, 260, 'Circles and squares', 36)); } },
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
      { kind:'teach', say:'Let us count the apples. We touch each one and say its number.',
        scene: function(){ var D = TEC.mathDraw; var a = D.row('apple', 500, 110, 5, {gap:120, s:1}); return D.svg(a + [1,2,3,4,5].map(function(n,i){ return D.text(500 + (i-2)*120, 230, String(n), 40); }).join('')); } },
      { kind:'ask', say:'Now you count. How many apples are there?', answer:4,
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('apple', 500, 130, 4, {gap:120, s:1})); },
        hint:['Touch each apple once, and say the numbers in order.'], reveal:'Count with me: 1, 2, 3, 4. The last number tells us how many there are.',
        right:'Yes! There are 4 apples. The last number we say tells us how many.' },
      { kind:'ask', say:'Let us try again. How many balls are there?', answer:5,
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('ball', 500, 130, 5, {gap:112, s:0.9})); },
        hint:['Point to each ball, one at a time, and count out loud.'], reveal:'1, 2, 3, 4, 5. Five balls.',
        right:'Yes! Five balls. You counted each one and kept the last number.' },
      { kind:'end', say:'What did we discover? When we count one by one, the last number tells us how many there are.' }
    ]
  },
  addition: {
    n: 19, title: 'Understanding Addition',
    steps: [
      { kind:'teach', say:'Look! Ali has two apples.',
        scene: function(){ return TEC.mathDraw.svg(TEC.mathDraw.people([{x:280,name:'Ali',color:'#2F80ED',apples:2},{x:720,name:'Hassan',color:'#2BA56B',apples:0}])); } },
      { kind:'teach', say:'Hassan also has two apples.',
        scene: function(){ return TEC.mathDraw.svg(TEC.mathDraw.people([{x:280,name:'Ali',color:'#2F80ED',apples:2},{x:720,name:'Hassan',color:'#2BA56B',apples:2}])); } },
      { kind:'teach', say:'Ali gives his two apples to Hassan. Watch what happens.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.person(280,'Ali','#2F80ED') + D.person(720,'Hassan','#2BA56B') + D.row('apple', 720, 215, 2, {gap:58, s:0.8}) + D.row('apple', 500, 150, 2, {gap:70, s:0.9}) + D.text(500, 260, 'From Ali', 30)); } },
      { kind:'ask', say:'Now Hassan has his apples and Ali\'s apples. How many apples does Hassan have?', answer:4,
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.person(280,'Ali','#2F80ED') + D.person(720,'Hassan','#2BA56B') + D.row('apple', 720, 215, 2, {gap:58, s:0.8}) + D.row('apple', 500, 150, 2, {gap:70, s:0.9}) + D.text(500, 260, 'From Ali', 30)); },
        after: function(){ var D = TEC.mathDraw; return D.svg(D.person(280,'Ali','#2F80ED') + D.person(720,'Hassan','#2BA56B') + D.row('apple', 720, 215, 4, {gap:58, s:0.8})); },
        hint:['Count Hassan\'s apples one by one. Then count the ones Ali gave him.'],
        reveal:'Put them together: 2 apples and 2 apples. Count all of them: 1, 2, 3, 4.',
        right:'Yes! 4 apples. Two apples and two apples make four apples. When we bring two groups together, we are adding. This is called addition.' },
      { kind:'teach', say:'We write addition with symbols. The plus sign means "put together". Two plus two is four.',
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('apple', 500, 110, 4, {gap:80, s:0.9}) + D.text(500, 270, '2 + 2 = 4', 56)); } },
      { kind:'ask', say:'Your turn. Sara has 3 blocks. Her friend gives her 1 block. How many blocks does Sara have now?', answer:4,
        scene: function(){ var D = TEC.mathDraw; return D.svg(D.row('block', 380, 130, 3, {gap:70, s:0.85}) + D.row('block', 700, 130, 1, {gap:70, s:0.85})); },
        hint:['Put all the blocks into one group.'], reveal:'3 blocks and 1 block: 1, 2, 3, 4. Sara has 4 blocks.',
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
  var progress = TEC.state.progress || {};
  var mp = progress.maths || {};
  var topicId = mp.topic && TEC.mathLessons[mp.topic] ? mp.topic : 'addition';
  var L = TEC.mathLessons[topicId];
  var idx = 0, wrongs = 0, tapped = {}, locked = false;

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
        '<span class="m-av">' + TEC.portrait(t) + '</span>' +
        '<div class="m-bubble"><b>' + t.name + '</b><p id="m-say" aria-live="polite"></p></div>' +
      '</div>' +
      '<div class="m-board" id="m-board"></div>' +
      '<div class="m-answer" id="m-answer"></div>' +
    '</section>' +
    '<section class="m-outline dcard" aria-label="Mathematics topics"><h2>Mathematics topics</h2>' + outline + '</section>';

  var sayEl = document.getElementById('m-say');
  var boardEl = document.getElementById('m-board');
  var answerEl = document.getElementById('m-answer');
  var dotsEl = document.getElementById('m-dots');

  function save(patch){
    var p = TEC.state.progress || {};
    var m = p.maths || { done:{} };
    Object.keys(patch).forEach(function(k){ m[k] = patch[k]; });
    p.maths = m;
    TEC.setState({ progress: p });
  }

  function replay(el, cls){
    if (!el) return;
    el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
  }
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
      c.style.transform = 'rotate(' + Math.round(Math.random() * 360) + 'deg)';
      box.appendChild(c);
    }
    app.querySelector('.m-lesson').appendChild(box);
    setTimeout(function(){ if (box.parentNode) box.parentNode.removeChild(box); }, 3200);
  }
  function wrongShake(el){ if (el) replay(el, 'shake'); }

  function drawDots(){
    dotsEl.innerHTML = L.steps.map(function(s, i){
      return '<i class="m-dot' + (i < idx ? ' done' : i === idx ? ' now' : '') + '"></i>';
    }).join('');
  }

  function nextBtn(label){
    answerEl.innerHTML = '<button class="big-btn" id="m-next" type="button">' + (label || 'Continue') + '</button>';
    document.getElementById('m-next').onclick = function(){ idx++; renderStep(); };
  }

  function renderStep(){
    var st = L.steps[idx];
    wrongs = 0; tapped = {}; locked = false;
    drawDots();
    sayEl.textContent = st.say;
    replay(document.querySelector('.m-bubble'), 'swap');


    if (st.kind === 'end') {
      boardEl.innerHTML = TEC.mathDraw.svg('<text class="m-star" x="500" y="150" text-anchor="middle" font-size="120">⭐</text>' + TEC.mathDraw.text(500, 250, 'Well done, ' + (TEC.state.name || 'friend') + '!', 56));
      replay(boardEl, 'swap');
      celebrate();
      answerEl.innerHTML = '<button class="big-btn" id="m-finish" type="button">Finish lesson</button>';
      document.getElementById('m-finish').onclick = function(){
        var done = (TEC.state.progress && TEC.state.progress.maths && TEC.state.progress.maths.done) || {};
        done[topicId] = true;
        save({ done: done, topic: topicId, lesson: idx });
        TEC.router.go('home');
      };
      return;
    }

    if (st.kind === 'teach') {
      boardEl.innerHTML = st.scene();
      replay(boardEl, 'swap');
      nextBtn();
      return;
    }

    if (st.kind === 'ask') {
      boardEl.innerHTML = st.scene();
      replay(boardEl, 'swap');
      answerEl.innerHTML =
        '<div class="m-ask"><input id="m-in" type="number" inputmode="numeric" min="0" max="99" aria-label="Your answer" autocomplete="off">' +
        '<button class="big-btn" id="m-check" type="button">Check</button></div>' +
        '<p class="m-hint" id="m-hint" aria-live="polite"></p>';
      var inp = document.getElementById('m-in');
      inp.focus();
      inp.onkeydown = function(e){ if (e.key === 'Enter') check(); };
      document.getElementById('m-check').onclick = check;
      function check(){
        if (locked || inp.value === '') return;
        var ok = parseInt(inp.value, 10) === st.answer;
        if (ok) {
          locked = true; sayEl.textContent = st.right;
          if (st.after) { boardEl.innerHTML = st.after(); replay(boardEl, 'swap'); }
          celebrate(); nextBtn(); return;
        }
        wrongs++;
        var hint = document.getElementById('m-hint');
        if (wrongs <= st.hint.length) hint.textContent = 'Let us try together. ' + st.hint[wrongs - 1];
        else { hint.textContent = st.reveal; wrongs = 0; boardEl.innerHTML = st.scene(); }
        inp.value = ''; inp.focus();
      }
      return;
    }

    if (st.kind === 'choose') {
      var targetKind = st.target;
      function drawChoose(){
        var items = st.items.map(function(it, i){ return { kind: it[0], id: 'i' + i }; });
        var inner = items.map(function(it, i){
          var col = i % 6, r = Math.floor(i / 6);
          var x = 120 + col * 150, y = r === 0 ? 120 : 200;
          return TEC.mathDraw.item(it.kind, x, y, { id: it.id, hl: !!tapped[it.id], s: 0.95 });
        }).join('');
        boardEl.innerHTML = TEC.mathDraw.svg(inner);
        boardEl.querySelectorAll('[data-id]').forEach(function(g){
          g.onclick = function(){ if (locked) return; var id = g.getAttribute('data-id'); tapped[id] = !tapped[id]; drawChoose(); };
        });
      }
      drawChoose();
      answerEl.innerHTML = '<button class="big-btn" id="m-check" type="button">Check</button><p class="m-hint" id="m-hint" aria-live="polite"></p>';
      document.getElementById('m-check').onclick = function(){
        if (locked) return;
        var want = st.items.map(function(it, i){ return it[0] === targetKind ? 'i' + i : null; }).filter(Boolean);
        var got = Object.keys(tapped).filter(function(k){ return tapped[k]; });
        var ok = want.length === got.length && want.every(function(w){ return tapped[w]; });
        if (ok) { locked = true; sayEl.textContent = st.right; celebrate(); nextBtn(); return; }
        wrongs++;
        wrongShake(boardEl);
        var hint = document.getElementById('m-hint');
        if (wrongs <= st.hint.length) hint.textContent = 'Let us look again. ' + st.hint[wrongs - 1];
        else { hint.textContent = st.reveal; wrongs = 0; }
      };
      return;
    }
  }

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
