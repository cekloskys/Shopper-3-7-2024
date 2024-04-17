import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    height: 30,
    marginLeft: 18,
    marginTop: 10,
  },
  footer: {
    height: 60,
    marginRight: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  button: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
});

export default styles;