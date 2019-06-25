import React, {Component} from 'react';
import {SortableElement, sortableHandle} from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => 
	<span>:::</span>
);

const SortItem = SortableElement(({value, index, remove}) => 
	<li>
		<DragHandle />
		<p>{value.name}</p>
		<span onClick={() => remove(index)} >X</span>
	</li>
);

export default SortItem