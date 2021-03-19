
const Subscriber = require("../subscriber/subscriber.model");
const SentEmail = require('../sentEmails/sentEmails.controller');
const crypto = require('crypto');
const Template = require('./emailTemplate.model');
const { validationError, handleError, handle404 } = require('../../../components/errors');


var fs = require('fs');

const getFilePaths = (files, paths) => {
  files.forEach(({ destination, filename }) => {
    // let dest = destination.substring(1);
    // let filePath = destination + '/' + filename;
    let dest = destination.split('/');
    let filePath = `./${dest[2]}/${dest[3]}/${filename}` ;
    

    console.log(filePath);
    paths.push(filePath);
  });
  return paths;
}

const deleteImagesFunc=(filePathName)=>{
  let getfiledir=filePathName.split('.');
  let filePath=`./server${getfiledir[1]}.${getfiledir[2]}`;
  console.log("filPath",filePath);
    fs.access(filePath, fs.F_OK, (err) => {
      if (err) {
        console.error(err)
        return
      }
      else {
        fs.unlinkSync(filePath);
      }
      //file exists
    });
  }

exports.create = (request, response) => {
  const newTemplate = request.body;
  let UserId = request.user._id;
  newTemplate.userId = UserId;
  if (request.files) {
    newTemplate.images = []
    newTemplate.images = getFilePaths(request.files, newTemplate.images);
  }
  Template.create(newTemplate, (error, data) => {
    if (error) return validationError(response, error);
    return response.status(201).json(data);
  });
}


exports.listTemplates = (request, response) => {
  let type = request.params.type;
  let UserId = request.user._id;
  Template.find({ type: type, userId: UserId,isDeleted:false }, (error, data) => {
    if (error) {
      return handleError(response, error);
    }
    return response.status(200).json(data);
  });
}


exports.byId = (request, response) => {
  const Id = request.params.id;
  Template.findOne({ _id: Id }, (error, data) => {
    if (error || !data._id) {
      return handle404(response, error);
    }
    return response.status(200).json(data);
  });
}

exports.remove = (request, response) => {
  
  const Id = request.params.id;
  
  Template.findOne({
    _id: request.params.id
}).then((item) => {
  console.log(item);
  item.isDeleted=true;
  item.save(err => {
  if (err) console.log("Error", err);
  const back = {
        status: 200,
        message: 'Deleted Successfully'
      }
      return response.status(200).json(back);
});
});
  
  // Template.findOneAndRemove({ _id: Id }, (error, data) => {
  //   if (error || !data) {
  //     return handle404(response, error)
  //   }
  //   const back = {
  //     status: 200,
  //     message: 'Deleted Successfully'
  //   }
  //   return response.status(200).json(back);
  // });
}

exports.updateTemplate = (request, response) => {
  const templateInfo = request.body;
  var imagesPath = [];
  //blogObj = request.body;
  if (request.files) {
    //Get Images List
    var images = templateInfo.images ? templateInfo.images.split(',') : [];
    //Get Delete Images List
    var deleteImages = templateInfo.deleteImages ? templateInfo.deleteImages.split(',') : [];
    //Get Path of Existing Images/files
    images.forEach(image => {
      imagesPath.push(image);
    });
    //Delete Images/files from directory
    deleteImages.forEach(image => {
      deleteImagesFunc(image);
    });
    //Get Images Path of newlly inserted Iamges
    templateInfo.images = getFilePaths(request.files, imagesPath);
  }
  else {
    console.log("Delete Images", templateInfo.deleteImages)
    if (templateInfo.deleteImages) {
      templateInfo.deleteImages.forEach(image => {
        deleteImagesFunc(image);
      });
    }
  }

  Template.findOneAndUpdate({ _id: templateInfo.id }, templateInfo, (error, data) => {
    if (error || !data) {
      return handle404(response, error)
    }
    const back = {
      status: 200,
      message: 'Updated Successfully'
    }
    return response.status(200).json(back);
  });
}

exports.sendNewsletter = (request, response) => {
  const Id = request.params.Id;
  console.log(Id);
  Template.findOne({
    _id: Id,
    IsSent: false
  }).then((newsLetter) => {
    if (newsLetter != null) {
      let html = newsLetter.html;
      let css = newsLetter.css;

      Subscriber.find({ 'prefrences.newletter': true }, (error, list) => {
        var emails = list.map(Obj => {
          var emailsList = [Obj.email];
          const token = crypto.randomBytes(20).toString('hex');
          console.log(emailsList);
          let Content = `<!doctype html><html><head>
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <style>${css}</style>
      </head><body>${html}<div>You are subscribed to email updates from Zo Organized.To stop receiving these emails, you may
      <a target="_blank" href="https://zoorganized.azurewebsites.net/unsubscribe/${token}\n\n"> unsubscribe now.</a></div></body></html>`;
          SentEmail.sendEmail(emailsList, Content, 'HTML', 'News Letter', token);
        });

      });
      newsLetter.IsSent = true;
      newsLetter.save(err => {
        if (err) console.log("Error", err);
      });
    }
    const back = {
      status: 200,
      message: 'email sent Successfully'
    }
    return response.status(200).json(back);
  });
}
