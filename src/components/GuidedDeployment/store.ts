/**
 * The reader's choices, shared by every guided component on every page.
 *
 * The store lives at module level, so it survives client-side navigation. It
 * reads the browser only on the client: the server, and the first client
 * render that hydrates the static HTML, see no choices, so the HTML matches.
 * On the first read in the browser, a query string with choices wins over the
 * stored ones. Choices are saved in localStorage.
 */
import { useMemo, useSyncExternalStore } from "react";
import engine from "./engine";

const STORAGE_KEY = "camunda-guided-deployment";

export type Choices = Record<string, string>;

export interface Snapshot {
  choices: Choices;
  /** Sentences about later choices that the last change cleared. */
  cleared: string[];
  /** The question that the last change was about. */
  changed?: string;
  /** False until the browser state is read. */
  loaded: boolean;
}

const SERVER_SNAPSHOT: Snapshot = { choices: {}, cleared: [], loaded: false };

let snapshot: Snapshot = SERVER_SNAPSHOT;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readStorage(): Choices {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return engine.resolve(parsed.choices ?? {}).chosen;
  } catch {
    return {};
  }
}

function save() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, choices: snapshot.choices })
    );
  } catch {
    // Storage can be unavailable, for example in private browsing.
  }
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const fromUrl = engine.decodeChoices(window.location.search);
  snapshot = { choices: fromUrl ?? readStorage(), cleared: [], loaded: true };
  if (fromUrl) save();
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    snapshot = { choices: readStorage(), cleared: [], loaded: true };
    emit();
  });
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): Snapshot {
  load();
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function update(next: Snapshot) {
  snapshot = next;
  save();
  emit();
}

/** Sets an answer, or clears it with `undefined`. */
export function choose(questionId: string, optionId: string | undefined) {
  const result = engine.choose(snapshot.choices, questionId, optionId);
  update({
    choices: result.choices,
    cleared: result.cleared.map(engine.describeCleared),
    changed: questionId,
    loaded: true,
  });
}

/** Forgets every answer. */
export function reset() {
  update({ choices: {}, cleared: [], loaded: true });
}

/** Hides the notice about cleared choices. */
export function dismissCleared() {
  snapshot = { ...snapshot, cleared: [], changed: undefined };
  emit();
}

/**
 * Applies the choices of a query string, if it has any and they differ from
 * the current ones. Used when the reader follows a shared link inside the site.
 */
export function applySearch(search: string) {
  const fromUrl = engine.decodeChoices(search);
  if (!fromUrl) return;
  if (engine.encodeChoices(fromUrl) === engine.encodeChoices(snapshot.choices))
    return;
  update({ choices: fromUrl, cleared: [], loaded: true });
}

/** The choices and their resolution, for a component. */
export function useGuided() {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const resolution = useMemo(
    () => engine.resolve(current.choices),
    [current.choices]
  );
  return { ...current, resolution };
}
