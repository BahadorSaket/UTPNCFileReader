function createObject(obj){
        
  let projectList =[];
  let monthList =[];
  let dataObject =[];
  let projectObject= [];
  let values = [];

  for (const [key, value] of Object.entries(obj)) {
      var nameArr = key.split(','); 

      //get the project month
      var month =  nameArr[0].substring(
          nameArr[0].lastIndexOf("('") + 2, 
          nameArr[0].lastIndexOf("'")
      );

      //get the project names
      var project =  nameArr[1].substring(
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
          if(values.length>0)
          {  
            projectObject.push({"name": project, "info": values});
            projectList.push(project);
          }
          projectList= [];
          projectObject = [];
          values = [];

          values.push({"employee":employee, "Hours":value})  
          projectObject.push({"name": project, "info": values})
          dataObject.push({"Month":month, "Projects":projectObject})

          monthList.push(month);
          projectList.push(project);
          allProjects.push(project);
      }
      else
      {
          if(!projectList.includes(project))
          {
            allProjects.push(project);
            values = [];
            values.push({"employee":employee, "Hours":value})  
            projectObject.push({"name": project, "info": values})
            projectList.push(project);
          }
          else
          {
            values.push({"employee":employee, "Hours":value})
          }
      }
  }

  return dataObject;
}

