"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { AdaptId, DemoStore, ProtocolLevel, RunProgramId, User } from "@/types";

const STORAGE_KEY = "treino-live-demo-v2";

const defaultStore: DemoStore = {
  user: null,
  ownedWorkoutIds: [],
  ownedShopIds: [],
  premiumSubscribed: false,
  premiumRenewsAt: null,
  protocolProgress: { inter: 0, avancado: 0 },
  protocolStarted: { inter: false, avancado: false },
  corridaDone: [],
  corridaActive: null,
  ebookChaptersRead: [],
  streak: 0,
  lastWorkoutAt: null,
  adaptationsSaved: [],
};

function migrate(raw: Partial<DemoStore>): DemoStore {
  return {
    ...defaultStore,
    ...raw,
    protocolProgress: {
      ...defaultStore.protocolProgress,
      ...(raw.protocolProgress || {}),
    },
    protocolStarted: {
      ...defaultStore.protocolStarted,
      ...(raw.protocolStarted || {}),
    },
    ownedWorkoutIds: raw.ownedWorkoutIds || [],
    ownedShopIds: raw.ownedShopIds || [],
    corridaDone: raw.corridaDone || [],
    ebookChaptersRead: raw.ebookChaptersRead || [],
    adaptationsSaved: raw.adaptationsSaved || [],
  };
}

function readStore(): DemoStore {
  if (typeof window === "undefined") return defaultStore;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // migrate v1 if present
      const v1 = localStorage.getItem("treino-live-demo-v1");
      if (v1) {
        const parsed = JSON.parse(v1) as Partial<DemoStore>;
        const migrated = migrate(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return defaultStore;
    }
    return migrate(JSON.parse(raw));
  } catch {
    return defaultStore;
  }
}

function writeStore(next: DemoStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): DemoStore {
  return readStore();
}

function getServerSnapshot(): DemoStore {
  return defaultStore;
}

function bumpStreak(cur: DemoStore): Pick<DemoStore, "streak" | "lastWorkoutAt"> {
  const today = new Date().toISOString().slice(0, 10);
  const last = cur.lastWorkoutAt?.slice(0, 10) ?? null;
  if (last === today) {
    return { streak: cur.streak || 1, lastWorkoutAt: cur.lastWorkoutAt };
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const y = yesterday.toISOString().slice(0, 10);
  const next = last === y ? (cur.streak || 0) + 1 : 1;
  return { streak: next, lastWorkoutAt: new Date().toISOString() };
}

export function useDemoStore() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const signIn = useCallback((email: string, name?: string) => {
    const user: User = {
      email: email.trim().toLowerCase(),
      name: name?.trim() || email.split("@")[0],
      createdAt: new Date().toISOString(),
    };
    writeStore({ ...readStore(), user });
  }, []);

  const signOut = useCallback(() => {
    writeStore({ ...readStore(), user: null });
  }, []);

  const purchaseWorkout = useCallback((workoutId: string) => {
    const cur = readStore();
    if (cur.ownedWorkoutIds.includes(workoutId)) return;
    writeStore({
      ...cur,
      ownedWorkoutIds: [...cur.ownedWorkoutIds, workoutId],
    });
  }, []);

  const purchaseShopItem = useCallback((shopId: string) => {
    const cur = readStore();
    if (cur.ownedShopIds.includes(shopId)) return;
    writeStore({
      ...cur,
      ownedShopIds: [...cur.ownedShopIds, shopId],
    });
  }, []);

  const subscribePremium = useCallback(() => {
    const renews = new Date();
    renews.setMonth(renews.getMonth() + 1);
    writeStore({
      ...readStore(),
      premiumSubscribed: true,
      premiumRenewsAt: renews.toISOString(),
    });
  }, []);

  const cancelPremium = useCallback(() => {
    writeStore({
      ...readStore(),
      premiumSubscribed: false,
      premiumRenewsAt: null,
    });
  }, []);

  const startProtocol = useCallback((level: ProtocolLevel) => {
    const cur = readStore();
    const progress = { ...cur.protocolProgress };
    if (progress[level] <= 0) progress[level] = 8;
    writeStore({
      ...cur,
      protocolStarted: { ...cur.protocolStarted, [level]: true },
      protocolProgress: progress,
      ...bumpStreak(cur),
    });
  }, []);

  const bumpProtocol = useCallback((level: ProtocolLevel, delta = 12) => {
    const cur = readStore();
    const next = Math.min(100, (cur.protocolProgress[level] || 0) + delta);
    writeStore({
      ...cur,
      protocolStarted: { ...cur.protocolStarted, [level]: true },
      protocolProgress: { ...cur.protocolProgress, [level]: next },
      ...bumpStreak(cur),
    });
  }, []);

  const toggleCorridaDay = useCallback((key: string) => {
    const cur = readStore();
    const has = cur.corridaDone.includes(key);
    const corridaDone = has
      ? cur.corridaDone.filter((k) => k !== key)
      : [...cur.corridaDone, key];
    writeStore({
      ...cur,
      corridaDone,
      ...(has ? {} : bumpStreak(cur)),
    });
  }, []);

  const activateCorrida = useCallback((program: RunProgramId) => {
    writeStore({ ...readStore(), corridaActive: program });
  }, []);

  const markEbookChapter = useCallback((chapterId: string) => {
    const cur = readStore();
    if (cur.ebookChaptersRead.includes(chapterId)) return;
    writeStore({
      ...cur,
      ebookChaptersRead: [...cur.ebookChaptersRead, chapterId],
    });
  }, []);

  const completeFastWorkout = useCallback(() => {
    const cur = readStore();
    writeStore({ ...cur, ...bumpStreak(cur) });
  }, []);

  const saveAdaptation = useCallback((id: AdaptId) => {
    const cur = readStore();
    if (cur.adaptationsSaved.includes(id)) return;
    writeStore({
      ...cur,
      adaptationsSaved: [...cur.adaptationsSaved, id],
    });
  }, []);

  const resetDemo = useCallback(() => {
    writeStore(defaultStore);
  }, []);

  const owns = useCallback(
    (workoutId: string) => store.ownedWorkoutIds.includes(workoutId),
    [store.ownedWorkoutIds]
  );

  const ownsShop = useCallback(
    (shopId: string) => store.ownedShopIds.includes(shopId),
    [store.ownedShopIds]
  );

  return {
    ...store,
    signIn,
    signOut,
    purchaseWorkout,
    purchaseShopItem,
    subscribePremium,
    cancelPremium,
    startProtocol,
    bumpProtocol,
    toggleCorridaDay,
    activateCorrida,
    markEbookChapter,
    completeFastWorkout,
    saveAdaptation,
    resetDemo,
    owns,
    ownsShop,
  };
}

export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
