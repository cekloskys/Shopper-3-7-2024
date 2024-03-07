import React, { useState } from 'react';
import styles from './styles';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// create constant object that refers to database
const shopperDB = openDatabase({name: 'Shopper.db'});

// create constant that contains the name of the lists table
const listsTableName = 'lists';

const ExistingListScreen = props => {

    const post = props.route.params.post;

    const dateElements = post.date.split("/");
    
    const [name, setName] = useState(post.name);
    const [store, setStore] = useState(post.store);
    const [date, setDate] = useState(new Date(dateElements[2], dateElements[0] - 1, dateElements[1]));
    const [priority, setPriority] = useState(post.priority);

    const priorityValues = ['HIGH', 'LOW'];

    const [datePicker, setDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(post.date);

    function showDatePicker() {
        setDatePicker(true);
    };

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        setSelectedDate(value.toLocaleDateString());
    };

    const onListUpdate = () => {
        if (!name){
            alert('Please enter a shopping list name.');
            return;
        }
        if (!store){
            alert('Please enter a shopping list store.');
            return;
        }
        if (!priority){
            alert('Please select a shopping list priority.');
            return;
        }
        if (!date){
            alert('Please select a shopping list date.');
            return;
        }
        console.log(date);
        shopperDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${listsTableName} 
                SET name = "${name}", 
                store = "${store}", 
                date = "${date.toLocaleDateString()}", 
                priority = "${priority}" 
                WHERE id = '${post.id}'`,
                [],
                () => {
                    console.log(`${name} updated successfully`);
                },
                error => {
                    console.log('Error on updating list ' + error.message);
                }
            );
        });

        alert(name + ' updated!');
    }

    const onListDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this list?',
            // buttons
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        shopperDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${listsTableName} WHERE id = ${post.id}`,
                                [],
                                () => {
                                    console.log(`${name} deleted successfully.`);
                                },
                                error => {
                                    console.log('Error on deleting list ' + error.message);
                                }
                            );
                        });
                        alert('List Deleted!');
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    }

    const onAddItem = () => {
        
    }

    const onViewItems = () => {
        
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
                value={store}
                onChangeText={value => setStore(value)}
                style={styles.store}
                placeholder={'Enter Store'}
                placeholderTextColor={'grey'}
            />
            <SelectDropdown
                data={priorityValues}
                defaultValue={priority}
                defaultButtonText={'Select Priority'}
                onSelect={(selectedItem, index) => {
                    setPriority(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
            />
            {datePicker && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
                    minimumDate={new Date(Date.now())}
                />
            )}
            {!datePicker && (
                <View>
                    <Pressable onPress={showDatePicker} style={styles.dateButton}>
                        <Text style={styles.dateButtonText}>Select A Date</Text>
                    </Pressable>
                </View>
            )}
            <TextInput 
                style={styles.date}
                placeholder={"Selected Date"}
                value={selectedDate}
                editable={false}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.updateButton} onPress={onListUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={onListDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={onAddItem}>
                <Text style={styles.buttonText}>Add Item</Text>
            </Pressable>
            <Pressable style={styles.viewButton} onPress={onViewItems}>
                <Text style={styles.buttonText}>View Items</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default ExistingListScreen;