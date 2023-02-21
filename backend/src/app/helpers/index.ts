export * from './api-response';
export * from './logger';
export * from './auth';
export class ListResponse<Entity> {
    public count: number;
    public entity: Entity[];

    public constructor(count: number, items: Entity[]) {
        this.count = count;
        this.entity = items;
    }
}
