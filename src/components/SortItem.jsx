import React, {Component} from 'react';
import {SortableElement} from 'react-sortable-hoc';

const SortItem = SortableElement(({value}) => 
	<li>
		<p>{value.name}</p>
		<span className="removePlace" onClick={()=> this.removePlaceFromRoute(index)}>X</span>
	</li>
);

export default SortItem