import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, Alert } from 'react-native';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// create constant object that refers to database
const shopperDB = openDatabase({name: 'Shopper.db'});

// create constant that contains the name of the items and list_items table
const itemsTableName = 'items';
const listItemsTableName = 'list_items';

const ExistingItemScreen = props => {

    const post = props.route.params.post;

    const [name, setName] = useState(post.name);
    const [price, setPrice] = useState(post.price.toString());
    const [quantity, setQuantity] = useState(post.quantity.toString());

    const onItemUpdate = () => {
        if (!name){
            alert('Please enter an item name.');
            return;
        }
        if (!price){
            alert('Please enter an item price.');
            return;
        }
        if (!quantity){
            alert('Please enter an item quantity.');
            return;
        }
       
        shopperDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${itemsTableName} 
                SET name = "${name}", 
                price = ${parseFloat(price)}, 
                quantity = ${parseInt(quantity)}
                WHERE id = '${post.id}'`,
                [],
                () => {
                    console.log(`${name} updated successfully`);
                },
                error => {
                    console.log('Error on updating item ' + error.message);
                }
            );
        });

        alert(name + ' updated!');
    }

    const onItemDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this item?',
            // buttons
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        shopperDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${itemsTableName} WHERE id = ${post.id}`,
                                [],
                                () => {
                                    console.log(`${name} deleted successfully.`);
                                },
                                error => {
                                    console.log('Error on deleting item ' + error.message);
                                }
                            );
                        });
                        shopperDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${listItemsTableName} WHERE item_id = ${post.id}`,
                                [],
                                () => {
                                    console.log(`${name} deleted successfully.`);
                                },
                                error => {
                                    console.log('Error on deleting item ' + error.message);
                                }
                            );
                        });
                        alert('Item Deleted!');
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={name}
                onChangeText={value => setName(value)}
                style={styles.name}
                placeholder={'Enter Name'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={price}
                onChangeText={value => setPrice(value)}
                style={styles.price}
                placeholder={'Enter Price'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={quantity}
                onChangeText={value => setQuantity(value)}
                style={styles.quantity}
                placeholder={'Enter Quantity'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Double tap to update item'
                style={styles.updateButton} 
                onPress={onItemUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable 
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Double tap to delete item'
                style={styles.deleteButton} 
                onPress={onItemDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default ExistingItemScreen;