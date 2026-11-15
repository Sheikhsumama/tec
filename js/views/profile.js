/* Edit my details: name, age and interests. Changes save immediately and persist on this device. */
TEC.views = TEC.views || {};
TEC.views.profile = function(app){
  var s = TEC.state;
  app.innerHTML =
    '<a class="back" href="#/home">← Back to school</a>' +
    '<h1 class="view-title">Edit my details</h1>' +
    '<form class="profile-form" id="pf">' +
      '<div class="field"><label for="pf-name">My name</label>' +
        '<div class="row"><input id="pf-name" maxlength="20" autocomplete="off" value="' + (s.name || '') + '">' +
        '<button class="btn-sm" type="submit">Save name</button></div></div>' +
      '<div class="field"><span><b>My age</b></span>' +
        '<div class="row" id="pf-ages">' + [2,3,4].map(function(a){
          return '<button class="age-pick' + (s.age === a ? ' on' : '') + '" type="button" data-age="' + a + '" aria-pressed="' + (s.age === a) + '">' + a + '</button>';
        }).join('') + '</div></div>' +
      '<div class="field"><span><b>My worlds</b> (pick as many as you like)</span>' +
        '<div class="likes" id="pf-likes">' + TEC.likes.map(function(l){
          var on = s.likes.indexOf(l.id) !== -1;
          return '<button class="like' + (on ? ' on' : '') + '" type="button" data-id="' + l.id + '" aria-pressed="' + on + '"><span>' + l.ico + '</span><small>' + l.name + '</small></button>';
        }).join('') + '</div></div>' +
    '</form>';

  document.getElementById('pf').onsubmit = function(e){
    e.preventDefault();
    var name = document.getElementById('pf-name').value.trim();
    if (!name) { TEC.toast('Please type a name'); return; }
    TEC.setState({ name: name });
    TEC.toast('Saved');
  };
  app.querySelectorAll('#pf-ages .age-pick').forEach(function(b){
    b.onclick = function(){
      TEC.setState({ age: +b.dataset.age });
      app.querySelectorAll('#pf-ages .age-pick').forEach(function(x){
        x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b);
      });
      TEC.toast('Saved');
    };
  });
  app.querySelectorAll('#pf-likes .like').forEach(function(b){
    b.onclick = function(){
      var likes = TEC.state.likes.slice(), i = likes.indexOf(b.dataset.id);
      if (i === -1) likes.push(b.dataset.id); else likes.splice(i, 1);
      TEC.setState({ likes: likes });
      var on = likes.indexOf(b.dataset.id) !== -1;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
      TEC.toast('Saved');
    };
  });
};
