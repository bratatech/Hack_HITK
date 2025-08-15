import { useNavigate } from "react-router-dom";

const items = [
  { key: "report", label: "Report a Problem", emoji: "📍", to: "/report" },
  { key: "volunteer", label: "Volunteer", emoji: "🤝", to: "/volunteer" },
  { key: "edu", label: "Education / Research", emoji: "🎓", to: "/edu" },
];

export default function RoleSelect() {
  const nav = useNavigate();
  return (
    <div className="wrap">
      <div className="card" data-page="role-select">
        <h1 className="h1">Choose your role</h1>
        <div className="grid3">
          {items.map(it=>(
            <button key={it.key} className="tile" onClick={()=>nav(it.to)} data-role={it.key}>
              <div className="text-3xl mb-2">{it.emoji}</div>
              <div className="text-sm font-medium">{it.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
