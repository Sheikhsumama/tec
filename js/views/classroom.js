/* Generic classroom renderer. Each room is a file in js/rooms/ that supplies:
   scene() (SVG), hotspots (wall charts that open panels), teacher (key in TEC.teachers, or null),
   intro, and lessons. A lesson gives the board (HTML) and either a default pick activity
   (objects[]) or its own render(host, api). Lessons are scripted demonstrations; progress is saved per room. */
TEC.views = TEC.views || {};
TEC.views['class'] = function(app, key){
  var meta = TEC.classroomByKey(key);
  var room = TEC.rooms && TEC.rooms[key];
  if (!meta || !room) { TEC.toast('This classroom opens in a later update'); TEC.router.go('district'); return; }
  var teacher = room.teacher ? TEC.teachers[room.teacher] : null;
  var lessons = room.lessons;
  var saved = (TEC.state.progress && TEC.state.progress[key]) || {};
  var current = Math.min(Math.max(saved.lesson || 0, 0), lessons.length - 1);
  var done = saved.done || {};

  var teacherHtml = teacher
    ? TEC.portrait(teacher) + '<span>' + teacher.name + '</span>'
    : '<div class="teacher-tbd" aria-hidden="true">?</div><span>Teacher to be confirmed</span>';

  app.innerHTML =
    '<nav class="room-nav" aria-label="Where you are">' +
      '<a class="back" href="#/district">← Classroom District</a>' +
      '<span class="room-pill" style="background:' + meta.color + '">' + meta.title + '</span>' +
      '<a class="back" href="#/home">School Home</a>' +
    '</nav>' +
    '<section class="stage" aria-label="' + meta.title + '">' +
      '<div class="scene">' + room.scene() + '</div>' +
      '<div class="hotspots"></div>' +
      '<div class="board ' + (room.boardClass || '') + '" role="button" tabindex="0" aria-label="The board: tap to hear the lesson">' +
        '<div class="board-no">Lesson <span id="bl-n"></span></div>' +
        '<div class="board-face" id="bl-face"></div>' +
        '<span class="board-tap">🔊 tap the board to hear it</span>' +
      '</div>' +
      '<div class="room-teacher">' + teacherHtml + '</div>' +
    '</section>' +
    '<section class="room-desk">' +
      '<div class="room-say"><img src="' + TEC.anis.img + '" alt="Anis"><p id="rm-say" aria-live="polite"></p></div>' +
      '<div class="desk-area" id="desk"></div>' +
      '<div class="pager"><button class="chip-btn" type="button" id="rm-hint">Ask Anis for a hint</button>' +
      '<button class="chip-btn" type="button" id="rm-prev">‹ Previous lesson</button>' +
      '<button class="chip-btn" type="button" id="rm-next">Next lesson ›</button></div>' +
    '</section>' +
    '<dialog class="room-dlg" id="rm-dlg"></dialog>';

  var sayEl = document.getElementById('rm-say');
  var boardFace = document.getElementById('bl-face');
  var deskEl = document.getElementById('desk');
  var dlg = document.getElementById('rm-dlg');

  function say(text, lang){ sayEl.textContent = text; TEC.anis.speak(text, lang); }
  function persist(){
    var p = TEC.state.progress || {};
    p[key] = { lesson: current, done: done };
    TEC.setState({ progress: p });
  }
  /* What a lesson's own activity can use. */
  var api = {
    say: say,
    done: function(id){ done[current + '-' + id] = true; persist(); },
    isDone: function(id){ return !!done[current + '-' + id]; },
    board: function(html){ boardFace.innerHTML = html; },
    room: room
  };

  /* Wall charts and objects: each opens a closer view. */
  room.hotspots.forEach(function(h){
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'hotspot'; b.setAttribute('aria-label', h.label);
    b.style.left = h.at.left; b.style.top = h.at.top;
    b.innerHTML = '<span>' + h.label + '</span>';
    b.onclick = function(){ openDialog(h.dialog); };
    app.querySelector('.hotspots').appendChild(b);
  });
  function openDialog(d){
    dlg.innerHTML = '<h2>' + d.title + '</h2>' + d.html + '<button type="button" class="chip-btn dlg-close" id="dlg-x">Close</button>';
    dlg.querySelectorAll('[data-say]').forEach(function(el){
      el.onclick = function(){ say(el.getAttribute('data-say'), el.getAttribute('data-lang') || undefined); };
    });
    dlg.querySelector('#dlg-x').onclick = function(){ dlg.close(); };
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }
  dlg.addEventListener('click', function(e){ if (e.target === dlg) dlg.close(); });

  function defaultBoard(l){
    if (!l.letter) return '<div class="bf-word">' + (l.title || '') + '</div>';
    return '<div class="bf-big">' + l.letter + ' ' + l.letter.toLowerCase() + '</div>' +
           '<div class="bf-pic">' + l.pic + '</div><div class="bf-word">' + l.word + '</div>';
  }
  function showBoard(){
    var l = lessons[current];
    document.getElementById('bl-n').textContent = (current + 1) + ' of ' + lessons.length;
    boardFace.innerHTML = l.board || defaultBoard(l);
  }
  /* Default activity: tap the right object. Used by lessons with objects[]. */
  function defaultPick(l){
    deskEl.innerHTML = (l.prompt ? '<div class="desk-prompt">' + l.prompt + '</div>' : '') +
      '<div class="desk-tiles">' + l.objects.map(function(o, i){
        return '<button type="button" class="desk-tile' + (api.isDone(i) ? ' is-ok' : '') + '" data-i="' + i + '" aria-label="' + o.word + '">' +
               '<span>' + o.pic + '</span><b>' + o.word + '</b>' + (o.en ? '<small>' + o.en + '</small>' : '') + '</button>';
      }).join('') + '</div>';
    deskEl.querySelectorAll('.desk-tile').forEach(function(btn){
      btn.onclick = function(){
        var i = +btn.getAttribute('data-i'), o = l.objects[i];
        if (o.ok) {
          api.done(i); btn.classList.add('is-ok');
          say(l.okLine || ('Yes! ' + o.word + ' is right. ' + l.sound + '.'), l.lang);
        } else {
          say(l.noLine || ('Not this one. Listen again: ' + o.word + '. Try another.'), l.lang);
        }
      };
    });
  }
  function showDesk(){
    var l = lessons[current];
    deskEl.innerHTML = '';
    if (l.render) l.render(deskEl, api);
    else defaultPick(l);
  }
  function setLesson(n){
    current = (n + lessons.length) % lessons.length;
    showBoard(); showDesk(); persist();
    var l = lessons[current];
    say(l.hint || (l.sound + '.'), l.lang);
  }

  document.querySelector('.board').onclick = function(){
    var l = lessons[current];
    say(l.say || (l.sound + '. ' + (l.word || '') + '.'), l.lang);
  };
  document.getElementById('rm-next').onclick = function(){ setLesson(current + 1); };
  document.getElementById('rm-prev').onclick = function(){ setLesson(current - 1); };
  document.getElementById('rm-hint').onclick = function(){ var l = lessons[current]; say(l.hint || l.sound, l.lang); };

  showBoard(); showDesk();
  say(room.intro);
};
