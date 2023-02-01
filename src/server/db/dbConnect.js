const mongoose = require ("mongoose")
const db = process.env.database

mongoose.connect(db).then(()=>{
    console.log(`connection successful`)
}).catch((err)=>{
    console.log(`connection unsuccessful`)
    console.log(err)
})
