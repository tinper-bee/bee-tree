/**
 *
 * @title Tree基本使用事例
 * @description 事例涵盖 checkbox如何选择，disable状态和部分选择状态。
 *
 */


import React, {
	Component
} from 'react';
import Tree from '../../src';

const TreeNode = Tree.TreeNode;

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
		let checkedKeys = {
			checked:this.state.defaultCheckedKeys
		}
		return (
			<Tree className="myCls" showLine checkable
	        defaultExpandedKeys={this.state.defaultExpandedKeys}
					defaultSelectedKeys={this.state.defaultSelectedKeys}
					// defaultCheckedKeys = {this.state.defaultCheckedKeys}
					// checkedKeys={checkedKeys}
					checkStrictly
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

Demo1.defaultProps = defaultProps;


export default Demo1;