/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import classnames from 'classnames';
import {scrollIntoView} from './scrollIntoView';

type TreeItemProps = {
  children?: mixed,
  className?: string,
  selected?: boolean,
};

export class TreeItem extends React.Component<TreeItemProps> {
  _liNode: ?Element;

  scrollIntoView() {
    if (this._liNode != null) {
      scrollIntoView(this._liNode);
    }
  }

  render() {
    const {className, selected, children, ...remainingProps} = this.props;
    return (
      // $FlowFixMe(>=0.53.0) Flow suppress
      <li
        aria-selected={selected}
        className={classnames(
          className,
          {
            selected,
          },
          'list-item',
        )}
        {...remainingProps}
        ref={liNode => (this._liNode = liNode)}
        role="treeitem"
        tabIndex={selected ? '0' : '-1'}>
        {selected && typeof children === 'string' ? (
          // String children must be wrapped to receive correct styles when selected.
          <span>{children}</span>
        ) : (
          children
        )}
      </li>
    );
  }
}

type NestedTreeItemProps = {
  title?: ?React.Element<any>,
  children?: mixed,
  className?: string,
  hasFlatChildren?: boolean, // passthrough to inner TreeList
  selected?: boolean,
  collapsed?: boolean,
  onClick?: (event: SyntheticMouseEvent<>) => void,
  onDoubleClick?: (event: SyntheticMouseEvent<>) => void,
};
export const NestedTreeItem = (props: NestedTreeItemProps) => {
  const {
    className,
    hasFlatChildren,
    selected,
    collapsed,
    title,
    children,
    onClick,
    onDoubleClick,
    ...remainingProps
  } = props;
  return (
    <li
      aria-selected={selected}
      aria-expanded={!collapsed}
      className={classnames(
        className,
        {
          selected,
          collapsed,
        },
        'list-nested-item',
      )}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      {...remainingProps}
      role="treeitem"
      tabIndex={selected ? '0' : '-1'}>
      {title ? <div className="list-item">{title}</div> : null}
      <TreeList hasFlatChildren={hasFlatChildren}>{children}</TreeList>
    </li>
  );
};

type TreeListProps = {
  className?: string,
  /* typically, instances of TreeItem or NestedTreeItem. */
  children?: mixed,
  showArrows?: boolean,
  hasFlatChildren?: boolean,
};
export const TreeList = (props: TreeListProps) => (
  // $FlowFixMe(>=0.53.0) Flow suppress
  <ul
    className={classnames(
      props.className,
      {
        'has-collapsable-children': props.showArrows,
        'has-flat-children': props.hasFlatChildren,
      },
      'list-tree',
    )}
    role="group">
    {props.children}
  </ul>
);