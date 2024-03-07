import React from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const List = props => {

    const post = props.post;

    // console.log(post);

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Existing List', {post: post});
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 3}}>
                <Text style={styles.name} numberOfLines={1}>{post.name}</Text>
                <Text style={styles.store} numberOfLines={1}>{post.store}</Text>
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.date}>{post.date}</Text>
            </View>
            <View style={{flex: 1, backgroundColor: post.color}}>
                <Text style={styles.priority}>{post.priority}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default List;