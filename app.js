/* ===== Helpers ===== */
const $ = s => document.querySelector(s), H = document.documentElement;
const I = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6 2.4-.5 4.9-2 5.9-3"/>',
  drop:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/>',
  menu:'<path d="M4 8h16M4 16h10"/>', back:'<path d="m12 19-7-7 7-7M19 12H5"/>', chev:'<path d="m9 18 6-6-6-6"/>',
  check:'<path d="M20 6 9 17l-5-5"/>', search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>', clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>',
  trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>', shield:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/>',
  wave:'<path d="M2 8c2.5-2 3.5 2 6 0s3.5 2 6 0 3.5 2 8 0M2 15c2.5-2 3.5 2 6 0s3.5 2 6 0 3.5 2 8 0"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>'
};
const ic = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;

/* Frascos desenhados em SVG: d=conta-gotas, p=pump, j=pote, t=tubo */
const B = (t, c, w = 40) => {
  const jar = t === 'j', vb = jar ? '0 28 40 56' : '0 0 40 84';
  const s = {
    d:`<rect x="13" width="14" height="22" rx="7" fill="#fff"/><rect x="9" y="20" width="22" height="8" rx="2" fill="#c98868"/><rect y="34" width="40" height="50" rx="8" fill="${c}"/><rect x="5" y="42" width="4" height="34" rx="2" fill="#fff" opacity=".55"/>`,
    p:`<rect x="8" width="24" height="4" rx="2" fill="#fff"/><rect x="16" y="3" width="8" height="11" fill="#fff"/><rect x="11" y="13" width="18" height="6" fill="#c98868"/><rect y="19" width="40" height="65" rx="10" fill="${c}"/><rect x="5" y="28" width="4" height="44" rx="2" fill="#fff" opacity=".5"/>`,
    j:`<rect y="46" width="40" height="38" rx="9" fill="${c}"/><rect x="1" y="30" width="38" height="20" rx="6" fill="#a995dc"/><rect x="5" y="52" width="4" height="22" rx="2" fill="#fff" opacity=".5"/>`,
    t:`<rect x="6" y="6" width="28" height="68" rx="6" fill="${c}"/><rect x="8" y="70" width="24" height="13" rx="3" fill="#c98868"/><rect x="11" y="14" width="4" height="40" rx="2" fill="#fff" opacity=".6"/>`
  }[t];
  return `<svg width="${w}" viewBox="${vb}" style="filter:drop-shadow(0 3px 3px #8a5a6e40);display:block">${s}</svg>`;
};

