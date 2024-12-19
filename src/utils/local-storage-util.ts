export const saveState = <T>(state: T): void => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("reduxState", serializedState);
    } catch (err) {
      console.error("Error al guardar el estado en localStorage:", err);
    }
  };
  
  export const loadState = <T>(): T | undefined => {
    try {
      const serializedState = localStorage.getItem("reduxState");
      if (serializedState === null) {
        return undefined; // Si no hay estado guardado
      }
      return JSON.parse(serializedState) as T;
    } catch (err) {
      console.error("Error al cargar el estado desde localStorage:", err);
      return undefined;
    }
  };
  

  export const delayedImport = <T>(importPromise: Promise<T>, delay: number) =>
    new Promise<T>((resolve) =>
      setTimeout(() => resolve(importPromise), delay)
    );