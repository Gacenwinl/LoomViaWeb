/* LoomViaWeb — 嘉豪运维控制台（Gateway 状态 HUD） */

const TYPEWRITER_LINES = [
  "将 QQ 低摩擦输入、大模型推理与 Obsidian 第二大脑打通，形成可版本化的人生轨迹闭环。",
  "模型即编排 · 替代易失真的外部脚本流水线 · 7×24 个人生产环境。",
];

const TERMINAL_LINES = [
  "> openclaw gateway status",
  "  STATUS: online · hetzner-fsn1",
  "  VAULT: /vault/obsidian · mounted rw",
  "> agent jiahao --skill day-planner",
  "  MODE: elite-secretary · quadrant=4",
  "> exec write daily/2026-05-20.md ## REVIEW",
  "  OK · 4 sections · planner ticks synced",
  "> autosync push",
  "  gitee/main · +1 commit · 3-way sync queued",
];

const HUD_ITEMS = [
  { label: "Gateway", value: "ONLINE" },
  { label: "DeepSeek-V3.2", value: "tool-use" },
  { label: "Reasoning", value: "OFF" },
  { label: "Vault Sync", value: "SYNCED" },
  { label: "Last Review", value: "23:42 CST" },
  { label: "QQ Channel", value: "CONNECTED" },
];

const SKILLS = [
  "DAY PLANNER",
  "跨日承诺",
  "精英秘书",
  "晨间规划",
  "晚间复盘",
  "启动困难",
  "台账归档",
  "LOOM 打印",
  "时间审计",
  "用药记录",
  "碎片捕获",
  "OKR 对齐",
];

// Particle network
(function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let w, h, nodes;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(80, Math.floor((w * h) / 18000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const dist = 140;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 255, 0.5)";
      ctx.fill();
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < dist) {
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.12 * (1 - d / dist)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
})();

// Typewriter
(function initTypewriter() {
  const el = document.getElementById("typewriter");
  let lineIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const line = TYPEWRITER_LINES[lineIdx];
    if (!deleting) {
      el.textContent = line.slice(0, ++charIdx);
      if (charIdx === line.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
    } else {
      el.textContent = line.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % TYPEWRITER_LINES.length;
      }
    }
    setTimeout(tick, deleting ? 28 : 42);
  }
  tick();
})();

// Metric counters
function animateCounters() {
  document.querySelectorAll(".metric-val[data-target]").forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(ease * target);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// Terminal mock
function runTerminal() {
  const box = document.getElementById("terminal");
  if (!box) return;
  let i = 0;
  function addLine() {
    if (i >= TERMINAL_LINES.length) {
      const cur = document.createElement("span");
      cur.className = "cursor";
      box.appendChild(cur);
      return;
    }
    const div = document.createElement("div");
    div.className = "line";
    div.style.animationDelay = `${i * 0.08}s`;
    div.textContent = TERMINAL_LINES[i++];
    box.appendChild(div);
    setTimeout(addLine, 380);
  }
  addLine();
}

// HUD status
function renderHud() {
  const root = document.getElementById("hud-status");
  HUD_ITEMS.forEach((item) => {
    const row = document.createElement("div");
    row.className = "hud-row";
    row.innerHTML = `<span class="label">${item.label}</span><span class="value">${item.value}</span>`;
    root.appendChild(row);
  });
}

// Skill orbit
function renderSkills() {
  const root = document.getElementById("skill-orbit");
  SKILLS.forEach((name, i) => {
    const tag = document.createElement("span");
    tag.className = "skill-tag";
    tag.textContent = name;
    tag.style.animationDelay = `${i * 0.05}s`;
    root.appendChild(tag);
    tag.addEventListener("mouseenter", () => {
      document.querySelectorAll(".skill-tag").forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");
    });
  });
  let idx = 0;
  setInterval(() => {
    document.querySelectorAll(".skill-tag").forEach((t) => t.classList.remove("active"));
    const tags = root.querySelectorAll(".skill-tag");
    tags[idx % tags.length]?.classList.add("active");
    idx++;
  }, 2400);
}

// Sparkline
function drawSparkline() {
  const canvas = document.getElementById("sparkline");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  const pts = Array.from({ length: 32 }, (_, i) => {
    const base = 40 + Math.sin(i * 0.4) * 25;
    return base + Math.random() * 30;
  });

  function frame(offset) {
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "rgba(0, 212, 255, 0.1)");
    grad.addColorStop(1, "rgba(123, 97, 255, 0.3)");
    ctx.beginPath();
    pts.forEach((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - (v + Math.sin(i * 0.3 + offset) * 8) * (h / 120);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "#00d4ff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    pts.forEach((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - (v + Math.sin(i * 0.3 + offset) * 8) * (h / 120);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    requestAnimationFrame(() => frame(offset + 0.04));
  }
  frame(0);
}

// Tabs
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".pipeline-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`panel-${tab.dataset.tab}`)?.classList.add("active");
  });
});

// Scroll buttons
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

// Intersection observers
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        if (e.target.classList.contains("cap-item")) {
          const bar = e.target.querySelector(".cap-bar span");
          if (bar) bar.style.width = bar.style.width;
        }
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".topo-node, .rm-item, .cap-item").forEach((el) => io.observe(el));

// Stagger topo nodes
document.querySelectorAll(".topo-node").forEach((node) => {
  const delay = parseInt(node.dataset.delay || "0", 10) * 150;
  setTimeout(() => node.classList.add("visible"), 400 + delay);
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  animateCounters();
  runTerminal();
  renderHud();
  renderSkills();
  drawSparkline();
});
