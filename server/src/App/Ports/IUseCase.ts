export interface IUseCase<T, Args extends any[] = [void]> {
  execute(...args: Args): Promise<T>;
}
