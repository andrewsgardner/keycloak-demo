export interface IPaginatedResponse<T> {
    items: T[];
    limit: number;
    offset: number;
    total: number;
}