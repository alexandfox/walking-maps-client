import React, {Component} from 'react';
import {SortableElement} from 'react-sortable-hoc';

const SortItem = SortableElement(({value, index,remove}) => 
	<li>
		<p>{value.name}</p>
		<span className="removePlace" onClick={()=> remove(index)}>X</span>
	</li>
);

export default SortItem