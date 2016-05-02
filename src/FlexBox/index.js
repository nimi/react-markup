import React, { PropTypes } from 'react';

function FlexBox({
	width, wrap, direction, align, justify, style = {},
	...props
}) {
	const flexBoxStyle = {
		display: 'flex',
		width: width || null,
		minHeight: 0,
		height: 'auto',
		alignItems: align || null,
		flexWrap: wrap ? 'wrap' : null,
		flexDirection: direction || null,
		justifyContent: justify || null
	};

	return (
		<div
			{ ...props }
			style={{ ...flexBoxStyle, ...style }}
		/>
	);
}

FlexBox.displayName = 'FlexBox';

FlexBox.propTypes = {
	align: PropTypes.oneOf([
		'stretch',
		'center',
		'baseline',
		'flex-start',
		'flex-end'
	]),
	direction: PropTypes.oneOf([
		'row',
		'row-reverse',
		'column',
		'column-reverse'
	]),
	gutter: PropTypes.oneOf([0, 1, 2, 3, 4]),
	justify: PropTypes.oneOf([
		'center',
		'space-around',
		'space-between',
		'flex-start',
		'flex-end'
	]),
	lg: PropTypes.bool,
	md: PropTypes.bool,
	sm: PropTypes.bool,
	wrap: PropTypes.bool
};

export default FlexBox;
