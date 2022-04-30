module.exports = paginate

async function paginate(Model, mostRecentFirst, match = {}, page = 1, limit = 10) {
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
    sort: mostRecentFirst ? '-createdAt' : '',
    customLabels
  }

  const paginate = await Model.aggregatePaginate(query, options)
  return paginate;
}