import React from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const database = require('../Handlers/database.js');

const Item = props => {

    const post = props.post;

    const navigation = useNavigation();

    const onPress = () => {
        if (post.list_id){
            try {
                database.addListItem(post.list_id, post.id);
            } catch (error) {
                console.log('Error adding list item ' + error.message);
            }
            alert('Item Added to List.');
        } else {
            navigation.navigate('Existing Item', {post: post});
        }
    }

  return (
    <View style={styles.container}>
	    <TouchableOpacity 
            accessible={true}
            accessibilityLabel={post.list_id ? 'Double tap to add' + post.name + 'to list' : 'Double tap to update or delete' + post.name}
            accessibilityHint={post.list_id ? 'Adds' + post.name + 'to list' : 'Goes to existing item screen'}
            style={styles.touchable} 
            onPress={onPress}>
            <View style={{flex: 2}}>
                <Text style={styles.name} numberOfLines={1}>{post.name}</Text>
                <Text style={styles.quantity}>Qty. {post.quantity}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.price} numberOfLines={1}>$ {post.price}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Item;