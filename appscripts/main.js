//header section
$(window).on("load resize", function() {
  $(".header-image").each(function() {
    var height = $(this).find("img").height();
    $(this).find(".fade").height(height);
  });
});


//navigation bar 
  const dataStoryPage = document.querySelector('#dataStory'); //assign data story section to variable
  const diaryEntriesPage = document.querySelector('#diaryEntries'); //assign diary entries section to variable
  const links = document.querySelectorAll('nav a'); //select all <a> elements that are descendants of <nav> element, stored as node list in variable links
  console.log(links);

  //function to display page, with the page (dataStoryPage/ diaryEntriesPage) as argument
  function showPage(page) {
    page.style.display = 'block'; //sets 'display' css property of page to 'block'
  }

  //function to hide page, with the page (dataStoryPage/ diaryEntriesPage) as argumenent
  function hidePage(page) {
    page.style.display = 'none'; //sets 'display' css property of page to 'none'
  }

  //function to display and hide the correct pages when links are clicked
  function togglePage(event) {
    event.preventDefault(); //prevent navigation to new page (default behaviour when clicking on link)
    const link = event.target.getAttribute('href'); //extract string of 'href' attribute of link that was clicked, assign to variable 'link' 
    if (link === '#dataStory') { 
      showPage(dataStoryPage); //show data story page
      hidePage(diaryEntriesPage); //hide diary entries page
      links[0].parentNode.classList.add('active'); //'active' class added to first link in the navigation bar which is links[0]
      links[1].parentNode.classList.remove('active'); //'active' class removed from second link in the navigation bar which is links[1]
      const line = document.querySelector('nav .line'); 
      line.style.width = links[0].offsetWidth + 'px'; 
    } else if (link === '#diaryEntries') {
      showPage(diaryEntriesPage); //show diary entries page
      hidePage(dataStoryPage); //hide data story page
      links[1].parentNode.classList.add('active'); //'active' class added to second link in the navigation bar which is links[1]
      links[0].parentNode.classList.remove('active'); //'active' class removed from first link in the navigation bar which is links[0]
      const line = document.querySelector('nav .line');
      line.style.width = links[1].offsetWidth + 'px';
    }
    const nav = document.querySelector('nav');
    nav.classList.add('animate'); // add 'animate' class to nav element
    const line = document.querySelector('nav .line'); 
    line.style.width = event.target.offsetWidth + 'px';
    line.style.transform = `translateX(${event.target.offsetLeft}px)`;
  }

  //attach event listener to each of the links (previously declared to be all the links in the navigation menu), and execute togglePage function when clicked
  links.forEach(function(link) {
    link.addEventListener('click', togglePage);
  });

  // Add event listener to window object to update line when window is resized
  window.addEventListener('resize', function() {
  const activeLink = document.querySelector('.active a');
  const line = document.querySelector('nav .line'); 
  line.style.width = activeLink.offsetWidth + 'px';
  line.style.transform = `translateX(${activeLink.offsetLeft}px)`;
});

  // Show the first page by default
  showPage(dataStoryPage);
  links[0].parentNode.classList.add('active');
  const nav = document.querySelector('nav');
  nav.classList.add('animate');
  const line = document.querySelector('nav .line');
  line.style.width = links[0].offsetWidth + 'px';
  line.style.transform = `translateX(${links[0].offsetLeft}px)`;

