//header section
  //jQuery function to adjust height of the fade to black div to match height of header image when the window loads, and also when the window is resized
    //function triggered on the "load" and "resize" events of window
    $(window).on("load resize", function() { 
      $(".header-image").each(function() {  //select elements with class "header-image" and iterates over each of them (but just one in this case)
        const height = $(this).find("img").height();  //find height of header-image and assigns it to height variable
        $(this).find(".fade").height(height);   //set height fade div to match the height variable earlier derived
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

  //function declaration to display and hide the correct pages when links are clicked
  function togglePage(event) {
    event.preventDefault(); //prevent navigation to new page (default behaviour when clicking on link)
    const link = event.target.getAttribute('href'); //extract string of 'href' attribute of link that was clicked, assign to variable 'link' 
    //if clicked link was datastory section
    if (link === '#dataStory') { 
      showPage(dataStoryPage); //show data story page
      hidePage(diaryEntriesPage); //hide diary entries page
      links[0].parentNode.classList.add('active'); //'active' class added to first link in the navigation bar which is links[0] aka data story
      links[1].parentNode.classList.remove('active'); //'active' class removed from second link in the navigation bar which is links[1] aka diaryentries
      const line = document.querySelector('nav .line'); //get the div with class "line" under the nav section, and assigns it to the variable line
      line.style.width = links[0].offsetWidth + 'px'; //width of line div is set to equal width of data story and adds 'px' to end of unit value for css to display this

    //if clicked link was diaryentries section
    } else if (link === '#diaryEntries') {
      showPage(diaryEntriesPage); //show diary entries page
      hidePage(dataStoryPage); //hide data story page 
      links[1].parentNode.classList.add('active'); //'active' class added to second link in the navigation bar which is links[1] aka diaryentries
      links[0].parentNode.classList.remove('active'); //'active' class removed from first link in the navigation bar which is links[0] aka datastory
      const line = document.querySelector('nav .line'); //get the div with class "line" under the nav section, and assigns it to the variable line
      line.style.width = links[1].offsetWidth + 'px'; //width of line div is set to equal width of diary entries and adds 'px' to end of unit value for css to display this
    }

    //underline styling
    const nav = document.querySelector('nav'); //selects the nav element and assigns it to the variable nav
    nav.classList.add('animate'); // add 'animate' class to nav element, triggering css animation that changes the width and position of line element
    const line = document.querySelector('nav .line'); //selects div with class "line" under nav element
    line.style.width = event.target.offsetWidth + 'px'; //width is set to be equal as width of clicked link
    line.style.transform = `translateX(${event.target.offsetLeft}px)`; //horizontal position of line element set to match position of clicked link
  }

  //togglePage function call: attach event listener to each of the links in the array, and execute togglePage function when clicked
  links.forEach(function(link) {
    link.addEventListener('click', togglePage);
  });

  // event listener to update line when window is resized (prevent line from moving off the position when window is resized)
  window.addEventListener('resize', function() { //listen for window resizing
  const activeLink = document.querySelector('.active a'); //selects link currently active (with active class)
  const line = document.querySelector('nav .line'); //selects div with class line and assigns to line variable
  line.style.width = activeLink.offsetWidth + 'px'; //set line width to be same as width of active link element
  line.style.transform = `translateX(${activeLink.offsetLeft}px)`; //set horizontal position to match position of active link
  });

  // event listener to update line when window is loaded (prevent line from moving off the position when window is loaded)
  window.addEventListener('load', function() { //listen for window reloading
  const activeLink = document.querySelector('.active a'); //selects link currently active (with active class)
  const line = document.querySelector('nav .line');  //selects div with class line and assigns to line variable
  line.style.width = activeLink.offsetWidth + 'px'; //set line width to be same as width of active link element
  line.style.transform = `translateX(${activeLink.offsetLeft}px)`; //set horizontal position to match position of active link
  });

  // show data story (first page) by default
  showPage(dataStoryPage); //function call to show data story page
  links[0].parentNode.classList.add('active'); //add "active" class to data story page within the links array
  //trigger css animation for line element, and size and position it to fit the data story link
    const nav = document.querySelector('nav'); 
    nav.classList.add('animate');
    const line = document.querySelector('nav .line');
    line.style.width = links[0].offsetWidth + 'px';
    line.style.transform = `translateX(${links[0].offsetLeft}px)`;



//hero profile 

  //declare function to expand each hero's image when hovered over (this function is called from html page, onmouseenter event)
    function expandImage(heroImage) {
      // get image
      const imageId = '#' + heroImage //concatenate '#' and argument from html onmouseenter event to form div id
      const image = document.querySelector(imageId); //select the image with the div id earlier derived and assign to variable image
      
      // expand image
      image.style.transform = 'scale(1.2)'; //enlarge image by scale of 1.2
      image.style.transition = 'transform 0.3s ease'; //enlargement transformation done over 0.3s, with ease effect
    }

  //declare function to shrink each hero's image when hovering away (this function is called from html page, onmouseleaveevent)
    function shrinkImage(heroImage) {
      // get image
      const imageId = '#' + heroImage //concatenate '#' and argument from html onmouseleave event to form div id
      const image = document.querySelector(imageId); ////select the image with the div id earlier derived and assign to variable image
      
      // shrink image
      image.style.transform = 'scale(1)'; //shrink image to return to original 1x scale
      image.style.transition = 'transform 0.3s ease'; //shrinking transformation done over 0.3s, with ease effect

    }
  
  //declare function to discolor all other images (this function is called from html page, onmouseenter event)
  function discolorOtherImages(img1, img2, img3, img4) { //function takes in four arguments which are the names of the divs of the heroes which are not hovered over
    const images = [img1, img2, img3, img4]; //arguments (4 hero images divs) put into array
  
    // for every image of the array, set grayscale
    images.forEach((img) => {
      const image = document.getElementById(img); //retrieve image by the id names earlier entered as arguments
      image.style.transition = 'filter 0.3s ease'; // transition property
      image.style.filter = 'grayscale(80%)'; //grayscale settings
    });
  }

  //declare function to recolor all images (this function is called from html page, onmouseleave event)
  function recolorAllImages() { //takes in no arguments 
    const images = document.querySelectorAll('.hero-images'); //all images with class hero-images are selected and put into array 
    
    // for every image in array (all 5), reset grayscale
    images.forEach((image) => {
      image.style.filter = ''; //remove grayscale settings
      image.style.transition = 'filter 0.3s ease'; //transition property
    });
  }

  //declare function to fade in description in heroes profile when hovered over (this function is called from html page, onmouseenter event)
    function descriptionFadein(sliderId){ //takes in one argument, specified in html page, argument is the hero's description id
    const slider = document.getElementById(sliderId); //assign id to slider variable
    slider.style.opacity = 1; //set description opacity to 1 (show description)
    }

  //declare function to fade out description in heroes profile when not hovered over (this function is called from html page, onmouseleave event)
  function descriptionFadeout(sliderId){ //takes in one argument, specified in html page, argument is the hero's description id
    const slider = document.getElementById(sliderId); //assign id to slider variable
    slider.style.opacity = 0; //set description opacity to 1 (hide description)
    }

  //keep hero-images-container same size as dotted circle
  const dottedCircle = document.querySelector('#dotted-circle'); //select dotted circle image
  const heroImagesContainer = document.querySelector('#hero-images-container'); //select div which is container for 5 hero-images
  const dottedCircleWidth = dottedCircle.offsetWidth; //extracts dotted circle image's width
  const dottedCircleHeight = dottedCircle.offsetHeight; //extracts dotted circle image's height
  
  heroImagesContainer.style.width = dottedCircleWidth + 'px'; //fix container to same width as dotted circle
  heroImagesContainer.style.height = dottedCircleHeight + 'px'; //fix container to same height as dotted circle


//slider for deeper analysis section 
  const slider = document.querySelector('.slider'); //slider class (container for all 5 slides) assigned to slider variable
  const slides = document.querySelectorAll('.slide'); //slide class (5 of such slides) assigned to slides variable (array)
  const dots = document.querySelectorAll('.dot'); //dot class (5 of such dots) assigned to dots variable (array)
  let currentSlide = 0; //initialize element number of array to start at 0, variable can be changed later

  // show the first slide and dot as active by default; over here currentSlide = 0, so this is the first element of each array
  slides[currentSlide].classList.add('active'); //add active class to first slide 
  slides[currentSlide].style.display = 'block'; //display as block style 
  dots[currentSlide].classList.add('active'); //add active class to first dot

  // arrow controls
  slider.addEventListener('click', (event) => {
    //if left arrow is clicked (left arrow div contains class "arrow-left")
    if (event.target.classList.contains('arrow-left')) {
      currentSlide--; //decreases the currentslide value by 1, this is later used to update the slide to the previous slide
      //checks for the situation that slide number turns negative: this happens when a user clicks the left button when on the first slide (when index value is already 0), the line above causes the index value to become -1
      if (currentSlide < 0) {
        //resets the index value to the last slide (5th slide, which is here index value = 4)
        currentSlide = slides.length - 1;
      }

    //if right arrow is clicked (right arrow div contains class "arrow-right")
    } else if (event.target.classList.contains('arrow-right')) {
      currentSlide++; //increases the currentslide value by 1, this is later used to update the slide to the next slide
      //checks for the situation that slide index becomes more than 4: this happens when a user clicks the right button when already on the last slide (when index value is already 4), since the line above causes the index value to become 5
      if (currentSlide > slides.length - 1) {
        //resets the index value to the first slide (which index value is 0)
        currentSlide = 0;
      }
    }

    // update active slide and dot, according to the new currentSlide index
      //remove 'active' class from all slides and do not display any slide
      slides.forEach((slide) => {
        slide.classList.remove('active');
        slide.style.display = 'none';
      });
      //remove 'active' class from all dots 
      dots.forEach((dot) => {
        dot.classList.remove('active');
      });
      //add 'active' class to current slide 
      slides[currentSlide].classList.add('active');
      //display current slide
      slides[currentSlide].style.display = 'block';
      //add 'active class' to current dot
      dots[currentSlide].classList.add('active');
  });


//donut chart
//fetch csv file 
const donutChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/scooby_bar_chart.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (donutChartData) {
      //convert csv data to an array (with rows) of arrays (with elements of the row)
      const table = []; //empty array
      const rows = donutChartData.split("\r\n"); //split csv file into rows

      //for each row, split and add to table array
      rows.forEach((r, index) => {
        const item = r.split(",");
        table.push(item);
      });

      //extract labels for each monster type and the number of monsters from the table array
      const labelMonsterType = table[0].slice(1); // creating array for monster type labels, removing the title of the row
      const numberOfMonster = table[1].slice(1); // creating array for number of monsters, removing the title of the row

      //creating data object for donut chart
      const donutData = {
        labels: labelMonsterType,
        datasets: [
          {
            data: numberOfMonster,
            //colors of bar, two types of colors (red and grey), manually put in to highlight 5 common types
            backgroundColor: ["#cbd6e4","#c86558","#cbd6e4","#cbd6e4","#c86558","#cbd6e4","#cbd6e4","#c86558","#cbd6e4","#c86558","#cbd6e4","#c86558"],
          },
        ],
      };
      
      //define plugin to add labels of certain groups (top5) to be displayed on the chart
      const groupNamePlugin = {
        afterDatasetsDraw: function (chart) {
          const ctx = chart.ctx;
          
          //font and text alignment settings 
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "14px museo-light"; 
      
          // define the indices of the group names to display
          const selectedGroups = [1, 4, 7, 9, 11]; // display names for 2nd, 5th, 8th, 10th, and 12th groups
          
          //loop through each label in the chart
            chart.data.labels.forEach(function (label, index) {
              //checks if label's index is included in the selectedGroups array
              if (selectedGroups.includes(index)) {
                const meta = chart.getDatasetMeta(0); //get donut chart dataset metadata
                const arc = meta.data[index]; //retrieves data obkect for segment at the current index
                const position = arc.tooltipPosition(); //calculates position of tooltip for the segment (which is in the center), and gives the x and y coordinates to the position variable
        
                ctx.fillStyle = "white"; //white text

                // check if current group has index=9, which is possessed objects group. the text should be split into two lines as there is no space
                if (index === 9) { 
                  const line1 = "Possessed"; 
                  const line2 = "Object"; 
                  const lineHeight = 16;
                  
                  ctx.fillText(line1, position.x, position.y - lineHeight / 2); //first line is placed at a position that is half the line height, above current position
                  ctx.fillText(line2, position.x, position.y + lineHeight / 2); //second line is placed at a position that is half the line height, below current position
                } else {
                  //if every other group that should have name displayed, place text label at current position
                  ctx.fillText(label, position.x, position.y);
                }
              }
            })
        },
      };

      //create donut chrt
      new Chart("donut-chart", {
        type: "doughnut", //specify type of chart
        data: donutData, //data
        options: {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          title: {
            display: true,
            text: 'Number of Each Monster Type' .toUpperCase(), //make title fully caps
            //font settings for title
            fontSize:20, 
            fontStyle:"bold",
            fontFamily: "museo-light"
          },
          tooltips:{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // background color of tooltip black and translucent
            bodyFontFamily: 'museo-light', // tooltip body font 
            bodyFontSize: 14, // tooltip body font size
            bodyFontStyle: 'bold', // bold tooltip body text
            bodyFontColor: '#ffffff', // tooltip body color white
          }
        },
        plugins: [groupNamePlugin], //include name labels for selected groups

      });
    });





//radar chart 
//fetch csv file
const radarChartData = fetch(
    "https://nm2207.s3.ap-southeast-1.amazonaws.com/scooby_radar_chart_ver2.csv"
  ) 
    .then(function (response) {
      return response.text();
    })
    .then(function (radarChartData) {
      //creating array (rows) of arrays (elements within row)
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
            //color settings for fred
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
            //color settings for daphne
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
            //color settings for velma
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
            //color settings for shaggy
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
            //color settings for shaggy
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
        type: "radar", //radar type
        data: radarData,
        options: {
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 2.5 //border of lines on chart
            }
          },
          title: {
            display: true,
            text: 'Overall hero performance against monsters' .toUpperCase(), //title in upper case
            fontSize:20,
            fontStyle:"bold",
            fontFamily: "museo-light"
          },
          legend: {
            labels: {
              // legend labels font settings
              fontFamily: 'museo-light', 
              fontSize: 14, 
              fontStyle:"bold",
            },
          },
          scale: {
            pointLabels: {
              //font settings for axis labels
              fontSize: 14,
              fontFamily: 'museo-light'
            },
            ticks: {
              //font settings for scale numbers
              fontSize: 12, 
              fontFamily: 'museo-light',
              fontStyle:'bold',
              backdropColor: 'transparent' // remove the white background of the scale numbers
            }
          },
          tooltips:{
            //tooltips settings
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
            titleFontFamily: 'museo-light',
            titleFontSize: 14, 
            titleFontStyle: 'bold', 
            titleFontColor: '#ffffff',
            bodyFontFamily: 'museo-light',
            bodyFontSize: 14,
            bodyFontColor: '#ffffff',
          },
        },
      });
    });
  
