//donut chart
const donutChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/scooby_bar_chart.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (donutChartData) {
      const table = [];
      const rows = donutChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      
      const labelMonsterType = table[0].slice(1); // creating array for monster type labels, removing the title of the row
      const numberOfMonster = table[1].slice(1); // creating array for number of monsters, removing the title of the row

      const donutData = {
        labels: labelMonsterType,
        datasets: [
          {
            data: numberOfMonster,
          },
        ],
      };
      
      //create donut chrt
      new Chart("donut-chart", {
        type: "doughnut",
        data: donutData,
        options: {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Number of Each Monster Type'
          },
        },
      });
    });





//radar chart 
const radarChartData = fetch(
    "https://nm2207.s3.ap-southeast-1.amazonaws.com/scooby_radar_chart_ver2.csv"
  ) 
    .then(function (response) {
      return response.text();
    })
    .then(function (radarChartData) {
      const table = [];
      const rows = radarChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      
      const labelMonsterType = table[0].slice(1); // creating array for monster type labels, removing the title of the row
      const fredCaughtMinusCaptured = table[11].slice(1); // creating array for fred's statistics of caught - captured, removing the title of the row
      const daphneCaughtMinusCaptured = table[12].slice(1); // creating array for daphne's statistics of caught - captured, removing the title of the row
      const velmaCaughtMinusCaptured = table[13].slice(1); // creating array for velma's statistics of caught - captured, removing the title of the row
      const shaggyCaughtMinusCaptured = table[14].slice(1); // creating array for shaggy's statistics of caught - captured, removing the title of the row
      const scoobyCaughtMinusCaptured = table[15].slice(1); // creating array for scooby's statistics of caught - captured, removing the title of the row


      const radarData = {
        labels: labelMonsterType,
        datasets: [
          {
            label: "Fred",
            data: fredCaughtMinusCaptured,
            fill: true,
            backgroundColor: 'rgba(0, 157, 220, 0.2)',
            borderColor: 'rgb(0, 157, 220)',
            pointBackgroundColor: 'rgb(0, 157, 220)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(0, 157, 220)'
          },
          {
            label: "Daphne",
            data: daphneCaughtMinusCaptured,
            fill: true,
            backgroundColor: 'rgba(160, 145, 198, 0.2)',
            borderColor: 'rgb(160, 145, 198)',
            pointBackgroundColor: 'rgb(160, 145, 198)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(160, 145, 198)'
          },
          {
            label: "Velma",
            data: velmaCaughtMinusCaptured,
            fill: true,
            backgroundColor: 'rgba(248, 153, 29, 0.2)',
            borderColor: 'rgb(248, 153, 29)',
            pointBackgroundColor: 'rgb(248, 153, 29)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(248, 153, 29)'
          },
          {
            label: "Shaggy",
            data: shaggyCaughtMinusCaptured,
            fill: true,
            backgroundColor: 'rgba(121, 175, 48, 0.2)',
            borderColor: 'rgb(121, 175, 48)',
            pointBackgroundColor: 'rgb(121, 175, 48)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(121, 175, 48)'
          },
          {
            label: "Scooby",
            data: scoobyCaughtMinusCaptured,
            fill: true,
            backgroundColor: 'rgba(142,99,69,0.2)',
            borderColor: 'rgb(142,99,69)',
            pointBackgroundColor: 'rgb(142,99,69)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(142,99,69)'
          },
        ],
      };
      
      //create radar chrt
      new Chart("radar-chart", {
        type: "radar",
        data: radarData,
        options: {
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 3
            }
          },
          title: {
            display: true,
            text: 'General picture of how each Hero fares against Monsters'
          }
        },
      });
    });


//daphne's horizontal bar chart 
const daphneHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/daphne_monster_analysis.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (daphneHorizontalBarChartData) {
      const table = [];
      const rows = daphneHorizontalBarChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      
      const labelMonsterType = table[0].slice(1); // creating array for monster type labels, removing the title of the row
      const numberOfMonstersCaughtByDaphne = table[1].slice(1); // creating array for number of monsters caught by daphne, removing the title of the row
      const numberOfMonstersCapturedDaphne = table[2].slice(1); // creating array for number of monsters that captured daphne, removing the title of the row
      
      for(let i = 0; i < numberOfMonstersCapturedDaphne.length; i++) {
        numberOfMonstersCapturedDaphne[i]= -Math.abs(numberOfMonstersCapturedDaphne[i]);
      }

      const daphneBarData = {
        labels: labelMonsterType,
        datasets: [
          {
            label:"Monster Caught By Daphne",
            data: numberOfMonstersCaughtByDaphne,
            backgroundColor:'rgb(81, 194, 213)',
          },
          {
            label:"Monster Captures Daphne",
            data: numberOfMonstersCapturedDaphne,
            backgroundColor:'rgb(236, 70, 70)',
          },
        ],
      };
      
      //create bar chart
      new Chart("daphne-bar-chart", {
        type: "horizontalBar",
        data: daphneBarData,
        options: {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Number of Each Monster Type that Daphne Catches, and Captures Daphne'
          },
          scales:{
            xAxes:[{
              display:true,
              ticks:{
                min: -15,
                max: 40,
              }
            }]
          }
        },
      });
    });


