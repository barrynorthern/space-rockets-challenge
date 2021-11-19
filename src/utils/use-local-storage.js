import { useEffect } from "react"
import { useLocalStorageState } from "../local-storage-context"

export const useLocalStorage = (key) => {

  const { state, dispatch } = useLocalStorageState();
  const dispatchValue = (value) => dispatch({type: 'SET_DATA', payload: { key: key, data: value }});
  const setValue = (set) => dispatchValue(typeof(set) === 'function' ? set(state[key]) : set);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state[key]));
  }, [key, state]);

  return [state[key], setValue];
};