export * from './api-response';
export * from './logger';
export * from './auth';
export * from './utility';
export * from './user';
export * from './flow';
export * from './pdf';
export class ListResponse<Entity> {
    public count: number;
    public entity: Entity[];

    public constructor(count: number, items: Entity[]) {
        this.count = count;
        this.entity = items;
    }
}
