/* TEC dashboard (Level 1 home). Sidebar, stat cards, journey ring, today, classrooms, Anis,
   and a right panel with the week, the teachers and a group of teacher portraits.
   No percentages, marks or medals. Every link goes to a working page. */
TEC.views = TEC.views || {};
TEC.views.home = function(app){
  var s = TEC.state, name = s.name || 'friend', prog = s.progress || {};
  var hour = new Date().getHours();
  var hello = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  var today = TEC.todayKey(), type = TEC.todayType();
  var dateText = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' });

  var started = TEC.classrooms.filter(function(c){
    var p = prog[c.key];
    return p && ((p.lesson || 0) > 0 || Object.keys(p.done || {}).length > 0);
  }).length;
  var total = TEC.classrooms.length;
  var learnDays = TEC.week.filter(function(d){ return d.type === 'learn'; }).length;
  var C = (2 * Math.PI * 58).toFixed(2);
  var off = (C * (1 - started / total)).toFixed(2);

  var statCards = [
    { n: learnDays, l: 'Learning days this week' },
    { n: total, l: 'Classrooms to explore' },
    { n: TEC.teacherOrder.length, l: 'Teachers who teach you' }
  ].map(function(x, i){
    return '<div class="dcard stat reveal" style="--i:' + (i + 1) + '"><span class="stat-n">' + x.n + '</span><span class="stat-l">' + x.l + '</span></div>';
  }).join('');

  var classCards = TEC.classrooms.map(function(c, i){
    var t = c.teacher ? TEC.teachers[c.teacher] : null;
    var who = t ? t.name : 'Teacher to be confirmed';
    var body = '<span class="cc-band" style="--c:' + c.color + '">' + c.symbol + '</span>' +
               '<b>' + c.title + '</b><small>' + c.subject + '</small><em>' + who + '</em>';
    return c.ready
      ? '<a class="class-card reveal" style="--i:' + (i + 4) + '" href="#/class/' + c.key + '">' + body + '<span class="cc-go">Enter →</span></a>'
      : '<div class="class-card is-later reveal" style="--i:' + (i + 4) + '" aria-disabled="true">' + body + '<span class="cc-go">Opens in a later update</span></div>';
  }).join('');

  var weekChips = TEC.week.map(function(d){
    var cls = 'wk ' + d.type + (d.key === today ? ' today' : '');
    return '<span class="' + cls + '" aria-current="' + (d.key === today) + '" title="' + TEC.dayTypes[d.type].title + '">' + d.label + '</span>';
  }).join('');

  var teacherRows = TEC.teacherOrder.map(function(k){
    var t = TEC.teachers[k];
    return '<a class="t-row" href="#/teacher/' + k + '">' +
             '<span class="t-av">' + TEC.portrait(t) + '</span>' +
             '<span><b>' + t.name + '</b><small>' + t.subject + (t.placeholder ? ' · <span class="tbc">portrait to be confirmed</span>' : '') + '</small></span>' +
             '<span class="t-go" aria-hidden="true">›</span></a>';
  }).join('');

  var faces = TEC.teacherOrder.map(function(k, i){
    return '<span class="tg-face" style="--d:' + i + '">' + TEC.portrait(TEC.teachers[k]) + '</span>';
  }).join('');

  var sideIcons = [
    { href:'#/home', ico:'🏠', label:'Home', on:true },
    { href:'#/district', ico:'🏫', label:'Classrooms' },
    { href:'#/profile', ico:'🙂', label:'My details' }
  ].map(function(x){
    return '<a class="dash-ico' + (x.on ? ' is-on' : '') + '" href="' + x.href + '" title="' + x.label + '" aria-label="' + x.label + '"' + (x.on ? ' aria-current="page"' : '') + '>' + x.ico + '</a>';
  }).join('');

  app.innerHTML =
    '<div class="dash">' +
      '<nav class="dash-nav" aria-label="Main">' + sideIcons +
        '<button type="button" class="dash-ico" id="go-teachers" title="Teachers" aria-label="Go to my teachers">👩‍🏫</button>' +
      '</nav>' +
      '<main class="dash-main">' +
        '<header class="dash-head reveal" style="--i:0">' +
          '<p class="eyebrow">TriNova Education Centre · Level 1</p>' +
          '<h1 class="greet">' + hello + ', ' + escapeHtml(name) + '!</h1>' +
          '<p class="dateline">' + dateText + '</p>' +
        '</header>' +
        '<section class="stat-row" aria-label="Summary">' + statCards + '</section>' +
        '<section class="mid-row">' +
          '<div class="dcard reveal" style="--i:4"><h2>Your journey</h2>' +
            '<div class="ring-wrap"><svg viewBox="0 0 140 140" role="img" aria-label="' + started + ' of ' + total + ' classrooms started">' +
              '<circle class="ring-track" cx="70" cy="70" r="58"/>' +
              '<circle class="ring-fill" cx="70" cy="70" r="58" style="--c:' + C + ';--off:' + off + ';stroke-dasharray:' + C + ';stroke-dashoffset:' + off + '"/>' +
            '</svg><div class="ring-core"><b>' + started + '</b><small>of ' + total + '</small></div></div>' +
            '<p class="ring-text">classrooms you have started</p>' +
          '</div>' +
          '<div class="dcard today-card reveal" style="--i:5"><p class="eyebrow">Today</p><h2>' + type.title + '</h2>' +
            '<p>' + type.text + '</p>' +
            '<a class="big-btn" href="#/district">Go to the Classrooms</a></div>' +
        '</section>' +
        '<section class="reveal" style="--i:3">' +
          '<div class="sec-head"><h2>Classrooms</h2><a class="link" href="#/district">Open the corridor</a></div>' +
          '<div class="class-grid">' + classCards + '</div>' +
        '</section>' +
        '<section class="dcard reveal" style="--i:9" aria-labelledby="h-anis"><h2 id="h-anis">Ask Anis</h2><div id="anis-host"></div></section>' +
        '<section class="dcard reveal" style="--i:10" aria-labelledby="h-worlds"><h2 id="h-worlds">My worlds</h2>' +
          (s.likes.length
            ? '<div class="chips">' + s.likes.map(function(id){
                var l = TEC.likeById(id);
                return '<button class="chip-btn" type="button" data-id="' + id + '">' + l.ico + ' ' + l.name + '</button>';
              }).join('') + '</div>'
            : '<p class="today-text">You have no worlds yet. Add some in <a class="link" href="#/profile">Edit my details</a>.</p>') +
        '</section>' +
      '</main>' +
      '<aside class="dash-side">' +
        '<div class="dcard profile-card reveal" style="--i:1"><span class="avatar" aria-hidden="true">' + escapeHtml(name.charAt(0).toUpperCase()) + '</span>' +
          '<div><b>' + escapeHtml(name) + '</b><small>' + (s.age ? 'Age ' + s.age : 'Student') + '</small></div></div>' +
        '<div class="dcard reveal" style="--i:2"><h2>Class time</h2><div class="week-chips">' + weekChips + '</div>' +
          '<p class="legend"><span class="wk learn sw"></span>Learn <span class="wk game sw"></span>Game <span class="wk explore sw"></span>Explore</p></div>' +
        '<div class="dcard reveal" style="--i:3" id="teachers-list"><h2>Your teachers</h2>' + teacherRows + '</div>' +
        '<div class="tg reveal" style="--i:4" aria-hidden="true">' + faces + '</div>' +
      '</aside>' +
    '</div>';

  var panel = TEC.anisPanel(document.getElementById('anis-host'), hello + ', ' + name + '! Ask me anything, or tap a teacher.');
  app.querySelectorAll('.chip-btn[data-id]').forEach(function(b){
    b.onclick = function(){ TEC.anis.say(panel, TEC.likeById(b.dataset.id).line); };
  });
  var goT = document.getElementById('go-teachers');
  if (goT) goT.onclick = function(){ var el = document.getElementById('teachers-list'); if (el) el.scrollIntoView({ behavior:'smooth', block:'start' }); };
};

function escapeHtml(t){ return String(t).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
