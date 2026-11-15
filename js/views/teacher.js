/* Teacher introduction page. Anis introduces the teacher; the child can listen again or move between teachers. */
TEC.views = TEC.views || {};
TEC.views.teacher = function(app, key){
  var order = TEC.teacherOrder;
  var t = TEC.teachers[key];
  if (!t) { TEC.toast('That teacher is not here'); TEC.router.go('home'); return; }
  var i = order.indexOf(key);
  var prev = order[(i - 1 + order.length) % order.length];
  var next = order[(i + 1) % order.length];
  app.innerHTML =
    '<a class="back" href="#/home">← Back to school</a>' +
    '<section class="teacher-page">' +
      '<div class="portrait">' + TEC.portrait(t) + '</div>' +
      '<div>' +
        '<h1>' + t.name + '</h1>' +
        '<p class="subject">' + t.subject + '</p>' +
        '<div class="anis-panel" style="margin-bottom:16px"><div class="anis-face"><img src="' + TEC.anis.img + '" alt="Anis"></div>' +
          '<div class="anis-body"><div class="say" id="intro-say" aria-live="polite"></div></div></div>' +
        '<div class="pager">' +
          '<button class="chip-btn" type="button" id="again">🔊 Listen again</button>' +
          '<a class="chip-btn" href="#/teacher/' + prev + '">← Previous teacher</a>' +
          '<a class="chip-btn" href="#/teacher/' + next + '">Next teacher →</a>' +
        '</div>' +
      '</div>' +
    '</section>';
  var say = document.getElementById('intro-say');
  TEC.anis.say(say, t.intro);
  document.getElementById('again').onclick = function(){ TEC.anis.say(say, t.intro); };
};
