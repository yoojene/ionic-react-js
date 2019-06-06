import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonApp,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/react';

import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;




class App extends Component {
  constructor(props) {
    super(props);
     
    this.state = { lat: 0, long: 0 };

  }
  componentDidMount() {

    this.watchPosition();

    this.getCurrentPosition();
  
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);

    // This one working on Android 

    console.log('about to set state!')

       this.setState({
         lat: coordinates.coords.latitude,
         long: coordinates.coords.longitude,
       });

       console.log(this.state);
  }

  // watchPosition() {
  //   const wait = Geolocation.watchPosition({}, (position, err) => {
  //     console.log('Watched position is ');
  //     console.log(position);

  //     const lat = position.coords.latitude;
  //     const long = position.coords.longitude;
  //   });

  // }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      console.log('Watched position setting state ');

      // const lat = position.coords.latitude;
      // const long = position.coords.longitude;

      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });

      // console.log(lat);
      // console.log(long);
    });
  }
  render() {
    return (
      <IonApp>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Welcome to Ionic</IonCardSubtitle>
              <IonCardTitle>Running on React JS</IonCardTitle>
            </IonCardHeader>
          </IonCard>

          <IonCard>
            <IonCardHeader> Geo Location </IonCardHeader>
            <IonCardContent>
              <div>Latitude is {this.state.lat}</div>
              <div>Longitude is {this.state.long}</div>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonApp>
    );
  }
}

export default App;
