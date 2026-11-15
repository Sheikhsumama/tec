/* Arabic Classroom — Mr. Umar. Warm, arched windows, a calligraphy plaque, rug and lantern.
   Arabic is taught through listening, recognising and matching. Pronunciation depends on the browser's Arabic voice. */
window.TEC = window.TEC || {};
TEC.rooms = TEC.rooms || {};
TEC.rooms.arabic = (function(){
  var S = TEC.stage, AR = 'ar-SA';
  function scene(){
    var s = S.shell({ ceil:'#FFF6E4', side:'#F5DFAE', back:'#FCEBC6', floor:'#C98D55', seam:'#B3733F' });
    // rug in front of the teacher's area
    s += '<ellipse cx="600" cy="600" rx="250" ry="52" fill="#A3412F" stroke="#E9B44C" stroke-width="6"/>';
    s += '<ellipse cx="600" cy="600" rx="200" ry="38" fill="#C9643A"/>';
    // arched windows on the back wall
    s += '<path d="M296,250 V160 Q296,118 336,118 Q376,118 376,160 V250 Z" fill="#CFEAF7" stroke="#B98A3E" stroke-width="6"/>';
    s += '<path d="M824,250 V160 Q824,118 864,118 Q904,118 904,160 V250 Z" fill="#CFEAF7" stroke="#B98A3E" stroke-width="6"/>';
    // hanging lantern from the ceiling
    // calligraphy plaque under the board
    s += '<rect x="440" y="100" width="320" height="40" rx="8" fill="#FFF8E7" stroke="#B98A3E" stroke-width="4"/>';
    s += S.textAt(600, 121, 'أهلاً وسهلاً', 26, '#7A3E1D');
    // left wall: alphabet chart
    s += '<polygon points="' + S.quad('left',0.08,0.36,0.12,0.56) + '" fill="#FFFDF6" stroke="#B98A3E" stroke-width="3"/>';
    s += S.textOn('left',0.14,0.22,'ا',34,'#7A3E1D') + S.textOn('left',0.30,0.22,'ب',34,'#7A3E1D');
    s += S.textOn('left',0.14,0.44,'ت',34,'#7A3E1D') + S.textOn('left',0.30,0.44,'ث',34,'#7A3E1D');
    // right wall: greetings poster and everyday objects card
    s += '<polygon points="' + S.quad('right',0.12,0.46,0.14,0.62) + '" fill="#FFFDF6" stroke="#B98A3E" stroke-width="3"/>';
    s += S.textOn('right',0.29,0.26,'السلام عليكم',19,'#7A3E1D') + S.textOn('right',0.29,0.44,'صباح الخير',19,'#7A3E1D') + S.textOn('right',0.29,0.56,'شكراً',19,'#7A3E1D');
    s += '<polygon points="' + S.quad('right',0.56,0.86,0.36,0.68) + '" fill="#FFFFFF" stroke="#B98A3E" stroke-width="3"/>';
    s += S.textOn('right',0.71,0.48,'🏠',30) + S.textOn('right',0.71,0.62,'🍎',30);
    // cushions and a plant in the corners
    s += '<circle cx="150" cy="580" r="30" fill="#D9644E"/><circle cx="1050" cy="586" r="28" fill="#2F9E8F"/>';
    s += '<rect x="1000" y="520" width="44" height="34" rx="6" fill="#C75B3A"/><circle cx="1022" cy="498" r="30" fill="#2BA56B"/>';
    return S.svg(s, 'Arabic Classroom, looking at the board');
  }
  var lessons = [
    { title:'Alif', letter:'ا', pic:'🦁', word:'أسد', sound:'Alif, as in asad, lion', lang:AR,
      board:'<div class="bf-big ar">ا</div><div class="bf-pic">🦁</div><div class="bf-word">أسد · asad · lion</div>',
      hint:'Listen to the sound of alif. Which picture begins with alif?',
      objects:[ {pic:'🦁', word:'أسد', en:'lion', ok:true}, {pic:'🍎', word:'تفاحة', en:'apple'}, {pic:'🐟', word:'سمكة', en:'fish'}, {pic:'🚗', word:'سيارة', en:'car'} ],
      prompt:'Find the picture that begins with alif.',
      okLine:'Yes! Asad means lion. It begins with alif.', noLine:'Not this one. Listen to the sound again and try another.' },
    { title:'Ba', letter:'ب', pic:'🦆', word:'بطة', sound:'Ba, as in batta, duck', lang:AR,
      board:'<div class="bf-big ar">ب</div><div class="bf-pic">🦆</div><div class="bf-word">بطة · batta · duck</div>',
      hint:'The letter ba has one dot underneath. Which pictures begin with ba?',
      objects:[ {pic:'🦆', word:'بطة', en:'duck', ok:true}, {pic:'🏠', word:'بيت', en:'house', ok:true}, {pic:'🍎', word:'تفاحة', en:'apple'}, {pic:'🐟', word:'سمكة', en:'fish'} ],
      prompt:'Tap the pictures that begin with ba.',
      okLine:'Yes! Batta is duck and bayt is house. Both begin with ba.', noLine:'That one begins with another letter. Try again.' },
    { title:'Hello', letter:'', pic:'👋', word:'السلام عليكم', sound:'Assalamu alaikum', lang:AR,
      board:'<div class="bf-big ar">السلام عليكم</div><div class="bf-word">Peace be with you. We say it when we meet.</div>',
      say:'As-salamu alaykum. Peace be with you.',
      hint:'Someone walks into the room. Which greeting do we say?',
      prompt:'You meet a friend. Which words do we say?',
      objects:[ {pic:'👋', word:'السلام عليكم', en:'hello', ok:true}, {pic:'🌙', word:'تصبح على خير', en:'good night'}, {pic:'🙏', word:'شكراً', en:'thank you'} ],
      okLine:'Yes! Assalamu alaikum is how we say hello.', noLine:'That one is for another moment. Try again.' },
    { title:'Thank you', letter:'', pic:'🎁', word:'شكراً', sound:'Shukran, thank you', lang:AR,
      board:'<div class="bf-big ar">شكراً</div><div class="bf-word">Shukran. Thank you.</div>',
      say:'Shukran. Thank you.',
      hint:'Someone gives you a present. What do we say?',
      prompt:'Someone gives you a present. Which word do we say?',
      objects:[ {pic:'🎁', word:'شكراً', en:'thank you', ok:true}, {pic:'👋', word:'السلام عليكم', en:'hello'}, {pic:'🌙', word:'تصبح على خير', en:'good night'} ],
      okLine:'Yes! Shukran means thank you.', noLine:'Not this one. Listen again and try another.' }
  ];
  return {
    id:'arabic', title:'Arabic Classroom', teacher:'arabic', boardClass:'board--slate',
    intro:'Welcome to the Arabic Classroom. Let us listen to the letters and the words together.',
    scene: scene,
    hotspots: [
      { id:'alphabet', label:'Alphabet chart', at: S.at('left',0.3,0.7), dialog:{ title:'Arabic letters', html: S.grid([
          {label:'ا', en:'alif', say:'Alif', lang:AR}, {label:'ب', en:'ba', say:'Ba', lang:AR}, {label:'ت', en:'ta', say:'Ta', lang:AR}, {label:'ث', en:'tha', say:'Tha', lang:AR} ]) } },
      { id:'greetings', label:'Greetings poster', at: S.at('right',0.29,0.76), dialog:{ title:'Everyday expressions', html: S.grid([
          {label:'السلام عليكم', en:'Peace be with you', say:'As-salamu alaykum', lang:AR},
          {label:'صباح الخير', en:'Good morning', say:'Sabah al-khayr', lang:AR},
          {label:'الحمد لله', en:'Praise be to God', say:'Alhamdulillah', lang:AR},
          {label:'شكراً', en:'Thank you', say:'Shukran', lang:AR} ]) } },
      { id:'welcome', label:'Calligraphy', at: S.atXY(800,121), dialog:{ title:'Calligraphy', html: S.grid([
          {label:'أهلاً وسهلاً', en:'Welcome', say:'Ahlan wa sahlan. Welcome.', lang:AR} ]) } }
    ],
    lessons: lessons
  };
})();