//hero profile 

  //function to expand each hero's image when hovered over
    function expandImage(clippedImage) {
      // get clipped image
      const imageId = '#' + clippedImage
      const image = document.querySelector(imageId);
      
      // expand clipped image
      image.style.transformOrigin = 'top left';
      image.style.transition = 'transform 0.3s ease';
    }

  //function to shrink each hero's image when hovering away
    function shrinkImage(clippedImage) {
      // get clipped image
      const imageId = '#' + clippedImage
      const image = document.querySelector(imageId);
      
      // shrink clipped image
      image.style.transform = 'scale(1)';
      image.style.transition = 'transform 0.3s ease';
    }

  //function to discolor the background of each hero's image when hovered over
    function discolorBackground(backgroundImage) {
      // get background image
      const imageId = '#' + backgroundImage
      const image = document.querySelector(imageId);

      // add filter on background
      image.style.filter = 'sepia(100%)';
    }

  //function to discolor the background of each hero's image when hovering away
    function recolorBackground(backgroundImage) {
      // get background image
      const imageId = '#' + backgroundImage
      const image = document.querySelector(imageId);
      
      // remove filter on background
      image.style.filter = 'none';
    }

  //function to slide in description in heroes profile when hovered over
    function descriptionSlidein(sliderId){
      const slider = document.getElementById(sliderId);
      const sliderHeight = slider.scrollHeight;
      slider.style.height = sliderHeight + 'px';
    }

  //function to slide out description in heroes profile when hovering away
    function descriptionSlideout(sliderId){
      const slider = document.getElementById(sliderId);
      slider.style.height = '0';
    }

//slider 
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// Show the first slide and dot as active
slides[currentSlide].classList.add('active');
dots[currentSlide].classList.add('active');

