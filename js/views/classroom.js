/* Generic classroom renderer. Each room supplies its scene, hotspots, teacher and lessons in js/rooms/<key>.js.
   Lessons, board and wall charts are scripted demonstrations. Progress is kept per room, with no marks or timers. */
TEC.views = TEC.views || {};
TEC.views['class'] = function(app, key){
  var meta = TEC.classroomByKey(key);
  var room = TEC.rooms && TEC.rooms[key];
  if (!meta || !room) { TEC.toast('This classroom opens in a later update'); TEC.router.go('district'); return; }
  var teacher = TEC.teachers[room.teacher];
  var lessons = room.lessons;
  var saved = (TEC.state.progress && TEC.state.progress[key]) || {};
  var current = Math.min(Math.max(saved.lesson || 0, 0), lessons.length - 1);
  var done = saved.done || {};

  app.innerHTML =
    '<nav class="room-nav" aria-label="Where you are">' +
      '<a class="back" href="#/district">← Classroom District</a>' +
      '<span class="room-pill" style="background:' + meta.color + '">' + meta.title + '</span>' +
      '<a class="back" href="#/home">School Home</a>' +
    '</nav>' +
    '<section class="stage" aria-label="' + meta.title + '">' +
      '<div class="scene">' + room.scene() + '</div>' +
      '<div class="hotspots"></div>' +
      '<div class="board" role="button" tabindex="0" aria-label="The board: tap to hear the lesson" aria-live="polite">' +
        '<div class="board-no">Lesson <span id="bl-n"></span></div>' +
        '<div class="board-letter" id="bl-letter"></div>' +
        '<div class="board-pic" id="bl-pic"></div>' +
        '<div class="board-word" id="bl-word"></div>' +
        '<span class="board-tap">🔊 tap the board to hear it</span>' +
      '</div>' +
      '<div class="room-teacher">' + TEC.portrait(teacher) + '<span>' + teacher.name + '</span></div>' +
    '</section>' +
    '<section class="room-desk">' +
      '<div class="room-say"><img src="' + TEC.anis.img + '" alt="Anis"><p id="rm-say" aria-live="polite"></p></div>' +
      '<div class="desk-tiles" id="desk"></div>' +
      '<div class="pager"><button class="chip-btn" type="button" id="rm-hint">Ask Anis for a hint</button>' +
      '<button class="chip-btn" type="button" id="rm-prev">‹ Previous lesson</button>' +
      '<button class="chip-btn" type="button" id="rm-next">Next lesson ›</button></div>' +
    '</section>' +
    '<dialog class="room-dlg" id="rm-dlg"></dialog>';

  var sayEl = document.getElementById('rm-say');
  function say(text){ sayEl.textContent = text; TEC.anis.speak(text); }
  function persist(){
    var p = TEC.state.progress || {};
    p[key] = { lesson: current, done: done };
    TEC.setState({ progress: p });
  }

  /* Hotspots on the walls: each opens a small picture panel. */
  var hs = app.querySelector('.hotspots');
  room.hotspots.forEach(function(h){
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'hotspot'; b.setAttribute('aria-label', h.label);
    b.style.left = h.at.left; b.style.top = h.at.top;
    b.innerHTML = '<span>' + h.label + '</span>';
    b.onclick = function(){ openDialog(h.dialog); };
    hs.appendChild(b);
  });

  var dlg = document.getElementById('rm-dlg');
  function openDialog(d){
    dlg.innerHTML = '<h2>' + d.title + '</h2>' + d.html + '<button type="button" class="chip-btn dlg-close" id="dlg-x">Close</button>';
    dlg.querySelectorAll('[data-say]').forEach(function(el){
      el.onclick = function(){ say(el.getAttribute('data-say')); };
    });
    dlg.querySelector('#dlg-x').onclick = function(){ dlg.close(); };
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }
  dlg.addEventListener('click', function(e){ if (e.target === dlg) dlg.close(); });

  /* The board shows the current lesson. Changing lesson changes the board. */
  function showBoard(){
    var l = lessons[current];
    document.getElementById('bl-n').textContent = (current + 1) + ' of ' + lessons.length;
    document.getElementById('bl-letter').textContent = l.letter + ' ' + l.letter.toLowerCase();
    document.getElementById('bl-pic').textContent = l.pic;
    document.getElementById('bl-word').textContent = l.word;
  }
  function showDesk(){
    var l = lessons[current];
    document.getElementById('desk').innerHTML = l.objects.map(function(o, i){
      return '<button type="button" class="desk-tile' + (done[current + '-' + i] ? ' is-ok' : '') + '" data-i="' + i + '" aria-label="' + o.word + '">' +
             '<span>' + o.pic + '</span><b>' + o.word + '</b></button>';
    }).join('');
    document.querySelectorAll('#desk .desk-tile').forEach(function(btn){
      btn.onclick = function(){
        var o = l.objects[+btn.getAttribute('data-i')];
        if (o.ok) {
          done[current + '-' + btn.getAttribute('data-i')] = true;
          btn.classList.add('is-ok');
          say('Yes! ' + o.word + ' is right. ' + l.sound + '.');
          persist();
        } else {
          say('Not this one. Listen again: ' + o.word + '. Try another.');
        }
      };
    });
  }
  function setLesson(n){
    current = (n + lessons.length) % lessons.length;
    showBoard(); showDesk(); persist();
    say(lessons[current].sound + '. ' + lessons[current].hint);
  }

  document.querySelector('.board').onclick = function(){ var l = lessons[current]; say(l.sound + '. ' + l.word + '.'); };
  document.getElementById('rm-next').onclick = function(){ setLesson(current + 1); };
  document.getElementById('rm-prev').onclick = function(){ setLesson(current - 1); };
  document.getElementById('rm-hint').onclick = function(){ say(lessons[current].hint); };

  showBoard(); showDesk();
  say(room.intro);
};
