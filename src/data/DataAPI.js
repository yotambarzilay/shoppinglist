import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCVXneB8vviHJ7iJ7jA9Fn-AVWWrg1jpa0",
    authDomain: "shoppinglist-9bb18.firebaseapp.com",
    databaseURL: "https://shoppinglist-9bb18.firebaseio.com",
    storageBucket: "shoppinglist-9bb18.appspot.com"
};

firebase.initializeApp(firebaseConfig);

class FirebaseDataAPI {
    async fetchItems() {
        return new Promise(res => {
            firebase.database().ref('items').on('value', (snapshot) => {
                const items = Object.values(snapshot.val() || {}).reverse();
                res(items);
            });
        });
    }

    addItem(label) {
        const newPostRef = firebase.database().ref('items').push();
        const id = newPostRef.key;

        newPostRef.set({label, id});

        return id;
    }

    async removeItem(itemId) {
        return firebase.database().ref(`items/${itemId}`).remove();
    }

    listenToItemAdded(onItemAdded) {
        firebase.database().ref('items').on('child_added', data => onItemAdded(data.val()));
    }

    listenToItemRemoved(onItemRemoved) {
        firebase.database().ref('items').on('child_removed', data => onItemRemoved(data.key));
    }
}

export default FirebaseDataAPI;