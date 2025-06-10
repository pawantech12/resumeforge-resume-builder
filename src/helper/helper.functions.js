const cleanEmptyFields = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(cleanEmptyFields).filter(
      (item) =>
        item &&
        typeof item === "object" &&
        Object.keys(item).some((key) => {
          const val = item[key];
          return (
            val !== "" &&
            val !== null &&
            val !== undefined &&
            key !== "_id" &&
            !(typeof val === "boolean" && val === false)
          );
        })
    );
  }

  if (typeof obj === "object" && obj !== null) {
    const cleanedObj = {};

    for (const [key, value] of Object.entries(obj)) {
      if (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        const cleanedValue = cleanEmptyFields(value);
        const isEmptyObject =
          typeof cleanedValue === "object" &&
          cleanedValue !== null &&
          Object.keys(cleanedValue).length === 0;

        if (!isEmptyObject) {
          cleanedObj[key] = cleanedValue;
        }
      }
    }

    return cleanedObj;
  }

  return obj;
};

export { cleanEmptyFields };
