export interface ResultInterface<T> {
    statusCode: number,
    data?: T,
    message?: string,
}