//create five horizontal bar charts (function calls)
  createDaphneBarChart();
  createFredBarChart();
  createScoobyBarChart();
  createShaggyBarChart();
  createVelmaBarChart();


//daphne's horizontal bar chart function declaration using plotly
function createDaphneBarChart(){
  //define types of monsters 
  const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
  // define percentage of each monster caught
  const daphneCaughtPercent = [20,26,44,40,48];
  //calculate percentage of captured 
  const daphneCapturedPercent =[];  //empty array
  //loop through each value in daphneCaughtPercent and subtract the value from 100, then put it into daphneCapturedPercent array
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
      color: '#b94e7d',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  const trace2 = {
    x: daphneCapturedPercent,
    y: monster,
    name: 'monster captures Daphne',
    orientation: 'h',
    marker: {
      color: '#f2b2c0',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  //combine two trace data into an array
  const traceData = [trace1, trace2];

  // define the layout for the horizontal bar chart
  const layout = {
    title: {
      text: "% of Each Monster Type that Daphne Catches, <br>and Captures Daphne",
      font: {
        family: 'museo-light, sans-serif',
        style: 'bold',
        size: 20,
        color: 'black'
      },
    },
    xaxis: {
      title: "Percentage",
      tickformat: ',.0%',
      range: [0, 100],
      showgrid: false,
      showticklabels: false,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
    },
    yaxis: {
      automargin: true,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
      tickfont: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black'
      },
    },
    barmode: 'stack',
    margin: { t: 100, b: 130, l: 150, r: 150 },
    height: '100%',
    legend:{
      //position of legend 
      y: -0.24,
      yanchor: 'top',
      orientation: 'h',
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black',
      }
    },
    hoverlabel: {
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'white'
      },
      bgcolor:'rgba(0, 0, 0, 1)',
      bordercolor:'black',
    },
    //background color none 
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)'
  };


  // create the bar chart 
  Plotly.newPlot("daphne-bar-chart", traceData, layout);
}

