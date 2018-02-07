import * as React from 'react';

export interface IFilterNameProps {
    contains?: string;
    onChange(contains?: string);
}

// TODO Integrate AutoComplete component here
export const FilterName = ({contains, onChange}: IFilterNameProps) => (
    <div className="filter-name container">
        <input type='text'>Name</input>
    </div>
);
