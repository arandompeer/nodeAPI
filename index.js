const express = require('express');
var mysql = require('mysql');
const knex = require('knex')

const db = knex({
    client: 'mysql',
    connection: {
      host : '',
      user : '',
      password : '',
      database : ''
    }
  });


const app = express();


//Top 3 per race

//Race1
app.get('/race1', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .select('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .where('race_id', 1).orderBy('race_time').limit(3).then(data => {
        res.send(data);
    }).catch(err =>{
        console.log(err)
    });
});

//Race2
app.get('/race2', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .select('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .where('race_id', 2).orderBy('race_time').limit(3).then(data => {
        res.send(data);
    }).catch(err =>{
        console.log(err)
    });
});

//Race3
app.get('/race3', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .select('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .where('race_id', 3).orderBy('race_time').limit(3).then(data => {
        res.send(data);
    }).catch(err =>{
        console.log(err)
    });
});


//Disqualified

//Disqualified race 1
app.get('/race1qualify', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .select('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .where('race_id', 1).andWhere('race_time', '>', '01:15:00').orderBy('race_time').then(data => {
        res.send(data);
    }).catch(err =>{
        console.log(err)
    });
});


//Disqualified race 2
app.get('/race2qualify', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .select('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .where('race_id', 2).andWhere('race_time', '>', '02:45:00').orderBy('race_time').then(data => {
        res.send(data);
    }).catch(err =>{
        console.log(err)
    });
});


//Disqualified race 3
app.get('/race3qualify', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .select('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .where('race_id', 3).andWhere('race_time', '>', '06:00:00').orderBy('race_time').then(data => {
        res.send(data);
    }).catch(err =>{
        console.log(err)
    });
});


//Didn't race

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}


//Didn't race in Picknpay

app.get('/didntrace1', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .distinct('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .whereNot('race_id', 1).then(data => {

    var arrayWithDuplicates = data;
    var uniqueArray = removeDuplicates(arrayWithDuplicates, "name");

       res.send(uniqueArray);
    }).catch(err =>{
        console.log(err)
    });
});

//Didn't race in Spar
app.get('/didntrace2', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .distinct('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .whereNot('race_id', 2).then(data => {

    var arrayWithDuplicates = data;
    var uniqueArray = removeDuplicates(arrayWithDuplicates, "name");

       res.send(uniqueArray);
    }).catch(err =>{
        console.log(err)
    });
});


//Didn't race in CT
app.get('/didntrace3', (req, res) => {
    db.join('mountain_bike.rider', 'rider_id', 'mountain_bike.rider.id')
    .distinct('name', 'surname','race_id', 'rider_id', 'race_time' )
    .from('mountain_bike.results')
    .whereNot('race_id', 3).then(data => {

    var arrayWithDuplicates = data;
    var uniqueArray = removeDuplicates(arrayWithDuplicates, "name");

       res.send(uniqueArray);
    }).catch(err =>{
        console.log(err)
    });
});



app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})
