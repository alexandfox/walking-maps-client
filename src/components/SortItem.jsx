import React, {Component} from 'react';
import {SortableElement, sortableHandle} from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => 
	<span>:::</span>
);

const DeleteHandle = sortableHandle(() => 
	<span onClick={() => alert("click")} >X</span>
)

const SortItem = SortableElement(({value, index, remove}) => 
	<span>
		<DragHandle />
		<p>{value.name}</p>
		<DeleteHandle />
	</span>
);

export default SortItem