/* ===== Dados ===== */
// [nome, categoria, descrição, tipo, cor clara, cor do frasco]
const P = [
  ['Gel de limpeza','LIMPEZA','Remove oleosidade e impurezas sem agredir a pele. Uso diário.','p','#ddeff5','#b7d9e8'],
  ['Água micelar','LIMPEZA','Tira sujeira e maquiagem em um passo. Ótima para a noite.','p','#f7e6f0','#e7c4dd'],
  ['Óleo de limpeza','LIMPEZA','Dissolve maquiagem e protetor na dupla limpeza noturna.','d','#fce6a8','#ebc26a'],
  ['Sérum Vitamina C','TRATAMENTO','Antioxidante que ilumina e uniformiza o tom. Use de manhã.','d','#fbdcc3','#f0a468'],
  ['Niacinamida 10%','TRATAMENTO','Controla a oleosidade, afina os poros e suaviza manchas.','d','#f6e5ec','#e0d3d8'],
  ['Retinol','TRATAMENTO','Renova a pele e suaviza linhas finas. Só à noite, aos poucos.','d','#e6daf6','#b69be0'],
  ['Ácido hialurônico','HIDRATAÇÃO','Hidrata em profundidade e deixa a pele preenchida e macia.','d','#dcebf8','#9cc7ea'],
  ['Hidratante facial','HIDRATAÇÃO','Repara a barreira da pele e sela a hidratação por mais tempo.','j','#f7dde8','#f0bfcf'],
  ['Gel-creme oil-free','HIDRATAÇÃO','Textura leve e sem óleo, ideal para pele oleosa ou mista.','j','#ddf1ef','#c4e5e2'],
  ['Protetor FPS 50','PROTEÇÃO','Passo essencial da manhã. Protege de manchas e envelhecimento.','t','#fce7d8','#f4e6e0'],
  ['Protetor com cor','PROTEÇÃO','Une proteção e cobertura leve, com acabamento natural.','t','#fae0cf','#edb899'],
  ['Protetor oil-free','PROTEÇÃO','Toque seco, sem brilho. Perfeito para pele oleosa e acneica.','t','#fdf1cb','#f6dc85']
];
const Q = [
  ['Qual é o seu tipo de pele?',[['Oleosa','Brilho e poros dilatados na zona T'],['Seca','Repuxa e descama com facilidade'],['Mista','Oleosa na testa e no nariz, normal nas bochechas'],['Normal','Equilibrada, sem oleosidade nem ressecamento']]],
  ['Como sua pele fica no fim do dia?',[['Brilhante e oleosa','Precisa lavar o rosto ou secar o brilho'],['Repuxando e áspera','Sensação de pele apertada'],['Oleosa só na zona T','Testa e nariz brilham, o resto fica bem'],['Confortável e equilibrada','Sem brilho nem repuxamento']]],
  ['Qual é a sua principal preocupação?',[['Acne e cravos','Espinhas, poros entupidos e marcas'],['Manchas e tom irregular','Melasma, manchas de sol e opacidade'],['Linhas finas e firmeza','Sinais de expressão e perda de viço'],['Ressecamento e opacidade','Pele áspera, sem luminosidade']]],
  ['Sua pele é sensível?',[['Muito sensível','Reage fácil, arde e fica vermelha'],['Um pouco','Às vezes irrita com produtos novos'],['Nada sensível','Tolera bem quase tudo'],['Não sei ainda','Nunca prestei atenção nisso']]],
  ['Você usa protetor solar todos os dias?',[['Sempre','Todos os dias, até dentro de casa'],['Às vezes','Só quando vou ao sol'],['Raramente','Apenas na praia ou na piscina'],['Nunca','Ainda não faz parte da minha rotina']]]
];
const ROT = [
  { t:'Rotina Glow<br>da Manhã', c:'Em dia', g:'linear-gradient(160deg,#e8c4e2,#f8cfc3 55%,#e3c7ee)', b:['#f4ae97','#f19ab4'],
    ti:[['drop','Limpar','Gel suave'],['spark','Tratar','Vitamina C'],['wave','Hidratar','Sela a água'],['shield','Proteger','FPS 50']],
    st:[[0,'Limpe o rosto com água morna'],[3,'Aplique 3 gotas e dê batidinhas'],[7,'Hidrate para selar a água na pele'],[9,'Finalize com protetor, sempre por último']],
    tip:'Aplique a vitamina C com toques leves e finalize com protetor solar.', tt:'Dica da manhã' },
  { t:'Renovação<br>da Noite', c:'Hoje às 21:30', g:'linear-gradient(160deg,#6e5aa8,#a283cb 55%,#e0a9cf)', b:['#b79be0','#8e6fd0'],
    ti:[['drop','Limpar','Óleo + gel'],['spark','Tratar','Retinol'],['wave','Hidratar','Ceramidas'],['moon','Reparar','Barreira']],
    st:[[2,'Óleo de limpeza tira maquiagem e protetor'],[5,'Retinol: comece 2x por semana'],[7,'Hidratante rico repara enquanto você dorme'],[1,'Água micelar se precisar de um retoque']],
    tip:'Comece com retinol 2x por semana e finalize com hidratante.', tt:'Dica da noite' }
];
const TK = [['Aplicar Sérum','Vitamina C',3],['Hidratar','Manhã / Noite',7],['Protetor FPS 50','Proteção diária',9]];
const S = { s:new Set([3,4,7,9]), nick:'Mari', ck:[1,1,0], sw:[1,1,0], dk:0 };

