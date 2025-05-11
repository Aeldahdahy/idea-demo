const mongoose = require('mongoose');
     const Chat = require('./modules/chat'); // Adjust path if needed
     const Staff = require('./modules/staff'); // Adjust path if needed

     async function migrateChatSenderNames() {
       try {
         // Use the same db_URL as in index.js
         const db_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}${process.env.DB_OPTIONS}`;
         await mongoose.connect(db_URL, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
         });
         console.log('Connected to MongoDB');

         const chats = await Chat.find({ senderName: { $exists: false } });
         console.log(`Found ${chats.length} chats without senderName`);

         for (const chat of chats) {
           const senderUser = await Staff.findById(chat.sender).select('fullName');
           if (senderUser) {
             chat.senderName = senderUser.fullName;
             await chat.save();
             console.log(`Updated chat ${chat._id} with senderName: ${senderUser.fullName}`);
           } else {
             console.log(`No Staff user found for sender ${chat.sender} in chat ${chat._id}`);
           }
         }

         console.log('Migration complete');
       } catch (error) {
         console.error('Migration error:', error);
       } finally {
         await mongoose.disconnect();
         console.log('Disconnected from MongoDB');
       }
     }

     migrateChatSenderNames();