//fred's horizontal bar chart function declaration using plotly
function createFredBarChart(){
  //defines types of monsters
  const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
  //define percentage of captured
  const fredCaughtPercent = [65,72,69,67,58];
  //calculate percentage of captured
  const fredCapturedPercent =[]; //empty array
  //loop through each value in fredCaughtPercent and substract the value from 100, then put it into fredCapturedPercent array
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
      color: '#2656AB',
      width: 1
    },
    type: 'bar',
    //customise tooltip  text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  const trace2 = {
    x: fredCapturedPercent,
    y: monster,
    name: 'monster captures Fred',
    orientation: 'h',
    marker: {
      color: '#8ab8e6',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  const traceData = [trace1, trace2];

  // define the layout for the horizontal bar chart
  const layout = {
    title: {
      text: "% of Each Monster Type that Fred Catches, <br>and Captures Fred",
      font: {
        family: 'museo-light, sans-serif',
        style: 'bold',
        size: 20,
        color: 'black'
      },
    },
    xaxis: {
      title: "Percentage",
      tickformat: ',.0%',
      range: [0, 100],
      showgrid: false,
      showticklabels: false,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
    },
    yaxis: {
      automargin: true,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
      tickfont: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black'
      },
    },
    barmode: 'stack',
    margin: { t: 100, b: 130, l: 150, r: 150 },
    height: '100%',
    legend:{
      //position of legend
      y: -0.24,
      yanchor: 'top',
      orientation: 'h',
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black',
      }
    },
    hoverlabel: {
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'white'
      },
      bgcolor:'rgba(0, 0, 0, 1)',
      bordercolor:'black',
    },
    //background color transparent
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)'
  };


  // create the bar chart 
  Plotly.newPlot("fred-bar-chart", traceData, layout);

}


