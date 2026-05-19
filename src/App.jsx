import { useState } from "react";

const ORANGE = "#C85A00";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'IBM Plex Sans', sans-serif; }
.app { min-height: 100vh; background: #0F0C07; color: #F0EBE0; }
.top-bar {
  background: #1A1208; border-bottom: 1px solid #3A2E1A;
  padding: 0 2rem; display: flex; align-items: center; gap: 1.5rem;
  height: 60px; position: sticky; top: 0; z-index: 100;
}
.logo { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: ${ORANGE}; flex-shrink: 0; }
.logo span { color: #F0EBE0; }
.setup-banner {
  background: #2A1A08; border-bottom: 2px solid ${ORANGE};
  padding: 10px 2rem; font-size: 13px; color: #C8B890;
  display: flex; align-items: center; justify-content: space-between;
}
.nav { display: flex; gap: 0; flex: 1; overflow-x: auto; scrollbar-width: none; }
.nav::-webkit-scrollbar { display: none; }
.nav-btn {
  background: none; border: none; color: #8A7A60;
  font-family: 'IBM Plex Sans', sans-serif; font-size: 12px; font-weight: 500;
  letter-spacing: 0.5px; padding: 0 14px; height: 60px; cursor: pointer;
  white-space: nowrap; border-bottom: 2px solid transparent; transition: all 0.15s; text-transform: uppercase;
}
.nav-btn:hover { color: #D4C4A0; }
.nav-btn.active { color: ${ORANGE}; border-bottom-color: ${ORANGE}; }
.nav-btn.setup-dot { position: relative; }
.nav-btn.setup-dot::after {
  content: ''; position: absolute; top: 12px; right: 6px;
  width: 6px; height: 6px; border-radius: 50%; background: ${ORANGE};
}
.main { padding: 2rem; max-width: 1100px; margin: 0 auto; }
.page-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 3px; color: #F0EBE0; margin-bottom: 4px; }
.page-sub { font-size: 13px; color: #7A6A50; margin-bottom: 2rem; font-style: italic; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.card { background: #1A1208; border: 1px solid #2E2410; border-radius: 4px; padding: 1.5rem; margin-bottom: 1rem; }
.card-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: ${ORANGE}; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; }
.stat-card { background: #1A1208; border: 1px solid #2E2410; border-radius: 4px; padding: 1rem 1.25rem; }
.stat-label { font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: #7A6A50; margin-bottom: 6px; }
.stat-value { font-family: 'IBM Plex Mono', monospace; font-size: 28px; font-weight: 500; color: #F0EBE0; line-height: 1; }
.stat-value.good { color: #5DA85D; }
.stat-value.warn { color: #D4A020; }
.stat-value.bad { color: #C84040; }
.stat-value.orange { color: ${ORANGE}; }
.stat-sub { font-size: 12px; color: #7A6A50; margin-top: 4px; }
.input-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 1rem; }
.input-row label { font-size: 11px; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; color: #7A6A50; }
.input-row input, .input-row select, .input-row textarea {
  background: #0F0C07; border: 1px solid #2E2410; border-radius: 3px;
  color: #F0EBE0; font-family: 'IBM Plex Mono', monospace; font-size: 14px;
  padding: 8px 10px; outline: none; width: 100%; transition: border-color 0.15s;
}
.input-row input:focus, .input-row select:focus { border-color: ${ORANGE}; }
.input-row select option { background: #1A1208; }
.btn { background: ${ORANGE}; border: none; border-radius: 3px; color: #0F0C07; font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; padding: 10px 20px; cursor: pointer; transition: all 0.15s; text-transform: uppercase; }
.btn:hover { background: #E06A00; }
.btn-sm { padding: 6px 14px; font-size: 11px; }
.btn-ghost { background: transparent; border: 1px solid #3A2E1A; color: #8A7A60; font-family: 'IBM Plex Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; padding: 8px 16px; cursor: pointer; border-radius: 3px; transition: all 0.15s; text-transform: uppercase; }
.btn-ghost:hover { border-color: ${ORANGE}; color: ${ORANGE}; }
.btn-danger { background: transparent; border: 1px solid #3A1A1A; color: #C84040; font-size: 12px; font-weight: 500; padding: 5px 10px; cursor: pointer; border-radius: 3px; transition: all 0.15s; }
.btn-danger:hover { background: #3A1A1A; }
.btn-success { background: #1A3A1A; border: 1px solid #2A5A2A; color: #5DA85D; font-size: 12px; font-weight: 600; padding: 8px 18px; cursor: pointer; border-radius: 3px; transition: all 0.15s; text-transform: uppercase; }
.btn-success:hover { background: #1F441F; }
.divider { border: none; border-top: 1px solid #2E2410; margin: 1.5rem 0; }
.tag { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 2px; text-transform: uppercase; }
.tag-green { background: #1A3A1A; color: #5DA85D; }
.tag-yellow { background: #3A3010; color: #D4A020; }
.tag-red { background: #3A1A1A; color: #C84040; }
.tag-orange { background: #3A1A08; color: ${ORANGE}; }
.tag-gray { background: #2E2410; color: #8A7A60; }
.tag-blue { background: #0A2A3A; color: #5090C0; }
.table { width: 100%; border-collapse: collapse; font-size: 13px; }
.table th { text-align: left; font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #7A6A50; padding: 8px 10px; border-bottom: 1px solid #2E2410; }
.table td { padding: 9px 10px; border-bottom: 1px solid #1E1810; color: #C8B890; font-family: 'IBM Plex Mono', monospace; font-size: 12px; }
.table tr:last-child td { border-bottom: none; }
.table tr:hover td { background: #1E1A0E; }
.progress-bar { height: 6px; background: #2E2410; border-radius: 3px; overflow: hidden; margin-top: 8px; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
.section-header { font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 2px; color: #7A6A50; border-bottom: 1px solid #2E2410; padding-bottom: 8px; margin-bottom: 1rem; text-transform: uppercase; }
.highlight-box { background: #2A1A08; border: 1px solid #4A2E10; border-left: 3px solid ${ORANGE}; border-radius: 0 4px 4px 0; padding: 1rem 1.25rem; margin: 1rem 0; }
.highlight-box.green { background: #0F2410; border-color: #1A4A1A; border-left-color: #5DA85D; }
.highlight-box.red { background: #240F0F; border-color: #4A1A1A; border-left-color: #C84040; }
.highlight-box.yellow { background: #241E08; border-color: #4A3A10; border-left-color: #D4A020; }
.highlight-box.blue { background: #0A1A2A; border-color: #1A3A5A; border-left-color: #5090C0; }
.mono { font-family: 'IBM Plex Mono', monospace; }
.ai-box { background: #0A0E14; border: 1px solid #1A2A3A; border-left: 3px solid #378ADD; border-radius: 0 4px 4px 0; padding: 1rem 1.25rem; margin-top: 1rem; }
.ai-label { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #378ADD; margin-bottom: 6px; }
.ai-text { font-size: 13px; color: #A0B8D0; line-height: 1.6; }
.loading-dot { display: inline-block; width: 6px; height: 6px; background: #378ADD; border-radius: 50%; margin: 0 2px; animation: dot-pulse 1.2s ease-in-out infinite; }
.loading-dot:nth-child(2) { animation-delay: 0.2s; }
.loading-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes dot-pulse { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
.tab-row { display: flex; gap: 0; border-bottom: 1px solid #2E2410; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tab-btn { background: none; border: none; border-bottom: 2px solid transparent; color: #7A6A50; font-family: 'IBM Plex Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; padding: 10px 16px; cursor: pointer; text-transform: uppercase; margin-bottom: -1px; transition: all 0.15s; white-space: nowrap; }
.tab-btn:hover { color: #D4C4A0; }
.tab-btn.active { color: ${ORANGE}; border-bottom-color: ${ORANGE}; }
.slider-row { display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; }
.slider-row label { font-size: 12px; color: #7A6A50; min-width: 150px; }
.slider-row input[type=range] { flex: 1; accent-color: ${ORANGE}; }
.slider-row .val { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #F0EBE0; min-width: 70px; text-align: right; }
.industry-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #1E1810; }
.industry-row:last-child { border-bottom: none; }
.industry-label { font-size: 13px; color: #C8B890; }
.industry-range { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5DA85D; }
.mat-line { display: grid; grid-template-columns: 2fr 80px 80px 90px 40px; gap: 6px; align-items: center; margin-bottom: 6px; }
.mat-line input { background: #0F0C07; border: 1px solid #2E2410; border-radius: 3px; color: #F0EBE0; font-family: 'IBM Plex Mono', monospace; font-size: 12px; padding: 6px 8px; outline: none; width: 100%; }
.mat-line input:focus { border-color: ${ORANGE}; }
.mat-total { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5DA85D; text-align: right; padding: 4px 0; }
.emp-line { display: grid; grid-template-columns: 1.5fr 1fr 80px 80px 80px 36px; gap: 6px; align-items: center; margin-bottom: 6px; }
.emp-line input, .emp-line select { background: #0F0C07; border: 1px solid #2E2410; border-radius: 3px; color: #F0EBE0; font-family: 'IBM Plex Mono', monospace; font-size: 12px; padding: 6px 8px; outline: none; width: 100%; }
.emp-line input:focus, .emp-line select:focus { border-color: ${ORANGE}; }
.goal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.intake-section { background: #14100A; border: 1px solid #2E2410; border-radius: 4px; padding: 1.25rem; margin-bottom: 1.5rem; }
.intake-section-title { font-family: 'Bebas Neue', sans-serif; font-size: 15px; letter-spacing: 2px; color: #7A6A50; margin-bottom: 1rem; text-transform: uppercase; }
`;

const PAGES = [
  { id: "intake", label: "Setup", icon: "ti-settings" },
  { id: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard" },
  { id: "jobs", label: "Job Tracker", icon: "ti-tool" },
  { id: "monthly", label: "Monthly", icon: "ti-calendar" },
  { id: "quotes-pipe", label: "Quote Pipeline", icon: "ti-file-invoice" },
  { id: "service", label: "Service Analysis", icon: "ti-chart-bar" },
  { id: "capacity", label: "Shop Capacity", icon: "ti-building-factory-2" },
  { id: "materials", label: "Materials", icon: "ti-box" },
  { id: "labor", label: "Labor & Employees", icon: "ti-users" },
  { id: "estimating", label: "Estimating", icon: "ti-calculator" },
  { id: "hire", label: "Hire Ready", icon: "ti-user-plus" },
  { id: "scaling", label: "Scaling Goals", icon: "ti-trending-up" },
  { id: "quote-build", label: "Quote Builder", icon: "ti-receipt" },
  { id: "industry", label: "Industry", icon: "ti-certificate" },
];

const JOB_TYPES = ["Railing", "Gate", "Dumpster Door", "Fire Grate", "Decorative Household", "Commercial Weld", "Custom Fabrication", "Structural", "Trailer", "Repair", "Other"];
const UNITS = ["each", "ft", "sq ft", "lbs", "in", "m", "kg", "sheets"];

const fmt = (n) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtInt = (n) => `$${Math.round(Number(n)).toLocaleString()}`;
const pct = (n) => `${Number(n).toFixed(1)}%`;
const num = (n) => Number(n) || 0;

function AIInsight({ prompt, trigger }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const ask = async () => {
    setLoading(true); setText(""); setDone(false);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: "You are a business advisor specializing in welding, metal fabrication, and skilled trades. Give specific, actionable, numbers-focused advice in 2-4 concise sentences. Speak directly to the business owner. No preamble.",
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await resp.json();
      setText(data.content?.find(b => b.type === "text")?.text || "Unable to get insight.");
    } catch { setText("Unable to connect."); }
    setLoading(false); setDone(true);
  };
  return (
    <div className="ai-box">
      <div className="ai-label"><i className="ti ti-robot" aria-hidden="true" /> AI Advisor</div>
      {!loading && !done && <button className="btn-ghost" style={{ fontSize: 11 }} onClick={ask}>{trigger} ↗</button>}
      {loading && <div><span className="loading-dot" /><span className="loading-dot" /><span className="loading-dot" /></div>}
      {done && <div className="ai-text">{text}</div>}
      {done && <button className="btn-ghost" style={{ fontSize: 11, marginTop: 8 }} onClick={ask}>Refresh ↗</button>}
    </div>
  );
}

// ─── INTAKE / BUSINESS SETUP ─────────────────────────────────────────────────
function Intake({ bizGoals, setBizGoals, jobs }) {
  const [saved, setSaved] = useState(false);
  const set = (k, v) => { setSaved(false); setBizGoals(g => ({ ...g, [k]: v })); };
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const jobCount = jobs.length;
  const totalRev = jobs.reduce((s, j) => s + num(j.totalPrice), 0);
  const totalMat = jobs.reduce((s, j) => s + num(j.materialCost), 0);
  const totalOwnerHrs = jobs.reduce((s, j) => s + num(j.ownerHours), 0);
  const totalEmpCost = jobs.reduce((s, j) => s + (j.employees || []).reduce((s2, e) => s2 + num(e.hours) * num(e.rate), 0), 0);
  const totalOwnerLC = jobs.reduce((s, j) => s + num(j.ownerHours) * num(j.ownerRate || bizGoals.ownerRate || 65), 0);
  const totalProfit = totalRev - totalMat - totalOwnerLC - totalEmpCost;
  const avgJobValue = jobCount > 0 ? totalRev / jobCount : 0;
  const avgOwnerHrsPerJob = jobCount > 0 ? totalOwnerHrs / jobCount : 0;
  const avgMatPerJob = jobCount > 0 ? totalMat / jobCount : 0;
  const avgMargin = totalRev > 0 ? (totalProfit / totalRev) * 100 : 0;
  const avgProfitPerJob = jobCount > 0 ? totalProfit / jobCount : 0;
  const matPctOfRev = totalRev > 0 ? (totalMat / totalRev) * 100 : 0;
  const laborPctOfRev = totalRev > 0 ? ((totalOwnerLC + totalEmpCost) / totalRev) * 100 : 0;
  const empNames = new Set();
  jobs.forEach(j => (j.employees || []).forEach(e => { if (e.name) empNames.add(e.name); }));
  const activeEmployees = empNames.size;

  const CalcStat = ({ label, value, sub, good, warn }) => {
    const color = good ? "#5DA85D" : warn ? "#D4A020" : "#F0EBE0";
    return (
      <div style={{ background: "#0F0C07", border: "1px solid #2E2410", borderRadius: 4, padding: "0.75rem 1rem" }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "#5A4A30", marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 20, color, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: "#5A4A30", marginTop: 4 }}>{sub}</div>}
      </div>
    );
  };

  const steps = [
    { num: 1, label: "Fill this setup page", done: !!bizGoals.bizName },
    { num: 2, label: "Add your jobs in Job Tracker", done: jobs.length >= 3 },
    { num: 3, label: "Use Quote Builder to price new work", done: false },
    { num: 4, label: "Check Labor & Hours for time insights", done: jobs.length >= 1 },
    { num: 5, label: "Review Dashboard — everything auto-calculates", done: jobs.length >= 5 },
  ];

  return (
    <div>
      <div className="page-title">Business Setup</div>
      <div className="page-sub">Answer a few basic questions — ForgeCheck calculates everything else from your job data</div>

      <div className="card" style={{ marginBottom: "1.5rem", borderColor: "#1A2A3A" }}>
        <div className="card-title" style={{ color: "#5090C0" }}><i className="ti ti-route" aria-hidden="true" /> How ForgeCheck Works</div>
        <div style={{ fontSize: 13, color: "#8A7A60", lineHeight: 1.8, marginBottom: "1rem" }}>
          You only need to answer basic questions here. Once you start logging jobs in the <strong style={{ color: "#F0EBE0" }}>Job Tracker</strong>, the system automatically calculates your average job value, hours per job, material spend, profit margins, hire readiness, and growth projections — no manual math needed.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.done ? "#1A3A1A" : "#2E2410", border: `1px solid ${s.done ? "#5DA85D" : "#3A2E1A"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {s.done ? <i className="ti ti-check" style={{ fontSize: 11, color: "#5DA85D" }} aria-hidden="true" /> : <span style={{ fontSize: 10, color: "#5A4A30", fontWeight: 600 }}>{s.num}</span>}
              </div>
              <span style={{ fontSize: 13, color: s.done ? "#F0EBE0" : "#7A6A50" }}>{s.label}</span>
              {s.done && <span className="tag tag-green" style={{ fontSize: 10 }}>Done</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="intake-section">
        <div className="intake-section-title">About Your Business</div>
        <div className="grid-2">
          <div className="input-row"><label>Business Name</label><input value={bizGoals.bizName} onChange={e => set("bizName", e.target.value)} placeholder="Smith Metal Works" /></div>
          <div className="input-row"><label>Owner Name</label><input value={bizGoals.ownerName} onChange={e => set("ownerName", e.target.value)} placeholder="John Smith" /></div>
          <div className="input-row"><label>How long have you been in business?</label>
            <select value={bizGoals.yearsInBiz} onChange={e => set("yearsInBiz", e.target.value)}>
              <option value="">Select...</option>
              <option value="less1">Less than 1 year</option>
              <option value="1">About 1 year</option>
              <option value="2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div className="input-row"><label>Do you currently have employees?</label>
            <select value={bizGoals.stage} onChange={e => set("stage", e.target.value)}>
              <option value="solo">No - just me</option>
              <option value="first-hire">No, but actively planning to hire</option>
              <option value="small-crew">Yes - 1 to 3 employees</option>
              <option value="growing">Yes - 4 or more employees</option>
            </select>
          </div>
          <div className="input-row"><label>What type of work do you do most?</label>
            <select value={bizGoals.topServices} onChange={e => set("topServices", e.target.value)}>
              <option value="">Select...</option>
              <option value="residential">Residential (railings, gates, home decor)</option>
              <option value="commercial">Commercial (dumpster doors, structural, shop work)</option>
              <option value="mixed">Mix of residential and commercial</option>
              <option value="custom">Custom / artistic / decorative fab</option>
              <option value="repair">Mostly repairs and small jobs</option>
            </select>
          </div>
          <div className="input-row"><label>Who are your main customers?</label>
            <select value={bizGoals.customerType} onChange={e => set("customerType", e.target.value)}>
              <option value="homeowners">Homeowners</option>
              <option value="contractors">Contractors / builders</option>
              <option value="commercial">Commercial businesses</option>
              <option value="mixed">Mix of all types</option>
            </select>
          </div>
        </div>
      </div>

      <div className="intake-section">
        <div className="intake-section-title">A Few Key Numbers</div>
        <div style={{ fontSize: 12, color: "#5A4A30", marginBottom: "1rem", fontStyle: "italic" }}>
          These seed the system before you have enough job data. As you track more jobs, the system replaces these estimates with real calculated values automatically.
        </div>
        <div className="grid-2">
          <div className="input-row">
            <label>What do you charge per hour? ($/hr)</label>
            <input type="number" value={bizGoals.ownerRate} onChange={e => set("ownerRate", e.target.value)} placeholder="65" />
          </div>
          <div className="input-row">
            <label>Roughly how much do you bring in per month? ($)</label>
            <input type="number" value={bizGoals.currentMonthlyRev} onChange={e => set("currentMonthlyRev", e.target.value)} placeholder="8000" />
          </div>
          <div className="input-row">
            <label>Monthly fixed costs - shop, insurance, tools, gas ($)</label>
            <input type="number" value={bizGoals.monthlyOverhead} onChange={e => set("monthlyOverhead", e.target.value)} placeholder="1500" />
          </div>
          <div className="input-row"><label>How many months of savings do you have in reserve?</label>
            <select value={bizGoals.savingsMonths} onChange={e => set("savingsMonths", e.target.value)}>
              <option value="0">None / less than 1 month</option>
              <option value="1">About 1 month</option>
              <option value="2">2 months</option>
              <option value="3">3 months</option>
              <option value="6">4-6 months</option>
              <option value="12">6+ months</option>
            </select>
          </div>
        </div>
      </div>

      <div className="intake-section">
        <div className="intake-section-title">Your Goals</div>
        <div className="grid-2">
          <div className="input-row">
            <label>How much do you want to earn per year? ($)</label>
            <input type="number" value={bizGoals.ownerDesiredPay} onChange={e => set("ownerDesiredPay", e.target.value)} placeholder="75000" />
          </div>
          <div className="input-row">
            <label>Revenue goal for the next 12 months ($)</label>
            <input type="number" value={bizGoals.goal12mo} onChange={e => set("goal12mo", e.target.value)} placeholder="120000" />
          </div>
          <div className="input-row">
            <label>Where do you want this business in 3 years? ($)</label>
            <input type="number" value={bizGoals.goal3yr} onChange={e => set("goal3yr", e.target.value)} placeholder="300000" />
          </div>
          <div className="input-row"><label>How many hours per week are you comfortable working?</label>
            <select value={bizGoals.maxOwnerHrs} onChange={e => set("maxOwnerHrs", e.target.value)}>
              <option value="30">Up to 30 hrs/week</option>
              <option value="40">Up to 40 hrs/week</option>
              <option value="50">Up to 50 hrs/week</option>
              <option value="60">Up to 60 hrs/week</option>
              <option value="60+">Whatever it takes</option>
            </select>
          </div>
          <div className="input-row"><label>What is your biggest challenge right now?</label>
            <select value={bizGoals.bigChallenge} onChange={e => set("bigChallenge", e.target.value)}>
              <option value="pricing">Figuring out what to charge</option>
              <option value="capacity">More work than I can handle alone</option>
              <option value="leads">Not enough customers</option>
              <option value="cashflow">Managing cash flow</option>
              <option value="hiring">Ready to hire but do not know when</option>
              <option value="margins">Not making enough profit</option>
              <option value="tracking">Do not know if I am actually profitable</option>
            </select>
          </div>
          <div className="input-row"><label>When are you hoping to hire your first employee?</label>
            <select value={bizGoals.hireTargetMonth} onChange={e => set("hireTargetMonth", e.target.value)}>
              <option value="">Not planning to hire yet</option>
              <option value="3mo">Within 3 months</option>
              <option value="6mo">Within 6 months</option>
              <option value="12mo">Within 12 months</option>
              <option value="2yr">1-2 years from now</option>
              <option value="unsure">Unsure - when the numbers are right</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: "2rem" }}>
        <button className="btn" onClick={save}>Save and Continue</button>
        {saved && <span style={{ color: "#5DA85D", fontSize: 13 }}><i className="ti ti-check" aria-hidden="true" /> Saved - now head to Job Tracker to start logging jobs</span>}
      </div>

      {jobCount > 0 && (
        <div>
          <div className="section-header" style={{ marginBottom: "1rem" }}>Calculated from Your {jobCount} Tracked Job{jobCount !== 1 ? "s" : ""}</div>
          <div style={{ fontSize: 12, color: "#5A4A30", marginBottom: "1rem", fontStyle: "italic" }}>
            These values are auto-calculated from your Job Tracker. They update every time you add a job.
          </div>
          <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
            <CalcStat label="Avg Job Value" value={fmtInt(avgJobValue)} sub="per completed job" good={avgJobValue >= 800} warn={avgJobValue >= 400 && avgJobValue < 800} />
            <CalcStat label="Avg Owner Hrs / Job" value={avgOwnerHrsPerJob.toFixed(1) + " hrs"} sub="your time per job" />
            <CalcStat label="Avg Material / Job" value={fmtInt(avgMatPerJob)} sub={pct(matPctOfRev) + " of revenue"} good={matPctOfRev <= 35} warn={matPctOfRev > 35 && matPctOfRev <= 45} />
            <CalcStat label="Avg Profit / Job" value={fmtInt(avgProfitPerJob)} sub="after all costs" good={avgProfitPerJob > 400} warn={avgProfitPerJob > 0 && avgProfitPerJob <= 400} />
          </div>
          <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
            <CalcStat label="Overall Avg Margin" value={pct(avgMargin)} sub="across all jobs" good={avgMargin >= 40} warn={avgMargin >= 25 && avgMargin < 40} />
            <CalcStat label="Material % of Revenue" value={pct(matPctOfRev)} sub="industry target: 20-35%" good={matPctOfRev <= 35} warn={matPctOfRev > 35 && matPctOfRev <= 45} />
            <CalcStat label="Labor % of Revenue" value={pct(laborPctOfRev)} sub="owner + employees" good={laborPctOfRev <= 50} warn={laborPctOfRev > 50 && laborPctOfRev <= 60} />
            <CalcStat label="Active Employees Tracked" value={String(activeEmployees)} sub={activeEmployees === 0 ? "solo operation" : activeEmployees + " worker" + (activeEmployees > 1 ? "s" : "") + " logged"} />
          </div>
          <AIInsight
            prompt={"Welding/fab business " + (bizGoals.bizName || "") + ": stage=" + bizGoals.stage + ", challenge=" + bizGoals.bigChallenge + ", services=" + bizGoals.topServices + ", " + jobCount + " jobs tracked. Avg job value: " + fmtInt(avgJobValue) + ", owner hrs/job: " + avgOwnerHrsPerJob.toFixed(1) + ", material/job: " + fmtInt(avgMatPerJob) + ", avg margin: " + pct(avgMargin) + ", material %: " + pct(matPctOfRev) + ", labor %: " + pct(laborPctOfRev) + ". Owner rate: $" + (bizGoals.ownerRate || 65) + "/hr, monthly overhead: $" + (bizGoals.monthlyOverhead || 0) + ", 12-mo goal: " + fmtInt(num(bizGoals.goal12mo)) + ". Top 3 priorities right now?"}
            trigger="Get Personalized Business Advice"
          />
        </div>
      )}

      {jobCount === 0 && (
        <div className="highlight-box blue">
          <div style={{ fontSize: 13, color: "#5090C0" }}>
            <i className="ti ti-info-circle" aria-hidden="true" /> Once you save this page and log your first jobs in <strong style={{ color: "#F0EBE0" }}>Job Tracker</strong>, this page will automatically show your real averages — job value, hours per job, material spend, profit margins, and more. No spreadsheets needed.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ jobs, bizGoals }) {
  const totalRev = jobs.reduce((s, j) => s + num(j.totalPrice), 0);
  const totalMat = jobs.reduce((s, j) => s + num(j.materialCost), 0);
  const totalOwnerLaborCost = jobs.reduce((s, j) => s + num(j.ownerHours) * num(j.ownerRate || bizGoals.ownerRate || 65), 0);
  const totalEmpLaborCost = jobs.reduce((s, j) => s + (j.employees || []).reduce((s2, e) => s2 + num(e.hours) * num(e.rate), 0), 0);
  const totalLaborCost = totalOwnerLaborCost + totalEmpLaborCost;
  const totalProfit = totalRev - totalMat - totalLaborCost;
  const avgMargin = totalRev > 0 ? (totalProfit / totalRev) * 100 : 0;
  const totalOwnerHrs = jobs.reduce((s, j) => s + num(j.ownerHours), 0);
  const totalEmpHrs = jobs.reduce((s, j) => s + (j.employees || []).reduce((s2, e) => s2 + num(e.hours), 0), 0);
  const jobCount = jobs.length;
  const avgJobValue = jobCount > 0 ? totalRev / jobCount : 0;
  const recentJobs = [...jobs].slice(-5).reverse();
  const targetMargin = num(bizGoals.targetMargin) || 45;
  const goal12mo = num(bizGoals.goal12mo);
  const currentAnnualRev = num(bizGoals.currentMonthlyRev) * 12 || totalRev;

  return (
    <div>
      <div className="page-title">{bizGoals.bizName ? `${bizGoals.bizName}` : "Business Dashboard"}</div>
      <div className="page-sub">{bizGoals.ownerName ? `${bizGoals.ownerName} · ` : ""}Real-time health overview of your welding & fabrication operation</div>

      {!bizGoals.bizName && (
        <div className="highlight-box blue" style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 13, color: "#5090C0" }}>
            <i className="ti ti-info-circle" aria-hidden="true" /> Head to <strong style={{ color: "#F0EBE0" }}>Business Setup</strong> to enter your goals and personalize every module.
          </div>
        </div>
      )}

      <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value orange">{fmtInt(totalRev)}</div>
          <div className="stat-sub">{jobCount} jobs tracked</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Net Profit</div>
          <div className={`stat-value ${totalProfit > 0 ? "good" : "bad"}`}>{fmtInt(totalProfit)}</div>
          <div className="stat-sub">After mat. & labor</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Margin</div>
          <div className={`stat-value ${avgMargin >= targetMargin ? "good" : avgMargin >= targetMargin * 0.7 ? "warn" : "bad"}`}>{pct(avgMargin)}</div>
          <div className="stat-sub">Target: {targetMargin}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Job Value</div>
          <div className="stat-value">{fmtInt(avgJobValue)}</div>
          <div className="stat-sub">{(totalOwnerHrs + totalEmpHrs).toFixed(0)} total hrs</div>
        </div>
      </div>

      {goal12mo > 0 && (
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div className="card-title"><i className="ti ti-flag" aria-hidden="true" /> 12-Month Goal Progress</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#8A7A60" }}>Tracked revenue toward {fmtInt(goal12mo)} goal</span>
            <span className="mono" style={{ fontSize: 13, color: ORANGE }}>{pct(Math.min(100, (totalRev / goal12mo) * 100))}</span>
          </div>
          <div className="progress-bar" style={{ height: 10 }}>
            <div className="progress-fill" style={{ width: `${Math.min(100, (totalRev / goal12mo) * 100)}%`, background: ORANGE }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 11, color: "#5A4A30" }}>{fmtInt(totalRev)} tracked</span>
            <span style={{ fontSize: 11, color: "#5A4A30" }}>{fmtInt(Math.max(0, goal12mo - totalRev))} remaining</span>
          </div>
        </div>
      )}

      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        <div className="card">
          <div className="card-title"><i className="ti ti-chart-pie" aria-hidden="true" /> Revenue Breakdown</div>
          {totalRev > 0 ? (
            [{ label: "Material Cost", val: totalMat, color: "#C85A00" },
             { label: "Owner Labor", val: totalOwnerLaborCost, color: "#D4A020" },
             { label: "Employee Labor", val: totalEmpLaborCost, color: "#5090C0" },
             { label: "Net Profit", val: Math.max(0, totalProfit), color: "#5DA85D" }]
            .map(({ label, val, color }) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 12, color: "#8A7A60" }}>{label}</span>
                  <span className="mono" style={{ fontSize: 12, color }}>{pct(totalRev > 0 ? (val / totalRev) * 100 : 0)} {fmtInt(val)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(100, totalRev > 0 ? (val / totalRev) * 100 : 0)}%`, background: color }} />
                </div>
              </div>
            ))
          ) : <div style={{ color: "#7A6A50", fontSize: 13 }}>No jobs tracked yet.</div>}
        </div>

        <div className="card">
          <div className="card-title"><i className="ti ti-clock" aria-hidden="true" /> Hours Summary</div>
          <div className="grid-2" style={{ marginBottom: "1rem" }}>
            <div>
              <div className="stat-label">Owner Hours</div>
              <div className="stat-value" style={{ fontSize: 22 }}>{totalOwnerHrs.toFixed(1)}</div>
              <div className="stat-sub">billed hrs</div>
            </div>
            <div>
              <div className="stat-label">Employee Hours</div>
              <div className="stat-value" style={{ fontSize: 22 }}>{totalEmpHrs.toFixed(1)}</div>
              <div className="stat-sub">billed hrs</div>
            </div>
          </div>
          <hr className="divider" />
          <div style={{ fontSize: 12, color: "#7A6A50" }}>Owner effective profit/hr</div>
          <div className="mono" style={{ fontSize: 18, color: "#F0EBE0", marginTop: 4 }}>
            {totalOwnerHrs > 0 ? fmt(totalProfit / totalOwnerHrs) : "$0.00"}<span style={{ fontSize: 12, color: "#7A6A50" }}>/hr</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-title"><i className="ti ti-list" aria-hidden="true" /> Recent Jobs</div>
        {recentJobs.length === 0 ? (
          <div style={{ color: "#7A6A50", fontSize: 13 }}>No jobs yet.</div>
        ) : (
          <table className="table">
            <thead><tr><th>Job</th><th>Type</th><th>Price</th><th>Material</th><th>Labor</th><th>Margin</th><th>Status</th></tr></thead>
            <tbody>
              {recentJobs.map((j, i) => {
                const empLC = (j.employees || []).reduce((s, e) => s + num(e.hours) * num(e.rate), 0);
                const ownerLC = num(j.ownerHours) * num(j.ownerRate || bizGoals.ownerRate || 65);
                const profit = num(j.totalPrice) - num(j.materialCost) - ownerLC - empLC;
                const m = num(j.totalPrice) > 0 ? (profit / num(j.totalPrice)) * 100 : 0;
                return (
                  <tr key={i}>
                    <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{j.name}</td>
                    <td style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{j.type}</td>
                    <td>{fmt(j.totalPrice)}</td>
                    <td>{fmt(j.materialCost)}</td>
                    <td>{fmtInt(ownerLC + empLC)}</td>
                    <td><span className={`tag ${m >= targetMargin ? "tag-green" : m >= targetMargin * 0.7 ? "tag-yellow" : "tag-red"}`}>{pct(m)}</span></td>
                    <td><span className={`tag ${j.status === "Completed" ? "tag-green" : j.status === "In Progress" ? "tag-orange" : "tag-gray"}`}>{j.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <AIInsight
        prompt={`${bizGoals.bizName || "Welding/fab"} business: revenue ${fmtInt(totalRev)}, net profit ${fmtInt(totalProfit)}, avg margin ${pct(avgMargin)}, ${jobCount} jobs, avg job value ${fmtInt(avgJobValue)}, ${totalOwnerHrs} owner hours, ${totalEmpHrs} employee hours. 12-month goal: ${fmtInt(goal12mo || 0)}. Stage: ${bizGoals.stage || "solo"}. Biggest challenge: ${bizGoals.bigChallenge || "unknown"}. What is my single most important priority right now?`}
        trigger="Get AI Health Analysis"
      />
    </div>
  );
}

// ─── JOB TRACKER with Material List ──────────────────────────────────────────
const blankMat = () => ({ id: Date.now() + Math.random(), desc: "", qty: "", unit: "ft", unitCost: "" });
const blankEmp = () => ({ id: Date.now() + Math.random(), name: "", role: "Welder", hours: "", rate: "" });

function MaterialList({ materials, setMaterials }) {
  const addLine = () => setMaterials(m => [...m, blankMat()]);
  const updLine = (id, k, v) => setMaterials(m => m.map(r => r.id === id ? { ...r, [k]: v } : r));
  const delLine = (id) => setMaterials(m => m.filter(r => r.id !== id));
  const total = materials.reduce((s, r) => s + num(r.qty) * num(r.unitCost), 0);

  return (
    <div style={{ marginTop: "1rem" }}>
      <div className="section-header">Material List</div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 80px 80px 90px 40px", gap: 6, marginBottom: 6 }}>
        {["Description / Item", "Qty", "Unit", "Unit Cost ($)", ""].map(h => (
          <div key={h} style={{ fontSize: 10, color: "#5A4A30", letterSpacing: "0.8px", textTransform: "uppercase" }}>{h}</div>
        ))}
      </div>
      {materials.map(r => (
        <div key={r.id} className="mat-line">
          <input value={r.desc} onChange={e => updLine(r.id, "desc", e.target.value)} placeholder='2" sq tube, 20ft length' />
          <input type="number" value={r.qty} onChange={e => updLine(r.id, "qty", e.target.value)} placeholder="2" />
          <select value={r.unit} onChange={e => updLine(r.id, "unit", e.target.value)} style={{ background: "#0F0C07", border: "1px solid #2E2410", borderRadius: 3, color: "#F0EBE0", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, padding: "6px 8px" }}>
            {UNITS.map(u => <option key={u}>{u}</option>)}
          </select>
          <input type="number" value={r.unitCost} onChange={e => updLine(r.id, "unitCost", e.target.value)} placeholder="12.50" />
          <button className="btn-danger" style={{ padding: "4px 6px" }} onClick={() => delLine(r.id)}>✕</button>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <button className="btn-ghost" style={{ fontSize: 11, padding: "5px 12px" }} onClick={addLine}>+ Add Material</button>
        <div style={{ fontSize: 13 }}>
          <span style={{ color: "#7A6A50" }}>Material Total: </span>
          <span className="mono" style={{ color: "#5DA85D", fontWeight: 600 }}>{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}

function EmployeeLines({ employees, setEmployees }) {
  const addEmp = () => setEmployees(e => [...e, blankEmp()]);
  const updEmp = (id, k, v) => setEmployees(e => e.map(r => r.id === id ? { ...r, [k]: v } : r));
  const delEmp = (id) => setEmployees(e => e.filter(r => r.id !== id));

  return (
    <div style={{ marginTop: "1rem" }}>
      <div className="section-header">Employee Labor on This Job</div>
      {employees.length === 0 && (
        <div style={{ fontSize: 12, color: "#5A4A30", marginBottom: 8 }}>No employees on this job — owner only. Add employees below if applicable.</div>
      )}
      {employees.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 80px 80px 80px 36px", gap: 6, marginBottom: 6 }}>
          {["Name", "Role", "Hours", "Rate ($/hr)", "Cost", ""].map(h => (
            <div key={h} style={{ fontSize: 10, color: "#5A4A30", letterSpacing: "0.8px", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
      )}
      {employees.map(e => {
        const cost = num(e.hours) * num(e.rate);
        return (
          <div key={e.id} className="emp-line">
            <input value={e.name} onChange={x => updEmp(e.id, "name", x.target.value)} placeholder="Employee name" />
            <select value={e.role} onChange={x => updEmp(e.id, "role", x.target.value)}>
              {["Welder","Fabricator","Helper","Apprentice","Finisher"].map(r => <option key={r}>{r}</option>)}
            </select>
            <input type="number" value={e.hours} onChange={x => updEmp(e.id, "hours", x.target.value)} placeholder="6" />
            <input type="number" value={e.rate} onChange={x => updEmp(e.id, "rate", x.target.value)} placeholder="22" />
            <span className="mono" style={{ fontSize: 12, color: "#D4A020", padding: "4px 0" }}>{cost > 0 ? fmt(cost) : "—"}</span>
            <button className="btn-danger" style={{ padding: "4px 6px" }} onClick={() => delEmp(e.id)}>✕</button>
          </div>
        );
      })}
      <button className="btn-ghost" style={{ fontSize: 11, padding: "5px 12px", marginTop: 8 }} onClick={addEmp}>+ Add Employee</button>
    </div>
  );
}

function JobTracker({ jobs, setJobs, bizGoals }) {
  const defaultOwnerRate = num(bizGoals.ownerRate) || 65;
  const blank = () => ({ name: "", type: "Railing", totalPrice: "", ownerHours: "", ownerRate: String(defaultOwnerRate), estHours: "", estCost: "", status: "Completed", notes: "", materials: [blankMat()], employees: [] });
  const [form, setForm] = useState(blank());
  const [adding, setAdding] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const matTotal = form.materials.reduce((s, r) => s + num(r.qty) * num(r.unitCost), 0);
  const empLaborCost = form.employees.reduce((s, e) => s + num(e.hours) * num(e.rate), 0);
  const ownerLaborCost = num(form.ownerHours) * num(form.ownerRate);
  const totalLaborCost = ownerLaborCost + empLaborCost;
  const price = num(form.totalPrice);
  const profit = price - matTotal - totalLaborCost;
  const margin = price > 0 ? (profit / price) * 100 : 0;
  const targetMargin = num(bizGoals.targetMargin) || 45;

  const save = () => {
    if (!form.name || !form.totalPrice) return;
    setJobs(j => [...j, { ...form, materialCost: matTotal, id: Date.now() }]);
    setForm(blank());
    setAdding(false);
  };

  const del = (id) => setJobs(j => j.filter(x => x.id !== id));

  return (
    <div>
      <div className="page-title">Job Tracker</div>
      <div className="page-sub">Track every job — materials, labor (owner + employees), margins, and status</div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
        <button className="btn" onClick={() => setAdding(a => !a)}>{adding ? "Cancel" : "+ Add Job"}</button>
      </div>

      {adding && (
        <div className="card" style={{ marginBottom: "1.5rem", borderColor: "#4A2E10" }}>
          <div className="card-title"><i className="ti ti-plus" aria-hidden="true" /> New Job</div>

          <div className="grid-2">
            <div className="input-row"><label>Job Name</label><input value={form.name} onChange={e => setF("name", e.target.value)} placeholder="e.g. Smith Residence Railing" /></div>
            <div className="input-row"><label>Job Type</label>
              <select value={form.type} onChange={e => setF("type", e.target.value)}>
                {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="input-row"><label>Total Price Charged ($)</label><input type="number" value={form.totalPrice} onChange={e => setF("totalPrice", e.target.value)} placeholder="1500" /></div>
            <div className="input-row"><label>Status</label>
              <select value={form.status} onChange={e => setF("status", e.target.value)}>
                <option>Quoted</option><option>In Progress</option><option>Completed</option><option>Invoiced</option><option>Paid</option>
              </select>
            </div>
            <div className="input-row"><label>Estimated Hours (for accuracy tracking)</label><input type="number" value={form.estHours} onChange={e => setF("estHours", e.target.value)} placeholder="10" /></div>
            <div className="input-row"><label>Estimated Total Cost ($) (optional)</label><input type="number" value={form.estCost} onChange={e => setF("estCost", e.target.value)} placeholder="800" /></div>
          </div>

          <div className="section-header" style={{ marginTop: "1rem" }}>Owner Labor</div>
          <div className="grid-2">
            <div className="input-row"><label>Owner Hours on This Job</label><input type="number" value={form.ownerHours} onChange={e => setF("ownerHours", e.target.value)} placeholder="8" /></div>
            <div className="input-row"><label>Owner Billing Rate ($/hr)</label><input type="number" value={form.ownerRate} onChange={e => setF("ownerRate", e.target.value)} /></div>
          </div>

          <MaterialList materials={form.materials} setMaterials={v => setF("materials", v)} />
          <EmployeeLines employees={form.employees} setEmployees={v => setF("employees", v)} />

          <div className="input-row" style={{ marginTop: "1rem" }}><label>Notes</label>
            <textarea rows={2} value={form.notes} onChange={e => setF("notes", e.target.value)} placeholder="Client info, special details, scope notes..." style={{ resize: "vertical" }} />
          </div>

          {price > 0 && (
            <div className={`highlight-box ${margin >= targetMargin ? "green" : margin >= targetMargin * 0.7 ? "yellow" : "red"}`} style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <div><div className="stat-label">Job Profit</div><div className="mono" style={{ fontSize: 18, color: profit > 0 ? "#5DA85D" : "#C84040" }}>{fmtInt(profit)}</div></div>
                <div><div className="stat-label">Margin</div><div className="mono" style={{ fontSize: 18 }}>{pct(margin)}</div></div>
                <div><div className="stat-label">Material</div><div className="mono" style={{ fontSize: 14 }}>{fmt(matTotal)}</div></div>
                <div><div className="stat-label">Owner Labor</div><div className="mono" style={{ fontSize: 14 }}>{fmt(ownerLaborCost)}</div></div>
                {empLaborCost > 0 && <div><div className="stat-label">Emp Labor</div><div className="mono" style={{ fontSize: 14 }}>{fmt(empLaborCost)}</div></div>}
                <div><div className="stat-label">Mat/Labor/Profit Split</div><div className="mono" style={{ fontSize: 13, color: "#8A7A60" }}>{pct(price > 0 ? (matTotal / price) * 100 : 0)} / {pct(price > 0 ? (totalLaborCost / price) * 100 : 0)} / {pct(margin)}</div></div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: "1rem" }}>
            <button className="btn" onClick={save}>Save Job</button>
            <button className="btn-ghost" onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title"><i className="ti ti-tool" aria-hidden="true" /> All Jobs ({jobs.length})</div>
        {jobs.length === 0 ? (
          <div style={{ color: "#7A6A50", fontSize: 13, padding: "1rem 0" }}>No jobs yet. Click "+ Add Job" to get started.</div>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Job</th><th>Type</th><th>Price</th><th>Material</th><th>Owner Labor</th><th>Emp Labor</th><th>Profit</th><th>Margin</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {jobs.map(j => {
                const empLC = (j.employees || []).reduce((s, e) => s + num(e.hours) * num(e.rate), 0);
                const ownerLC = num(j.ownerHours) * num(j.ownerRate || bizGoals.ownerRate || 65);
                const profit = num(j.totalPrice) - num(j.materialCost) - ownerLC - empLC;
                const m = num(j.totalPrice) > 0 ? (profit / num(j.totalPrice)) * 100 : 0;
                return (
                  <tr key={j.id}>
                    <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{j.name}</td>
                    <td style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{j.type}</td>
                    <td>{fmt(j.totalPrice)}</td>
                    <td>{fmt(j.materialCost)}</td>
                    <td style={{ color: "#D4A020" }}>{fmt(ownerLC)}</td>
                    <td style={{ color: "#5090C0" }}>{empLC > 0 ? fmt(empLC) : <span style={{ color: "#3A2E1A" }}>—</span>}</td>
                    <td style={{ color: profit > 0 ? "#5DA85D" : "#C84040" }}>{fmtInt(profit)}</td>
                    <td><span className={`tag ${m >= targetMargin ? "tag-green" : m >= targetMargin * 0.7 ? "tag-yellow" : "tag-red"}`}>{pct(m)}</span></td>
                    <td><span className={`tag ${j.status === "Completed" || j.status === "Paid" ? "tag-green" : j.status === "In Progress" ? "tag-orange" : "tag-gray"}`}>{j.status}</span></td>
                    <td><button className="btn-danger" onClick={() => del(j.id)}>✕</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── QUOTE BUILDER ────────────────────────────────────────────────────────────
function QuoteBuilder({ bizGoals }) {
  const [type, setType] = useState("Railing");
  const [linearFt, setLinearFt] = useState(20);
  const [complexity, setComplexity] = useState("standard");
  const [matPrice, setMatPrice] = useState(8);
  const [ownerRate, setOwnerRate] = useState(num(bizGoals.ownerRate) || 65);
  const [markup, setMarkup] = useState(2.5);
  const [installs, setInstalls] = useState(false);

  const matCost = linearFt * matPrice;
  const hrsBase = complexity === "basic" ? linearFt * 0.35 : complexity === "standard" ? linearFt * 0.55 : linearFt * 0.85;
  const laborCost = hrsBase * ownerRate;
  const installCost = installs ? linearFt * 12 : 0;
  const cogs = matCost + laborCost + installCost;
  const suggestedPrice = cogs * markup;
  const margin = ((suggestedPrice - cogs) / suggestedPrice) * 100;
  const targetMargin = num(bizGoals.targetMargin) || 45;

  return (
    <div>
      <div className="page-title">Quote Builder</div>
      <div className="page-sub">Build accurate, margin-aware quotes before sending to clients</div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title"><i className="ti ti-adjustments" aria-hidden="true" /> Job Parameters</div>
          <div className="input-row"><label>Job Type</label>
            <select value={type} onChange={e => setType(e.target.value)}>{JOB_TYPES.map(t => <option key={t}>{t}</option>)}</select>
          </div>
          <div className="slider-row"><label>Linear / Sq Feet</label><input type="range" min={1} max={200} step={1} value={linearFt} onChange={e => setLinearFt(Number(e.target.value))} /><span className="val">{linearFt} ft</span></div>
          <div className="input-row"><label>Complexity</label>
            <select value={complexity} onChange={e => setComplexity(e.target.value)}>
              <option value="basic">Basic / Straight</option>
              <option value="standard">Standard / Some Curves</option>
              <option value="custom">Custom / Decorative</option>
            </select>
          </div>
          <div className="slider-row"><label>Steel Price ($/ft)</label><input type="range" min={2} max={25} step={0.5} value={matPrice} onChange={e => setMatPrice(Number(e.target.value))} /><span className="val">${matPrice.toFixed(2)}</span></div>
          <div className="slider-row"><label>Owner Labor Rate ($/hr)</label><input type="range" min={35} max={150} step={5} value={ownerRate} onChange={e => setOwnerRate(Number(e.target.value))} /><span className="val">${ownerRate}/hr</span></div>
          <div className="slider-row"><label>Price Multiplier</label><input type="range" min={1.5} max={4} step={0.1} value={markup} onChange={e => setMarkup(Number(e.target.value))} /><span className="val">{markup.toFixed(1)}×</span></div>
          <div className="input-row"><label>Includes Installation?</label>
            <select value={installs ? "yes" : "no"} onChange={e => setInstalls(e.target.value === "yes")}>
              <option value="no">No — Pickup / Drop-off</option>
              <option value="yes">Yes — Include Install</option>
            </select>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-title"><i className="ti ti-receipt" aria-hidden="true" /> Quote Summary</div>
            <div className="grid-2" style={{ marginBottom: "1rem" }}>
              <div className="stat-card">
                <div className="stat-label">Suggested Price</div>
                <div className="stat-value orange">{fmtInt(suggestedPrice)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Your Margin</div>
                <div className={`stat-value ${margin >= targetMargin ? "good" : margin >= targetMargin * 0.7 ? "warn" : "bad"}`}>{pct(margin)}</div>
                <div className="stat-sub">Target: {targetMargin}%</div>
              </div>
            </div>
            {[{ label: "Material Cost", val: matCost, color: "#C85A00" },
              { label: "Labor Cost", val: laborCost, color: "#D4A020" },
              installs ? { label: "Installation", val: installCost, color: "#5DA85D" } : null]
              .filter(Boolean).map(row => (
                <div key={row.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, color: "#8A7A60" }}>{row.label}</span>
                    <span className="mono" style={{ fontSize: 12, color: row.color }}>{fmt(row.val)} ({pct((row.val / suggestedPrice) * 100)})</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(100, (row.val / suggestedPrice) * 100)}%`, background: row.color }} /></div>
                </div>
              ))}
            <hr className="divider" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "#8A7A60" }}>Est. Hours</span>
              <span className="mono" style={{ fontSize: 13 }}>{hrsBase.toFixed(1)} hrs</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 13, color: "#8A7A60" }}>Effective $/hr (net)</span>
              <span className="mono" style={{ fontSize: 13, color: "#5DA85D" }}>{fmt((suggestedPrice - matCost - installCost) / hrsBase)}/hr</span>
            </div>
          </div>
          <div className="highlight-box">
            <div style={{ fontSize: 12, color: "#C85A00", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Industry Benchmarks</div>
            <div style={{ fontSize: 12, color: "#C8B890" }}>
              Material should be <strong style={{ color: "#F0EBE0" }}>20–35%</strong> of job price<br />
              Labor should be <strong style={{ color: "#F0EBE0" }}>35–50%</strong> of job price<br />
              Target overall margin: <strong style={{ color: "#F0EBE0" }}>{targetMargin}%</strong> (your goal)
            </div>
          </div>
        </div>
      </div>

      <AIInsight
        prompt={`Quoting a ${type} job: ${linearFt}ft, ${complexity} complexity, material cost $${matCost.toFixed(0)}, labor ${hrsBase.toFixed(1)} hrs at $${ownerRate}/hr, suggested price $${suggestedPrice.toFixed(0)}, margin ${margin.toFixed(1)}%. My target margin is ${targetMargin}%. Am I pricing correctly?`}
        trigger="Get Quote Analysis"
      />
    </div>
  );
}

// ─── LABOR & HOURS (owner vs employees) ──────────────────────────────────────
function LaborHours({ jobs, bizGoals }) {
  const ownerRate = num(bizGoals.ownerRate) || 65;
  const desiredPay = num(bizGoals.ownerDesiredPay) || 65000;
  const maxOwnerHrs = num(bizGoals.maxOwnerHrs) || 50;

  const totalOwnerHrs = jobs.reduce((s, j) => s + num(j.ownerHours), 0);
  const totalRev = jobs.reduce((s, j) => s + num(j.totalPrice), 0);
  const totalMat = jobs.reduce((s, j) => s + num(j.materialCost), 0);
  const totalOwnerLC = jobs.reduce((s, j) => s + num(j.ownerHours) * num(j.ownerRate || ownerRate), 0);
  const totalEmpLC = jobs.reduce((s, j) => s + (j.employees || []).reduce((s2, e) => s2 + num(e.hours) * num(e.rate), 0), 0);
  const totalProfit = totalRev - totalMat - totalOwnerLC - totalEmpLC;
  const profitPerOwnerHr = totalOwnerHrs > 0 ? totalProfit / totalOwnerHrs : 0;

  const neededHrs = ownerRate > 0 ? desiredPay / ownerRate : 0;
  const availHrs = 48 * maxOwnerHrs * 0.75;
  const utilPct = totalOwnerHrs > 0 && availHrs > 0 ? Math.min(100, (totalOwnerHrs / availHrs) * 100) : 0;

  // Employee breakdown
  const empMap = {};
  jobs.forEach(j => {
    (j.employees || []).forEach(e => {
      if (!e.name) return;
      if (!empMap[e.name]) empMap[e.name] = { name: e.name, role: e.role, hours: 0, cost: 0, jobs: 0 };
      empMap[e.name].hours += num(e.hours);
      empMap[e.name].cost += num(e.hours) * num(e.rate);
      empMap[e.name].jobs += 1;
    });
  });
  const employees = Object.values(empMap);

  // Job type breakdown
  const typeMap = {};
  jobs.forEach(j => {
    if (!typeMap[j.type]) typeMap[j.type] = { count: 0, ownerHrs: 0, empHrs: 0, rev: 0 };
    typeMap[j.type].count++;
    typeMap[j.type].ownerHrs += num(j.ownerHours);
    typeMap[j.type].empHrs += (j.employees || []).reduce((s, e) => s + num(e.hours), 0);
    typeMap[j.type].rev += num(j.totalPrice);
  });

  return (
    <div>
      <div className="page-title">Labor & Hours</div>
      <div className="page-sub">Owner time value, employee labor tracking, and job-type efficiency</div>

      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        <div className="card">
          <div className="card-title"><i className="ti ti-user" aria-hidden="true" /> Owner Time Analysis</div>
          <div className="grid-2" style={{ marginBottom: "1rem" }}>
            <div className="stat-card">
              <div className="stat-label">Owner Hours Logged</div>
              <div className="stat-value orange">{totalOwnerHrs.toFixed(0)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Profit per Owner Hr</div>
              <div className={`stat-value ${profitPerOwnerHr >= 50 ? "good" : profitPerOwnerHr >= 30 ? "warn" : "bad"}`}>{profitPerOwnerHr > 0 ? fmt(profitPerOwnerHr) : "—"}</div>
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: "#8A7A60" }}>Billable utilization</span>
              <span className="mono" style={{ fontSize: 12 }}>{pct(utilPct)}</span>
            </div>
            <div className="progress-bar" style={{ height: 8 }}>
              <div className="progress-fill" style={{ width: `${utilPct}%`, background: utilPct >= 70 ? "#5DA85D" : utilPct >= 50 ? "#D4A020" : "#C84040" }} />
            </div>
          </div>
          <hr className="divider" />
          <div style={{ fontSize: 12, color: "#7A6A50" }}>Hours needed to hit {fmtInt(desiredPay)}/yr at ${ownerRate}/hr</div>
          <div className="mono" style={{ fontSize: 18, color: "#F0EBE0", marginTop: 4 }}>{Math.round(neededHrs)} hrs/yr
            <span style={{ fontSize: 12, color: "#7A6A50" }}> ({Math.round(neededHrs / 48)}/wk avg)</span>
          </div>
        </div>

        <div className="card">
          <div className="card-title"><i className="ti ti-users" aria-hidden="true" /> Employee Labor Summary</div>
          {employees.length === 0 ? (
            <div style={{ color: "#7A6A50", fontSize: 13 }}>No employee hours logged yet. Add employees when creating jobs.</div>
          ) : (
            <table className="table">
              <thead><tr><th>Name</th><th>Role</th><th>Jobs</th><th>Hrs</th><th>Total Cost</th><th>$/hr</th></tr></thead>
              <tbody>
                {employees.map((e, i) => (
                  <tr key={i}>
                    <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{e.name}</td>
                    <td style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{e.role}</td>
                    <td>{e.jobs}</td>
                    <td>{e.hours.toFixed(1)}</td>
                    <td style={{ color: "#5090C0" }}>{fmt(e.cost)}</td>
                    <td>{fmt(e.hours > 0 ? e.cost / e.hours : 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <hr className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "#7A6A50" }}>Total Employee Labor Cost</span>
            <span className="mono" style={{ fontSize: 13, color: "#5090C0" }}>{fmt(totalEmpLC)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 12, color: "#7A6A50" }}>Total Owner Labor Cost</span>
            <span className="mono" style={{ fontSize: 13, color: "#D4A020" }}>{fmt(totalOwnerLC)}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><i className="ti ti-chart-bar" aria-hidden="true" /> Hours by Job Type</div>
        {Object.keys(typeMap).length === 0 ? (
          <div style={{ color: "#7A6A50", fontSize: 13 }}>No jobs tracked yet.</div>
        ) : (
          <table className="table">
            <thead><tr><th>Type</th><th>Jobs</th><th>Owner Hrs</th><th>Emp Hrs</th><th>Revenue</th><th>Rev/Owner Hr</th></tr></thead>
            <tbody>
              {Object.entries(typeMap).sort((a, b) => b[1].rev - a[1].rev).map(([type, d]) => (
                <tr key={type}>
                  <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{type}</td>
                  <td>{d.count}</td>
                  <td>{d.ownerHrs.toFixed(1)}</td>
                  <td>{d.empHrs.toFixed(1)}</td>
                  <td>{fmtInt(d.rev)}</td>
                  <td style={{ color: "#5DA85D" }}>{d.ownerHrs > 0 ? fmt(d.rev / d.ownerHrs) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AIInsight
        prompt={`Welding/fab owner: ${totalOwnerHrs} hours logged, ${fmt(profitPerOwnerHr)}/hr profit. Desired pay: ${fmtInt(desiredPay)}/yr at $${ownerRate}/hr (needs ${Math.round(neededHrs)} hrs/yr). Employee labor cost: ${fmtInt(totalEmpLC)} across ${employees.length} workers. How effectively am I using my time and my employees?`}
        trigger="Analyze My Labor Efficiency"
      />
    </div>
  );
}

// ─── HIRE READY ───────────────────────────────────────────────────────────────
function HireReady({ jobs, bizGoals }) {
  const [empWage, setEmpWage] = useState(num(bizGoals.targetEmpWage) || 22);
  const [empHrsWeek, setEmpHrsWeek] = useState(40);
  const [empBurden, setEmpBurden] = useState(1.25);

  const currentMonthlyRev = num(bizGoals.currentMonthlyRev);
  const annualLaborCost = empWage * empHrsWeek * 52 * empBurden;
  const weeklyLaborCost = empWage * empHrsWeek * empBurden;
  const revenueNeeded = annualLaborCost / 0.35;
  const currentAnnualRev = currentMonthlyRev * 12;
  const gap = Math.max(0, revenueNeeded - currentAnnualRev);
  const readyPct = Math.min(100, revenueNeeded > 0 ? (currentAnnualRev / revenueNeeded) * 100 : 0);
  const empHrsLogged = jobs.reduce((s, j) => s + (j.employees || []).reduce((s2, e) => s2 + num(e.hours), 0), 0);
  const savingsMonths = num(bizGoals.savingsMonths) || 0;

  const checklistItems = [
    { label: `Monthly revenue consistently > ${fmtInt(revenueNeeded / 12)}`, done: currentMonthlyRev >= revenueNeeded / 12 },
    { label: "3+ months of operating expenses in reserve", done: savingsMonths >= 3 },
    { label: "Backlog of work exceeds 30 days", done: empHrsLogged > 120 || jobs.length > 10 },
    { label: "Turning down or delaying jobs due to capacity", done: false },
    { label: "5+ jobs tracked with clear profit margins", done: jobs.length >= 5 },
    { label: "Know your break-even labor rate", done: !!bizGoals.ownerRate },
    { label: "First hire role defined", done: !!bizGoals.firstHireRole },
    { label: "Annual revenue run-rate exceeds hire threshold", done: currentAnnualRev >= revenueNeeded },
  ];

  const readyScore = checklistItems.filter(i => i.done).length;

  return (
    <div>
      <div className="page-title">Hire Ready</div>
      <div className="page-sub">Know exactly when you can afford your first employee</div>

      {bizGoals.hireTargetMonth && (
        <div className="highlight-box blue" style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 13, color: "#5090C0" }}>
            <i className="ti ti-calendar" aria-hidden="true" /> Your hiring target: <strong style={{ color: "#F0EBE0" }}>{bizGoals.hireTargetMonth}</strong>
            {bizGoals.firstHireRole && <> — Role: <strong style={{ color: "#F0EBE0" }}>{bizGoals.firstHireRole}</strong></>}
          </div>
        </div>
      )}

      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        <div className="card">
          <div className="card-title"><i className="ti ti-calculator" aria-hidden="true" /> First Hire Calculator</div>
          <div className="slider-row"><label>Employee Hourly Wage</label><input type="range" min={15} max={45} step={1} value={empWage} onChange={e => setEmpWage(Number(e.target.value))} /><span className="val">${empWage}/hr</span></div>
          <div className="slider-row"><label>Hours per Week</label><input type="range" min={20} max={50} step={5} value={empHrsWeek} onChange={e => setEmpHrsWeek(Number(e.target.value))} /><span className="val">{empHrsWeek} hrs</span></div>
          <div className="slider-row"><label>Burden Rate (taxes etc.)</label><input type="range" min={1.1} max={1.5} step={0.05} value={empBurden} onChange={e => setEmpBurden(Number(e.target.value))} /><span className="val">{empBurden.toFixed(2)}×</span></div>
          <hr className="divider" />
          <div className="grid-2">
            <div className="stat-card">
              <div className="stat-label">Annual Employee Cost</div>
              <div className="stat-value" style={{ fontSize: 20 }}>{fmtInt(annualLaborCost)}</div>
              <div className="stat-sub">{fmtInt(weeklyLaborCost)}/wk burdened</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Revenue Needed to Hire</div>
              <div className="stat-value orange" style={{ fontSize: 20 }}>{fmtInt(revenueNeeded)}</div>
              <div className="stat-sub">Labor = 35% of revenue</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title"><i className="ti ti-speedometer" aria-hidden="true" /> Hire Readiness</div>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div style={{ fontSize: 64, fontFamily: "'Bebas Neue',sans-serif", color: readyPct >= 100 ? "#5DA85D" : readyPct >= 70 ? "#D4A020" : ORANGE, lineHeight: 1 }}>
              {Math.round(readyPct)}%
            </div>
            <div style={{ fontSize: 13, color: "#7A6A50" }}>of revenue threshold met</div>
          </div>
          <div className="progress-bar" style={{ height: 12, marginBottom: "1rem" }}>
            <div className="progress-fill" style={{ width: `${readyPct}%`, background: readyPct >= 100 ? "#5DA85D" : readyPct >= 70 ? "#D4A020" : ORANGE }} />
          </div>
          {gap > 0 ? (
            <div className="highlight-box yellow">
              <div style={{ fontSize: 13, color: "#D4A020" }}>Revenue gap: <strong style={{ color: "#F0EBE0" }}>{fmtInt(gap)}/yr</strong> ({fmtInt(gap / 12)}/mo) needed.</div>
            </div>
          ) : (
            <div className="highlight-box green">
              <div style={{ fontSize: 13, color: "#5DA85D" }}>Revenue supports a first hire! Review checklist to confirm readiness.</div>
            </div>
          )}
          <hr className="divider" />
          <div style={{ fontSize: 12, color: "#7A6A50" }}>Checklist: {readyScore}/{checklistItems.length} items met</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-title"><i className="ti ti-checklist" aria-hidden="true" /> Hire Readiness Checklist</div>
        {checklistItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < checklistItems.length - 1 ? "1px solid #1E1810" : "none" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.done ? "#1A3A1A" : "#2E2410", border: `1px solid ${item.done ? "#5DA85D" : "#3A2E1A"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {item.done && <i className="ti ti-check" style={{ fontSize: 12, color: "#5DA85D" }} aria-hidden="true" />}
            </div>
            <span style={{ fontSize: 13, color: item.done ? "#F0EBE0" : "#8A7A60" }}>{item.label}</span>
          </div>
        ))}
      </div>

      <AIInsight
        prompt={`Welding/fab owner: monthly revenue ${fmtInt(currentMonthlyRev)}, considering hiring ${bizGoals.firstHireRole || "an employee"} at $${empWage}/hr, ${empHrsWeek} hrs/wk (cost ${fmtInt(annualLaborCost)}/yr). Revenue needed: ${fmtInt(revenueNeeded)}/yr. Gap: ${fmtInt(gap)}/yr. Target hire date: ${bizGoals.hireTargetMonth || "unset"}. What steps should I take right now?`}
        trigger="Get Hiring Advice"
      />
    </div>
  );
}

// ─── SCALING GOALS (driven by intake) ────────────────────────────────────────
function ScalingGoals({ jobs, bizGoals }) {
  const [tab, setTab] = useState("goals");

  const currentMonthlyRev = num(bizGoals.currentMonthlyRev);
  const avgJobValue = num(bizGoals.avgJobValue) || 1200;
  const goal12mo = num(bizGoals.goal12mo);
  const goal3yr = num(bizGoals.goal3yr);
  const nextMilestone = num(bizGoals.nextMilestone);
  const currentAnnualRev = currentMonthlyRev * 12;

  const [growthTarget, setGrowthTarget] = useState(goal12mo > 0 ? Math.round(((goal12mo - currentAnnualRev) / Math.max(currentAnnualRev, 1)) * 100) : 20);
  const [timeframe, setTimeframe] = useState(12);

  const targetMonthlyRev = currentMonthlyRev * (1 + growthTarget / 100);
  const additionalRevNeeded = targetMonthlyRev - currentMonthlyRev;
  const additionalJobsNeeded = avgJobValue > 0 ? Math.ceil(additionalRevNeeded / avgJobValue) : 0;
  const currentJobsPerMonth = avgJobValue > 0 ? Math.round(currentMonthlyRev / avgJobValue) : 0;

  const defaultMilestones = [
    { label: "First $100K Year", value: 100000 },
    { label: "Hire First Employee", value: 120000 },
    { label: "$250K Revenue", value: 250000 },
    { label: "$500K Revenue", value: 500000 },
    { label: "$1M Revenue", value: 1000000 },
  ];

  const milestones = [
    bizGoals.nextMilestoneLabel && nextMilestone ? { label: bizGoals.nextMilestoneLabel, value: nextMilestone, custom: true } : null,
    goal12mo ? { label: "12-Month Goal", value: goal12mo, custom: true } : null,
    goal3yr ? { label: "3-Year Goal", value: goal3yr, custom: true } : null,
    ...defaultMilestones,
  ].filter(Boolean).reduce((acc, m) => {
    if (!acc.find(x => x.value === m.value)) acc.push(m);
    return acc;
  }, []).sort((a, b) => a.value - b.value);

  const serviceExpansion = [
    { category: "High Margin Additions", items: ["Powder coating add-on (25–40% margin boost)", "Decorative / artistic ironwork (55–72% margin)", "Mobile welding service ($85–150/hr)", "On-site welding repair ($95–140/hr)"] },
    { category: "Commercial Contracts", items: ["HOA contracts for railings & fences", "Restaurant / bar custom metal décor", "Construction sub-contracts", "Municipal / government RFPs"] },
    { category: "Additional Revenue Streams", items: ["Welding classes / instruction", "Sell fabricated products online (Etsy, local market)", "YouTube / social media monetization", "Referral partnerships with contractors"] },
  ];

  return (
    <div>
      <div className="page-title">Scaling Goals</div>
      <div className="page-sub">Your personalized growth roadmap based on the goals you set in Business Setup</div>

      {!bizGoals.goal12mo && (
        <div className="highlight-box blue" style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 13, color: "#5090C0" }}>
            <i className="ti ti-info-circle" aria-hidden="true" /> Set your revenue goals in <strong style={{ color: "#F0EBE0" }}>Business Setup</strong> to personalize this module.
          </div>
        </div>
      )}

      <div className="tab-row">
        <button className={`tab-btn ${tab === "goals" ? "active" : ""}`} onClick={() => setTab("goals")}>Growth Planner</button>
        <button className={`tab-btn ${tab === "milestones" ? "active" : ""}`} onClick={() => setTab("milestones")}>My Milestones</button>
        <button className={`tab-btn ${tab === "expansion" ? "active" : ""}`} onClick={() => setTab("expansion")}>Revenue Expansion</button>
      </div>

      {tab === "goals" && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title"><i className="ti ti-trending-up" aria-hidden="true" /> Growth Planner</div>
            {bizGoals.currentMonthlyRev ? (
              <div className="highlight-box" style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: 12, color: "#C85A00" }}>From your Business Setup: <strong style={{ color: "#F0EBE0" }}>{fmtInt(currentMonthlyRev)}/mo</strong> current · <strong style={{ color: "#F0EBE0" }}>{fmtInt(goal12mo)}</strong> annual goal</div>
              </div>
            ) : null}
            <div className="slider-row">
              <label>Growth Target (%)</label>
              <input type="range" min={5} max={150} step={5} value={growthTarget} onChange={e => setGrowthTarget(Number(e.target.value))} />
              <span className="val">{growthTarget}%</span>
            </div>
            <div className="slider-row">
              <label>Timeframe (months)</label>
              <input type="range" min={3} max={36} step={3} value={timeframe} onChange={e => setTimeframe(Number(e.target.value))} />
              <span className="val">{timeframe} mo</span>
            </div>
          </div>

          <div>
            <div className="grid-2" style={{ marginBottom: "1rem" }}>
              <div className="stat-card"><div className="stat-label">Target Monthly Rev</div><div className="stat-value orange">{fmtInt(targetMonthlyRev)}</div></div>
              <div className="stat-card"><div className="stat-label">Additional Needed</div><div className="stat-value">{fmtInt(additionalRevNeeded)}/mo</div></div>
              <div className="stat-card"><div className="stat-label">Current Jobs/Mo</div><div className="stat-value">{currentJobsPerMonth}</div></div>
              <div className="stat-card"><div className="stat-label">Target Jobs/Mo</div><div className="stat-value good">{currentJobsPerMonth + additionalJobsNeeded}</div></div>
            </div>
            <div className="highlight-box">
              <div style={{ fontSize: 12, color: "#C85A00", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>What it takes</div>
              <div style={{ fontSize: 13, color: "#C8B890", lineHeight: 1.7 }}>
                To grow <strong style={{ color: "#F0EBE0" }}>{growthTarget}%</strong> in {timeframe} months, you need <strong style={{ color: "#F0EBE0" }}>{additionalJobsNeeded} more jobs/month</strong> at {fmtInt(avgJobValue)} avg value, or raise your avg job value to <strong style={{ color: "#F0EBE0" }}>{fmtInt(targetMonthlyRev / Math.max(1, currentJobsPerMonth))}</strong>.
              </div>
            </div>
            <AIInsight
              prompt={`Welding/fab: current ${fmtInt(currentMonthlyRev)}/mo, target ${growthTarget}% growth in ${timeframe} months to ${fmtInt(targetMonthlyRev)}/mo. Need ${additionalJobsNeeded} more jobs/mo. Avg job value: ${fmtInt(avgJobValue)}. Services: ${bizGoals.topServices || "general welding"}. Customer type: ${bizGoals.customerType || "mixed"}. Top 3 most effective growth actions?`}
              trigger="Get Growth Strategy"
            />
          </div>
        </div>
      )}

      {tab === "milestones" && (
        <div className="card">
          <div className="card-title"><i className="ti ti-flag" aria-hidden="true" /> Revenue Milestones</div>
          {milestones.map((m, i) => {
            const reached = currentAnnualRev >= m.value;
            const isNext = !reached && milestones.slice(0, i).every(x => currentAnnualRev >= x.value);
            const progressPct = Math.min(100, (currentAnnualRev / m.value) * 100);
            return (
              <div key={i} style={{ padding: "1rem 0", borderBottom: i < milestones.length - 1 ? "1px solid #1E1810" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: reached ? "#1A3A1A" : isNext ? "#2A1A08" : "#1E1810", border: `1px solid ${reached ? "#5DA85D" : isNext ? ORANGE : "#2E2410"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {reached ? <i className="ti ti-check" style={{ fontSize: 14, color: "#5DA85D" }} aria-hidden="true" /> : isNext ? <i className="ti ti-arrow-right" style={{ fontSize: 14, color: ORANGE }} aria-hidden="true" /> : <span style={{ fontSize: 11, color: "#5A4A30" }}>{i + 1}</span>}
                    </div>
                    <span style={{ fontSize: 14, color: reached ? "#F0EBE0" : isNext ? "#F0EBE0" : "#7A6A50", fontWeight: isNext ? 500 : 400 }}>{m.label}</span>
                    {m.custom && <span className="tag tag-orange">Your Goal</span>}
                    {isNext && <span className="tag tag-blue">Next</span>}
                    {reached && <span className="tag tag-green">Achieved</span>}
                  </div>
                  <span className="mono" style={{ fontSize: 13, color: reached ? "#5DA85D" : "#8A7A60" }}>{fmtInt(m.value)}/yr</span>
                </div>
                {!reached && (
                  <div style={{ paddingLeft: 38 }}>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${progressPct}%`, background: isNext ? ORANGE : "#3A2E1A" }} /></div>
                    <div style={{ fontSize: 11, color: "#7A6A50", marginTop: 4 }}>{pct(progressPct)} · {fmtInt(m.value - currentAnnualRev)} remaining</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "expansion" && (
        <div>
          {serviceExpansion.map((section, i) => (
            <div className="card" key={i}>
              <div className="card-title"><i className="ti ti-bulb" aria-hidden="true" /> {section.category}</div>
              {section.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: j < section.items.length - 1 ? "1px solid #1E1810" : "none" }}>
                  <i className="ti ti-arrow-right" style={{ fontSize: 14, color: ORANGE, flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ fontSize: 13, color: "#C8B890" }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
          <AIInsight
            prompt={`Welding/fab shop: ${fmtInt(currentAnnualRev)}/yr, currently doing: ${bizGoals.topServices || "general welding"}, customer type: ${bizGoals.customerType || "mixed"}, stage: ${bizGoals.stage || "solo"}. 3-year goal: ${fmtInt(goal3yr || 0)}. What are the 3 highest ROI service expansions to pursue?`}
            trigger="Get Expansion Recommendations"
          />
        </div>
      )}
    </div>
  );
}

// ─── INDUSTRY STANDARDS ───────────────────────────────────────────────────────
function Industry() {
  const [tab, setTab] = useState("margins");

  const margins = [
    { label: "Simple Repairs / Tack Welds", range: "45–65%", note: "High volume, fast turnaround" },
    { label: "Standard Railings (straight)", range: "38–50%", note: "Competitive market, price carefully" },
    { label: "Custom Gates", range: "42–58%", note: "More custom = more margin" },
    { label: "Decorative / Artistic Ironwork", range: "55–72%", note: "Best margin category" },
    { label: "Structural Steel Fab", range: "28–42%", note: "Lower margin, higher volume" },
    { label: "Commercial / Industrial Jobs", range: "32–48%", note: "Often bid competitive" },
    { label: "Mobile / On-site Welding", range: "50–70%", note: "Charge for travel + premium rate" },
    { label: "Powder Coating (in-house)", range: "60–80%", note: "Best margin add-on" },
  ];

  const rates = [
    { label: "Solo Owner-Operator (rural)", range: "$45–75/hr" },
    { label: "Solo Owner-Operator (metro)", range: "$65–110/hr" },
    { label: "Shop Rate (employee + overhead)", range: "$75–135/hr" },
    { label: "Specialty / Certified Welder", range: "$90–160/hr" },
    { label: "Mobile Welding Premium", range: "$95–150/hr" },
    { label: "Emergency / After-hours", range: "$125–200/hr" },
  ];

  const kpis = [
    { label: "Job Profit Margin", target: "40–55%", warning: "<30%", desc: "Revenue minus material and labor" },
    { label: "Material as % of Job Price", target: "20–35%", warning: ">45%", desc: "Higher = pricing too low" },
    { label: "Labor as % of Job Price", target: "35–50%", warning: "<25%", desc: "Know your labor cost" },
    { label: "Billable Hour Utilization", target: "70–80%", warning: "<60%", desc: "Of available shop hours" },
    { label: "Quote Acceptance Rate", target: "60–75%", warning: "<40%", desc: "Too low = priced too high" },
    { label: "Revenue per Owner Hour", target: "$80–150", warning: "<$50", desc: "All-in productivity metric" },
    { label: "Avg Job Value (solo shop)", target: "$800–2,500", warning: "<$400", desc: "Optimize toward larger jobs" },
    { label: "Overhead as % of Revenue", target: "15–25%", warning: ">35%", desc: "Tools, shop, gas, insurance" },
  ];

  const practices = [
    { title: "Always quote before you start", body: "Never start a job without a written quote signed by the client. Include material markup (30–50%), labor estimate with buffer, and clearly defined scope." },
    { title: "Track every job's margin", body: "What gets measured gets managed. Even a simple log per job (material in, labor hours, price charged) reveals which job types make you money." },
    { title: "Price for complexity, not just time", body: "A custom decorative gate takes more skill than a straight railing. Charge 20–40% more for custom work — your expertise is worth it." },
    { title: "Material markup is non-negotiable", body: "Industry standard: 30–50% markup on materials. You're carrying sourcing risk, transport, and holding costs. Never pass material at cost." },
    { title: "Know your break-even rate", body: "Calculate: (monthly fixed costs / billable hours per month) + desired owner pay. Never quote below this floor." },
    { title: "Build a referral engine early", body: "80% of fab shops grow through word of mouth. Ask every satisfied client for one referral — a simple follow-up note pays massive dividends." },
    { title: "Specialize to escape the commodity trap", body: "Generic welding is a race to the bottom. Specializing in decorative ironwork, commercial fab, or a specific niche lets you charge 30–50% more for the same hours." },
    { title: "Protect your health & safety", body: "Wear PPE every job, no exceptions. Welding-related health costs and missed work are the #1 reason small fab shops close early." },
  ];

  return (
    <div>
      <div className="page-title">Industry Standards</div>
      <div className="page-sub">Welding & fabrication benchmarks, rates, KPIs, and best practices</div>

      <div className="tab-row">
        <button className={`tab-btn ${tab === "margins" ? "active" : ""}`} onClick={() => setTab("margins")}>Margins by Type</button>
        <button className={`tab-btn ${tab === "rates" ? "active" : ""}`} onClick={() => setTab("rates")}>Labor Rates</button>
        <button className={`tab-btn ${tab === "kpis" ? "active" : ""}`} onClick={() => setTab("kpis")}>KPI Targets</button>
        <button className={`tab-btn ${tab === "practices" ? "active" : ""}`} onClick={() => setTab("practices")}>Best Practices</button>
      </div>

      {tab === "margins" && (
        <div className="card">
          <div className="card-title"><i className="ti ti-percentage" aria-hidden="true" /> Industry Margin Benchmarks</div>
          {margins.map((m, i) => (
            <div key={i} className="industry-row">
              <div><div className="industry-label">{m.label}</div><div style={{ fontSize: 11, color: "#5A4A30", marginTop: 2 }}>{m.note}</div></div>
              <div className="industry-range">{m.range}</div>
            </div>
          ))}
          <div className="highlight-box" style={{ marginTop: "1rem" }}>
            <div style={{ fontSize: 12, color: "#8A7A60" }}>Margin = (Price − Material − Labor) ÷ Price. Add 10–15% overhead buffer on top of these targets.</div>
          </div>
        </div>
      )}

      {tab === "rates" && (
        <div className="card">
          <div className="card-title"><i className="ti ti-coin" aria-hidden="true" /> Market Labor Rates (US, 2024–2025)</div>
          {rates.map((r, i) => (
            <div key={i} className="industry-row">
              <div className="industry-label">{r.label}</div>
              <div className="industry-range">{r.range}</div>
            </div>
          ))}
          <div className="highlight-box" style={{ marginTop: "1rem" }}>
            <div style={{ fontSize: 12, color: "#8A7A60" }}>These are rates charged to clients — not take-home pay. Your effective hourly profit should be 40–60% of your billing rate after all costs.</div>
          </div>
        </div>
      )}

      {tab === "kpis" && (
        <div className="card">
          <div className="card-title"><i className="ti ti-gauge" aria-hidden="true" /> Key Performance Indicators</div>
          <table className="table">
            <thead><tr><th>Metric</th><th>Healthy Target</th><th>Warning Zone</th><th>What It Measures</th></tr></thead>
            <tbody>
              {kpis.map((k, i) => (
                <tr key={i}>
                  <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{k.label}</td>
                  <td><span className="tag tag-green">{k.target}</span></td>
                  <td><span className="tag tag-red">{k.warning}</span></td>
                  <td style={{ fontFamily: "'IBM Plex Sans',sans-serif", color: "#8A7A60" }}>{k.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "practices" && (
        <div>
          {practices.map((p, i) => (
            <div className="card" key={i}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: 3, background: "#2A1A08", border: "1px solid #4A2E10", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: ORANGE }}>{i + 1}</span>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#F0EBE0", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "#8A7A60", lineHeight: 1.7 }}>{p.body}</div>
                </div>
              </div>
            </div>
          ))}
          <AIInsight
            prompt="What are the top 3 mistakes small welding and fabrication shop owners make in their first 2 years that kill their business, and how do they avoid them?"
            trigger="Get AI Best Practice Analysis"
          />
        </div>
      )}
    </div>
  );
}

// ─── MONTHLY FINANCIAL TRACKER ───────────────────────────────────────────────
function MonthlyTracker({ jobs, bizGoals }) {
  const blankMonth = (label) => ({ label, grossSales: "", netProfit: "", cashOnHand: "", accountsReceivable: "", bookedWork: "", outstandingQuotes: "", notes: "" });
  const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const currentYear = new Date().getFullYear();
  const [months, setMonths] = useState(MONTH_LABELS.map(m => blankMonth(m)));
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const openEdit = (i) => { setEditIdx(i); setEditForm({ ...months[i] }); };
  const saveEdit = () => { setMonths(ms => ms.map((m, i) => i === editIdx ? { ...editForm } : m)); setEditIdx(null); setEditForm(null); };
  const setEF = (k, v) => setEditForm(f => ({ ...f, [k]: v }));

  // Auto-calc from jobs — group by month
  const jobsByMonth = {};
  jobs.forEach(j => {
    const mo = j.completedMonth || null;
    if (!mo) return;
    if (!jobsByMonth[mo]) jobsByMonth[mo] = [];
    jobsByMonth[mo].push(j);
  });

  // Summary stats from filled months
  const filled = months.filter(m => m.grossSales);
  const totalRevenue = filled.reduce((s, m) => s + num(m.grossSales), 0);
  const totalProfit = filled.reduce((s, m) => s + num(m.netProfit), 0);
  const avgMonthlyRev = filled.length > 0 ? totalRevenue / filled.length : 0;
  const avgMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const latestCash = [...months].reverse().find(m => m.cashOnHand)?.cashOnHand || 0;
  const totalAR = filled.reduce((s, m) => s + num(m.accountsReceivable), 0);
  const totalPipeline = filled.reduce((s, m) => s + num(m.outstandingQuotes) + num(m.bookedWork), 0);

  return (
    <div>
      <div className="page-title">Monthly Financials</div>
      <div className="page-sub">Track month-by-month performance — click any month to enter or update figures</div>

      <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
        <div className="stat-card"><div className="stat-label">YTD Revenue</div><div className="stat-value orange">{fmtInt(totalRevenue)}</div><div className="stat-sub">{filled.length} months logged</div></div>
        <div className="stat-card"><div className="stat-label">YTD Net Profit</div><div className={`stat-value ${totalProfit > 0 ? "good" : "bad"}`}>{fmtInt(totalProfit)}</div><div className="stat-sub">Avg margin {pct(avgMargin)}</div></div>
        <div className="stat-card"><div className="stat-label">Avg Monthly Revenue</div><div className="stat-value">{fmtInt(avgMonthlyRev)}</div><div className="stat-sub">per month tracked</div></div>
        <div className="stat-card"><div className="stat-label">Cash on Hand</div><div className="stat-value">{latestCash ? fmtInt(latestCash) : "—"}</div><div className="stat-sub">Most recent entry</div></div>
      </div>

      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        <div className="stat-card"><div className="stat-label">Accounts Receivable (YTD)</div><div className="stat-value warn">{fmtInt(totalAR)}</div><div className="stat-sub">Outstanding unpaid invoices</div></div>
        <div className="stat-card"><div className="stat-label">Pipeline Value</div><div className="stat-value">{fmtInt(totalPipeline)}</div><div className="stat-sub">Booked + outstanding quotes</div></div>
      </div>

      <div className="card">
        <div className="card-title"><i className="ti ti-calendar" aria-hidden="true" /> {currentYear} — Click Any Month to Update</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {months.map((m, i) => {
            const hasSales = !!m.grossSales;
            const margin = num(m.grossSales) > 0 ? (num(m.netProfit) / num(m.grossSales)) * 100 : 0;
            return (
              <div key={i} onClick={() => openEdit(i)} style={{ background: hasSales ? "#1E1A0E" : "#14100A", border: `1px solid ${hasSales ? "#3A2E10" : "#1E1810"}`, borderRadius: 4, padding: "0.875rem", cursor: "pointer", transition: "border-color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = ORANGE}
                onMouseLeave={e => e.currentTarget.style.borderColor = hasSales ? "#3A2E10" : "#1E1810"}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: hasSales ? ORANGE : "#5A4A30", marginBottom: 4 }}>{m.label}</div>
                {hasSales ? (
                  <>
                    <div className="mono" style={{ fontSize: 13, color: "#F0EBE0" }}>{fmtInt(m.grossSales)}</div>
                    <div className="mono" style={{ fontSize: 11, color: margin >= 40 ? "#5DA85D" : margin >= 25 ? "#D4A020" : "#C84040", marginTop: 2 }}>{pct(margin)} margin</div>
                    {m.cashOnHand && <div className="mono" style={{ fontSize: 11, color: "#7A6A50", marginTop: 2 }}>{fmtInt(m.cashOnHand)} cash</div>}
                  </>
                ) : (
                  <div style={{ fontSize: 11, color: "#3A2E1A" }}>tap to add</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {editIdx !== null && editForm && (
        <div className="card" style={{ borderColor: "#4A2E10", marginTop: "1rem" }}>
          <div className="card-title"><i className="ti ti-edit" aria-hidden="true" /> {editForm.label} — Enter Figures</div>
          <div style={{ fontSize: 12, color: "#5A4A30", marginBottom: "1rem", fontStyle: "italic" }}>Enter what you know — leave blank anything you track elsewhere (like QuickBooks AR).</div>
          <div className="grid-2">
            <div className="input-row"><label>Gross Sales ($)</label><input type="number" value={editForm.grossSales} onChange={e => setEF("grossSales", e.target.value)} placeholder="12000" /></div>
            <div className="input-row"><label>Net Profit ($)</label><input type="number" value={editForm.netProfit} onChange={e => setEF("netProfit", e.target.value)} placeholder="4800" /></div>
            <div className="input-row"><label>Cash on Hand ($)</label><input type="number" value={editForm.cashOnHand} onChange={e => setEF("cashOnHand", e.target.value)} placeholder="8500" /></div>
            <div className="input-row"><label>Accounts Receivable ($)</label><input type="number" value={editForm.accountsReceivable} onChange={e => setEF("accountsReceivable", e.target.value)} placeholder="2400" /></div>
            <div className="input-row"><label>Booked Work ($)</label><input type="number" value={editForm.bookedWork} onChange={e => setEF("bookedWork", e.target.value)} placeholder="5000" /></div>
            <div className="input-row"><label>Outstanding Quotes ($)</label><input type="number" value={editForm.outstandingQuotes} onChange={e => setEF("outstandingQuotes", e.target.value)} placeholder="3200" /></div>
          </div>
          <div className="input-row"><label>Notes</label><textarea rows={2} value={editForm.notes} onChange={e => setEF("notes", e.target.value)} placeholder="Anything notable this month..." style={{ resize: "vertical" }} /></div>
          {editForm.grossSales && editForm.netProfit && (
            <div className={`highlight-box ${num(editForm.netProfit)/num(editForm.grossSales)*100 >= 40 ? "green" : "yellow"}`}>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <div><div className="stat-label">Gross Margin</div><div className="mono" style={{ fontSize: 18 }}>{pct(num(editForm.netProfit)/num(editForm.grossSales)*100)}</div></div>
                <div><div className="stat-label">Material est.</div><div className="mono" style={{ fontSize: 14, color: "#8A7A60" }}>{fmtInt(num(editForm.grossSales)*0.28)} (28%)</div></div>
                <div><div className="stat-label">Pipeline total</div><div className="mono" style={{ fontSize: 14 }}>{fmtInt(num(editForm.bookedWork)+num(editForm.outstandingQuotes))}</div></div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: "1rem" }}>
            <button className="btn" onClick={saveEdit}>Save {editForm.label}</button>
            <button className="btn-ghost" onClick={() => { setEditIdx(null); setEditForm(null); }}>Cancel</button>
          </div>
        </div>
      )}

      <AIInsight
        prompt={`Welding/fab shop monthly financials: ${filled.length} months tracked, YTD revenue ${fmtInt(totalRevenue)}, YTD profit ${fmtInt(totalProfit)}, avg margin ${pct(avgMargin)}, avg monthly revenue ${fmtInt(avgMonthlyRev)}, cash on hand ${fmtInt(latestCash)}, pipeline ${fmtInt(totalPipeline)}. 12-month goal: ${fmtInt(num(bizGoals.goal12mo))}. What should I be watching most closely month to month?`}
        trigger="Get Monthly Finance Advice"
      />
    </div>
  );
}

// ─── SERVICE CATEGORY ANALYSIS ───────────────────────────────────────────────
function ServiceAnalysis({ jobs, bizGoals }) {
  const ownerRate = num(bizGoals.ownerRate) || 65;
  const targetMargin = num(bizGoals.targetMargin) || 45;

  const cats = {};
  JOB_TYPES.forEach(t => { cats[t] = { count: 0, revenue: 0, materialCost: 0, laborCost: 0, ownerHrs: 0, empHrs: 0, profits: [] }; });

  jobs.forEach(j => {
    const t = j.type || "Other";
    if (!cats[t]) return;
    const empLC = (j.employees || []).reduce((s, e) => s + num(e.hours) * num(e.rate), 0);
    const ownerLC = num(j.ownerHours) * num(j.ownerRate || ownerRate);
    const profit = num(j.totalPrice) - num(j.materialCost) - ownerLC - empLC;
    cats[t].count++;
    cats[t].revenue += num(j.totalPrice);
    cats[t].materialCost += num(j.materialCost);
    cats[t].laborCost += ownerLC + empLC;
    cats[t].ownerHrs += num(j.ownerHours);
    cats[t].empHrs += (j.employees || []).reduce((s, e) => s + num(e.hours), 0);
    cats[t].profits.push(profit);
  });

  const rows = Object.entries(cats)
    .filter(([, d]) => d.count > 0)
    .map(([type, d]) => {
      const avgMargin = d.revenue > 0 ? ((d.revenue - d.materialCost - d.laborCost) / d.revenue) * 100 : 0;
      const avgJobVal = d.count > 0 ? d.revenue / d.count : 0;
      const avgHrs = d.count > 0 ? (d.ownerHrs + d.empHrs) / d.count : 0;
      const revPerHr = (d.ownerHrs + d.empHrs) > 0 ? d.revenue / (d.ownerHrs + d.empHrs) : 0;
      const profitPerHr = (d.ownerHrs + d.empHrs) > 0 ? (d.revenue - d.materialCost - d.laborCost) / (d.ownerHrs + d.empHrs) : 0;
      return { type, ...d, avgMargin, avgJobVal, avgHrs, revPerHr, profitPerHr };
    })
    .sort((a, b) => b.avgMargin - a.avgMargin);

  const best = rows[0];
  const worst = rows[rows.length - 1];

  return (
    <div>
      <div className="page-title">Service Analysis</div>
      <div className="page-sub">Which job types make the most money, use the least time, and scale the best</div>

      {rows.length === 0 ? (
        <div className="highlight-box blue"><div style={{ fontSize: 13, color: "#5090C0" }}>Log jobs in the Job Tracker to see your service category breakdown here.</div></div>
      ) : (
        <>
          <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
            {best && (
              <div className="card" style={{ borderColor: "#1A4A1A" }}>
                <div className="card-title" style={{ color: "#5DA85D" }}><i className="ti ti-trophy" aria-hidden="true" /> Best Margin Category</div>
                <div style={{ fontSize: 20, fontWeight: 500, color: "#F0EBE0", marginBottom: 4 }}>{best.type}</div>
                <div className="mono" style={{ fontSize: 28, color: "#5DA85D" }}>{pct(best.avgMargin)}</div>
                <div style={{ fontSize: 12, color: "#7A6A50", marginTop: 4 }}>{best.count} jobs · {fmt(best.avgJobVal)} avg value · {best.avgHrs.toFixed(1)} avg hrs</div>
              </div>
            )}
            {worst && worst.type !== best?.type && (
              <div className="card" style={{ borderColor: "#4A1A1A" }}>
                <div className="card-title" style={{ color: "#C84040" }}><i className="ti ti-alert-triangle" aria-hidden="true" /> Lowest Margin Category</div>
                <div style={{ fontSize: 20, fontWeight: 500, color: "#F0EBE0", marginBottom: 4 }}>{worst.type}</div>
                <div className="mono" style={{ fontSize: 28, color: "#C84040" }}>{pct(worst.avgMargin)}</div>
                <div style={{ fontSize: 12, color: "#7A6A50", marginTop: 4 }}>{worst.count} jobs · {fmt(worst.avgJobVal)} avg value · {worst.avgHrs.toFixed(1)} avg hrs</div>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title"><i className="ti ti-chart-bar" aria-hidden="true" /> All Categories Ranked by Margin</div>
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Service Type</th><th>Jobs</th><th>Revenue</th><th>Avg Job</th><th>Avg Hrs</th>
                    <th>Rev/Hr</th><th>Profit/Hr</th><th>Avg Margin</th><th>vs Target</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const diff = r.avgMargin - targetMargin;
                    return (
                      <tr key={r.type}>
                        <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: i === 0 ? 600 : 400 }}>{r.type}</td>
                        <td>{r.count}</td>
                        <td>{fmtInt(r.revenue)}</td>
                        <td>{fmtInt(r.avgJobVal)}</td>
                        <td>{r.avgHrs.toFixed(1)}</td>
                        <td style={{ color: r.revPerHr >= 80 ? "#5DA85D" : r.revPerHr >= 50 ? "#D4A020" : "#C84040" }}>{fmt(r.revPerHr)}</td>
                        <td style={{ color: r.profitPerHr >= 40 ? "#5DA85D" : r.profitPerHr >= 20 ? "#D4A020" : "#C84040" }}>{fmt(r.profitPerHr)}</td>
                        <td><span className={`tag ${r.avgMargin >= targetMargin ? "tag-green" : r.avgMargin >= targetMargin * 0.7 ? "tag-yellow" : "tag-red"}`}>{pct(r.avgMargin)}</span></td>
                        <td><span className={`mono`} style={{ fontSize: 12, color: diff >= 0 ? "#5DA85D" : "#C84040" }}>{diff >= 0 ? "+" : ""}{pct(diff)}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><i className="ti ti-trending-up" aria-hidden="true" /> Category Margin vs Target</div>
            {rows.map((r, i) => (
              <div key={r.type} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "#C8B890" }}>{r.type} <span style={{ fontSize: 11, color: "#5A4A30" }}>({r.count} jobs)</span></span>
                  <span className="mono" style={{ fontSize: 12, color: r.avgMargin >= targetMargin ? "#5DA85D" : "#D4A020" }}>{pct(r.avgMargin)}</span>
                </div>
                <div style={{ position: "relative" }}>
                  <div className="progress-bar" style={{ height: 8 }}>
                    <div className="progress-fill" style={{ width: `${Math.min(100, r.avgMargin)}%`, background: r.avgMargin >= targetMargin ? "#5DA85D" : r.avgMargin >= targetMargin * 0.7 ? "#D4A020" : "#C84040" }} />
                  </div>
                  <div style={{ position: "absolute", top: 0, left: `${Math.min(100, targetMargin)}%`, width: 2, height: 8, background: "#5A4A30" }} />
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: "#5A4A30", marginTop: 8 }}>Vertical line = your {targetMargin}% target margin</div>
          </div>
        </>
      )}

      <AIInsight
        prompt={`Welding/fab service analysis: ${rows.map(r => r.type + " " + pct(r.avgMargin) + " margin " + r.count + " jobs").join(", ")}. Target margin: ${targetMargin}%. Best: ${best?.type || "none"}, worst: ${worst?.type || "none"}. Which categories should I focus on growing and which should I reconsider?`}
        trigger="Get Category Strategy"
      />
    </div>
  );
}

// ─── SHOP CAPACITY ────────────────────────────────────────────────────────────
function ShopCapacity({ jobs, bizGoals }) {
  const maxOwnerHrs = num(bizGoals.maxOwnerHrs) || 50;
  const [shopWeeks, setShopWeeks] = useState(48);
  const [fabricationPct, setFabricationPct] = useState(60);
  const [installPct, setInstallPct] = useState(25);
  const designPct = Math.max(0, 100 - fabricationPct - installPct);

  const availableOwnerHrs = shopWeeks * maxOwnerHrs;
  const billableTarget = availableOwnerHrs * 0.75;

  const totalOwnerHrs = jobs.reduce((s, j) => s + num(j.ownerHours), 0);
  const totalEmpHrs = jobs.reduce((s, j) => s + (j.employees || []).reduce((s2, e) => s2 + num(e.hours), 0), 0);
  const totalBillable = totalOwnerHrs + totalEmpHrs;
  const utilizationPct = billableTarget > 0 ? Math.min(100, (totalBillable / billableTarget) * 100) : 0;

  const fabricHrs = totalOwnerHrs * (fabricationPct / 100);
  const installHrs = totalOwnerHrs * (installPct / 100);
  const designHrs = totalOwnerHrs * (designPct / 100);

  const totalRev = jobs.reduce((s, j) => s + num(j.totalPrice), 0);
  const revPerHr = totalBillable > 0 ? totalRev / totalBillable : 0;

  // Capacity weeks — detect if consistently over capacity (simplified)
  const jobCount = jobs.length;
  const avgOwnerHrsPerJob = jobCount > 0 ? totalOwnerHrs / jobCount : 0;
  const jobsPerWeek = maxOwnerHrs > 0 ? maxOwnerHrs / Math.max(avgOwnerHrsPerJob, 1) : 0;
  const currentCapacityUsed = maxOwnerHrs > 0 ? Math.min(100, (avgOwnerHrsPerJob > 0 ? (totalOwnerHrs / (shopWeeks * maxOwnerHrs)) * 100 : 0)) : 0;

  const bottleneck = utilizationPct >= 85 ? "At or near capacity — hiring or outsourcing should be actively planned." :
    utilizationPct >= 70 ? "Healthy utilization. Watch for capacity ceiling as you grow." :
    utilizationPct >= 50 ? "Room to take on more work. Focus on filling the pipeline." :
    "Significant capacity available. Prioritize sales and marketing.";

  return (
    <div>
      <div className="page-title">Shop Capacity</div>
      <div className="page-sub">How much of your available time is sold, and where are the bottlenecks</div>

      <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
        <div className="stat-card">
          <div className="stat-label">Available Owner Hrs/Yr</div>
          <div className="stat-value">{Math.round(availableOwnerHrs).toLocaleString()}</div>
          <div className="stat-sub">{maxOwnerHrs} hrs/wk × {shopWeeks} wks</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sold Owner Hours</div>
          <div className="stat-value orange">{totalOwnerHrs.toFixed(0)}</div>
          <div className="stat-sub">logged across all jobs</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Utilization</div>
          <div className={`stat-value ${utilizationPct >= 70 ? "good" : utilizationPct >= 50 ? "warn" : "bad"}`}>{pct(utilizationPct)}</div>
          <div className="stat-sub">of billable target</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Revenue per Hr</div>
          <div className="stat-value">{revPerHr > 0 ? fmt(revPerHr) : "—"}</div>
          <div className="stat-sub">all labor combined</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        <div className="card">
          <div className="card-title"><i className="ti ti-adjustments" aria-hidden="true" /> Capacity Settings</div>
          <div className="slider-row">
            <label>Weeks worked per year</label>
            <input type="range" min={40} max={52} step={1} value={shopWeeks} onChange={e => setShopWeeks(Number(e.target.value))} />
            <span className="val">{shopWeeks} wks</span>
          </div>
          <div className="slider-row">
            <label>Fabrication time %</label>
            <input type="range" min={20} max={80} step={5} value={fabricationPct} onChange={e => setFabricationPct(Number(e.target.value))} />
            <span className="val">{fabricationPct}%</span>
          </div>
          <div className="slider-row">
            <label>Install / on-site time %</label>
            <input type="range" min={0} max={60} step={5} value={installPct} onChange={e => setInstallPct(Math.min(Number(e.target.value), 100 - fabricationPct))} />
            <span className="val">{installPct}%</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid #2E2410" }}>
            <span style={{ fontSize: 12, color: "#7A6A50" }}>Design / quoting / admin %</span>
            <span className="mono" style={{ fontSize: 13, color: designPct < 10 ? "#C84040" : "#F0EBE0" }}>{designPct}%</span>
          </div>
        </div>

        <div className="card">
          <div className="card-title"><i className="ti ti-layers" aria-hidden="true" /> Capacity Breakdown</div>
          {[
            { label: "Fabrication hours", hrs: fabricHrs, color: ORANGE },
            { label: "Install / on-site hours", hrs: installHrs, color: "#5090C0" },
            { label: "Design / admin hours", hrs: designHrs, color: "#7A6A50" },
          ].map(row => (
            <div key={row.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12, color: "#8A7A60" }}>{row.label}</span>
                <span className="mono" style={{ fontSize: 12, color: row.color }}>{row.hrs.toFixed(0)} hrs</span>
              </div>
              <div className="progress-bar" style={{ height: 8 }}>
                <div className="progress-fill" style={{ width: `${totalOwnerHrs > 0 ? (row.hrs / totalOwnerHrs) * 100 : 0}%`, background: row.color }} />
              </div>
            </div>
          ))}
          <hr className="divider" />
          <div style={{ fontSize: 12, color: "#8A7A60", marginBottom: 4 }}>Employee hours logged</div>
          <div className="mono" style={{ fontSize: 18 }}>{totalEmpHrs.toFixed(0)} <span style={{ fontSize: 12, color: "#7A6A50" }}>hrs ({jobCount} jobs)</span></div>
        </div>
      </div>

      <div className={`highlight-box ${utilizationPct >= 85 ? "red" : utilizationPct >= 70 ? "green" : utilizationPct >= 50 ? "yellow" : ""}`}>
        <div style={{ fontSize: 12, color: ORANGE, fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>Capacity Signal</div>
        <div style={{ fontSize: 13, color: "#C8B890" }}>{bottleneck}</div>
        {utilizationPct >= 85 && (
          <div style={{ fontSize: 12, color: "#C84040", marginTop: 8 }}>
            At {pct(utilizationPct)} utilization, you are approaching or exceeding your capacity ceiling. Every new job added without more labor increases your risk of delays, quality issues, and burnout.
          </div>
        )}
      </div>

      <AIInsight
        prompt={`Welding/fab shop capacity: ${maxOwnerHrs} hrs/wk available, ${totalOwnerHrs.toFixed(0)} owner hours sold, ${totalEmpHrs.toFixed(0)} employee hours, ${pct(utilizationPct)} utilization, ${fabricationPct}% fabrication / ${installPct}% install / ${designPct}% design-admin split. Revenue per hour: ${fmt(revPerHr)}. What are my capacity bottlenecks and what should I do about them?`}
        trigger="Analyze My Capacity"
      />
    </div>
  );
}

// ─── MATERIAL MANAGEMENT ──────────────────────────────────────────────────────
function MaterialMgmt({ jobs, bizGoals }) {
  const blankPurchase = () => ({ id: Date.now() + Math.random(), date: "", material: "", vendor: "", qty: "", unit: "ft", unitCost: "", totalCost: "", notes: "" });
  const [purchases, setPurchases] = useState([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blankPurchase());
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const [tab, setTab] = useState("overview");

  const save = () => {
    if (!form.material) return;
    const total = form.totalCost || (num(form.qty) * num(form.unitCost)).toFixed(2);
    setPurchases(p => [...p, { ...form, totalCost: total, id: Date.now() }]);
    setForm(blankPurchase());
    setAdding(false);
  };
  const del = (id) => setPurchases(p => p.filter(x => x.id !== id));

  // Material used from jobs
  const matFromJobs = [];
  jobs.forEach(j => {
    (j.materials || []).forEach(m => {
      if (m.desc) matFromJobs.push({ job: j.name, desc: m.desc, qty: num(m.qty), unit: m.unit, cost: num(m.qty) * num(m.unitCost) });
    });
  });

  const totalPurchased = purchases.reduce((s, p) => s + num(p.totalCost || (num(p.qty) * num(p.unitCost))), 0);
  const totalUsedInJobs = jobs.reduce((s, j) => s + num(j.materialCost), 0);
  const wasteEst = totalPurchased > 0 ? Math.max(0, ((totalPurchased - totalUsedInJobs) / totalPurchased) * 100) : 0;

  // Vendor breakdown
  const vendors = {};
  purchases.forEach(p => {
    if (!p.vendor) return;
    if (!vendors[p.vendor]) vendors[p.vendor] = { total: 0, count: 0 };
    vendors[p.vendor].total += num(p.totalCost || (num(p.qty) * num(p.unitCost)));
    vendors[p.vendor].count++;
  });

  // Material types
  const matTypes = {};
  purchases.forEach(p => {
    const key = p.material || "Other";
    if (!matTypes[key]) matTypes[key] = 0;
    matTypes[key] += num(p.totalCost || (num(p.qty) * num(p.unitCost)));
  });

  return (
    <div>
      <div className="page-title">Material Management</div>
      <div className="page-sub">Track steel and materials purchased vs used — stop bleeding profit through waste</div>

      <div className="tab-row">
        <button className={`tab-btn ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>Overview</button>
        <button className={`tab-btn ${tab === "purchases" ? "active" : ""}`} onClick={() => setTab("purchases")}>Purchase Log</button>
        <button className={`tab-btn ${tab === "usage" ? "active" : ""}`} onClick={() => setTab("usage")}>Job Material Usage</button>
      </div>

      {tab === "overview" && (
        <>
          <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
            <div className="stat-card"><div className="stat-label">Total Purchased</div><div className="stat-value orange">{fmtInt(totalPurchased)}</div><div className="stat-sub">{purchases.length} purchase entries</div></div>
            <div className="stat-card"><div className="stat-label">Used in Jobs</div><div className="stat-value good">{fmtInt(totalUsedInJobs)}</div><div className="stat-sub">from job material lists</div></div>
            <div className="stat-card"><div className="stat-label">Est. Waste/Scrap</div><div className={`stat-value ${wasteEst <= 10 ? "good" : wasteEst <= 20 ? "warn" : "bad"}`}>{pct(wasteEst)}</div><div className="stat-sub">industry target: under 10%</div></div>
            <div className="stat-card"><div className="stat-label">Unaccounted Material</div><div className="stat-value warn">{fmtInt(Math.max(0, totalPurchased - totalUsedInJobs))}</div><div className="stat-sub">reusable drops + waste</div></div>
          </div>

          {Object.keys(vendors).length > 0 && (
            <div className="card" style={{ marginBottom: "1rem" }}>
              <div className="card-title"><i className="ti ti-building-store" aria-hidden="true" /> Vendor Spend</div>
              <table className="table">
                <thead><tr><th>Vendor</th><th>Purchases</th><th>Total Spend</th><th>Avg Order</th></tr></thead>
                <tbody>
                  {Object.entries(vendors).sort((a, b) => b[1].total - a[1].total).map(([v, d]) => (
                    <tr key={v}>
                      <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{v}</td>
                      <td>{d.count}</td>
                      <td>{fmtInt(d.total)}</td>
                      <td>{fmtInt(d.total / d.count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {Object.keys(matTypes).length > 0 && (
            <div className="card">
              <div className="card-title"><i className="ti ti-box" aria-hidden="true" /> Material Type Breakdown</div>
              {Object.entries(matTypes).sort((a, b) => b[1] - a[1]).map(([mat, total]) => (
                <div key={mat} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 13, color: "#C8B890" }}>{mat}</span>
                    <span className="mono" style={{ fontSize: 12, color: ORANGE }}>{fmtInt(total)}</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${totalPurchased > 0 ? (total / totalPurchased) * 100 : 0}%`, background: ORANGE }} /></div>
                </div>
              ))}
            </div>
          )}

          {purchases.length === 0 && (
            <div className="highlight-box blue"><div style={{ fontSize: 13, color: "#5090C0" }}>Start logging material purchases to track your steel spend, waste percentage, and vendor costs. Each job already tracks material usage — purchases here let you compare what you bought vs. what you billed.</div></div>
          )}
        </>
      )}

      {tab === "purchases" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
            <button className="btn" onClick={() => setAdding(a => !a)}>{adding ? "Cancel" : "+ Log Purchase"}</button>
          </div>
          {adding && (
            <div className="card" style={{ marginBottom: "1rem", borderColor: "#4A2E10" }}>
              <div className="card-title"><i className="ti ti-plus" aria-hidden="true" /> New Purchase</div>
              <div className="grid-2">
                <div className="input-row"><label>Material / Item</label><input value={form.material} onChange={e => setF("material", e.target.value)} placeholder="2 sq tube steel" /></div>
                <div className="input-row"><label>Vendor / Supplier</label><input value={form.vendor} onChange={e => setF("vendor", e.target.value)} placeholder="Metal Supply Co." /></div>
                <div className="input-row"><label>Date</label><input type="date" value={form.date} onChange={e => setF("date", e.target.value)} /></div>
                <div className="input-row"><label>Unit</label>
                  <select value={form.unit} onChange={e => setF("unit", e.target.value)}>{["ft","lbs","each","sheets","m","kg"].map(u => <option key={u}>{u}</option>)}</select>
                </div>
                <div className="input-row"><label>Quantity</label><input type="number" value={form.qty} onChange={e => setF("qty", e.target.value)} placeholder="40" /></div>
                <div className="input-row"><label>Unit Cost ($)</label><input type="number" value={form.unitCost} onChange={e => setF("unitCost", e.target.value)} placeholder="4.50" /></div>
                <div className="input-row"><label>Total Cost ($) — or leave blank to auto-calc</label><input type="number" value={form.totalCost} onChange={e => setF("totalCost", e.target.value)} placeholder={form.qty && form.unitCost ? (num(form.qty) * num(form.unitCost)).toFixed(2) : ""} /></div>
                <div className="input-row"><label>Notes</label><input value={form.notes} onChange={e => setF("notes", e.target.value)} placeholder="Price increase from last month, etc." /></div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={save}>Save Purchase</button>
                <button className="btn-ghost" onClick={() => setAdding(false)}>Cancel</button>
              </div>
            </div>
          )}
          <div className="card">
            <div className="card-title"><i className="ti ti-receipt" aria-hidden="true" /> Purchase Log ({purchases.length})</div>
            {purchases.length === 0 ? (
              <div style={{ color: "#7A6A50", fontSize: 13 }}>No purchases logged yet.</div>
            ) : (
              <table className="table">
                <thead><tr><th>Date</th><th>Material</th><th>Vendor</th><th>Qty</th><th>Unit Cost</th><th>Total</th><th>Notes</th><th></th></tr></thead>
                <tbody>
                  {purchases.map(p => (
                    <tr key={p.id}>
                      <td>{p.date || "—"}</td>
                      <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{p.material}</td>
                      <td style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{p.vendor || "—"}</td>
                      <td>{p.qty} {p.unit}</td>
                      <td>{p.unitCost ? fmt(p.unitCost) : "—"}</td>
                      <td style={{ color: ORANGE }}>{fmtInt(p.totalCost || num(p.qty) * num(p.unitCost))}</td>
                      <td style={{ fontFamily: "'IBM Plex Sans',sans-serif", maxWidth: 120 }}>{p.notes || "—"}</td>
                      <td><button className="btn-danger" onClick={() => del(p.id)}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {tab === "usage" && (
        <div className="card">
          <div className="card-title"><i className="ti ti-tool" aria-hidden="true" /> Material Used per Job</div>
          {matFromJobs.length === 0 ? (
            <div style={{ color: "#7A6A50", fontSize: 13 }}>No material line items found. Add materials when logging jobs.</div>
          ) : (
            <table className="table">
              <thead><tr><th>Job</th><th>Material</th><th>Qty</th><th>Unit</th><th>Cost</th></tr></thead>
              <tbody>
                {matFromJobs.map((m, i) => (
                  <tr key={i}>
                    <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{m.job}</td>
                    <td style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{m.desc}</td>
                    <td>{m.qty}</td>
                    <td>{m.unit}</td>
                    <td style={{ color: ORANGE }}>{fmt(m.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <AIInsight
        prompt={`Welding/fab material management: ${purchases.length} purchase entries totaling ${fmtInt(totalPurchased)}, job material cost ${fmtInt(totalUsedInJobs)}, estimated waste ${pct(wasteEst)}. How can I reduce material waste and better manage steel costs?`}
        trigger="Get Material Cost Advice"
      />
    </div>
  );
}

// ─── QUOTE PIPELINE ───────────────────────────────────────────────────────────
function QuotePipeline({ bizGoals }) {
  const blankQ = () => ({ id: Date.now() + Math.random(), client: "", jobType: "Railing", value: "", sentDate: "", status: "Pending", notes: "" });
  const [quotes, setQuotes] = useState([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blankQ());
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.client || !form.value) return;
    setQuotes(q => [...q, { ...form, id: Date.now() }]);
    setForm(blankQ());
    setAdding(false);
  };
  const del = (id) => setQuotes(q => q.filter(x => x.id !== id));
  const upd = (id, k, v) => setQuotes(q => q.map(x => x.id === id ? { ...x, [k]: v } : x));

  const total = quotes.length;
  const won = quotes.filter(q => q.status === "Won").length;
  const lost = quotes.filter(q => q.status === "Lost").length;
  const pending = quotes.filter(q => q.status === "Pending").length;
  const acceptanceRate = (won + lost) > 0 ? (won / (won + lost)) * 100 : 0;

  const totalValue = quotes.reduce((s, q) => s + num(q.value), 0);
  const wonValue = quotes.filter(q => q.status === "Won").reduce((s, q) => s + num(q.value), 0);
  const pendingValue = quotes.filter(q => q.status === "Pending").reduce((s, q) => s + num(q.value), 0);
  const avgQuoteValue = total > 0 ? totalValue / total : 0;

  const goal12mo = num(bizGoals.goal12mo);
  const quotesNeededPerMonth = goal12mo > 0 && avgQuoteValue > 0 && acceptanceRate > 0
    ? Math.ceil((goal12mo / 12) / (avgQuoteValue * (acceptanceRate / 100)))
    : null;

  return (
    <div>
      <div className="page-title">Quote Pipeline</div>
      <div className="page-sub">Track every quote sent — won, lost, and pending — so you always know your close rate and pipeline value</div>

      <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
        <div className="stat-card"><div className="stat-label">Total Quotes</div><div className="stat-value orange">{total}</div><div className="stat-sub">{won} won · {lost} lost · {pending} pending</div></div>
        <div className="stat-card"><div className="stat-label">Close Rate</div><div className={`stat-value ${acceptanceRate >= 60 ? "good" : acceptanceRate >= 40 ? "warn" : "bad"}`}>{(won + lost) > 0 ? pct(acceptanceRate) : "—"}</div><div className="stat-sub">industry target: 60–75%</div></div>
        <div className="stat-card"><div className="stat-label">Pipeline (Pending)</div><div className="stat-value">{fmtInt(pendingValue)}</div><div className="stat-sub">{pending} open quotes</div></div>
        <div className="stat-card"><div className="stat-label">Revenue Won</div><div className="stat-value good">{fmtInt(wonValue)}</div><div className="stat-sub">avg quote {fmtInt(avgQuoteValue)}</div></div>
      </div>

      {quotesNeededPerMonth && (
        <div className="highlight-box" style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 12, color: ORANGE, fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>Goal Calculator</div>
          <div style={{ fontSize: 13, color: "#C8B890" }}>
            To hit your {fmtInt(goal12mo)}/yr goal at your current {pct(acceptanceRate)} close rate and {fmtInt(avgQuoteValue)} avg quote value, you need to send approximately <strong style={{ color: "#F0EBE0" }}>{quotesNeededPerMonth} quotes per month</strong>.
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button className="btn" onClick={() => setAdding(a => !a)}>{adding ? "Cancel" : "+ Log Quote"}</button>
      </div>

      {adding && (
        <div className="card" style={{ marginBottom: "1rem", borderColor: "#4A2E10" }}>
          <div className="card-title"><i className="ti ti-plus" aria-hidden="true" /> New Quote</div>
          <div className="grid-2">
            <div className="input-row"><label>Client / Business Name</label><input value={form.client} onChange={e => setF("client", e.target.value)} placeholder="Smith Residence" /></div>
            <div className="input-row"><label>Job Type</label>
              <select value={form.jobType} onChange={e => setF("jobType", e.target.value)}>{JOB_TYPES.map(t => <option key={t}>{t}</option>)}</select>
            </div>
            <div className="input-row"><label>Quote Value ($)</label><input type="number" value={form.value} onChange={e => setF("value", e.target.value)} placeholder="1800" /></div>
            <div className="input-row"><label>Date Sent</label><input type="date" value={form.sentDate} onChange={e => setF("sentDate", e.target.value)} /></div>
            <div className="input-row"><label>Status</label>
              <select value={form.status} onChange={e => setF("status", e.target.value)}>
                <option>Pending</option><option>Won</option><option>Lost</option><option>Expired</option>
              </select>
            </div>
            <div className="input-row"><label>Notes</label><input value={form.notes} onChange={e => setF("notes", e.target.value)} placeholder="Why won or lost, follow-up needed, etc." /></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={save}>Save Quote</button>
            <button className="btn-ghost" onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title"><i className="ti ti-file-invoice" aria-hidden="true" /> All Quotes ({quotes.length})</div>
        {quotes.length === 0 ? (
          <div style={{ color: "#7A6A50", fontSize: 13, padding: "0.5rem 0" }}>No quotes logged yet. Track every quote you send to see your close rate and pipeline value.</div>
        ) : (
          <table className="table">
            <thead><tr><th>Client</th><th>Type</th><th>Value</th><th>Sent</th><th>Status</th><th>Notes</th><th></th></tr></thead>
            <tbody>
              {quotes.map(q => (
                <tr key={q.id}>
                  <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{q.client}</td>
                  <td style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{q.jobType}</td>
                  <td style={{ color: ORANGE }}>{fmt(q.value)}</td>
                  <td>{q.sentDate || "—"}</td>
                  <td>
                    <select value={q.status} onChange={e => upd(q.id, "status", e.target.value)}
                      style={{ background: "#0F0C07", border: "1px solid #2E2410", borderRadius: 3, color: q.status === "Won" ? "#5DA85D" : q.status === "Lost" ? "#C84040" : q.status === "Pending" ? "#D4A020" : "#8A7A60", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, padding: "3px 6px" }}>
                      <option>Pending</option><option>Won</option><option>Lost</option><option>Expired</option>
                    </select>
                  </td>
                  <td style={{ fontFamily: "'IBM Plex Sans',sans-serif", maxWidth: 140, fontSize: 11 }}>{q.notes || "—"}</td>
                  <td><button className="btn-danger" onClick={() => del(q.id)}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AIInsight
        prompt={`Welding/fab quote pipeline: ${total} quotes sent, ${won} won, ${lost} lost, ${pending} pending. Close rate: ${pct(acceptanceRate)}, avg quote value: ${fmtInt(avgQuoteValue)}, pending pipeline: ${fmtInt(pendingValue)}. 12-month goal: ${fmtInt(num(bizGoals.goal12mo))}. How should I improve my close rate and quote strategy?`}
        trigger="Get Quote Pipeline Advice"
      />
    </div>
  );
}

// ─── ESTIMATING ACCURACY ──────────────────────────────────────────────────────
function EstimatingAccuracy({ jobs, bizGoals }) {
  const jobsWithEst = jobs.filter(j => j.estHours || j.estCost);
  const ownerRate = num(bizGoals.ownerRate) || 65;

  const rows = jobsWithEst.map(j => {
    const empLC = (j.employees || []).reduce((s, e) => s + num(e.hours) * num(e.rate), 0);
    const ownerLC = num(j.ownerHours) * num(j.ownerRate || ownerRate);
    const actualCost = num(j.materialCost) + ownerLC + empLC;
    const actualHrs = num(j.ownerHours) + (j.employees || []).reduce((s, e) => s + num(e.hours), 0);
    const estHrs = num(j.estHours);
    const estCost = num(j.estCost);
    const hrsVariance = estHrs > 0 ? ((actualHrs - estHrs) / estHrs) * 100 : null;
    const costVariance = estCost > 0 ? ((actualCost - estCost) / estCost) * 100 : null;
    return { ...j, actualCost, actualHrs, hrsVariance, costVariance };
  });

  const avgHrsVariance = rows.filter(r => r.hrsVariance !== null).length > 0
    ? rows.filter(r => r.hrsVariance !== null).reduce((s, r) => s + r.hrsVariance, 0) / rows.filter(r => r.hrsVariance !== null).length : null;
  const avgCostVariance = rows.filter(r => r.costVariance !== null).length > 0
    ? rows.filter(r => r.costVariance !== null).reduce((s, r) => s + r.costVariance, 0) / rows.filter(r => r.costVariance !== null).length : null;

  const accuracyScore = avgHrsVariance !== null ? Math.max(0, 100 - Math.abs(avgHrsVariance)) : null;

  const note = avgHrsVariance === null ? null :
    avgHrsVariance > 15 ? "You are consistently under-estimating hours. This is the most common cause of thin margins in fab shops." :
    avgHrsVariance < -15 ? "You are consistently over-estimating hours. Your quotes may be too high and costing you jobs." :
    avgHrsVariance > 5 ? "Slightly under-estimating hours on average. Add a 10% buffer to your hour estimates." :
    "Strong estimating accuracy. Your quotes closely match your actual time.";

  return (
    <div>
      <div className="page-title">Estimating Accuracy</div>
      <div className="page-sub">Compare what you estimated vs. what jobs actually cost — find where you lose money on paper before it hits your wallet</div>

      <div className="highlight-box blue" style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 13, color: "#5090C0" }}>
          <i className="ti ti-info-circle" aria-hidden="true" /> To track accuracy, add estimated hours and estimated cost when logging jobs in the Job Tracker. This module compares those estimates to your actual time and material costs automatically.
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
        <div className="stat-card">
          <div className="stat-label">Jobs with Estimates</div>
          <div className="stat-value orange">{jobsWithEst.length}</div>
          <div className="stat-sub">of {jobs.length} total jobs</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Hours Variance</div>
          <div className={`stat-value ${avgHrsVariance === null ? "" : Math.abs(avgHrsVariance) <= 10 ? "good" : Math.abs(avgHrsVariance) <= 20 ? "warn" : "bad"}`}>
            {avgHrsVariance !== null ? (avgHrsVariance >= 0 ? "+" : "") + pct(avgHrsVariance) : "—"}
          </div>
          <div className="stat-sub">{avgHrsVariance !== null ? (avgHrsVariance > 0 ? "over actual" : "under actual") : "no data yet"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Cost Variance</div>
          <div className={`stat-value ${avgCostVariance === null ? "" : Math.abs(avgCostVariance) <= 10 ? "good" : Math.abs(avgCostVariance) <= 20 ? "warn" : "bad"}`}>
            {avgCostVariance !== null ? (avgCostVariance >= 0 ? "+" : "") + pct(avgCostVariance) : "—"}
          </div>
          <div className="stat-sub">{avgCostVariance !== null ? (avgCostVariance > 0 ? "over estimate" : "under estimate") : "no data yet"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Accuracy Score</div>
          <div className={`stat-value ${accuracyScore === null ? "" : accuracyScore >= 85 ? "good" : accuracyScore >= 70 ? "warn" : "bad"}`}>
            {accuracyScore !== null ? Math.round(accuracyScore) + "%" : "—"}
          </div>
          <div className="stat-sub">100% = perfect</div>
        </div>
      </div>

      {note && (
        <div className={`highlight-box ${Math.abs(avgHrsVariance) <= 10 ? "green" : Math.abs(avgHrsVariance) <= 20 ? "yellow" : "red"}`} style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 13, color: "#C8B890" }}>{note}</div>
        </div>
      )}

      <div className="card">
        <div className="card-title"><i className="ti ti-chart-line" aria-hidden="true" /> Job-by-Job Accuracy</div>
        {rows.length === 0 ? (
          <div style={{ color: "#7A6A50", fontSize: 13 }}>No jobs with estimates yet. Add estimated hours and cost when logging jobs to start tracking accuracy.</div>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Job</th><th>Type</th><th>Est Hrs</th><th>Act Hrs</th><th>Hrs Variance</th><th>Est Cost</th><th>Act Cost</th><th>Cost Variance</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: "#F0EBE0", fontFamily: "'IBM Plex Sans',sans-serif" }}>{r.name}</td>
                  <td style={{ fontFamily: "'IBM Plex Sans',sans-serif" }}>{r.type}</td>
                  <td>{r.estHours || "—"}</td>
                  <td>{r.actualHrs.toFixed(1)}</td>
                  <td style={{ color: r.hrsVariance === null ? "#5A4A30" : Math.abs(r.hrsVariance) <= 10 ? "#5DA85D" : Math.abs(r.hrsVariance) <= 20 ? "#D4A020" : "#C84040" }}>
                    {r.hrsVariance !== null ? (r.hrsVariance >= 0 ? "+" : "") + pct(r.hrsVariance) : "—"}
                  </td>
                  <td>{r.estCost ? fmtInt(r.estCost) : "—"}</td>
                  <td>{fmtInt(r.actualCost)}</td>
                  <td style={{ color: r.costVariance === null ? "#5A4A30" : Math.abs(r.costVariance) <= 10 ? "#5DA85D" : Math.abs(r.costVariance) <= 20 ? "#D4A020" : "#C84040" }}>
                    {r.costVariance !== null ? (r.costVariance >= 0 ? "+" : "") + pct(r.costVariance) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AIInsight
        prompt={`Welding/fab estimating accuracy: ${jobsWithEst.length} jobs with estimates. Avg hours variance: ${avgHrsVariance !== null ? pct(avgHrsVariance) : "no data"}. Avg cost variance: ${avgCostVariance !== null ? pct(avgCostVariance) : "no data"}. Accuracy score: ${accuracyScore !== null ? Math.round(accuracyScore) + "%" : "no data"}. How do I improve my job estimating and stop losing money on underbid jobs?`}
        trigger="Get Estimating Advice"
      />
    </div>
  );
}


// ─── DEFAULT GOALS ────────────────────────────────────────────────────────────
const DEFAULT_GOALS = {
  bizName: "", ownerName: "", stage: "solo", yearsInBiz: "",
  currentMonthlyRev: "", monthlyOverhead: "", ownerDesiredPay: "", ownerRate: "65",
  avgJobValue: "", savingsMonths: "", goal12mo: "", goal3yr: "",
  nextMilestone: "", nextMilestoneLabel: "",
  hireTargetMonth: "", targetEmpWage: "22", firstHireRole: "", hireRevGoal: "",
  topServices: "", customerType: "mixed", targetMargin: "45", maxOwnerHrs: "50",
  bigChallenge: "tracking", notes: "",
};

const SAMPLE_JOBS = [
  { id: 1, name: "Johnson Residence Railing", type: "Railing", totalPrice: 1850, materialCost: 420, ownerHours: 12, ownerRate: 65, status: "Completed", notes: "", employees: [], materials: [{ id: 1, desc: "1.5\" sq tube 20ft", qty: 4, unit: "each", unitCost: 62 }, { id: 2, desc: "Flat bar 1x3/16", qty: 20, unit: "ft", unitCost: 2.1 }] },
  { id: 2, name: "Commercial Dumpster Doors", type: "Dumpster Door", totalPrice: 2400, materialCost: 680, ownerHours: 14, ownerRate: 65, status: "Completed", notes: "", employees: [], materials: [{ id: 3, desc: "2\" sq tube 24ft", qty: 6, unit: "each", unitCost: 80 }, { id: 4, desc: "Expanded metal sheet", qty: 2, unit: "sheets", unitCost: 110 }] },
  { id: 3, name: "Smith Pool Gate", type: "Gate", totalPrice: 1200, materialCost: 280, ownerHours: 7, ownerRate: 65, status: "Completed", notes: "", employees: [], materials: [{ id: 5, desc: "1\" sq tube", qty: 12, unit: "ft", unitCost: 8 }, { id: 6, desc: "Gate latch hardware", qty: 1, unit: "each", unitCost: 45 }] },
  { id: 4, name: "Decorative Fire Grate Set", type: "Fire Grate", totalPrice: 650, materialCost: 120, ownerHours: 4, ownerRate: 65, status: "Completed", notes: "", employees: [], materials: [{ id: 7, desc: "Round bar 1/2\"", qty: 15, unit: "ft", unitCost: 4.5 }] },
  { id: 5, name: "Restaurant Wall Art Brackets", type: "Decorative Household", totalPrice: 975, materialCost: 160, ownerHours: 6, ownerRate: 65, status: "Invoiced", notes: "", employees: [], materials: [{ id: 8, desc: "Flat bar 2x1/4", qty: 18, unit: "ft", unitCost: 3.2 }, { id: 9, desc: "Mounting hardware", qty: 8, unit: "each", unitCost: 6 }] },
];

export default function App() {
  const [page, setPage] = useState("intake");
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  const [bizGoals, setBizGoals] = useState(DEFAULT_GOALS);
  const setupDone = !!bizGoals.bizName;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="top-bar">
          <div className="logo">FORGE<span>CHECK</span></div>
          <nav className="nav">
            {PAGES.map(p => (
              <button
                key={p.id}
                className={`nav-btn ${page === p.id ? "active" : ""} ${p.id === "intake" && !setupDone ? "setup-dot" : ""}`}
                onClick={() => setPage(p.id)}
              >
                <i className={`ti ${p.icon}`} aria-hidden="true" /> {p.label}
              </button>
            ))}
          </nav>
        </div>
        {!setupDone && page !== "intake" && (
          <div className="setup-banner">
            <span><i className="ti ti-info-circle" aria-hidden="true" /> Complete your Business Setup to personalize goals, targets, and AI advice across all modules.</span>
            <button className="btn-sm btn" onClick={() => setPage("intake")}>Go to Setup →</button>
          </div>
        )}
        <div className="main">
          {page === "intake" && <Intake bizGoals={bizGoals} setBizGoals={setBizGoals} jobs={jobs} />}
          {page === "dashboard" && <Dashboard jobs={jobs} bizGoals={bizGoals} />}
          {page === "jobs" && <JobTracker jobs={jobs} setJobs={setJobs} bizGoals={bizGoals} />}
          {page === "monthly" && <MonthlyTracker jobs={jobs} bizGoals={bizGoals} />}
          {page === "quotes-pipe" && <QuotePipeline bizGoals={bizGoals} />}
          {page === "service" && <ServiceAnalysis jobs={jobs} bizGoals={bizGoals} />}
          {page === "capacity" && <ShopCapacity jobs={jobs} bizGoals={bizGoals} />}
          {page === "materials" && <MaterialMgmt jobs={jobs} bizGoals={bizGoals} />}
          {page === "labor" && <LaborHours jobs={jobs} bizGoals={bizGoals} />}
          {page === "estimating" && <EstimatingAccuracy jobs={jobs} bizGoals={bizGoals} />}
          {page === "hire" && <HireReady jobs={jobs} bizGoals={bizGoals} />}
          {page === "scaling" && <ScalingGoals jobs={jobs} bizGoals={bizGoals} />}
          {page === "quote-build" && <QuoteBuilder bizGoals={bizGoals} />}
          {page === "industry" && <Industry />}
        </div>
      </div>
    </>
  );
}