/* ===== Peças de interface ===== */
const bk = (to = 'back') => `<button class="ib g" data-go="${to}" aria-label="Voltar">${ic('back')}</button>`;
const card = (p, i) => `<div class="pc g${S.s.has(i) ? ' on' : ''}" data-a="sv" data-i="${i}"><div class="th" style="background:linear-gradient(135deg,${p[4]},${p[5]}88)">${B(p[3], p[5], p[3]==='j'?56:38)}</div><div><span class="tag">${p[1]}</span><b>${p[0]}</b><p>${p[2]}</p><span class="bt">${S.s.has(i) ? 'Salvo na rotina' : '+ Adicionar'}</span></div></div>`;
const tr = (t, sub, pi, r) => `<div class="g tr"><div class="th2" style="background:${P[pi][4]}">${B(P[pi][3], P[pi][5], P[pi][3]==='j'?34:16)}</div><div class="fx"><b>${t}</b><span class="mu">${sub}</span></div>${r}</div>`;
const ck = k => `<i class="ck${S.ck[k] ? ' on' : ''}" data-a="ck" data-i="${k}">${ic('check', 16)}</i>`;
const chips = (a, sel, m) => `<div class="chips">${a.map((x, i) => `<span class="chip g${sel.includes(i) ? ' sel' : ''}" data-a="${m ? 'mc' : 'ch'}">${x}</span>`).join('')}</div>`;
const row = (ico, t, go, r = '') => `<button class="li" data-go="${go}"><i class="ti">${ic(ico, 18)}</i><b class="fx">${t}</b>${r}<span class="mu">${ic('chev', 16)}</span></button>`;
const tabs = a => `<div class="seg g">${[['today','Hoje'],['up','Próximos'],['done','Concluídos']].map(([k,l]) => `<button class="${a === k ? 'on' : ''}" data-go="${k}">${l}</button>`).join('')}</div>`;
const grp = (d, f) => d.map(([h, r]) => `<h3 style="margin-top:4px">${h}</h3>${r.map(f).join('')}`).join('');
const avatar = s => `<span class="ib" style="width:${s}px;height:${s}px;background:linear-gradient(135deg,#f6b29a,#b7a0f0);color:#fff;font-size:${s*.4}px;font-weight:700">${S.nick[0]}</span>`;

/* ===== Telas ===== */
const R = n => {
  const d = ROT[n];
  return `<div class="hero" style="background:${d.g}">
    <div class="row">${bk()}<div class="seg g"><button class="${n ? '' : 'on'}" data-go="routine">Manhã</button><button class="${n ? 'on' : ''}" data-go="routinen">Noite</button></div><i style="width:44px"></i></div>
    <h1>${d.t}</h1><span class="chip g">● ${d.c}</span>
    <div class="shelf">${B('d', d.b[1], 46)}${B('p', d.b[0], 68)}${B('j', '#d9c7f0', 86)}</div>
  </div>
  <div class="c">
    <div class="g ov"><h3>Visão geral</h3><div class="tl">${d.ti.map(t => `<div><i>${ic(t[0], 18)}</i>${t[1]}<span>${t[2]}</span></div>`).join('')}</div></div>
    <div class="g pad c" style="gap:14px"><h3>Passo a passo</h3>${d.st.map((s, i) => `<div class="step"><span class="n">${i + 1}</span><div class="fx"><b>${P[s[0]][0]}</b><div class="mu">${s[1]}</div></div></div>`).join('')}</div>
    <div class="g pad"><h3>${d.tt}</h3><p class="mu" style="margin-top:4px">${d.tip}</p></div>
    <button class="cta" data-go="today">Registrar rotina</button>
  </div>`;
};
const T = k => `<div class="c"><h1 style="font-size:34px">Hoje</h1>${tabs(k)}${
  k === 'today' ? TK.map((t, i) => tr(t[0], t[1], t[2], ck(i))).join('') :
  k === 'up' ? grp([['Amanhã · 30 set',[[0,'Gel de limpeza','Limpeza suave','07:30'],[3,'Sérum Vitamina C','Tratamento','07:35'],[9,'Protetor FPS 50','Proteção diária','07:45']]],['Quinta · 1 out',[[5,'Retinol','Somente à noite','21:30'],[7,'Hidratante facial','Hidratação','21:40']]]], r => tr(r[1], r[2], r[0], `<span class="g pill">${r[3]}</span>`)) :
  `<div class="g row pad"><div><h3 style="font-size:20px">12 dias seguidos</h3><span class="mu">Continue assim, sua pele agradece.</span></div><div style="display:flex;gap:4px">${[1,1,1,1,1,1,0].map(x => `<i style="width:10px;height:10px;border-radius:50%;background:${x ? '#7db77f' : 'var(--gb)'}"></i>`).join('')}</div></div>` +
  grp([['Hoje · 29 set',[[3,'Aplicar Sérum','Concluído às 07:42'],[7,'Hidratar','Concluído às 07:48']]],['Ontem · 28 set',[[5,'Retinol','Concluído às 21:35'],[9,'Protetor FPS 50','Concluído às 07:50']]]], r => tr(r[1], r[2], r[0], `<i class="ck on">${ic('check', 16)}</i>`))
}</div>`;