// Arrow controls
slider.addEventListener('click', (event) => {
  if (event.target.classList.contains('arrow-left')) {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
  } else if (event.target.classList.contains('arrow-right')) {
    currentSlide++;
    if (currentSlide > slides.length - 1) {
      currentSlide = 0;
    }
  }

  // Update active slide and dot
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });
  dots.forEach((dot) => {
    dot.classList.remove('active');
  });
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
});


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
            backgroundColor: ["#cbd6e4","#c86558","#cbd6e4","#cbd6e4","#c86558","#cbd6e4","#cbd6e4","#c86558","#cbd6e4","#c86558","#cbd6e4","#c86558"],
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
/*const daphneHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/daphne_monster_analysis.csv")
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
          },
        },
      });
    });
    */
  
  //daphne's horizontal bar chart using plotly
      d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/gapminder_with_codes.csv", function (err, data) {
      if (err) {
        console.error(err);
        return;
      }

      const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
      const caughtColor = 'blue';
      const capturedColor = 'pink';
      const daphneCaughtPercent = [20,26,44,40,48];
      const daphneCapturedPercent =[];
      for (let i = 0; i < daphneCaughtPercent.length; i++) {
        daphneCapturedPercent.push(100 - daphneCaughtPercent[i]);
      }

      // define trace data for each bar
      const trace1 = {
        x: daphneCaughtPercent,
        y: monster,
        name: 'Daphne catches monster',
        orientation: 'h',
        marker: {
          color: 'blue',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const trace2 = {
        x: daphneCapturedPercent,
        y: monster,
        name: 'monster captures Daphne',
        orientation: 'h',
        marker: {
          color: 'pink',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const traceData = [trace1, trace2];

      // Define the layout for the horizontal bar chart with axis labels, chart title, and subtitle
      const layout = {
        title: {
          text: "% of Each Monster Type that Daphne Catches, <br>and Captures Daphne",
          font: { size: 20 },
        },
        xaxis: {
          title: "Percentage",
          tickformat: ',.0%',
          range: [0, 100],
          showgrid: false,
          showticklabels: false
        },
        yaxis: {
          title: "Monster Type",
          automargin: true
        },
        barmode: 'stack',
        margin: { t: 100, b: 130, l: 150, r: 150 },
        height: '100%',
        legend:{
          y: -0.24,
          yanchor: 'top',
          orientation: 'h'
        }
      };


      // Create the bar chart 
      Plotly.newPlot("daphne-bar-chart", traceData, layout);
    });


//fred's horizontal bar chart 
/*const fredHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/fred_monster_analysis.csv")
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
    }); */

      //fred's horizontal bar chart using plotly
      d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/gapminder_with_codes.csv", function (err, data) {
      if (err) {
        console.error(err);
        return;
      }

      const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
      const caughtColor = 'blue';
      const capturedColor = 'pink';
      const fredCaughtPercent = [65,72,69,67,58];
      const fredCapturedPercent =[];
      for (let i = 0; i < fredCaughtPercent.length; i++) {
        fredCapturedPercent.push(100 - fredCaughtPercent[i]);
      }

      // define trace data for each bar
      const trace1 = {
        x: fredCaughtPercent,
        y: monster,
        name: 'Fred catches monster',
        orientation: 'h',
        marker: {
          color: 'blue',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const trace2 = {
        x: fredCapturedPercent,
        y: monster,
        name: 'monster captures Fred',
        orientation: 'h',
        marker: {
          color: 'pink',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const traceData = [trace1, trace2];

      // Define the layout for the horizontal bar chart with axis labels, chart title, and subtitle
      const layout = {
        title: {
          text: "% of Each Monster Type that Fred Catches, <br>and Captures Fred",
          font: { size: 20 },
        },
        xaxis: {
          title: "Percentage",
          tickformat: ',.0%',
          range: [0, 100],
          showgrid: false,
          showticklabels: false
        },
        yaxis: {
          title: "Monster Type",
          automargin: true
        },
        barmode: 'stack',
        margin: { t: 100, b: 130, l: 150, r: 150 },
        height: '100%',
        legend:{
          y: -0.24,
          yanchor: 'top',
          orientation: 'h'
        }
      };


      // Create the bar chart 
      Plotly.newPlot("fred-bar-chart", traceData, layout);
    });
  
//scooby's horizontal bar chart 
/*const scoobyHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/scooby_monster_analysis.csv")
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
    });*/

    //scooby's horizontal bar chart using plotly
    d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/gapminder_with_codes.csv", function (err, data) {
      if (err) {
        console.error(err);
        return;
      }

      const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
      const caughtColor = 'blue';
      const capturedColor = 'pink';
      const scoobyCaughtPercent = [70,78,77,73,71];
      const scoobyCapturedPercent =[];
      for (let i = 0; i < scoobyCaughtPercent.length; i++) {
        scoobyCapturedPercent.push(100 - scoobyCaughtPercent[i]);
      }

      // define trace data for each bar
      const trace1 = {
        x: scoobyCaughtPercent,
        y: monster,
        name: 'Scooby catches monster',
        orientation: 'h',
        marker: {
          color: 'blue',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const trace2 = {
        x: scoobyCapturedPercent,
        y: monster,
        name: 'monster captures Scooby',
        orientation: 'h',
        marker: {
          color: 'pink',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const traceData = [trace1, trace2];

      // Define the layout for the horizontal bar chart with axis labels, chart title, and subtitle
      const layout = {
        title: {
          text: "% of Each Monster Type that Scooby Catches, <br>and Captures Scooby",
          font: { size: 20 },
        },
        xaxis: {
          title: "Percentage",
          tickformat: ',.0%',
          range: [0, 100],
          showgrid: false,
          showticklabels: false
        },
        yaxis: {
          title: "Monster Type",
          automargin: true
        },
        barmode: 'stack',
        margin: { t: 100, b: 130, l: 150, r: 150 },
        height: '100%',
        legend:{
          y: -0.24,
          yanchor: 'top',
          orientation: 'h'
        }
      };


      // Create the bar chart 
      Plotly.newPlot("scooby-bar-chart", traceData, layout);
    });

//shaggy's horizontal bar chart 
/*const shaggyHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/shaggy_monster_analysis.csv")
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
    */

    //shaggy's horizontal bar chart using plotly
    d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/gapminder_with_codes.csv", function (err, data) {
      if (err) {
        console.error(err);
        return;
      }

      const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
      const caughtColor = 'blue';
      const capturedColor = 'pink';
      const shaggyCaughtPercent = [47,60,44,38,60];
      const shaggyCapturedPercent =[];
      for (let i = 0; i < shaggyCaughtPercent.length; i++) {
        shaggyCapturedPercent.push(100 - shaggyCaughtPercent[i]);
      }

      // define trace data for each bar
      const trace1 = {
        x: shaggyCaughtPercent,
        y: monster,
        name: 'Shaggy catches monster',
        orientation: 'h',
        marker: {
          color: 'blue',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const trace2 = {
        x: shaggyCapturedPercent,
        y: monster,
        name: 'monster captures Shaggy',
        orientation: 'h',
        marker: {
          color: 'pink',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const traceData = [trace1, trace2];

      // Define the layout for the horizontal bar chart with axis labels, chart title, and subtitle
      const layout = {
        title: {
          text: "% of Each Monster Type that Shaggy Catches, <br>and Captures Shaggy",
          font: { size: 20 },
        },
        xaxis: {
          title: "Percentage",
          tickformat: ',.0%',
          range: [0, 100],
          showgrid: false,
          showticklabels: false
        },
        yaxis: {
          title: "Monster Type",
          automargin: true
        },
        barmode: 'stack',
        margin: { t: 100, b: 130, l: 150, r: 150 },
        height: '100%',
        legend:{
          y: -0.24,
          yanchor: 'top',
          orientation: 'h'
        }
      };


      // Create the bar chart 
      Plotly.newPlot("shaggy-bar-chart", traceData, layout);
    });


//velma's horizontal bar chart 
/*const velmaHorizontalBarChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/velma_monster_analysis.csv")
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
    });*/

    //velma's horizontal bar chart using plotly
    d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/gapminder_with_codes.csv", function (err, data) {
      if (err) {
        console.error(err);
        return;
      }

      const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
      const caughtColor = 'blue';
      const capturedColor = 'pink';
      const velmaCaughtPercent = [33,24,13,45,70];
      const velmaCapturedPercent =[];
      for (let i = 0; i < velmaCaughtPercent.length; i++) {
        velmaCapturedPercent.push(100 - velmaCaughtPercent[i]);
      }

      //calculate average of velmaCaughtPercent
      let sum = 0;
      for (let i = 0; i < velmaCaughtPercent.length; i++){
        sum += velmaCaughtPercent[i];
      }
      const average = sum/5;
      console.log(average)

      // define trace data for each bar
      const trace1 = {
        x: velmaCaughtPercent,
        y: monster,
        name: 'Velma catches monster',
        orientation: 'h',
        marker: {
          color: 'blue',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const trace2 = {
        x: velmaCapturedPercent,
        y: monster,
        name: 'monster captures Velma',
        orientation: 'h',
        marker: {
          color: 'pink',
          width: 1
        },
        type: 'bar',
        hovertemplate: '%{x:.0f}%'
      };

      const traceData = [trace1, trace2];

      // Define the layout for the horizontal bar chart with axis labels, chart title, and subtitle
      const layout = {
        title: {
          text: "% of Each Monster Type that Velma Catches, <br>and Captures Velma",
          font: { size: 20 },
        },
        xaxis: {
          title: "Percentage",
          tickformat: ',.0%',
          range: [0, 100],
          showgrid: false,
          showticklabels: false
        },
        yaxis: {
          title: "Monster Type",
          automargin: true
        },
        barmode: 'stack',
        margin: { t: 100, b: 130, l: 150, r: 150 },
        height: '100%',
        legend:{
          y: -0.24,
          yanchor: 'top',
          orientation: 'h'
        }
      };


      // Create the bar chart 
      Plotly.newPlot("velma-bar-chart", traceData, layout);
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
    


//conclusion cards
const cards = document.querySelectorAll('.card_inner');
cards.forEach(card => {
  card.addEventListener('click', function(){
    card.classList.toggle('is-flipped');
  });
});
