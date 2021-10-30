'use strict';

const firebase = require('../db');
const Feed = require('../models/feed');
const firestore = firebase.firestore();

const addFeed = async(req, res, next) => {
    try{
        const data = req.body;
        await firestore.collection('feeds').doc().set(data);
        res.send(req.body);
       // res.send('Record saved successfully');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getAllFeeds = async (req, res) => {
    try{
        const feeds = await firestore.collection('feeds');
        
        const data = await feeds.get();
        const count = data.size;
        const feedsArray = [];
        if (data.empty){
            res.status(404).send('No feed record found');
        }
        else{
            console.log(count);
            data.forEach(element => {
                const feed = new Feed(
                    element.id,
                    element.data().title,
                    element.data().image_url,
                    element.data().content,
                );
                feedsArray.push(feed);
            });
            res.send(feedsArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getFeed = async(req, res, next) => {
    try{
        const id = req.params.id;
        const feed = await firestore.collection('feeds').doc(id);
        const data = await feed.get();
        if (!data.exists){
            res.status(404).send('Feed with the given ID not found');
        }else{
            res.send(data.data());
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const updateFeed = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const feed = await firestore.collection('feeds').doc(id);
        await feed.update(data);
        res.send('Feed record updated successfully');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteFeed = async(req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('feeds').doc(id).delete();
        res.send('Record deleted successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllFeeds,
    addFeed,
    getFeed,
    updateFeed,
    deleteFeed
}