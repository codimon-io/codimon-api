function updateTimestamp(data: any) {
  const now = new Date();
  const newData = {
    ...data,
    updatedAt: now,
  };

  return newData;
}

export default updateTimestamp;
