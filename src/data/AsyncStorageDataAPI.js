import { AsyncStorage } from 'react-native';

const ITEMS_KEY = '@shoppinglist.items';

class AsyncStorageDataAPI {
    async fetchItems() {
        const data = await AsyncStorage.getItem(ITEMS_KEY);
        console.log('data: ', data);
        debugger;
        return data ? JSON.parse(data) : [];
    }

    async addItem(item) {
        const data = await AsyncStorage.getItem(ITEMS_KEY);
        const items = data ? JSON.parse(data) : [];
        items.unshift(item);
        const setData = await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
        console.log('setData:', setData);
    }

    async removeItem(itemId) {
        const data = await AsyncStorage.getItem(ITEMS_KEY);
        if (!data) {
            return;
        }

        const items = JSON.parse(data).filter(item => item.id !== itemId);
        return AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    }
}

export default AsyncStorageDataAPI;