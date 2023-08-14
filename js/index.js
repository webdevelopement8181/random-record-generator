




// Your existing code for generating random names, last names, ages, and emails...


function updateTime(){
const timeDateContainer=document.getElementById('timeDateContainer');
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
//
var numbers = {
    'min-first': document.getElementById('box-min-first'),
    'min-second': document.getElementById('box-min-second'),
    'min-third': document.getElementById('box-min-third'),
    'min-fourth': document.getElementById('box-min-fourth'),
    'max-first': document.getElementById('box-max-first'),
    'max-second': document.getElementById('box-max-second'),
    'max-third': document.getElementById('box-max-third'),
    'max-fourth': document.getElementById('box-max-fourth')
};
// console.log(numbers); // Add this line for debugging


for (var section in numbers) {
    for (var i = 0; i < 100; i++) {
        var span = document.createElement('span');
        span.textContent = i;
        numbers[section].appendChild(span);
        if (i !== 0) {
            span.style.display = 'none'; // Hide all numbers except the first one
        }
    }
}

var index = {};
for (var section in numbers) {
    var num = numbers[section].getElementsByTagName('span');
    index[section] = 0;
}

function nextNum(section) {
    num = numbers[section].getElementsByTagName('span');
    num[index[section]].style.display = 'none';
    index[section] = (index[section] + 1) % num.length;
    num[index[section]].style.display = 'initial';
}

function prevNum(section) {
    num = numbers[section].getElementsByTagName('span');
    num[index[section]].style.display = 'none';
    index[section] = (index[section] - 1 + num.length) % num.length;
    num[index[section]].style.display = 'initial';
}
//pagination panel
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.startBtn');
    const prevBtn = document.querySelector('.prevBtn');
    const nextBtn = document.querySelector('.nextBtn');
    const endBtn = document.querySelector('.endBtn');
    const numbers = document.querySelectorAll('.links a');
  
    let currentStep = numbers.length - 1;
  
    // Add event listener to number links
    numbers.forEach((number, numIndex) => {
      number.addEventListener("click", () => {
        currentStep = numIndex;
        updateActiveNumber();
      });
    });
  
    // Add event listeners to the prev and the next buttons
    nextBtn.addEventListener('click', () => {
      currentStep = (currentStep + 1) % numbers.length;
      updateActiveNumber();
    });
  
    prevBtn.addEventListener('click', () => {
      currentStep = (currentStep - 1 + numbers.length) % numbers.length;
      updateActiveNumber();
    });
  
    // Add event listener to the start button
    startBtn.addEventListener('click', () => {
      currentStep = 0;
      updateActiveNumber();
    });
  
    // Add event listener to the end button
    endBtn.addEventListener('click', () => {
      currentStep = numbers.length - 1;
      updateActiveNumber();
    });
  
    // Function to update the active number
    function updateActiveNumber() {
      numbers.forEach((link) => {
        link.classList.remove('active');
      });
  
      numbers[currentStep].classList.add('active');
    }
  
    // Initialize by setting the initial active number
    updateActiveNumber();
  });
  
  
  
  //tyhe drop down btn
  function dropDownFunction(){
  var dropdown=document.getElementById("myDropdown");
  dropdown.classList.toggle('show');
  }
  dropdownOptions=document.querySelectorAll('.dropdown-option');
  dropdownOptions.forEach(Option=>{
    Option.addEventListener('click',function(){
      dropdownOptions.forEach(otherOption=>otherOption.classList.remove('.selected'));
      this.classList.add('selected');
      dropDownFunction();
  })
    //close the dropdown menue when the user click outside it
    window.onclick=function(event){
if(!event.target.matches('.dropbtn')){
  var dropdowns=document.getElementsByClassName("dropdown-content");
   var i;
  for(i=0;i<dropdowns.length;i++){
    if(dropdowns[i].classList.contains('show')){
      dropdowns[i].classList.remove('show');
    }
  }
}
    }
  });
 