const SC = {
  welcome: () => `<div class="c welcome"><div class="g shelf0">${B('d','#f19ab4',58)}${B('p','#f4ae97',76)}${B('j','#d9c7f0',96)}</div><h1 style="font-size:34px">Sua pele,<br>seu brilho</h1><p class="mu" style="font-size:14px">Monte sua rotina, acompanhe cada passo e descubra o glow que já é seu.</p><button class="cta" data-go="q0">Começar →</button><a class="lk" data-go="home">Já tenho conta</a></div>`,
  signup: () => `<div class="c"><div>${bk()}</div><div><h1 style="font-size:30px">Criar conta</h1><p class="mu" style="margin-top:4px">Últimos passos para personalizar sua rotina.</p></div>
    <div class="two"><div><label>Nome</label><input class="in g" placeholder="Maria Silva"></div><div><label>Apelido</label><input id="nk" class="in g" placeholder="Mari"></div></div>
    <div><label>E-mail</label><input class="in g" type="email" placeholder="maria@email.com"></div>
    <div><label>Telefone</label><input class="in g" type="tel" placeholder="(69) 99999-0000"></div>
    <div><label>Sexo</label>${chips(['Feminino','Masculino','Outro'], [0])}</div>
    <button class="cta" data-go="build">Criar conta →</button></div>`,
  build: () => `<div class="c" style="gap:10px"><div>${bk()}</div><h1 style="font-size:30px">Monte sua rotina</h1><p class="mu">Arraste os carrosséis e toque nos produtos que você usa ou quer usar.</p>${
    [['1 · Limpeza',0],['2 · Tratamento',3],['3 · Hidratação',6],['4 · Proteção',9]].map(([t, i]) => `<h3 style="margin-top:8px">${t}</h3><div class="car">${[0,1,2].map(k => card(P[i + k], i + k)).join('')}</div>`).join('')
  }<button class="cta" data-go="home">Salvar minha rotina</button></div>`,
  home: () => { const h = new Date().getHours(); return `<div class="c"><div class="row"><button class="ib g" data-go="menu" aria-label="Menu">${ic('menu')}</button><button class="ib g" data-go="notif" aria-label="Notificações">${ic('bell')}<i class="dot"></i></button></div>
    <div><h2>${h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'},<br><b>${S.nick}</b></h2><p class="mu" style="margin-top:6px">Cuide da sua pele e ela vai brilhar</p></div>
    <div class="g row pad" style="justify-content:flex-start;color:var(--mu);padding:14px 16px">${ic('search', 20)}<span style="font-size:14px">Buscar produtos...</span></div>
    <div class="row" style="margin-bottom:-8px"><h3>Minha Rotina</h3><a class="lk" data-go="build">+ Criar rotina</a></div>
    <div class="car">${[...S.s].sort((a, b) => a - b).map(i => card(P[i], i)).join('') || '<p class="mu">Nenhum produto ainda. Toque em "Criar rotina".</p>'}</div>
    <h3>Rotina de Hoje</h3><div class="g list">${row('drop','Rotina da manhã','routine','<span class="mu">Sérum + protetor</span>')}${row('moon','Rotina da noite','routinen','<span class="mu">Retinol</span>')}</div></div>`; },
  routine: () => R(0), routinen: () => R(1), today: () => T('today'), up: () => T('up'), done: () => T('done'),
  profile: () => `<div class="c"><h1 style="font-size:34px">Perfil</h1>
    <div class="g row pad" style="justify-content:flex-start;gap:16px">${avatar(76)}<div class="fx"><h3 style="font-size:20px">Maria Silva</h3><span class="mu">@${S.nick.toLowerCase()} · maria@email.com</span><div style="margin-top:8px"><span class="bt">Pele mista</span></div></div></div>
    <div class="two">${[['12','Dias seguidos'],['8','Produtos'],['2','Rotinas']].map(x => `<div class="g mid c stat"><b>${x[0]}</b><span class="mu" style="font-size:11px">${x[1]}</span></div>`).join('')}</div>
    <div class="g list">${row('spark','Criar minha rotina','build')}${row('drop','Minha pele','skin','<span class="mu">Mista</span>')}${row('clock','Lembretes','rem','<span class="mu">07:30 · 21:30</span>')}<div class="li" data-a="dark"><i class="ti">${ic('moon', 18)}</i><b class="fx">Modo escuro</b><span class="sw${S.dk ? ' on' : ''}"></span></div>${row('out','Sair','welcome')}</div></div>`,
  menu: () => `<div class="c"><div class="row"><h1 style="font-size:30px">Menu</h1><button class="ib g" data-go="back" aria-label="Fechar">${ic('x')}</button></div>
    <div class="g row pad" style="justify-content:flex-start;gap:14px">${avatar(52)}<div><b>Maria Silva</b><div class="mu">maria@email.com</div></div></div>
    <div class="g list">${row('user','Meu perfil','profile')}${row('drop','Minha pele','skin')}${row('clock','Lembretes','rem')}${row('bell','Notificações','notif')}${row('help','Ajuda e suporte','menu')}</div>
    <div class="g list">${row('out','Sair da conta','welcome')}${row('trash','Excluir conta','del')}</div></div>`,
  del: () => `<div class="c mid" style="min-height:100%;justify-content:center"><div class="g pad c mid" style="gap:12px;padding:28px 22px"><span class="ib" style="background:#ec8fb033;color:#e0587e;width:64px;height:64px">${ic('trash', 28)}</span><h1 style="font-size:24px">Excluir conta?</h1><p class="mu">Sua rotina, seu histórico e sua sequência de 12 dias serão apagados. Essa ação não pode ser desfeita.</p><button class="cta s" style="background:#e0587e;color:#fff" data-go="welcome">Excluir minha conta</button><button class="cta s g" data-go="back">Cancelar</button></div></div>`,
  notif: () => `<div class="c"><div class="row">${bk()}<a class="lk">Marcar como lidas</a></div><h1>Notificações</h1>${
    [['Hoje',[['clock','Hora da rotina da manhã','Sérum Vitamina C e protetor FPS 50 · 07:30',1],['spark','12 dias seguidos!','Sua pele agradece. Continue assim.',1]]],['Ontem',[['drop','Seu hidratante está acabando','Adicione um novo à sua rotina',0],['moon','Rotina da noite concluída','Retinol e hidratante · 21:35',0]]]]
    .map(([h, l]) => `<h3>${h}</h3>${l.map(x => `<div class="g row pad" style="justify-content:flex-start"><i class="ti">${ic(x[0], 18)}</i><div class="fx"><b style="font-size:14px">${x[1]}</b><div class="mu" style="font-size:12px">${x[2]}</div></div>${x[3] ? '<i style="width:9px;height:9px;border-radius:50%;background:#ec8fb0;flex:none"></i>' : ''}</div>`).join('')}`).join('')
  }</div>`,
  rem: () => `<div class="c"><div>${bk()}</div><h1>Lembretes</h1><div class="g list">${
    [['Rotina da manhã','07:30'],['Rotina da noite','21:30'],['Reaplicar protetor','13:00']].map((r, i) => `<div class="li" data-a="sw" data-i="${i}"><i class="ti">${ic('clock', 18)}</i><div class="fx"><b>${r[0]}</b><div class="mu">${r[1]}</div></div><span class="sw${S.sw[i] ? ' on' : ''}"></span></div>`).join('')
  }</div><h3>Dias da semana</h3>${chips(['D','S','T','Q','Q','S','S'], [1,2,3,4,5], 1)}<button class="cta" data-go="back">Salvar lembretes</button></div>`,
  skin: () => `<div class="c"><div>${bk()}</div><h1>Minha pele</h1>${
    [['Tipo de pele',['Oleosa','Seca','Mista','Normal'],[2],0],['Sensibilidade',['Muito','Um pouco','Nada'],[1],0],['Preocupações',['Acne','Manchas','Linhas finas','Ressecamento','Poros'],[1,3],1],['Protetor solar diário',['Sempre','Às vezes','Raramente','Nunca'],[1],0]]
    .map(([t, a, s, m]) => `<div><label>${t}</label>${chips(a, s, m)}</div>`).join('')
  }<button class="cta" data-go="back">Salvar alterações</button></div>`
};
Q.forEach((q, i) => SC['q' + i] = () => `<div class="c"><div class="row">${bk()}<div class="prog">${Q.map((_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('')}</div></div><span class="mu">Pergunta ${i + 1} de 5</span><h1 style="font-size:28px">${q[0]}</h1>${
  q[1].map(o => `<button class="op g" data-a="ch1"><i></i><span><b>${o[0]}</b><span class="mu" style="font-size:12px">${o[1]}</span></span></button>`).join('')
}<button class="cta" data-go="${i < 4 ? 'q' + (i + 1) : 'signup'}">Continuar →</button></div>`);

