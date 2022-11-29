<template>
<div class="q-mt-md">
    <q-table
        v-model:pagination="pagination"
        class="my-sticky-dynamic"
        flat
        :rows="rows"
        :columns="headerColumns"
        :visible-columns="arrayOfColumnsToBeShown"
        :loading="dataTableLoading"
        row-key="field"
        binary-state-sort
        virtual-scroll
        :virtual-scroll-item-size="48"
        :virtual-scroll-sticky-size-start="24"
        :sort-method="() => rows"
        @request="onPagination"
    >
        <template #header="headerProps">
            <q-tr :props="headerProps">
                <q-th />
                <template
                    v-for="col, i in headerProps.cols"
                    :key="col.name"
                >
                    <q-th
                        v-if="!headerFilters[i]?.visible"
                        :key="col.name"
                        :props="headerProps"
                        @click="onSort(col.field, col.__thClass.includes('desc'))"
                    >
                        <q-icon
                            name="search"
                            size="md"
                            class=" text-grey-9"
                            @click.stop="headerFilters[i] = { visible: true }"
                        />
                        <span class="text-weight-bold text-subtitle2 text-grey-6 q-pl-md">
                            {{ col.label }}
                        </span>
                    </q-th>
                    <q-th v-else>
                        <q-input
                            v-model="headerFilters[i].query"
                            outlined
                            dense
                            style="min-width: 100px"
                            @keyup.enter="applyFilter"
                        >
                            <template #after>
                                <q-btn
                                    round
                                    dense
                                    flat
                                    class="bg-blue-grey-1"
                                    size="sm"
                                    icon="close"
                                    @click="clearFilter(i)"
                                />
                            </template>
                        </q-input>
                    </q-th>
                </template>
            </q-tr>
        </template>
        <template #body="rowProps">
            <q-tr :props="rowProps">
                <q-td>
                    <q-btn-dropdown
                        dense
                        color="dark"
                        :loading="menuIconLoading[rowProps.row.uaguid]"
                        dropdown-icon="menu_open"
                    >
                        <q-list>
                            <q-item
                                v-for="menuItem in menuItems"
                                :key="menuItem.label"
                                v-close-popup
                                clickable
                                @click="startMenuItemLoading(rowProps.row.uaguid); menuItem.callback(rowProps.row)"
                            >
                                <q-item-section avatar>
                                    <q-icon
                                        size="sm"
                                        :name="menuItem.icon"
                                    />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>
                                        {{ menuItem.label }}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-td>
                <q-td
                    v-for="col in rowProps.cols"
                    :key="col.name"
                    :props="rowProps"
                >
                    {{ col.value }}
                </q-td>
            </q-tr>
        </template>
    </q-table>
</div>
</template>

<script setup lang="ts">
// import { AxiosInstance } from 'axios';
import { QTable, QTr, QTh, QIcon, QInput, QBtn, QTd, QBtnDropdown, QList, QItem, QItemSection, QItemLabel } from 'quasar';
import { onMounted, ref } from 'vue';
export type DataTableHeaderColumn = {
    field: string;
    sortable: boolean;
    query: string;
    required?: boolean;
    showFilter?: boolean;
    name: string;
    label: string; align?: 'center' | 'left' | 'right';
};

export type DataTableMenuItem = {
    icon: string;
    label: string;
    callback: (row: any) => void;
};

export type DataTableHeaderFilter = {
    visible: boolean;
    query?: string;
};
const props = defineProps<{
    menuItems: DataTableMenuItem[];
    headerColumns: DataTableHeaderColumn[];
    dataUrl: string;
    arrayOfColumnsToBeShown: string[];
    // axiosInstance: AxiosInstance;
}>();

const menuIconLoading = ref<Record<string, boolean>>({});

function startMenuItemLoading(uaguid: string) {
    menuIconLoading.value[uaguid] = true;
}

const headerFilters = ref<DataTableHeaderFilter[]>([]);

const rows = ref<unknown[]>([]);

const pagination = ref({
    sortBy: props.headerColumns[0]?.field,
    descending: false,
    page: 1,
    rowsPerPage: 5,
    rowsNumber: 5,
});

const dataTableLoading = ref(false);

let startRow = 0;
let requestCount = 0;

async function fetchTableRows() {
    requestCount += 1;

    const response = {data: {recordsTotal: 0, data: []}};/*await props.axiosInstance.post<{
        data: unknown[];
        recordsTotal: number;
    }>(props.dataUrl, {

        start: startRow,
        draw: requestCount,
        length: pagination.value.rowsPerPage || 6,
        orderCol: pagination.value.sortBy,
        direction: pagination.value.descending ? 'desc' : 'asc',
        columns: (props.headerColumns || []).map((e, i) => ({
            field: e.field,
            sortable: e.sortable,
            query: headerFilters.value[i]?.query ?? '',
        })),
    });*/

    pagination.value.rowsNumber = response.data.recordsTotal;

    return response.data;
}

function applyFilter() {
    startRow = 0;
    dataTableLoading.value = true;
    void fetchTableRows()
        .then((data) => {
            rows.value = data.data;
        })
        .finally(() => {
            dataTableLoading.value = false;
        });
}

function clearFilter(columnsIndex: number) {
    headerFilters.value[columnsIndex] = {
        visible: false,
        query: '',
    };
    applyFilter();
}

function onSort(sortBy: string, descending: boolean) {
    startRow = 0;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    dataTableLoading.value = true;
    void fetchTableRows()
        .then((data) => {
            rows.value = data.data;
        })
        .finally(() => {
            dataTableLoading.value = false;
        });
}

function onPagination(params: any) {
    if ('pagination' in params) {
        pagination.value = params.pagination as typeof pagination.value;
    }

    startRow = pagination.value.rowsPerPage * (pagination.value.page - 1);

    dataTableLoading.value = true;
    void fetchTableRows()
        .then((data) => {
            rows.value = data.data;
        })
        .finally(() => {
            dataTableLoading.value = false;
        });
}

// function onScroll({ index }: VertualScrollEventParam) {
//   const lastIndex = rows.value.length - 1;

//   if (!dataTableLoading.value
//     && index === lastIndex
//     && lastIndex < pagination.value.rowsNumber - 1
//     && !pagination.value.rowsPerPage) {
//     startRow = lastIndex + 1;
//     dataTableLoading.value = true;
//     void fetchTableRows()
//       .then((data) => {
//         rows.value.push(...(data.data));
//       })
//       .finally(() => {
//         dataTableLoading.value = false;
//       });
//   }
// }

onMounted(() => {
    dataTableLoading.value = true;
    void fetchTableRows()
        .then((data) => {
            rows.value = data.data;
        })
        .finally(() => {
            dataTableLoading.value = false;
        });
});

</script>

<style>
.my-sticky-dynamic {
    /* height or max-height is important */
    max-height: 410px;
    /* this will be the loading indicator */
}

.my-sticky-dynamic .q-table__top,
.my-sticky-dynamic .q-table__bottom,
.my-sticky-dynamic thead tr:first-child th {
    background-color: #fff;
}

.my-sticky-dynamic thead tr th {
    position: sticky;
    z-index: 1;
}

.my-sticky-dynamic thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
}

.my-sticky-dynamic thead tr:first-child th {
    top: 0;
}

.q-item__section--avatar {
    min-width: auto;
}
</style>
