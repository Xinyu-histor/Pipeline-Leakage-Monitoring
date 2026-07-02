const steps = [
  {
    title: "用水异常与立项",
    short: "异常区域",
    formula: "Q_in - Q_metered - Q_known ≈ Q_loss",
    criterion: "常年用水异常说明系统存在未解释水量，需进入管网勘测和分区分析。",
    summary: "从区域水量长期异常出发，建立漏失监测任务。此时还不是找漏点，而是把异常从经营数据转成可验证的工程问题。",
    actions: ["收集 DMA 或营业水量异常记录。", "确认进水口、计量表、压力和历史维修记录。", "确定优先监测区域和项目目标。"],
    physics: ["水量平衡来自质量守恒。", "压力高、管龄长、接口多的区域更易发生可检测漏失。", "异常数据只给出概率，不能直接等同于漏点。"],
    checks: ["异常是否持续而非短期用水波动。", "是否排除计量表误差和合法未计量用水。", "是否具备管网图和现场勘测条件。"]
  },
  {
    title: "管网勘测",
    short: "勘测",
    formula: "节点-边网络：V = 阀门井, E = 管段",
    criterion: "定位计算必须使用实际管道路径长度，而不是地图直线距离。",
    summary: "核对 CAD 图纸、阀门井、管径、材质、埋深和实景照片，形成可用于平台组态的真实管网基础。",
    actions: ["核对 CAD 图纸和现场阀门井。", "去除废弃、并行或无效井位。", "记录管径、材质、位置和照片。"],
    physics: ["管径决定流速和水力损失。", "材质影响声速和声衰减。", "几何路径误差会直接进入定位误差。"],
    checks: ["阀门井是否真实有效。", "管道连接关系是否闭合。", "支路、异径、阀门状态是否记录。"]
  },
  {
    title: "管网组态",
    short: "组态",
    formula: "连续性：ΣQ_in = ΣQ_out + ΔS",
    criterion: "平台中的每条管段都应有方向、长度、口径和材质属性。",
    summary: "把现场管网抽象为平台中的节点和边，并标出水流方向、管径和连接关系。",
    actions: ["在平台中连接阀门井和管段。", "标注水流方向与管径。", "把管网图、照片和台账统一。"],
    physics: ["质量守恒约束流量分配。", "管段属性决定压力损失。", "声传播路径依赖拓扑和边界。"],
    checks: ["是否存在断开的孤立节点。", "是否存在方向不明的关键管段。", "管径和材质是否缺失。"]
  },
  {
    title: "分区与布点",
    short: "分区布点",
    formula: "SNR = P_signal / P_noise",
    criterion: "布点目标是提高泄漏信号覆盖和信噪比，而不是平均撒点。",
    summary: "按照供水边界、异常区域、进水路数和重点管段划分 A/B/C 区，并设置滚动普查点与长期监测点。",
    actions: ["划分滚动普查区和长期监测区。", "选择阀门、管件和高负荷管段为关键点。", "规划设备轮换和长期点位。"],
    physics: ["泄漏声随距离和频率衰减。", "高频在柔性管中衰减更快。", "背景噪声决定最低可检测信号。"],
    checks: ["点位是否覆盖异常区。", "监测间距是否适应管材。", "是否避开明显强噪声点。"]
  },
  {
    title: "安装与调试",
    short: "安装",
    formula: "采样上限：f_max = f_s / 2",
    criterion: "传感器安装质量决定振动能量能否进入采集链路。",
    summary: "将 IL02 等设备磁吸安装在合适点位，进行 APP 配置、网络调试和采样任务下发。",
    actions: ["清理安装面并固定设备。", "配置采样周期、时间窗和上传任务。", "检查 4G/LTE Cat-1 上线率。"],
    physics: ["机械耦合差会降低有效振动输入。", "采样率决定最高可分析频率。", "网络传输不等于采样同步。"],
    checks: ["设备是否牢固、防水、防腐。", "音频是否完整上传。", "采样时间是否避开强干扰。"]
  },
  {
    title: "泄漏声源产生",
    short: "声源",
    formula: "Q_l = C_d A_l √(2ΔP/ρ)",
    criterion: "压力能转化为射流动能，湍流脉动激发宽频噪声和管壁振动。",
    summary: "当管壁破损或接口松动时，高压水通过小孔喷出，产生湍流、摩擦、冲击和结构振动。",
    actions: ["根据压力和疑似漏孔判断声源强度。", "对比夜间与白天噪声。", "记录压力变化与报警强度关系。"],
    physics: ["漏失量与漏孔面积成正比，与压差平方根相关。", "雷诺数高时射流更容易湍流化。", "湍流脉动是宽频泄漏噪声来源。"],
    checks: ["压力是否足以产生可检测声。", "报警是否随压力变化增强或减弱。", "是否存在非泄漏水流噪声。"]
  },
  {
    title: "采集与云端分析",
    short: "采集分析",
    formula: "FFT：X[k] = Σ x[n]e^{-j2πkn/N}",
    criterion: "持续泄漏通常在特定频带中稳定存在，短时车辆/施工噪声则时频特征不同。",
    summary: "设备采集声振数据并上传云端，平台通过波形、频谱、时频图和 AI 模型给出泄漏可信度。",
    actions: ["查看波形、RMS、频带能量和谱图。", "调用原始音频进行人工复核。", "将疑似漏点推送工单。"],
    physics: ["FFT 把时域信号分解为频率成分。", "STFT 显示频率随时间变化。", "AI 分类依赖特征与样本库。"],
    checks: ["频谱是否稳定。", "是否存在泵、车辆、施工等误报源。", "AI 结论是否经人工复核。"]
  },
  {
    title: "复验与相关定位",
    short: "复验定位",
    formula: "d_A = (L + vΔt) / 2",
    criterion: "互相关峰给出两路信号的到达时间差，结合有效声速估算漏点位置。",
    summary: "平台报警后，使用 IL01 双机相关定位或单机电子听漏，对高危点进行现场复验和精确定位。",
    actions: ["在管段两端布置传感器。", "同步采集并求互相关峰。", "在估计点附近用电子听漏确认。"],
    physics: ["Δt 来自同一泄漏声到达两传感器的时间差。", "有效声速取决于水体、管材和支路。", "声强随距离和介质衰减。"],
    checks: ["L 是否为真实管道路径长度。", "v 是否经过经验库或现场标定。", "相关峰是否单一清晰。"]
  },
  {
    title: "维修复原与长期监测",
    short: "修复监测",
    formula: "修复后：E_band 与 RMS 应回落至背景区间",
    criterion: "维修完成后必须用数据验证泄漏声源消失，而不是只依赖现场开挖观察。",
    summary: "现场开挖维修后，回看报警等级、频谱能量和长期趋势，确认修复有效并进入长期监测。",
    actions: ["开挖、维修、复原路面。", "复测音频和频谱。", "将修复点纳入长期监测计划。"],
    physics: ["泄漏声源消失后，目标频带能量应显著下降。", "压力恢复可能改变管网其他薄弱点状态。", "长期趋势可发现复发和新漏点。"],
    checks: ["修复前后是否同工况对比。", "是否排除临时停水导致的假下降。", "是否形成样本库和复盘记录。"]
  }
];

