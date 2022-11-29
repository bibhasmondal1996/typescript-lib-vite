declare const _default: {
    MyButton: import("vue").DefineComponent<{
        primary: {
            type: import("vue").PropType<boolean>;
        } & {
            default: boolean;
        };
    }, () => void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        primary: {
            type: import("vue").PropType<boolean>;
        } & {
            default: boolean;
        };
    }>>, {
        primary: boolean;
    }>;
    VMDataTable: import("vue").DefineComponent<{
        menuItems: {
            type: import("vue").PropType<import("./components/VMDataTable.vue").DataTableMenuItem[]>;
            required: true;
        };
        headerColumns: {
            type: import("vue").PropType<import("./components/VMDataTable.vue").DataTableHeaderColumn[]>;
            required: true;
        };
        dataUrl: {
            type: import("vue").PropType<string>;
            required: true;
        };
        arrayOfColumnsToBeShown: {
            type: import("vue").PropType<string[]>;
            required: true;
        };
    }, () => void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        menuItems: {
            type: import("vue").PropType<import("./components/VMDataTable.vue").DataTableMenuItem[]>;
            required: true;
        };
        headerColumns: {
            type: import("vue").PropType<import("./components/VMDataTable.vue").DataTableHeaderColumn[]>;
            required: true;
        };
        dataUrl: {
            type: import("vue").PropType<string>;
            required: true;
        };
        arrayOfColumnsToBeShown: {
            type: import("vue").PropType<string[]>;
            required: true;
        };
    }>>, {}>;
};
export default _default;
