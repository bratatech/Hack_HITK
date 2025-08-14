import React, { createContext, useCallback, useContext, useRef, useState } from "react";

const SceneTransitionCtx = createContext(null);

export function SceneTransitionProvider({ children }) {
  const [active, setActive] = useState(false);
  const destinationRef = useRef(null);

  const startDive = useCallback(({ to = "/explore" } = {}) => {
    destinationRef.current = to;
    setActive(true);
  }, []);

  const finishDive = useCallback(() => {
    setActive(false);
    destinationRef.current = null;
  }, []);

  return (
    <SceneTransitionCtx.Provider
      value={{ active, startDive, finishDive, getDestination: () => destinationRef.current }}
    >
      {children}
    </SceneTransitionCtx.Provider>
  );
}

export function useSceneTransition() {
  const ctx = useContext(SceneTransitionCtx);
  if (!ctx) throw new Error("useSceneTransition must be used within SceneTransitionProvider");
  return ctx;
}
