import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import SortItem from "./SortItem"

const SortList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default SortList