//scooby's horizontal bar chart function declaration using plotly
function createScoobyBarChart(){
  //define types of monsters
  const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
  //define percentage of each monster caught
  const scoobyCaughtPercent = [70,78,77,73,71];
  //calculate percentage of captured
  const scoobyCapturedPercent =[]; //empty array
  //loop through each value in scoobyCaughtPercent and subtract the value from 100, then put it into scoobyCapturedPercent array
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
      color: '#9d6750',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  const trace2 = {
    x: scoobyCapturedPercent,
    y: monster,
    name: 'monster captures Scooby',
    orientation: 'h',
    marker: {
      color: '#cdaa92',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  //combine two trace data into an array
  const traceData = [trace1, trace2];

  // Define the layout for the horizontal bar chart 
  const layout = {
    title: {
      text: "% of Each Monster Type that Scooby Catches, <br>and Captures Scooby",
      font: {
        family: 'museo-light, sans-serif',
        style: 'bold',
        size: 20,
        color: 'black'
      },
    },
    xaxis: {
      title: "Percentage",
      tickformat: ',.0%',
      range: [0, 100],
      showgrid: false,
      showticklabels: false,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
    },
    yaxis: {
      automargin: true,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
      tickfont: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black'
      },
    },
    barmode: 'stack',
    margin: { t: 100, b: 130, l: 150, r: 150 },
    height: '100%',
    legend:{
      //position of legend
      y: -0.24,
      yanchor: 'top',
      orientation: 'h',
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black',
      }
    },
    hoverlabel: {
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'white'
      },
      bgcolor:'rgba(0, 0, 0, 1)',
      bordercolor:'black',
    },
    //background color transparent
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)'
  };


  // create the bar chart 
  Plotly.newPlot("scooby-bar-chart", traceData, layout);
};

