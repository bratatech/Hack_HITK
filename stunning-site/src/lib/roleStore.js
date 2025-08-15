const KEY = "ecos_role";

export const getRole = () => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};

export const setRole = (r) => {
  try { localStorage.setItem(KEY, r); } catch {}
};

export const rolePath = (r) =>
  r === "reporter" ? "/role/reporter" :
  r === "volunteer" ? "/role/volunteer" :
  r === "educator" ? "/role/educator" :
  "/select-role";
