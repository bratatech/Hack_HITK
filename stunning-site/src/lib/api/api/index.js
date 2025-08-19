// src/lib/api/index.js
import * as mock from "./mock.js";
import * as http from "./http.js";

const mode = import.meta.env.VITE_API_MODE || "mock"; // "mock" | "http"
export default mode === "http" ? http : mock;