const generateBtn = document.querySelector('.generate-btn');
const submitBtn = document.querySelector('.submit-btn');
const resultElement = document.getElementById('result');
const members = [];
let upperSelected = false; 
let numberSelected=false;
let symbolsSelected=false;
generateBtn.addEventListener('click',()=>{
  const dropdownMenu=document.getElementById('myDropdown');
  const selectedOPtions=dropdownMenu.querySelector('.selected');

if(!selectedOPtions){
  alert ('please select a record count');
  return;
}
const selectedRecordCount=parseInt(selectedOPtions.textContent,20);
  members.length = 0;
 ///////////////////
 for (let i = 0; i < selectedRecordCount; i++) {
  const randomName = generateRandomName(upperSelected,numberSelected);
  const randomLastName = generateRandomLastName();
  const randomAge = generateRandomAge();
  const randomEmail = generateRandomEmail(randomName, randomLastName,upperSelected,symbolsSelected,numberSelected);

  members.push({
    name: randomName,
    lastName: randomLastName,
    age: randomAge,
    email: randomEmail
  });
}
resultElement.innerHTML = ''; 
drawTable(members);

});
submitBtn.addEventListener('click', () => {
   
  const upperCaseName=document.querySelectorAll('[name="include-upper-name"]:checked');
  const upperCaseLastName=document.querySelectorAll('[name="include-upper-last-name"]:checked');
  const upperCaseEmail=document.querySelectorAll(' [name="include-upper-email"]:checked');
  const numberNameValue=document.querySelectorAll('[name="include-number-name"]:checked');
  const numberLastNameValue=document.querySelectorAll('[name="include-number-last-name"]:checked');
  const numberEmailValue=document.querySelectorAll(' [name="include-number-email"]:checked');
  const symbolNameValue=document.querySelectorAll('[name="include-symbols-name"]:checked');
  const symbolLastNameValue=document.querySelectorAll('[name="include-symbols-last-name"]:checked');
  const symbolEmailValue=document.querySelectorAll(' [name="include-symbols-email"]:checked');
  const upperName = includeSelectedValues(upperCaseName);
  const upperLastName=includeSelectedValues(upperCaseLastName);
  const upperEmail=includeSelectedValues(upperCaseEmail);
  const numberName = includeSelectedValues(numberNameValue);
  const numberLastName=includeSelectedValues(numberLastNameValue);
  const numberEmail=includeSelectedValues(numberEmailValue);
  const symbolName = includeSelectedValues(symbolNameValue);
  const symbolLastName=includeSelectedValues(symbolLastNameValue);
  const symbolEmail=includeSelectedValues(symbolEmailValue);
  upperSelected=upperCaseName.length>0||upperCaseLastName.length>0||upperCaseEmail.length>0;
  numberSelected=numberNameValue.length>0||numberLastNameValue.length>0||numberEmailValue.length>0;
  symbolsSelected=symbolNameValue.length>0||symbolLastNameValue.length>0||symbolEmailValue.length>0;
  // generateRandomName(upperSelected);
  // generateRandomLastName(upperSelected);

  });
  

  function includeSelectedValues(checkboxes) {
    const selectedValues = [];
  
    checkboxes.forEach((checkbox) => {
      selectedValues.push(checkbox.value);
    });
  
    return selectedValues;
  }
  
 
  function generateRandomName(upperSelected, numberSelected, symbolsSelected) {
    const names = ['SARA111', 'JULIA', 'MIKE#', 'JJOHN@', 'Alice1#', 'mike@','vvevvl','MIike11','bob44', 'bhhob44@','bob44','Eva1243@', 'Michael', 'emma1', 'David', 'David','sophia', 'Daniel', 'Olivia', 'Emily', 'Benjamin'];
  
    const hasUpper = /[A-Z]/;
    const hasNumber = /\d/;
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  
    const filteredNames = names.filter(item => {
      const hasUpperCondition = upperSelected ? hasUpper.test(item) : true;
      const hasNumberCondition = numberSelected ? hasNumber.test(item) : true;
      const hasSymbolsCondition = symbolsSelected ? hasSymbols.test(item) : true;
  
      return hasUpperCondition && hasNumberCondition && hasSymbolsCondition;
    });
  
    if (filteredNames.length > 0) {
      return filteredNames[Math.floor(Math.random() * filteredNames.length)];
    } else if (!upperSelected || !numberSelected || !symbolsSelected) {
      return names[Math.floor(Math.random() * names.length)];
    } else {
      return 'No matching names';
    }
  }
  
