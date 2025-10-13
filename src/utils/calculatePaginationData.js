import createHttpError from 'http-errors';

export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  if (totalPages > 0 && page > totalPages) {
    throw createHttpError(
      400,
      `Page ${page} exceeds total pages (${totalPages})`,
    );
  }

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
