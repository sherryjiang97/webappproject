// this is the "firebase-service.js" file...

const firebase = require("firebase/app")
require("firebase/firestore")
require("dotenv").config() // use environment variables defined in the ".env" file

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}
console.log("FIREBASE CONFIG", firebaseConfig)

const app = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore(app)

async function fetchRatings(courseName) {
    console.log("FETCHING RATINGS...")

    // https://firebase.google.com/docs/firestore/query-data/get-data#node.js_1
    const coursesRef = db.collection('courses');
    const snapshot = await coursesRef.where('course_name', '==', courseName).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        throw "No reviews found for this course.";
    }  

    var reviews = []

    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        var review = doc.data()
        reviews["id"] = doc.id
        reviews.push(review)
    });
    return reviews
}

async function submitRatings(newRatings) {
    console.log("NEW RATING:", newRatings)

    // https://firebase.google.com/docs/firestore/manage-data/add-data
    if (newRatings.empty) {
        console.log('No ratings submitted.');
        return;
        }  
    var courseRef = await db.collection("courses").add(newRatings)

    console.log('Added document with ID: ', courseRef.id);

    return newRatings
}

module.exports = {firebaseConfig, app, db, fetchRatings, submitRatings}