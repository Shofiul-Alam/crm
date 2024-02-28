export interface DatatableOptions{
    [key: string]: undefined | null | string | DatatableOption;
    key: string;
}

export interface DatatableOption{
    autocompleteFilteredSuggestions?: OptionType[];
    autocompleteSuggestions?: OptionType[];
    dropdownOptions?: OptionType[];
    multiselectOptions?: OptionType[];
    statusList?: Status[];
}

export interface OptionType {
    name: string;
    value: string;
}


export interface Status {
    label: string;
    value: string;
    severity: string;
}
