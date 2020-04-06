/**
 * Сервис получения данных
 * @param P объект параметров
 */
export interface IInitService<P> {
  /**
   * Флаг загрузки
   */
  loading: boolean;
  init: (params: P) => AsyncGenerator<void>;
}