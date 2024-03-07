import React from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Item = props => {

    const post = props.post;

    const navigation = useNavigation();

    const onPress = () => {
        console.log(post.name);
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
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