//shaggy's horizontal bar chart function declaration using plotly
function createShaggyBarChart(){
  //define types of monsters
  const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
  //define percentage of each monster caught
  const shaggyCaughtPercent = [47,60,44,38,60];
  //calculate percentage of captured
  const shaggyCapturedPercent =[]; //empty array
  //loop through each value in shaggyCauhghtPercent  and subtract the value from 100, then put it intoshaggyCapturedPercent
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
      color: '#6CA84F',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  const trace2 = {
    x: shaggyCapturedPercent,
    y: monster,
    name: 'monster captures Shaggy',
    orientation: 'h',
    marker: {
      color: '#b2d2a7',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  //combine two trace data into an array
  const traceData = [trace1, trace2];

  //define the layout for the horizontal bar chart 
  const layout = {
    title: {
      text: "% of Each Monster Type that Shaggy Catches, <br>and Captures Shaggy",
      font: {
        family: 'museo-light, sans-serif',
        style: 'bold',
        size: 20,
        color: 'black'
      },
    },
    xaxis: {
      title: "Percentage",
      tickformat: ',.0%',
      range: [0, 100],
      showgrid: false,
      showticklabels: false,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
    },
    yaxis: {
      automargin: true,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
      tickfont: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black'
      },
    },
    barmode: 'stack',
    margin: { t: 100, b: 130, l: 150, r: 150 },
    height: '100%',
    legend:{
      //legend position
      y: -0.24,
      yanchor: 'top',
      orientation: 'h',
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black',
      }
    },
    hoverlabel: {
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'white'
      },
      bgcolor:'rgba(0, 0, 0, 1)',
      bordercolor:'black',
    },
    //background color transparent
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)'
  };


  // create the bar chart 
  Plotly.newPlot("shaggy-bar-chart", traceData, layout);
};

