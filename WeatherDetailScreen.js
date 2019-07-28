import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Constants ,LinearGradient} from 'expo';
import { AntDesign,MaterialCommunityIcons ,Feather, Entypo } from "@expo/vector-icons";

const WeatherGroup = {
    0: {
        icon: 'weather-sunny',
        colors:['#f5af19', '#f12711'],
      },
      2: {
        icon: 'weather-lightning',
        colors:['#00ECBC', '#007ADF'],
      },
      3: {
        icon: 'weather-rainy',
        colors:['#FFFFFF', '#6DD5FA', '#2980B9'],
      },
      5: {
        icon: 'weather-pouring',
        colors:['#00c6fb', '#005bea'],
      },
      6: {
        icon: 'weather-snowy',
        colors:['#7DE2FC', '#B9B6E5'],
      },
      7: {
        icon: 'weather-fog',
        colors:['#BDC3C7', '#2C3E50'],
      },
      8: {
        icon: 'weather-cloudy',
        colors:['#D7D2CC', '#304352'],
      }
  }

 
 
export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {    
    return {
      headerLeft: <AntDesign name='leftcircleo' size={ 20 }style={{ paddingLeft:30 }}/>,
      title: `${navigation.getParam('city', 'Unknown')}`,
      headerRight: <AntDesign name='sharealt'size={ 20 }style={{ paddingRight:30 }}/>    
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,     
    };
  }
  

  componentDidMount() {
    const { navigation } = this.props;
    const appid = "ca2a991ed7b21d6bce8ff331d2e6432b";   
    const city = navigation.getParam('city', null);    

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`)
    .then(response => response.json())
    .then(info => {         
      this.setState({            
        ...info,        
        isLoading: false,
      });
    });
 
  }

 

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.top}>
          <Feather size={110} name='loader' style={{ marginTop:270}} />          
        </View>
      )
    }
    

    let celsius = this.state.main.temp - 273.15;   
    const id =this.state.weather[0].id;
    const weather = id === 800 ? WeatherGroup[0] : WeatherGroup[parseInt(id / 100)];
    const mincel= this.state.main.temp_min - 273.15;
    const maxcel= this.state.main.temp_max - 273.15;
    
       
    return (        
        <LinearGradient colors={weather.colors} style={styles.top}>
            <Text style={styles.name}>{this.state.name}</Text>
            <MaterialCommunityIcons size={150} name={weather.icon} style={styles.icon} color ="white"/>
            <Text style={styles.main}>{this.state.weather[0].main}</Text>
            <Text style={styles.temp}>{celsius.toFixed(0)} ℃</Text>

            <View style={styles.bottom}>
              <View style={styles.sub}>                
                <Text style={{fontWeight:'bold'}}>Speed</Text>
                <Feather size={40} name='wind' style={{marginTop:14}}/>
                <Text style={styles.subtext}>{this.state.wind.speed.toFixed(2)}</Text>
              </View>
              <View style={styles.sub}>                
                <Text style={{fontWeight:'bold', fontSize: 13,}}>Humidity</Text>
                <Feather size={40} name='droplet'  style={{marginTop:13,marginLeft:5}}/>
                
                <Text style={styles.subtext}> {this.state.main.humidity} %</Text>
              </View>
              <View  style={styles.sub}>                
                <Text style={{fontWeight:'bold'}}>Cloud</Text>
                <Feather size={40} name='cloud'  style={{marginTop:13}}/>
                <Text style={styles.subtext}>{this.state.clouds.all} %</Text>
              </View>
              <View style={styles.sub}>                
                <Text style={{fontWeight:'bold'}}>Temp</Text>
                <Entypo size={35} name='thermometer' style={{marginTop:14}}/>
                <Text style={{ fontWeight:'bold', marginTop:20,alignItems:'center'}}>{mincel.toFixed(0)} / { maxcel.toFixed(0)}</Text>
              </View>
             </View>

        </LinearGradient>
      );
  }
}

const styles = StyleSheet.create({
    top: {
      flex: 1,
      alignItems: 'center'
    },
    name:{
      color:'white',
      fontSize: 40,
      marginTop:100,
      fontWeight: '600'
    },  
    icon:{
        marginTop:60
    },
    main: {
      color:'white',
      fontSize: 30,
      marginBottom:10,
      fontWeight: '600'
    },
    temp: {
       color:'white',
       fontSize: 30
    },
    bottom:{
      backgroundColor:'white',
      height: 150, 
      flexDirection: 'row', 
      borderWidth: 3,
      borderColor:'white',
      marginTop:80,
      borderRadius: 10,
      marginLeft:10,
      marginRight:10,   
    },
    sub:{
      flex: 1, flexDirection: 'row',width:30,marginLeft:25,
      marginTop:20 ,fontWeight: '600',
      color:'black',  flexDirection: 'column',  
    },
    subtext:{ 
      fontWeight:'bold',    
      marginTop:20,
      alignItems:'center',
      marginLeft:5
    }
  });

  