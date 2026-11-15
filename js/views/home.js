/* School Home: Anis, today, the week, the teachers, My Worlds and the two special days. */
TEC.views = TEC.views || {};
TEC.views.home = function(app){
  var s = TEC.state, name = s.name || 'friend';
  var hour = new Date().getHours();
  var hello = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  var today = TEC.todayKey(), type = TEC.todayType();
  var dateText = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' });

  app.innerHTML =
    '<h1 class="greet">' + hello + ', ' + escapeHtml(name) + '!</h1>' +
    '<p class="dateline">' + dateText + '</p>' +
    '<div class="home-grid">' +
      '<div id="anis-host" class="wide"></div>' +
      '<section class="card" aria-labelledby="h-today">' +
        '<h2 id="h-today">Today</h2>' +
        '<div class="today-title">' + type.title + '</div>' +
        '<p class="today-text">' + type.text + '</p>' +
      '</section>' +
      '<section class="card" aria-labelledby="h-week">' +
        '<h2 id="h-week">My week</h2>' +
        '<div class="week">' + TEC.week.map(function(d){
          var cls = 'day ' + (d.type === 'game' ? 'game' : d.type === 'explore' ? 'explore' : '') + (d.key === today ? ' today' : '');
          var sub = d.type === 'game' ? 'Game' : d.type === 'explore' ? 'Explore' : 'Learn';
          return '<div class="' + cls.trim() + '" aria-current="' + (d.key === today) + '">' + d.label + '<small>' + sub + '</small></div>';
        }).join('') + '</div>' +
      '</section>' +
      '<section class="card" aria-labelledby="h-rooms">' +
        '<h2 id="h-rooms">My classrooms</h2>' +
        '<p class="today-text">Walk down the corridor and choose a room.</p>' +
        '<div class="chips"><a class="chip-btn" href="#/district">🏫 Open Classroom District</a></div>' +
      '</section>' +
      '<section class="card wide" aria-labelledby="h-teachers">' +
        '<h2 id="h-teachers">My teachers</h2>' +
        '<nav class="teachers" aria-label="Teachers">' + TEC.teacherOrder.map(function(k){
          var t = TEC.teachers[k];
          return '<a class="teacher-tile" href="#/teacher/' + k + '">' +
                   '<span class="portrait">' + TEC.portrait(t) + '</span>' +
                   '<b>' + t.name + '</b><small>' + t.subject + '</small></a>';
        }).join('') + '</nav>' +
      '</section>' +
      '<section class="card" aria-labelledby="h-worlds">' +
        '<h2 id="h-worlds">My worlds</h2>' +
        (s.likes.length
          ? '<div class="chips">' + s.likes.map(function(id){
              var l = TEC.likeById(id);
              return '<button class="chip-btn" type="button" data-id="' + id + '">' + l.ico + ' ' + l.name + '</button>';
            }).join('') + '</div>'
          : '<p class="today-text">You have no worlds yet. Add some in <a class="link" href="#/profile">Edit my details</a>.</p>') +
      '</section>' +
      '<section class="card" aria-labelledby="h-doors">' +
        '<h2 id="h-doors">Special days</h2>' +
        '<div class="doors">' +
          '<div class="door soon" aria-disabled="true"><b>Game Garden</b><small>Saturdays · opens in a later update</small></div>' +
          '<div class="door soon" aria-disabled="true"><b>Exploration Day</b><small>Sundays · opens in a later update</small></div>' +
        '</div>' +
      '</section>' +
      '<div class="wide links"><a class="link" href="#/profile">Edit my details</a></div>' +
    '</div>';

  var panel = TEC.anisPanel(document.getElementById('anis-host'), hello + ', ' + name + '! Ask me anything, or tap a teacher.');
  app.querySelectorAll('.chip-btn[data-id]').forEach(function(b){
    b.onclick = function(){ TEC.anis.say(panel, TEC.likeById(b.dataset.id).line); };
  });
};

function escapeHtml(t){ return String(t).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
