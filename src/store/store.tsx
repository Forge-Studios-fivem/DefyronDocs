import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import enemiesSeed from '../data/enemies.json';
import towersSeed from '../data/towers.json';
import mapsSeed from '../data/maps.json';
import chaptersSeed from '../data/chapters.json';

export type Enemy = {
  id: string;
  name: string;
  image: string | null;
  tag: string;
  tier: number;
  hp: number;
  damage: number;
  gold: number;
  speed: number;
  attackType: 'sol' | 'aerien';
};

export type Tower = {
  id: string;
  name: string;
  type: 'proximite' | 'distance' | 'mobile';
  damage: number;
  cost: number;
  range: number;
  attackSpeed: number;
  description: string;
};

export type GameMap = {
  id: string;
  name: string;
  chapterId: string;
  description: string;
  lanes: number;
  image: string | null;
};

export type WaveEnemyRef = { enemyId: string; count: number; isBoss?: boolean };
export type Wave = { id: string; title: string; enemies: WaveEnemyRef[] };
export type Level = { id: string; number: number; name: string; waves: Wave[] };
export type Chapter = { id: string; number: number; name: string; mapId: string; levels: Level[] };

const STORAGE_PREFIX = 'defyron:';

function loadFromStorage<T>(key: string, seed: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // ignore corrupt storage
  }
  return JSON.parse(JSON.stringify(seed)) as T;
}

function useCollection<T extends { id: string }>(key: string, seed: T[]) {
  const [items, setItemsState] = useState<T[]>(() => loadFromStorage(key, seed));

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(items));
  }, [key, items]);

  function setItems(next: T[]) {
    setItemsState(next);
  }
  function updateItem(id: string, patch: Partial<T>) {
    setItemsState((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function addItem(item: T) {
    setItemsState((prev) => [...prev, item]);
  }
  function removeItem(id: string) {
    setItemsState((prev) => prev.filter((it) => it.id !== id));
  }
  function reset() {
    localStorage.removeItem(STORAGE_PREFIX + key);
    setItemsState(JSON.parse(JSON.stringify(seed)));
  }

  return { items, setItems, updateItem, addItem, removeItem, reset };
}

function useSingleton<T>(key: string, seed: T) {
  const [value, setValueState] = useState<T>(() => loadFromStorage(key, seed));

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  }, [key, value]);

  function setValue(next: T) {
    setValueState(next);
  }
  function reset() {
    localStorage.removeItem(STORAGE_PREFIX + key);
    setValueState(JSON.parse(JSON.stringify(seed)));
  }

  return { value, setValue, reset };
}

type StoreContextValue = {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  enemies: ReturnType<typeof useCollection<Enemy>>;
  towers: ReturnType<typeof useCollection<Tower>>;
  maps: ReturnType<typeof useCollection<GameMap>>;
  chapters: ReturnType<typeof useSingleton<Chapter[]>>;
  resetAll: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const enemies = useCollection<Enemy>('enemies', enemiesSeed as Enemy[]);
  const towers = useCollection<Tower>('towers', towersSeed as Tower[]);
  const maps = useCollection<GameMap>('maps', mapsSeed as GameMap[]);
  const chapters = useSingleton<Chapter[]>('chapters', chaptersSeed as Chapter[]);

  function resetAll() {
    enemies.reset();
    towers.reset();
    maps.reset();
    chapters.reset();
  }

  return (
    <StoreContext.Provider value={{ editMode, setEditMode, enemies, towers, maps, chapters, resetAll }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
