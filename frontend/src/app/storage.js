const storage = {
  getItem: (key) => {
    try {
      return Promise.resolve(
        localStorage.getItem(key)
      );
    } catch {
      return Promise.resolve(null);
    }
  },

  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors
    }

    return Promise.resolve();
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }

    return Promise.resolve();
  },
};

export default storage;