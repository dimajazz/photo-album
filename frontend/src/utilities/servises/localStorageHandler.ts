export const setToLocalStorageWithExpiry = ({
  value,
  key = LOCAL_STORAGE_DEFAULT_KEY,
  ttl = 1.8e6,
}: StorageItemProps) => {
  const now = new Date().getTime();
  const item = {
    value,
    expiry: now + ttl,
  };
  window.localStorage.setItem(key, JSON.stringify(item));
};

export const getFromLocalStorageWithExpiry = (
  key: string = LOCAL_STORAGE_DEFAULT_KEY
) => {
  const itemStr = window.localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now > item.expiry) {
    removeFromLocalStorage(key);
    return null;
  }

  return item.value;
};

export const removeFromLocalStorage = (
  key: string = LOCAL_STORAGE_DEFAULT_KEY
) => {
  window.localStorage.removeItem(key);
};

export const LOCAL_STORAGE_DEFAULT_KEY = 'Photo Album';

type StorageItemProps = {
  value: any;
  key?: string;
  ttl?: number;
};
