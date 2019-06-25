import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import SortItem from "./SortItem"

const SortList = SortableContainer(({items, removePlace}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <li key={`item-${index}`}>
          <SortItem key={`item-${index}`} index={index} value={value}/>
          <span onClick={() => removePlace(index)} >X</span>
        </li>
      ))}
    </ul>
  );
});

export default SortList