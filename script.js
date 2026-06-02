/* ===== Loader ===== */
(function(){
  const word="Unsha",mono=document.getElementById('loaderMono');
  [...word].forEach((c,i)=>{const s=document.createElement('span');s.textContent=c;s.style.animationDelay=(i*.08)+'s';mono.appendChild(s);});
  window.addEventListener('load',()=>setTimeout(()=>{document.getElementById('loader').classList.add('done');startTyping();},2000));
})();

/* ===== Custom cursor ===== */
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.skill-card,.stat,.proj-card,.socials a').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
});

/* ===== Magnetic buttons ===== */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`;});
  btn.addEventListener('mouseleave',()=>btn.style.transform='');
});

/* ===== Typing effect ===== */
function startTyping(){
  const roles=["Frontend Developer","Creative Web Designer","HTML · CSS · JavaScript"];
  const el=document.getElementById('typed');let r=0,c=0,del=false;
  (function tick(){
    const w=roles[r];
    el.textContent=del?w.substring(0,c--):w.substring(0,c++);
    if(!del&&c===w.length+1){del=true;setTimeout(tick,1600);return;}
    if(del&&c===0){del=false;r=(r+1)%roles.length;}
    setTimeout(tick,del?45:90);
  })();
}

/* ===== Nav ===== */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));
const burger=document.getElementById('burger'),navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>{burger.classList.toggle('open');navLinks.classList.toggle('open');});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');navLinks.classList.remove('open');}));

/* ===== Scroll reveal + skill rings + timeline ===== */
const io=new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(!en.isIntersecting)return;
    en.target.classList.add('in');
    en.target.querySelectorAll('.ring-fg').forEach(c=>{
      const pct=+c.dataset.pct;c.style.strokeDashoffset=377-(377*pct/100);
    });
    en.target.querySelectorAll('[data-count]').forEach(p=>{
      const tgt=+p.dataset.count;let n=0;
      const step=()=>{n+=2;p.textContent=(n>=tgt?tgt:n)+'%';if(n<tgt)requestAnimationFrame(step);};step();
    });
    io.unobserve(en.target);
  });
},{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const tl=document.getElementById('timeline');
new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('in');});},{threshold:.2}).observe(tl);

/* ===== Tilt cards ===== */
document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-14px) rotateY(${dx*10}deg) rotateX(${-dy*10}deg)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

/* ===== Floating bubbles ===== */
const bw=document.getElementById('bubbles');
for(let i=0;i<14;i++){
  const b=document.createElement('div');b.className='bubble';
  const s=20+Math.random()*70;b.style.width=b.style.height=s+'px';
  b.style.left=Math.random()*100+'vw';
  b.style.animationDuration=(14+Math.random()*16)+'s';
  b.style.animationDelay=(-Math.random()*20)+'s';
  bw.appendChild(b);
}

/* ===== Parallax orbs + portrait 3D ===== */
window.addEventListener('mousemove',e=>{
  const dx=(e.clientX/innerWidth-.5),dy=(e.clientY/innerHeight-.5);
  document.querySelector('.orb1').style.transform=`translate(${dx*40}px,${dy*40}px)`;
  document.querySelector('.orb2').style.transform=`translate(${dx*-50}px,${dy*-30}px)`;
  const p=document.getElementById('portrait');
  if(p)p.style.transform=`perspective(900px) rotateY(${dx*10}deg) rotateX(${-dy*10}deg)`;
});

/* ===== Contact form ===== */
document.getElementById('sendBtn').addEventListener('click',()=>{
  const n=cName.value.trim(),em=cEmail.value.trim(),m=cMsg.value.trim();
  const msg=document.getElementById('formMsg');
  if(!n||!em||!m){msg.textContent='Please fill in all fields ✦';msg.style.color='#d4748a';return;}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){msg.textContent='Please enter a valid email ✦';msg.style.color='#d4748a';return;}
  msg.style.color='var(--purple)';
  msg.textContent='Thank you, '+n+'! Your message has been sent ♥';
  cName.value=cEmail.value=cMsg.value='';
});

/* ===== CV button ===== */
document.getElementById('cvBtn').addEventListener('click',e=>{
  e.preventDefault();
  const b=e.currentTarget,t=b.textContent;
  b.textContent='Coming Soon ✦';
  setTimeout(()=>b.textContent=t,1800);
});
