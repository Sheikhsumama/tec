/* Classroom District: the school corridor with six doors. Only ready rooms open; the rest say so honestly. */
TEC.views = TEC.views || {};
TEC.views.district = function(app){
  var doors = TEC.classrooms.map(function(c){
    var t = c.teacher ? TEC.teachers[c.teacher] : null;
    var who = t ? t.name : 'Teacher to be confirmed';
    if (c.ready) {
      return '<a class="door" href="#/class/' + c.key + '" style="--door:' + c.color + '">' +
        '<span class="door-sign">' + c.symbol + '</span><b>' + c.title + '</b><small>' + c.subject + '</small><em>' + who + '</em></a>';
    }
    return '<div class="door is-later" style="--door:' + c.color + '" aria-disabled="true">' +
      '<span class="door-sign">' + c.symbol + '</span><b>' + c.title + '</b><small>' + c.subject + '</small><em>' + who + '</em>' +
      '<span class="later">Opens in a later update</span></div>';
  }).join('');
  app.innerHTML =
    '<div class="district-top"><a class="back" href="#/home">← Back to school</a></div>' +
    '<h1 class="view-title">Classroom District</h1>' +
    '<p class="district-sub">Walk down the corridor and choose a classroom.</p>' +
    '<section class="corridor" aria-label="Corridor of classrooms"><div class="doors">' + doors + '</div></section>';
};
