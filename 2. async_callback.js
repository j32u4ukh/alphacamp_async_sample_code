const { users, restaurants }  = require('./data')
const RestaurantModel = require('./restaurant')
const UserModel = require('./user')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/restaurant_list_async_callback")
const db = mongoose.connection

// 連接資料庫: db.once('open', callback)
// callback function是代替設定等待時間的function，server完成後會給予一個ack，告知client完成
db.once('open', () => {
    for (const [user_index, user] of users.entries()) {
        //創建使用者資料(user): model.create
        UserModel.create(user, (err, user)=>{
            //對每個user建立相對應餐廳資料
            RestaurantModel.create(restaurants, (err, user)=>{
                //等待所有使用者的餐廳資料創建完成
                console.log("所有使用者與餐廳資料創建完成")
            })
        })
    }
})