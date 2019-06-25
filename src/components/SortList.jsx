import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import SortItem from "./SortItem"

const SortList = SortableContainer(({items, removePlace}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortItem key={`item-${index}`} index={index} value={value} remove={removePlace}/>
      ))}
    </ul>
  );
});

export default SortList