//fred's horizontal bar chart 
const fredHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/fred_monster_analysis.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (fredHorizontalBarChartData) {
      const table = [];
      const rows = fredHorizontalBarChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      
      const labelMonsterType = table[0].slice(1); // creating array for monster type labels, removing the title of the row
      const numberOfMonstersCaughtByFred = table[1].slice(1); // creating array for number of monsters caught by fred, removing the title of the row
      const numberOfMonstersCapturedFred = table[2].slice(1); // creating array for number of monsters that captured fred, removing the title of the row
      
      for(let i = 0; i < numberOfMonstersCapturedFred.length; i++) {
        numberOfMonstersCapturedFred[i]= -Math.abs(numberOfMonstersCapturedFred[i]);
      }

      const fredBarData = {
        labels: labelMonsterType,
        datasets: [
          {
            label:"Monster Caught By Fred",
            data: numberOfMonstersCaughtByFred,
            backgroundColor:'rgb(81, 194, 213)',
          },
          {
            label:"Monster Captures Fred",
            data: numberOfMonstersCapturedFred,
            backgroundColor:'rgb(236, 70, 70)',
          },
        ],
      };
      
      //create bar chrt
      new Chart("fred-bar-chart", {
        type: "horizontalBar",
        data: fredBarData,
        options: {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Number of Each Monster Type that Fred Catches, and Captures Fred'
          },
          scales:{
            xAxes:[{
              display:true,
              ticks:{
                min: -15,
                max: 40,
              }
            }]
          }
        },
      });
    });

  
//scooby's horizontal bar chart 
const scoobyHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/scooby_monster_analysis.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (scoobyHorizontalBarChartData) {
      const table = [];
      const rows = scoobyHorizontalBarChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      
      const labelMonsterType = table[0].slice(1); // creating array for monster type labels, removing the title of the row
      const numberOfMonstersCaughtByScooby = table[1].slice(1); // creating array for number of monsters caught by scooby, removing the title of the row
      const numberOfMonstersCapturedScooby = table[2].slice(1); // creating array for number of monsters that captured scooby, removing the title of the row
      
      for(let i = 0; i < numberOfMonstersCapturedScooby.length; i++) {
        numberOfMonstersCapturedScooby[i]= -Math.abs(numberOfMonstersCapturedScooby[i]);
      }

      const scoobyBarData = {
        labels: labelMonsterType,
        datasets: [
          {
            label:"Monster Caught By Scooby",
            data: numberOfMonstersCaughtByScooby,
            backgroundColor:'rgb(81, 194, 213)',
          },
          {
            label:"Monster Captures Scooby",
            data: numberOfMonstersCapturedScooby,
            backgroundColor:'rgb(236, 70, 70)',
          },
        ],
      };
      
      //create bar chrt
      new Chart("scooby-bar-chart", {
        type: "horizontalBar",
        data: scoobyBarData,
        options: {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Number of Each Monster Type that Scooby Catches, and Captures Scooby'
          },
          scales:{
            xAxes:[{
              display:true,
              ticks:{
                min: -15,
                max: 40,
              }
            }]
          }
        },
      });
    });

//shaggy's horizontal bar chart 
const shaggyHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/shaggy_monster_analysis.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (shaggyHorizontalBarChartData) {
      const table = [];
      const rows = shaggyHorizontalBarChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      
      const labelMonsterType = table[0].slice(1); // creating array for monster type labels, removing the title of the row
      const numberOfMonstersCaughtByShaggy = table[1].slice(1); // creating array for number of monsters caught by shaggy, removing the title of the row
      const numberOfMonstersCapturedShaggy = table[2].slice(1); // creating array for number of monsters that captured shaggy, removing the title of the row
      
      for(let i = 0; i < numberOfMonstersCapturedShaggy.length; i++) {
        numberOfMonstersCapturedShaggy[i]= -Math.abs(numberOfMonstersCapturedShaggy[i]);
      }

      const shaggyBarData = {
        labels: labelMonsterType,
        datasets: [
          {
            label:"Monster Caught By Shaggy",
            data: numberOfMonstersCaughtByShaggy,
            backgroundColor:'rgb(81, 194, 213)',
          },
          {
            label:"Monster Captures Shaggy",
            data: numberOfMonstersCapturedShaggy,
            backgroundColor:'rgb(236, 70, 70)',
          },
        ],
      };
      
      //create bar chrt
      new Chart("shaggy-bar-chart", {
        type: "horizontalBar",
        data: shaggyBarData,
        options: {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Number of Each Monster Type that Shaggy Catches, and Captures Shaggy'
          },
          scales:{
            xAxes:[{
              display:true,
              ticks:{
                min: -15,
                max: 40,
              }
            }]
          }
        },
      });
    });


