export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  qualification: string;
  avatar: string | null;
}

export const DEFAULT_PROFILE: ProfileData = {
  name: "Guest User",
  email: "",
  phone: "",
  address: "",
  qualification: "",
  avatar: null,
};

export interface OrderRecord {
  id: string;
  productName: string;
  productColor: string;
  quantity: number;
  total: number;
  date: string;
}

export interface SettingsData {
  emailNotifications: boolean;
  orderUpdates: boolean;
  marketingEmails: boolean;
}

export const DEFAULT_SETTINGS: SettingsData = {
  emailNotifications: true,
  orderUpdates: true,
  marketingEmails: false,
};

const PROFILE_KEY = "coffeeapp_profile";
const ORDERS_KEY = "coffeeapp_orders";
const SETTINGS_KEY = "coffeeapp_settings";

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...(fallback as object), ...JSON.parse(raw) } as T : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — fail silently */
  }
}

export function getProfile(): ProfileData {
  return safeGet(PROFILE_KEY, DEFAULT_PROFILE);
}

export function saveProfile(data: ProfileData) {
  safeSet(PROFILE_KEY, data);
}

export function getSettings(): SettingsData {
  return safeGet(SETTINGS_KEY, DEFAULT_SETTINGS);
}

export function saveSettings(data: SettingsData) {
  safeSet(SETTINGS_KEY, data);
}

export function getOrderHistory(): OrderRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addOrderRecord(record: Omit<OrderRecord, "id" | "date">) {
  if (typeof window === "undefined") return;
  try {
    const history = getOrderHistory();
    const entry: OrderRecord = {
      ...record,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString(),
    };
    localStorage.setItem(ORDERS_KEY, JSON.stringify([entry, ...history].slice(0, 30)));
  } catch {
    /* storage unavailable — fail silently */
  }
}
