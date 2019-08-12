import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import Button from '../src';



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var Demo7 = require("./demolist/Demo7");var Demo8 = require("./demolist/Demo8");var Demo9 = require("./demolist/Demo9");var Demo10 = require("./demolist/Demo10");var Demo11 = require("./demolist/Demo11");var Demo12 = require("./demolist/Demo12");var DemoArray = [{"example":<Demo1 />,"title":" Tree基本使用示例","code":"/**\n *\n * @title Tree基本使用示例\n * @description 示例涵盖 checkbox如何选择，disable状态和部分选择状态。checkStrictly为true时，子节点与父节点的选择情况都不会影响到对方\n *\n */\n\n\nimport React, {\n\tComponent\n} from 'react';\nimport { Tree, Icon } from 'tinper-bee';\nconst TreeNode = Tree.TreeNode;\n\nconst defaultProps = {\n\tkeys: ['0-0-0', '0-0-1']\n}\nclass Demo1 extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tconst keys = this.props.keys;\n\t\tthis.state = {\n\t\t\tdefaultExpandedKeys: keys,\n\t\t\tdefaultSelectedKeys: keys,\n\t\t\tdefaultCheckedKeys:keys,\n\t\t\tcheckedKeys: {checked:keys},\n\t\t};\n\t}\n\tonSelect(info) {\n\t\tconsole.log('selected', info);\n\t}\n\tonCheck = (checkedKeys,newst) => {\n\t\t//用户可以自定义当前选中和半选中的节点。\n\t\tconsole.log('onCheck', checkedKeys);\n\t\tconst cks = {\n\t\t\tchecked: checkedKeys.checked || checkedKeys,\n\t\t\thalfChecked:checkedKeys.halfChecked\n\t\t};\n\t\tthis.setState({checkedKeys:cks});\n\t}\n\n\tonDoubleClick=(key,treeNode)=>{\n\t\tconsole.log('---onDblClick---'+key+'--treeNode--'+treeNode);\n\t}\n\trender() {\n\t\n\t\treturn (\n\t\t\t<Tree className=\"myCls\" showLine checkable\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\n\t\t\t\t\tdefaultSelectedKeys={this.state.defaultSelectedKeys}\n\t\t\t\t\tdefaultCheckedKeys = {this.state.defaultCheckedKeys}\n\t\t\t\t\tcheckStrictly\n\t\t\t\t\tshowIcon\n\t\t\t\t\tcancelUnSelect={true}\n\t\t\t\t\tonSelect={this.onSelect} onCheck={this.onCheck}\n\t\t\t\t\tonDoubleClick={this.onDoubleClick}\n\t      >\n\t        <TreeNode title=\"parent 1\" key=\"0-0\"  icon={<Icon type=\"uf-treefolder\"  />}>\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled  icon={<Icon type=\"uf-treefolder\" />}>\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox icon={<Icon type=\"uf-list-s-o\" />}/>\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" icon={<Icon type=\"uf-list-s-o\" />}/>\n\t          </TreeNode>\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\" icon={<Icon type=\"uf-treefolder\" />}>\n\t            <TreeNode title={<span>sss</span>} key=\"0-0-1-0\" icon={<Icon type=\"uf-list-s-o\" />}/>\n\t          </TreeNode>\n\t        </TreeNode>\n\t      </Tree>\n\t\t);\n\t}\n}\n\nDemo1.defaultProps = defaultProps;\n\n\n","desc":" 示例涵盖 checkbox如何选择，disable状态和部分选择状态。checkStrictly为true时，子节点与父节点的选择情况都不会影响到对方"},{"example":<Demo2 />,"title":" Tree数据可控示例","code":"/**\n*\n* @title Tree数据可控示例\n* @description\n* \b\n*/\n\nimport React, { Component } from 'react';\nimport { Tree } from 'tinper-bee';\n\nconst x = 6;\nconst y = 5;\nconst z = 2;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n    const preKey = _preKey || '0';\n    const tns = _tns || gData;\n\n    const children = [];\n    for (let i = 0; i < x; i++) {\n        const key = `${preKey}-${i}`;\n        tns.push({ title: key, key });\n        if (i < y) {\n            children.push(key);\n        }\n    }\n    if (_level < 0) {\n        return tns;\n    }\n    const level = _level - 1;\n    children.forEach((key, index) => {\n        tns[index].children = [];\n        return generateData(level, key, tns[index].children);\n    });\n};\ngenerateData(z);\n\nconst TreeNode = Tree.TreeNode;\n\n\nclass Demo2 extends Component{\n  constructor(props) {\n  \tsuper(props);\n    this.state = {\n      expandedKeys: [],\n      autoExpandParent: true,\n      checkedKeys: ['0-0-0'],\n      selectedKeys: [],\n    };\n    this.onExpand = this.onExpand.bind(this);\n    this.onCheck = this.onCheck.bind(this);\n    this.onSelect = this.onSelect.bind(this);\n  }\n  onExpand(expandedKeys) {\n    console.log('onExpand', arguments);\n    // if not set autoExpandParent to false, if children expanded, parent can not collapse.\n    // or, you can remove all expanded children keys.\n    this.setState({\n      expandedKeys,\n      autoExpandParent: false,\n    });\n  }\n  onCheck(checkedKeys) {\n    this.setState({\n      checkedKeys,\n      selectedKeys: ['0-3', '0-4'],\n    });\n  }\n  onSelect(selectedKeys, info) {\n    console.log('onSelect', info);\n    this.setState({ selectedKeys });\n  }\n  // keydown的钩子事件\n  onKeyDown = (e,treeNode)=>{\n    console.log('***',e);\n    return false;\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children) {\n        return (\n          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'} ext={{'as':'sdfa'}}>\n            {loop(item.children)}\n          </TreeNode>\n        );\n      }\n      return <TreeNode key={item.key} title={item.key} isLeaf={true}/>;\n    });\n    return (\n      <Tree\n        checkable\n        focusable\n        className=\"demo2 myCls\"\n        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}\n        autoExpandParent={this.state.autoExpandParent}\n        onCheck={this.onCheck} \n        onSelect={this.onSelect} \n        keyFun={this.onKeyDown}\n      >\n        {loop(gData)}\n      </Tree>\n    );\n  }\n};\n\n\n","desc":"","scss_code":"// .demo2.u-tree {\r\n//   li a.u-tree-node-content-wrapper:hover::before {\r\n//     background: rgb(235, 236, 240);\r\n//   }\r\n//   li a.u-tree-node-content-wrapper.u-tree-node-selected {\r\n//     color: rgb(245, 60, 50);\r\n//     .u-tree-title{\r\n//         color: rgb(245, 60, 50);\r\n//     }\r\n//     background: transparent;\r\n//     &::before {\r\n//       background: rgb(235, 236, 240);\r\n//     }\r\n//   }\r\n\r\n//   li a.u-tree-node-content-wrapper::before {\r\n//     position: absolute;\r\n//     right: 0;\r\n//     left: 0;\r\n//     height: 20px;\r\n//     -webkit-transition: all 0.3s;\r\n//     transition: all 0.3s;\r\n//     content: \"\";\r\n//   }\r\n\r\n//   li  span {\r\n//     position: relative;\r\n//     z-index: 1;\r\n//   }\r\n// }\r\n"},{"example":<Demo3 />,"title":" Tree 拖拽使用示例","code":"/**\n*\n* @title Tree 拖拽使用示例\n* @description 拖动结点插入到另一个结点后面或者其他的父节点里面。\n*\n*/\n\n\n\nimport React, { Component } from 'react';\nimport { Tree } from 'tinper-bee';\n\nconst x = 3;\nconst y = 2;\nconst z = 1;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n    const preKey = _preKey || '0';\n    const tns = _tns || gData;\n\n    const children = [];\n    for (let i = 0; i < x; i++) {\n        const key = `${preKey}-${i}`;\n        tns.push({ title: key, key });\n        if (i < y) {\n            children.push(key);\n        }\n    }\n    if (_level < 0) {\n        return tns;\n    }\n    const level = _level - 1;\n    children.forEach((key, index) => {\n        tns[index].children = [];\n        return generateData(level, key, tns[index].children);\n    });\n};\ngenerateData(z);\n\nconst TreeNode = Tree.TreeNode;\n\nclass Demo3 extends Component{\n  constructor(props) {\n    super(props);\n    this.state = {\n      gData,\n      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],\n    };\n    this.onDragEnter = this.onDragEnter.bind(this);\n    this.onDrop = this.onDrop.bind(this);\n  }\n  onDragEnter(info) {\n    console.log(info);\n    // expandedKeys 需要受控时设置\n    // this.setState({\n    //   expandedKeys: info.expandedKeys,\n    // });\n  }\n  onDrop(info) {\n    console.log(info);\n    const dropKey = info.node.props.eventKey;\n    const dragKey = info.dragNode.props.eventKey;\n    // const dragNodesKeys = info.dragNodesKeys;\n    const loop = (data, key, callback) => {\n      data.forEach((item, index, arr) => {\n        if (item.key === key) {\n          return callback(item, index, arr);\n        }\n        if (item.children) {\n          return loop(item.children, key, callback);\n        }\n      });\n    };\n    const data = [...this.state.gData];\n    let dragObj;\n    loop(data, dragKey, (item, index, arr) => {\n      arr.splice(index, 1);\n      dragObj = item;\n    });\n    if (info.dropToGap) {\n      let ar;\n      let i;\n      loop(data, dropKey, (item, index, arr) => {\n        ar = arr;\n        i = index;\n      });\n      ar.splice(i, 0, dragObj);\n    } else {\n      loop(data, dropKey, (item) => {\n        item.children = item.children || [];\n        // where to insert 示例添加到尾部，可以是随意位置\n        item.children.push(dragObj);\n      });\n    }\n    this.setState({\n      gData: data,\n    });\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children && item.children.length) {\n        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;\n      }\n      return <TreeNode key={item.key} title={item.key} />;\n    });\n    return (\n      <Tree\n        className=\"myCls\"\n        defaultExpandedKeys={this.state.expandedKeys}\n        draggable\n        onDragEnter={this.onDragEnter}\n        onDrop={this.onDrop}\n      >\n        {loop(this.state.gData)}\n      </Tree>\n    );\n  }\n};\n\n","desc":" 拖动结点插入到另一个结点后面或者其他的父节点里面。"},{"example":<Demo4 />,"title":" Tree可搜索示例","code":"/**\n *\n * @title Tree可搜索示例\n * @description\n *\n */\n\n\nimport React, {\n  Component\n} from 'react';\nimport { Tree, FormControl } from 'tinper-bee';\n\nconst x = 3;\nconst y = 2;\nconst z = 1;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n  const preKey = _preKey || '0';\n  const tns = _tns || gData;\n\n  const children = [];\n  for (let i = 0; i < x; i++) {\n    const key = `${preKey}-${i}`;\n    tns.push({\n      title: key,\n      key\n    });\n    if (i < y) {\n      children.push(key);\n    }\n  }\n  if (_level < 0) {\n    return tns;\n  }\n  const level = _level - 1;\n  children.forEach((key, index) => {\n    tns[index].children = [];\n    return generateData(level, key, tns[index].children);\n  });\n};\ngenerateData(z);\n\nconst TreeNode = Tree.TreeNode;\n\nconst dataList = [];\nconst generateList = (data) => {\n  for (let i = 0; i < data.length; i++) {\n    const node = data[i];\n    const key = node.key;\n    dataList.push({\n      key,\n      title: key\n    });\n    if (node.children) {\n      generateList(node.children, node.key);\n    }\n  }\n};\ngenerateList(gData);\n\nconst getParentKey = (key, tree) => {\n  let parentKey;\n  for (let i = 0; i < tree.length; i++) {\n    const node = tree[i];\n    if (node.children) {\n      if (node.children.some(item => item.key === key)) {\n        parentKey = node.key;\n      } else if (getParentKey(key, node.children)) {\n        parentKey = getParentKey(key, node.children);\n      }\n    }\n  }\n  return parentKey;\n};\n\n\nclass Demo4 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      expandedKeys: [],\n      searchValue: '',\n      autoExpandParent: true,\n    }\n  }\n  onExpand = (expandedKeys) => {\n    this.setState({\n      expandedKeys,\n      autoExpandParent: false,\n    });\n  }\n  onChange = (value) => {\n\n    const expandedKeys = [];\n    dataList.forEach((item) => {\n      if (item.key.indexOf(value) > -1) {\n        expandedKeys.push(getParentKey(item.key, gData));\n      }\n    });\n    const uniqueExpandedKeys = [];\n    expandedKeys.forEach((item) => {\n      if (item && uniqueExpandedKeys.indexOf(item) === -1) {\n        uniqueExpandedKeys.push(item);\n      }\n    });\n    this.setState({\n      expandedKeys: uniqueExpandedKeys,\n      searchValue: value,\n      autoExpandParent: true,\n    });\n  }\n  render() {\n    const {\n      searchValue,\n      expandedKeys,\n      autoExpandParent\n    } = this.state;\n    const loop = data => data.map((item) => {\n      const index = item.key.search(searchValue);\n      const beforeStr = item.key.substr(0, index);\n      const afterStr = item.key.substr(index + searchValue.length);\n      const title = index > -1 ? (\n        <span>\n          {beforeStr}\n          <span className=\"u-tree-searchable-filter\">{searchValue}</span>\n          {afterStr}\n        </span>\n      ) : <span>{item.key}</span>;\n      if (item.children) {\n        return (\n          <TreeNode key={item.key} title={title}>\n            {loop(item.children)}\n          </TreeNode>\n        );\n      }\n      return <TreeNode key={item.key} title={title} />;\n    });\n    return (\n      <div>\n        <FormControl\n          style={{ width: 200 }}\n          placeholder=\"Search\"\n          onChange={this.onChange}\n        />\n        <Tree\n          className=\"myCls\"\n          onExpand={this.onExpand}\n          expandedKeys={expandedKeys}\n          autoExpandParent={autoExpandParent}\n        >\n          {loop(gData)}\n        </Tree>\n      </div>\n    );\n  }\n}\n\n","desc":"","scss_code":".u-tree-searchable-filter {\r\n  color: #f50;\r\n  transition: all .3s ease;\r\n}"},{"example":<Demo5 />,"title":" Tree异步数据加载","code":"/**\r\n *\r\n * @title Tree异步数据加载\r\n * @description 当点击展开，异步获取子节点数据\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n  Component\r\n} from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst x = 3;\r\nconst y = 2;\r\nconst z = 1;\r\nconst gData = [];\r\n\r\nconst generateData = (_level, _preKey, _tns) => {\r\n  const preKey = _preKey || '0';\r\n  const tns = _tns || gData;\r\n\r\n  const children = [];\r\n  for (let i = 0; i < x; i++) {\r\n    const key = `${preKey}-${i}`;\r\n    tns.push({\r\n      title: key,\r\n      key\r\n    });\r\n    if (i < y) {\r\n      children.push(key);\r\n    }\r\n  }\r\n  if (_level < 0) {\r\n    return tns;\r\n  }\r\n  const level = _level - 1;\r\n  children.forEach((key, index) => {\r\n    tns[index].children = [];\r\n    return generateData(level, key, tns[index].children);\r\n  });\r\n};\r\ngenerateData(z);\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nfunction generateTreeNodes(treeNode) {\r\n  const arr = [];\r\n  const key = treeNode.props.eventKey;\r\n  for (let i = 0; i < 3; i++) {\r\n    arr.push({\r\n      name: `leaf ${key}-${i}`,\r\n      key: `${key}-${i}`\r\n    });\r\n  }\r\n  return arr;\r\n}\r\n\r\nfunction setLeaf(treeData, curKey, level) {\r\n  const loopLeaf = (data, lev) => {\r\n    const l = lev - 1;\r\n    data.forEach((item) => {\r\n      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :\r\n        curKey.indexOf(item.key) !== 0) {\r\n        return;\r\n      }\r\n      if (item.children) {\r\n        loopLeaf(item.children, l);\r\n      } else if (l < 1) {\r\n        item.isLeaf = true;\r\n      }\r\n    });\r\n  };\r\n  loopLeaf(treeData, level + 1);\r\n}\r\n\r\nfunction getNewTreeData(treeData, curKey, child, level) {\r\n  const loop = (data) => {\r\n    if (level < 1 || curKey.length - 3 > level * 2) return;\r\n    data.forEach((item) => {\r\n      if (curKey.indexOf(item.key) === 0) {\r\n        if (item.children) {\r\n          loop(item.children);\r\n        } else {\r\n          item.children = child;\r\n        }\r\n      }\r\n    });\r\n  };\r\n  loop(treeData);\r\n  setLeaf(treeData, curKey, level);\r\n}\r\n\r\nclass Demo5 extends Component {\r\n  constructor(props) {\r\n    super(props);\r\n    this.state = {\r\n      treeData: [],\r\n    };\r\n    this.onSelect = this.onSelect.bind(this);\r\n    this.onLoadData = this.onLoadData.bind(this);\r\n  }\r\n  componentDidMount() {\r\n    setTimeout(() => {\r\n      this.setState({\r\n        treeData: [{\r\n          name: 'pNode 01',\r\n          key: '0-0'\r\n        }, {\r\n          name: 'pNode 02',\r\n          key: '0-1'\r\n        }, {\r\n          name: 'pNode 03',\r\n          key: '0-2',\r\n          isLeaf: true\r\n        }, ],\r\n      });\r\n    }, 100);\r\n  }\r\n  onSelect(info) {\r\n    console.log('selected', info);\r\n  }\r\n  onLoadData(treeNode) {\r\n    return new Promise((resolve) => {\r\n      setTimeout(() => {\r\n        const treeData = [...this.state.treeData];\r\n        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);\r\n        this.setState({\r\n          treeData\r\n        });\r\n        resolve();\r\n      }, 1000);\r\n    });\r\n  }\r\n  render() {\r\n    const loop = data => data.map((item) => {\r\n      if (item.children) {\r\n        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;\r\n      }\r\n      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;\r\n    });\r\n    const treeNodes = loop(this.state.treeData);\r\n    return (\r\n      <Tree className=\"myCls\" onSelect={this.onSelect} loadData={this.onLoadData} >\r\n        {treeNodes}\r\n      </Tree>\r\n    );\r\n  }\r\n};\r\n\r\n","desc":" 当点击展开，异步获取子节点数据"},{"example":<Demo6 />,"title":" Tree基本使用示例自定义图标","code":"/**\r\n *\r\n * @title Tree基本使用示例自定义图标\r\n * @description 添加openIcon、closeIcon属性\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree, Icon } from 'tinper-bee';\r\n\nconst TreeNode = Tree.TreeNode;\r\n\r\nconst defaultProps = {\r\n\tkeys: ['0-0-0', '0-0-1']\r\n}\r\nclass Demo1 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t\tconst keys = this.props.keys;\r\n\t\tthis.state = {\r\n\t\t\tdefaultExpandedKeys: keys,\r\n\t\t\tdefaultSelectedKeys: keys,\r\n\t\t\tdefaultCheckedKeys: keys,\r\n\t\t};\r\n\t}\r\n\tonSelect(info) {\r\n\t\tconsole.log('selected', info);\r\n\t}\r\n\tonCheck(info) {\r\n\t\tconsole.log('onCheck', info);\r\n\t}\r\n\trender() {\r\n\t\treturn (\r\n\r\n\t\t\t<Tree className=\"myCls\"  checkable openIcon={<Icon type=\"uf-minus\" />} closeIcon={<Icon type=\"uf-plus\" />}\r\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\r\n\t        defaultSelectedKeys={this.state.defaultSelectedKeys}\r\n\t        defaultCheckedKeys={this.state.defaultCheckedKeys}\r\n\t        onSelect={this.onSelect} onCheck={this.onCheck}\r\n\t      >\r\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\r\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\r\n\t          </TreeNode>\r\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\r\n\t            <TreeNode title={<span>sss</span>} key=\"0-0-1-0\" />\r\n\t          </TreeNode>\r\n\t        </TreeNode>\r\n\t      </Tree>\r\n\t\t);\r\n\t}\r\n}\r\n\r\nDemo1.defaultProps = defaultProps;\r\n\r\n\r\n","desc":" 添加openIcon、closeIcon属性"},{"example":<Demo7 />,"title":" Tree增加节点","code":"/**\n *\n * @title Tree增加节点\n * @description 增加节点和拖拽组合使用示例\n *\n */\n\n\nimport React, {\n  Component\n} from 'react';\nimport { Tree, Button } from 'tinper-bee';\n\nconst TreeNode = Tree.TreeNode;\n\n\nclass Demo7 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      treeData: [],\n      defaultExpandedKeys: ['0-0', '0-1', '0-2'],\n      parentNode: {}\n    };\n    this.onSelect = this.onSelect.bind(this);\n    this.addNode = this.addNode.bind(this);\n    this.clickFun = this.clickFun.bind(this);\n    this.getNodeByKey = this.getNodeByKey.bind(this);\n    this.parentNode = null\n  }\n  componentDidMount() {\n      setTimeout(() => {\n        this.setState({\n          treeData: [{\n            name: 'pNode 01',\n            key: '0-0',\n            children: [{\n              name: 'leaf 0-0-0',\n              key: '0-0-0'\n            }, {\n              name: 'leaf 0-0-1',\n              key: '0-0-1'\n            }]\n          }, {\n            name: 'pNode 02',\n            key: '0-1',\n            children: [{\n              name: 'leaf 0-1-0',\n              key: '0-1-0'\n            }, {\n              name: 'leaf 0-1-1',\n              key: '0-1-1'\n            }]\n          }, {\n            name: 'pNode 03',\n            key: '0-2',\n            isLeaf: true\n          }, ],\n        });\n      }, 100);\n    }\n    /**\n     * 增加节点\n     * @param string prKey    [父节点key]\n     * @param object nodeItem [子节点信息]\n     */\n  addNode(prKey, nodeItem) {\n    const data = this.state.treeData;\n    let parNode;\n    if (prKey) {\n      // 如果prKey存在则搜索父节点进行添加\n      parNode = this.getNodeByKey(data, prKey);\n      //如果父节点存在的话，添加到父节点上\n      if (parNode) {\n        if (!parNode.children) {\n          parNode.children = [];\n        }\n        // 如果key不存在就动态生成一个\n        if (!nodeItem.key) {\n          nodeItem.key = prKey + parNode.children.length + 1;\n        }\n        parNode.children.push(nodeItem);\n      }\n    } else {\n      // 没有穿prKey添加到根下成为一级节点\n      if (!nodeItem.key) {\n        nodeItem.key = \"0-\" + data.length + 1;\n      }\n      data.push(nodeItem);\n    }\n\n    this.setState({\n      data\n    });\n  }\n\n  getNodeByKey(data, key) {\n    if (!this.parentNode) {\n      data.find(item => {\n        if (item.key === key) {\n          console.log('item.name---' + item.name)\n          this.parentNode = item;\n          return (true);\n        } else if (item.children) {\n          return this.getNodeByKey(item.children, key);\n\n        }\n      })\n    }\n    return this.parentNode;\n  }\n\n\n\n  onSelect(info) {\n      console.log('selected', info);\n    }\n    /**\n     * 点击button事件\n     */\n  clickFun() {\n    let prKey, nodeItem;\n    prKey = '0-1';\n    nodeItem = {\n      name: 'leaf 0-0-4'\n    }\n    this.addNode(prKey, nodeItem);\n  }\n\n  onDragEnter = (info) => {\n    console.log(info);\n    // expandedKeys 需要受控时设置\n    // this.setState({\n    //   expandedKeys: info.expandedKeys,\n    // });\n  }\n  onDrop = (info) => {\n    console.log(info);\n    const dropKey = info.node.props.eventKey;\n    const dragKey = info.dragNode.props.eventKey;\n    // const dragNodesKeys = info.dragNodesKeys;\n    const loop = (data, key, callback) => {\n      data.forEach((item, index, arr) => {\n        if (item.key === key) {\n          return callback(item, index, arr);\n        }\n        if (item.children) {\n          return loop(item.children, key, callback);\n        }\n      });\n    };\n    const data = [...this.state.treeData];\n    let dragObj;\n    loop(data, dragKey, (item, index, arr) => {\n      arr.splice(index, 1);\n      dragObj = item;\n    });\n    if (info.dropToGap) {\n      let ar;\n      let i;\n      loop(data, dropKey, (item, index, arr) => {\n        ar = arr;\n        i = index;\n      });\n      ar.splice(i, 0, dragObj);\n    } else {\n      loop(data, dropKey, (item) => {\n        item.children = item.children || [];\n        // where to insert 示例添加到尾部，可以是随意位置\n        item.children.push(dragObj);\n      });\n    }\n    this.setState({\n      treeData: data,\n    });\n  }\n\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children) {\n        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;\n      }\n      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;\n    });\n    const treeNodes = loop(this.state.treeData);\n    console.log('defaultKeys--' + this.state.defaultExpandedKeys);\n    return (\n      <div>\n        <Tree \n        className=\"myCls\"\n        onSelect={this.onSelect} \n        defaultExpandedKeys={this.state.defaultExpandedKeys} \n        draggable\n        onDragEnter={this.onDragEnter}\n        onDrop={this.onDrop}>\n          {treeNodes}\n        </Tree>\n        <Button colors=\"primary\" onClick={this.clickFun}>\n        增加节点\n        </Button>\n      </div>\n    );\n  }\n};\n\n","desc":" 增加节点和拖拽组合使用示例"},{"example":<Demo8 />,"title":" Tree 节点可编辑","code":"/**\r\n *\r\n * @title Tree 节点可编辑\r\n * @description 鼠标移动到节点上点击编辑图标进行编辑。e.node.props.eventKey代表当前节点key值。editKey指当前操作的节点key\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree, Icon, Button } from 'tinper-bee';\r\n\n\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nclass Demo8 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\r\n\t\tthis.state = {\r\n\t\t\ttreeData: [],\r\n\t\t\tisHover: \"\",\r\n\t\t\teditKey: \"\"\r\n\t\t};\r\n\r\n\t}\r\n\r\n\r\n\tonMouseEnter = (e) => {\r\n\t\tthis.setState({\r\n\t\t\tisHover: e.node.props.eventKey\r\n\t\t})\r\n\t}\r\n\tonMouseLeave = (e, treenode) => {\r\n\t\tthis.setState({\r\n\t\t\tisHover: \"\",\r\n\t\t\teditKey: \"\"\r\n\t\t})\r\n\r\n\t}\r\n\r\n\teditRender = (item) => {\r\n\t\tthis.setState({\r\n\t\t\teditKey: item.key\r\n\t\t});\r\n\t}\r\n\tnodechange = (item, value) => {\r\n\t\titem.name = value;\r\n\t}\r\n\trenderTreeTitle = (item) => {\r\n\t\tlet titleIcon, titleInfo;\r\n\t\t//编辑时input框\r\n\t\tif (this.state.editKey == item.key) {\r\n\t\t\ttitleInfo = <input type=\"text\" id=\"itemKey\" defaultValue={item.name} onChange={(e) => this.nodechange(item, e.target.value)} />\r\n\t\t} else {\r\n\t\t\ttitleInfo = <span className=\"title-middle\">{item.name}</span>\r\n\t\t}\r\n\t\t//编辑图标\r\n\t\tif (this.state.isHover == item.key) {\r\n\t\t\ttitleIcon = <Icon className=\"title-middle edit-icon\" type=\"uf-pencil\" onClick={(e) => this.editRender(item)}></Icon>;\r\n\t\t}\r\n\t\treturn (<div className=\"title-con\">\r\n\r\n\t\t\t{titleInfo}\r\n\t\t\t{titleIcon}\r\n\t\t</div>);\r\n\t}\r\n\r\n\tcomponentDidMount = () => {\r\n\t\tsetTimeout(() => {\r\n\t\t\tthis.setState({\r\n\t\t\t\ttreeData: [{\r\n\t\t\t\t\tname: 'pNode 01',\r\n\t\t\t\t\tkey: '0-0',\r\n\t\t\t\t\tchildren: [{\r\n\t\t\t\t\t\tname: 'leaf 0-0-0',\r\n\t\t\t\t\t\tkey: '0-0-0'\r\n\t\t\t\t\t}, {\r\n\t\t\t\t\t\tname: 'leaf 0-0-1',\r\n\t\t\t\t\t\tkey: '0-0-1'\r\n\t\t\t\t\t}]\r\n\t\t\t\t}, {\r\n\t\t\t\t\tname: 'pNode 02',\r\n\t\t\t\t\tkey: '0-1',\r\n\t\t\t\t\tchildren: [{\r\n\t\t\t\t\t\tname: 'leaf 0-1-0',\r\n\t\t\t\t\t\tkey: '0-1-0'\r\n\t\t\t\t\t}, {\r\n\t\t\t\t\t\tname: 'leaf 0-1-1',\r\n\t\t\t\t\t\tkey: '0-1-1'\r\n\t\t\t\t\t}]\r\n\t\t\t\t}, {\r\n\t\t\t\t\tname: 'pNode 03',\r\n\t\t\t\t\tkey: '0-2',\r\n\t\t\t\t\tisLeaf: true\r\n\t\t\t\t}, ],\r\n\t\t\t});\r\n\t\t\r\n\t\t}, 100);\r\n\t}\r\n\trender() {\r\n\t\tconst loop = data => data.map((item) => {\r\n\t\t\tif (item.children) {\r\n\t\t\t\treturn <TreeNode title={this.renderTreeTitle(item)} key={item.key}>{loop(item.children)}</TreeNode>;\r\n\t\t\t}\r\n\t\t\treturn <TreeNode title={this.renderTreeTitle(item)} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;\r\n\t\t});\r\n\t\tconst treeNodes = loop(this.state.treeData);\r\n\t\treturn (\r\n\t\t\t<Tree onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} className=\"myCls\">\r\n\t\t\t\t{treeNodes}\r\n\t\t\t</Tree>\r\n\r\n\t\t);\r\n\t}\r\n}\r\n\r\n\r\n\r\n","desc":" 鼠标移动到节点上点击编辑图标进行编辑。e.node.props.eventKey代表当前节点key值。editKey指当前操作的节点key","scss_code":".title-middle {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n.edit-icon {\r\n  float:right;\r\n  font-size: 16px;\r\n  height: 16px;\r\n  line-height: 20px;\r\n}\r\n.title-con {\r\n  min-width: 150px;\r\n}"},{"example":<Demo9 />,"title":" 连接线Tree","code":"/**\r\n *\r\n * @title 连接线Tree\r\n * @description \r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst TreeNode = Tree.TreeNode;\r\nclass Demo9 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t\tconst keys = this.props.keys;\r\n\t\tthis.state = {\r\n\t\t\tdefaultExpandedKeys: keys\r\n\t\t};\r\n\r\n\t}\r\n\r\n\trender() {\r\n\t\treturn (\r\n\t\t\t<Tree className=\"myCls\" showLine checkable  defaultExpandAll={true}>\r\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\r\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" >\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\"  />\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\r\n\t          </TreeNode>\r\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\r\n\t            <TreeNode title={<span>sss</span>} key=\"0-0-1-0\" />\r\n\t          </TreeNode>\r\n\t        </TreeNode>\r\n\t      </Tree>\r\n\t\t);\r\n\t}\r\n}\r\n\r\n","desc":" "},{"example":<Demo10 />,"title":" Tree基本使用示例","code":"/**\r\n *\r\n * @title Tree基本使用示例\r\n * @description 如何获取选中对象自定义对象和数据\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nconst defaultProps = {\r\n\tkeys: ['0-0-0', '0-0-1']\r\n}\r\nclass Demo10 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t\tconst keys = this.props.keys;\r\n\t\tthis.state = {\r\n\t\t\tdefaultExpandedKeys: keys,\r\n\t\t\tdefaultSelectedKeys: keys,\r\n\t\t\tdefaultCheckedKeys:keys\r\n\t\t\t// checkedKeys: {checked:keys},\r\n\t\t};\r\n    }\r\n    /**\r\n     * 获取当前选中行的item对象。\r\n     * @param {*} value \r\n     */\r\n\tonSelect(selectedKeys, e) {\r\n        console.log(`${selectedKeys} selected`);//获取key\r\n        let currentObject = {};\r\n        currentObject.title = e.node.props.title; //获取选中对象的数据\r\n        currentObject.key = e.node.props.eventKey;\r\n        console.log(currentObject); \r\n\t}\r\n\tonCheck = (checkedKeys) => {\r\n\t\tlet self = this;\r\n\t\tconsole.log('onCheck', checkedKeys);\r\n\t\tconst cks = {\r\n\t\t\tchecked: checkedKeys.checked || checkedKeys,\r\n\t\t};\r\n\t\t// this.setState({checkedKeys:cks});\r\n\t}\r\n\r\n\tonDoubleClick=(key,treeNode)=>{\r\n\t\tconsole.log('---onDblClick---'+key+'--treeNode--'+treeNode);\r\n\t}\r\n\trender() {\r\n\t\r\n\t\treturn (\r\n\t\t\t<Tree className=\"myCls\" showLine checkable\r\n                defaultExpandedKeys={this.state.defaultExpandedKeys}\r\n                defaultSelectedKeys={this.state.defaultSelectedKeys}\r\n                defaultCheckedKeys = {this.state.defaultCheckedKeys}\r\n                checkStrictly\r\n                onSelect={this.onSelect} onCheck={this.onCheck}\r\n                onDoubleClick={this.onDoubleClick}\r\n            >\r\n                <TreeNode title=\"parent 1\" key=\"0-0\" >\r\n                <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\r\n                    <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\r\n                    <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\r\n                </TreeNode>\r\n                <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\r\n                    <TreeNode title={<span>sss</span>} key=\"0-0-1-0\" />\r\n                </TreeNode>\r\n                <TreeNode title=\"parent 1-2\" key=\"0-0-2\" >\r\n                    <TreeNode title=\"leaf\" key=\"0-0-2-0\" />\r\n                    <TreeNode title=\"leaf\" key=\"0-0-2-1\" />\r\n                </TreeNode>\r\n                </TreeNode>\r\n\t      </Tree>\r\n\t\t);\r\n\t}\r\n}\r\n\r\nDemo10.defaultProps = defaultProps;\r\n\r\n\r\n","desc":" 如何获取选中对象自定义对象和数据"},{"example":<Demo11 />,"title":" 用户自定义节点属性ext","code":"/**\n*\n* @title 用户自定义节点属性ext\n* @description 业务中扩展的数据可以定义在ext属性中，用户可以在TreeNode节点中获取ext属性。此例中将treeNode的数据存放在了ext中，方便用户获取。\n* \b\n*/\n\nimport React, { Component } from 'react';\nimport { Tree } from 'tinper-bee';\n\nconst x = 6;\nconst y = 5;\nconst z = 2;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n    const preKey = _preKey || '0';\n    const tns = _tns || gData;\n\n    const children = [];\n    for (let i = 0; i < x; i++) {\n        const key = `${preKey}-${i}`;\n        tns.push({ title: key, key });\n        if (i < y) {\n            children.push(key);\n        }\n    }\n    if (_level < 0) {\n        return tns;\n    }\n    const level = _level - 1;\n    children.forEach((key, index) => {\n        tns[index].children = [];\n        return generateData(level, key, tns[index].children);\n    });\n};\ngenerateData(z);\n\nconst TreeNode = Tree.TreeNode;\n\n\nclass Demo11 extends Component{\n  constructor(props) {\n  \tsuper(props);\n    this.state = {\n      expandedKeys: [],\n      autoExpandParent: true,\n      checkedKeys: ['0-0-0'],\n      selectedKeys: [],\n    };\n    this.onExpand = this.onExpand.bind(this);\n    this.onCheck = this.onCheck.bind(this);\n    this.onSelect = this.onSelect.bind(this);\n  }\n  onExpand(expandedKeys,nodeInfo) {\n    console.log('onExpand---显示ext数据', nodeInfo.node.props.ext.data);\n\n    this.setState({\n      expandedKeys,\n      autoExpandParent: false,\n    });\n  }\n  onCheck(checkedKeys) {\n    this.setState({\n      checkedKeys,\n      selectedKeys: ['0-3', '0-4'],\n    });\n  }\n  onSelect(selectedKeys, info) {\n    console.log('onSelect', info);\n    this.setState({ selectedKeys });\n  }\n  // keydown的钩子事件\n  onKeyDown = (e,treeNode)=>{\n    console.log('***',e);\n    return false;\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children) {\n        return (\n          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'} ext={{'data':item}}>\n            {loop(item.children)}\n          </TreeNode>\n        );\n      }\n      return <TreeNode key={item.key} title={item.key} isLeaf={true}/>;\n    });\n    return (\n      <Tree\n        checkable\n        focusable\n        className=\"demo2 myCls\"\n        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}\n        autoExpandParent={this.state.autoExpandParent}\n        onCheck={this.onCheck} \n        onSelect={this.onSelect} \n        keyFun={this.onKeyDown}\n      >\n        {loop(gData)}\n      </Tree>\n    );\n  }\n};\n\n\n","desc":" 业务中扩展的数据可以定义在ext属性中，用户可以在TreeNode节点中获取ext属性。此例中将treeNode的数据存放在了ext中，方便用户获取。"},{"example":<Demo12 />,"title":" 滚动加载树节点","code":"/**\r\n*\r\n* @title 滚动加载树节点\r\n* @description 适用于大数据场景\r\n*/\r\n\r\nimport React, { Component } from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst x = 50;\r\nconst y = 5;\r\nconst z = 1;\r\nconst gData = [];\r\n\r\nconst generateData = (_level, _preKey, _tns) => {\r\n    const preKey = _preKey || '0';\r\n    const tns = _tns || gData;\r\n\r\n    const children = [];\r\n    for (let i = 0; i < x; i++) {\r\n        const key = `${preKey}-${i}`;\r\n        tns.push({ title: key, key });\r\n        if (i < y) {\r\n            children.push(key);\r\n        }\r\n    }\r\n    if (_level < 0) {\r\n        return tns;\r\n    }\r\n    const level = _level - 1;\r\n    children.forEach((key, index) => {\r\n        tns[index].children = [];\r\n        return generateData(level, key, tns[index].children);\r\n    });\r\n};\r\ngenerateData(z);\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\n\r\nclass Demo12 extends Component{\r\n  constructor(props) {\r\n  \tsuper(props);\r\n    this.state = {\r\n      expandedKeys: ['0-0','0-1','0-2','0-3', '0-4','0-5','0-6','0-0-0','0-0-1'],\r\n      autoExpandParent: true,\r\n      checkedKeys: ['0-0-0'],\r\n      selectedKeys: [],\r\n    };\r\n    this.onExpand = this.onExpand.bind(this);\r\n    this.onCheck = this.onCheck.bind(this);\r\n    this.onSelect = this.onSelect.bind(this);\r\n  }\r\n  onExpand(expandedKeys,nodeInfo) {\r\n    // console.log('onExpand---显示ext数据', nodeInfo.node.props.ext.data);\r\n\r\n    this.setState({\r\n      expandedKeys,\r\n      autoExpandParent: false,\r\n    });\r\n  }\r\n  onCheck(checkedKeys) {\r\n    this.setState({\r\n      checkedKeys,\r\n      selectedKeys: ['0-3', '0-4'],\r\n    });\r\n  }\r\n  onSelect(selectedKeys, info) {\r\n    console.log('onSelect', info);\r\n    this.setState({ selectedKeys });\r\n  }\r\n  // keydown的钩子事件\r\n  onKeyDown = (e,treeNode)=>{\r\n    console.log('***',e);\r\n    return false;\r\n  }\r\n  render() {\r\n    return (\r\n      <div style={{height:'300px',overflow:'auto',border:'1px solid'}}>\r\n        <Tree\r\n          checkable\r\n          focusable\r\n          treeData={gData}\r\n          lazyLoad={true}\r\n          onExpand={this.onExpand}\r\n          defaultExpandAll={true} \r\n          expandedKeys={this.state.expandedKeys}\r\n          autoExpandParent={this.state.autoExpandParent}\r\n          onCheck={this.onCheck} \r\n          onSelect={this.onSelect} \r\n          keyFun={this.onKeyDown}\r\n        >\r\n        </Tree>\r\n      </div>\r\n    );\r\n  }\r\n};\r\n\r\n\r\n","desc":" 适用于大数据场景"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
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
            {[DemoArray[11]].map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
