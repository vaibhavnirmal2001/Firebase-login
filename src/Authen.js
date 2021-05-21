import React, { Component } from 'react';
import firebase from 'firebase';
require('firebase/auth');
// var firebase = require('firebase/auth');


<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>



var firebaseConfig = {
   apiKey: "API key Removed for security perpose",
   authDomain: " ",
   databaseURL: "https://fir-login-9f348-default-rtdb.firebaseio.com",
   projectId: "fir-login-9f348",
   storageBucket: "fir-login-9f348.appspot.com",
   messagingSenderId: "768241441226",
   appId: "1:768241441226:web:2bbc4347ab2a920306d733",
   measurementId: "G-SZFSVLTFTV"
 };

firebase.default.initializeApp(firebaseConfig);


class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email,password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email,password);

    promise.catch(e=> {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }
  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email,password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email,password);    
    
    promise
    .then(user => {
      var err ="Welcome "+ user.user.email;
      firebase.database().ref('users/'+ user.user.uid).set({
        email: user.user.email
      });
      console.log(user);
      this.setState({err: err});
    });


    promise.then(user =>{
      var lout = document.getElementById('logout');
      lout.classList.remove('hide');
    });



    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState(({err: err}));
    });
  }

  logout(){
    firebase.auth().signOut();
    var lout = document.getElementById('logout');

    lout.classList.add('hide');

  }
  google(){
    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then( result => {
      var user =result.user;
      console.log(user);
      firebase.database().ref('user'+user.uid).set({
        email: user.email,
        name: user.displayName
      });
    });
    promise.catch(e=>{
      var msg = e.message;
      console.log(msg);
    });
  }

  constructor(props){
    super(props);

    this.state = {};

    this.login=this.login.bind(this);
    this.signup=this.signup.bind(this);
    this.logout=this.logout.bind(this);
    this.google=this.google.bind(this);
  }
  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your E-mail"/> <br />
        <input id="password" ref="password" type="password" placeholder="Enter your password"/> <br /><br/>
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id ="logout" className="hide">Log Out</button> <br/>
        <button onClick={this.google} id ="google" className="google">Sign in with Google</button>
      

      </div>
    );
  }
}


export default Authen;
