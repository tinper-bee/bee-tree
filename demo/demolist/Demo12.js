/**
*
* @title 滚动加载树节点
* @description 适用于大数据场景
*/

import React, { Component } from 'react';
import Tree from '../../src';

const x = 10;
const y = 5;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const TreeNode = Tree.TreeNode;


class Demo12 extends Component{
  constructor(props) {
  	super(props);
    this.state = {
      expandedKeys: ['0-0','0-1','0-2','0-3', '0-4','0-5','0-6','0-0-0','0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
    };
    this.onExpand = this.onExpand.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  onExpand(expandedKeys,nodeInfo) {
    // console.log('onExpand---显示ext数据', nodeInfo.node.props.ext.data);

    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck(checkedKeys) {
    this.setState({
      checkedKeys,
      selectedKeys: ['0-3', '0-4'],
    });
  }
  onSelect(selectedKeys, info) {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  // keydown的钩子事件
  onKeyDown = (e,treeNode)=>{
    console.log('***',e);
    return false;
  }
  render() {
    return (
      <div style={{height:'300px',overflow:'auto',border:'1px solid'}}>
        <Tree
          checkable
          focusable
          treeData={gData}
          lazyLoad={true}
          onExpand={this.onExpand}
          defaultExpandAll={true} 
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck} 
          onSelect={this.onSelect} 
          keyFun={this.onKeyDown}
        >
        </Tree>
      </div>
    );
  }
};


export default Demo12;