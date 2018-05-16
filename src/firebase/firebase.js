import * as firebase from 'firebase';

const prodConfig = {
	apiKey: "AIzaSyDGpz1PDPCIa145hLj6m2tF5YHEtJBimt8",
	authDomain: "my-app-be04c.firebaseapp.com",
	databaseURL: "https://my-app-be04c.firebaseio.com",
	projectId: "my-app-be04c",
	storageBucket: "my-app-be04c.appspot.com",
	messagingSenderId: "883489246906"
};

const devConfig = {
	apiKey: "AIzaSyDGpz1PDPCIa145hLj6m2tF5YHEtJBimt8",
	authDomain: "my-app-be04c.firebaseapp.com",
	databaseURL: "https://my-app-be04c.firebaseio.com",
	projectId: "my-app-be04c",
	storageBucket: "my-app-be04c.appspot.com",
	messagingSenderId: "883489246906"
};

const config = process.env.NODE_ENV === 'production'
	? prodConfig
	: devConfig;

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.database();

export {
	auth,
	db,
}