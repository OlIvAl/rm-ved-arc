import { action, observable } from 'mobx';
import { IInitService } from './interfaces';

export abstract class AbstractInitService<P = void> implements IInitService<P> {
  @observable loading: boolean = true;

  @action.bound async *init(params: P): AsyncGenerator<void> {
    yield this.setLoading();

    yield await this.getData(params);

    yield this.unsetLoading();
  }

  /**
   * Делает запрос за данными
   * Инициализирует поля
   * @param params объект параметров
   */
  protected abstract async getData(params: P): Promise<void>;

  /**
   * Ставит флаг загрузки в true
   */
  @action.bound protected setLoading(): void {
    this.loading = true;
  }
  /**
   * Ставит флаг загрузки в false
   */
  @action.bound protected unsetLoading(): void {
    this.loading = false;
  }
}