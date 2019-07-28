import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { AntDesign } from "@expo/vector-icons";

export default class CityList extends React.Component {

  static navigationOptions ={    
    headerLeft: <AntDesign name='exclamationcircleo' size={ 20 }style={{ paddingLeft:30 }}/>,
    title:'Weather App',
    headerRight: <AntDesign name='setting'size={ 20 }style={{ paddingRight:30 }}/>
  };  
  
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      weather :null
    };
  }

  componentDidMount() {
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        this.setState({
          cities
        });
      });
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }
  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Text style={styles.text}>{city}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                data={this.state.cities}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },

  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    margin:10,
    borderWidth: 3,
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});