//velma's horizontal bar chart 
const velmaHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/velma_monster_analysis.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (velmaHorizontalBarChartData) {
      const table = [];
      const rows = velmaHorizontalBarChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      
      const labelMonsterType = table[0].slice(1); // creating array for monster type labels, removing the title of the row
      const numberOfMonstersCaughtByVelma = table[1].slice(1); // creating array for number of monsters caught by velma, removing the title of the row
      const numberOfMonstersCapturedVelma = table[2].slice(1); // creating array for number of monsters that captured velma, removing the title of the row
      
      for(let i = 0; i < numberOfMonstersCapturedVelma.length; i++) {
        numberOfMonstersCapturedVelma[i]= -Math.abs(numberOfMonstersCapturedVelma[i]);
      }

      const velmaBarData = {
        labels: labelMonsterType,
        datasets: [
          {
            label:"Monster Caught By Velma",
            data: numberOfMonstersCaughtByVelma,
            backgroundColor:'rgb(81, 194, 213)',
          },
          {
            label:"Monster Captures Velma",
            data: numberOfMonstersCapturedVelma,
            backgroundColor:'rgb(236, 70, 70)',
          },
        ],
      };
      
      //create bar chrt
      new Chart("velma-bar-chart", {
        type: "horizontalBar",
        data: velmaBarData,
        options: {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Number of Each Monster Type that Velma Catches, and Captures Velma'
          },
          scales:{
            xAxes:[{
              display:true,
              ticks:{
                min: -15,
                max: 40,
              }
            }]
          }
        },
      });
    });


//bar chart
const barChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/snack_data.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (snackChartData) {
      const table = [];
      const rows = snackChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      
      const labelHero = table[0].slice(1); // creating array for hero labels, removing the title of the row
      const numberOfSnacks = table[1].slice(1); // creating array for number of snacks, removing the title of the row

      const barData = {
        labels: labelHero,
        datasets: [
          {
            data: numberOfSnacks,
            backgroundColor: [
              'rgb(160, 145, 198)',
              'rgb(0, 157, 220)',
              'rgb(142,99,69)',
              'rgb(121, 175, 48)',
              'rgb(248, 153, 29)',
            ]
          },
        ],
      };
      
      //create bar chart
      new Chart("snacks-chart", {
        type: "bar",
        data: barData,
        options: {
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Number of Scooby Snacks given by each Hero'
          },
        },
      });
    });


//conclusion 
var daphneProperties = {
  name: "daphne",
  age: "16",
  strength:"giving scooby snacks",
  weakness:"xx"
}
var fredProperties = {
  name: "fred",
  age: "17",
  strength:"yy",
  weakness:"xx"
}
var scoobyProperties = {
  name: "scooby",
  age: "7",
  strength:"yy",
  weakness:"xx"
}
var shaggyProperties = {
  name: "shaggy",
  age: "17",
  strength:"yy",
  weakness:"xx"
}
var velmaProperties = {
  name: "velma",
  age: "15",
  strength:"yy",
  weakness:"xx"
}


function print_daphne_properties(){
  var daphne_output_string = "Name: " + daphneProperties.name + "<br>" +
                    "Age: " + daphneProperties.age + "<br>" +
                    "Strength: " + daphneProperties.strength + "<br>" +
                    "Weakness: " +daphneProperties.weakness + "<br>";
  
  document.getElementById("daphne_output").innerHTML = daphne_output_string;
}


/* single function to print all heroes properties
function print_hero_properties(hero){
  const hero_properties = hero + "Properties"
  console.log(hero_properties);
  const output_string = "Name: " + hero_properties.name + "<br>" +
    "Age: " + hero_properties.age + "<br>" +
    "Strength: " + hero_properties.strength + "<br>" +
    "Weakness: " + hero_properties.weakness + "<br>";

  const id_name = "\"" + hero + "_output" + "\"";
  console.log(id_name);
  console.log(output_string);
  document.getElementById(id_name).innerHTML=output_string;
}
*/