export interface SearchResult {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: [any];
}
