import * as mock from "./mock";
import * as http from "./http";
const mode = import.meta.env.VITE_API_MODE || "mock"; // "mock" | "http"
export default mode === "http" ? http : mock;
