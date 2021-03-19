// "use strict";;

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri:
    "mongodb+srv://hemam:Constology2020@oreesight.esp61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      // "mongodb://mongodb:27017/mydb",
      // "mongodb+srv://automation-app:Admin123@cluster0.ihz1b.mongodb.net/automation_app?retryWrites=true&w=majority",
    options: { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true , useFindAndModify:false}
  },

  seedDB: true
};
