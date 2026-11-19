/* TEC dashboard (Level 1 home). One fixed page: sidebar, stat cards, journey ring, today,
   a strip of teacher cards (each teacher is a classroom), and a right panel with the week
   and the Tarbiyah teacher. Only Mathematics is open for now; other teachers show "later".
   No percentages, marks or medals. */
TEC.views = TEC.views || {};
TEC.views.home = function(app){
  var s = TEC.state, name = s.name || 'friend', prog = s.progress || {};
  var hour = new Date().getHours();
  var hello = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  var today = TEC.todayKey(), type = TEC.todayType();
  var dateText = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' });

  var open = ['maths'];                       // Mathematics only for now
  var started = open.filter(function(k){
    var p = prog[k];
    return p && ((p.lesson || 0) > 0 || Object.keys(p.done || {}).length > 0);
  }).length;
  var total = TEC.teacherOrder.length;
  var learnDays = TEC.week.filter(function(d){ return d.type === 'learn'; }).length;
  var C = (2 * Math.PI * 58).toFixed(2);
  var off = (C * (1 - started / total)).toFixed(2);

  var statCards = [
    { n: learnDays, l: 'Learning days this week' },
    { n: open.length, l: 'Subject open now' },
    { n: total, l: 'Teachers who teach you' }
  ].map(function(x, i){
    return '<div class="dcard stat reveal" style="--i:' + (i + 1) + '"><span class="stat-n">' + x.n + '</span><span class="stat-l">' + x.l + '</span></div>';
  }).join('');

  var teacherCards = TEC.teacherOrder.filter(function(k){ return k !== 'char'; }).map(function(k, i){
    var t = TEC.teachers[k], isOpen = open.indexOf(k) !== -1;
    var body = '<span class="tc-av">' + TEC.portrait(t) + '</span>' +
               '<b>' + t.name + '</b><small>' + t.subject + '</small>' +
               (t.placeholder ? '<em class="tbc">portrait to be confirmed</em>' : '');
    return isOpen
      ? '<a class="class-card reveal" style="--i:' + (i + 4) + ';--c:' + t.color + '" href="#/class/' + k + '">' + body + '<span class="cc-go">Enter →</span></a>'
      : '<div class="class-card is-later reveal" style="--i:' + (i + 4) + ';--c:' + t.color + '" aria-disabled="true">' + body + '<span class="cc-go">Opens later</span></div>';
  }).join('');

  var weekChips = TEC.week.map(function(d){
    var cls = 'wk ' + d.type + (d.key === today ? ' today' : '');
    return '<span class="' + cls + '" aria-current="' + (d.key === today) + '" title="' + TEC.dayTypes[d.type].title + '">' + d.label + '</span>';
  }).join('');

  var char = TEC.teachers.char;
  var sideIcons = [
    { href:'#/home', ico:'🏠', label:'Home', on:true },
    { href:'#/class/maths', ico:'🔢', label:'Mathematics' },
    { href:'#/profile', ico:'🙂', label:'My details' }
  ].map(function(x){
    return '<a class="dash-ico' + (x.on ? ' is-on' : '') + '" href="' + x.href + '" title="' + x.label + '" aria-label="' + x.label + '"' + (x.on ? ' aria-current="page"' : '') + '>' + x.ico + '</a>';
  }).join('');

  app.innerHTML =
    '<div class="dash">' +
      '<nav class="dash-nav" aria-label="Main">' + sideIcons + '</nav>' +
      '<main class="dash-main">' +
        '<header class="dash-head reveal" style="--i:0">' +
          '<p class="eyebrow">TriNova Education Centre · Level 1</p>' +
          '<h1 class="greet">' + hello + ', ' + escapeHtml(name) + '!</h1>' +
          '<p class="dateline">' + dateText + '</p>' +
        '</header>' +
        '<section class="stat-row" aria-label="Summary">' + statCards + '</section>' +
        '<section class="mid-row">' +
          '<div class="dcard reveal" style="--i:4"><h2>Your journey</h2>' +
            '<div class="ring-wrap"><svg viewBox="0 0 140 140" role="img" aria-label="' + started + ' of ' + total + ' subjects started">' +
              '<circle class="ring-track" cx="70" cy="70" r="58"/>' +
              '<circle class="ring-fill" cx="70" cy="70" r="58" style="--c:' + C + ';--off:' + off + ';stroke-dasharray:' + C + ';stroke-dashoffset:' + off + '"/>' +
            '</svg><div class="ring-core"><b>' + started + '</b><small>of ' + total + '</small></div></div>' +
            '<p class="ring-text">subjects you have started</p>' +
          '</div>' +
          '<div class="dcard today-card reveal" style="--i:5"><p class="eyebrow">Today</p><h2>' + type.title + '</h2>' +
            '<p>' + type.text + '</p>' +
            '<a class="big-btn" href="#/class/maths">Start Mathematics</a></div>' +
        '</section>' +
        '<section class="reveal" style="--i:3" aria-labelledby="h-teachers">' +
          '<div class="sec-head"><h2 id="h-teachers">Your teachers</h2></div>' +
          '<div class="class-grid">' + teacherCards + '</div>' +
        '</section>' +
      '</main>' +
      '<aside class="dash-side">' +
        '<div class="dcard profile-card reveal" style="--i:1"><span class="avatar" aria-hidden="true">' + escapeHtml(name.charAt(0).toUpperCase()) + '</span>' +
          '<div><b>' + escapeHtml(name) + '</b><small>' + (s.age ? 'Age ' + s.age : 'Student') + '</small></div></div>' +
        '<div class="dcard reveal" style="--i:2"><h2>Class time</h2><div class="week-chips">' + weekChips + '</div>' +
          '<p class="legend"><span class="wk learn sw"></span>Learn <span class="wk game sw"></span>Game <span class="wk explore sw"></span>Explore</p></div>' +
        '<a class="dcard tarb-card reveal" style="--i:3" href="#/teacher/char">' +
          '<span class="tarb-av">' + TEC.portrait(char) + '</span>' +
          '<span><b>' + char.name + '</b><small>' + char.subject + '</small></span>' +
          '<span class="t-go" aria-hidden="true">›</span>' +
        '</a>' +
      '</aside>' +
    '</div>';
};

function escapeHtml(t){ return String(t).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
