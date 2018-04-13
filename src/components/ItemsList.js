import React from 'react';
import { ScrollView, View } from 'react-native'
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
		const {items, removeItem} = this.props;
		const {scrollEnabled} = this.state;
		return (
			<ScrollView style={style} 
						scrollEnabled={scrollEnabled} 
						ref={listView => this._listView = listView} 
					>
				{items.map(item => (
					<Item 	key={item.id}
							item={item} 
							removeItem={removeItem} 
							setScrollEnabled={this.setScrollEnabled} 
						/>
				))}
			</ScrollView>
		);
	}
}
    
export default ItemsList;