module.exports = build

/**
 * @param query 
 * @param callback
 * @returns `
 * Promise<{
    results,
    totalResults,
    perPage,
    currentPage,
    totalPages,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
  }>`
 */
async function build(query, callback) {
  const results = await query.docs.map(x => callback(x))

  const {
    totalResults,
    perPage,
    currentPage,
    totalPages,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
  } = query;

  return {
    results,
    totalResults,
    perPage,
    currentPage,
    totalPages,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  }
}