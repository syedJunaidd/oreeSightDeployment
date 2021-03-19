// "use strict";;

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

  // MongoDB connection options
  mongo: {
    uri:
      process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
      "mongodb+srv://hemam:Constology2020@oreesight.esp61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      // "mongodb+srv://automation-app:Admin123@cluster0.ihz1b.mongodb.net/automation_app?retryWrites=true&w=majority",
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  }
};
