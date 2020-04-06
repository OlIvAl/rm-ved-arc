import FetchHelpers from '../../../libs/FetchHelpers';
import { IArticleData } from './interfaces';

export class ArticlesRequests {
  static async getArticlesData(): Promise<IArticleData[]> {
    return await FetchHelpers.getJSON<IArticleData[]>(
      '/data/articles.json'
    );
  };
}
