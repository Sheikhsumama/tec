/* TEC Level 1 data. Edit here, not in the views. Image paths are configurable. */
window.TEC = window.TEC || {};

/* Teachers. `img` = supplied photo; null = placeholder (see docs/asset-manifest.md). */
TEC.teachers = {
  arabic:  { key:'arabic',  name:'Mr. Umar',       subject:'Arabic',                img:'assets/teachers/arabic.jpg',   color:'#E5484D',
             intro:'Hello! I am Mr. Umar. Let us learn Arabic letters together.' },
  english: { key:'english', name:'Mr. David',      subject:'English',               img:'assets/teachers/english.jpg',  color:'#2F80ED',
             intro:'Hi! I am Mr. David. Let us read and say new words.' },
  maths:   { key:'maths',   name:'Mr. Muhammad',   subject:'Mathematics',           img:'assets/teachers/maths.png',    color:'#F5761A',
             intro:'Hello! I am Mr. Muhammad. Let us count and find shapes.' },
  tech:    { key:'tech',    name:'Mr. Jensen',     subject:'Computer & Technology', img:null,                           color:'#8E6CEF',
             intro:'Hi! I am Mr. Jensen. Let us explore computers and tools.', placeholder:true },
  char:    { key:'char',    name:'Mr. Abdul Hadi', subject:'Tarbiyah & Character',  img:'assets/teachers/tarbiyah.jpg', color:'#2BA56B',
             intro:'Hello! I am Mr. Abdul Hadi. I will teach you every day.', mainTeacher:true }
};
TEC.teacherOrder = ['arabic','english','maths','tech','char'];

/* Interests offered during onboarding and on the profile page. No maximum. */
TEC.likes = [
  { id:'animals', name:'Animals', ico:'🦁', line:'Let us meet friendly animals!' },
  { id:'space',   name:'Space',   ico:'🪐', line:'Let us look at stars and planets!' },
  { id:'cars',    name:'Cars',    ico:'🏎️', line:'Vroom! Let us see fast machines.' },
  { id:'art',     name:'Art',     ico:'🎨', line:'Let us paint something bright!' }
];
TEC.likeById = function(id){ return TEC.likes.find(function(l){ return l.id === id; }); };

/* Weekly routine, Monday first. JS getDay(): 0 = Sunday. */
TEC.week = [
  { key:'mon', label:'Mon', type:'learn' }, { key:'tue', label:'Tue', type:'learn' },
  { key:'wed', label:'Wed', type:'learn' }, { key:'thu', label:'Thu', type:'learn' },
  { key:'fri', label:'Fri', type:'learn' }, { key:'sat', label:'Sat', type:'game' },
  { key:'sun', label:'Sun', type:'explore' }
];
TEC.dayKeys = ['sun','mon','tue','wed','thu','fri','sat'];
TEC.dayTypes = {
  learn:   { title:'Learning Day', text:'Today we learn with our teachers.', line:'Today is a learning day. Let us learn together!' },
  game:    { title:'Game Day',     text:'Today is for games and puzzles.',    line:'Today is Game Day! Let us play games and solve puzzles.' },
  explore: { title:'Explore Day',  text:'Today we discover the real world with a grown-up.', line:'Today is Explore Day! Let us discover the world together.' }
};
TEC.todayKey = function(){ return TEC.dayKeys[new Date().getDay()]; };
TEC.todayType = function(){
  var key = TEC.todayKey();
  var day = TEC.week.find(function(d){ return d.key === key; });
  return TEC.dayTypes[day.type];
};

/* Portrait: supplied photo, or a clearly marked placeholder disc with the teacher's initial. */
TEC.portrait = function(t){
  if (t.img) return '<img src="' + t.img + '" alt="' + t.name + '">';
  var initial = t.name.replace('Mr. ', '').charAt(0);
  return '<svg viewBox="0 0 200 200" role="img" aria-label="' + t.name + ' (placeholder portrait)" data-placeholder="true">' +
         '<rect width="200" height="200" fill="' + t.color + '" opacity=".18"/>' +
         '<circle cx="100" cy="92" r="52" fill="' + t.color + '"/>' +
         '<path d="M30 200 Q40 140 100 136 Q160 140 170 200Z" fill="' + t.color + '"/>' +
         '<text x="100" y="186" text-anchor="middle" font-size="18" font-family="Trebuchet MS,sans-serif" fill="' + t.color + '">' + initial + '</text>' +
         '</svg>';
};

/* Classroom District: six rooms. `ready` = built in this stage. World Discovery has no confirmed teacher. */
TEC.classrooms = [
  { key:'english', title:'English Studio',          subject:'English',               teacher:'english', color:'#2F80ED', symbol:'Aa', ready:true },
  { key:'arabic',  title:'Arabic Garden',           subject:'Arabic',                teacher:'arabic',  color:'#E5484D', symbol:'ع',  ready:true },
  { key:'maths',   title:'Mathematics Workshop',    subject:'Mathematics',           teacher:'maths',   color:'#F5761A', symbol:'123', ready:true },
  { key:'tech',    title:'Technology Laboratory',   subject:'Computer & Technology', teacher:'tech',    color:'#8E6CEF', symbol:'⚙',  ready:true },
  { key:'char',    title:'Tarbiyah Garden',         subject:'Tarbiyah & Character',  teacher:'char',    color:'#2BA56B', symbol:'♥',  ready:true },
  { key:'world',   title:'World Explorer Studio',   subject:'World Discovery',       teacher:null,      color:'#F7B500', symbol:'◎',  ready:true }
];
TEC.classroomByKey = function(k){ return TEC.classrooms.find(function(c){ return c.key === k; }); };