const materialProfiles = {
  steel: { name: "钢/铸铁", velocity: 1200, attenuation: 0.10, color: "#53657a" },
  ductile: { name: "球墨铸铁", velocity: 1050, attenuation: 0.13, color: "#5b6c7a" },
  pvc: { name: "PVC", velocity: 520, attenuation: 0.26, color: "#477aa2" },
  pe: { name: "PE", velocity: 380, attenuation: 0.34, color: "#3c8f76" }
};

const state = {
  step: 0,
  playing: true,
  material: "steel",
  pressure: 0.5,
  diameter: 3,
  length: 200,
  leakRatio: 0.38,
  noise: 35,
  t: 0,
  draggingLeak: false,
  dragGeometry: null
};

const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");
const stepList = document.getElementById("stepList");
const processTrack = document.getElementById("processTrack");
const controls = {
  pressure: document.getElementById("pressure"),
  diameter: document.getElementById("diameter"),
  length: document.getElementById("length"),
  leakRatio: document.getElementById("leakRatio"),
  noise: document.getElementById("noise")
};

function pipeMaterial() {
  return materialProfiles[state.material];
}

function calc() {
  const rho = 1000;
  const cd = 0.62;
  const pressurePa = state.pressure * 1_000_000;
  const diameterM = state.diameter / 1000;
  const area = Math.PI * diameterM * diameterM / 4;
  const leakActive = area > 0 && pressurePa > 0;
  const jetV = leakActive ? Math.sqrt(2 * pressurePa / rho) : 0;
  const flowM3s = cd * area * jetV;
  const flowLs = flowM3s * 1000;
  const profile = pipeMaterial();
  const leakPos = state.leakRatio * state.length;
  const dA = leakPos;
  const dB = state.length - leakPos;
  const dt = (dA - dB) / profile.velocity;
  const signalStrength = leakActive ? flowLs / 0.25 : 0;
  const snr = signalStrength * (1 - state.noise / 120) * Math.exp(-profile.attenuation * 0.5);
  return { rho, cd, pressurePa, diameterM, area, jetV, flowM3s, flowLs, profile, leakPos, dA, dB, dt, snr, leakActive };
}

