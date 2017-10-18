
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


var Demo1 = require("./demolist/Demo1");var Demo6 = require("./demolist/Demo6");var DemoArray = [{"example":<Demo1 />,"title":" Tree基本使用事例","code":"/**\r\n*\r\n* @title Tree基本使用事例\r\n* @description 事例涵盖 checkbox如何选择，disable状态和部分选择状态。\r\n*\r\n*/\r\n\r\n\r\nimport React, { Component } from 'react';\r\nimport Tree from 'bee-tree';\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nconst defaultProps = {\r\n\tkeys: ['0-0-0', '0-0-1']\r\n}\r\nconsole.log(Tree);\r\nclass Demo1 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t    const keys = this.props.keys;\r\n\t    this.state = {\r\n\t      defaultExpandedKeys: keys,\r\n\t      defaultSelectedKeys: keys,\r\n\t      defaultCheckedKeys: keys,\r\n\t    };\r\n\t}\r\n\tonSelect(info) {\r\n\t    console.log('selected', info);\r\n\t}\r\n\tonCheck(info) {\r\n\t    console.log('onCheck', info);\r\n\t}\r\n\trender() {\r\n\t    return (\r\n\t      <Tree className=\"myCls\" showLine checkable\r\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\r\n\t        defaultSelectedKeys={this.state.defaultSelectedKeys}\r\n\t        defaultCheckedKeys={this.state.defaultCheckedKeys}\r\n\t        onSelect={this.onSelect} onCheck={this.onCheck}\r\n\t      >\r\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\r\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\r\n\t          </TreeNode>\r\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\r\n\t            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key=\"0-0-1-0\" />\r\n\t          </TreeNode>\r\n\t        </TreeNode>\r\n\t      </Tree>\r\n\t    );\r\n\t}\r\n}\r\n\r\nDemo1.defaultProps = defaultProps;\r\n\r\n\r\n","desc":" 事例涵盖 checkbox如何选择，disable状态和部分选择状态。"},{"example":<Demo6 />,"title":" Tree基本使用事例自定义图标","code":"/**\r\n *\r\n * @title Tree基本使用事例自定义图标\r\n * @description 添加openIcon、closeIcon属性\r\n *\r\n */\r\n\r\n\r\nimport React, {\r\n\tComponent\r\n} from 'react';\r\nimport Tree from 'bee-tree';\r\n\r\nconst TreeNode = Tree.TreeNode;\r\n\r\nconst defaultProps = {\r\n\tkeys: ['0-0-0', '0-0-1']\r\n}\r\nconsole.log(Tree);\r\nclass Demo1 extends Component {\r\n\tconstructor(props) {\r\n\t\tsuper(props);\r\n\t\tconst keys = this.props.keys;\r\n\t\tthis.state = {\r\n\t\t\tdefaultExpandedKeys: keys,\r\n\t\t\tdefaultSelectedKeys: keys,\r\n\t\t\tdefaultCheckedKeys: keys,\r\n\t\t};\r\n\t}\r\n\tonSelect(info) {\r\n\t\tconsole.log('selected', info);\r\n\t}\r\n\tonCheck(info) {\r\n\t\tconsole.log('onCheck', info);\r\n\t}\r\n\trender() {\r\n\t\treturn (\r\n\r\n\t\t\t<Tree className=\"myCls\"  checkable openIcon=\"uf-minus\" closeIcon=\"uf-plus\"\r\n\t        defaultExpandedKeys={this.state.defaultExpandedKeys}\r\n\t        defaultSelectedKeys={this.state.defaultSelectedKeys}\r\n\t        defaultCheckedKeys={this.state.defaultCheckedKeys}\r\n\t        onSelect={this.onSelect} onCheck={this.onCheck}\r\n\t      >\r\n\t        <TreeNode title=\"parent 1\" key=\"0-0\">\r\n\t          <TreeNode title=\"parent 1-0\" key=\"0-0-0\" disabled>\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-0\" disableCheckbox />\r\n\t            <TreeNode title=\"leaf\" key=\"0-0-0-1\" />\r\n\t          </TreeNode>\r\n\t          <TreeNode title=\"parent 1-1\" key=\"0-0-1\">\r\n\t            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key=\"0-0-1-0\" />\r\n\t          </TreeNode>\r\n\t        </TreeNode>\r\n\t      </Tree>\r\n\t\t);\r\n\t}\r\n}\r\n\r\nDemo1.defaultProps = defaultProps;\r\n\r\n\r\n","desc":" 添加openIcon、closeIcon属性"}]


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
