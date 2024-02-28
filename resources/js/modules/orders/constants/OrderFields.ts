import {ColumnType} from "../../../share/types";

export const OrderFields:Array<ColumnType> = [
    {
        label: 'Name',
        header: 'Name',
        field: 'name',
        type: 'text',
        visible: true,
        style: "min-width: 12rem; padding-left:1rem!important",
        filterable: true,
        filterType: 'CONTAINS',
        loading: false,
        success: false
    },
    {
        label: 'Country',
        header: 'Country',
        field: 'country.name',
        modelField: 'country',
        type: 'dropdown',
        visible: true,
        style: "min-width: 12rem",
        filterable: true,
        filterType: 'STARTS_WITH',
        loading: false,
        success: false
    },
    {
        label: 'Agent',
        header: 'Agent',
        field: 'representative.name',
        modelField: 'representative',
        type: 'dropdown',
        visible: true,
        style: "min-width: 12rem",
        filterable: true,
        filterType: 'IN',
        showFilterMatchModes: false,
        filterMenuStyle: {width: '15rem'},
        loading: false,
        success: false
    },
    {
        label: 'Date',
        header: 'Date',
        field: 'date',
        type: 'date',
        visible: true,
        style: "min-width: 12rem",
        filterable: true,
        filterType: 'DATE_IS',
        loading: false,
        success: false
    },
    {
        label: 'Balance',
        header: 'balance',
        field: 'balance',
        type: 'price',
        visible: true,
        style: "min-width: 12rem",
        filterable: true,
        filterType: 'EQUALS',
        loading: false,
        success: false
    },
    {
        label: 'Status',
        header: 'Status',
        field: 'status',
        type: 'status',
        visible: true,
        style: "min-width: 12rem",
        filterable: true,
        filterType: 'EQUALS',
        loading: false,
        success: false
    },
    {
        label: 'Verified',
        header: 'Verified',
        field: 'verified',
        type: 'boolean',
        visible: true,
        style: "min-width: 12rem",
        filterable: false,
        filterType: 'TRISTATE',
        classes: 'text-center',
        headerClasses: 'justify-content-center',
        loading: false,
        success: false
    }

]
