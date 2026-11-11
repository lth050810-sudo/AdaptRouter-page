'use strict';
(() => {
  const D = window.ADAPTROUTER_DATA;
  if (!D) return;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const english = new Map($$('[data-i18n]').map(e => [e.dataset.i18n, e.innerHTML]));
  const zh = {
    sectionMethod:'01 / 方法',sectionContinual:'02 / 持续适应',sectionPool:'03 / 动态专家池',sectionResults:'04 / 质量与成本',sectionAnalysis:'05 / 深入分析',sectionResources:'06 / 研究资源',routerSize:'0.8B 路由器',navMethod:'方法',navAdapt:'适应能力',navResults:'实验结果',navResources:'资源',paperButton:'论文 ↗',
    heroEyebrow:'持续学习的模型路由 · 2026年11月',heroTitle:'持续学习路由策略<br>适应不断变化的任务与模型',heroLede:'新任务，新专家，同一个自适应策略。<br>轻量多模态路由器从任务反馈中学习，保留已有能力，为每个问题选择合适的专家。',exploreResults:'探索实验结果',downloadData:'下载结果数据',heroCaption:'研究手稿 · 匿名作者 · 结果快照：2026年11月8日',
    boardTitle:'一次决策，适应变化的专家池',inputLabel:'任务输入',inputText:'文本与推理',inputVision:'图像与问题',newTask:'新任务随时间到来',routerCaption:'问题 + 专家卡片',oneExpert:'选择一个冻结的专家',expertLabel:'当前可用的专家',expertSmall:'小型高效模型',expertReason:'推理模型',expertApi:'API 模型',newExpert:'通过卡片加入新专家',feedbackLoop:'任务反馈更新路由策略',boardSchematic:'方法示意图',
    statApi:'API 基准加权得分',statApiSub:'10 个基准 · 10,363 个问题',statRetention:'相对历史峰值的最大下降',statRetentionSub:'早期任务 · StartLux 两种变体',statPool:'模型池中的专家数量',statPoolSub:'四任务得分：66.7% → 75.5%',statCost:'比较成本降低',statCostSub:'相对适配版 Router-R1 · API 基准',
    methodTitle:'环境在变。<br>路由器持续学习。',methodLede:'当问题与可用模型不断变化时，路由策略也需要持续学习。AdaptRouter 把专家池作为输入的一部分。',methodA:'读取问题与专家卡片。',methodAText:'轻量决策模型读取完整问题、图像与当前专家的描述卡片。新增专家通过新增卡片进入候选集合。',methodB:'从任务反馈中学习。',methodBText:'主实验与持续学习实验对采样的路由决策进行原生任务评分。质量优先优势限制成本项对学习信号的影响。',methodC:'把策略延续到下一阶段。',methodCText:'每个阶段继承上一阶段的策略与优化器状态，只使用新增数据训练，并在所有已见任务上评估。',objective:'路由目标',objectiveNote:'一次路由器预填充，选定一个专家，由专家生成完整答案。',trainingDetails:'两套训练协议分别报告',trainingDetailsText:'主实验与持续学习实验使用基于任务反馈的策略优化。API 扩展实验利用全专家的质量与成本构建软目标（λ = 0.02，τ = 0.05），并加入遗憾项；API 结果不作为在线强化学习实验展示。',
    continualTitle:'学会下一项任务。<br>保留之前的能力。',continualLede:'五个基准分四阶段到来。策略只从当前阶段的新增问题中学习，不回放早期训练数据。',trackedTask:'跟踪任务',changeMode:'相对首次阶段的变化',accuracyMode:'准确率',continualNote:'变化以各任务首次出现的阶段为参照。固定专家不参与持续训练。图中展示手稿中的点估计，不暗示置信区间。',continualFinding:'StartLux 两种变体在早期任务上，相对历史峰值的下降均不超过 <strong>0.4 个百分点</strong>。全参数微调变体在最后阶段的 MATH-500 得分为 <strong>92.20%</strong>，与初始阶段一致。',continualTable:'查看完整的逐阶段结果表',
    poolTitle:'更多专家。<br>让新能力真正被使用。',poolLede:'同一种卡片条件化设计分别在三个、五个和十个专家的模型池中训练。冻结骨干的 JevAny 风格路由器通过反馈学习指针头。',poolChartTitle:'扩大专家池',exploreChartTitle:'需要多少探索反馈？',poolChartNote:'四任务实验，使用匹配的奖励与更新预算。它与 15 基准主实验使用不同的评估任务。',explorationBudget:'探索比例',poolFinding:'三个专家时为 <strong>66.7%</strong>，十个专家时为 <strong>75.5%</strong>。仅探索 <strong>5%</strong> 的问题，固定留出集得分达到 <strong>77.2%</strong>，距已测预算中的最高值仅 1.9 个百分点。',poolMore:'专家选择分布与模型池实验细节',poolMoreText:'所有探索预算共用按问题家族划分的固定 10% 留出集，每次训练 500 次更新。“All”与“Held-out”对应不同的评估子集，在下载数据中分别保留。',paperFigureNote:'论文原始图表。T = 思考模式；NT = 非思考模式。',explorationCsv:'下载全部探索比例结果 ↗',
    resultsTitle:'合适的专家。<br>更好的质量与成本。',resultsLede:'逐项查看基准，对比路由方法，探索质量与成本的权衡。开源模型与 API 模型分别保留各自的评估和成本定义。',apiTab:'API 模型',openTab:'开源模型',qualityCost:'质量与成本',logScale:'成本轴使用对数刻度',scoreColumn:'评分指标',filterLabel:'方法类别',fullMatrix:'在一张表中查看全部基准',includePartial:'包括未完整覆盖的 max 参考行',resultProtocol:'评估范围与比较口径',scopeHeading:'平均方式与覆盖范围',scopeText:'两套基准均报告按请求数加权的平均分。API 基准包含 10,363 个测试问题。max 模式的不完整参考行来自外部公开结果，不进入完整样本的散点图和排名。',costHeading:'成本包含哪些部分',costText:'API 成本按选中专家成功答卷的公开单价折算，不含训练、裁判、本地路由计算和未知失败请求账单。开源成本是相对 Qwen3.5-9B 思考模式的参数量加权 token 代理。',baselineHeading:'适配的对照方法',baselineText:'Router-R1 是单次专家选择的 PPO 适配版，不是原版多轮系统。其 $283.26 采用已记录的保守高口径费用处理。API AdaptRouter 行包含已报告的基准专项训练更新。',selectionTitle:'多数问题交给强模型。<br>高成本问题采用不同的路线。',selectionText:'对于 LongBench v2，手稿报告 StartLux 选定路线的成本为 $9.54，而直接使用 Gemini 为 $112.28。请求占比和费用占比反映不同的信息。',routerLabel:'路由器',
    analysisTitle:'哪些组件<br>支撑了路由效果？',analysisLede:'消融分析学习信号和视觉输入的作用。耗时与模型规模实验则展示路由决策本身的实际代价。',ablationTitle:'各个组件都有贡献',latencyTitle:'轻量的决策开销',ablationNote:'四任务消融，非 15 基准主实验。完整模型用一张 GPU 训练，消融用八张。评估包含已记录的 400 道训练重叠题。',routingLabel:'路由决策',executionLabel:'专家执行',latencyNote:'每个问题的平均耗时，单位为秒。专家执行以 GPU 秒报告，这些观测不代表受控的端到端加速比。',tradeoffMore:'质量—成本权衡与路由器规模',lambdaCaption:'原始 M5 权衡图。较小的 λ 允许以更高成本获得更高准确率。',scaleTitle:'更大的路由器并不总是更好',scaleNote:'M5 上匹配的 LoRA 预算。延迟包含预处理。顺序一致性是在五种循环候选顺序下的两两选择一致率。',
    resourcesTitle:'查看研究证据。',resourcesLede:'阅读当前研究手稿，下载报告数值与原始图表。页面的交互可视化均基于随站点提供的结果表生成。',resourcePaper:'研究手稿',resourcePaperText:'归档论文快照 · PDF',resourceData:'完整实验结果',resourceDataText:'七类实验 · 结构化数据',resourceSource:'来源与指标定义',resourceSourceText:'快照、来源哈希与指标说明',resourceFigure:'方法框架图',resourceFigureText:'论文中的原始矢量图',csvOpen:'开源模型',csvApi:'API 模型',csvContinual:'持续学习',csvPools:'专家池',csvExplore:'探索比例',csvAblation:'消融实验',csvScale:'路由器规模',citationTitle:'AdaptRouter',citationNote:'匿名研究手稿，2026年11月。当前归档快照未列出公开文献标识符或研究代码发布地址。',copyCitation:'复制参考信息',footerText:'研究结果快照 · 2026年11月8日<br>交互展示制作于2026年11月11日',designCredit:'交互研究结果 ↗'
  };
  let storedLang = 'en';
  try { storedLang = localStorage.getItem('ar-lang') || 'en'; } catch {}
  const state = {lang: storedLang === 'zh' ? 'zh' : 'en', suite:'api', metric:10, sort:'score', descending:true, group:'all', query:'', log:true, highlight:'', continualMode:'change', task:0, poolMetric:4, explore:1, latency:'main', selection:'StartLux', includePartial:false};
  const T = (en, cn) => state.lang === 'zh' ? cn : en;
  const fmt = (v, digits=2) => v == null ? '—' : Number(v).toFixed(digits);
  const shortName = s => s.replace(' (Full FT, ours)', ' · FT').replace(' (LoRA, ours)', ' · LoRA').replace('JevAny-0.8B','JevAny 0.8B').replace(' (Original)',' · Original').replace(' (Prompted Selector)',' · Prompted');
  const names = {full:'StartLux 0.8B (Full FT, ours)',lora:'StartLux 0.8B (LoRA, ours)',jev:'JevAny-0.8B (Full FT, ours)',mlp:'MLP Reward Predictor',lin:'LinUCB',latent:'LatentRouter (adapted)',embed:'EmbedLLM (adapted)'};
  const selectedContinual = new Set([names.full,names.mlp,names.lin,names.latent]);
  function colors(){let c=getComputedStyle(document.documentElement);return Object.fromEntries(['ink','muted','line','grid','teal','blue','amber','gray','violet','rose','surface','page','tint','soft-blue'].map(k=>[k,c.getPropertyValue('--'+k).trim()]));}
  function group(r){if(r.ours)return'ours';if(r.group.startsWith('I.'))return'direct';if(r.group.startsWith('II.'))return'released';return'feedback';}
  const groupName = g => ({ours:T('AdaptRouter','AdaptRouter'),direct:T('Direct / random','直接模型 / 随机'),released:T('Released / prompted','已发布 / 提示路由'),feedback:T('Feedback-trained','反馈训练')})[g];
  const groupColor = (r,c) => ({ours:c.teal,direct:c.gray,released:c.blue,feedback:c.amber})[group(r)];
  function svg(w,h,content,label){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" style="font-family:Inter,'AdaptRouter Han',Arial,sans-serif"><title>${esc(label)}</title>${content}</svg>`;}
  const line = (x1,y1,x2,y2,color,width=1,dash='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"${dash?` stroke-dasharray="${dash}"`:''}/>`;
  const text = (x,y,s,c,size=10,anchor='start',weight=400) => `<text x="${x}" y="${y}" fill="${c}" font-size="${Math.max(12,size)}" text-anchor="${anchor}" font-weight="${weight}">${esc(s)}</text>`;
  function tipAttrs(t){return `data-tip="${esc(t)}" tabindex="0" aria-label="${esc(t.replaceAll('|',', '))}"`;}
  function dot(x,y,color,tip,r=4,extra=''){return `<circle class="chart-point" cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="${colors().surface}" stroke-width="2" ${tipAttrs(tip)} ${extra}/>`;}
  function axes(w,h,p,xTicks,yTicks,xFn,yFn,xLabel,yLabel){const c=colors();let s='';for(const y of yTicks){const yy=yFn(y);s+=line(p.l,yy,w-p.r,yy,c.grid,1,y===0?'':'3 4')+text(p.l-9,yy+3.5,Number.isInteger(y)?y:y.toFixed(1),c.muted,9,'end');}for(const [x,label]of xTicks){const xx=xFn(x);s+=text(xx,h-p.b+20,label,c.muted,9,'middle');}s+=text(p.l,13,yLabel,c.muted,9)+text(w-p.r,h-3,xLabel,c.muted,9,'end');return s;}
  const W = id => Math.max(({ 'continual-chart':560, 'results-chart':640, 'ablation-chart':450, 'latency-chart':440 })[id] || 320, Math.round($('#'+id).clientWidth || 700));
  let toastTimer;
  function toast(msg){const e=$('#toast');e.textContent=msg;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),2400);}

  const continualColors = () => {const c=colors();return{[names.full]:c.teal,[names.lora]:c.teal,[names.jev]:c.teal,[names.mlp]:c.blue,[names.lin]:c.amber,[names.latent]:c.violet,[names.embed]:c.gray};};
  const seriesStyle = name => ({[names.full]:{dash:'',shape:'circle'},[names.lora]:{dash:'8 5',shape:'square'},[names.jev]:{dash:'2 4',shape:'diamond'},[names.mlp]:{dash:'7 4',shape:'square'},[names.lin]:{dash:'2 5',shape:'triangle'},[names.latent]:{dash:'10 4 2 4',shape:'diamond'},[names.embed]:{dash:'4 4',shape:'circle'}}[name]);
  function marker(shape,x,y,color,tip,r=5,extra=''){
    if(shape==='circle')return dot(x,y,color,tip,r,extra);
    const path=shape==='square'?`M${x-r},${y-r}h${2*r}v${2*r}h${-2*r}Z`:shape==='triangle'?`M${x},${y-r-1}l${r+1},${2*r+1}h${-2*r-2}Z`:`M${x},${y-r-1}l${r+1},${r+1}-${r+1},${r+1}-${r+1}-${r+1}Z`;
    return `<path class="chart-point" d="${path}" fill="${color}" stroke="${colors().surface}" stroke-width="2" ${tipAttrs(tip)} ${extra}/>`;
  }
  function renderContinual(){
    const c=colors(),w=W('continual-chart'),h=360,p={l:58,r:40,t:40,b:56};
    const indices=[[0,2,5,9],[1,3,6,10],[null,4,7,11],[null,null,8,12],[null,null,null,13]][state.task];
    const first=indices.findIndex(i=>i!==null), palette=continualColors();
    const series=D.continual.rows.filter(r=>selectedContinual.has(r.method)).map(r=>({name:r.method,points:indices.map(i=>i==null?null:r.values[i]),color:palette[r.method]}));
    for(const s of series)if(state.continualMode==='change'){const base=s.points[first];s.points=s.points.map(v=>v==null?null:Math.round((v-base)*100)/100);}
    const vals=series.flatMap(s=>s.points.filter(v=>v!==null));
    let lo,hi,step;
    if(state.continualMode==='change'){lo=Math.floor(Math.min(-1,...vals)/2)*2;hi=Math.ceil(Math.max(1,...vals)/2)*2;step=(hi-lo)>20?10:(hi-lo)>10?5:2;}
    else{lo=Math.max(0,Math.floor((Math.min(...vals)-3)/10)*10);hi=Math.min(100,Math.ceil((Math.max(...vals)+3)/10)*10);step=10;}
    if(hi===lo)hi=lo+10;
    const x=i=>p.l+i*(w-p.l-p.r)/3,y=v=>h-p.b-(v-lo)/(hi-lo)*(h-p.b-p.t),yt=[];
    for(let v=lo;v<=hi;v+=step)yt.push(v);
    let content=axes(w,h,p,[0,1,2,3].map(i=>[i,'S'+(i+1)]),yt,x,y,T('Training stage','训练阶段'),state.continualMode==='change'?T('Change (percentage points)','变化（百分点）'):T('Accuracy (%)','准确率（%）'));
    for(let i=1;i<4;i++)content+=line(x(i),p.t,x(i),h-p.b,c.grid,1,'2 5');
    for(const s of series){const pts=s.points.map((v,i)=>v==null?null:[x(i),y(v)]).filter(Boolean);content+=`<polyline points="${pts.map(z=>z.join(',')).join(' ')}" stroke="${s.color}" fill="none" stroke-width="${s.name===names.full?3:2}" stroke-dasharray="${seriesStyle(s.name).dash}" stroke-linejoin="round" stroke-linecap="round"/>`;s.points.forEach((v,i)=>{if(v!==null)content+=marker(seriesStyle(s.name).shape,x(i),y(v),s.color,`${shortName(s.name)}|S${i+1} · ${$('#continual-task').selectedOptions[0].text}|${fmt(v)}${state.continualMode==='change'?' pp':'%'}`,s.name===names.full?5:4);});}
    $('#continual-chart').innerHTML=svg(w,h,content,T('Task retention over four training stages','四个训练阶段的任务表现'));
    $('#continual-legend').innerHTML=Object.entries(names).filter(([k])=>k!=='embed').map(([,n])=>`<button data-continual-method="${esc(n)}" class="${selectedContinual.has(n)?'':'inactive'}" aria-pressed="${selectedContinual.has(n)}"><i class="series-key ${seriesStyle(n).dash.startsWith('2')?'is-dotted':seriesStyle(n).dash?'is-dashed':''}" style="--series-color:${palette[n]}"></i>${esc(shortName(n))}</button>`).join('');
  }
  function renderPool(){
    const c=colors(),w=W('pool-chart'),h=350,p={l:52,r:24,t:38,b:54},rows=D.pool.rows.filter(r=>r.method.includes('(M')),m=state.poolMetric;
    const x=i=>p.l+(i+.5)*(w-p.l-p.r)/3,y=v=>h-p.b-v/100*(h-p.b-p.t);
    let s=axes(w,h,p,rows.map((r,i)=>[i,r.method.match(/M\d+/)[0]]),[0,25,50,75,100],x,y,T('Expert pool','专家池'),T('Score (%)','得分（%）'));
    const bw=Math.min(65,(w-p.l-p.r)/5.5);
    rows.forEach((r,i)=>{const v=r.values[m],tip=`${r.method}|${D.pool.columns[m]}: ${fmt(v,1)}%`;s+=`<rect class="chart-point" x="${x(i)-bw/2}" y="${y(v)}" width="${bw}" height="${h-p.b-y(v)}" rx="4" fill="${i===2?c.teal:c['soft-blue']}" ${tipAttrs(tip)}/>`+text(x(i),y(v)-9,fmt(v,1),i===2?c.teal:c.ink,12,'middle',600);});
    const ref=D.pool.rows.find(r=>r.method==='Qwen3.5-9B (T)').values[m];s+=line(p.l,y(ref),w-p.r,y(ref),c.gray,1,'4 4')+text(w-p.r-3,y(ref)-5,'9B (T) · '+fmt(ref,1),c.muted,8,'end');
    $('#pool-chart').innerHTML=svg(w,h,s,T('Performance as the expert pool grows','扩大专家池后的表现'));
  }
  function renderExploration(){
    const c=colors(),w=W('exploration-chart'),h=250,p={l:44,r:24,t:38,b:54},rows=D.exploration.rows,at=rows[state.explore];
    const x=v=>p.l+(v-1)/89*(w-p.l-p.r),y=v=>h-p.b-(v-70)/11*(h-p.b-p.t);
    let s=axes(w,h,p,[[1,'1'],[20,'20'],[50,'50'],[90,'90']],[70,73,76,79,81],x,y,T('Exploration (%)','探索比例（%）'),T('Held-out score (%)','留出集得分（%）'));
    const xv=rows.map(r=>parseFloat(r.method)),pts=rows.map((r,i)=>[x(xv[i]),y(r.values[5])]);
    s+=`<polyline points="${pts.map(z=>z.join(',')).join(' ')}" fill="none" stroke="${c.teal}" stroke-width="2.4" stroke-linejoin="round"/>`;
    s+=line(x(xv[state.explore]),p.t,x(xv[state.explore]),h-p.b,c.teal,1,'3 4');
    rows.forEach((r,i)=>{s+=dot(x(xv[i]),y(r.values[5]),c.teal,`${xv[i]}% ${T('exploration','探索比例')}|${T('Held-out accuracy','留出集准确率')}: ${fmt(r.values[5],1)}%`,i===state.explore?6:3.5);});
    const selX=x(xv[state.explore]),selY=y(at.values[5]);s+=text(Math.min(w-p.r-20,Math.max(p.l+20,selX)),selY-13,fmt(at.values[5],1)+'%',c.teal,12,selX>w-65?'end':'middle',600);
    $('#exploration-chart').innerHTML=svg(w,h,s,T('Held-out accuracy by exploration budget','不同探索预算的留出集准确率'));
    $('#exploration-value').textContent=xv[state.explore]+'%';
    $('#exploration-slider').setAttribute('aria-valuetext',`${xv[state.explore]}% exploration, ${at.values[5]}% held-out score`);
    $('#exploration-note').textContent=T(`Fixed 10% held-out set · 500 updates. At ${xv[state.explore]}% exploration: ${fmt(at.values[5],1)}% held-out accuracy; ${fmt(at.values[4],1)}% on the separate “All” subset.`,`固定 10% 留出集 · 500 次更新。探索 ${xv[state.explore]}% 时：留出集 ${fmt(at.values[5],1)}%；独立标注的“All”子集 ${fmt(at.values[4],1)}%。`);
  }

  function suiteData(){return D[state.suite];}
  function filteredRows(includePartial=false){const s=suiteData();return s.rows.filter(r=>(includePartial||r.values.at(-2)!==null)&&(state.group==='all'||group(r)===state.group)&&r.method.toLowerCase().includes(state.query.toLowerCase()));}
  function resultName(r){if(r.ours){const n= r.method.includes('JevAny')?'JevAny':'StartLux';return `AdaptRouter · ${n}${r.method.includes('LoRA')?' LoRA':''}`;}return r.method;}
  function renderResults(){
    const c=colors(),s=suiteData(),api=state.suite==='api',avg=s.columns.length-2;
    const ours=s.rows.find(r=>r.ours&&r.method.includes('StartLux')&&r.method.includes('Full FT'));
    $('#result-summary').innerHTML=api?`<div><span class="number">71.31<small>%</small></span><p>${T('AdaptRouter · weighted average','AdaptRouter · 加权平均')}</p></div><div><span class="number">$120.46</span><p>${T('List-price inference comparison cost','公开单价折算的推理比较成本')}</p></div><div><span class="number">+0.78<small> pp</small></span><p>${T('vs. single-choice Router-R1 (PPO)','相对单次选择 Router-R1（PPO）')}</p></div>`:`<div><span class="number">65.08<small>%</small></span><p>${T('AdaptRouter · full finetuning','AdaptRouter · 全参数微调')}</p></div><div><span class="number">12.56<small>%</small></span><p>${T('Cost relative to Qwen3.5-9B (T)','相对 Qwen3.5-9B（T）的成本')}</p></div><div><span class="number">+20.99<small> pp</small></span><p>${T('vs. released StartLux 0.8B','相对原始 StartLux 0.8B')}</p></div>`;
    const w=W('results-chart'),h=400,p={l:58,r:40,t:42,b:58};
    const all=s.rows.filter(r=>r.values[avg]!==null),rows=filteredRows(),maxX=Math.max(...all.map(r=>r.values.at(-1)))*1.25,minX=state.log?Math.min(...all.map(r=>r.values.at(-1)))*.75:0;
    const x=v=>p.l+(state.log?(Math.log(v)-Math.log(minX))/(Math.log(maxX)-Math.log(minX)):(v-minX)/(maxX-minX))*(w-p.l-p.r);
    const allY=all.map(r=>r.values[state.metric]).filter(v=>v!==null),minY=Math.max(0,Math.floor((Math.min(...allY)-5)/10)*10),maxY=Math.min(100,Math.ceil((Math.max(...allY)+5)/10)*10),y=v=>h-p.b-(v-minY)/(maxY-minY||10)*(h-p.b-p.t);
    let xt;
    if(state.log)xt=(api?[75,150,300,600,1200,2400]:[5,10,20,50,100]).filter(v=>v>=minX&&v<=maxX).map(v=>[v,api?'$'+v:v+'%']);
    else{const step=api?500:25;xt=[];for(let v=0;v<=maxX;v+=step)xt.push([v,api?'$'+v:v+'%']);}
    const yt=[];for(let v=minY;v<=maxY;v+=maxY-minY>60?20:10)yt.push(v);
    let content=axes(w,h,p,xt,yt,x,y,api?T('Comparison cost (USD) →','比较成本（美元）→'):T('Relative cost (%) →','相对成本（%）→'),`${s.columns[state.metric]} (%) ↑`);
    if(ours.values[state.metric]!=null){content+=line(x(ours.values.at(-1)),p.t,x(ours.values.at(-1)),h-p.b,c.teal,1,'3 5');}
    const plotted=[...rows].sort((a,b)=>Number(a.ours)-Number(b.ours));
    for(const r of plotted){const val=r.values[state.metric];if(val===null)continue;const xx=x(r.values.at(-1)),yy=y(val),color=groupColor(r,c),tip=`${resultName(r)}|${s.columns[state.metric]}: ${fmt(val)}%|${api?'USD $':'Relative cost: '}${fmt(r.values.at(-1))}${api?'':'%'}`,extra=`data-method="${esc(r.method)}"`;
      if(r.ours)content+=`<path class="chart-point" d="M${xx},${yy-7}l7,7-7,7-7-7Z" fill="${color}" stroke="${c.surface}" stroke-width="2" ${tipAttrs(tip)} ${extra}/>`;
      else content+=marker(({direct:'circle',released:'square',feedback:'triangle'})[group(r)],xx,yy,color,tip,state.highlight===r.method?7:5,extra);
      if(state.highlight===r.method)content+=`<circle cx="${xx}" cy="${yy}" r="11" fill="none" stroke="${color}" stroke-width="1.4"/>`;
      let label='',dx=9,dy=-9,anchor='start';
      if(r.method===ours.method){label='AdaptRouter';dy=-16;dx=2;}
      else if(api&&r.method==='Router-R1 (PPO)'){label='Router-R1';dy=-9;}
      else if(api&&r.method==='Gemini 4 Argon'){label='Gemini 4';dy=18;}
      else if(api&&r.method==='GPT-6 Astra (low)'){label='Astra (low)';dx=-9;anchor='end';dy=-10;}
      else if(api&&r.method==='GPT-6.1 Sol (low)'&&w>500){label='Sol (low)';dy=-10;}
      else if(!api&&r.method==='Qwen3.5-9B (thinking)'){label='9B (T)';dx=-9;anchor='end';dy=-12;}
      else if(!api&&r.method==='StartLux 0.8B (Original)'){label='StartLux (Original)';dy=-10;dx=9;}
      else if(state.highlight===r.method){label=resultName(r);dx=xx>w*.65?-10:9;anchor=xx>w*.65?'end':'start';dy=18;}
      if(label){if(xx> w-100&&anchor==='start'){anchor='end';dx=-9;}content+=text(xx+dx,Math.max(p.t-9,yy+dy),label,r.ours?c.teal:c.muted,w<500?9:10,anchor,r.ours?700:500);}
    }
    if(!rows.length)content+=text(w/2,h/2,T('No methods match this filter','没有符合筛选条件的方法'),c.muted,12,'middle');
    $('#results-chart').innerHTML=svg(w,h,content,T('Quality versus comparison cost','质量与比较成本'));
    $('#results-legend').innerHTML=['ours','direct','released','feedback'].map(g=>`<span><i class="key-${g}" style="background:${({ours:c.teal,direct:c.gray,released:c.blue,feedback:c.amber})[g]}"></i>${groupName(g)}</span>`).join('');
    const sortIdx=state.sort==='cost'?s.columns.length-1:state.metric;
    rows.sort((a,b)=>{const av=a.values[sortIdx],bv=b.values[sortIdx];if(av==null)return 1;if(bv==null)return -1;return state.descending?bv-av:av-bv;});
    const sortMark=key=>state.sort===key?(state.descending?' ↓':' ↑'):' ↕';
    $('#results-table').innerHTML=`<table><thead><tr><th>${T('Method','方法')}</th><th><button data-sort="score">${esc(s.columns[state.metric])}${sortMark('score')}</button></th><th><button data-sort="cost">${api?'Cost (USD)':'Cost (%)'}${sortMark('cost')}</button></th><th>${T('Category','类别')}</th></tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr class="${r.ours?'ours ':''}${state.highlight===r.method?'highlighted':''}"><td><span class="rank">${String(i+1).padStart(2,'0')}</span>${esc(resultName(r))}${r.ours?'<span class="method-badge">OURS</span>':''}</td><td><strong>${fmt(r.values[state.metric])}</strong></td><td>${api?'$':''}${fmt(r.values.at(-1))}${api?'':'%'}</td><td class="method-group">${groupName(group(r))}</td></tr>`).join(''):`<tr><td class="empty-table" colspan="4">${T('No matching methods. Try another name or category.','未找到对应方法，请修改名称或类别。')}</td></tr>`}</tbody></table>`;
    $('#result-cost-note').textContent=api?T('API suite: 10,363 questions. Costs are list-price comparison estimates, excluding training, judges and local routing. Click a plot point to highlight a method.','API 基准：10,363 道题。成本为公开单价折算的比较值，不含训练、裁判与本地路由。点击散点可定位方法。'):T('Open-weight suite: 15 benchmarks. Cost is a parameter-weighted token proxy relative to Qwen3.5-9B (thinking), not dollars or wall-clock time.','开源基准：15 个任务。成本为相对 Qwen3.5-9B 思考模式的参数量加权 token 代理，不是美元或墙钟耗时。');
    $('#result-extra-note').textContent=T('Scores reproduce table precision. Neither these point estimates nor differences establish statistical significance.','数值保留原表精度；这些点估计及差值本身不构成统计显著性证据。');
    $('#download-current').href=`data/${state.suite}.csv`;
    const matrixRows=state.includePartial?s.rows:s.rows.filter(r=>r.values[avg]!==null);
    $('#results-full-table').innerHTML=fullTable(s.columns,matrixRows);
  }
  function fullTable(columns,rows){return `<table><thead><tr><th>${T('Method','方法')}</th>${columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr class="${r.ours?'ours':''}"><td>${esc(shortName(r.method))}</td>${r.values.map(v=>`<td>${fmt(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
  function initMetric(){const s=suiteData();$('#result-metric').innerHTML=s.columns.slice(0,-1).map((col,i)=>`<option value="${i}">${i===s.columns.length-2?T('Weighted average','加权平均'):esc(col)}</option>`).join('');$('#result-metric').value=state.metric;}

  function renderSelection(){const c=colors(),palette=[c.gray,c.teal,c.amber,c.blue,c.violet],vals=D.selection[state.selection];$('#selection-chart').innerHTML=D.selection.experts.map((n,i)=>`<div class="selection-row"><span class="name">${esc(n)}</span><div class="bar-track"><div class="bar" style="width:${vals[i]}%;background:${palette[i]}"></div></div><span class="value">${fmt(vals[i])}%</span></div>`).join('');}
  function renderAblation(){const c=colors(),w=W('ablation-chart'),h=320,p={l:178,r:60,t:35,b:48},x=v=>p.l+(v-68.5)/2*(w-p.l-p.r);let s='';const labs=[T('Full model','完整模型'),T('w/o quality-first','无质量优先优势'),T('w/o small-expert term','无小专家项'),T('w/o reasoning-gain','无推理增益项'),T('w/o visual input','无视觉输入')];[69,69.5,70,70.5].forEach(v=>{s+=line(x(v),p.t,x(v),h-p.b,c.grid,1,'3 4')+text(x(v),h-p.b+18,v.toFixed(1),c.muted,9,'middle');});D.ablation.rows.forEach((r,i)=>{const yy=p.t+12+i*46,v=r.values[4];s+=text(p.l-12,yy+4,labs[i],i===0?c.teal:c.muted,w<400?9:10,'end',i===0?600:400)+`<rect class="chart-point" x="${p.l}" y="${yy-8}" width="${Math.max(0,x(v)-p.l)}" height="17" rx="3" fill="${i===0?c.teal:c['soft-blue']}" ${tipAttrs(`${labs[i]}|${T('All four tasks','四任务得分')}: ${fmt(v)}%|${T('Small-expert share','小专家选择占比')}: ${fmt(r.values[5])}%`)}/>`+text(x(v)+7,yy+4,fmt(v),c.ink,10);});s+=text(w-p.r,h-5,T('Accuracy (%) · axis starts at 68.5','准确率（%）· 轴起点为 68.5'),c.muted,8,'end');$('#ablation-chart').innerHTML=svg(w,h,s,T('Four-task ablation results','四任务消融结果'));}
  function renderLatency(){const c=colors(),w=W('latency-chart'),h=320,p={l:144,r:55,t:35,b:48},max=9.5,x=v=>p.l+v/max*(w-p.l-p.r);let s='';[0,2,4,6,8].forEach(v=>{s+=line(x(v),p.t,x(v),h-p.b,c.grid,1,'3 4')+text(x(v),h-p.b+18,v,c.muted,9,'middle');});D.latency.forEach((r,i)=>{const yy=p.t+20+i*52,v=r[state.latency],width=x(v[0])-p.l;s+=text(p.l-10,yy+4,r.method.replace('Full FT','FT'),c.muted,w<400?8:9,'end');s+=`<rect class="chart-point" x="${p.l}" y="${yy-8}" width="${width}" height="17" rx="2" fill="${c.teal}" ${tipAttrs(`${r.method}|${T('Routing','路由')}: ${fmt(v[0])} s`)}/><rect class="chart-point" x="${x(v[0])+2}" y="${yy-8}" width="${x(v[1])-p.l}" height="17" rx="2" fill="${c['soft-blue']}" ${tipAttrs(`${r.method}|${T('Expert execution','专家执行')}: ${fmt(v[1])} GPU s`)}/>`+text(x(v[0])+x(v[1])-p.l+8,yy+4,fmt(v[0]+v[1]),c.muted,9);});s+=text(w-p.r,h-5,T('Reported seconds / question','报告的每题秒数'),c.muted,9,'end');$('#latency-chart').innerHTML=svg(w,h,s,T('Routing and expert execution timing','路由与专家执行耗时'));}
  function renderScale(){const rows=D.scale.rows.map(r=>({...r,method:(r.group.includes('StartLux')?'StartLux':'JevAny')+' '+r.method,values:[r.values[4],r.values[5],r.values[6],r.values[7]]}));$('#scale-table').innerHTML=fullTable(['All (%)','Mean (ms)','p95 (ms)','Order (%)'],rows);}
  function renderAll(){renderContinual();renderPool();renderExploration();renderResults();renderSelection();renderAblation();renderLatency();renderScale();$('#continual-full-table').innerHTML=fullTable(D.continual.columns,D.continual.rows);}

  function setLanguage(){
    document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';
    $$('[data-i18n]').forEach(e=>{e.innerHTML=state.lang==='zh'?(zh[e.dataset.i18n]??english.get(e.dataset.i18n)):english.get(e.dataset.i18n);});
    $('#lang-toggle').textContent=state.lang==='zh'?'EN':'中文';$('#lang-toggle').setAttribute('aria-label',state.lang==='zh'?'Switch to English':'切换到中文');
    $('#method-search').placeholder=T('Find a method…','搜索方法…');
    const g=$('#result-group');const labs={all:T('All methods','全部方法'),ours:'AdaptRouter',direct:T('Direct models','直接模型'),released:T('Released / prompted','已发布 / 提示路由'),feedback:T('Feedback-trained','反馈训练')};[...g.options].forEach(o=>o.textContent=labs[o.value]);
    $('#pool-metric').options[0].textContent=T('All four tasks','全部四项任务');
    $('#latency-suite').options[0].textContent=T('Main suite','主实验');$('#latency-suite').options[1].textContent=T('Continual · final stage','持续学习 · 最后阶段');
    initMetric();renderAll();
  }

  $('#lang-toggle').addEventListener('click',()=>{state.lang=state.lang==='en'?'zh':'en';try{localStorage.setItem('ar-lang',state.lang);}catch{}setLanguage();});
  $('#theme-toggle').addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';try{localStorage.setItem('ar-theme',dark?'dark':'light');}catch{}renderAll();});
  $('#continual-task').addEventListener('change',e=>{state.task=+e.target.value;renderContinual();});
  $('#continual-mode').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(!b)return;state.continualMode=b.dataset.mode;$$('#continual-mode button').forEach(x=>x.classList.toggle('active',x===b));renderContinual();});
  $('#continual-legend').addEventListener('click',e=>{const b=e.target.closest('[data-continual-method]');if(!b)return;const n=b.dataset.continualMethod;if(selectedContinual.has(n)){if(selectedContinual.size===1)return toast(T('Keep at least one method visible.','至少保留一种可见方法。'));selectedContinual.delete(n);}else selectedContinual.add(n);renderContinual();});
  $('#pool-metric').addEventListener('change',e=>{state.poolMetric=+e.target.value;renderPool();});
  $('#exploration-slider').addEventListener('input',e=>{state.explore=+e.target.value;renderExploration();});
  $$('.result-tabs button').forEach(b=>b.addEventListener('click',()=>{state.suite=b.dataset.suite;state.metric=D[state.suite].columns.length-2;state.highlight='';state.sort='score';state.descending=true;$$('.result-tabs button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b));});initMetric();renderResults();}));
  $('#result-metric').addEventListener('change',e=>{state.metric=+e.target.value;state.sort='score';state.descending=true;renderResults();});
  $('#result-group').addEventListener('change',e=>{state.group=e.target.value;renderResults();});
  $('#method-search').addEventListener('input',e=>{state.query=e.target.value;renderResults();});
  $('#log-scale').addEventListener('change',e=>{state.log=e.target.checked;renderResults();});
  $('#include-partial').addEventListener('change',e=>{state.includePartial=e.target.checked;renderResults();});
  $('#results-table').addEventListener('click',e=>{const b=e.target.closest('[data-sort]');if(!b)return;const k=b.dataset.sort;if(state.sort===k)state.descending=!state.descending;else{state.sort=k;state.descending=k!=='cost';}renderResults();});
  function selectPoint(e){const el=e.target.closest('[data-method]');if(el){state.highlight=state.highlight===el.dataset.method?'':el.dataset.method;renderResults();$('#chart-tooltip').hidden=true;}}
  $('#results-chart').addEventListener('click',selectPoint);$('#results-chart').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectPoint(e);}});
  $('#selection-router').addEventListener('change',e=>{state.selection=e.target.value;renderSelection();});
  $('#latency-suite').addEventListener('change',e=>{state.latency=e.target.value;renderLatency();});

  const tooltip=$('#chart-tooltip');
  function showTip(el,x,y){const parts=el.dataset.tip.split('|');tooltip.innerHTML=`<b>${esc(parts[0])}</b>${parts.slice(1).map(esc).join('<br>')}`;tooltip.hidden=false;const box=tooltip.getBoundingClientRect();tooltip.style.left=Math.max(8,Math.min(window.innerWidth-box.width-8,x+15))+'px';tooltip.style.top=Math.max(8,Math.min(window.innerHeight-box.height-8,y+15))+'px';}
  document.addEventListener('pointerover',e=>{const p=e.target.closest?.('[data-tip]');if(p)showTip(p,e.clientX,e.clientY);});
  document.addEventListener('pointermove',e=>{const p=e.target.closest?.('[data-tip]');if(p)showTip(p,e.clientX,e.clientY);});
  document.addEventListener('pointerout',e=>{if(e.target.closest?.('[data-tip]'))tooltip.hidden=true;});
  document.addEventListener('focusin',e=>{const p=e.target.closest?.('[data-tip]');if(p){const b=p.getBoundingClientRect();showTip(p,b.x,b.y);}});
  document.addEventListener('focusout',()=>tooltip.hidden=true);window.addEventListener('scroll',()=>tooltip.hidden=true,{passive:true});
  document.addEventListener('click',e=>{const b=e.target.closest('[data-download-chart]');if(!b)return;const source=$('#'+b.dataset.downloadChart+' svg');if(!source)return;const clone=source.cloneNode(true),vb=clone.viewBox.baseVal;clone.setAttribute('width',vb.width);clone.setAttribute('height',vb.height);const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');rect.setAttribute('width','100%');rect.setAttribute('height','100%');rect.setAttribute('fill',colors().surface);clone.insertBefore(rect,clone.firstChild);clone.querySelectorAll('[data-tip]').forEach(n=>{const t=document.createElementNS('http://www.w3.org/2000/svg','title');t.textContent=n.dataset.tip.replaceAll('|','; ');n.appendChild(t);n.removeAttribute('data-tip');n.removeAttribute('tabindex');});const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`adaptrouter-${b.dataset.downloadChart}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);});
  $('#copy-citation').addEventListener('click',async()=>{const s=$('#citation-text').textContent;try{if(navigator.clipboard)await navigator.clipboard.writeText(s);else{const t=document.createElement('textarea');t.value=s;document.body.append(t);t.select();document.execCommand('copy');t.remove();}$('#copy-status').textContent=T('Copied','已复制');setTimeout(()=>$('#copy-status').textContent='',2200);}catch{toast(T('Select the reference text to copy it.','请选中参考信息文本进行复制。'));}});
  let resized;window.addEventListener('resize',()=>{clearTimeout(resized);resized=setTimeout(renderAll,120);});
  setLanguage();
})();
