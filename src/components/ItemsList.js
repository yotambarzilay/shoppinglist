import React from 'react';
import { ScrollView } from 'react-native'
import Item from './Item';

const style = {
	flex: 1
};

class ItemsList extends React.Component {
	state = {scrollEnabled: true}

	setScrollEnabled = scrollEnabled => {
		if (this._listView && this._listView.setNativeProps) {
			this._listView.setNativeProps({scrollEnabled});
		} else if (this._listView && this._listView.getScrollResponder) {
			const scrollResponder = this._listView.getScrollResponder();
			scrollResponder.setNativeProps && scrollResponder.setNativeProps({scrollEnabled});
		}

		this.setState({scrollEnabled})
	}

	render() {
		const {itemIds} = this.props;
		const {scrollEnabled} = this.state;
		return (
			<ScrollView style={style}
						scrollEnabled={scrollEnabled}
						keyboardShouldPersistTaps="always"
					>
				{itemIds.map(id => (
					<Item 	key={id}
							id={id}
							setScrollEnabled={this.setScrollEnabled}
						/>
				))}
			</ScrollView>
		);
	}
}

import {connect} from 'react-redux';

const mapStateToProps = ({items}) => ({
	itemIds: items.map(({id}) => id)
});

export default connect(mapStateToProps, {})(ItemsList);