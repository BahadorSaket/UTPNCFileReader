function calculation(projectName,csvObject)
{

	var summaryCalObject = []; 
	var overhead = $("#OverheadRatevalue").children(":input").val();
	overhead = parseInt(overhead.replace("%",""))/100;


	var budget;
	budget = $("#totalBudgetValue").children(":input").val();
	budget = parseInt(budget);
	console.log(budget)

	if(!budget || !overhead)
	{
	 alert("Please enter Budget and Overhead values")
	}
	else
	{
	 	for (const [key, val] of Object.entries(csvObject)) 
		{
			var obj = [];
			var totalLabor = 0;
			var counter =0;
			$("."+val.Month+"Rates").children("div").each(function () {
		   		val.info[counter].Rates = parseInt($(this).children(":input").val());
		   		counter++;
			});

			for(i=0;i<val.info.length;i++)
			{
				totalLabor += val.info[i].Hours*val.info[i].Rates;
			}

			var profit = budget - totalLabor - (totalLabor*overhead); 
			summaryCalObject.push({"Month":val.Month, "Labor":totalLabor, "Overhead":(totalLabor*overhead).toFixed(2), "Profit":profit.toFixed(2)});
			budget = profit;
		}
		return summaryCalObject;
	}
}
