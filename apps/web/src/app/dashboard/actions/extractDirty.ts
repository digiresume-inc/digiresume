export const extractDirty = (dirty: any, current: any, target: any) => {
  for (const key in dirty) {
    if (typeof dirty[key] === 'object' && !Array.isArray(dirty[key]) && dirty[key] !== null) {
      target[key] = {
        ...(current[key] ?? {}),
      };
      extractDirty(dirty[key], current[key], target[key]);
    } else {
      target[key] = current[key];
    }
  }
};
