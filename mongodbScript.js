show dbs
show collections

// user
use capstone
db.user.insert({email:'deng5945@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'deng594@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'deng59@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'deng5@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'deng@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'yali5945@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'yali594@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'yali59@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'yali5@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});
db.user.insert({email:'yali@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',status:0,role:0});

db.user.insert({email :"zhong@btd.com",username:"Nanshan",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"li@btd.com",username:"Lanjuan",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"liwenliang@btd.com",username:"Wenliang Li",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"carl@btd.com",username:"Carl",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"jiang@btd.com",username:"Jiang",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"charles@btd.com",username:"Charles",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"zhang@btd.com",username:"Xuejun",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"albert@btd.com",username:"Albert",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"wang@btd.com",username:"Qiming",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"abraham@btd.com",username:"Abraham",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"luan@btd.com",username:"yunping",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});
db.user.insert({email :"mitch@btd.com",username:"Mitch",password:"202cb962ac59075b964b07152d234b70",status:0,role:1});

db.user.insert({email:'admin@btd.com',username:'Admin',password:'202cb962ac59075b964b07152d234b70',status:0,role:2});

// customer
db.customer.insert({email:'deng5945@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-05-11'),gender:'male',desc:'very healthy'});
db.customer.insert({email:'deng594@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-05-12'),gender:'male',desc:'very healthy'});
db.customer.insert({email:'deng59@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-05-13'),gender:'male',desc:'very healthy'});
db.customer.insert({email:'deng5@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-05-14'),gender:'male',desc:'very healthy'});
db.customer.insert({email:'deng@uwlax.edu',username:'Jianmu',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-05-15'),gender:'male',desc:'very healthy'});
db.customer.insert({email:'yali5945@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-11-16'),gender:'female',desc:'very healthy'});
db.customer.insert({email:'yali594@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-11-17'),gender:'female',desc:'very healthy'});
db.customer.insert({email:'yali59@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-11-18'),gender:'female',desc:'very healthy'});
db.customer.insert({email:'yali5@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-11-19'),gender:'female',desc:'very healthy'});
db.customer.insert({email:'yali@uwlax.edu',username:'Yali',password:'202cb962ac59075b964b07152d234b70',birthday:ISODate('1995-11-20'),gender:'female',desc:'very healthy'});
// doctor
db.doctor.insert({email : "zhong@btd.com",username: "Nanshan",password: "202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 601",desc: "Excellent long-term diagnosis and treatment of common diseases of oral and maxillofacial infectious diseases, benign tumors, joint diseases and other common diseases, especially for the comprehensive treatment of oral head disease malignant tumors, congenital malformations and acquired defects Reconstruction and reconstruction create a precedent in China.",photo: "1.jpg",schedule : []});
db.doctor.insert({email :"li@btd.com",username:"Lanjuan",password:"202cb962ac59075b964b07152d234b70",gender: "female",addr: "Main Hall 602",desc:"Good at surgical treatment of oral and maxillofacial-head and neck tumors; minimally invasive surgical treatment of multiple maxillofacial fractures, salivary gland disease, maxillofacial nerve disease; radical resection and defect repair of benign and malignant tumors of the maxillofacial region, orthognathic surgery, implant surgery, etc.",photo: "2.jpg",schedule : []});
db.doctor.insert({email :"liwenliang@btd.com",username:"Wenliang Li",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 603",desc: "He is good at the diagnosis and treatment of dental pulp periodontal disease, the prevention and treatment of childhood dental disease, the repair of missing teeth, and the preservation of residual roots and crowns. Diagnosis and treatment of oral and mucosal diseases with integrated Chinese and Western medicine. He is engaged in oral clinical work and has rich clinical experience. He has published several oral clinical papers.",photo: "3.jpg",schedule : []});
db.doctor.insert({email :"carl@btd.com",username:"Carl",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 604",desc:"Good at oral implant denture restoration, aesthetic restoration, various kinds of difficult and complex denture restoration treatment. In particular, he has unique insights on complex cases such as precision attachments, occlusal reconstruction, and golden porcelain crown bridges.",photo: "4.jpg",schedule : [] });
db.doctor.insert({email :"jiang@btd.com",username:"Jiang",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 605",desc:"Engaged in the clinical, teaching, and scientific research of traditional Chinese medicine, traditional Chinese and western medicine combined with cardiovascular disease and diabetes for more than 40 years. He has unique clinical experience in the treatment of coronary heart disease, diabetes and heart failure, and is particularly good at the combination of traditional Chinese and western medicine for coronary heart disease with diabetes.",photo: "5.jpg",schedule : [] });
db.doctor.insert({email :"charles@btd.com",username:"Charles",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 606",desc:"He has been engaged in clinical work of diabetes and cardiovascular traditional Chinese medicine in Beijing Traditional Chinese Medicine Hospital for a long time. Mainly engaged in diabetes and its various chronic complications, including diabetic heart disease, diabetic peripheral neuropathy, diabetic nephropathy.",photo: "6.jpg",schedule : [] });
db.doctor.insert({email :"zhang@btd.com",username:"Xuejun",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 607",desc:"He has participated in a number of traditional Chinese medicine clinical research work on cardiovascular and diabetes. Good at diabetes and its complications, thyroid disease, hypertension, arrhythmia, osteoporosis.",photo: "7.jpg",schedule : [] });
db.doctor.insert({email :"albert@btd.com",username:"Albert",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 608",desc:"At present, he is mainly engaged in the comprehensive treatment of oral and maxillofacial tumors, oral and maxillofacial surgical deformity correction, and orthognathic work. He has extensive experience in the diagnosis and treatment of common, frequently-occurring and intractable diseases of oral, maxillofacial, and neck.",photo: "8.jpg",schedule : [] });
db.doctor.insert({email :"wang@btd.com",username:"Qiming",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 609",desc:"Engaged in the clinical medical work of traditional Chinese medicine, accumulated a wealth of clinical experience in long-term clinical practice, can skillfully use traditional Chinese medicine theory combined with modern medical knowledge to diagnose and treat diseases, and has his own unique views on many difficult and complicated diseases. Good at diagnosis and treatment of diabetes and kidney disease.",photo: "9.jpg",schedule : [] });
db.doctor.insert({email :"abraham@btd.com",username:"Abraham",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 610",desc:"Good at comprehensive treatment of oral and maxillofacial tumors; functional repair of severe tissue defects after large tumor resection; diagnosis and treatment of severe and complex maxillofacial trauma; implant surgical repair of various types of dental dentition loss.",photo: "10.jpg",schedule : [] });
db.doctor.insert({email :"luan@btd.com",username:"Yunping",password:"202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 611",desc:"Engaged in endocrine clinical work for a long time, good at diabetes and its complications, thyroid disease, hypertension, hyperlipidemia, hyperuricemia, osteoporosis and other endocrine diseases combined treatment of traditional Chinese and western medicine.",photo: "11.jpg",schedule : [] });
db.doctor.insert({email : "mitch@btd.com",username: "Mitch",password: "202cb962ac59075b964b07152d234b70",gender: "male",addr: "Main Hall 612",desc: "Good at oral head and neck tumors, oral and maxillofacial trauma, oral and maxillofacial defect repair and reconstruction, and cleft lip and palate surgery.",photo: "12.jpg",schedule : []});


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