function updateNumbers() {
  const c = calc();
  document.getElementById("flowRate").textContent = `${c.flowLs.toFixed(2)} L/s`;
  document.getElementById("jetVelocity").textContent = `${c.jetV.toFixed(1)} m/s`;
  document.getElementById("sensorDistances").textContent = `${c.dA.toFixed(0)} / ${c.dB.toFixed(0)} m`;
  document.getElementById("timeDelay").textContent = `${(c.dt * 1000).toFixed(1)} ms`;
  document.getElementById("locationEstimate").textContent = `${c.leakPos.toFixed(0)} m`;
  document.getElementById("pressureValue").textContent = `${state.pressure.toFixed(2)} MPa`;
  document.getElementById("diameterValue").textContent = `${state.diameter.toFixed(1)} mm`;
  document.getElementById("lengthValue").textContent = `${state.length.toFixed(0)} m`;
  document.getElementById("leakValue").textContent = `${c.leakPos.toFixed(0)} m / ${(state.leakRatio * 100).toFixed(0)}%`;
  document.getElementById("noiseValue").textContent = `${state.noise.toFixed(0)}%`;
  controls.leakRatio.value = String(Math.round(state.leakRatio * 100));
}

function renderStepControls() {
  stepList.innerHTML = "";
  processTrack.innerHTML = "";
  steps.forEach((step, index) => {
    const btn = document.createElement("button");
    btn.className = `step-button ${index === state.step ? "active" : ""}`;
    btn.innerHTML = `<span class="step-number">${String(index + 1).padStart(2, "0")}</span><span class="step-label">${step.title}</span>`;
    btn.addEventListener("click", () => setStep(index));
    stepList.appendChild(btn);

    const node = document.createElement("button");
    node.className = `track-node ${index === state.step ? "active" : ""}`;
    node.innerHTML = `<strong>${String(index + 1).padStart(2, "0")}</strong>${step.short}`;
    node.addEventListener("click", () => setStep(index));
    processTrack.appendChild(node);
  });
}

function setStep(index) {
  state.step = (index + steps.length) % steps.length;
  renderStepControls();
  renderDetail();
}

