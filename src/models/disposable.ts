export interface Disposable<Result> { 
    dispose: () => Result;
}
