import {DatatableOptions} from "../../../Components/Datatable/Types";

export const OrderDatatableOptions: DatatableOptions = {
    'key': 'id',
    'country.name': {
        dropdownOptions:[
            { name: 'Australia', value: 'au' },
            { name: 'Brazil', value: 'br' },
            { name: 'China', value: 'cn' },
            { name: 'Egypt', value: 'eg' },
            { name: 'France', value: 'fr' },
            { name: 'Germany', value: 'de' },
            { name: 'India', value: 'in' },
            { name: 'Japan', value: 'jp' },
            { name: 'Spain', value: 'es' },
            { name: 'United States', value: 'us' }
        ]
    },
    'representative.name': {
        dropdownOptions:[
            { name: 'Amy Elsner', value: 'amyelsner.png' },
            { name: 'Anna Fali', value: 'annafali.png' },
            { name: 'Asiya Javayant', value: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', value: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', value: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', value: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', value: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', value: 'onyamalimba.png' },
            { name: 'Stephen Shaw', value: 'stephenshaw.png' },
            { name: 'XuXue Feng', value: 'xuxuefeng.png' }
        ],
    },
    status: {
        statusList: [
            {label: 'Unqualified', value: 'unqualified', severity: 'danger'},
            {label: 'Qualified', value: 'qualified', severity: 'success'},
            {label: 'New', value: 'new', severity: 'info'},
            {label: 'Negotiation', value: 'negotiation', severity: 'warning'},
            {label: 'Renewal', value: 'renewal', severity: 'info'},
            {label: 'Proposal', value: 'proposal', severity: null},
        ]
    }
}