//velma's horizontal bar chart function declaration using plotly
function createVelmaBarChart(){
  //define the monster types
  const monster = ['Animal','Ghost','Mythical','Possessed Object','Undead'];
  //define percentage of each monster caught
  const velmaCaughtPercent = [33,24,13,45,70];
  //calculate percentage of captured
  const velmaCapturedPercent =[]; //empty array
  //loop through each value in velmaCaughtPercent and subtract the value from 100, then put it into velmaCapturedPercent array
  for (let i = 0; i < velmaCaughtPercent.length; i++) {
    velmaCapturedPercent.push(100 - velmaCaughtPercent[i]);
  }

  // define trace data for each bar
  const trace1 = {
    x: velmaCaughtPercent,
    y: monster,
    name: 'Velma catches monster',
    orientation: 'h',
    marker: {
      color: '#b36a33',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  const trace2 = {
    x: velmaCapturedPercent,
    y: monster,
    name: 'monster captures Velma',
    orientation: 'h',
    marker: {
      color: '#f3c6a1',
      width: 1
    },
    type: 'bar',
    //customise tooltip text to show percentage values
    hovertemplate: '%{x:.0f}%'
  };

  //combine two trace data into an array
  const traceData = [trace1, trace2];

  // define the layout for the horizontal bar chart 
  const layout = {
    title: {
      text: "% of Each Monster Type that Velma Catches, <br>and Captures Velma",
      font: {
        family: 'museo-light, sans-serif',
        style: 'bold',
        size: 20,
        color: 'black'
      },
    },
    xaxis: {
      title: "Percentage",
      tickformat: ',.0%',
      range: [0, 100],
      showgrid: false,
      showticklabels: false,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
    },
    yaxis: {
      automargin: true,
      titlefont: {
        family: 'museo-light, sans-serif',
        size: 14,
        color: 'black'
      },
      tickfont: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black'
      },
    },
    barmode: 'stack',
    margin: { t: 100, b: 130, l: 150, r: 150 },
    height: '100%',
    legend:{
      //position of legend
      y: -0.24,
      yanchor: 'top',
      orientation: 'h',
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'black',
      }
    },
    hoverlabel: {
      font: {
        family: 'museo-light, sans-serif',
        size: 12,
        color: 'white'
      },
      bgcolor:'rgba(0, 0, 0, 1)',
      bordercolor:'black',
    },
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)'
  };


  // create the bar chart 
  Plotly.newPlot("velma-bar-chart", traceData, layout);
};


//vertical bar chart for scooby snacks
//fetch csv data 
const barChartData = fetch("https://nm2207.s3.ap-southeast-1.amazonaws.com/snack_data.csv")
.then(function (response) {
      return response.text();
    })
    .then(function (snackChartData) {
      //create table arrays containing rows, and rows array containing elements
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
              //each pertaining to each character
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
            text: 'Number of Scooby Snacks given by each Hero'.toUpperCase(),
            fontFamily: 'museo-light,sans-serif',
            fontStyle: 'bold',
            fontSize: 20
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                fontFamily: 'museo-light,sans-serif',
                fontStyle: 'bold',
                fontSize: 14
              },
            }],
            xAxes: [{
              ticks: {
                fontFamily: 'museo-light,sans-serif',
                fontStyle: 'bold',
                fontSize: 14
              },
            }]
          },
          tooltips:{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // background color of the tooltip
            titleFontFamily: 'museo-light', // tooltip title font
            titleFontSize: 14, // tooltip title font size
            titleFontStyle: 'bold', // tooltip title font style
            titleFontColor: '#ffffff', //tooltip title font color
            bodyFontFamily: 'museo-light', // tooltip body font
            bodyFontSize: 14, // tooltip body font size
            bodyFontColor: '#ffffff', // tooltip body font color
          },
        }        
      });
    });
    


//conclusion cards
const cards = document.querySelectorAll('.card_inner'); //select all divs with card_inner classes (5 of them), put into array
//for every element of the array,listen for click, and add 'is-flipped' class to the div, to trigger css to flip card
cards.forEach(card => {
  card.addEventListener('click', function(){
    card.classList.toggle('is-flipped');
  });
});