//   function generateRandomLastName(upperSelected,numberSelected,symbolsSelected) {
//     const lastNames = ['SMITH@', 'gigjif','Johnson12@2', 'BROWN', 'DDAVIS44$$','sffm11', 'Miller','miller1' ,'miller%','vdhiuedhv2','Wilson1@', 'MOORE', 'TTAYLOR', 'Anderson', 'bobies@#', 'tttomas','Thomas','jakson','juile','bark','blue'];
//     let filterLastNames=lastNames;
//     if(upperSelected&&!numberSelected&&!symbolsSelected){
//       filterLastNames =lastNames.filter(item => /[A-Z]/.test(item));
//     }
//  if(numberSelected&&!symbolsSelected&&!upperSelected){
//  filterLastNames=lastNames.filter(item=>/\d/.test(item)&&!/[A-Z]/.test(item)&&!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(item));
//     }
//    if(symbolsSelected){
//     filterLastNames=lastNames.filter(item=>/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(item)&&!/\d/.test(item)&&!/[A-Z]/.test(item));
//   }
//    else if (upperSelected && numberSelected && symbolsSelected) {
//     filterLastNames = filterLastNames.filter(item => /[A-Z]/.test(item) && /\d/.test(item) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(item));
//   }
//    else if (upperSelected && numberSelected) {
//     filterLastNames = filterLastNames.filter(item =>
//       /[A-Z]/.test(item) && /\d/.test(item) && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(item)
//     );
//   }
//    else if(upperSelected&&symbolsSelected){
//     filterLastNames=filterLastNames.filter(item => /[A-Z]/.test(item)&&/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(item)&&!/\d/.test(item));
//   }
//   else if(numberSelected&&symbolsSelected){
//     filterLastNames=filterLastNames.filter(item=>/\d/.test(item) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(item)&&!/[A-Z]/.test(item));
//   }
//     if (filterLastNames.length>0) {
//       return filterLastNames[Math.floor(Math.random() * filterLastNames.length)];
   
//     } else if (!upperSelected||!numberSelected||!symbolsSelected) {
//       return lastNames[Math.floor(Math.random() * lastNames.length)];
//     } else {
//       return 'No matching  last names';
//     }
//   }
function generateRandomLastName(upperSelected,numberSelected,symbolsSelected) {
  const lastNames = ['SMITH@', 'gigjif','Johnson12@2', 'BROWN', 'DDAVIS44$$','sffm11', 'Miller','miller1' ,'miller%','vdhiuedhv2','Wilson1@', 'MOORE', 'TTAYLOR', 'Anderson', 'bobies@#', 'tttomas','Thomas','jakson','juile','bark','blue'];
  let filterLastNames=lastNames;
  
  let upperSelected_test = /[A-Z]/;
  let numberSelected_test = /\d/;
  let symbolsSelected_test = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!upperSelected) {upperSelected_test = !/[A-Z]/ }
  if (!numberSelected) {numberSelected_test = !/\d/ }
  if (!symbolsSelected) {symbolsSelected_test = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/ }
  filterLastNames = filterLastNames.filter(item=> upperSelected_test.test(item) && numberSelected_test.test(item) && symbolsSelected_test.test(item));

  if (filterLastNames.length != 0) {
      return filterLastNames[Math.floor(Math.random() * filterLastNames.length)];
  } else {
      return 'No matching  last names';
  }
}
  
  function generateRandomAge() {
    const minAge = 18;
    const maxAge = 30;
    return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
  }
  // function generateRandomEmail(firstName, lastName,upperSelected,numberSelected,symbolsSelected) {
  //   const formattedFirstName= upperSelected ? firstName.toUpperCase() :firstName.toLowerCase();
  //   const formattedLastName=upperSelected ? lastName.toUpperCase() :lastName.toLowerCase();
  //   return `${formattedFirstName}.${formattedLastName}@gmail.com`;
  // }

  function generateRandomEmail(firstName, lastName) {
    // const formattedFirstName = upperSelected ? firstName.toUpperCase() : firstName.toLowerCase();
    // const formattedLastName = upperSelected ? lastName.toUpperCase() : lastName.toLowerCase();
    return `${firstName}.${lastName}@gmail.com`;
  }

function drawTable(members){
  const table =document.createElement('table');
const thead=document.createElement('thead');
const tbody=document.createElement('tbody');
const headers=['Name','LastName','Age','Email'];
const headerRow=`<tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>`;
thead.innerHTML=headerRow;
const rows=members.map(member=>`<tr>
<td>${member.name}</td>
<td>${member.lastName}</td>
<td>${member.age}</td>
<td>${member.email}</td>
</tr>`).join('');
tbody.innerHTML=rows;
table.appendChild(thead);
table.appendChild(tbody);

// Clear existing table
resultElement.appendChild(table);
}


