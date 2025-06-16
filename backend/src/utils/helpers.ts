export const paginate = (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return { offset, limit };
};

export const parseTags = (tagsString: string): string[] => {
  return tagsString.split(',').map(tag => tag.trim());
};
