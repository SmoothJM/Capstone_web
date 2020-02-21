show dbs
show collections

// user
db.user.updateMany({password:'123'},{$set:{password:'202cb962ac59075b964b07152d234b70'}})
db.user.insert({email:'jim@btd.com',username:'Jim',password:'123',status:0,role:0});
db.user.insert({email:'jianmu@btd.com',username:'Jianmu',password:'123',status:0,role:1});
db.user.insert({email:'boss@abtd.com',username:'Boss',password:'123',status:0,role:2});
db.user.remove({role:0});
db.user.update({role:2},{$set:{username:'Admin',email:'admin@btd.com'}});
// customer
db.customer.insert({email:'jim@btd.com',username:'Jim',password:'123',birthday:ISODate('1995-05-18'),gender:'male',desc:'very healthy'});
db.customer.update({password:'123'},{$set:{password:'202cb962ac59075b964b07152d234b70'}});
db.customer.update({email:'jim@btd.com'},{$set:{gender:'female'}});
db.customer.remove({gender:'male'});
db.customer.update({email:'jim@btd.com'},{$set:{docEmail:'zhong@btd.com'}});
// doctor
db.doctor.update({email:'chan@btd.com'},{$set:{email:'zhong@btd.com',username:'Nanshan'}});
db.doctor.update({email:'li@btd.com'},{$set:{gender:'female'}});
db.doctor.updateMany({photo:'src/assets/doctors/8.jpg'},{$set:{photo:'../assets/doctors/8.jpg'}});
db.doctor.remove({username:'Jianmu'});
db.doctor.aggregate([
{$project:{
    _id:1,
    email:1,
    username:1,
    password:1
   }
},
{$addFields:{status:0,role:1}},
{$out:"user"}
]);
// diagnose
db.diagnose.insert({email:'deng5945@uwlax.edu',username:'Jianmu',result:'Healthy',img:'tongueImg-1581366195044.jpg',time:ISODate('2020-02-12')});
db.diagnose.insert({email:'deng5945@uwlax.edu',username:'Jianmu',result:'Serve',img:'tongueImg-1581476880198.jpg',time:ISODate('2020-02-14')});
db.diagnose.remove({"username" : "Jianmu"});
db.diagnose.update({"img" : "tongueImg-1581661168740.jpg"}, {$set:{"result":"Healthy"}});
db.diagnose.update({"img" : "tongueImg-1581655956630.jpg"}, {$set:{"result":"Healthy"}});
db.diagnose.update({"img" : "tongueImg-1581655926546.jpg"}, {$set:{"result":"Healthy"}});
db.diagnose.update({"img" : "tongueImg-1581655897171.jpg"}, {$set:{"result":"Healthy"}});
// research

// appionment

// show documents
db.diagnose.find().pretty();
db.diagnose.find().count();
db.user.find({role:0}).sort({time:-1}).pretty()
db.user.find().count();
db.customer.find({"email" : "111@aaa.com"}).pretty();
db.customer.find().pretty();
db.customer.find().count();
db.doctor.find().pretty();
db.doctor.find().count();
db.doctor.aggregate(
   [
     {
       $project:
         {
           year: { $year: "$schedule[0]" },
           month: { $month: "$schedule" },
           day: { $dayOfMonth: "$schedule" },
           hour: { $hour: "$schedule" },
           minutes: { $minute: "$schedule" },
           seconds: { $second: "$schedule" },
           milliseconds: { $millisecond: "$schedule" },
           dayOfYear: { $dayOfYear: "$schedule" },
           dayOfWeek: { $dayOfWeek: "$schedule" }
         }
     }
]);







