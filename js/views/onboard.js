/* Onboarding: Anis introduces himself, then asks name, age and interests. Resumable. */
TEC.views = TEC.views || {};
TEC.views.onboard = function(app){
  var s = TEC.state;
  app.innerHTML =
    '<section class="onboard">' +
      '<div class="anis-big"><img src="' + TEC.anis.img + '" alt="Anis"></div>' +
      '<div class="say" id="ob-say" aria-live="polite"></div>' +
      '<div class="step hidden" id="ob-name">' +
        '<input class="name-in" id="ob-name-in" maxlength="20" placeholder="Name" autocomplete="off" aria-label="Your name" value="' + (s.name || '') + '">' +
        '<button class="big-btn" id="ob-name-next" disabled>Next</button>' +
      '</div>' +
      '<div class="step hidden" id="ob-age">' +
        '<div class="ages">' + [2,3,4].map(function(a){ return '<button class="age" type="button" data-age="' + a + '" aria-label="Age ' + a + '">' + a + '</button>'; }).join('') + '</div>' +
        '<button class="big-btn" id="ob-age-next" disabled>Next</button>' +
      '</div>' +
      '<div class="step hidden" id="ob-likes">' +
        '<div class="likes">' + TEC.likes.map(function(l){
          return '<button class="like" type="button" data-id="' + l.id + '" aria-pressed="false"><span>' + l.ico + '</span><small>' + l.name + '</small></button>';
        }).join('') + '</div>' +
        '<button class="big-btn" id="ob-likes-next" disabled>Next</button>' +
      '</div>' +
    '</section>';

  var say = document.getElementById('ob-say');
  function show(id, on){ document.getElementById(id).classList.toggle('hidden', !on); }

  var nameIn = document.getElementById('ob-name-in');
  var nameNext = document.getElementById('ob-name-next');
  nameIn.oninput = function(){ nameNext.disabled = nameIn.value.trim().length < 1; };
  nameNext.onclick = function(){
    TEC.setState({ name: nameIn.value.trim() });
    show('ob-name', false);
    TEC.anis.say(say, 'Nice to meet you, ' + TEC.state.name + '! How old are you?', function(){ show('ob-age', true); });
  };

  var ageNext = document.getElementById('ob-age-next');
  app.querySelectorAll('.age').forEach(function(b){
    b.onclick = function(){
      app.querySelectorAll('.age').forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on');
      TEC.setState({ age: +b.dataset.age });
      ageNext.disabled = false;
    };
  });
  ageNext.onclick = function(){
    show('ob-age', false);
    TEC.anis.say(say, 'What do you like? Tap everything you love.', function(){ showLikes(); show('ob-likes', true); });
  };

  var likesNext = document.getElementById('ob-likes-next');
  function refreshLikes(){ likesNext.disabled = TEC.state.likes.length < 1; }
  function showLikes(){
    app.querySelectorAll('.like').forEach(function(b){
      b.classList.toggle('on', TEC.state.likes.indexOf(b.dataset.id) !== -1);
      b.setAttribute('aria-pressed', TEC.state.likes.indexOf(b.dataset.id) !== -1);
    });
    refreshLikes();
  }
  app.querySelectorAll('.like').forEach(function(b){
    b.onclick = function(){
      var id = b.dataset.id, likes = TEC.state.likes.slice();
      var i = likes.indexOf(id);
      if (i === -1) { likes.push(id); TEC.setState({ likes: likes }); TEC.anis.say(say, TEC.likeById(id).line); }
      else { likes.splice(i, 1); TEC.setState({ likes: likes }); }
      showLikes();
    };
  });
  likesNext.onclick = function(){
    TEC.setState({ done: true });
    TEC.anis.say(say, 'Great, ' + TEC.state.name + '! Let us go to your TEC.', function(){ setTimeout(function(){ TEC.router.go('home'); }, 900); });
  };

  /* Resume where the child left off */
  if (!s.name) { TEC.anis.say(say, 'Hello! I am Anis. I am your learning friend.', function(){ TEC.anis.say(say, 'What is your name?', function(){ show('ob-name', true); nameIn.focus(); }); }); }
  else if (!s.age) { TEC.anis.say(say, 'Welcome back, ' + s.name + '! How old are you?', function(){ show('ob-age', true); }); }
  else { showLikes(); TEC.anis.say(say, 'Welcome back, ' + s.name + '! What do you like?', function(){ show('ob-likes', true); }); }
  if (s.name && nameIn.value) nameNext.disabled = false;
};
