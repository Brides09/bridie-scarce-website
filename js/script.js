(function(){
  "use strict";

  var app = document.getElementById('app');
  var tplHome = document.getElementById('tpl-home');
  var tplAbout = document.getElementById('tpl-about');
  var tplSkills = document.getElementById('tpl-skills');
  var tplArticle = document.getElementById('tpl-article');
  var tplBobby = document.getElementById('tpl-bobby');
  var tplTim = document.getElementById('tpl-tim-kitchen');
  var tplNatalie = document.getElementById('tpl-natalie-nixon');
  var tplNabeel = document.getElementById('tpl-nabeel-barqawi');
  var tplXavier = document.getElementById('tpl-xavier-rumph');
  var tplDaisy = document.getElementById('tpl-daisy-auger-dominguez');
  var tplDag = document.getElementById('tpl-dag-folger');
  var tplDevon = document.getElementById('tpl-devon-turnbull');
  var tplMatt = document.getElementById('tpl-matt-miller');
  var tplAlon = document.getElementById('tpl-alon-grinshpoon');
  var tplJack = document.getElementById('tpl-jack-axelrod');
  var tplZeroSpace = document.getElementById('tpl-zerospace');
  var masthead = document.getElementById('masthead');
  var indexOverlay = document.getElementById('indexOverlay');
  var menuToggle = document.getElementById('menuToggle');
  var indexClose = document.getElementById('indexClose');
  var menuLabel = document.getElementById('menuLabel');

  /* ---------- ROUTER ---------- */
  function render(){
    var hash = window.location.hash || '#/';
    var template = tplHome;
    var routeMap = {
      '#/about': tplAbout,
      '#/skills': tplSkills,
      '#/article/bobby-hill': tplBobby,
      '#/article/tim-kitchen': tplTim,
      '#/article/natalie-nixon': tplNatalie,
      '#/article/nabeel-barqawi': tplNabeel,
      '#/article/xavier-rumph': tplXavier,
      '#/article/daisy-auger-dominguez': tplDaisy,
      '#/article/dag-folger': tplDag,
      '#/article/devon-turnbull': tplDevon,
      '#/article/matt-miller': tplMatt,
      '#/article/alon-grinshpoon': tplAlon,
      '#/article/zerospace': tplZeroSpace,
      '#/article/jack-axelrod': tplJack
    };

    if(routeMap[hash]){
      template = routeMap[hash];
    } else if(hash.indexOf('#/article/') === 0){
      template = tplArticle;
    }

    app.innerHTML = '';
    app.appendChild(template.content.cloneNode(true));
    window.scrollTo(0,0);
    bindReveals();
    bindThread();
    bindThreadJourney();
    bindRefs();
    bindShelfTilt();
    updateReadProgress();
  }

  function navigate(){
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){ render(); return; }
    app.classList.add('page-fade');
    setTimeout(function(){
      render();
      requestAnimationFrame(function(){ app.classList.remove('page-fade'); });
    }, 220);
  }

  window.addEventListener('hashchange', navigate);
  render();

  /* ---------- MASTHEAD SHOW/HIDE ---------- */
  var lastY = window.scrollY, ticking = false;
  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(function(){
        var y = window.scrollY;
        masthead.classList.toggle('scrolled', y > 40);
        if(y > lastY && y > 160){ masthead.classList.add('hide'); }
        else { masthead.classList.remove('hide'); }
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ---------- INDEX OVERLAY ---------- */
  function openIndex(){
    indexOverlay.classList.add('open');
    indexOverlay.setAttribute('aria-hidden','false');
    menuToggle.setAttribute('aria-expanded','true');
    menuLabel.textContent = 'Close';
    document.body.style.overflow = 'hidden';
    var first = indexOverlay.querySelector('a');
    if(first) first.focus();
  }
  function closeIndex(){
    indexOverlay.classList.remove('open');
    indexOverlay.setAttribute('aria-hidden','true');
    menuToggle.setAttribute('aria-expanded','false');
    menuLabel.textContent = 'Index';
    document.body.style.overflow = '';
    menuToggle.focus();
  }
  menuToggle.addEventListener('click', function(){
    indexOverlay.classList.contains('open') ? closeIndex() : openIndex();
  });
  indexClose.addEventListener('click', closeIndex);
  indexOverlay.addEventListener('click', function(e){
    if(e.target.matches('a[data-close]')){ closeIndex(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && indexOverlay.classList.contains('open')){ closeIndex(); }
  });

  /* ---------- READING PROGRESS ---------- */
  var readProgressFill = document.getElementById('readProgressFill');
  function updateReadProgress(){
    if(!readProgressFill) return;
    var page = document.querySelector('.article-page');
    if(!page){
      readProgressFill.classList.remove('visible');
      readProgressFill.style.width = '0%';
      return;
    }
    var docEl = document.documentElement;
    var total = docEl.scrollHeight - window.innerHeight;
    var scrolled = total > 0 ? (window.scrollY / total) * 100 : 0;
    readProgressFill.classList.add('visible');
    readProgressFill.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
  }
  window.addEventListener('scroll', updateReadProgress, { passive: true });
  window.addEventListener('resize', updateReadProgress);

  /* ---------- SHELF TILT (Reading & Inspiration) ---------- */
  function bindShelfTilt(){
    var cards = document.querySelectorAll('.shelf-grid .philo-cell');
    if(!cards.length) return;
    var hasFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!hasFinePointer || reduced) return;
    cards.forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        var cx = rect.width / 2, cy = rect.height / 2;
        var x = e.clientX - rect.left, y = e.clientY - rect.top;
        var rotateY = ((x - cx) / cx) * 5;
        var rotateX = -((y - cy) / cy) * 5;
        card.style.transition = 'transform .06s linear';
        card.style.transform = 'perspective(700px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-3px)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transition = 'transform .6s ' + getComputedStyle(document.documentElement).getPropertyValue('--ease');
        card.style.transform = '';
      });
    });
  }

  /* ---------- SCROLL REVEALS ---------- */
  function bindReveals(){
    var items = document.querySelectorAll('.reveal, .article-figure, .article-figure-grid, .pull, .skill-diagram, .skill-table-wrap, .skill-toc-wrap, .shelf-grid .philo-cell');
    if(!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function(el){ io.observe(el); });
  }

  /* ---------- SIGNATURE THREAD (Conversations) ---------- */
  function bindThread(){
    var path = document.getElementById('threadPath');
    var notes = [document.getElementById('note1'), document.getElementById('note2'), document.getElementById('note3')];
    var wrap = document.querySelector('.thread-wrap');
    if(!path || !wrap) return;
    if(!('IntersectionObserver' in window)){
      path.classList.add('drawn');
      notes.forEach(function(n){ if(n) n.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          path.classList.add('drawn');
          /* notes are revealed by bindThreadJourney as the aircraft passes */
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    io.observe(wrap);
  }

  /* ---------- CONVERSATION JOURNEY (aircraft along the thread) ---------- */
  function bindThreadJourney(){
    var path = document.getElementById('threadPath');
    var plane = document.getElementById('threadPlane');
    var wrap = document.querySelector('.thread-wrap');
    if(!path || !plane || !wrap) return;
    var notes = [
      { el: document.getElementById('note1'), at: 0.15 },
      { el: document.getElementById('note2'), at: 0.48 },
      { el: document.getElementById('note3'), at: 0.82 }
    ];
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var L = path.getTotalLength();
    if(reduce || !('IntersectionObserver' in window)){
      notes.forEach(function(n){ if(n.el) n.el.classList.add('in'); });
      var mp = path.getPointAtLength(L * 0.5), mp2 = path.getPointAtLength(Math.min(L, L * 0.5 + 0.6));
      var mang = Math.atan2(mp2.y - mp.y, mp2.x - mp.x) * 180 / Math.PI;
      plane.setAttribute('transform', 'translate(' + mp.x.toFixed(2) + ',' + mp.y.toFixed(2) + ') rotate(' + mang.toFixed(2) + ') scale(1.5)');
      plane.style.opacity = '1';
      return;
    }
    var T = 13000, raf = null, startT = null, running = false;
    function ease(u){ return u < 0.5 ? 2*u*u : 1 - Math.pow(-2*u + 2, 2) / 2; }
    function setNote(n, vis){
      if(!n.el) return;
      if(vis){ if(!n.el.classList.contains('in')) n.el.classList.add('in'); }
      else if(n.el.classList.contains('in')){ n.el.classList.remove('in'); }
    }
    function frame(now){
      if(startT == null) startT = now;
      var t = ((now - startT) % T) / T;
      var travelEnd = 0.60, pauseEnd = 0.78, fadeOutEnd = 0.85, resetEnd = 0.93;
      var p, op;
      if(t < travelEnd){ p = ease(t / travelEnd); op = Math.min(1, t / 0.03); }
      else if(t < pauseEnd){ p = 1; op = 1; }
      else if(t < fadeOutEnd){ p = 1; op = 1 - (t - pauseEnd) / (fadeOutEnd - pauseEnd); }
      else if(t < resetEnd){ p = 0; op = 0; }
      else { p = 0; op = (t - resetEnd) / (1 - resetEnd); }
      var d = p * L;
      var a = path.getPointAtLength(d);
      var b = path.getPointAtLength(Math.min(L, d + 0.6));
      var ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      plane.setAttribute('transform', 'translate(' + a.x.toFixed(2) + ',' + a.y.toFixed(2) + ') rotate(' + ang.toFixed(2) + ') scale(1.5)');
      plane.style.opacity = op.toFixed(3);
      var active = t < pauseEnd;
      for(var k = 0; k < notes.length; k++){ setNote(notes[k], active && p >= notes[k].at); }
      raf = requestAnimationFrame(frame);
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ if(!running){ running = true; startT = null; raf = requestAnimationFrame(frame); } }
        else if(running){ running = false; if(raf) cancelAnimationFrame(raf); }
      });
    }, { threshold: 0.2 });
    io.observe(wrap);
  }


  /* ---------- INLINE REFERENCE CARDS (keyboard accessible) ---------- */
  function bindRefs(){
    document.querySelectorAll('.ref').forEach(function(el){
      var href = el.getAttribute('href') || '';
      if(href === '#' || href === ''){
        el.addEventListener('click', function(e){ e.preventDefault(); });
      }
    });
  }

  /* ---------- SMOOTH ANCHOR SCROLL WITHIN HOME ---------- */
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]:not([href="#/"]):not([href^="#/article"]):not([href^="#/about"]):not([href^="#/skills"])');
    if(!a) return;
    var id = a.getAttribute('href').slice(1);
    if(!id) return;
    var target = document.getElementById(id);
    if(target){
      e.preventDefault();
      if(indexOverlay.classList.contains('open')) closeIndex();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    }
  });

})();

