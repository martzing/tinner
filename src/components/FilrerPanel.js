import React from 'react';
import { Slider } from 'antd';

const FilterPanel = (props) => (
    <div style={{height:'70px', border:'1px solid #e0e0eb'}}>
        {props.name}
        <Slider 
            range={props.isRange} 
            style={{paddingTop:'5px'}} 
            defaultValue={props.defualt} 
            onAfterChange={props.onFilterChange}  
            min={props.min} max={props.max}/>
    </div>
)

export default FilterPanel