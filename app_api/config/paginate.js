module.exports = paginate

/**
 * Handles pagination
 * @param Model
 * @param mostRecentFirst
 * @param match
 * @param page
 * @param limit
 * @param sortBy
 * @returns `Promise<Query[]>`
 */
async function paginate(Model, mostRecentFirst, match = {}, page = 1, limit = 10, sortBy = '') {
  if (!Model) throw 'Model to use is required';

  const query = Model.aggregate([{ $match: match }])

  const customLabels = {
    totalDocs: 'totalResults',
    limit: 'perPage',
    page: 'currentPage',
  };

  const options = {
    page,
    limit,
    sort: mostRecentFirst ? '-createdAt' : sortBy,
    customLabels
  }

  const paginate = await Model.aggregatePaginate(query, options)
  return paginate;
}