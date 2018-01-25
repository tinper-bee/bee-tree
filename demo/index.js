import {Col, Row} from 'bee-layout';
import {Panel} from 'bee-panel';
import Button from 'bee-button';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo2 />,"title":" Tree数据可控事例","code":"/**\r\n*\r\n* @title Tree数据可控事例\r\n* @description\r\n*\r\n*/\r\n/*\r\nconst x = 3;\r\nconst y = 2;\r\nconst z = 1;\r\nconst gData = [];\r\n\r\nconst generateData = (_level, _preKey, _tns) => {\r\n  const preKey = _preKey || '0';\r\n  const tns = _tns || gData;\r\n\r\n  const children = [];\r\n  for (let i = 0; i < x; i++) {\r\n    const key = `${preKey}-${i}`;\r\n    tns.push({ title: key, key });\r\n    if (i < y) {\r\n      children.push(key);\r\n    }\r\n  }\r\n  if (_level < 0) {\r\n    return tns;\r\n  }\r\n  const level = _level - 1;\r\n  children.forEach((key, index) => {\r\n    tns[index].children = [];\r\n    return generateData(level, key, tns[index].children);\r\n  });\r\n};\r\ngenerateData(z);\r\n*/\r\n\r\n\r\nimport React, { Component } from 'react';\r\nimport { Tree } from 'tinper-bee';\r\n\r\nconst x = 3;\r\nconst y = 2;\r\nconst z = 1;\r\nconst gData = [];\r\n\r\nconst generateData = (_level, _preKey, _tns) => {\r\n    const preKey = _preKey || '0';\r\n    const tns = _tns || gData;\r\n\r\n    const children = [];\r\n    for (let i = 0; i < x; i++) {\r\n        const key = `${preKey}-${i}`;\r\n        tns.push({ title: key, key });\r\n        if (i < y) {\r\n            children.push(key);\r\n        }\r\n    }\r\n    if (_level < 0) {\r\n        return tns;\r\n    }\r\n    const level = _level - 1;\r\n    children.forEach((key, index) => {\r\n        tns[index].children = [];\r\n        return generateData(level, key, tns[index].children);\r\n    });\r\n};\r\ngenerateData(z);\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\n\r\nclass Demo2 extends Component{\r\n  constructor(props) {\r\n  \tsuper(props);\r\n    this.state = {\r\n      expandedKeys: [],\r\n      autoExpandParent: true,\r\n      checkedKeys: ['0-0-0'],\r\n      selectedKeys: [],\r\n    };\r\n    this.onExpand = this.onExpand.bind(this);\r\n    this.onCheck = this.onCheck.bind(this);\r\n    this.onSelect = this.onSelect.bind(this);\r\n  }\r\n  onExpand(expandedKeys) {\r\n    console.log('onExpand', arguments);\r\n    // if not set autoExpandParent to false, if children expanded, parent can not collapse.\r\n    // or, you can remove all expanded children keys.\r\n    this.setState({\r\n      expandedKeys,\r\n      autoExpandParent: false,\r\n    });\r\n  }\r\n  onCheck(checkedKeys) {\r\n    this.setState({\r\n      checkedKeys,\r\n      selectedKeys: ['0-3', '0-4'],\r\n    });\r\n  }\r\n  onSelect(selectedKeys, info) {\r\n    console.log('onSelect', info);\r\n    this.setState({ selectedKeys });\r\n  }\r\n  render() {\r\n    const loop = data => data.map((item) => {\r\n      if (item.children) {\r\n        return (\r\n          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>\r\n            {loop(item.children)}\r\n          </TreeNode>\r\n        );\r\n      }\r\n      return <TreeNode key={item.key} title={item.key} />;\r\n    });\r\n    return (\r\n      <Tree\r\n        checkable\r\n        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}\r\n        autoExpandParent={this.state.autoExpandParent}\r\n        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}\r\n        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}\r\n      >\r\n        {loop(gData)}\r\n      </Tree>\r\n    );\r\n  }\r\n};\r\n\r\n\r\n","desc":""}]


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
