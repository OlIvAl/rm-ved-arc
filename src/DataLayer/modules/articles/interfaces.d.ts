export interface IArticleData {
  id: string;
  title: string;
  url: string;
  context: string;
}
export interface IArticlesRequests {
  getArticlesData: () => Promise<IArticleData[]>;
}