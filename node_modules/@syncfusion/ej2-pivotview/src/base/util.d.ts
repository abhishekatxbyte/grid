import { IDataOptions, IFieldOptions, IFilter, ISort, IFormatSettings, IFieldListOptions, IMembers } from './engine';
import { IDrillOptions, IGroupSettings, FieldItemInfo } from './engine';
import { ICalculatedFieldSettings, IGridValues, IAxisSet } from './engine';
import { PivotView, PivotViewModel } from '../pivotview';
import { PivotFieldList, PivotFieldListModel } from '../pivotfieldlist';
import { IOlapField, IOlapFieldListOptions } from './olap/engine';
import { HeadersSortEventArgs } from '../common/base/interface';
import { PdfPageSize } from '@syncfusion/ej2-grids';
import { SizeF } from '@syncfusion/ej2-pdf-export';
/**
 * This is a file to perform common utility for OLAP and Relational datasource
 *
 * @hidden
 */
export declare class PivotUtil {
    static getType(value: any): string;
    static resetTime(date: Date): Date;
    static getClonedData(data: {
        [key: string]: Object;
    }[]): {
        [key: string]: Object;
    }[];
    private static getDefinedObj;
    static inArray(value: Object, collection: Object[]): number;
    static setPivotProperties(control: any, properties: any): void;
    static getClonedDataSourceSettings(dataSourceSettings: IDataOptions): IDataOptions;
    static getClonedFieldList(fieldListObj: IFieldListOptions | IOlapFieldListOptions): IFieldListOptions | IOlapFieldListOptions;
    static cloneDateMembers(collection: IAxisSet[]): IAxisSet[];
    static cloneFormatMembers(collection: IMembers): IMembers;
    static cloneFieldMembers(collection: IOlapField[]): IOlapField[];
    static updateDataSourceSettings(control: PivotView | PivotFieldList, dataSourceSettings: IDataOptions): void;
    static cloneFieldSettings(collection: IFieldOptions[]): IFieldOptions[];
    static cloneOlapFieldSettings(collection: IOlapField[]): IOlapField[];
    static cloneFilterSettings(collection: IFilter[]): IFilter[];
    private static cloneSortSettings;
    static cloneDrillMemberSettings(collection: IDrillOptions[]): IDrillOptions[];
    static cloneFormatSettings(collection: IFormatSettings[]): IFormatSettings[];
    private static CloneValueSortObject;
    private static CloneAuthenticationObject;
    static cloneCalculatedFieldSettings(collection: ICalculatedFieldSettings[]): ICalculatedFieldSettings[];
    private static cloneConditionalFormattingSettings;
    static cloneGroupSettings(collection: IGroupSettings[]): IGroupSettings[];
    private static cloneCustomGroups;
    static getFilterItemByName(fieldName: string, fields: IFilter[]): IFilter;
    static getFieldByName(fieldName: string, fields: IFieldOptions[] | ISort[] | IFormatSettings[] | IDrillOptions[] | IGroupSettings[] | ICalculatedFieldSettings[]): IFieldOptions | ISort | IFormatSettings | IDrillOptions | IGroupSettings | ICalculatedFieldSettings;
    static getFieldInfo(fieldName: string, control: PivotView | PivotFieldList, hasAllField?: boolean): FieldItemInfo;
    static isButtonIconRefesh(prop: string, oldProp: PivotViewModel | PivotFieldListModel, newProp: PivotViewModel | PivotFieldListModel): boolean;
    static formatPivotValues(pivotValues: any): any;
    static formatFieldList(fieldList: any): any;
    static frameContent(pivotValues: IAxisSet[][], type: string, rowPosition: number, control: PivotView | PivotFieldList): IGridValues;
    static getLocalizedObject(control: PivotView | PivotFieldList): Object;
    static updateReport(control: PivotView | PivotFieldList, report: any): void;
    static generateUUID(): string;
    /**
     * It performing the Custom Sorting.
     *
     * @param {HeadersSortEventArgs} sortDetails - It contains the sort Details.
     * @param {IAxisSet[]} sortMembersOrder - It contains the sort Members Order.
     * @param {string | boolean} type - It contains the type.
     * @param {boolean} hasMembersOrder - It contains the has Members Order.
     * @param {boolean} isOlap - It contains the isOlap.
     * @returns {IAxisSet[]} - It returns the sorted data as IAxisSet[].
     * @hidden
     */
    static applyCustomSort(sortDetails: HeadersSortEventArgs, sortMembersOrder: IAxisSet[], type: string | boolean, hasMembersOrder?: boolean, isOlap?: boolean): IAxisSet[];
    /**
     * It performs to returnssorted headers.
     *
     * @param {IAxisSet[]} sortMembersOrder - It contains the sort members order.
     * @param {string} sortOrder - It contains the sort order.
     * @param {string | boolean} type - It contains the type.
     * @returns {IAxisSet[]} - It returns the sorted data as IAxisSet[].
     * @hidden
     */
    static applyHeadersSort(sortMembersOrder: IAxisSet[], sortOrder: string, type: string | boolean): IAxisSet[];
    /**
     *
     * @param {any} header - It contains the value of header
     * @returns {IAxisSet} - It frame Header With Keys
     * @hidden */
    static frameHeaderWithKeys(header: any): IAxisSet;
    /**
     *
     * @param {PdfPageSize} pageSize - It contains the value of page Size
     * @returns {SizeF} - It returns the value as SizeF
     * @hidden */
    static getPageSize(pageSize: PdfPageSize): SizeF;
}
