const LS = {
  user: "ecos_user",
  token: "ecos_token",
  reports: "ecos_reports",
  badges: "ecos_badges",
  challenges: "ecos_challenges"
};
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export const me = async () => ({ user: read(LS.user, { id:"u1", name:"Eco User", email:"demo@eco" }) });

export const listReports = async () => ({ items: read(LS.reports, []) });

export const createReport = async ({ type, desc, location, media=[] }) => {
  const now = new Date().toISOString();
  const severity = type === "Oil spill" ? 82 : type === "Illegal fishing" ? 74 : type === "Plastic waste" ? 65 : 55;
  const impactScore = Math.min(100, Math.round(severity * (0.6 + Math.random()*0.6)));
  const r = {
    id: `r_${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`,
    userId: "u1",
    type, desc, location, media,
    status: "open",
    createdAt: now,
    severity, impactScore
  };
  const all = read(LS.reports, []); all.unshift(r); write(LS.reports, all);
  return { report: r };
};

export const updateReport = async (id, patch) => {
  const all = read(LS.reports, []);
  const i = all.findIndex(x => x.id === id);
  if (i > -1) { all[i] = { ...all[i], ...patch }; write(LS.reports, all); return { report: all[i] }; }
  throw new Error("not found");
};

export const getBadges = async () => ({
  earned: read(LS.badges, [
    { id:"b1", name:"First Report", icon:"🏁", rarity:"common", unlockedAt:new Date().toISOString() },
    { id:"b3", name:"Ocean Ally", icon:"🌊", rarity:"rare", unlockedAt:new Date().toISOString() },
  ]),
  available: [
    { id:"b2", name:"10 Reports", icon:"🔟", rarity:"rare" },
    { id:"b4", name:"Rapid Responder", icon:"⚡", rarity:"legendary" },
  ]
});

export const getChallenges = async () => ({
  items: read(LS.challenges, [
    { id:"c1", name:"Beach Sweep Week", progress:3, total:5, endsAt:new Date(Date.now()+5*864e5).toISOString() },
    { id:"c2", name:"Report 3 hotspots", progress:1, total:3, endsAt:new Date(Date.now()+12*864e5).toISOString() },
  ])
});

export const leaderboard = async () => ({
  items: [
    { userId:"u1", name:"You", city:"Your City", points: 120, rank:47 },
    { userId:"u2", name:"Aarav", city:"Your City", points: 210, rank:21 },
  ]
});
