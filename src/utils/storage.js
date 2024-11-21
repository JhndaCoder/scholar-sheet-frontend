function createStorageHandler(storage) {
  return {
    get(key) {
      if (!storage) {
        console.error('Storage is not available');
        return '';
      }

      try {
        const encodedKey = btoa(key);
        const value = storage.getItem(encodedKey);
        return value ? atob(value) : '';
      } catch (error) {
        console.error('Error getting item from storage', error);
        return '';
      }
    },
    set(key, value) {
      if (!storage) {
        console.error('Storage is not available');
        return;
      }

      try {
        if (typeof key !== 'string' || typeof value !== 'string') {
          console.error('Key and value must be strings');
          return;
        }
        storage.setItem(btoa(key), btoa(value));
      } catch (error) {
        console.error('Error setting item in storage', error);
      }
    },
    clear() {
      if (!storage) {
        console.error('Storage is not available');
        return;
      }

      try {
        storage.clear();
      } catch (error) {
        console.error('Error clearing storage', error);
      }
    },
  };
}

export const LocalStorage = createStorageHandler(window.localStorage);
export const SessionStorage = createStorageHandler(window.sessionStorage);
