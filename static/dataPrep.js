function createObject(obj){
  
  let projectList =[];
  let monthList =[];
  let dataObject =[];
  let projectObject= [];
  let values = [];

  let lastProject;
  let lastMonth;
  let project, month;

  for (const [key, value] of Object.entries(obj)) {
      var nameArr = key.split(','); 

      //get the project month
      lastMonth = month;
      month =  nameArr[0].substring(
          nameArr[0].lastIndexOf("('") + 2, 
          nameArr[0].lastIndexOf("'")
      );

      lastProject = project;
      //get the project names
      project =  nameArr[1].substring(
          nameArr[1].lastIndexOf(" '")+2, 
          nameArr[1].lastIndexOf("'") 
      );

      //get the employee names
      var employee =  nameArr[2].substring(
          nameArr[2].lastIndexOf(" '")+2, 
          nameArr[2].lastIndexOf("')") 
      );

      if(!monthList.includes(month))
      {
          if(projectObject.length>0)
          {
            projectObject.push({"name": lastProject, "info": values})
            dataObject.push({"Month":lastMonth, "Projects":projectObject})
          }
          projectList= [];
          projectObject = [];
          values = [];

          values.push({"employee":employee, "Hours":value})  

          monthList.push(month);
          projectList.push(project);
          allProjects.push(project);
      }
      else
      {
          if(!projectList.includes(project))
          {
            projectObject.push({"name": lastProject, "info": values})
            values = [];
            values.push({"employee":employee, "Hours":value})  
            projectList.push(project);
            allProjects.push(project);
          }
          else
          {
            values.push({"employee":employee, "Hours":value})
          }
      }
  }
  projectObject.push({"name": lastProject, "info": values})
  dataObject.push({"Month":lastMonth, "Projects":projectObject})
  return dataObject;
}

