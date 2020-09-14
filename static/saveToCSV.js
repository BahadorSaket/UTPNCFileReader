
function saveToCSV(summaryCalObject, csvObject,projectName)
{

    var fileName = projectName+".csv";
    let csvContent = " ";

    console.log(csvObject,summaryCalObject)

    for (const [key, val] of Object.entries(csvObject)) 
    {
      
        csvContent += val.Month+"\r\n";
        csvContent += "Employee," + "Hours," + "Labor"+"\r\n";

        for(i=0;i<val.info.length;i++)
        {
           csvContent += val.info[i].Name + "," + val.info[i].Hours + "," + val.info[i].Rates+"\r\n";

        }

        csvContent += "Labor," + summaryCalObject[key]["Labor"] + "\r\n";
        csvContent += "Overhead,"  + summaryCalObject[key]["Overhead"] + "\r\n";
        csvContent += "Profit," + summaryCalObject[key]["Profit"]+"\r\n";
        csvContent += "\n\n";
    }

    var pp = document.createElement('a');
    pp.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvContent));
    pp.setAttribute('download', fileName);
    pp.click();
}