(function(){
var lb,imgEl,capEl,thumbs=[],idx=0;
function build(){lb=document.createElement("div");lb.className="pj-lightbox";lb.innerHTML='<button class="pj-close" aria-label="Close">\u00d7</button><button class="pj-btn pj-prev" aria-label="Previous">\u2039</button><img alt=""><button class="pj-btn pj-next" aria-label="Next">\u203a</button><div class="pj-cap"></div>';document.body.appendChild(lb);imgEl=lb.querySelector("img");capEl=lb.querySelector(".pj-cap");lb.querySelector(".pj-close").addEventListener("click",close);lb.querySelector(".pj-prev").addEventListener("click",function(e){e.stopPropagation();nav(-1);});lb.querySelector(".pj-next").addEventListener("click",function(e){e.stopPropagation();nav(1);});lb.addEventListener("click",function(e){if(e.target===lb)close();});}
function show(){var t=thumbs[idx];if(!t)return;imgEl.src=t.src;capEl.textContent=t.getAttribute("data-cap")||"";}
function open(i){if(!lb)build();thumbs=Array.prototype.slice.call(document.querySelectorAll(".pj-thumb"));idx=i;show();lb.classList.add("open");document.body.style.overflow="hidden";}
function close(){if(lb){lb.classList.remove("open");document.body.style.overflow="";}}
function nav(d){if(!thumbs.length)return;idx=(idx+d+thumbs.length)%thumbs.length;show();}
document.addEventListener("click",function(e){var t=e.target.closest&&e.target.closest(".pj-thumb");if(!t)return;var all=Array.prototype.slice.call(document.querySelectorAll(".pj-thumb"));open(all.indexOf(t));});
window.addEventListener("hashchange",close);
document.addEventListener("keydown",function(e){if(!lb||!lb.classList.contains("open"))return;if(e.key==="Escape")close();else if(e.key==="ArrowLeft")nav(-1);else if(e.key==="ArrowRight")nav(1);});
})();
