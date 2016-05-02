/* @flow */
import React, { Component, PropTypes } from 'react';

import Box from './Box';
import FlexBox from './FlexBox';
import jsxStringify from './utils/jsxToString';
import Highlight from 'react-highlight';

export default class Markup extends Component {

	static displayName = 'Markup'

	static propTypes = {
		className: PropTypes.string,
		defaultExpanded: PropTypes.bool.isRequired,
		expandable: PropTypes.bool,
		expanded: PropTypes.bool,
		heading: PropTypes.string,
		onCollapse: PropTypes.func,
		onShow: PropTypes.func
	}

	static defaultProps = {
		defaultExpanded: false,
		expandable: true
	}

	constructor(props) {
		super(props);

		this.state = { expanded: false };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { expandable } = this.props;
		const expanded = !this.state.expanded;

		if (expandable) {
			this.handleExpand(expanded);
			this.setState({ expanded });
		}
	}

	handleExpand(expanded) {
		const { onShow, onCollapse } = this.props;
		if (expanded) {
			return Boolean(onShow) && onShow();
		} else {
			return Boolean(onCollapse) && onCollapse();
		}
	}

	renderCode(component) {
		const code = component.length
			? component.map(jsxStringify).join('\n') : jsxStringify(component);

		return <Highlight className='jsx'>{ code }</Highlight>;
	}

	renderCodeBlock(component) {
		const containerStyle = {
			backgroundColor: 'rgb(255, 255, 255)',
			border: 'solid 2px rgb(234, 234, 234)'
		};

		const codeStyle = {
			display: this.state.expanded ? 'block' : 'none'
		};

		return (
			<Box style={containerStyle}>
				<Box style={codeStyle}>
					{this.renderCode(component)}
				</Box>
				<FlexBox justify='space-around' wrap>
					<Box>{component}</Box>
				</FlexBox>
			</Box>
		);
	}

	renderButton() {
		const { expandable } = this.props;

		const button = expandable
			? (
				<Box style={{ textAlign: 'right' }}>
					<button
						bt='link'
						color='black'
						onClick={this.handleClick}
						fill>
						{'< / >'}
					</button>
				</Box>
			) : null;

		return button;
	}

	renderHeading() {
		const { heading } = this.props;
		const head = heading
			? (
				<Box>
					<h3 style={{ margin: '0.4em 0' }}>
						{this.props.heading}
					</h3>
				</Box>
			) : null;

		return head;
	}

	renderComponentWithCode(component) {

		return (
			<FlexBox direction='column'>
				<Box>
					<FlexBox style={{ backgroundColor: 'rgb(234, 234, 234)' }}>
						{this.renderHeading()}
						{this.renderButton()}
					</FlexBox>
				</Box>
				{this.renderCodeBlock(component)}
			</FlexBox>
		);
	}

	render() {
		return (
			<Box className={this.props.className}>
				{ this.renderComponentWithCode(this.props.children) }
			</Box>
		);
	}
}
