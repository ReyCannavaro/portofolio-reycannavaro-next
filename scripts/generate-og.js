const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const photoPath = path.join(__dirname, "../public/images/profile.png");
let photoDataUri = "";
if (fs.existsSync(photoPath)) {
  const photoBase64 = fs.readFileSync(photoPath).toString("base64");
  photoDataUri = `data:image/png;base64,${photoBase64}`;
}

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 1200px;
      height: 630px;
      background: #080808;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #fff;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* Blueprint hairline grid */
    .grid-bg {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 0;
    }
    .m-stripe {
      display: flex;
      height: 6px;
      width: 100%;
      position: relative;
      z-index: 10;
    }
    .m-c1 { flex: 1; background: #0066B1; }
    .m-c2 { flex: 1; background: #001E50; }
    .m-c3 { flex: 1; background: #E00000; }

    .header-bar {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 52px 0;
    }
    .header-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: Consolas, Monaco, monospace;
      font-size: 12px;
      letter-spacing: 2px;
      color: #71717A;
      text-transform: uppercase;
    }
    .live-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #0066B1;
      box-shadow: 0 0 10px #0066B1;
    }
    .domain-pill {
      font-family: Consolas, Monaco, monospace;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #fff;
      padding: 5px 14px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.04);
      text-transform: uppercase;
    }

    .main-body {
      position: relative;
      z-index: 10;
      display: flex;
      gap: 44px;
      padding: 10px 52px 0;
      align-items: center;
    }
    .left-col {
      flex: 1;
      min-width: 0;
    }
    .profile-row {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 20px;
    }
    .profile-avatar {
      width: 110px;
      height: 110px;
      border: 2px solid rgba(255, 255, 255, 0.15);
      object-fit: cover;
      flex-shrink: 0;
    }
    .profile-info {
      flex: 1;
    }
    .role-badge {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2.5px;
      color: #38bdf8;
      text-transform: uppercase;
      font-family: Consolas, Monaco, monospace;
      margin-bottom: 6px;
      display: block;
    }
    .main-name {
      font-size: 42px;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -1px;
      text-transform: uppercase;
      color: #fff;
    }
    .main-name span {
      color: #a1a1aa;
    }
    .sub-title {
      font-size: 14px;
      color: #94a3b8;
      margin-top: 6px;
    }

    .narrative {
      font-size: 15px;
      line-height: 1.5;
      color: #d4d4d8;
      margin-bottom: 22px;
      max-width: 620px;
    }

    .badges-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .spec-pill {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      padding: 6px 12px;
      text-transform: uppercase;
      font-family: Consolas, Monaco, monospace;
    }
    .pill-blue {
      border: 1px solid #0066B1;
      background: rgba(0, 102, 177, 0.16);
      color: #38bdf8;
    }
    .pill-red {
      border: 1px solid #E00000;
      background: rgba(224, 0, 0, 0.16);
      color: #f87171;
    }
    .pill-zinc {
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.05);
      color: #e4e4e7;
    }

    .tech-stack {
      font-family: Consolas, Monaco, monospace;
      font-size: 11px;
      color: #71717a;
      letter-spacing: 0.5px;
    }

    .right-col {
      width: 380px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .spec-card {
      background: #101010;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 16px 20px;
      position: relative;
    }
    .spec-card-featured {
      background: #101010;
      border: 1px solid #0066B1;
      box-shadow: inset 0 0 20px rgba(0, 102, 177, 0.15);
    }
    .spec-val {
      font-size: 34px;
      font-weight: 800;
      line-height: 1;
      color: #fff;
    }
    .spec-val-blue {
      color: #38bdf8;
    }
    .spec-lbl {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #71717a;
      text-transform: uppercase;
      margin-top: 5px;
    }
    .spec-lbl-blue {
      color: #0066B1;
    }
    .spec-desc {
      font-size: 11px;
      color: #a1a1aa;
      margin-top: 3px;
    }

    .footer-bar {
      position: relative;
      z-index: 10;
      height: 44px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 52px;
      font-family: Consolas, Monaco, monospace;
      font-size: 11px;
      color: #71717a;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="grid-bg"></div>

  <!-- BMW M Tricolor Stripe -->
  <div class="m-stripe">
    <div class="m-c1"></div>
    <div class="m-c2"></div>
    <div class="m-c3"></div>
  </div>

  <!-- Header Bar -->
  <div class="header-bar">
    <div class="header-meta">
      <span class="live-dot"></span>
      OFFICIAL ENGINEERING PORTFOLIO // ID-SDA
    </div>
    <div class="domain-pill">REYCANNAVARO.DEV</div>
  </div>

  <!-- Main Body Grid -->
  <div class="main-body">
    <div class="left-col">
      <div class="profile-row">
        <img src="${photoDataUri}" alt="Reyjuno Al Cannavaro" class="profile-avatar">
        <div class="profile-info">
          <span class="role-badge">FULLSTACK DEVELOPER &amp; SOFTWARE ENGINEER</span>
          <h1 class="main-name">REY<span>CANNA</span>VARO</h1>
          <p class="sub-title">Quantum Leap Team Lead &middot; SMK Telkom Sidoarjo (SIJA)</p>
        </div>
      </div>

      <p class="narrative">
        Enterprise ERP &amp; HRIS Systems, Climate-Adaptive IoT with Predictive AI, and Clean Architectural Engineering.
      </p>

      <div class="badges-row">
        <span class="spec-pill pill-blue">LEAD TIM &middot; 6 ENTERPRISE HRIS</span>
        <span class="spec-pill pill-red">JUARA 3 NASIONAL JHIC 2026</span>
        <span class="spec-pill pill-zinc">TOP 10 MAGE 12 ITS</span>
      </div>

      <div class="tech-stack">
        CORE: NEXT.JS 16 &middot; LARAVEL 11 &middot; VUE.JS &middot; TYPESCRIPT &middot; POSTGRESQL &middot; TIMESCALEDB &middot; ESP32
      </div>
    </div>

    <div class="right-col">
      <div class="spec-card">
        <div class="spec-val">10+</div>
        <div class="spec-lbl">PRODUCTION PROJECTS</div>
        <div class="spec-desc">Enterprise ERP, Web Portals, IoT Telemetry</div>
      </div>

      <div class="spec-card">
        <div class="spec-val">15+</div>
        <div class="spec-lbl">NATIONAL AWARDS &amp; HONORS</div>
        <div class="spec-desc">4x National Tech Podiums &middot; Garuda Honor</div>
      </div>

      <div class="spec-card spec-card-featured">
        <div class="spec-val spec-val-blue">6 CLIENTS</div>
        <div class="spec-lbl spec-lbl-blue">ENTERPRISE HRIS MAINTENANCE</div>
        <div class="spec-desc">Temprina Jawa Pos, MSC, Kilang Padi, dkk.</div>
      </div>
    </div>
  </div>

  <!-- Footer Bar -->
  <div class="footer-bar">
    <div>LOCATION: SIDOARJO, INDONESIA // STATUS: AVAILABLE FOR WORK</div>
    <div>ENGINEERING THE CORE // BMW M BRUTALIST AESTHETIC</div>
  </div>
</body>
</html>
`;

const htmlFilePath = path.join(__dirname, "../public/og-template.html");
fs.writeFileSync(htmlFilePath, htmlContent, "utf8");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ogOutputPath = path.join(__dirname, "../public/og-image.png");

const cmd = `"${chromePath}" --headless=new --disable-gpu --force-device-scale-factor=1 --window-size=1200,630 --hide-scrollbars --screenshot="${ogOutputPath}" "${htmlFilePath}"`;

console.log("Generating OpenGraph banner with Chrome headless...");
execSync(cmd, { stdio: "inherit" });

if (fs.existsSync(ogOutputPath)) {
  const stats = fs.statSync(ogOutputPath);
  console.log(`OpenGraph image generated successfully: ${ogOutputPath} (${stats.size} bytes)`);
} else {
  console.error("Failed to generate og-image.png");
}

// Clean up temporary template
fs.unlinkSync(htmlFilePath);
