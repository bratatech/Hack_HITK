// src/components/reporter/Gamification.jsx
import React, { useMemo, useRef } from "react";

/* Centered popup for LinkedIn/Facebook share */
function openCentered(url, w = 740, h = 720) {
  const dualScreenLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualScreenTop = window.screenTop ?? window.screenY ?? 0;
  const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
  const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;
  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  const win = window.open(url, "_blank", `scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`);
  if (win) win.focus();
}

/* Convert inline SVG to PNG without extra deps */
async function svgToPngBlob(svgEl, scale = 2) {
  const xml = new XMLSerializer().serializeToString(svgEl);
  const svg64 = btoa(unescape(encodeURIComponent(xml)));
  const src = `data:image/svg+xml;base64,${svg64}`;
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();

  const w = svgEl.viewBox.baseVal.width || svgEl.clientWidth || 1000;
  const h = svgEl.viewBox.baseVal.height || svgEl.clientHeight || 600;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise((res) => canvas.toBlob(res, "image/png", 0.95));
  return blob;
}

/* 3D tilt for certificate */
function useTilt() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * 8;
    const ry = (px - 0.5) * -8;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)"; };
  return { ref, onMove, onLeave };
}

export default function Gamification() {
  const certRef = useRef(null);
  const tilt = useTilt();

  const today = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const name = "Eco Hero"; // plug real user here if you have it
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

  const caption =
    `🏆 Environmental Champion – ${name}\n\n` +
    `Recognized by EcoSphere for reporting incidents and protecting our oceans.\n` +
    `#EcoSphere #OceanAction #Sustainability #ClimateAction`;

  const onDownload = async () => {
    try {
      const blob = await svgToPngBlob(certRef.current, 2);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "EcoSphere-Certificate.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Could not create PNG. Please try again.");
    }
  };

  const shareDevice = async () => {
    try {
      const blob = await svgToPngBlob(certRef.current, 2);
      const file = new File([blob], "EcoSphere-Certificate.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "EcoSphere Impact Certificate", text: caption });
      } else {
        await navigator.clipboard.writeText(caption);
        alert("Caption copied. Download the PNG and share it from your device.");
      }
    } catch {
      alert("Sharing not supported here. Use Download PNG instead.");
    }
  };

  const shareLinkedIn = async () => {
    try { await navigator.clipboard.writeText(caption); } catch {}
    openCentered(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
  };
  const shareFacebook = () => {
    openCentered(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
  };
  const shareInstagram = async () => {
    try {
      const blob = await svgToPngBlob(certRef.current, 2);
      const file = new File([blob], "EcoSphere-Certificate.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "EcoSphere Impact Certificate", text: caption });
        return;
      }
    } catch {}
    await navigator.clipboard.writeText(caption).catch(() => {});
    alert("Instagram on desktop doesn’t support direct share. Caption copied—download PNG and post it.");
  };

  /* Leaderboard demo data for progress bars/medals */
  const leaderboard = [
    { id: 21, name: "Aarav", city: "Your City", pts: 210 },
    { id: 47, name: "You",   city: "Your City", pts: 120 },
    { id: 33, name: "Maya",  city: "Your City", pts: 80  },
  ];
  const maxPts = Math.max(...leaderboard.map(d => d.pts));
  const medalDot = (i) => {
    const cls = i === 0 ? "metal-gold" : i === 1 ? "metal-silver" : "metal-bronze";
    return <div className={`w-7 h-7 rounded-full ${cls} inner-soft shadow-card`} />;
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* ====== YOUR ORIGINAL BADGES (unchanged) ====== */}
      <div className="rounded-2xl border border-navy/15 pastel-lav panel-shadow p-5">
        <div className="text-navy font-medium">Badges</div>
        <div className="text-sm text-navy/70 mb-3">Achievement gallery</div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/90 border border-navy/10 p-3 text-center">
            <div className="text-2xl">🥇</div>
            <div className="text-sm font-semibold mt-1">First Report</div>
            <div className="text-xs text-navy/60">Unlocked</div>
          </div>
          <div className="rounded-xl bg-white/90 border border-navy/10 p-3 text-center">
            <div className="text-2xl">🌊</div>
            <div className="text-sm font-semibold mt-1">Ocean Ally</div>
            <div className="text-xs text-navy/60">Unlocked</div>
          </div>
          <div className="rounded-xl bg-white/90 border border-navy/10 p-3 text-center opacity-70">
            <div className="text-2xl">🔟</div>
            <div className="text-sm font-semibold mt-1">10 Reports</div>
            <div className="text-xs text-navy/60">Locked</div>
          </div>
          <div className="rounded-xl bg-white/90 border border-navy/10 p-3 text-center opacity-70">
            <div className="text-2xl">⚡</div>
            <div className="text-sm font-semibold mt-1">Rapid Responder</div>
            <div className="text-xs text-navy/60">Locked</div>
          </div>
        </div>
      </div>

      {/* ====== UPGRADED LEADERBOARD (kept) ====== */}
      <div className="rounded-2xl p-5 bg-leader shadow-card">
        <div className="text-navy font-semibold">Leaderboard (city)</div>
        <div className="text-sm text-navy/70 mb-4">Friendly competition</div>

        <ul className="space-y-3">
          {leaderboard.map((p, i) => (
            <li
              key={p.id}
              className={[
                "rounded-xl glass bg-white/70 p-3 shadow-card hover:shadow-card-hov hover-raise-2 transition",
                p.name === "You" ? "ring-2 ring-primary" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                {medalDot(i)}
                <span className="w-9 h-9 rounded-full bg-white grid place-items-center shadow-card text-base">
                  {String(p.id).slice(-2)}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-navy">{p.name}</div>
                      <div className="text-xs text-navy/60">{p.city}</div>
                    </div>
                    <div className="text-sm font-semibold text-navy/80">{p.pts} pts</div>
                  </div>
                  <div className="mt-2 h-2 bg-navy/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(p.pts / maxPts) * 100}%`,
                        background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ====== UPGRADED CERTIFICATE (kept) ====== */}
      <div className="rounded-2xl p-5 bg-cert shadow-card">
        <div className="text-navy font-semibold">Impact Certificate</div>
        <div className="text-sm text-navy/70 mb-3">Download &amp; share</div>

        <div
          ref={tilt.ref}
          onMouseMove={tilt.onMove}
          onMouseLeave={tilt.onLeave}
          className="certificate-frame hover-raise-2 will-change-transform transition-transform duration-200"
        >
          <div className="m-6 rounded-xl bg-white/65 glass ring-1 ring-white/40 p-0 overflow-hidden">
            <svg
              ref={certRef}
              viewBox="0 0 1080 640"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block"
            >
              <defs>
                <linearGradient id="grad-bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E3F2FD" />
                  <stop offset="50%" stopColor="#B3E5FC" />
                  <stop offset="100%" stopColor="#9FF5DE" />
                </linearGradient>
                <pattern id="waves" patternUnits="userSpaceOnUse" width="30" height="12">
                  <path d="M 0 6 Q 7.5 0 15 6 T 30 6" fill="none" stroke="rgba(14,73,129,.08)" strokeWidth="1" />
                </pattern>
                <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                  <feOffset in="blur" dx="0" dy="2" result="off" />
                  <feMerge><feMergeNode in="off" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect x="0" y="0" width="1080" height="640" fill="url(#grad-bg)" rx="24" />
              <rect x="0" y="0" width="1080" height="640" fill="url(#waves)" rx="24" opacity=".55" />
              <rect x="20" y="20" width="1040" height="600" fill="none" rx="16" stroke="rgba(14,73,129,.25)" strokeWidth="2" />
              <rect x="34" y="34" width="1012" height="572" fill="none" rx="14" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" />

              <path d="M0,0 L1080,0 L1080,180 Q540,280 0,120Z" fill="#fff" opacity=".28" />

              <g opacity="0.07">
                <text x="540" y="380" textAnchor="middle" fontSize="160" fontWeight="800" fill="#0E4981">EcoSphere</text>
              </g>

              <g filter="url(#soft)" transform="translate(80,80)">
                <circle cx="58" cy="58" r="58" className="metal-gold" />
                <circle cx="58" cy="58" r="58" className="inner-soft" opacity=".9" />
                <text x="58" y="68" textAnchor="middle" fontSize="42">🏆</text>
              </g>

              <text x="540" y="150" textAnchor="middle" fill="#0E4981" fontSize="26" opacity=".75">
                EcoSphere Recognizes
              </text>
              <text x="540" y="230" textAnchor="middle" fill="#0E4981" fontSize="62" fontWeight="800">
                Environmental
              </text>
              <text x="540" y="290" textAnchor="middle" fill="#0E4981" fontSize="62" fontWeight="800">
                Champion
              </text>

              <text x="540" y="352" textAnchor="middle" fill="#0E4981" fontSize="24" opacity=".92">
                For reporting incidents and protecting our oceans
              </text>
              <text x="540" y="388" textAnchor="middle" fill="#0E4981" fontSize="21" opacity=".85">
                Keep making waves, {name}! 🌊
              </text>

              <g transform="translate(0, 454)">
                <line x1="380" x2="700" y1="0" y2="0" stroke="rgba(14,73,129,.25)" strokeWidth="1.5" />
                <text x="540" y="34" textAnchor="middle" fill="#0E4981" fontSize="20">
                  Signed • EcoSphere • {today}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-3">
          <button
            onClick={onDownload}
            className="w-full rounded-xl px-4 py-3 font-semibold text-white hover-raise-2 shadow-card hover:shadow-card-hov transition"
            style={{ background: "linear-gradient(180deg,#104c80,#0d3f6b)" }}
          >
            Download PNG
          </button>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={shareLinkedIn}
              className="h-11 w-11 rounded-xl bg-white glass grid place-items-center shadow-card hover:shadow-card-hov hover-raise-2"
              title="Share to LinkedIn"
              aria-label="Share to LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#0A66C2">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h4v1.9h.06c.56-1.07 1.94-2.2 3.98-2.2 2.38 0 3.96 1.7 3.96 4.68V21h-4v-6.64c0-1.6-.57-2.68-2-2.68-1.1 0-1.74.74-2.03 1.45-.1.23-.13.56-.13.88V21h-4V9z"/>
              </svg>
            </button>

            <button
              onClick={shareFacebook}
              className="h-11 w-11 rounded-xl bg-white glass grid place-items-center shadow-card hover:shadow-card-hov hover-raise-2"
              title="Share to Facebook"
              aria-label="Share to Facebook"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2">
                <path d="M13.5 21v-7h2.6l.4-3h-3v-1.9c0-.9.3-1.5 1.6-1.5H17V4.1c-.8-.1-1.7-.1-2.5-.1-2.6 0-4.3 1.6-4.3 4.4V11H8v3h2.2v7h3.3z"/>
              </svg>
            </button>

            <button
              onClick={shareInstagram}
              className="h-11 w-11 rounded-xl bg-white glass grid place-items-center shadow-card hover:shadow-card-hov hover-raise-2"
              title="Share to Instagram"
              aria-label="Share to Instagram"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C13584" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="#C13584" stroke="none"/>
              </svg>
            </button>

            <button
              onClick={shareDevice}
              className="h-11 w-11 rounded-xl bg-white glass grid place-items-center shadow-card hover:shadow-card-hov hover-raise-2"
              title="Share via device"
              aria-label="Share via device"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#0E4981" strokeWidth="1.8">
                <path d="M12 5v10M12 5l-4 4M12 5l4 4"/>
                <rect x="4" y="13" width="16" height="7" rx="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
