
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


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var DemoArray = [{"example":<Demo1 />,"title":" Tree基本使用事例","code":"/**\n*\n* @title Tree基本使用事例\n* @description 事例涵盖 checkbox如何选择，disable状态和部分选择状态。\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Tree from 'bee-tree';\n\nconst TreeNode = Tree.TreeNode;\n\nconst defaultProps = {\n\tkeys: ['0-0-0', '0-0-1']\n}\nconsole.log(Tree);\nclass Demo1 extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t    const keys = this.props.keys;\n\t    this.state = {\n\t      defaultExpandedKeys: keys,\n\t      defaultSelectedKeys: keys,\n\t      defaultCheckedKeys: keys,\n\t    };\n\t}\n\tonSelect(info) {\n\t    console.log('selected', info);\n\t}\n\tonCheck(info) {\n\t    console.log('onCheck', info);\n\t}\n\trender() {\n\t    return (\n\t      <Tree className=\"myCls\" showLine checkable\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\n\t        defaultSelectedKeys={this.state.defaultSelectedKeys}\n\t        defaultCheckedKeys={this.state.defaultCheckedKeys}\n\t        onSelect={this.onSelect} onCheck={this.onCheck}\n\t      >\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\n\t          </TreeNode>\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\n\t            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key=\"0-0-1-0\" />\n\t          </TreeNode>\n\t        </TreeNode>\n\t      </Tree>\n\t    );\n\t}\n}\n\nDemo1.defaultProps = defaultProps;\n\n\n","desc":" 事例涵盖 checkbox如何选择，disable状态和部分选择状态。"},{"example":<Demo2 />,"title":" Tree数据可控事例","code":"/**\n*\n* @title Tree数据可控事例\n* @description\n*\n*/\n/*\nconst x = 3;\nconst y = 2;\nconst z = 1;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n  const preKey = _preKey || '0';\n  const tns = _tns || gData;\n\n  const children = [];\n  for (let i = 0; i < x; i++) {\n    const key = `${preKey}-${i}`;\n    tns.push({ title: key, key });\n    if (i < y) {\n      children.push(key);\n    }\n  }\n  if (_level < 0) {\n    return tns;\n  }\n  const level = _level - 1;\n  children.forEach((key, index) => {\n    tns[index].children = [];\n    return generateData(level, key, tns[index].children);\n  });\n};\ngenerateData(z);\n*/\n\n\nimport React, { Component } from 'react';\nimport Tree from 'bee-tree';\n\nconst x = 3;\nconst y = 2;\nconst z = 1;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n    const preKey = _preKey || '0';\n    const tns = _tns || gData;\n\n    const children = [];\n    for (let i = 0; i < x; i++) {\n        const key = `${preKey}-${i}`;\n        tns.push({ title: key, key });\n        if (i < y) {\n            children.push(key);\n        }\n    }\n    if (_level < 0) {\n        return tns;\n    }\n    const level = _level - 1;\n    children.forEach((key, index) => {\n        tns[index].children = [];\n        return generateData(level, key, tns[index].children);\n    });\n};\ngenerateData(z);\n\nconst TreeNode = Tree.TreeNode;\n\n\nclass Demo2 extends Component{\n  constructor(props) {\n  \tsuper(props);\n    this.state = {\n      expandedKeys: ['0-0-0', '0-0-1'],\n      autoExpandParent: true,\n      checkedKeys: ['0-0-0'],\n      selectedKeys: [],\n    };\n    this.onExpand = this.onExpand.bind(this);\n    this.onCheck = this.onCheck.bind(this);\n    this.onSelect = this.onSelect.bind(this);\n  }\n  onExpand(expandedKeys) {\n    console.log('onExpand', arguments);\n    // if not set autoExpandParent to false, if children expanded, parent can not collapse.\n    // or, you can remove all expanded children keys.\n    this.setState({\n      expandedKeys,\n      autoExpandParent: false,\n    });\n  }\n  onCheck(checkedKeys) {\n    this.setState({\n      checkedKeys,\n      selectedKeys: ['0-3', '0-4'],\n    });\n  }\n  onSelect(selectedKeys, info) {\n    console.log('onSelect', info);\n    this.setState({ selectedKeys });\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children) {\n        return (\n          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>\n            {loop(item.children)}\n          </TreeNode>\n        );\n      }\n      return <TreeNode key={item.key} title={item.key} />;\n    });\n    return (\n      <Tree\n        checkable\n        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}\n        autoExpandParent={this.state.autoExpandParent}\n        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}\n        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}\n      >\n        {loop(gData)}\n      </Tree>\n    );\n  }\n};\n\n\n","desc":""},{"example":<Demo3 />,"title":" Tree 拖拽使用事例","code":"/**\n*\n* @title Tree 拖拽使用事例\n* @description 拖动结点插入到另一个结点后面或者其他的父节点里面。\n*\n*/\n\n\n\nimport React, { Component } from 'react';\nimport Tree from 'bee-tree';\n\nconst x = 3;\nconst y = 2;\nconst z = 1;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n    const preKey = _preKey || '0';\n    const tns = _tns || gData;\n\n    const children = [];\n    for (let i = 0; i < x; i++) {\n        const key = `${preKey}-${i}`;\n        tns.push({ title: key, key });\n        if (i < y) {\n            children.push(key);\n        }\n    }\n    if (_level < 0) {\n        return tns;\n    }\n    const level = _level - 1;\n    children.forEach((key, index) => {\n        tns[index].children = [];\n        return generateData(level, key, tns[index].children);\n    });\n};\ngenerateData(z);\n\nconst TreeNode = Tree.TreeNode;\n\nclass Demo3 extends Component{\n  constructor(props) {\n    super(props);\n    this.state = {\n      gData,\n      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],\n    };\n    this.onDragEnter = this.onDragEnter.bind(this);\n    this.onDrop = this.onDrop.bind(this);\n  }\n  onDragEnter(info) {\n    console.log(info);\n    // expandedKeys 需要受控时设置\n    // this.setState({\n    //   expandedKeys: info.expandedKeys,\n    // });\n  }\n  onDrop(info) {\n    console.log(info);\n    const dropKey = info.node.props.eventKey;\n    const dragKey = info.dragNode.props.eventKey;\n    // const dragNodesKeys = info.dragNodesKeys;\n    const loop = (data, key, callback) => {\n      data.forEach((item, index, arr) => {\n        if (item.key === key) {\n          return callback(item, index, arr);\n        }\n        if (item.children) {\n          return loop(item.children, key, callback);\n        }\n      });\n    };\n    const data = [...this.state.gData];\n    let dragObj;\n    loop(data, dragKey, (item, index, arr) => {\n      arr.splice(index, 1);\n      dragObj = item;\n    });\n    if (info.dropToGap) {\n      let ar;\n      let i;\n      loop(data, dropKey, (item, index, arr) => {\n        ar = arr;\n        i = index;\n      });\n      ar.splice(i, 0, dragObj);\n    } else {\n      loop(data, dropKey, (item) => {\n        item.children = item.children || [];\n        // where to insert 示例添加到尾部，可以是随意位置\n        item.children.push(dragObj);\n      });\n    }\n    this.setState({\n      gData: data,\n    });\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children && item.children.length) {\n        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;\n      }\n      return <TreeNode key={item.key} title={item.key} />;\n    });\n    return (\n      <Tree\n        defaultExpandedKeys={this.state.expandedKeys}\n        draggable\n        onDragEnter={this.onDragEnter}\n        onDrop={this.onDrop}\n      >\n        {loop(this.state.gData)}\n      </Tree>\n    );\n  }\n};\n\n","desc":" 拖动结点插入到另一个结点后面或者其他的父节点里面。"},{"example":<Demo4 />,"title":" Tree可搜索事例","code":"/**\n*\n* @title Tree可搜索事例\n* @description\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport FormControl from 'bee-form-control';\nimport Tree from 'bee-tree';\n\nconst x = 3;\nconst y = 2;\nconst z = 1;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n    const preKey = _preKey || '0';\n    const tns = _tns || gData;\n\n    const children = [];\n    for (let i = 0; i < x; i++) {\n        const key = `${preKey}-${i}`;\n        tns.push({ title: key, key });\n        if (i < y) {\n            children.push(key);\n        }\n    }\n    if (_level < 0) {\n        return tns;\n    }\n    const level = _level - 1;\n    children.forEach((key, index) => {\n        tns[index].children = [];\n        return generateData(level, key, tns[index].children);\n    });\n};\ngenerateData(z);\n\nconst TreeNode = Tree.TreeNode;\n\nconst dataList = [];\nconst generateList = (data) => {\n  for (let i = 0; i < data.length; i++) {\n    const node = data[i];\n    const key = node.key;\n    dataList.push({ key, title: key });\n    if (node.children) {\n      generateList(node.children, node.key);\n    }\n  }\n};\ngenerateList(gData);\n\nconst getParentKey = (key, tree) => {\n  let parentKey;\n  for (let i = 0; i < tree.length; i++) {\n    const node = tree[i];\n    if (node.children) {\n      if (node.children.some(item => item.key === key)) {\n        parentKey = node.key;\n      } else if (getParentKey(key, node.children)) {\n        parentKey = getParentKey(key, node.children);\n      }\n    }\n  }\n  return parentKey;\n};\n\n\nclass Demo4 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      expandedKeys: [],\n      searchValue: '',\n      autoExpandParent: true,\n    }\n  }\n  onExpand = (expandedKeys) => {\n    this.setState({\n      expandedKeys,\n      autoExpandParent: false,\n    });\n  }\n  onChange = (e) => {\n    const value = e.target.value;\n    const expandedKeys = [];\n    dataList.forEach((item) => {\n      if (item.key.indexOf(value) > -1) {\n        expandedKeys.push(getParentKey(item.key, gData));\n      }\n    });\n    const uniqueExpandedKeys = [];\n    expandedKeys.forEach((item) => {\n      if (item && uniqueExpandedKeys.indexOf(item) === -1) {\n        uniqueExpandedKeys.push(item);\n      }\n    });\n    this.setState({\n      expandedKeys: uniqueExpandedKeys,\n      searchValue: value,\n      autoExpandParent: true,\n    });\n  }\n  render() {\n    const { searchValue, expandedKeys, autoExpandParent } = this.state;\n    const loop = data => data.map((item) => {\n      const index = item.key.search(searchValue);\n      const beforeStr = item.key.substr(0, index);\n      const afterStr = item.key.substr(index + searchValue.length);\n      const title = index > -1 ? (\n        <span>\n          {beforeStr}\n          <span className=\"u-tree-searchable-filter\">{searchValue}</span>\n          {afterStr}\n        </span>\n      ) : <span>{item.key}</span>;\n      if (item.children) {\n        return (\n          <TreeNode key={item.key} title={title}>\n            {loop(item.children)}\n          </TreeNode>\n        );\n      }\n      return <TreeNode key={item.key} title={title} />;\n    });\n    return (\n      <div>\n        <FormControl\n          style={{ width: 200 }}\n          placeholder=\"Search\"\n          onChange={this.onChange}\n        />\n        <Tree\n          onExpand={this.onExpand}\n          expandedKeys={expandedKeys}\n          autoExpandParent={autoExpandParent}\n        >\n          {loop(gData)}\n        </Tree>\n      </div>\n    );\n  }\n}\n\n","desc":""},{"example":<Demo5 />,"title":" Tree异步数据加载","code":"/**\n*\n* @title Tree异步数据加载\n* @description 当点击展开，异步获取子节点数据\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Tree from 'bee-tree';\n\nconst x = 3;\nconst y = 2;\nconst z = 1;\nconst gData = [];\n\nconst generateData = (_level, _preKey, _tns) => {\n    const preKey = _preKey || '0';\n    const tns = _tns || gData;\n\n    const children = [];\n    for (let i = 0; i < x; i++) {\n        const key = `${preKey}-${i}`;\n        tns.push({ title: key, key });\n        if (i < y) {\n            children.push(key);\n        }\n    }\n    if (_level < 0) {\n        return tns;\n    }\n    const level = _level - 1;\n    children.forEach((key, index) => {\n        tns[index].children = [];\n        return generateData(level, key, tns[index].children);\n    });\n};\ngenerateData(z);\n\nconst TreeNode = Tree.TreeNode;\n\nfunction generateTreeNodes(treeNode) {\n  const arr = [];\n  const key = treeNode.props.eventKey;\n  for (let i = 0; i < 3; i++) {\n    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });\n  }\n  return arr;\n}\n\nfunction setLeaf(treeData, curKey, level) {\n  const loopLeaf = (data, lev) => {\n    const l = lev - 1;\n    data.forEach((item) => {\n      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :\n        curKey.indexOf(item.key) !== 0) {\n        return;\n      }\n      if (item.children) {\n        loopLeaf(item.children, l);\n      } else if (l < 1) {\n        item.isLeaf = true;\n      }\n    });\n  };\n  loopLeaf(treeData, level + 1);\n}\n\nfunction getNewTreeData(treeData, curKey, child, level) {\n  const loop = (data) => {\n    if (level < 1 || curKey.length - 3 > level * 2) return;\n    data.forEach((item) => {\n      if (curKey.indexOf(item.key) === 0) {\n        if (item.children) {\n          loop(item.children);\n        } else {\n          item.children = child;\n        }\n      }\n    });\n  };\n  loop(treeData);\n  setLeaf(treeData, curKey, level);\n}\n\nclass Demo5 extends Component{\n  constructor(props) {\n    super(props);\n    this.state = {\n      treeData: [],\n    };\n    this.onSelect = this.onSelect.bind(this);\n    this.onLoadData = this.onLoadData.bind(this);\n  }\n  componentDidMount() {\n    setTimeout(() => {\n      this.setState({\n        treeData: [\n          { name: 'pNode 01', key: '0-0' },\n          { name: 'pNode 02', key: '0-1' },\n          { name: 'pNode 03', key: '0-2', isLeaf: true },\n        ],\n      });\n    }, 100);\n  }\n  onSelect(info) {\n    console.log('selected', info);\n  }\n  onLoadData(treeNode) {\n    return new Promise((resolve) => {\n      setTimeout(() => {\n        const treeData = [...this.state.treeData];\n        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);\n        this.setState({ treeData });\n        resolve();\n      }, 1000);\n    });\n  }\n  render() {\n    const loop = data => data.map((item) => {\n      if (item.children) {\n        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;\n      }\n      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;\n    });\n    const treeNodes = loop(this.state.treeData);\n    return (\n      <Tree onSelect={this.onSelect} loadData={this.onLoadData}>\n        {treeNodes}\n      </Tree>\n    );\n  }\n};\n\n","desc":" 当点击展开，异步获取子节点数据"},{"example":<Demo6 />,"title":" Tree基本使用事例自定义图标","code":"/**\n *\n * @title Tree基本使用事例自定义图标\n * @description 添加openIcon、closeIcon属性\n *\n */\n\n\nimport React, {\n\tComponent\n} from 'react';\nimport Tree from 'bee-tree';\n\nconst TreeNode = Tree.TreeNode;\n\nconst defaultProps = {\n\tkeys: ['0-0-0', '0-0-1']\n}\nconsole.log(Tree);\nclass Demo1 extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tconst keys = this.props.keys;\n\t\tthis.state = {\n\t\t\tdefaultExpandedKeys: keys,\n\t\t\tdefaultSelectedKeys: keys,\n\t\t\tdefaultCheckedKeys: keys,\n\t\t};\n\t}\n\tonSelect(info) {\n\t\tconsole.log('selected', info);\n\t}\n\tonCheck(info) {\n\t\tconsole.log('onCheck', info);\n\t}\n\trender() {\n\t\treturn (\n\n\t\t\t<Tree className=\"myCls\"  checkable openIcon=\"uf-minus\" closeIcon=\"uf-plus\"\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\n\t        defaultSelectedKeys={this.state.defaultSelectedKeys}\n\t        defaultCheckedKeys={this.state.defaultCheckedKeys}\n\t        onSelect={this.onSelect} onCheck={this.onCheck}\n\t      >\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\n\t          </TreeNode>\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\n\t            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key=\"0-0-1-0\" />\n\t          </TreeNode>\n\t        </TreeNode>\n\t      </Tree>\n\t\t);\n\t}\n}\n\nDemo1.defaultProps = defaultProps;\n\n\n","desc":" 添加openIcon、closeIcon属性"}]


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
