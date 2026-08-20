export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export const parsePaginationParams = (
  query: PaginationQuery,
  defaultLimit = 10,
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || defaultLimit;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const formatPaginatedResponse = (
  data: any[],
  total: number,
  page: number,
  limit: number,
) => {
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
