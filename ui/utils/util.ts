export const parseAdvancedSearch = (search: string): Record<string, string> => {
    const result: Record<string, string> = {};
    const parts = search.split(",").map((s) => s.trim()).filter(Boolean);
  
    for (const part of parts) {
      const [key, ...rest] = part.split(":");
      if (key && rest.length > 0) {
        let value = rest.join(":").trim();
        // Strip wrapping quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        result[key.trim()] = value;
      }
    }
  
    return result;
  };
  