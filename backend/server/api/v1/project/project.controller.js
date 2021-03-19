// "use strict";;
const Project = require("./project.model");
var iso8601 = require("iso8601-duration");
const _ = require("lodash");
const mongoose = require("mongoose");
// import exec process
const {PythonShell} = require('python-shell'); 

var fs = require("fs"),
  xml2js = require("xml2js");
var path = require("path");

exports.createProject = async (req, res) => {
  try {
    let { body: payload, file } = req;
    const userId = req.user._id;
    var parser = new xml2js.Parser();
    console.log('Type', file.mimetype);
    if(file.mimetype == "application/octet-stream" || file.mimetype =="application/vnd.ms-project"){
      let resultedFileName = 'file-' + Date.now();
      let options = {
        mode: 'text', 
        pythonOptions: ['-u'], // get print results in real-time
        pythonPath: '/backend/venv/bin/python',
        scriptPath: path.resolve(__dirname, '../../../scripts' ), //If you are having python_test.py script in same folder, then it's optional. 
        args: ['-i', path.resolve(__dirname, '../../../static/files/' + file.filename), '-o', path.resolve(__dirname, '../../../static/files/' + resultedFileName)] //An argument which can be accessed in the script using sys.argv[1] 
      };
      PythonShell.run('conveter.py', options, async function (err, result){
        if (err) throw err;

        let data = await fs.readFileSync(
          path.resolve(__dirname, "../../../static/files/" + resultedFileName)
        );
    
        parser.parseString(data, async function (err, result) {
          let finalTask = {};
          console.dir(result);
          console.log("Done");
          let projName = "UnNamed Project";
          if(result.Project.Name){
            projName = result.Project.Name[0];
          }else if(result.Project.Title){
            projName = result.Project.Title[0]
          }

          if(projName == "" || projName == undefined){
            projName = "UnNamed Project"
          }
          let totalTasks = result.Project.Tasks[0].Task.length;
          console.log("number of tasks", totalTasks)
          if(totalTasks > 0){
            for(let i = 0 ; i < totalTasks ; i++){
              //check if outlineLevel field exist in task
              if(result.Project.Tasks[0].Task[i].OutlineLevel){
                if(result.Project.Tasks[0].Task[i].OutlineLevel[0] == '1'){
                  //adding actualCost fields
                  if(finalTask.ActualCost){
                    let previousValue = parseInt(finalTask.ActualCost[0]);
                    if(result.Project.Tasks[0].Task[i].ActualCost){
                      finalTask.ActualCost[0] = (previousValue + parseInt(result.Project.Tasks[0].Task[i].ActualCost[0])).toString();
                    }
                  }else if(result.Project.Tasks[0].Task[i].ActualCost){
                    finalTask.ActualCost = result.Project.Tasks[0].Task[i].ActualCost
                  }
                  //adding BudgetedCost fields
                  if(finalTask.Cost){
                    let previousValue = parseInt(finalTask.Cost[0]);
                    if(result.Project.Tasks[0].Task[i].Cost){
                      finalTask.Cost[0] = (previousValue + parseInt(result.Project.Tasks[0].Task[i].Cost[0])).toString();
                    }
                  }else if(result.Project.Tasks[0].Task[i].Cost){
                    finalTask.Cost = result.Project.Tasks[0].Task[i].Cost
                  }
                  //adding ActualWork fields
                  if(finalTask.ActualWork){
                    let previousValue = finalTask.ActualWork[0];
                    if(result.Project.Tasks[0].Task[i].ActualWork){
                      finalTask.ActualWork[0] = (previousValue + result.Project.Tasks[0].Task[i].ActualWork[0]);
                    }
                  }else if(result.Project.Tasks[0].Task[i].ActualWork){
                    finalTask.ActualWork = result.Project.Tasks[0].Task[i].ActualWork
                  }
                  //adding RemainingCost fields
                  if(finalTask.RemainingCost){
                    let previousValue = parseInt(finalTask.RemainingCost[0]);
                    if(result.Project.Tasks[0].Task[i].RemainingCost){
                      finalTask.RemainingCost[0] = (previousValue + parseInt(result.Project.Tasks[0].Task[i].RemainingCost[0])).toString();
                    }
                  }else if(result.Project.Tasks[0].Task[i].RemainingCost){
                    finalTask.RemainingCost = result.Project.Tasks[0].Task[i].RemainingCost
                  }
                  //adding RemainingWork fields
                  if(finalTask.RemainingWork){
                    let previousValue = finalTask.RemainingWork[0];
                    if(result.Project.Tasks[0].Task[i].RemainingWork){
                      finalTask.RemainingWork[0] = (previousValue + parseInt(result.Project.Tasks[0].Task[i].RemainingWork[0]));
                    }
                  }else if(result.Project.Tasks[0].Task[i].RemainingWork){
                    finalTask.RemainingWork = result.Project.Tasks[0].Task[i].RemainingWork
                  }
                  //adding ACWP fields
                  if(finalTask.ACWP){
                    let previousValue = parseInt(finalTask.ACWP[0]);
                    if(result.Project.Tasks[0].Task[i].ACWP){
                      finalTask.ACWP[0] = (previousValue + parseInt(result.Project.Tasks[0].Task[i].ACWP[0])).toString();
                    }
                  }else if(result.Project.Tasks[0].Task[i].ACWP){
                    finalTask.ACWP = result.Project.Tasks[0].Task[i].ACWP
                  }
                  //adding BCWS fields
                  if(finalTask.BCWS){
                    let previousValue = parseInt(finalTask.BCWS[0]);
                    if(result.Project.Tasks[0].Task[i].BCWS){
                      finalTask.BCWS[0] = (previousValue + parseInt(result.Project.Tasks[0].Task[i].BCWS[0])).toString();
                    }
                  }else if(result.Project.Tasks[0].Task[i].BCWS){
                    finalTask.BCWS = result.Project.Tasks[0].Task[i].BCWS
                  }
                  //adding BCWP fields
                  if(finalTask.BCWP){
                    let previousValue = parseInt(finalTask.BCWP[0]);
                    if(result.Project.Tasks[0].Task[i].BCWP){
                      finalTask.BCWP[0] = (previousValue + parseInt(result.Project.Tasks[0].Task[i].BCWP[0])).toString();
                    }
                  }else if(result.Project.Tasks[0].Task[i].BCWP){
                    finalTask.BCWP = result.Project.Tasks[0].Task[i].BCWP
                  }
                }
              } 
            }
          }
          console.log(finalTask)
          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          let startDate = result.Project.StartDate[0]
            ? new Date(result.Project.StartDate[0])
            : "";
          let finishDate = result.Project.FinishDate[0]
            ? new Date(result.Project.FinishDate[0])
            : "";
          const differenceMs = Math.abs(finishDate - startDate);
          let duration = Math.round(differenceMs / oneDay);
    
          let project = await Project.create({
            user: userId,
            startDate,
            finishDate,
            duration,
            workDonePercentage: finalTask.PercentWorkComplete
              ? finalTask.PercentWorkComplete[0] : "",
            actualCost: finalTask.ActualCost
              ? finalTask.ActualCost[0] : "",
            budgetedCost: finalTask.Cost
              ? finalTask.Cost[0] : "",
            actualWork: finalTask.ActualWork
              ? finalTask.ActualWork[0] : "",
            costForRemainder: finalTask.RemainingCost
              ? finalTask.RemainingCost[0] : "",
            remainingWork: finalTask.RemainingWork
              ? finalTask.RemainingWork[0] : "",
            name: projName,
            acwp: finalTask.ACWP
              ? finalTask.ACWP[0] : "",
            bcws: finalTask.BCWS
              ? finalTask.BCWS[0] : "",
            bcwp: finalTask.BCWP
              ? finalTask.BCWP[0] : "",
            // variance: esult.Project.FinishDate[0]
          });
          if (project) {
            console.log("Project",project);
            res.json({
              status: 200,
              message: "Success",
              data: project,
            });
          }
        });
      });
      console.log(file, resultedFileName);
    }else{
      res.status(422).json({
        message: "Invalid file type",
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    let {
      params: { id },
      file,
    } = req;
    const userId = req.user._id;
    let project = await Project.findById(id);
    console.log("project", project);
    if (!project.user.equals(userId)) {
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
    let deleteProject = project.delete()
    console.log("deletedProject", deleteProject)
    // let deleteProject = await Project.findByIdAndDelete(id);
    if (deleteProject) {
      res.json({
        status: 200,
        // message: "success",
        message: "Project has been deleted",
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.getProjectsList = async (req, res) => {
  try {
    const userId = req.user._id;
    let projects = await Project.find({
      user: userId,
    });
    res.json({
      status: 200,
      message: "Success",
      data: projects,
    });
  } catch (err) {
    throw new Error(err);
  }
};
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    let query = await Project.find({
      user: userId,
    }).select("startDate actualCost");
    let dashboards = await Project.aggregate([
      {$match: {user: new mongoose.Types.ObjectId(userId)}},
      {
        $group: {
          _id: ["$ne", null],
          totalActualCost: {
            $sum: "$actualCost",
          },
          budgetedCost: {
            $sum: "$budgetedCost",
          },
          costForRemainder: {
            $sum: "$costForRemainder",
          },
        },
      },
    ]);
    if (dashboards && dashboards[0]) {
      res.json({
        status: 200,
        message: "Success",
        data: {
          totalCostForRemainder: dashboards[0].costForRemainder,
          totalActualcost: dashboards[0].totalActualCost,
          totalAmount: dashboards[0].budgetedCost,
          dates: query,
        },
      });
    } else {
      res.json({
        status: 200,
        message: "Success",
        data: {
          totalCostForRemainder: 0,
          totalActualcost: 0,
          totalAmount: 0,
          dates: [],
        },
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
