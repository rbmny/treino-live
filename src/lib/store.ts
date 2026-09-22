"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { DemoStore, User } from "@/types";

const STORAGE_KEY = "treino-live-demo-v1";

const defaultStore: DemoStore = {
  user: null,
  ownedWorkoutIds: [],
  premiumSubscribed: false,
  premiumRenewsAt: null,
};

function readStore(): DemoStore {
  if (typeof window === "undefined") return defaultStore;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore;
    return { ...defaultStore, ...JSON.parse(raw) } as DemoStore;
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

  const resetDemo = useCallback(() => {
    writeStore(defaultStore);
  }, []);

  const owns = useCallback(
    (workoutId: string) => store.ownedWorkoutIds.includes(workoutId),
    [store.ownedWorkoutIds]
  );

  return {
    ...store,
    signIn,
    signOut,
    purchaseWorkout,
    subscribePremium,
    cancelPremium,
    resetDemo,
    owns,
  };
}

/** Hydration-safe flag for client-only UI */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
