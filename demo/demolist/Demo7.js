/**
 *
 * @title Tree增加节点
 * @description 
 *
 */


import React, {
  Component
} from 'react';
import Tree from '../../src';
import Button from 'bee-button';

const TreeNode = Tree.TreeNode;

class Demo7 extends Component {
  constructor(props) {
    super(props);
    debugger;
    console.log('keys--' + this.props.keys);
    this.state = {
      treeData: [],
      defaultExpandedKeys: ['0-0', '0-1', '0-2']
    };
    this.onSelect = this.onSelect.bind(this);
    this.addNode = this.addNode.bind(this);
    this.clickFun = this.clickFun.bind(this);
  }
  componentDidMount() {
      setTimeout(() => {
        this.setState({
          treeData: [{
            name: 'pNode 01',
            key: '0-0',
            children: [{
              name: 'leaf 0-0-0',
              key: '0-0-0'
            }, {
              name: 'leaf 0-0-1',
              key: '0-0-1'
            }]
          }, {
            name: 'pNode 02',
            key: '0-1',
            children: [{
              name: 'leaf 0-1-0',
              key: '0-1-0'
            }, {
              name: 'leaf 0-1-1',
              key: '0-1-1'
            }]
          }, {
            name: 'pNode 03',
            key: '0-2',
            isLeaf: true
          }, ],
        });
      }, 100);
    }
    /**
     * 增加节点
     * @param string prKey    [父节点key]
     * @param object nodeItem [子节点信息]
     */
  addNode(prKey, nodeItem) {
    const data = this.state.treeData;
    data.forEach((item) => {
      if (prKey === item.key) {
        if (!item.children) {
          item.children = [];
        }
        // 如果key不存在就动态生成一个
        if (!nodeItem.key) {
          nodeItem.key = prKey + item.children.length + 1;
        }
        item.children.push(nodeItem);
      }
    });
    this.setState({
      data
    });
  }
  onSelect(info) {
      console.log('selected', info);
    }
    /**
     * 点击button事件
     */
  clickFun() {
    let prKey, nodeItem;
    prKey = '0-2';
    nodeItem = {
      name: 'leaf 0-2-0'
    }
    this.addNode(prKey, nodeItem);
  }

  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;
    });
    const treeNodes = loop(this.state.treeData);
    console.log('defaultKeys--' + this.state.defaultExpandedKeys);
    return (
      <div>
        <Tree onSelect={this.onSelect} defaultExpandedKeys={this.state.defaultExpandedKeys}>
          {treeNodes}
        </Tree>
        <Button colors="success" onClick={this.clickFun}>
        增加节点
        </Button>
      </div>
    );
  }
};

export default Demo7