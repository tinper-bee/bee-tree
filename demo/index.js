
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormControl from 'bee-form-control';
import Tree from '../src';

const x = 3;
const y = 2;
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

const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


/**
*
* @title Tree基本使用事例
* @description 事例涵盖 checkbox如何选择，disable状态和部分选择状态。
*
*/
const defaultProps = {
	keys: ['0-0-0', '0-0-1']
}
console.log(Tree);
class Demo1 extends Component {
	constructor(props) {
		super(props);
	    const keys = this.props.keys;
	    this.state = {
	      defaultExpandedKeys: keys,
	      defaultSelectedKeys: keys,
	      defaultCheckedKeys: keys,
	    };
	}
	onSelect(info) {
	    console.log('selected', info);
	}
	onCheck(info) {
	    console.log('onCheck', info);
	}
	render() {
	    return (
	      <Tree className="myCls" showLine checkable
	        defaultExpandedKeys={this.state.defaultExpandedKeys}
	        defaultSelectedKeys={this.state.defaultSelectedKeys}
	        defaultCheckedKeys={this.state.defaultCheckedKeys}
	        onSelect={this.onSelect} onCheck={this.onCheck}
	      >
	        <TreeNode title="parent 1" key="0-0">
	          <TreeNode title="parent 1-0" key="0-0-0" disabled>
	            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
	            <TreeNode title="leaf" key="0-0-0-1" />
	          </TreeNode>
	          <TreeNode title="parent 1-1" key="0-0-1">
	            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
	          </TreeNode>
	        </TreeNode>
	      </Tree>
	    );
	}
}

Demo1.defaultProps = defaultProps;/**
*
* @title Tree数据可控事例
* @description
*
*/
/*
const x = 3;
const y = 2;
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
*/
class Demo2 extends Component{
  constructor(props) {
  	super(props);
    this.state = {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
    };
    this.onExpand = this.onExpand.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  onExpand(expandedKeys) {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
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
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.key} />;
    });
    return (
      <Tree
        checkable
        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
      >
        {loop(gData)}
      </Tree>
    );
  }
};/**
*
* @title Tree 拖拽使用事例
* @description 拖动结点插入到另一个结点后面或者其他的父节点里面。
*
*/

class Demo3 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gData,
      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    };
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  onDragEnter(info) {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  }
  onDrop(info) {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    // const dragNodesKeys = info.dragNodesKeys;
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      ar.splice(i, 0, dragObj);
    } else {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    }
    this.setState({
      gData: data,
    });
  }
  render() {
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={item.key} />;
    });
    return (
      <Tree
        defaultExpandedKeys={this.state.expandedKeys}
        draggable
        onDragEnter={this.onDragEnter}
        onDrop={this.onDrop}
      >
        {loop(this.state.gData)}
      </Tree>
    );
  }
};/**
*
* @title Tree可搜索事例
* @description
*
*/
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};


