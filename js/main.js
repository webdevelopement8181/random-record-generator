document.addEventListener("DOMContentLoaded", function() {
    const generateBtn = document.querySelector('.generate-btn');
    const numberTable = document.getElementById('numberTable');
    const tbody = document.getElementsByTagName('tbody')[0];
    const popup = document.getElementById('popup');
    const popupName = document.getElementById('popUpName');
    const popupLastName = document.getElementById('popUpLastName');
    const popupAge = document.getElementById('popUpAge');
    const popupEmail = document.getElementById('popUpEmail');
    const closeButton = document.getElementById('closeButton');
    //
    const pagination = document.getElementById('dataContainer');
    const paginationLinks = document.getElementById('pagination');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const showRowsPerPage = document.getElementById('rowsPerPage');
    //minMax
    let isNameUpperChecked, isNameNumberChecked, isNameSymbolsChecked,
    isLastNameUpperChecked, isLastNameNumberChecked, isLastNameSymbolsChecked;
    //records count
   

   
    let currentPage = 1;
    let rowsPerPage = parseInt(showRowsPerPage.value);
    let totalRows = 0;

    let numberMinNameValue = 0;
    let numberMaxNameValue = 100; // Default values, change as needed
    let numberLastNameMinValue = 0;
    let numberLastNameMaxValue=100;
    let numberAgeMinValue =1;
    let numberAgeMaxValue = 100; // Default values, change as needed
    // let numberEmailMinValue = 0;
    // let numberEmailMaxValue = 100; // Default values, change as needed
    //checkboxes
    
    

    generateBtn.addEventListener('click', () => {
      const startTime = new Date(); // Get the start time
    
      var randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
      randomDataGenerator(randomNumber);
    
     //record count part in the header
      const generationTime = `${startTime.getHours()}:${String(startTime.getMinutes()).padStart(2, '0')}:${String(startTime.getSeconds())}`;
    
      const recordCountElement = document.getElementById('recordCount');
      const generationTimeElement = document.getElementById('generationTime');
      const historyRecords = document.getElementById('historyRecords');
      const historyTimes = document.getElementById('historyTimes');
    
      recordCountElement.textContent = randomNumber; 
      generationTimeElement.textContent = generationTime; 
      
      // Append to history panel
      const historyRecordItem = document.createElement('div');
      historyRecordItem.textContent = randomNumber;
      historyRecords.appendChild(historyRecordItem);
    
      const historyTimeItem = document.createElement('div');
      historyTimeItem.textContent = generationTime;
      historyTimeItem.style.borderBottom = '3px solid black';
     historyTimeItem.style.marginLeft='5px';
     historyRecordItem.style.borderBottom='3px solid black';
   
      historyTimes.appendChild(historyTimeItem);
    });

    function randomDataGenerator(randomNumber) {
      tbody.innerHTML = '';
      const batchSize = parseInt(showRowsPerPage.value);
      const totalBatches = Math.ceil(randomNumber / batchSize);
    
      let currentBatch = 0;
    
      function addNextBatch() {
        const rowsInBatch = Math.min(batchSize, randomNumber - currentBatch * batchSize);
    
        for (let rowIndex = 0; rowIndex < rowsInBatch; rowIndex++) {
          const newRow = tbody.insertRow();
    
          for (let j = 0; j < 4; j++) {
            const newCell = newRow.insertCell(j);
            let value = '';
    
            if (j === 0) {
              if (numberMinNameValue && numberMaxNameValue) {
                do {
                  value = randomNameGenerator();
                  console.log('its working',value);
                } while (value.length < numberMinNameValue || value.length > numberMaxNameValue);
              } else {
                value = randomNameGenerator();
                console.log('its not working',value);
              }
            } else if (j === 1) {
              if (numberLastNameMinValue  && numberLastNameMaxValue) {
                do {
                  value = randomLastNameGenerator();
                } while (value.length < numberLastNameMinValue || value.length > numberLastNameMaxValue);
              } else {
                value = randomLastNameGenerator();
              }
            } else if (j === 2) {
              if (numberAgeMinValue && numberAgeMaxValue) {
                do {
                  value = randomAgeGenerator();
                } while (value < numberAgeMinValue || value > numberAgeMaxValue);
              } else {
                value = randomAgeGenerator();
              }
            } else if (j === 3) {
              value = randomEmailGenerator();
            }
    
            newCell.textContent = value;
          }
        }
    
        currentBatch++;
    
        if (currentBatch < totalBatches) {
          setTimeout(addNextBatch, 20);
        } else {
          totalRows = randomNumber;
          updatePaginationLinks();
          showPage(currentPage);
        }
      }
    
      addNextBatch();
    }
    
    const rowsPerPageSelect = document.getElementById('rowsPerPage');
    const linksPerPage = 5;
    let currentPageSet = 1;
    let totalPages;
    
    // ... Your other code ...
    
    rowsPerPageSelect.addEventListener('change', () => {
      updatePaginationLinks();
      showPage(currentPage);
    });
    
    prevButton.addEventListener('click', () => {
      if (currentPageSet > 1) {
        currentPageSet--;
        showPage(currentPageSet * linksPerPage);
      }
    });
    
    nextButton.addEventListener('click', () => {
      if (currentPageSet < totalPages) {
        currentPageSet++;
        showPage(currentPageSet * linksPerPage);
      }
    });
    
    function updatePaginationLinks() {
      totalPages = Math.ceil(totalRows / parseInt(rowsPerPageSelect.value));
      const paginationDiv = document.getElementById('pagination');
      paginationDiv.innerHTML = '';
    
      for (let page = 1; page <= totalPages; page++) {
        const link = document.createElement('a');
        link.textContent = page;
        link.href = '#';
        link.addEventListener('click', () => {
          showPage(page);
        });
        paginationDiv.appendChild(link);
      }
    }
    
    function showPage(page) {
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
    
      const rows = tbody.children;
      for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = (i >= startIndex && i < endIndex) ? 'table-row' : 'none';
      }
    
      currentPage = page;
    }


// ... Your other code ...

rowsPerPageSelect.addEventListener('change', () => {
  updatePaginationLinks();
  showPage(1); // Reset to the first page
});

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(totalRows / rowsPerPage);
        console.log(totalPages)
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });


        
    numberTable.addEventListener('click', (event) => {
        if (event.target.nodeName === 'TD') {
            const row = event.target.parentNode;
            const cells = row.getElementsByTagName('td');
            const name = cells[0].textContent;
            const lastName = cells[1].textContent;
            const age = cells[2].textContent;
            const email = cells[3].textContent;

            popupName.textContent = 'Name: ' + name;
            popupLastName.textContent = 'Last Name: ' + lastName;
            popupAge.textContent = 'Age: ' + age;
            popupEmail.textContent = 'Email: ' + email;

            popup.style.display = 'block';
        }
    });
 

    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });


    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    
    function randomNameGenerator() {
      const nameLength = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
      let randomName = '';
    
      for (let i = 0; i < nameLength; i++) {
        if (isNameUpperChecked) {
          randomName += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
        } else {
          randomName += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      }
    
      if (isNameNumberChecked) {
        const randomNumberCount = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        for (let i = 0; i < randomNumberCount; i++) {
          randomName += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
      }
    
      if (isNameSymbolsChecked) {
        const randomSymbolCount = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        for (let i = 0; i < randomSymbolCount; i++) {
          randomName += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
      }
    
      return randomName;
    }
    

    
    function randomLastNameGenerator() {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      const symbols = '!@#$%^&*';
    
      const lastNameLength = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
      let randomLastName = '';
    
      for (let i = 0; i < lastNameLength; i++) {
        if (isLastNameUpperChecked) {
          randomLastName += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
        } else {
          randomLastName += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      }
    
      if (isLastNameNumberChecked) {
        const randomNumberCount = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        for (let i = 0; i < randomNumberCount; i++) {
          randomLastName += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
      }
    
      if (isLastNameSymbolsChecked) {
        const randomSymbolCount = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        for (let i = 0; i < randomSymbolCount; i++) {
          randomLastName += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
      }
    
      return randomLastName;
    }
    
    function randomAgeGenerator(minAge,maxAge){
         minAge=1;
        maxAge=99;
      var randomAge=  Math.floor(Math.random()*(maxAge-minAge)+minAge);
      return randomAge;
    }
    function randomEmailGenerator() {
        const firstName = randomNameGenerator();
        const lastName = randomLastNameGenerator();
        return `${firstName}.${lastName}@gmail.com`;
    }
  
  

    //constrain form

      const submitBtn = document.querySelector('.submit-btn');
    
      
      // Checkbox values
     
  
      submitBtn.addEventListener('click', () => {
          // Update checkbox values inside the click event
          isNameUpperChecked = document.getElementById('upperCase-name').checked;
          isNameNumberChecked = document.getElementById('number-name').checked;
          isNameSymbolsChecked = document.getElementById('symbols-name').checked;
          isLastNameUpperChecked = document.getElementById('upperCase-lastName').checked;
          isLastNameNumberChecked = document.getElementById('number-lastName').checked;
          isLastNameSymbolsChecked = document.getElementById('symbols-lastName').checked;

  
          // Retrieve other values
         numberMinNameValue = parseInt(document.getElementById('numberMinNameValue').value);
         numberMaxNameValue = parseInt(document.getElementById('numberMaxNameValue').value);
          numberLastNameMinValue = parseInt(document.getElementById('numberMinLastNameValue').value);
          numberLastNameMaxValue = parseInt(document.getElementById('numberMaxLastNameValue').value);
           numberAgeMinValue = parseInt(document.getElementById('numberMinAgeValue').value);
           numberAgeMaxValue = parseInt(document.getElementById('numberMaxAgeValue').value);
        numberEmailMinValue = parseInt(document.getElementById('numberMinEmailValue').value);
           numberEmailMaxValue = parseInt(document.getElementById('numberMaxEmailValue').value);
          console.log(numberMinNameValue)
          console.log(numberMaxNameValue)
          // Use the checkbox values as needed
          console.log("Is Name Upper Checked:", isNameUpperChecked);
          console.log("Is Name Number Checked:", isNameNumberChecked);
          console.log("Is Name Symbols Checked:", isNameSymbolsChecked);
          console.log("Is Last Name Upper Checked:", isLastNameUpperChecked);
          console.log("Is Last Name Number Checked:", isLastNameNumberChecked);
          console.log("Is Last Name Symbols Checked:", isLastNameSymbolsChecked);
  
          // Rest of your code...
      });
      
  });
  

//timeDate

function updateTime(){
   
    const recordCount=document.querySelector('.timeRecord');
    const currentDate=new Date();
    const hours=String(currentDate.getHours()).padStart(2,'0');
    const minus=String(currentDate.getMinutes()).padStart(2,'0');
    const seconds=String(currentDate.getSeconds()).padStart(2,'0');
    const time =`${hours}:${minus}:${seconds}`;
    timeDateContainer.textContent =`${time} - ${timeDateContainer.dataset.liveDate}`

    setTimeout(updateTime,1000);
    }
    function updateDate(){
        const currentDate=new Date();
        const liveDate=currentDate.toLocaleDateString();
        timeDateContainer.dataset.liveDate=liveDate;
        setTimeout(updateDate,1000*60*60*24);
    }
    
    updateTime();
    updateDate();
//recordand time count in the header
    // function recordCountGenerator(){
    //   recordCount.textContent=
    // }