function listInto(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function renderDetail() {
  const step = steps[state.step];
  document.getElementById("stepKicker").textContent = `Step ${String(state.step + 1).padStart(2, "0")}`;
  document.getElementById("stepTitle").textContent = step.title;
  document.getElementById("stepSummary").textContent = step.summary;
  listInto("actions", step.actions);
  listInto("physics", step.physics);
  listInto("checks", step.checks);
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(800, Math.floor(rect.width * dpr));
  canvas.height = Math.max(420, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function darkModeActive() {
  return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches);
}

function themeColors() {
  if (darkModeActive()) {
    return {
      ink: "#e8f0f8",
      muted: "#aab8c7",
      line: "#304153",
      card: "rgba(17, 27, 38, 0.94)",
      ground: "#182633",
      road: "#2d3536",
      pipeOuter: "#4c5f70",
      pipeOuterStroke: "#8ea0b2",
      water: "#2f91aa",
      waterStroke: "#4ec2d6",
      waterPulse: "rgba(255,255,255,0.24)",
      device: "#0a111b",
      deviceStroke: "#536273",
      blue: "#66a9e8",
      cyan: "#41cbd2",
      red: "#f06b61",
      violet: "#9c8cf2",
      gold: "#dfb14f",
      goldDark: "#f0c96d",
      barMuted: "#5e7083",
      activePulse: "rgba(102,169,232,0.18)"
    };
  }

  return {
    ink: "#17212f",
    muted: "#697383",
    line: "#d9e1ea",
    card: "#ffffff",
    ground: "#dbe8f0",
    road: "#f4f0e8",
    pipeOuter: "#d8e2eb",
    pipeOuterStroke: "#8393a4",
    water: "#81c7dd",
    waterStroke: "#4ca6bd",
    waterPulse: "rgba(255,255,255,0.35)",
    device: "#17212f",
    deviceStroke: "#4b5967",
    blue: "#1f6fb2",
    cyan: "#0f9fa8",
    red: "#c43a31",
    violet: "#6753b8",
    gold: "#b78318",
    goldDark: "#8a5b10",
    barMuted: "#9eb3c6",
    activePulse: "rgba(31,111,178,0.16)"
  };
}

function drawRoundedRect(x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
}

function drawText(text, x, y, size = 13, color = "#17212f", weight = "500", align = "left") {
  ctx.font = `${weight} ${size}px "Microsoft YaHei", "Segoe UI", Arial`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function drawWave(x0, x1, y, amp, phase, color, width = 2) {
  ctx.beginPath();
  const stepsCount = 120;
  for (let i = 0; i <= stepsCount; i++) {
    const p = i / stepsCount;
    const x = x0 + (x1 - x0) * p;
    const envelope = Math.sin(Math.PI * p);
    const yy = y + Math.sin(p * Math.PI * 14 + phase) * amp * envelope;
    if (i === 0) ctx.moveTo(x, yy);
    else ctx.lineTo(x, yy);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function drawSpectrum(x, y, w, h, c, theme) {
  drawRoundedRect(x, y, w, h, 8, theme.card, theme.line);
  drawText("云端频谱 / STFT", x + 12, y + 20, 12, theme.muted, "700");
  const base = y + h - 26;
  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 18, base);
  ctx.lineTo(x + w - 14, base);
  ctx.stroke();
  const bars = 34;
  for (let i = 0; i < bars; i++) {
    const bx = x + 22 + i * ((w - 48) / bars);
    const band = Math.exp(-Math.pow((i - 12) / 7, 2)) * c.snr;
    const random = 0.18 + 0.1 * Math.sin(state.t * 2 + i);
    const barH = Math.min(h - 58, (band + random + state.noise / 160) * 42);
    ctx.fillStyle = i > 7 && i < 20 ? theme.cyan : theme.barMuted;
    ctx.fillRect(bx, base - barH, 5, barH);
  }
  drawText("稳定频带能量用于泄漏可信度判断", x + 12, y + h - 8, 11, theme.muted);
}

function drawCorrelation(x, y, w, h, c, theme) {
  drawRoundedRect(x, y, w, h, 8, theme.card, theme.line);
  drawText("双机互相关定位", x + 12, y + 20, 12, theme.muted, "700");
  const cx = x + w / 2 + Math.max(-60, Math.min(60, c.dt * 1000 * 2.5));
  const base = y + h * 0.62;
  ctx.beginPath();
  for (let i = 0; i <= 160; i++) {
    const p = i / 160;
    const px = x + 18 + p * (w - 36);
    const peak = Math.exp(-Math.pow((px - cx) / 20, 2)) * 48;
    const yy = base - peak + Math.sin(p * Math.PI * 16 + state.t) * 4;
    if (i === 0) ctx.moveTo(px, yy);
    else ctx.lineTo(px, yy);
  }
  ctx.strokeStyle = theme.violet;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeStyle = theme.red;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(cx, y + 34);
  ctx.lineTo(cx, y + h - 24);
  ctx.stroke();
  ctx.setLineDash([]);
  drawText(`Δt = ${(c.dt * 1000).toFixed(1)} ms`, cx, y + h - 8, 11, theme.red, "700", "center");
}

function drawMobileSimulation(w, h, c, theme) {
  const pad = Math.max(16, Math.min(24, w * 0.06));
  const groundY = 82;
  const pipeY = Math.min(230, Math.max(196, h * 0.36));
  const pipeX0 = pad + 8;
  const pipeX1 = w - pad - 8;
  const pipeW = pipeX1 - pipeX0;
  const pipeH = 54;
  const sensorA = pipeX0 + pipeW * 0.1;
  const sensorB = pipeX0 + pipeW * 0.9;
  const sensorSpan = sensorB - sensorA;
  const leakX = sensorA + sensorSpan * state.leakRatio;
  state.dragGeometry = { sensorA, sensorB, pipeY, leakX };

  ctx.fillStyle = theme.ground;
  ctx.fillRect(0, groundY, w, h - groundY);
  ctx.fillStyle = theme.road;
  ctx.fillRect(0, groundY, w, 15);
  drawText("路面/土壤介质", pad, groundY - 10, 11, theme.muted, "700");

  drawRoundedRect(pipeX0, pipeY - pipeH / 2, pipeW, pipeH, 28, theme.pipeOuter, theme.pipeOuterStroke);
  drawRoundedRect(pipeX0 + 8, pipeY - pipeH / 2 + 11, pipeW - 16, pipeH - 22, 22, theme.water, theme.waterStroke);
  for (let i = 0; i < 9; i++) {
    const x = pipeX0 + ((state.t * 36 + i * 58) % pipeW);
    ctx.fillStyle = theme.waterPulse;
    ctx.beginPath();
    ctx.ellipse(x, pipeY, 13, 4, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = c.profile.color;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(pipeX0, pipeY - pipeH / 2 - 2);
  ctx.lineTo(pipeX1, pipeY - pipeH / 2 - 2);
  ctx.stroke();

  const phase = state.t * 6;
  const waveY = pipeY - 56;
  if (c.leakActive) {
    const waveAmp = Math.min(17, 4 + Math.sqrt(Math.max(0, c.snr)) * 6);
    drawWave(sensorA, leakX, waveY, waveAmp, phase, theme.red, 2);
    drawWave(leakX, sensorB, waveY, waveAmp * 0.9, phase + 0.8, theme.red, 2);
    drawText("泄露声沿‘管-水’结构耦合路径传播", w / 2, waveY - 20, 10, theme.red, "700", "center");
  } else {
    const backgroundAmp = Math.min(3.2, state.noise / 26);
    drawWave(sensorA, leakX, waveY, backgroundAmp, phase * 0.4, theme.muted, 1.3);
    drawWave(leakX, sensorB, waveY, backgroundAmp, phase * 0.4 + 0.5, theme.muted, 1.3);
    drawText("无漏孔/无压差：仅背景噪声", w / 2, waveY - 20, 10, theme.muted, "700", "center");
  }

  drawText(`dA=${c.dA.toFixed(0)} m`, (sensorA + leakX) / 2, pipeY - 36, 10, theme.violet, "700", "center");
  drawText(`dB=${c.dB.toFixed(0)} m`, (sensorB + leakX) / 2, pipeY - 36, 10, theme.violet, "700", "center");

  [sensorA, sensorB].forEach((sx, idx) => {
    drawRoundedRect(sx - 15, pipeY - 94, 30, 52, 7, theme.device, theme.deviceStroke);
    ctx.fillStyle = theme.cyan;
    ctx.fillRect(sx - 8, pipeY - 54, 16, 6);
    ctx.strokeStyle = theme.device;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(sx, pipeY - 42);
    ctx.lineTo(sx, pipeY - 28);
    ctx.stroke();
    drawText(idx === 0 ? "A" : "B", sx, pipeY - 104, 11, theme.ink, "700", "center");
  });

  ctx.fillStyle = theme.gold;
  ctx.beginPath();
  ctx.moveTo(leakX - 9, pipeY + 11);
  ctx.lineTo(leakX + 9, pipeY + 11);
  ctx.lineTo(leakX, pipeY + 52);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = theme.goldDark;
  ctx.stroke();
  if (c.leakActive) {
    const jetHeight = Math.min(56, 16 + c.flowLs * 13);
    ctx.strokeStyle = theme.red;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(leakX, pipeY + 24);
    ctx.quadraticCurveTo(leakX + 11 * Math.sin(state.t * 5), pipeY + 39, leakX + 5, pipeY + 25 + jetHeight);
    ctx.stroke();
  }
  drawText("可移动漏点", leakX, pipeY + 78, 12, theme.goldDark, "700", "center");
  drawText(`${c.leakPos.toFixed(0)} m`, leakX, pipeY + 94, 11, theme.goldDark, "700", "center");
  drawText(`管材：${c.profile.name}  有效声速≈${c.profile.velocity} m/s`, pad, pipeY + 124, 10, theme.muted, "700");

  drawRoundedRect(pad, pipeY + 145, w - pad * 2, 44, 8, theme.card, theme.line);
  drawText("4G / LTE Cat-1", pad + 12, pipeY + 163, 12, theme.blue, "700");
  drawText("上传原始音频、设备状态与日志", pad + 12, pipeY + 181, 11, theme.muted);

  const cardW = w - pad * 2;
  drawSpectrum(pad, pipeY + 205, cardW, 82, c, theme);
  drawCorrelation(pad, pipeY + 300, cardW, 84, c, theme);

  const activeX = pipeX0 + (state.step / (steps.length - 1)) * pipeW;
  ctx.fillStyle = theme.activePulse;
  ctx.beginPath();
  ctx.arc(activeX, pipeY, 24 + 3 * Math.sin(state.t * 3), 0, Math.PI * 2);
  ctx.fill();
}

function drawSimulation() {
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const c = calc();
  const theme = themeColors();
  ctx.clearRect(0, 0, w, h);

  if (w < 640) {
    drawMobileSimulation(w, h, c, theme);
    return;
  }

  const groundY = Math.max(h * 0.34, 150);
  const pipeY = h * 0.58;
  const pipeX0 = w * 0.08;
  const pipeX1 = w * 0.68;
  const pipeW = pipeX1 - pipeX0;
  const pipeH = 62;
  const sensorA = pipeX0 + pipeW * 0.08;
  const sensorB = pipeX0 + pipeW * 0.92;
  const sensorSpan = sensorB - sensorA;
  const leakX = sensorA + sensorSpan * state.leakRatio;
  state.dragGeometry = { sensorA, sensorB, pipeY, leakX };

  ctx.fillStyle = theme.ground;
  ctx.fillRect(0, groundY, w, h - groundY);
  ctx.fillStyle = theme.road;
  ctx.fillRect(0, groundY, w, 18);
  drawText("路面/土壤介质", w * 0.08, groundY - 12, 12, theme.muted, "700");

  drawRoundedRect(pipeX0, pipeY - pipeH / 2, pipeW, pipeH, 30, theme.pipeOuter, theme.pipeOuterStroke);
  drawRoundedRect(pipeX0 + 10, pipeY - pipeH / 2 + 12, pipeW - 20, pipeH - 24, 24, theme.water, theme.waterStroke);
  for (let i = 0; i < 14; i++) {
    const x = pipeX0 + ((state.t * 42 + i * 72) % pipeW);
    ctx.fillStyle = theme.waterPulse;
    ctx.beginPath();
    ctx.ellipse(x, pipeY, 16, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = c.profile.color;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(pipeX0, pipeY - pipeH / 2 - 2);
  ctx.lineTo(pipeX1, pipeY - pipeH / 2 - 2);
  ctx.stroke();
  drawText(`管材：${c.profile.name}  有效声速≈${c.profile.velocity} m/s`, pipeX0, pipeY + pipeH / 2 + 26, 12, theme.muted, "700");

  ctx.fillStyle = theme.gold;
  ctx.beginPath();
  ctx.moveTo(leakX - 10, pipeY + 12);
  ctx.lineTo(leakX + 10, pipeY + 12);
  ctx.lineTo(leakX, pipeY + 64);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = theme.goldDark;
  ctx.stroke();
  drawText("可移动漏点", leakX, pipeY + 112, 13, theme.goldDark, "700", "center");
  drawText(`${c.leakPos.toFixed(0)} m`, leakX, pipeY + 129, 12, theme.goldDark, "700", "center");

  if (c.leakActive) {
    const jetHeight = Math.min(84, 20 + c.flowLs * 18);
    ctx.strokeStyle = theme.red;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(leakX, pipeY + 28);
    ctx.quadraticCurveTo(leakX + 18 * Math.sin(state.t * 5), pipeY + 52, leakX + 8, pipeY + 28 + jetHeight);
    ctx.stroke();
  }

  const phase = state.t * 6;
  if (c.leakActive) {
    const waveAmp = Math.min(22, 5 + Math.sqrt(Math.max(0, c.snr)) * 8);
    drawWave(sensorA, leakX, pipeY - 74, waveAmp, phase, theme.red, 2);
    drawWave(leakX, sensorB, pipeY - 74, waveAmp * 0.92, phase + 0.8, theme.red, 2);
    drawText("泄露声沿‘管-水’结构耦合路径传播", leakX, pipeY - 100, 12, theme.red, "700", "center");
  } else {
    const backgroundAmp = Math.min(3.5, state.noise / 24);
    drawWave(sensorA, leakX, pipeY - 74, backgroundAmp, phase * 0.4, theme.muted, 1.4);
    drawWave(leakX, sensorB, pipeY - 74, backgroundAmp, phase * 0.4 + 0.5, theme.muted, 1.4);
    drawText("无漏孔/无压差：无泄漏声源，仅背景噪声", leakX, pipeY - 100, 12, theme.muted, "700", "center");
  }
  drawText(`dA=${c.dA.toFixed(0)} m`, (sensorA + leakX) / 2, pipeY - 50, 12, theme.violet, "700", "center");
  drawText(`dB=${c.dB.toFixed(0)} m`, (sensorB + leakX) / 2, pipeY - 50, 12, theme.violet, "700", "center");

  [sensorA, sensorB].forEach((sx, idx) => {
    drawRoundedRect(sx - 20, pipeY - 118, 40, 62, 8, theme.device, theme.deviceStroke);
    ctx.fillStyle = theme.cyan;
    ctx.fillRect(sx - 11, pipeY - 72, 22, 7);
    ctx.strokeStyle = theme.device;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sx, pipeY - 56);
    ctx.lineTo(sx, pipeY - 30);
    ctx.stroke();
    drawText(idx === 0 ? "IL01/IL02 A" : "IL01/IL02 B", sx, pipeY - 128, 12, theme.ink, "700", "center");
  });

  drawRoundedRect(w * 0.72, h * 0.14, w * 0.23, h * 0.18, 8, theme.card, theme.line);
  drawText("4G / LTE Cat-1", w * 0.735, h * 0.18, 13, theme.blue, "700");
  drawText("上传原始音频、设备状态、日志", w * 0.735, h * 0.22, 12, theme.muted);
  drawText("云端 LeakCloud", w * 0.735, h * 0.27, 16, theme.ink, "700");
  ctx.strokeStyle = theme.blue;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(sensorB + 24, pipeY - 100);
  ctx.bezierCurveTo(w * 0.67, h * 0.2, w * 0.75, h * 0.2, w * 0.72, h * 0.22);
  ctx.stroke();
  ctx.setLineDash([]);

  drawSpectrum(w * 0.72, h * 0.36, w * 0.23, h * 0.22, c, theme);
  drawCorrelation(w * 0.72, h * 0.62, w * 0.23, h * 0.22, c, theme);

  const activeX = pipeX0 + (state.step / (steps.length - 1)) * pipeW;
  ctx.fillStyle = theme.activePulse;
  ctx.beginPath();
  ctx.arc(activeX, pipeY, 32 + 4 * Math.sin(state.t * 3), 0, Math.PI * 2);
  ctx.fill();
}

function setLeakRatioFromCanvas(clientX) {
  if (!state.dragGeometry) return;
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const { sensorA, sensorB } = state.dragGeometry;
  const ratio = (x - sensorA) / (sensorB - sensorA);
  state.leakRatio = Math.max(0.05, Math.min(0.95, ratio));
  updateNumbers();
  drawSimulation();
}

function pointerNearLeak(event) {
  if (!state.dragGeometry) return false;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const { leakX, pipeY } = state.dragGeometry;
  const dx = x - leakX;
  const dy = y - (pipeY + 38);
  return Math.hypot(dx, dy) < 62;
}

function tick() {
  if (state.playing || state.draggingLeak) {
    state.t += 0.018;
  }
  updateNumbers();
  drawSimulation();
  requestAnimationFrame(tick);
}

Object.entries(controls).forEach(([key, el]) => {
  el.addEventListener("input", () => {
    if (key === "leakRatio") {
      state.leakRatio = Number(el.value) / 100;
    } else {
      state[key] = Number(el.value);
    }
    updateNumbers();
  });
});

canvas.addEventListener("pointerdown", (event) => {
  if (!pointerNearLeak(event)) return;
  state.draggingLeak = true;
  canvas.classList.add("dragging");
  canvas.setPointerCapture?.(event.pointerId);
  setLeakRatioFromCanvas(event.clientX);
});

canvas.addEventListener("pointermove", (event) => {
  if (!state.draggingLeak) return;
  setLeakRatioFromCanvas(event.clientX);
});

function stopLeakDrag(event) {
  if (!state.draggingLeak) return;
  state.draggingLeak = false;
  canvas.classList.remove("dragging");
  canvas.releasePointerCapture?.(event.pointerId);
}

canvas.addEventListener("pointerup", stopLeakDrag);
canvas.addEventListener("pointercancel", stopLeakDrag);

document.querySelectorAll("[data-material]").forEach(btn => {
  btn.addEventListener("click", () => {
    state.material = btn.dataset.material;
    document.querySelectorAll("[data-material]").forEach(b => b.classList.toggle("active", b === btn));
    updateNumbers();
  });
});

document.getElementById("prevStep").addEventListener("click", () => setStep(state.step - 1));
document.getElementById("nextStep").addEventListener("click", () => setStep(state.step + 1));
document.getElementById("playToggle").addEventListener("click", () => {
  state.playing = !state.playing;
  document.getElementById("playToggle").textContent = state.playing ? "暂停动画" : "播放动画";
});

window.addEventListener("resize", resizeCanvas);
window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener?.("change", drawSimulation);
resizeCanvas();
renderStepControls();
renderDetail();
updateNumbers();
tick();
