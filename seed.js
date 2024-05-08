// seed.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const mongoose = require("mongoose"),
    Subscriber = require("./models/Subscriber")


// 데이터베이스 연결 설정
mongoose.connect(
    "mongodb+srv://wjdgks815:kAaHXK4G52DSfDIn@ut-node.psdbufj.mongodb.net/?retryWrites=true&w=majority&appName=UT-Node/ut-node"
);
mongoose.connection;

// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "spider",
    email: "aaff@sds",
    newsletter: "false",
  },
  {
    name: "spddider",
    email: "aaffddd@sds",
    newsletter: "false",
  },
  {
    name: "Thor",
    email: "fff@fdf",
    newsletter: "true",
  },
  {
    name: "Ironman",
    email: "f@fds",
    newsletter: "false",
  },
  {
    name: "hulk",
    email: "w@fdsf",
    newsletter: "true",
  },
  
  
];

// 기존 데이터 제거
Subscriber
    .deleteMany({})
    .exec()
    .then(result => {
        console.log(`Deleted ${result.deletedCount} records.`);
    })
    .catch(error => {
        console.log(`Error: ${error.messaage}`);
    });
    

var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s => {
    commands.push(
        Subscriber.create({
            name: s.name,
            email: s.email,
            newsletter: s.newsletter
        })
        .then(s => {
            console.log(`Created: ${s.name}`);
        })
        
    );
})

// 프라미스 생성 후 로깅 작업
Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r, null, 2));
        mongoose.connection.close();
    })
    .catch(e => {
        console.log(e);
    });

