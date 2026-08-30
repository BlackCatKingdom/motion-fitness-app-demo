(() => {
  'use strict';

  const STORAGE_KEY = 'motion_demo_v4_cn';
  const view = document.getElementById('view');
  const nav = document.getElementById('bottom-nav');
  const toast = document.getElementById('toast');
  const phone = document.getElementById('phone');
  const statusTime = document.getElementById('status-time');

  const icons = {
    home:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.8 10.3 12 3.7l8.2 6.6v9.2a1 1 0 0 1-1 1h-5v-6h-4.4v6h-5a1 1 0 0 1-1-1z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    calendar:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 3v5M16.5 3v5M3.5 10h17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    chart:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V9m7 10V4m7 15v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    history:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7V3m0 0h4M4 3l3.2 3.2A8 8 0 1 1 4.8 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v5l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    user:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 20c.8-4 3.3-6 7.5-6s6.7 2 7.5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    arrow:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 6-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 5 11 7-11 7z" fill="currentColor"/></svg>',
    check:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    flame:'<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.8 3.4c.5 3-1 4.4-2.4 6-1 1.1-1.7 2.2-1.3 4 .6-1.1 1.5-1.8 2.7-2.4-.1 2.5 2.6 3.3 2.6 5.8 0 2-1.5 3.7-3.5 3.7-3.5 0-6.2-2.7-6.2-6.4 0-4.7 3.5-7.7 8.1-10.7Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>'
  };

  const typeLabels = {Strength:'力量', Mixed:'综合', Mobility:'灵活性', Cardio:'有氧', Recovery:'恢复'};
  const unitLabels = {Metric:'公制', Imperial:'英制'};
  const typeLabel = type => typeLabels[type] || type;

  const baseWorkouts = [
    {id:'upper', name:'上肢力量', short:'上肢\n力量', type:'Strength', minutes:42, exercises:[
      {name:'杠铃卧推', sets:4, reps:'8 次', cue:'下放稳定 · 保持匀速控制'},
      {name:'坐姿划船', sets:4, reps:'10 次', cue:'肘部向后 · 脊柱保持中立'},
      {name:'肩上推举', sets:3, reps:'10 次', cue:'核心收紧 · 顶端充分伸展'},
      {name:'高位下拉', sets:3, reps:'12 次', cue:'充分拉伸 · 下拉至上胸位置'},
      {name:'绳索臂屈伸', sets:3, reps:'12 次', cue:'固定肘部 · 控制回程'}
    ]},
    {id:'lower', name:'下肢力量', short:'下肢\n力量', type:'Strength', minutes:46, exercises:[
      {name:'杠铃深蹲', sets:4, reps:'6 次', cue:'脚掌稳定 · 控制下蹲深度'},
      {name:'罗马尼亚硬拉', sets:4, reps:'8 次', cue:'髋部后移 · 背部保持自然'},
      {name:'分腿蹲', sets:3, reps:'10 次/侧', cue:'躯干保持直立 · 前脚发力'},
      {name:'腿弯举', sets:3, reps:'12 次', cue:'动作平稳 · 避免借力反弹'},
      {name:'站姿提踵', sets:3, reps:'15 次', cue:'顶端稍作停顿'}
    ]},
    {id:'full', name:'全身训练', short:'全身\n训练', type:'Mixed', minutes:38, exercises:[
      {name:'高脚杯深蹲', sets:3, reps:'10 次', cue:'核心收紧 · 躯干保持直立'},
      {name:'俯卧撑', sets:3, reps:'12 次', cue:'全身保持一条直线'},
      {name:'单臂哑铃划船', sets:3, reps:'10 次/侧', cue:'向髋部方向拉动'},
      {name:'髋铰链', sets:3, reps:'12 次', cue:'髋部主导 · 膝盖微屈'},
      {name:'平板支撑', sets:3, reps:'40 秒', cue:'肋骨收紧 · 保持平稳呼吸'}
    ]},
    {id:'mobility', name:'灵活恢复', short:'灵活\n恢复', type:'Mobility', minutes:20, exercises:[
      {name:'90/90 髋部转换', sets:2, reps:'60 秒', cue:'在舒适范围内缓慢移动'},
      {name:'胸椎旋转', sets:2, reps:'8 次/侧', cue:'从上背部完成旋转'},
      {name:'踝关节前移', sets:2, reps:'10 次/侧', cue:'脚跟始终贴地'},
      {name:'深蹲静止', sets:2, reps:'45 秒', cue:'配合呼吸放松身体'}
    ]},
    {id:'cardio', name:'节奏有氧', short:'节奏\n有氧', type:'Cardio', minutes:30, exercises:[
      {name:'热身步行', sets:1, reps:'5 分钟', cue:'保持轻松、可正常交流的节奏'},
      {name:'节奏训练', sets:3, reps:'6 分钟', cue:'维持可持续的中等强度'},
      {name:'轻松恢复', sets:3, reps:'2 分钟', cue:'让呼吸逐渐恢复平稳'},
      {name:'放松步行', sets:1, reps:'4 分钟', cue:'逐步降低运动强度'}
    ]},
    {id:'recovery', name:'恢复训练', short:'恢复\n训练', type:'Recovery', minutes:18, exercises:[
      {name:'呼吸调整', sets:2, reps:'60 秒', cue:'缓慢进行鼻式呼吸'},
      {name:'腘绳肌动态拉伸', sets:2, reps:'8 次/侧', cue:'保持轻柔的主动活动范围'},
      {name:'胸部打开', sets:2, reps:'45 秒', cue:'不要强行追求极限幅度'},
      {name:'轻松步行', sets:1, reps:'8 分钟', cue:'保持舒适步频'}
    ]}
  ];

  const weekdayPlan = ['recovery','upper','mobility','lower','recovery','full','cardio'];

  const defaultHistory = () => {
    const now = new Date();
    const offsets = [1,2,3,8,10];
    return offsets.map((offset,i) => {
      const d = new Date(now); d.setHours(12,0,0,0); d.setDate(now.getDate()-offset);
      const w = workoutById(weekdayPlan[d.getDay()]);
      const strengthVolume = w.type==='Strength' ? (4300+i*260) : w.type==='Mixed' ? 3200 : null;
      return {id:'sample-'+i,date:d.toISOString(),workoutId:w.id,workout:w.name,type:w.type,minutes:w.minutes,volumeKg:strengthVolume,distanceKm:w.type==='Cardio'?4.6:null,demo:true};
    });
  };

  const defaults = () => ({
    onboarded:false,
    loggedIn:false,
    tab:'home',
    profile:{name:'Alex', goal:'保持规律', weeklyGoal:4, reminder:true, units:'Metric'},
    history:defaultHistory(),
    session:null,
    onboardingIndex:0,
    demoAnchorDate:localDateKey(new Date())
  });

  let state = loadState();
  let timerId = null;
  let setTimerId = null;
  let toastTimer = null;

  function normalizeHistory(history){
    const byWorkoutDay=new Map();
    history.filter(h=>h&&h.date&&h.workoutId&&!Number.isNaN(new Date(h.date).getTime())).forEach(h=>{
      const key=`${localDateKey(h.date)}|${h.workoutId}`;
      const previous=byWorkoutDay.get(key);
      if(!previous || (previous.demo && !h.demo) || (Boolean(previous.demo)===Boolean(h.demo) && new Date(h.date)>new Date(previous.date))){
        byWorkoutDay.set(key,h);
      }
    });
    return [...byWorkoutDay.values()].sort((a,b)=>new Date(b.date)-new Date(a.date));
  }
  function loadState(){
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      const d = defaults();
      if(!parsed) return d;
      const todayKey=localDateKey(new Date());
      const loadedHistory=normalizeHistory(Array.isArray(parsed.history)?parsed.history:d.history);
      const liveHistory=loadedHistory.filter(h=>!h.demo);
      const demoHistory=parsed.demoAnchorDate===todayKey ? loadedHistory.filter(h=>h.demo) : defaultHistory();
      return {...d,...parsed,profile:{...d.profile,...parsed.profile},history:normalizeHistory([...liveHistory,...demoHistory]),session:null,demoAnchorDate:todayKey};
    } catch(_){ return defaults(); }
  }
  function save(){
    const clean = {...state,session:null};
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(clean)); } catch(_) {}
  }
  function esc(str=''){return String(str).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function workoutById(id){return baseWorkouts.find(w=>w.id===id)||baseWorkouts[0];}
  function todayWorkout(){return workoutById(weekdayPlan[new Date().getDay()]);}
  function dayKey(date){return ['日','一','二','三','四','五','六'][date.getDay()];}
  function dateLabel(date){return new Intl.DateTimeFormat('zh-CN',{month:'numeric',day:'numeric'}).format(date);}
  function localDateKey(input){const d=input instanceof Date?input:new Date(input);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function sameDay(a,b){return localDateKey(a)===localDateKey(b);}
  function startOfWeek(date=new Date()){const d=new Date(date);d.setHours(0,0,0,0);const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);return d;}
  function endOfWeek(date=new Date()){const d=startOfWeek(date);d.setDate(d.getDate()+7);return d;}
  function weeklyHistory(){const start=startOfWeek(),end=endOfWeek();return state.history.filter(h=>{const d=new Date(h.date);return d>=start&&d<end;});}
  function weeklyCount(){return weeklyHistory().length;}
  function weeklyMinutes(){return weeklyHistory().reduce((sum,h)=>sum+Number(h.minutes||0),0);}
  function totalMinutes(){return state.history.reduce((sum,h)=>sum+Number(h.minutes||0),0);}
  function completedToday(workoutId=null){const now=new Date();return state.history.some(h=>sameDay(h.date,now)&&(!workoutId||h.workoutId===workoutId));}
  function liveCompletedToday(workoutId=null){const now=new Date();return state.history.some(h=>!h.demo&&sameDay(h.date,now)&&(!workoutId||h.workoutId===workoutId));}
  function streakCount(){
    const set=new Set(state.history.map(h=>localDateKey(h.date)));let cursor=new Date();cursor.setHours(12,0,0,0);
    if(!set.has(localDateKey(cursor))) cursor.setDate(cursor.getDate()-1);
    let count=0;
    while(set.has(localDateKey(cursor))){count++;cursor.setDate(cursor.getDate()-1);}
    return count;
  }
  function completionRate(){return Math.min(100,Math.round((weeklyCount()/state.profile.weeklyGoal)*100));}
  function formatVolume(h){
    if(h.type==='Cardio'&&Number.isFinite(Number(h.distanceKm))){const km=Number(h.distanceKm);return state.profile.units==='Imperial'?`${(km*0.621371).toFixed(1)} mi`:`${km.toFixed(1)} km`;}
    if((h.type==='Strength'||h.type==='Mixed')&&Number.isFinite(Number(h.volumeKg))){const kg=Number(h.volumeKg);return state.profile.units==='Imperial'?`${(kg*2.20462/1000).toFixed(1)}k lb`:`${(kg/1000).toFixed(1)}k kg`;}
    return '—';
  }
  function weeklyBars(){
    const dates=weekDates();return dates.map(d=>state.history.filter(h=>sameDay(h.date,d)).reduce((sum,h)=>sum+Number(h.minutes||0),0));
  }
  function resetViewScroll(){
    view.scrollTop=0;
    requestAnimationFrame(()=>{view.scrollTop=0;view.focus({preventScroll:true});});
  }
  function showToast(message){
    toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1800);
  }
  function updateClock(){
    const d=new Date();statusTime.textContent=d.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false});
  }
  setInterval(updateClock,30000);updateClock();

  function injectIcons(scope=document){
    scope.querySelectorAll('[data-icon]').forEach(el=>{const key=el.dataset.icon;if(icons[key])el.innerHTML=icons[key];});
  }

  function render(){
    stopTimer();
    stopSetTimer();
    if(!state.onboarded){renderOnboarding();resetViewScroll();return;}
    if(!state.loggedIn){renderLogin();resetViewScroll();return;}
    if(state.session){renderSession();return;}
    nav.hidden=false;view.classList.remove('no-nav');
    const routes={home:renderHome,plan:renderPlan,stats:renderStats,history:renderHistory,profile:renderProfile};
    (routes[state.tab]||renderHome)();
    setActiveNav();
    injectIcons(document);
    resetViewScroll();
  }

  function setActiveNav(){
    nav.querySelectorAll('button').forEach(btn=>{const active=btn.dataset.tab===state.tab;btn.classList.toggle('active',active);if(active)btn.setAttribute('aria-current','page');else btn.removeAttribute('aria-current');});
  }

  function renderOnboarding(){
    nav.hidden=true;view.classList.add('no-nav');
    const slides=[
      {num:'01',title:'今天练什么，\n打开就知道。',copy:'清晰的一周计划，把训练变成下一步行动，而不是又一张需要解读的数据面板。'},
      {num:'02',title:'少记一点，\n看懂更多。',copy:'只记录真正有用的信号：训练次数、训练时长、完成情况和连续性。'},
      {num:'03',title:'每次完成，\n数据都会变化。',copy:'完成一次训练后，连续天数、历史记录和本周数据都会立即更新。'}
    ];
    const i=Math.min(state.onboardingIndex,slides.length-1),s=slides[i];
    view.innerHTML=`<section class="onboarding">
      <div class="onboarding-top"><div class="onboarding-logo"><i></i>MOTION</div><button class="link-button" data-action="skip-onboarding">跳过</button></div>
      <div class="onboarding-visual"><div class="orb"><strong>${s.num}</strong><small>产品体验</small></div></div>
      <div class="onboarding-copy"><h2>${s.title.replace(/\n/g,'<br>')}</h2><p>${s.copy}</p>
      <div class="onboarding-dots">${slides.map((_,n)=>`<span class="${n===i?'active':''}"></span>`).join('')}</div>
      <button class="btn btn-orange btn-wide" data-action="onboarding-next">${i===slides.length-1?'进入体验':'下一步'} <span data-icon="arrow"></span></button></div>
    </section>`;
    injectIcons(view);
  }

  function renderLogin(){
    nav.hidden=true;view.classList.add('no-nav');
    view.innerHTML=`<section class="login-screen">
      <div class="login-head"><div class="logo-big">M</div><p class="eyebrow-app">欢迎回来</p><h2>准备开始<br>训练了吗？</h2><p>这是 SEEKBLACK 的互动产品 Demo。可以直接使用示例资料，也可以输入任意展示名称。</p></div>
      <div class="form"><div class="field"><label for="demo-name">展示名称</label><input id="demo-name" value="${esc(state.profile.name)}" maxlength="20" autocomplete="off"></div>
      <div class="demo-account"><b>示例账户</b><br>每周目标 4 次 · 已包含一组示例训练记录。</div></div>
      <div class="login-actions"><button class="btn btn-primary btn-wide" data-action="login-demo">进入互动体验 <span data-icon="arrow"></span></button><div class="legal-note">仅作为概念产品演示，不提供医疗诊断、运动处方或专业训练建议。</div></div>
    </section>`;injectIcons(view);
  }

  function weekDates(){
    const now=new Date();const day=(now.getDay()+6)%7;const mon=new Date(now);mon.setHours(12,0,0,0);mon.setDate(now.getDate()-day);
    return Array.from({length:7},(_,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);return d;});
  }


  function renderHome(){
    const w=todayWorkout();const now=new Date();const dates=weekDates();const greeting=new Date().getHours()<12?'上午好':new Date().getHours()<18?'下午好':'晚上好';
    const history=state.history.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,3);
    view.innerHTML=`<section class="home-top"><div class="hello-row"><div><p>${greeting}</p><h2>${esc(state.profile.name)}.</h2></div><div class="avatar orange">${esc(state.profile.name).slice(0,2).toUpperCase()}</div></div>
      <div class="week-strip">${dates.map(d=>{const same=d.toDateString()===now.toDateString();const planId=weekdayPlan[d.getDay()];const done=state.history.some(h=>sameDay(h.date,d)&&h.workoutId===planId);return `<div class="day ${same?'today':''} ${done?'completed':''}"><small>${dayKey(d)}</small><strong>${d.getDate()}</strong></div>`}).join('')}</div></section>
      <section class="today-card ${w.type==='Recovery'?'rest-card':''}"><div class="today-card-top"><span class="pill"><span class="dot"></span>${completedToday(w.id)?'今日已完成':'今日训练'}</span><span class="eyebrow-app">${typeLabel(w.type)}</span></div><h3>${w.short.replace(/\n/g,'<br>')}</h3><p>${w.exercises.length} 个动作 · 约 ${w.minutes} 分钟的专注训练。</p><div class="workout-meta"><span>${w.minutes} 分钟</span><span>${w.exercises.length} 个动作</span><span>${typeLabel(w.type)}</span></div>
      <button class="btn ${completedToday(w.id)?'btn-outline':'btn-orange'} btn-wide" data-action="open-workout" data-workout="${w.id}">${completedToday(w.id)?'查看训练':'开始今日训练'} <span data-icon="arrow"></span></button></section>
      <section class="metric-grid"><div class="metric orange-metric"><small>本周进度</small><strong>${weeklyCount()}/${state.profile.weeklyGoal}</strong><em>已完成 ${completionRate()}%</em></div><div class="metric"><small>连续训练</small><strong>${streakCount()} 天</strong><em>保持节奏</em></div><div class="metric"><small>训练时长</small><strong>${totalMinutes()}</strong><em>分钟</em></div><div class="metric"><small>训练记录</small><strong>${state.history.length}</strong><em>当前 Demo</em></div></section>
      <section class="home-section"><div class="home-section-head"><h3>最近训练</h3><button class="link-button" data-tab="history">查看全部</button></div><div class="history-mini">${history.map(h=>`<div class="history-row"><div class="history-icon"><span data-icon="${h.type==='Cardio'?'history':'flame'}"></span></div><div><h4>${esc(h.workout)}</h4><p>${typeLabel(h.type)} · ${h.minutes} 分钟</p></div><time>${dateLabel(new Date(h.date))}</time></div>`).join('')}</div></section>`;
  }

  function renderPlan(){
    const dates=weekDates();const map=['upper','mobility','lower','recovery','full','cardio','recovery'];const today=new Date();
    view.innerHTML=`<section class="plan-hero"><p class="eyebrow-app">训练计划</p><h2>本周安排</h2><p>力量、灵活性、有氧和恢复，统一放进一套清晰的周计划里。</p><div class="plan-progress"><div class="progress-ring" style="--progress:${completionRate()}%"><strong>${completionRate()}%</strong></div><div><strong>已完成 ${weeklyCount()}/${state.profile.weeklyGoal} 次</strong><span>本周规律训练目标</span></div></div></section>
      <section class="plan-list">${dates.map((d,i)=>{const w=workoutById(map[i]);const same=d.toDateString()===today.toDateString();const done=state.history.some(h=>sameDay(h.date,d)&&h.workoutId===w.id);return `<button class="plan-day ${same?'today':''} ${done?'done':''}" data-action="open-workout" data-workout="${w.id}" style="text-align:left;border-style:solid;cursor:pointer"><div class="plan-date"><small>${dayKey(d)}</small><strong>${d.getDate()}</strong></div><div><h3>${esc(w.name)}</h3><p>${typeLabel(w.type)} · ${w.minutes} 分钟 · ${w.exercises.length} 个动作</p></div><span class="plan-state ${same?'active':''} ${done?'done':''}">${done?'已完成':same?'今天':'查看'}</span></button>`}).join('')}</section>`;
  }

  function renderWorkoutDetail(id){
    const w=workoutById(id);nav.hidden=true;view.classList.add('no-nav');
    view.innerHTML=`<section class="workout-hero"><div class="back-row"><button class="back-btn" data-action="close-workout" aria-label="返回"><span data-icon="back"></span></button><span class="eyebrow-app">训练详情</span></div><h2>${w.short.replace(/\n/g,'<br>')}</h2><p>按顺序完成每一组动作。完成训练后，本周进度、连续训练和历史记录都会同步更新。</p><div class="hero-meta"><span class="pill">${w.minutes} 分钟</span><span class="pill">${w.exercises.length} 个动作</span><span class="pill">${typeLabel(w.type)}</span></div></section>
      <section class="exercise-list">${w.exercises.map((e,i)=>`<div class="exercise-card"><div class="exercise-num">${String(i+1).padStart(2,'0')}</div><div><h3>${esc(e.name)}</h3><p>${esc(e.cue)}</p></div><strong>${e.sets} × ${esc(e.reps)}</strong></div>`).join('')}</section>
      <div class="workout-footer"><button class="btn btn-primary btn-wide" data-action="start-workout" data-workout="${w.id}"><span data-icon="play"></span> 开始训练</button></div>`;injectIcons(view);resetViewScroll();
  }

  function durationSeconds(reps=''){
    const value=String(reps).trim();
    let match=value.match(/^(\d+)\s*秒$/);
    if(match) return Number(match[1]);
    match=value.match(/^(\d+)\s*分钟$/);
    if(match) return Number(match[1])*60;
    return null;
  }
  function resetSetCountdown(){
    if(!state.session)return;
    state.session.countdownExerciseIndex=null;
    state.session.countdownSetIndex=null;
    state.session.countdownTotal=null;
    state.session.countdownRemaining=null;
    state.session.countdownRunning=false;
    state.session.countdownStarted=false;
    state.session.countdownFinished=false;
    state.session.countdownEndsAt=null;
  }
  function ensureSetCountdown(exercise){
    const s=state.session,duration=durationSeconds(exercise.reps);
    if(!s||duration===null)return null;
    const sameTarget=s.countdownExerciseIndex===s.exerciseIndex&&s.countdownSetIndex===s.setIndex&&s.countdownTotal===duration;
    if(!sameTarget){
      resetSetCountdown();
      s.countdownExerciseIndex=s.exerciseIndex;
      s.countdownSetIndex=s.setIndex;
      s.countdownTotal=duration;
      s.countdownRemaining=duration;
    }
    return duration;
  }
  function countdownDisplay(seconds,total){
    const value=Math.max(0,Number(seconds)||0);
    if(total>60){
      const m=Math.floor(value/60),sec=value%60;
      return {main:`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`,unit:'倒计时'};
    }
    return {main:String(value),unit:'秒'};
  }
  function startSession(workoutId){
    const w=workoutById(workoutId);state.session={workoutId:w.id,exerciseIndex:0,setIndex:0,elapsed:0,startedAt:Date.now()};resetSetCountdown();render();
  }
  function renderSession(){
    stopTimer();stopSetTimer();nav.hidden=true;view.classList.add('no-nav');const s=state.session,w=workoutById(s.workoutId),e=w.exercises[s.exerciseIndex];
    const totalSets=w.exercises.reduce((sum,x)=>sum+x.sets,0);const doneSets=w.exercises.slice(0,s.exerciseIndex).reduce((sum,x)=>sum+x.sets,0)+s.setIndex;const pct=Math.round((doneSets/totalSets)*100);
    const duration=ensureSetCountdown(e);let repMain='',repUnit='',primaryAction='complete-set',primaryLabel='<span data-icon="check"></span> 完成本组',timedClass='';
    if(duration!==null){
      const display=countdownDisplay(s.countdownRemaining,duration);repMain=display.main;repUnit=display.unit;primaryAction='toggle-set-timer';timedClass=' timed';
      if(s.countdownFinished) primaryLabel='<span data-icon="check"></span> 完成本组';
      else if(s.countdownRunning) primaryLabel='暂停计时';
      else if(s.countdownStarted) primaryLabel='继续计时';
      else primaryLabel='<span data-icon="play"></span> 开始计时';
    }else{
      const repParts=esc(e.reps).split(' ');repMain=repParts.shift()||'';repUnit=repParts.join(' ');
    }
    view.innerHTML=`<section class="session"><header class="session-head"><button class="back-btn" data-action="quit-session" aria-label="退出训练"><span data-icon="back"></span></button><span class="session-timer" id="session-timer">${formatTime(s.elapsed)}</span><span class="eyebrow-app">${s.exerciseIndex+1}/${w.exercises.length}</span></header><div class="session-progress" style="--session-progress:${pct}%"><span></span></div>
      <div class="session-main"><div class="session-kicker">${typeLabel(w.type)} / 动作 ${String(s.exerciseIndex+1).padStart(2,'0')}</div><h2>${esc(e.name)}</h2><p class="session-desc">${esc(e.cue)}</p>
      <div class="set-box${timedClass}${s.countdownRunning?' countdown-running':''}${s.countdownFinished?' countdown-finished':''}"><div class="set-box-top"><small>当前组</small><strong>${s.setIndex+1} / ${e.sets}</strong></div><div class="rep-display${timedClass}" id="set-countdown-display">${repMain} <span>${repUnit}</span></div><div class="set-dots">${Array.from({length:e.sets},(_,i)=>`<span class="${i<s.setIndex?'done':''}"></span>`).join('')}</div></div>
      <div class="session-actions"><button class="btn btn-outline" data-action="skip-exercise">跳过</button><button class="btn btn-orange" id="session-primary" data-action="${primaryAction}">${primaryLabel}</button></div><div class="session-note">互动演示 · 不构成运动或健康建议</div></div></section>`;
    injectIcons(view);startTimer();if(duration!==null&&s.countdownRunning)startSetTimer();requestAnimationFrame(()=>view.focus({preventScroll:true}));
  }
  function startTimer(){
    stopTimer();
    timerId=setInterval(()=>{if(!state.session)return;state.session.elapsed=Math.floor((Date.now()-state.session.startedAt)/1000);const el=document.getElementById('session-timer');if(el)el.textContent=formatTime(state.session.elapsed)},1000);
  }
  function stopTimer(){if(timerId){clearInterval(timerId);timerId=null;}}
  function stopSetTimer(){if(setTimerId){clearInterval(setTimerId);setTimerId=null;}}
  function syncSetCountdown(){
    const s=state.session;if(!s||!s.countdownRunning||!s.countdownEndsAt)return;
    s.countdownRemaining=Math.max(0,Math.ceil((s.countdownEndsAt-Date.now())/1000));
    const display=countdownDisplay(s.countdownRemaining,s.countdownTotal||0);const el=document.getElementById('set-countdown-display');
    if(el)el.innerHTML=`${display.main} <span>${display.unit}</span>`;
    if(s.countdownRemaining<=0){
      stopSetTimer();s.countdownRunning=false;s.countdownFinished=true;s.countdownEndsAt=null;
      const box=document.querySelector('.set-box');box?.classList.remove('countdown-running');box?.classList.add('countdown-finished');
      const btn=document.getElementById('session-primary');if(btn){btn.dataset.action='complete-set';btn.innerHTML=`${icons.check} 完成本组`;}
      showToast('本组计时完成');
    }
  }
  function startSetTimer(){
    const s=state.session;if(!s||s.countdownFinished)return;stopSetTimer();
    if(!s.countdownEndsAt)s.countdownEndsAt=Date.now()+Math.max(0,s.countdownRemaining||0)*1000;
    s.countdownRunning=true;s.countdownStarted=true;syncSetCountdown();
    setTimerId=setInterval(syncSetCountdown,250);
  }
  function pauseSetCountdown(){
    const s=state.session;if(!s||!s.countdownRunning)return;
    syncSetCountdown();stopSetTimer();s.countdownRunning=false;s.countdownEndsAt=null;
  }
  function toggleSetCountdown(){
    const s=state.session,w=s&&workoutById(s.workoutId),e=s&&w.exercises[s.exerciseIndex];if(!s||!e)return;
    const duration=ensureSetCountdown(e);if(duration===null){completeSet();return;}
    if(s.countdownFinished){completeSet();return;}
    if(s.countdownRunning){pauseSetCountdown();renderSession();showToast('计时已暂停');return;}
    startSetTimer();renderSession();
  }
  function formatTime(sec){const m=Math.floor(sec/60),s=sec%60;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
  function completeSet(){
    const s=state.session,w=workoutById(s.workoutId),e=w.exercises[s.exerciseIndex];stopSetTimer();
    if(s.setIndex<e.sets-1){s.setIndex++;resetSetCountdown();renderSession();showToast(`第 ${s.setIndex} 组已完成`);return;}
    if(s.exerciseIndex<w.exercises.length-1){s.exerciseIndex++;s.setIndex=0;resetSetCountdown();renderSession();showToast('进入下一个动作');return;}
    finishWorkout();
  }
  function skipExercise(){
    const s=state.session,w=workoutById(s.workoutId);stopSetTimer();
    if(s.exerciseIndex<w.exercises.length-1){s.exerciseIndex++;s.setIndex=0;resetSetCountdown();renderSession();showToast('已跳过当前动作');}else finishWorkout();
  }
  function finishWorkout(){
    stopTimer();stopSetTimer();const s=state.session,w=workoutById(s.workoutId);const now=new Date();const already=liveCompletedToday(w.id);const minutes=w.minutes;
    if(!already){state.history.unshift({id:'live-'+Date.now(),date:now.toISOString(),workoutId:w.id,workout:w.name,type:w.type,minutes,volumeKg:(w.type==='Strength'||w.type==='Mixed')?3900:null,distanceKm:w.type==='Cardio'?4.3:null,demo:false});}
    state.session={...s,finished:true,resultMinutes:minutes};save();renderComplete(w,already);
  }
  function renderComplete(w,already){
    nav.hidden=true;view.classList.add('no-nav');stopTimer();stopSetTimer();clearTimeout(toastTimer);toast.classList.remove('show');toast.textContent='';
    view.innerHTML=`<section class="complete"><div class="complete-mark">✓</div><p class="eyebrow-app">训练完成</p><h2>今天，<br>完成了。</h2><p>${already?'今天这项训练已经计入过一次，本周数据不会重复增加。':'训练记录、本周进度和连续训练天数都已经更新。'}</p>
      <div class="complete-stats"><div class="complete-stat"><small>时长</small><strong>${w.minutes}</strong><span>分钟</span></div><div class="complete-stat"><small>动作</small><strong>${w.exercises.length}</strong><span>个</span></div><div class="complete-stat"><small>连续</small><strong>${streakCount()}</strong><span>天</span></div></div>
      <div class="complete-actions"><button class="btn btn-primary btn-wide" data-action="complete-to-stats">查看更新后的数据 <span data-icon="arrow"></span></button><button class="btn btn-ghost btn-wide" data-action="complete-home">返回首页</button></div></section>`;injectIcons(view);resetViewScroll();
  }

  function renderStats(){
    const weekly=weeklyBars();const max=Math.max(...weekly,50);const days=['一','二','三','四','五','六','日'];const todayIndex=(new Date().getDay()+6)%7;
    view.innerHTML=`<section class="stats-hero"><p class="eyebrow-app">训练进度</p><h2>数据概览</h2></section><section class="stats-summary"><div class="stats-summary-top"><div><span class="eyebrow-app">训练分钟数</span><strong class="big">${totalMinutes()}</strong></div><span class="change">本周 ${weeklyMinutes()} 分钟</span></div><div class="bar-chart">${weekly.map((v,i)=>`<div class="bar-col"><span class="bar ${i===todayIndex&&completedToday()?'active':''}" style="--h:${Math.max(4,(v/max)*100)}%"></span><small>${days[i]}</small></div>`).join('')}</div></section>
      <section class="stats-cards"><div class="stats-card"><small>本周目标</small><strong>${weeklyCount()}/${state.profile.weeklyGoal}</strong><span>已完成 ${completionRate()}%</span></div><div class="stats-card"><small>连续训练</small><strong>${streakCount()} 天</strong><span>当前连续记录</span></div><div class="stats-card"><small>训练次数</small><strong>${state.history.length}</strong><span>Demo 内记录</span></div><div class="stats-card"><small>平均时长</small><strong>${Math.round(state.history.reduce((s,h)=>s+h.minutes,0)/Math.max(1,state.history.length))}</strong><span>分钟 / 次</span></div></section>
      <section class="trend-card"><h3>规律训练趋势</h3><p>示例 6 周完成趋势，用于展示数据反馈方式。</p><svg class="sparkline" viewBox="0 0 300 70" preserveAspectRatio="none"><defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a2a" stop-opacity=".22"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></linearGradient></defs><path class="area" d="M0 55 C35 50 48 37 76 43 S118 27 150 32 S205 12 235 25 S270 17 300 8 L300 70 L0 70Z"/><path class="line" d="M0 55 C35 50 48 37 76 43 S118 27 150 32 S205 12 235 25 S270 17 300 8"/></svg></section>`;
  }

  function renderHistory(){
    const history=state.history.slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
    view.innerHTML=`<section class="history-head"><p class="eyebrow-app">训练记录</p><h2>历史训练</h2><div class="history-filter"><button class="active" data-filter="ALL" aria-pressed="true">全部</button><button data-filter="Strength" aria-pressed="false">力量</button><button data-filter="Cardio" aria-pressed="false">有氧</button><button data-filter="Mobility" aria-pressed="false">灵活性</button></div></section><section class="history-list">${history.map(h=>`<article class="history-item" data-type="${esc(h.type)}"><div class="history-item-top"><div><h3>${esc(h.workout)}</h3><p>${typeLabel(h.type)}${h.demo?' · 示例数据':' · 本次体验新增'}</p></div><time>${dateLabel(new Date(h.date))}</time></div><div class="history-item-meta"><div><small>时长</small><strong>${h.minutes} 分钟</strong></div><div><small>${h.type==='Cardio'?'距离':'训练量'}</small><strong>${esc(formatVolume(h))}</strong></div><div><small>状态</small><strong>已完成</strong></div></div></article>`).join('')}</section>`;
  }

  function renderProfile(){
    view.innerHTML=`<section class="profile-hero"><div class="profile-user"><div class="avatar">${esc(state.profile.name).slice(0,2).toUpperCase()}</div><div><h2>${esc(state.profile.name)}</h2><p>MOTION Demo · ${esc(state.profile.goal)}</p></div></div><div class="profile-goal"><div><small>本周目标</small><strong>${weeklyCount()}/${state.profile.weeklyGoal} 次</strong></div><div><small>连续训练</small><strong>${streakCount()} 天</strong></div></div></section>
      <section class="settings"><div class="settings-group"><h3>训练设置</h3><div class="setting-row"><strong>每周目标</strong><button class="link-button" data-action="cycle-goal">${state.profile.weeklyGoal} 次</button></div><div class="setting-row"><strong>单位</strong><button class="link-button" data-action="toggle-units">${unitLabels[state.profile.units]||state.profile.units}</button></div></div>
      <div class="settings-group"><h3>偏好设置</h3><div class="setting-row"><strong>训练提醒</strong><button class="toggle ${state.profile.reminder?'on':''}" data-action="toggle-reminder" aria-label="训练提醒" aria-pressed="${state.profile.reminder}"></button></div></div>
      <div class="settings-group"><h3>演示工具</h3><div class="setting-row"><strong>重置 Demo 数据</strong><button class="link-button danger" data-action="reset-demo">重置</button></div><div class="setting-row"><strong>SEEKBLACK 案例页</strong><a class="link-button" href="https://seekblack.cn/work/motion/">打开 ↗</a></div></div></section><p class="concept-note-app">MOTION 是用于展示移动产品结构、交互设计与状态更新能力的 Independent Concept Project，不提供医疗诊断、运动处方或专业训练建议。</p>`;
  }

  function navigate(tab){state.tab=tab;state.session=null;save();render();}

  let pendingConfirm=null;
  let confirmReturnFocus=null;
  function requestConfirm(title,copy,confirmText,onConfirm){
    const layer=document.getElementById('confirm-layer');if(!layer)return;
    layer.querySelector('[data-confirm-title]').textContent=title;
    layer.querySelector('[data-confirm-copy]').textContent=copy;
    layer.querySelector('[data-confirm-ok]').textContent=confirmText;
    pendingConfirm=onConfirm;confirmReturnFocus=document.activeElement;phone?.classList.add('confirm-open');layer.hidden=false;requestAnimationFrame(()=>layer.classList.add('show'));
    layer.querySelector('[data-confirm-cancel]').focus({preventScroll:true});
  }
  function closeConfirm(run=false){
    const layer=document.getElementById('confirm-layer');if(!layer||layer.hidden)return;
    const fn=pendingConfirm;const returnFocus=confirmReturnFocus;pendingConfirm=null;confirmReturnFocus=null;layer.classList.remove('show');phone?.classList.remove('confirm-open');setTimeout(()=>{layer.hidden=true;if(run&&typeof fn==='function')fn();else if(returnFocus&&document.contains(returnFocus))returnFocus.focus({preventScroll:true});},180);
  }

  document.addEventListener('click',e=>{
    const confirmAction=e.target.closest('[data-confirm-action]');if(confirmAction){closeConfirm(confirmAction.dataset.confirmAction==='ok');return;}
    const tab=e.target.closest('[data-tab]');if(tab){navigate(tab.dataset.tab);return;}
    const el=e.target.closest('[data-action]');if(!el)return;
    const action=el.dataset.action;
    if(action==='onboarding-next'){
      if(state.onboardingIndex<2){state.onboardingIndex++;}else{state.onboarded=true;state.onboardingIndex=0;save();}render();return;
    }
    if(action==='skip-onboarding'){state.onboarded=true;state.onboardingIndex=0;save();render();return;}
    if(action==='login-demo'){
      const input=document.getElementById('demo-name');state.profile.name=(input?.value||'Alex').trim().slice(0,20)||'Alex';state.loggedIn=true;save();render();return;
    }
    if(action==='go-home'){e.preventDefault();if(state.loggedIn)navigate('home');return;}
    if(action==='open-workout'){renderWorkoutDetail(el.dataset.workout||todayWorkout().id);return;}
    if(action==='close-workout'){render();return;}
    if(action==='start-workout'){startSession(el.dataset.workout);return;}
    if(action==='quit-session'){
      const setWasRunning=Boolean(state.session?.countdownRunning);pauseSetCountdown();if(setWasRunning)renderSession();
      requestConfirm('退出当前训练？','本次训练进度不会保存。','退出训练',()=>{state.session=null;render();});
      return;
    }
    if(action==='complete-set'){completeSet();return;}
    if(action==='toggle-set-timer'){toggleSetCountdown();return;}
    if(action==='skip-exercise'){skipExercise();return;}
    if(action==='complete-to-stats'){state.session=null;navigate('stats');return;}
    if(action==='complete-home'){state.session=null;navigate('home');return;}
    if(action==='toggle-reminder'){state.profile.reminder=!state.profile.reminder;save();renderProfile();showToast(state.profile.reminder?'训练提醒已开启':'训练提醒已关闭');return;}
    if(action==='toggle-units'){state.profile.units=state.profile.units==='Metric'?'Imperial':'Metric';save();renderProfile();showToast(`单位：${unitLabels[state.profile.units]}`);return;}
    if(action==='cycle-goal'){state.profile.weeklyGoal=state.profile.weeklyGoal>=6?4:state.profile.weeklyGoal+1;save();renderProfile();showToast(`每周目标：${state.profile.weeklyGoal} 次`);return;}
    if(action==='reset-demo'){
      requestConfirm('重置体验数据？','训练记录、偏好设置和引导状态都会恢复为初始 Demo。','确认重置',()=>{try{localStorage.removeItem(STORAGE_KEY)}catch(_){}state=defaults();render();showToast('Demo 已重置');});
      return;
    }
  });

  document.addEventListener('click',e=>{
    const btn=e.target.closest('.history-filter button');if(!btn)return;
    btn.parentElement.querySelectorAll('button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');
    const type=btn.dataset.filter||'ALL';document.querySelectorAll('.history-item').forEach(item=>{item.style.display=type==='ALL'||item.dataset.type===type?'block':'none';});
  });

  document.addEventListener('keydown',e=>{const layer=document.getElementById('confirm-layer');if(!layer||layer.hidden)return;if(e.key==='Escape'){closeConfirm(false);return;}if(e.key==='Tab'){const items=[...layer.querySelectorAll('.confirm-card button:not([disabled])')];if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});

  injectIcons(document);
  render();

  // Live demo prioritizes deployment reliability over offline caching.
  // Remove older MOTION service workers/caches so a hotfix cannot be masked by stale HTML/assets.
  if('serviceWorker' in navigator) {
    window.addEventListener('load',()=>navigator.serviceWorker.getRegistrations().then(regs=>Promise.all(regs.map(reg=>reg.unregister()))).catch(()=>{}));
  }
  if('caches' in window) {
    window.addEventListener('load',()=>caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('motion-demo-')).map(key=>caches.delete(key)))).catch(()=>{}));
  }
})();
