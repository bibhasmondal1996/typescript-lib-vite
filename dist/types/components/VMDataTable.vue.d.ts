export declare type DataTableHeaderColumn = {
    field: string;
    sortable: boolean;
    query: string;
    required?: boolean;
    showFilter?: boolean;
    name: string;
    label: string;
    align?: 'center' | 'left' | 'right';
};
export declare type DataTableMenuItem = {
    icon: string;
    label: string;
    callback: (row: any) => void;
};
export declare type DataTableHeaderFilter = {
    visible: boolean;
    query?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_DefinePropsToOptions<{
    menuItems: DataTableMenuItem[];
    headerColumns: DataTableHeaderColumn[];
    dataUrl: string;
    arrayOfColumnsToBeShown: string[];
}>, () => void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_DefinePropsToOptions<{
    menuItems: DataTableMenuItem[];
    headerColumns: DataTableHeaderColumn[];
    dataUrl: string;
    arrayOfColumnsToBeShown: string[];
}>>>, {}>;
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_DefinePropsToOptions<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
