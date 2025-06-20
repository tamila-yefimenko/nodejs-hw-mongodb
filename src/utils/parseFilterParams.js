const parseContentType = (contentType) => {
  const isString = typeof contentType === 'string';
  if (!isString) return;

  const isContactType = (contentType) =>
    ['work', 'personal', 'home'].includes(contentType);
  if (isContactType(contentType)) return contentType;
};

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

export const parseFilterParams = (query) => {
  const { contentType, isFavourite } = query;

  const parsedContentType = parseContentType(contentType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contentType: parsedContentType,
    isFavourite: parsedIsFavourite,
  };
};
