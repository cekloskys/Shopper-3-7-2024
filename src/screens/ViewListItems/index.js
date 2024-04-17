import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import Item from '../../components/Item';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// create constant object that refers to database
const shopperDB = openDatabase({name: 'Shopper.db'});

// create constant that contains the name of the items table
const itemsTableName = 'items';
const listItemsTableName = 'list_items';

const ViewListItemScreen = props => {

  const post = props.route.params.post;
    const navigation = useNavigation();

    const [items, setItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0.0);

    useEffect(() => {
        const listener = navigation.addListener('focus', () => {
          // declare empty array that will store results of SELECT
          let results = [];
          let total = 0.0;
          // declare transaction that will execute SELECT
          shopperDB.transaction(txn => {
            // execute SELECT
            txn.executeSql(
              `SELECT items.id, name, price, quantity FROM ${itemsTableName}, ${listItemsTableName} WHERE items.id = item_id AND list_id = ${post.id}`,
              [],
              // callback function to handle results from SELECT
              (_, res) => {
                // get the number of rows selected
                let len = res.rows.length;
                console.log('Number of rows: ' + len);
                // if more than one row of data was selected
                if(len > 0){
                  // loop through the rows of data
                  for (let i = 0; i < len; i++){
                    // push a row of data at a time onto results array
                    let item = res.rows.item(i);
                    results.push({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: item.quantity
                    });
                    total += item.price * item.quantity;
                  }
                  // assign results array to lists state variable
                  setItems(results);
                  setTotalPrice(total);
                } else {
                  // if no rows of data were selected
                  // assign empty array to lists state variable
                  setItems([]);
                  setTotalPrice(0.0);
                }
              },
              error => {
                console.log('Error getting items ' + error.message);
              },
            )
          });
        });
        return listener;
      });

  const ListHeader = () => {
    return (
      <View 
        accessible={true}
        accessibilityLabel={post.name}
        style={styles.header}>
        <Text style={styles.title}>{post.name}</Text>
      </View>
    );
  }
  const ListFooter = () => {
    return (
      <View 
        accessible={true}
        accessibilityLabel={'Total price' + totalPrice + 'dollars'}
        style={styles.footer}>
        <Text style={styles.totalPrice}>TOTAL PRICE: $ {totalPrice}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
          data={items}
          renderItem={({item}) => <Item post={item} />}
          ListFooterComponent={ListFooter}
          ListHeaderComponent={ListHeader}
        />
    </View>
  );
};

export default ViewListItemScreen;