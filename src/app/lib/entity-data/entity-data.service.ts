import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IResponse, IModel } from './response';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';


export class EntityDataService<T> {

    constructor(
        protected httpClient: HttpClient,
        protected endPoint: string,
        // protected configPagination?: ConfigPagination,
    ) { }

    public getAll$(): Observable<T[]> {
        const params = { all: 'true' };
        return this.httpClient.get<T[]>(this.endPoint, { params: params });
    }

    public getWithQuery$(params: any): Observable<IResponse> {
        return this.httpClient.get<IResponse>(this.endPoint, { params: params });
    }

    public getById$(id: string): Observable<T> {
        return this.httpClient.get<T>(`${this.endPoint}${id}/`);
    }

    public add$(entity: T): Observable<T> {
        return this.httpClient.post<T>(this.endPoint, entity);
    }

    public update$(id: string, entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.endPoint}${id}/`, entity);
    }

    public delete$(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}${id}/`);
    }
}


export class EntityDataReactiveService<T extends IModel> {

    public entities: Observable<T[]>;
    private _entities: BehaviorSubject<Array<T>>;
    private dataStore: { // Aquí es donde almacenaremos nuestros datos en la memoria
        entities: T[],
    };

    constructor(
        private model: string,
        private entityDataService: EntityDataService<T>,
        private snackBar: MatSnackBar) {

        this.dataStore = { entities: [] };
        this._entities = <BehaviorSubject<T[]>>new BehaviorSubject([]);
        this.entities = this._entities.asObservable();
    }

    public getAll() {
        return this.
            entityDataService.getAll$()
            .subscribe(data => {
                this.dataStore.entities = data;
                this._entities.next(Object.assign({}, this.dataStore).entities);
            }, error => console.warn(`Could not load ${this.model}s.`),
            );
    }

    public add(entity: T) {
        this.entityDataService.add$(entity)
            .subscribe(res => {
                this.snackBar.open(MESSAGES[this.model].post, MESSAGES.actions.post, snackBarDuration);
                this.dataStore.entities.push(res);
                this._entities.next(Object.assign({}, this.dataStore).entities);
            }, error => console.warn(`Could not create ${this.model}`));
    }

    public update(id: string, entity: T) {
        this.entityDataService.update$(id, entity)
            .subscribe(data => {
                this.snackBar.open(MESSAGES[this.model].put, MESSAGES.actions.put, snackBarDuration);
                this.dataStore.entities.forEach((tp, index) => {
                    if (tp.id === data.id) { this.dataStore.entities[index] = data; }
                });
                this._entities.next(Object.assign({}, this.dataStore).entities);
            }, error => console.warn(`Could not update ${this.model}.`));
    }

    public delete(id: string) {
        this.entityDataService.delete$(id)
            .subscribe(response => {
                this.snackBar.open(MESSAGES[this.model].delete, MESSAGES.actions.delete, snackBarDuration);
                this.dataStore.entities.forEach((tesisProceso, index) => {
                    if (tesisProceso.id === id) { this.dataStore.entities.splice(index, 1); }
                });
                this._entities.next(Object.assign({}, this.dataStore).entities);
            }, error => console.warn(`Could not delete ${this.model}.`));
    }
}
