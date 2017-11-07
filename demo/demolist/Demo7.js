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
import FormControl from 'bee-form-control';
import Icon from 'bee-icon';
const TreeNode = Tree.TreeNode;


class Demo7 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            defaultExpandedKeys: ['0-0', '0-1', '0-2'],
            parentNode: {},
            editValue: ''
        };
        this.parentNode = null
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
                },],
            });
        }, 100);
    }

    /**
     * 增加节点
     * @param prKey string    [父节点key]
     * @param nodeItem obiect [子节点信息]
     */
    addNode = (prKey, nodeItem) => {
        let { treeData } = this.state;
        let parNode;
        if (prKey) {
            // 如果prKey存在则搜索父节点进行添加
            parNode = this.getNodeByKey(treeData, prKey);
            //如果父节点存在的话，添加到父节点上
            if (parNode) {
                if (!parNode.children) {
                    parNode.children = [];
                }
                // 如果key不存在就动态生成一个
                if (!nodeItem.key) {
                    nodeItem.key = prKey + parNode.children.length + 1;
                }
                nodeItem.name = (
                    <div>
                        <FormControl
                            value={ this.state.editValue }
                            onChange={ this.handleValueChange }
                        />
                        <Icon
                            type="uf-correct"
                            onClick={ this.handleEnsure(nodeItem.key) }
                        />
                    </div>
                )
                parNode.children.push(nodeItem);
            }
        } else {
            // 没有穿prKey添加到根下成为一级节点
            if (!nodeItem.key) {
                nodeItem.key = "0-" + treeData.length + 1;
            }
            nodeItem.name = (
                <div>
                    <FormControl
                        value={ this.state.editValue }
                        onChange={ this.handleValueChange }
                    />
                    <Icon
                        type="uf-correct"
                        onClick={ this.handleEnsure(nodeItem.key) }
                    />
                </div>
            )
            treeData.push(nodeItem);
        }

        this.setState({
            treeData
        });
    }

    getNodeByKey = (data, key) => {
        if (!this.parentNode) {
            data.find(item => {
                if (item.key === key) {
                    console.log('item.name---' + item.name)
                    this.parentNode = item;
                    return (true);
                } else if (item.children) {
                    return this.getNodeByKey(item.children, key);

                }
            })
        }
        return this.parentNode;
    }


    onSelect = (info) => {
        console.log('selected', info);
    }
    /**
     * 点击button事件
     */
    clickFun = () => {
        let prKey, nodeItem;
        prKey = '0-1';
        nodeItem = {}
        this.addNode(prKey, nodeItem);
    }

    handleValueChange = (value) => {
        this.setState({
            editValue: value
        })
    }

    handleEnsure = (key) => () => {
        let { treeData, editValue } = this.state;

        const loop = data => data.forEach((item) => {
            if(item.children){
                loop(item.children)
            }
            if(item.key === key){
                return item.name = editValue;
            }
        });
        loop(treeData);


        this.setState({
            treeData,
            editValue: ''
        })
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'}/>;
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
}
;

export default Demo7