class Demo4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
    }
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = [];
    dataList.forEach((item) => {
      if (item.key.indexOf(value) > -1) {
        expandedKeys.push(getParentKey(item.key, gData));
      }
    });
    const uniqueExpandedKeys = [];
    expandedKeys.forEach((item) => {
      if (item && uniqueExpandedKeys.indexOf(item) === -1) {
        uniqueExpandedKeys.push(item);
      }
    });
    this.setState({
      expandedKeys: uniqueExpandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => data.map((item) => {
      const index = item.key.search(searchValue);
      const beforeStr = item.key.substr(0, index);
      const afterStr = item.key.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span className="ant-tree-searchable-filter">{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.key}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
    return (
      <div>
        <FormControl
          style={{ width: 200 }}
          placeholder="Search"
          onChange={this.onChange}
        />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {loop(gData)}
        </Tree>
      </div>
    );
  }
}/**
*
* @title Tree异步数据加载
* @description 当点击展开，异步获取子节点数据
*
*/
function generateTreeNodes(treeNode) {
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < 3; i++) {
    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
  }
  return arr;
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
        curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}

class Demo5 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
    };
    this.onSelect = this.onSelect.bind(this);
    this.onLoadData = this.onLoadData.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          { name: 'pNode 01', key: '0-0' },
          { name: 'pNode 02', key: '0-1' },
          { name: 'pNode 03', key: '0-2', isLeaf: true },
        ],
      });
    }, 100);
  }
  onSelect(info) {
    console.log('selected', info);
  }
  onLoadData(treeNode) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
        this.setState({ treeData });
        resolve();
      }, 1000);
    });
  }
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;
    });
    const treeNodes = loop(this.state.treeData);
    return (
      <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
        {treeNodes}
      </Tree>
    );
  }
};var DemoArray = [{"example":<Demo1 />,"title":" Tree基本使用事例","code":"/**\n*\n* @title Tree基本使用事例\n* @description 事例涵盖 checkbox如何选择，disable状态和部分选择状态。\n*\n*/\nconst defaultProps = {\n\tkeys: ['0-0-0', '0-0-1']\n}\nconsole.log(Tree);\nclass Demo1 extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t    const keys = this.props.keys;\n\t    this.state = {\n\t      defaultExpandedKeys: keys,\n\t      defaultSelectedKeys: keys,\n\t      defaultCheckedKeys: keys,\n\t    };\n\t}\n\tonSelect(info) {\n\t    console.log('selected', info);\n\t}\n\tonCheck(info) {\n\t    console.log('onCheck', info);\n\t}\n\trender() {\n\t    return (\n\t      <Tree className=\"myCls\" showLine checkable\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\n\t        defaultSelectedKeys={this.state.defaultSelectedKeys}\n\t        defaultCheckedKeys={this.state.defaultCheckedKeys}\n\t        onSelect={this.onSelect} onCheck={this.onCheck}\n\t      >\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\n\t          </TreeNode>\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\n\t            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key=\"0-0-1-0\" />\n\t          </TreeNode>\n\t        </TreeNode>\n\t      </Tree>\n\t    );\n\t}\n}\n\nDemo1.defaultProps = defaultProps;","desc":" 事例涵盖 checkbox如何选择，disable状态和部分选择状态。"},{"example":<Demo2 />,"title":" Tree数据可控事例","code":"/**\n*\n* @title Tree数据可控事例\n* @description\n*\n*/\n/*\nconst x = 3;\nconst y = 2;\nconst z = 1;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n  const preKey = _preKey || '0';\n  const tns = _tns || gData;\n\n  const children = [];\n  for (let i = 0; i < x; i++) {\n    const key = `${preKey}-${i}`;\n    tns.push({ title: key, key });\n    if (i < y) {\n      children.push(key);\n    }\n  }\n  if (_level < 0) {\n    return tns;\n  }\n  const level = _level - 1;\n  children.forEach((key, index) => {\n    tns[index].children = [];\n    return generateData(level, key, tns[index].children);\n  });\n};\ngenerateData(z);\n*/\nclass Demo2 extends Component{\n  constructor(props) {\n  \tsuper(props);\n    this.state = {\n      expandedKeys: ['0-0-0', '0-0-1'],\n      autoExpandParent: true,\n      checkedKeys: ['0-0-0'],\n      selectedKeys: [],\n    };\n    this.onExpand = this.onExpand.bind(this);\n    this.onCheck = this.onCheck.bind(this);\n    this.onSelect = this.onSelect.bind(this);\n  }\n  onExpand(expandedKeys) {\n    console.log('onExpand', arguments);\n    // if not set autoExpandParent to false, if children expanded, parent can not collapse.\n    // or, you can remove all expanded children keys.\n    this.setState({\n      expandedKeys,\n      autoExpandParent: false,\n    });\n  }\n  onCheck(checkedKeys) {\n    this.setState({\n      checkedKeys,\n      selectedKeys: ['0-3', '0-4'],\n    });\n  }\n  onSelect(selectedKeys, info) {\n    console.log('onSelect', info);\n    this.setState({ selectedKeys });\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children) {\n        return (\n          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>\n            {loop(item.children)}\n          </TreeNode>\n        );\n      }\n      return <TreeNode key={item.key} title={item.key} />;\n    });\n    return (\n      <Tree\n        checkable\n        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}\n        autoExpandParent={this.state.autoExpandParent}\n        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}\n        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}\n      >\n        {loop(gData)}\n      </Tree>\n    );\n  }\n};","desc":""},{"example":<Demo3 />,"title":" Tree 拖拽使用事例","code":"/**\n*\n* @title Tree 拖拽使用事例\n* @description 拖动结点插入到另一个结点后面或者其他的父节点里面。\n*\n*/\n\nclass Demo3 extends Component{\n  constructor(props) {\n    super(props);\n    this.state = {\n      gData,\n      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],\n    };\n    this.onDragEnter = this.onDragEnter.bind(this);\n    this.onDrop = this.onDrop.bind(this);\n  }\n  onDragEnter(info) {\n    console.log(info);\n    // expandedKeys 需要受控时设置\n    // this.setState({\n    //   expandedKeys: info.expandedKeys,\n    // });\n  }\n  onDrop(info) {\n    console.log(info);\n    const dropKey = info.node.props.eventKey;\n    const dragKey = info.dragNode.props.eventKey;\n    // const dragNodesKeys = info.dragNodesKeys;\n    const loop = (data, key, callback) => {\n      data.forEach((item, index, arr) => {\n        if (item.key === key) {\n          return callback(item, index, arr);\n        }\n        if (item.children) {\n          return loop(item.children, key, callback);\n        }\n      });\n    };\n    const data = [...this.state.gData];\n    let dragObj;\n    loop(data, dragKey, (item, index, arr) => {\n      arr.splice(index, 1);\n      dragObj = item;\n    });\n    if (info.dropToGap) {\n      let ar;\n      let i;\n      loop(data, dropKey, (item, index, arr) => {\n        ar = arr;\n        i = index;\n      });\n      ar.splice(i, 0, dragObj);\n    } else {\n      loop(data, dropKey, (item) => {\n        item.children = item.children || [];\n        // where to insert 示例添加到尾部，可以是随意位置\n        item.children.push(dragObj);\n      });\n    }\n    this.setState({\n      gData: data,\n    });\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children && item.children.length) {\n        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;\n      }\n      return <TreeNode key={item.key} title={item.key} />;\n    });\n    return (\n      <Tree\n        defaultExpandedKeys={this.state.expandedKeys}\n        draggable\n        onDragEnter={this.onDragEnter}\n        onDrop={this.onDrop}\n      >\n        {loop(this.state.gData)}\n      </Tree>\n    );\n  }\n};","desc":" 拖动结点插入到另一个结点后面或者其他的父节点里面。"},{"example":<Demo4 />,"title":" Tree可搜索事例","code":"/**\n*\n* @title Tree可搜索事例\n* @description\n*\n*/\nconst dataList = [];\nconst generateList = (data) => {\n  for (let i = 0; i < data.length; i++) {\n    const node = data[i];\n    const key = node.key;\n    dataList.push({ key, title: key });\n    if (node.children) {\n      generateList(node.children, node.key);\n    }\n  }\n};\ngenerateList(gData);\n\nconst getParentKey = (key, tree) => {\n  let parentKey;\n  for (let i = 0; i < tree.length; i++) {\n    const node = tree[i];\n    if (node.children) {\n      if (node.children.some(item => item.key === key)) {\n        parentKey = node.key;\n      } else if (getParentKey(key, node.children)) {\n        parentKey = getParentKey(key, node.children);\n      }\n    }\n  }\n  return parentKey;\n};\n\n\nclass Demo4 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      expandedKeys: [],\n      searchValue: '',\n      autoExpandParent: true,\n    }\n  }\n  onExpand = (expandedKeys) => {\n    this.setState({\n      expandedKeys,\n      autoExpandParent: false,\n    });\n  }\n  onChange = (e) => {\n    const value = e.target.value;\n    const expandedKeys = [];\n    dataList.forEach((item) => {\n      if (item.key.indexOf(value) > -1) {\n        expandedKeys.push(getParentKey(item.key, gData));\n      }\n    });\n    const uniqueExpandedKeys = [];\n    expandedKeys.forEach((item) => {\n      if (item && uniqueExpandedKeys.indexOf(item) === -1) {\n        uniqueExpandedKeys.push(item);\n      }\n    });\n    this.setState({\n      expandedKeys: uniqueExpandedKeys,\n      searchValue: value,\n      autoExpandParent: true,\n    });\n  }\n  render() {\n    const { searchValue, expandedKeys, autoExpandParent } = this.state;\n    const loop = data => data.map((item) => {\n      const index = item.key.search(searchValue);\n      const beforeStr = item.key.substr(0, index);\n      const afterStr = item.key.substr(index + searchValue.length);\n      const title = index > -1 ? (\n        <span>\n          {beforeStr}\n          <span className=\"ant-tree-searchable-filter\">{searchValue}</span>\n          {afterStr}\n        </span>\n      ) : <span>{item.key}</span>;\n      if (item.children) {\n        return (\n          <TreeNode key={item.key} title={title}>\n            {loop(item.children)}\n          </TreeNode>\n        );\n      }\n      return <TreeNode key={item.key} title={title} />;\n    });\n    return (\n      <div>\n        <FormControl\n          style={{ width: 200 }}\n          placeholder=\"Search\"\n          onChange={this.onChange}\n        />\n        <Tree\n          onExpand={this.onExpand}\n          expandedKeys={expandedKeys}\n          autoExpandParent={autoExpandParent}\n        >\n          {loop(gData)}\n        </Tree>\n      </div>\n    );\n  }\n}","desc":""},{"example":<Demo5 />,"title":" Tree异步数据加载","code":"/**\n*\n* @title Tree异步数据加载\n* @description 当点击展开，异步获取子节点数据\n*\n*/\nfunction generateTreeNodes(treeNode) {\n  const arr = [];\n  const key = treeNode.props.eventKey;\n  for (let i = 0; i < 3; i++) {\n    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });\n  }\n  return arr;\n}\n\nfunction setLeaf(treeData, curKey, level) {\n  const loopLeaf = (data, lev) => {\n    const l = lev - 1;\n    data.forEach((item) => {\n      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :\n        curKey.indexOf(item.key) !== 0) {\n        return;\n      }\n      if (item.children) {\n        loopLeaf(item.children, l);\n      } else if (l < 1) {\n        item.isLeaf = true;\n      }\n    });\n  };\n  loopLeaf(treeData, level + 1);\n}\n\nfunction getNewTreeData(treeData, curKey, child, level) {\n  const loop = (data) => {\n    if (level < 1 || curKey.length - 3 > level * 2) return;\n    data.forEach((item) => {\n      if (curKey.indexOf(item.key) === 0) {\n        if (item.children) {\n          loop(item.children);\n        } else {\n          item.children = child;\n        }\n      }\n    });\n  };\n  loop(treeData);\n  setLeaf(treeData, curKey, level);\n}\n\nclass Demo5 extends Component{\n  constructor(props) {\n    super(props);\n    this.state = {\n      treeData: [],\n    };\n    this.onSelect = this.onSelect.bind(this);\n    this.onLoadData = this.onLoadData.bind(this);\n  }\n  componentDidMount() {\n    setTimeout(() => {\n      this.setState({\n        treeData: [\n          { name: 'pNode 01', key: '0-0' },\n          { name: 'pNode 02', key: '0-1' },\n          { name: 'pNode 03', key: '0-2', isLeaf: true },\n        ],\n      });\n    }, 100);\n  }\n  onSelect(info) {\n    console.log('selected', info);\n  }\n  onLoadData(treeNode) {\n    return new Promise((resolve) => {\n      setTimeout(() => {\n        const treeData = [...this.state.treeData];\n        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);\n        this.setState({ treeData });\n        resolve();\n      }, 1000);\n    });\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children) {\n        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;\n      }\n      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;\n    });\n    const treeNodes = loop(this.state.treeData);\n    return (\n      <Tree onSelect={this.onSelect} loadData={this.onLoadData}>\n        {treeNodes}\n      </Tree>\n    );\n  }\n};","desc":" 当点击展开，异步获取子节点数据"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        const header = (
            <Row>
                <Col md={11}>
                { example }
                </Col>
                <Col md={1}>
                <Button shape="icon" onClick={ this.handleClick }>
                    { caret }
                </Button>
                </Col>
            </Row>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible headerContent expanded={ this.state.open } colors='bordered' header={ header } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
