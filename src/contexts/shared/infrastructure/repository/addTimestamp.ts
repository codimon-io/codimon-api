function addTimestamp(data: any) {
  const now = new Date();
  const newData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  return newData;
}

export default addTimestamp;