/* ===== Navegação ===== */
const NV = [['home','home','Início'],['routine','leaf','Rotina'],['today','drop','Hoje'],['profile','user','Perfil']];
const TAB = { home:'home', routine:'routine', routinen:'routine', today:'today', up:'today', done:'today', profile:'profile' };
let cur = '', hist = [];
function go(id) {
  if (cur === 'signup' && $('#nk') && $('#nk').value.trim()) S.nick = $('#nk').value.trim();
  if (id === 'back') id = hist.pop() || 'home';
  else if (cur && !TAB[id] && id !== 'welcome') hist.push(cur);
  if (id === 'welcome') hist = [];
  cur = id;
  const a = $('#app'); a.style.animation = 'none'; a.offsetWidth; a.style.animation = '';
  a.innerHTML = SC[id](); a.scrollTop = 0;
  $('#nv').innerHTML = TAB[id] ? NV.map(n => `<button class="nb${TAB[id] === n[0] ? ' on' : ''}" data-go="${n[0]}">${ic(n[1])}${n[2]}</button>`).join('') : '';
}
/* ===== Ações (toques) ===== */
const single = (t, sel) => { t.parentNode.querySelectorAll(sel).forEach(x => x.classList.remove('sel')); t.classList.add('sel'); };
const A = {
  sv: t => { const i = +t.dataset.i; S.s.has(i) ? S.s.delete(i) : S.s.add(i); t.classList.toggle('on'); t.querySelector('.bt').textContent = S.s.has(i) ? 'Salvo na rotina' : '+ Adicionar'; },
  ck: t => { const i = +t.dataset.i; S.ck[i] = !S.ck[i]; t.classList.toggle('on'); },
  sw: t => { const i = +t.dataset.i; S.sw[i] = !S.sw[i]; t.querySelector('.sw').classList.toggle('on'); },
  dark: t => { S.dk = !S.dk; H.dataset.t = S.dk ? 'd' : 'l'; t.querySelector('.sw').classList.toggle('on'); },
  ch: t => single(t, '.chip'), mc: t => t.classList.toggle('sel'), ch1: t => single(t, '.op')
};
/* Arrastar carrossel com o mouse */
let dn;
addEventListener('pointerdown', e => { const c = e.target.closest('.car'); if (c && e.pointerType === 'mouse') dn = { c, x:e.clientX, l:c.scrollLeft }; });
addEventListener('pointermove', e => { if (dn) { const d = e.clientX - dn.x; if (Math.abs(d) > 4) dn.m = 1; dn.c.scrollLeft = dn.l - d; } });
addEventListener('pointerup', () => setTimeout(() => dn = 0));
document.addEventListener('click', e => {
  if (dn && dn.m) return;
  const t = e.target.closest('[data-go],[data-a]'); if (!t) return;
  t.dataset.a ? A[t.dataset.a](t) : go(t.dataset.go);
});
go('welcome');
