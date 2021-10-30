'use strict';

const firebase = require('../db');
const Orchid = require('../models/orchid');
const firestore = firebase.firestore();

//nay la ham them du lieu ne
const addOrchid = async(req, res, next) => {
    try{
        //nhap form ben giao dien gan' vao data
        const data = req.body;
        //kết nối firestore gọi hàm set() để add
        await firestore.collection('orchids').doc().set(data);
        res.send(req.body);
       // res.send('Record saved successfully');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

//lấy data 
const getAllOrchids = async (req, res) => {
    try{
        //kết nối firebase
        const orchids = await firestore.collection('orchids'); 
        //gán dữ liệu lấy về được vô data
        const data = await orchids.get();
        //đếm số mẫu tin
        const count = data.size;
        const orchidsArray = [];
        if (data.empty){
            res.status(404).send('No orchid record found');
        }
        else{
            //nếu lấy thành công thì vòng lặp
            console.log(count);
            data.forEach(element => {
                //console.log(element)
                //Model nhận dữ liệu json, mỗi lần lặp tạo 1 instance mới
                const orchid = new Orchid(
                    element.id,
                    element.data().category,
                    element.data().description,
                    element.data().humidity,
                    element.data().intermediate,
                    element.data().location,                   
                    element.data().name,
                    element.data().url_m,
                    element.data().science_name,                   
                    element.data().warm,
                    element.data().note
                );
                //đẩy vào mảng để lưu trữ
                orchidsArray.push(orchid);
            });
            res.send(orchidsArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}
const getOrchid = async(req, res, next) => {
    try{
        const id = req.params.id;
        const orchid = await firestore.collection('orchids').doc(id);
        const data = await orchid.get();
        if (!data.exists){
            res.status(404).send('Orchid with the given ID not found');
        }else{
            res.send(data.data());
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const updateOrchid = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const account = await firestore.collection('orchids').doc(id);
        await account.update(data);
        res.send('Orchid record updated successfully');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteOrchid = async(req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('orchids').doc(id).delete();
        res.send('Record deleted successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getOrchid = async(req, res, next) => {
    try{
        const uid = req.params.uid;
        const orchid = await firestore.collection('orchids').doc(uid);
        const data = await orchid.get();
        if (!data.exists){
            res.status(404).send('Orchid with the given ID not found');
        }else{
            res.send(data.data());
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

//export để client gọi về.
module.exports = {
    addOrchid,
    //ví dụ: localhost:1234/api/getAllOrchids
    getAllOrchids,
    deleteOrchid,
    updateOrchid,
    getOrchid
}