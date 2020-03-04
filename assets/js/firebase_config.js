// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyApGQg8k7YxaTAf9pPwGn3a6gadmi8X_YU",
authDomain: "malviz-android.firebaseapp.com",
databaseURL: "https://malviz-android.firebaseio.com",
projectId: "malviz-android",
storageBucket: "malviz-android.appspot.com",
messagingSenderId: "689358704248",
appId: "1:689358704248:web:37b8ee90d62fec932e278d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);