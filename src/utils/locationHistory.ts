import CryptoJS from "crypto-js";
import { fmtGeolocationName } from ".";
import { type GeoLocationData, type GeoLocationDataWithKey } from "../types";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const STORAGE_KEY = "history";

function addKeyToPayload(payload: GeoLocationData) {
  return { ...payload, key: fmtGeolocationName(payload) };
}

function savePayload(payload: string, storageKey: string) {
  localStorage.setItem(storageKey, payload);
}

function encryptPayload(payload: unknown, encKey: string) {
  return CryptoJS.AES.encrypt(JSON.stringify(payload), encKey).toString();
}

function decryptPayload(encrypted: string, encKey: string) {
  const bytes = CryptoJS.AES.decrypt(encrypted, encKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function saveAndEncryptPayload(payload: unknown, encKey: string) {
  const encrypted = encryptPayload(payload, encKey);
  savePayload(encrypted, STORAGE_KEY);
}

function addToLocationHistory(payload: GeoLocationData) {
  if (!ENCRYPTION_KEY) {
    console.error("ENCRYPTION_KEY is not set");
    return;
  }

  try {
    const existingEncrypted = localStorage.getItem(STORAGE_KEY);

    if (existingEncrypted) {
      const decrypted = decryptPayload(existingEncrypted, ENCRYPTION_KEY);
      const history: GeoLocationDataWithKey[] = JSON.parse(decrypted);
      const isDuplicate = history.some(
        (loc) => loc.key === fmtGeolocationName(payload)
      );
      if (!isDuplicate) {
        const newHistory = [addKeyToPayload(payload), ...history];
        saveAndEncryptPayload(newHistory, ENCRYPTION_KEY);
      }
    } else {
      saveAndEncryptPayload([addKeyToPayload(payload)], ENCRYPTION_KEY);
    }
  } catch (error) {
    console.error("Error writing:", error);
  }
}

function readLocationHistory(): GeoLocationDataWithKey[] {
  if (!ENCRYPTION_KEY) return [];

  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);

    if (!encrypted) return [];

    const decrypted = decryptPayload(encrypted, ENCRYPTION_KEY);
    return JSON.parse(decrypted) as GeoLocationDataWithKey[];
  } catch (error) {
    console.error("Failed to read location history:", error);
    return [];
  }
}

function removeHistoryEntryByKey(key: string): GeoLocationDataWithKey[] {
  if (!ENCRYPTION_KEY) return [];

  try {
    const history = readLocationHistory();
    const newHistory = history.filter((item) => item.key !== key);
    saveAndEncryptPayload(newHistory, ENCRYPTION_KEY);
    return newHistory;
  } catch (error) {
    console.error("Failed to read location history:", error);
    return [];
  }
}

export { addToLocationHistory, readLocationHistory, removeHistoryEntryByKey };
