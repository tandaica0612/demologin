const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express')
const app = express()

app.get('/register', (request, response) => {
	var id = request.query.id;
	var usersRef = admin.firestore().collection('users').doc(id); 
	const getDoc = usersRef.get().then(doc => {
		if (!doc.exists) {
			console.log('No such document!');
			return response.send('Not Found')
		} 
		return response.send(doc.data());
	})
	.catch(err => {
		console.log('Error getting document', err);
	});
})

const api = functions.https.onRequest(app)

module.exports = {
  api,
}