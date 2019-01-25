import {Col, Row} from 'bee-layout';
import {Panel} from 'bee-panel';
import Button from 'bee-button';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var Demo7 = require("./demolist/Demo7");var Demo8 = require("./demolist/Demo8");var Demo9 = require("./demolist/Demo9");var Demo10 = require("./demolist/Demo10");var DemoArray = [{"example":<Demo1 />,"title":" Tree基本使用示例","code":"/**\r\n *\r\n * @title Tree基本使用示例\r\n * @description 示例涵盖 checkbox如何选择，disable状态和部分选择状态。checkStrictly为true时，子节点与父节点的选择情况都不会影响到对方\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree, Icon } from 'tinper-bee';\r\n\nconst TreeNode = Tree.TreeNode;\r\n\r\nconst defaultProps = {\r\n\tkeys: ['0-0-0', '0-0-1']\r\n}\r\nclass Demo1 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t\tconst keys = this.props.keys;\r\n\t\tthis.state = {\r\n\t\t\tdefaultExpandedKeys: keys,\r\n\t\t\tdefaultSelectedKeys: keys,\r\n\t\t\tdefaultCheckedKeys:keys\r\n\t\t\t// checkedKeys: {checked:keys},\r\n\t\t};\r\n\t}\r\n\tonSelect(info) {\r\n\t\tconsole.log('selected', info);\r\n\t}\r\n\tonCheck = (checkedKeys) => {\r\n\t\tlet self = this;\r\n\t\tconsole.log('onCheck', checkedKeys);\r\n\t\tconst cks = {\r\n\t\t\tchecked: checkedKeys.checked || checkedKeys,\r\n\t\t};\r\n\t\t// this.setState({checkedKeys:cks});\r\n\t}\r\n\r\n\tonDoubleClick=(key,treeNode)=>{\r\n\t\tconsole.log('---onDblClick---'+key+'--treeNode--'+treeNode);\r\n\t}\r\n\trender() {\r\n\t\r\n\t\treturn (\r\n\t\t\t<Tree className=\"myCls\" showLine checkable\r\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\r\n\t\t\t\t\tdefaultSelectedKeys={this.state.defaultSelectedKeys}\r\n\t\t\t\t\tdefaultCheckedKeys = {this.state.defaultCheckedKeys}\r\n\t\t\t\t\tcheckStrictly\r\n\t\t\t\t\tshowIcon\r\n\t\t\t\t\tcancelUnSelect={true}\r\n\t\t\t\t\tonSelect={this.onSelect} onCheck={this.onCheck}\r\n\t\t\t\t\tonDoubleClick={this.onDoubleClick}\r\n\t      >\r\n\t        <TreeNode title=\"parent 1\" key=\"0-0\"  icon={<Icon type=\"uf-treefolder\" />}>\r\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled  icon={<Icon type=\"uf-treefolder\" />}>\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox icon={<Icon type=\"uf-list-s-o\" />}/>\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" icon={<Icon type=\"uf-list-s-o\" />}/>\r\n\t          </TreeNode>\r\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\" icon={<Icon type=\"uf-treefolder\" />}>\r\n\t            <TreeNode title={<span>sss</span>} key=\"0-0-1-0\" icon={<Icon type=\"uf-list-s-o\" />}/>\r\n\t          </TreeNode>\r\n\t        </TreeNode>\r\n\t      </Tree>\r\n\t\t);\r\n\t}\r\n}\r\n\r\nDemo1.defaultProps = defaultProps;\r\n\r\n\r\n","desc":" 示例涵盖 checkbox如何选择，disable状态和部分选择状态。checkStrictly为true时，子节点与父节点的选择情况都不会影响到对方"},{"example":<Demo2 />,"title":" Tree数据可控示例","code":"/**\r\n*\r\n* @title Tree数据可控示例\r\n* @description\r\n*\r\n*/\r\n\r\nimport React, { Component } from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst x = 3;\r\nconst y = 2;\r\nconst z = 1;\r\nconst gData = [];\r\n\r\nconst generateData = (_level, _preKey, _tns) => {\r\n    const preKey = _preKey || '0';\r\n    const tns = _tns || gData;\r\n\r\n    const children = [];\r\n    for (let i = 0; i < x; i++) {\r\n        const key = `${preKey}-${i}`;\r\n        tns.push({ title: key, key });\r\n        if (i < y) {\r\n            children.push(key);\r\n        }\r\n    }\r\n    if (_level < 0) {\r\n        return tns;\r\n    }\r\n    const level = _level - 1;\r\n    children.forEach((key, index) => {\r\n        tns[index].children = [];\r\n        return generateData(level, key, tns[index].children);\r\n    });\r\n};\r\ngenerateData(z);\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\n\r\nclass Demo2 extends Component{\r\n  constructor(props) {\r\n  \tsuper(props);\r\n    this.state = {\r\n      expandedKeys: [],\r\n      autoExpandParent: true,\r\n      checkedKeys: ['0-0-0'],\r\n      selectedKeys: [],\r\n    };\r\n    this.onExpand = this.onExpand.bind(this);\r\n    this.onCheck = this.onCheck.bind(this);\r\n    this.onSelect = this.onSelect.bind(this);\r\n  }\r\n  onExpand(expandedKeys) {\r\n    console.log('onExpand', arguments);\r\n    // if not set autoExpandParent to false, if children expanded, parent can not collapse.\r\n    // or, you can remove all expanded children keys.\r\n    this.setState({\r\n      expandedKeys,\r\n      autoExpandParent: false,\r\n    });\r\n  }\r\n  onCheck(checkedKeys) {\r\n    this.setState({\r\n      checkedKeys,\r\n      selectedKeys: ['0-3', '0-4'],\r\n    });\r\n  }\r\n  onSelect(selectedKeys, info) {\r\n    console.log('onSelect', info);\r\n    this.setState({ selectedKeys });\r\n  }\r\n  render() {\r\n    const loop = data => data.map((item) => {\r\n      if (item.children) {\r\n        return (\r\n          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>\r\n            {loop(item.children)}\r\n          </TreeNode>\r\n        );\r\n      }\r\n      return <TreeNode key={item.key} title={item.key} />;\r\n    });\r\n    return (\r\n      <Tree\r\n        checkable\r\n        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}\r\n        autoExpandParent={this.state.autoExpandParent}\r\n        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}\r\n        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}\r\n      >\r\n        {loop(gData)}\r\n      </Tree>\r\n    );\r\n  }\r\n};\r\n\r\n\r\n","desc":""},{"example":<Demo3 />,"title":" Tree 拖拽使用示例","code":"/**\r\n*\r\n* @title Tree 拖拽使用示例\r\n* @description 拖动结点插入到另一个结点后面或者其他的父节点里面。\r\n*\r\n*/\r\n\r\n\r\n\r\nimport React, { Component } from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst x = 3;\r\nconst y = 2;\r\nconst z = 1;\r\nconst gData = [];\r\n\r\nconst generateData = (_level, _preKey, _tns) => {\r\n    const preKey = _preKey || '0';\r\n    const tns = _tns || gData;\r\n\r\n    const children = [];\r\n    for (let i = 0; i < x; i++) {\r\n        const key = `${preKey}-${i}`;\r\n        tns.push({ title: key, key });\r\n        if (i < y) {\r\n            children.push(key);\r\n        }\r\n    }\r\n    if (_level < 0) {\r\n        return tns;\r\n    }\r\n    const level = _level - 1;\r\n    children.forEach((key, index) => {\r\n        tns[index].children = [];\r\n        return generateData(level, key, tns[index].children);\r\n    });\r\n};\r\ngenerateData(z);\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nclass Demo3 extends Component{\r\n  constructor(props) {\r\n    super(props);\r\n    this.state = {\r\n      gData,\r\n      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],\r\n    };\r\n    this.onDragEnter = this.onDragEnter.bind(this);\r\n    this.onDrop = this.onDrop.bind(this);\r\n  }\r\n  onDragEnter(info) {\r\n    console.log(info);\r\n    // expandedKeys 需要受控时设置\r\n    // this.setState({\r\n    //   expandedKeys: info.expandedKeys,\r\n    // });\r\n  }\r\n  onDrop(info) {\r\n    console.log(info);\r\n    const dropKey = info.node.props.eventKey;\r\n    const dragKey = info.dragNode.props.eventKey;\r\n    // const dragNodesKeys = info.dragNodesKeys;\r\n    const loop = (data, key, callback) => {\r\n      data.forEach((item, index, arr) => {\r\n        if (item.key === key) {\r\n          return callback(item, index, arr);\r\n        }\r\n        if (item.children) {\r\n          return loop(item.children, key, callback);\r\n        }\r\n      });\r\n    };\r\n    const data = [...this.state.gData];\r\n    let dragObj;\r\n    loop(data, dragKey, (item, index, arr) => {\r\n      arr.splice(index, 1);\r\n      dragObj = item;\r\n    });\r\n    if (info.dropToGap) {\r\n      let ar;\r\n      let i;\r\n      loop(data, dropKey, (item, index, arr) => {\r\n        ar = arr;\r\n        i = index;\r\n      });\r\n      ar.splice(i, 0, dragObj);\r\n    } else {\r\n      loop(data, dropKey, (item) => {\r\n        item.children = item.children || [];\r\n        // where to insert 示例添加到尾部，可以是随意位置\r\n        item.children.push(dragObj);\r\n      });\r\n    }\r\n    this.setState({\r\n      gData: data,\r\n    });\r\n  }\r\n  render() {\r\n    const loop = data => data.map((item) => {\r\n      if (item.children && item.children.length) {\r\n        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;\r\n      }\r\n      return <TreeNode key={item.key} title={item.key} />;\r\n    });\r\n    return (\r\n      <Tree\r\n        defaultExpandedKeys={this.state.expandedKeys}\r\n        draggable\r\n        onDragEnter={this.onDragEnter}\r\n        onDrop={this.onDrop}\r\n      >\r\n        {loop(this.state.gData)}\r\n      </Tree>\r\n    );\r\n  }\r\n};\r\n\r\n","desc":" 拖动结点插入到另一个结点后面或者其他的父节点里面。"},{"example":<Demo4 />,"title":" Tree可搜索示例","code":"/**\r\n *\r\n * @title Tree可搜索示例\r\n * @description\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n  Component\r\n} from 'react';\r\n\nimport { Tree, FormControl } from 'tinper-bee';\r\n\r\nconst x = 3;\r\nconst y = 2;\r\nconst z = 1;\r\nconst gData = [];\r\n\r\nconst generateData = (_level, _preKey, _tns) => {\r\n  const preKey = _preKey || '0';\r\n  const tns = _tns || gData;\r\n\r\n  const children = [];\r\n  for (let i = 0; i < x; i++) {\r\n    const key = `${preKey}-${i}`;\r\n    tns.push({\r\n      title: key,\r\n      key\r\n    });\r\n    if (i < y) {\r\n      children.push(key);\r\n    }\r\n  }\r\n  if (_level < 0) {\r\n    return tns;\r\n  }\r\n  const level = _level - 1;\r\n  children.forEach((key, index) => {\r\n    tns[index].children = [];\r\n    return generateData(level, key, tns[index].children);\r\n  });\r\n};\r\ngenerateData(z);\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nconst dataList = [];\r\nconst generateList = (data) => {\r\n  for (let i = 0; i < data.length; i++) {\r\n    const node = data[i];\r\n    const key = node.key;\r\n    dataList.push({\r\n      key,\r\n      title: key\r\n    });\r\n    if (node.children) {\r\n      generateList(node.children, node.key);\r\n    }\r\n  }\r\n};\r\ngenerateList(gData);\r\n\r\nconst getParentKey = (key, tree) => {\r\n  let parentKey;\r\n  for (let i = 0; i < tree.length; i++) {\r\n    const node = tree[i];\r\n    if (node.children) {\r\n      if (node.children.some(item => item.key === key)) {\r\n        parentKey = node.key;\r\n      } else if (getParentKey(key, node.children)) {\r\n        parentKey = getParentKey(key, node.children);\r\n      }\r\n    }\r\n  }\r\n  return parentKey;\r\n};\r\n\r\n\r\nclass Demo4 extends Component {\r\n  constructor(props) {\r\n    super(props);\r\n    this.state = {\r\n      expandedKeys: [],\r\n      searchValue: '',\r\n      autoExpandParent: true,\r\n    }\r\n  }\r\n  onExpand = (expandedKeys) => {\r\n    this.setState({\r\n      expandedKeys,\r\n      autoExpandParent: false,\r\n    });\r\n  }\r\n  onChange = (value) => {\r\n\r\n    const expandedKeys = [];\r\n    dataList.forEach((item) => {\r\n      if (item.key.indexOf(value) > -1) {\r\n        expandedKeys.push(getParentKey(item.key, gData));\r\n      }\r\n    });\r\n    const uniqueExpandedKeys = [];\r\n    expandedKeys.forEach((item) => {\r\n      if (item && uniqueExpandedKeys.indexOf(item) === -1) {\r\n        uniqueExpandedKeys.push(item);\r\n      }\r\n    });\r\n    this.setState({\r\n      expandedKeys: uniqueExpandedKeys,\r\n      searchValue: value,\r\n      autoExpandParent: true,\r\n    });\r\n  }\r\n  render() {\r\n    const {\r\n      searchValue,\r\n      expandedKeys,\r\n      autoExpandParent\r\n    } = this.state;\r\n    const loop = data => data.map((item) => {\r\n      const index = item.key.search(searchValue);\r\n      const beforeStr = item.key.substr(0, index);\r\n      const afterStr = item.key.substr(index + searchValue.length);\r\n      const title = index > -1 ? (\r\n        <span>\r\n          {beforeStr}\r\n          <span className=\"u-tree-searchable-filter\">{searchValue}</span>\r\n          {afterStr}\r\n        </span>\r\n      ) : <span>{item.key}</span>;\r\n      if (item.children) {\r\n        return (\r\n          <TreeNode key={item.key} title={title}>\r\n            {loop(item.children)}\r\n          </TreeNode>\r\n        );\r\n      }\r\n      return <TreeNode key={item.key} title={title} />;\r\n    });\r\n    return (\r\n      <div>\r\n        <FormControl\r\n          style={{ width: 200 }}\r\n          placeholder=\"Search\"\r\n          onChange={this.onChange}\r\n        />\r\n        <Tree\r\n          onExpand={this.onExpand}\r\n          expandedKeys={expandedKeys}\r\n          autoExpandParent={autoExpandParent}\r\n        >\r\n          {loop(gData)}\r\n        </Tree>\r\n      </div>\r\n    );\r\n  }\r\n}\r\n\r\n","desc":"","scss_code":".u-tree-searchable-filter {\r\n  color: #f50;\r\n  transition: all .3s ease;\r\n}"},{"example":<Demo5 />,"title":" Tree异步数据加载","code":"/**\r\n *\r\n * @title Tree异步数据加载\r\n * @description 当点击展开，异步获取子节点数据\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n  Component\r\n} from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst x = 3;\r\nconst y = 2;\r\nconst z = 1;\r\nconst gData = [];\r\n\r\nconst generateData = (_level, _preKey, _tns) => {\r\n  const preKey = _preKey || '0';\r\n  const tns = _tns || gData;\r\n\r\n  const children = [];\r\n  for (let i = 0; i < x; i++) {\r\n    const key = `${preKey}-${i}`;\r\n    tns.push({\r\n      title: key,\r\n      key\r\n    });\r\n    if (i < y) {\r\n      children.push(key);\r\n    }\r\n  }\r\n  if (_level < 0) {\r\n    return tns;\r\n  }\r\n  const level = _level - 1;\r\n  children.forEach((key, index) => {\r\n    tns[index].children = [];\r\n    return generateData(level, key, tns[index].children);\r\n  });\r\n};\r\ngenerateData(z);\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nfunction generateTreeNodes(treeNode) {\r\n  const arr = [];\r\n  const key = treeNode.props.eventKey;\r\n  for (let i = 0; i < 3; i++) {\r\n    arr.push({\r\n      name: `leaf ${key}-${i}`,\r\n      key: `${key}-${i}`\r\n    });\r\n  }\r\n  return arr;\r\n}\r\n\r\nfunction setLeaf(treeData, curKey, level) {\r\n  const loopLeaf = (data, lev) => {\r\n    const l = lev - 1;\r\n    data.forEach((item) => {\r\n      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :\r\n        curKey.indexOf(item.key) !== 0) {\r\n        return;\r\n      }\r\n      if (item.children) {\r\n        loopLeaf(item.children, l);\r\n      } else if (l < 1) {\r\n        item.isLeaf = true;\r\n      }\r\n    });\r\n  };\r\n  loopLeaf(treeData, level + 1);\r\n}\r\n\r\nfunction getNewTreeData(treeData, curKey, child, level) {\r\n  const loop = (data) => {\r\n    if (level < 1 || curKey.length - 3 > level * 2) return;\r\n    data.forEach((item) => {\r\n      if (curKey.indexOf(item.key) === 0) {\r\n        if (item.children) {\r\n          loop(item.children);\r\n        } else {\r\n          item.children = child;\r\n        }\r\n      }\r\n    });\r\n  };\r\n  loop(treeData);\r\n  setLeaf(treeData, curKey, level);\r\n}\r\n\r\nclass Demo5 extends Component {\r\n  constructor(props) {\r\n    super(props);\r\n    this.state = {\r\n      treeData: [],\r\n    };\r\n    this.onSelect = this.onSelect.bind(this);\r\n    this.onLoadData = this.onLoadData.bind(this);\r\n  }\r\n  componentDidMount() {\r\n    setTimeout(() => {\r\n      this.setState({\r\n        treeData: [{\r\n          name: 'pNode 01',\r\n          key: '0-0'\r\n        }, {\r\n          name: 'pNode 02',\r\n          key: '0-1'\r\n        }, {\r\n          name: 'pNode 03',\r\n          key: '0-2',\r\n          isLeaf: true\r\n        }, ],\r\n      });\r\n    }, 100);\r\n  }\r\n  onSelect(info) {\r\n    console.log('selected', info);\r\n  }\r\n  onLoadData(treeNode) {\r\n    return new Promise((resolve) => {\r\n      setTimeout(() => {\r\n        const treeData = [...this.state.treeData];\r\n        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);\r\n        this.setState({\r\n          treeData\r\n        });\r\n        resolve();\r\n      }, 1000);\r\n    });\r\n  }\r\n  render() {\r\n    const loop = data => data.map((item) => {\r\n      if (item.children) {\r\n        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;\r\n      }\r\n      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;\r\n    });\r\n    const treeNodes = loop(this.state.treeData);\r\n    return (\r\n      <Tree onSelect={this.onSelect} loadData={this.onLoadData} >\r\n        {treeNodes}\r\n      </Tree>\r\n    );\r\n  }\r\n};\r\n\r\n","desc":" 当点击展开，异步获取子节点数据"},{"example":<Demo6 />,"title":" Tree基本使用示例自定义图标","code":"/**\r\n *\r\n * @title Tree基本使用示例自定义图标\r\n * @description 添加openIcon、closeIcon属性\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree, Icon } from 'tinper-bee';\r\n\nconst TreeNode = Tree.TreeNode;\r\n\r\nconst defaultProps = {\r\n\tkeys: ['0-0-0', '0-0-1']\r\n}\r\nconsole.log(Tree);\r\nclass Demo1 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t\tconst keys = this.props.keys;\r\n\t\tthis.state = {\r\n\t\t\tdefaultExpandedKeys: keys,\r\n\t\t\tdefaultSelectedKeys: keys,\r\n\t\t\tdefaultCheckedKeys: keys,\r\n\t\t};\r\n\t}\r\n\tonSelect(info) {\r\n\t\tconsole.log('selected', info);\r\n\t}\r\n\tonCheck(info) {\r\n\t\tconsole.log('onCheck', info);\r\n\t}\r\n\trender() {\r\n\t\treturn (\r\n\r\n\t\t\t<Tree className=\"myCls\"  checkable openIcon={<Icon type=\"uf-minus\" />} closeIcon={<Icon type=\"uf-plus\" />}\r\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\r\n\t        defaultSelectedKeys={this.state.defaultSelectedKeys}\r\n\t        defaultCheckedKeys={this.state.defaultCheckedKeys}\r\n\t        onSelect={this.onSelect} onCheck={this.onCheck}\r\n\t      >\r\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\r\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\r\n\t          </TreeNode>\r\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\r\n\t            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key=\"0-0-1-0\" />\r\n\t          </TreeNode>\r\n\t        </TreeNode>\r\n\t      </Tree>\r\n\t\t);\r\n\t}\r\n}\r\n\r\nDemo1.defaultProps = defaultProps;\r\n\r\n\r\n","desc":" 添加openIcon、closeIcon属性"},{"example":<Demo7 />,"title":" Tree增加节点","code":"/**\r\n *\r\n * @title Tree增加节点\r\n * @description \r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n  Component\r\n} from 'react';\r\nimport { Tree, Button } from 'tinper-bee';\r\n\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\n\r\nclass Demo7 extends Component {\r\n  constructor(props) {\r\n    super(props);\r\n    this.state = {\r\n      treeData: [],\r\n      defaultExpandedKeys: ['0-0', '0-1', '0-2'],\r\n      parentNode: {}\r\n    };\r\n    this.onSelect = this.onSelect.bind(this);\r\n    this.addNode = this.addNode.bind(this);\r\n    this.clickFun = this.clickFun.bind(this);\r\n    this.getNodeByKey = this.getNodeByKey.bind(this);\r\n    this.parentNode = null\r\n  }\r\n  componentDidMount() {\r\n      setTimeout(() => {\r\n        this.setState({\r\n          treeData: [{\r\n            name: 'pNode 01',\r\n            key: '0-0',\r\n            children: [{\r\n              name: 'leaf 0-0-0',\r\n              key: '0-0-0'\r\n            }, {\r\n              name: 'leaf 0-0-1',\r\n              key: '0-0-1'\r\n            }]\r\n          }, {\r\n            name: 'pNode 02',\r\n            key: '0-1',\r\n            children: [{\r\n              name: 'leaf 0-1-0',\r\n              key: '0-1-0'\r\n            }, {\r\n              name: 'leaf 0-1-1',\r\n              key: '0-1-1'\r\n            }]\r\n          }, {\r\n            name: 'pNode 03',\r\n            key: '0-2',\r\n            isLeaf: true\r\n          }, ],\r\n        });\r\n      }, 100);\r\n    }\r\n    /**\r\n     * 增加节点\r\n     * @param string prKey    [父节点key]\r\n     * @param object nodeItem [子节点信息]\r\n     */\r\n  addNode(prKey, nodeItem) {\r\n    const data = this.state.treeData;\r\n    let parNode;\r\n    if (prKey) {\r\n      // 如果prKey存在则搜索父节点进行添加\r\n      parNode = this.getNodeByKey(data, prKey);\r\n      //如果父节点存在的话，添加到父节点上\r\n      if (parNode) {\r\n        if (!parNode.children) {\r\n          parNode.children = [];\r\n        }\r\n        // 如果key不存在就动态生成一个\r\n        if (!nodeItem.key) {\r\n          nodeItem.key = prKey + parNode.children.length + 1;\r\n        }\r\n        parNode.children.push(nodeItem);\r\n      }\r\n    } else {\r\n      // 没有穿prKey添加到根下成为一级节点\r\n      if (!nodeItem.key) {\r\n        nodeItem.key = \"0-\" + data.length + 1;\r\n      }\r\n      data.push(nodeItem);\r\n    }\r\n\r\n    this.setState({\r\n      data\r\n    });\r\n  }\r\n\r\n  getNodeByKey(data, key) {\r\n    if (!this.parentNode) {\r\n      data.find(item => {\r\n        if (item.key === key) {\r\n          console.log('item.name---' + item.name)\r\n          this.parentNode = item;\r\n          return (true);\r\n        } else if (item.children) {\r\n          return this.getNodeByKey(item.children, key);\r\n\r\n        }\r\n      })\r\n    }\r\n    return this.parentNode;\r\n  }\r\n\r\n\r\n\r\n  onSelect(info) {\r\n      console.log('selected', info);\r\n    }\r\n    /**\r\n     * 点击button事件\r\n     */\r\n  clickFun() {\r\n    let prKey, nodeItem;\r\n    prKey = '0-1';\r\n    nodeItem = {\r\n      name: 'leaf 0-0-4'\r\n    }\r\n    this.addNode(prKey, nodeItem);\r\n  }\r\n\r\n  render() {\r\n    const loop = data => data.map((item) => {\r\n      if (item.children) {\r\n        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;\r\n      }\r\n      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;\r\n    });\r\n    const treeNodes = loop(this.state.treeData);\r\n    console.log('defaultKeys--' + this.state.defaultExpandedKeys);\r\n    return (\r\n      <div>\r\n        <Tree onSelect={this.onSelect} defaultExpandedKeys={this.state.defaultExpandedKeys}>\r\n          {treeNodes}\r\n        </Tree>\r\n        <Button colors=\"success\" onClick={this.clickFun}>\r\n        增加节点\r\n        </Button>\r\n      </div>\r\n    );\r\n  }\r\n};\r\n\r\n","desc":" "},{"example":<Demo8 />,"title":" Tree 节点可编辑","code":"/**\r\n *\r\n * @title Tree 节点可编辑\r\n * @description 鼠标移动到节点上点击编辑图标进行编辑。e.node.props.eventKey代表当前节点key值。editKey指当前操作的节点key\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree, Icon, Button } from 'tinper-bee';\r\n\n\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nclass Demo8 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\r\n\t\tthis.state = {\r\n\t\t\ttreeData: [],\r\n\t\t\tisHover: \"\",\r\n\t\t\teditKey: \"\"\r\n\t\t};\r\n\r\n\t}\r\n\r\n\r\n\tonMouseEnter = (e) => {\r\n\t\tthis.setState({\r\n\t\t\tisHover: e.node.props.eventKey\r\n\t\t})\r\n\t}\r\n\tonMouseLeave = (e, treenode) => {\r\n\t\tthis.setState({\r\n\t\t\tisHover: \"\",\r\n\t\t\teditKey: \"\"\r\n\t\t})\r\n\r\n\t}\r\n\r\n\teditRender = (item) => {\r\n\t\tthis.setState({\r\n\t\t\teditKey: item.key\r\n\t\t});\r\n\t}\r\n\tnodechange = (item, value) => {\r\n\t\titem.name = value;\r\n\t}\r\n\trenderTreeTitle = (item) => {\r\n\t\tlet titleIcon, titleInfo;\r\n\t\t//编辑时input框\r\n\t\tif (this.state.editKey == item.key) {\r\n\t\t\ttitleInfo = <input type=\"text\" id=\"itemKey\" defaultValue={item.name} onChange={(e) => this.nodechange(item, e.target.value)} />\r\n\t\t} else {\r\n\t\t\ttitleInfo = <span className=\"title-middle\">{item.name}</span>\r\n\t\t}\r\n\t\t//编辑图标\r\n\t\tif (this.state.isHover == item.key) {\r\n\t\t\ttitleIcon = <Icon className=\"title-middle edit-icon\" type=\"uf-pencil\" onClick={(e) => this.editRender(item)}></Icon>;\r\n\t\t}\r\n\t\treturn (<div className=\"title-con\">\r\n\r\n\t\t\t{titleInfo}\r\n\t\t\t{titleIcon}\r\n\t\t</div>);\r\n\t}\r\n\r\n\tcomponentDidMount = () => {\r\n\t\tsetTimeout(() => {\r\n\t\t\tthis.setState({\r\n\t\t\t\ttreeData: [{\r\n\t\t\t\t\tname: 'pNode 01',\r\n\t\t\t\t\tkey: '0-0',\r\n\t\t\t\t\tchildren: [{\r\n\t\t\t\t\t\tname: 'leaf 0-0-0',\r\n\t\t\t\t\t\tkey: '0-0-0'\r\n\t\t\t\t\t}, {\r\n\t\t\t\t\t\tname: 'leaf 0-0-1',\r\n\t\t\t\t\t\tkey: '0-0-1'\r\n\t\t\t\t\t}]\r\n\t\t\t\t}, {\r\n\t\t\t\t\tname: 'pNode 02',\r\n\t\t\t\t\tkey: '0-1',\r\n\t\t\t\t\tchildren: [{\r\n\t\t\t\t\t\tname: 'leaf 0-1-0',\r\n\t\t\t\t\t\tkey: '0-1-0'\r\n\t\t\t\t\t}, {\r\n\t\t\t\t\t\tname: 'leaf 0-1-1',\r\n\t\t\t\t\t\tkey: '0-1-1'\r\n\t\t\t\t\t}]\r\n\t\t\t\t}, {\r\n\t\t\t\t\tname: 'pNode 03',\r\n\t\t\t\t\tkey: '0-2',\r\n\t\t\t\t\tisLeaf: true\r\n\t\t\t\t}, ],\r\n\t\t\t});\r\n\t\t\r\n\t\t}, 100);\r\n\t}\r\n\trender() {\r\n\t\tconst loop = data => data.map((item) => {\r\n\t\t\tif (item.children) {\r\n\t\t\t\treturn <TreeNode title={this.renderTreeTitle(item)} key={item.key}>{loop(item.children)}</TreeNode>;\r\n\t\t\t}\r\n\t\t\treturn <TreeNode title={this.renderTreeTitle(item)} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;\r\n\t\t});\r\n\t\tconst treeNodes = loop(this.state.treeData);\r\n\t\treturn (\r\n\t\t\t<Tree onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}>\r\n\t\t\t\t{treeNodes}\r\n\t\t\t</Tree>\r\n\r\n\t\t);\r\n\t}\r\n}\r\n\r\n\r\n\r\n","desc":" 鼠标移动到节点上点击编辑图标进行编辑。e.node.props.eventKey代表当前节点key值。editKey指当前操作的节点key","scss_code":".title-middle {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n.edit-icon {\r\n  float:right;\r\n  font-size: 14px;\r\n}\r\n.title-con {\r\n  min-width: 150px;\r\n}"},{"example":<Demo9 />,"title":" 连接线Tree","code":"/**\r\n *\r\n * @title 连接线Tree\r\n * @description \r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst TreeNode = Tree.TreeNode;\r\nclass Demo9 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t\tconst keys = this.props.keys;\r\n\t\tthis.state = {\r\n\t\t\tdefaultExpandedKeys: keys\r\n\t\t};\r\n\r\n\t}\r\n\r\n\trender() {\r\n\t\treturn (\r\n\t\t\t<Tree className=\"myCls\" showLine checkable  defaultExpandAll={true}>\r\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\r\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" >\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\"  />\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\r\n\t          </TreeNode>\r\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\r\n\t            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key=\"0-0-1-0\" />\r\n\t          </TreeNode>\r\n\t        </TreeNode>\r\n\t      </Tree>\r\n\t\t);\r\n\t}\r\n}\r\n\r\n","desc":" "},{"example":<Demo10 />,"title":" Tree基本使用示例","code":"/**\r\n *\r\n * @title Tree基本使用示例\r\n * @description 如何获取选中对象自定义对象和数据\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nconst defaultProps = {\r\n\tkeys: ['0-0-0', '0-0-1']\r\n}\r\nclass Demo10 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t\tconst keys = this.props.keys;\r\n\t\tthis.state = {\r\n\t\t\tdefaultExpandedKeys: keys,\r\n\t\t\tdefaultSelectedKeys: keys,\r\n\t\t\tdefaultCheckedKeys:keys\r\n\t\t\t// checkedKeys: {checked:keys},\r\n\t\t};\r\n    }\r\n    /**\r\n     * 获取当前选中行的item对象。\r\n     * @param {*} value \r\n     */\r\n\tonSelect(selectedKeys, e) {\r\n        console.log(`${selectedKeys} selected`);//获取key\r\n        let currentObject = {};\r\n        currentObject.title = e.node.props.title; //获取选中对象的数据\r\n        currentObject.key = e.node.props.eventKey;\r\n        console.log(currentObject); \r\n\t}\r\n\tonCheck = (checkedKeys) => {\r\n\t\tlet self = this;\r\n\t\tconsole.log('onCheck', checkedKeys);\r\n\t\tconst cks = {\r\n\t\t\tchecked: checkedKeys.checked || checkedKeys,\r\n\t\t};\r\n\t\t// this.setState({checkedKeys:cks});\r\n\t}\r\n\r\n\tonDoubleClick=(key,treeNode)=>{\r\n\t\tconsole.log('---onDblClick---'+key+'--treeNode--'+treeNode);\r\n\t}\r\n\trender() {\r\n\t\r\n\t\treturn (\r\n\t\t\t<Tree className=\"myCls\" showLine checkable\r\n                defaultExpandedKeys={this.state.defaultExpandedKeys}\r\n                defaultSelectedKeys={this.state.defaultSelectedKeys}\r\n                defaultCheckedKeys = {this.state.defaultCheckedKeys}\r\n                checkStrictly\r\n                onSelect={this.onSelect} onCheck={this.onCheck}\r\n                onDoubleClick={this.onDoubleClick}\r\n            >\r\n                <TreeNode title=\"parent 1\" key=\"0-0\" >\r\n                <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\r\n                    <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\r\n                    <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\r\n                </TreeNode>\r\n                <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\r\n                    <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key=\"0-0-1-0\" />\r\n                </TreeNode>\r\n                <TreeNode title=\"parent 1-2\" key=\"0-0-2\" >\r\n                    <TreeNode title=\"leaf\" key=\"0-0-2-0\" />\r\n                    <TreeNode title=\"leaf\" key=\"0-0-2-1\" />\r\n                </TreeNode>\r\n                </TreeNode>\r\n\t      </Tree>\r\n\t\t);\r\n\t}\r\n}\r\n\r\nDemo10.defaultProps = defaultProps;\r\n\r\n\r\n","desc":" 如何获取选中对象自定义对象和数据"}]


class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open})
    }

    render() {
        const {title, example, code, desc, scss_code} = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const header = (
            <div>
                {example}
                <Button style={{"marginTop": "10px"}} shape="block" onClick={this.handleClick}>
                    {caret}
                    {text}
                </Button>
            </div>
        );
        return (
            <Col md={12}>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Panel collapsible headerContent expanded={this.state.open} colors='bordered' header={header}
                       footerStyle={{padding: 0}}>
                    <pre><code className="hljs javascript">{code}</code></pre>
                    {!!scss_code ? <pre><code className="hljs css">{scss_code}</code></pre> : null}
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row>
                {DemoArray.map((child, index) => {

                    return (
                        <Demo example={child.example} title={child.title} code={child.code} scss_code={child.scss_code}
                              desc={child.desc} key={index}/>
                    )

                })}
            </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
