import React from 'react';
import Component from 'Component';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Component onShow={() => console.log('show')}>
					<button
						prop1='test'
						prop2={3}
						prop3={false}
						prop4={{}}
						prop5={[1, 2, 3]}
						prop6={function() {}}
					>
						Demo
					</button>
				</Component>
			</div>
		);
	}
}
