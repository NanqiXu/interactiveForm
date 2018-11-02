var inputList = document.getElementsByTagName('input');
var fieldsetList = document.getElementsByTagName('fieldset');
var selections = document.getElementById("title");
var design = document.getElementById("design");
var colorSelections = document.getElementById('color');
var totalCost = 0;
var checkboxes = document.querySelectorAll(".activities");
var checkboxAll = document.querySelector('input[name = \'all\']');
var checkboxJs_frameworks = document.querySelector('input[name = \'js-frameworks\']');
var checkboxJs_libs = document.querySelector('input[name = \'js-libs\']');
var checkboxExpress = document.querySelector('input[name = \'express\']');
var checkboxNode = document.querySelector('input[name = \'node\']');
var checkboxBuild_tools = document.querySelector('input[name = \'build-tools\']');
var checkboxNpm = document.querySelector('input[name = \'npm\']');
var payment = document.getElementById('payment');
var paymentDiv = document.querySelectorAll("div > p");
var creditDiv = document.getElementById('credit-card');
var submitButton = document.getElementsByTagName('button')[0];
//auto focus the first input element.
inputList[0].focus();

  /*this function takes no arguement, it will change the default option for the T-shirt Theme
    to please select a T shirt theme.*/
function pleaseSelectTheme(){
  var pleaseSelect = document.createElement("option");
  pleaseSelect.textContent="<-- Please Select a T-shirt theme";
  colorSelections.insertBefore(pleaseSelect,colorSelections.children[0]);
  colorSelections.value = "<-- Please Select a T-shirt theme";
  pleaseSelect.setAttribute("id","defaultTheme");
}
//this function take a string, and check if it's validate email address or not
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//this function take a string, and check if it's validate number string or not
function validateNum(number){
    var numRe = /^[0-9]+$/;
    return numRe.test(String(number));
}
//this function will take an element, interger, interger as arguement,
//then this function will hide the element's children from start interger to the end interger
function hideNode(pNode,numStart,numEnd){
  for(var i =numStart;i<=numEnd;i++){
    pNode.children[i].style.display = "none";
  }
}
//this function will take an element, interger, interger as arguement,
//then this function will show the element's children from start interger to the end interger
function showNode(pNode,numStart,numEnd){
  for(var i =numStart;i<=numEnd;i++){
    pNode.children[i].style.display = "block";
  }
}
//this function takes a interger, then update the interger in the cost Div.
function displayCost(cost){
    if(cost > 0){
      document.getElementById('costDiv').innerHTML = "Total: $"+ cost;
    }else{
      document.getElementById('costDiv').innerHTML ="";
    }
}

//this function will take 3 boolean arguement, which represent creditcard paypal and bitcoin
//true means show the payment method, false means hide the method.
function paymentDisplay(creditcard,paypal,bitcoin){
    if(creditcard === true){
      document.getElementById("cc-num").disabled = false;
      document.getElementById("zip").disabled = false;
      document.getElementById("cvv").disabled = false;
      creditDiv.style.display = "block";
    }else{
      document.getElementById("cc-num").value = "";
      document.getElementById("cc-num").disabled = true;
      document.getElementById("zip").value = "";
      document.getElementById("zip").disabled = true;
      document.getElementById("cvv").value = "";
      document.getElementById("cvv").disabled = true;
      creditDiv.style.display = "none";
    }
    if (paypal === true) {
      paymentDiv[0].style.display= "block";
    }else{
      paymentDiv[0].style.display= "none";
    }
    if(bitcoin === true){
      paymentDiv[1].style.display= "block";
    }else {
      paymentDiv[1].style.display= "none";
    }
}

//this function will take a string for the input's ID, string for normal label text,
//and string for empty warning message. it will check if the input is empty, display warning
function checkEmpty(target,normal,warning){
  var nameLabel= document.querySelector("[for = \'" + target + "\']");
    if(document.getElementById(target).value === "" && document.getElementById(target).disabled === false ){
      nameLabel.textContent = warning;
      nameLabel.style.color = "red";
      event.preventDefault();
    }else if(target === "cc-num" && !(document.getElementById(target).value.length > 12 &&
     document.getElementById(target).value.length < 17)){
          nameLabel.textContent = "Credit number must be 13 to 16 digits";
          nameLabel.style.color = "red";
          event.preventDefault();
    }else if(target === "zip" && !(document.getElementById(target).value.length === 5)){
      nameLabel.textContent = "Must be 5 digits";
      nameLabel.style.color = "red";
      event.preventDefault();
    }else if(target === "cvv" && !(document.getElementById(target).value.length === 3)){
      nameLabel.textContent = "Must be 3 digits";
      nameLabel.style.color = "red";
      event.preventDefault();
    }else if((target === "cvv" ||target==="zip"||target==="cc-num") &&
     validateNum(document.getElementById(target).value) === false){
      nameLabel.textContent = "Only Digits plz";
      nameLabel.style.color = "red";
      event.preventDefault();
    }else if(target === "mail" && !validateEmail(document.getElementById(target).value)){
      nameLabel.textContent = "Invalid Email address";
      nameLabel.style.color = "red";
      event.preventDefault();
    }
    else{
      nameLabel.textContent = normal;
      nameLabel.style.color = "black";
    }
}

//creat the cost div, and append it to the bottem of checkboxes list.
var costDiv = document.createElement('div');
costDiv.id = "costDiv";
checkboxes[0].appendChild(costDiv);
//call the functions
pleaseSelectTheme();
hideNode(colorSelections,0,6);

//create a input field for user to enter their job title if other is being selected.
//also remove the input field if a job title was selected
var otherInput = document.getElementById("otherJob");
document.getElementsByTagName('fieldset')[0].removeChild(otherInput);
selections.addEventListener("change", (e)=>{
  if(selections.value === "other"){
    document.getElementsByTagName("fieldset")[0].appendChild(otherInput);
  }else{
    document.getElementsByTagName('fieldset')[0].removeChild(document.getElementById("otherJob"));
  }
});

//change the default of theme option, and base on design selected, display color option
//associate with the design.
design.addEventListener("change", (e)=>{
    if(design.value === "Select Theme"){
      colorSelections.value = "<-- Please Select a T-shirt theme";
      hideNode(colorSelections,1,6);
    }
    else if(design.value === "js puns"){
      colorSelections.value = "cornflowerblue";
      colorSelections[0].style.display = "none";
      showNode(colorSelections,1,3);
      hideNode(colorSelections,4,6);
    }else{
      colorSelections.value = "tomato";
      hideNode(colorSelections,0,3);
      showNode(colorSelections,4,6);
    }
})

//calculate the cost
checkboxAll.addEventListener("change", () => {
  if(checkboxAll.checked){
     totalCost += 200;
  }else{
    totalCost -= 200;
  }
  displayCost(totalCost);
})
//calculate cost and disable the option that has time conflict when this option is selected
checkboxJs_frameworks.addEventListener("change", ()=>{
    if(checkboxJs_frameworks.checked){
      totalCost += 125
      checkboxExpress.parentNode.style.color = 'gray';
      checkboxExpress.disabled = true;
    }else{
      totalCost -= 125
      checkboxExpress.disabled = false;
      checkboxExpress.parentNode.style.color = 'black';
    }
    displayCost(totalCost);
})
//calculate cost and disable the option that has time conflict when this option is selected
checkboxJs_libs.addEventListener("change", ()=>{
    if(checkboxJs_libs.checked){
      totalCost += 100
      checkboxNode.parentNode.style.color = 'gray';
      checkboxNode.disabled = true;
    }else{
      totalCost -= 100
      checkboxNode.disabled = false;
      checkboxNode.parentNode.style.color = 'black';
    }
    displayCost(totalCost);
})
//calculate cost and disable the option that has time conflict when this option is selected
checkboxExpress.addEventListener("change", ()=>{
    if(checkboxExpress.checked){
      totalCost += 100
      checkboxJs_frameworks.parentNode.style.color = 'gray';
      checkboxJs_frameworks.disabled = true;
    }else{
      totalCost -= 100
      checkboxJs_frameworks.disabled = false;
      checkboxJs_frameworks.parentNode.style.color = 'black';
    }
    displayCost(totalCost);
})
//calculate cost and disable the option that has time conflict when this option is selected
checkboxNode.addEventListener("change", ()=>{
    if(checkboxNode.checked){
      totalCost += 100
      checkboxJs_libs.parentNode.style.color = 'gray';
      checkboxJs_libs.disabled = true;
    }else{
      totalCost -= 100
      checkboxJs_libs.disabled = false;
      checkboxJs_libs.parentNode.style.color = 'black';
    }
    displayCost(totalCost);
})
//calculate cost
checkboxBuild_tools.addEventListener("change", ()=>{
    if(checkboxBuild_tools.checked){
      totalCost += 100
    }else{
      totalCost -=100
    }
    displayCost(totalCost);
})
//calculate cost
checkboxNpm.addEventListener("change", ()=>{
    if(checkboxNpm.checked){
      totalCost += 100
    }else{
      totalCost -=100
    }
    displayCost(totalCost);
})
//hide all payment method input informations
paymentDisplay(false,false,false);
//display proper message when the payment method is selected
payment.addEventListener("change", ()=>{
  if(payment.value === "select_method"){
    paymentDisplay(false,false,false);
  }
   if (payment.value === "paypal") {
    paymentDisplay(false,true,false);
  }
   if (payment.value === "bitcoin") {
    paymentDisplay(false,false,true);
  }
  if (payment.value == "credit card"){
    paymentDisplay(true,false,false);
  }
})

//check all the inputs and checkboxes, if they are empty or Invalid, pop warning message remind user
submitButton.addEventListener('click', ()=>{
    checkEmpty("name","Name:","Name:(Please provide your name)");
    checkEmpty("mail","Email:","Email:(Please provide a valid email address)");
    if(design.value === "Select Theme" && colorSelections.value
                === "<-- Please Select a T-shirt theme"){
        document.getElementsByClassName("shirt")[0].getElementsByTagName("legend")[0].innerHTML
                = "T-Shirt Info <br />"
                + "<span id = 'forgetSpan'> Don't forget to pick a T-Shirt </span>";
        document.getElementById("forgetSpan").style.color = "red";
        event.preventDefault();
    }else{
      document.getElementsByClassName("shirt")[0].getElementsByTagName("legend")[0].innerHTML
                = "T-Shirt Info";
    }
    if(totalCost === 0){
        document.getElementsByClassName("activities")[0].getElementsByTagName("legend")[0].innerHTML
            = "Register for Activities  <br /> <span id ='forgetAct'> Please select an Activity</span>";
        document.getElementById("forgetAct").style.color = "red";
        event.preventDefault();
    }else{
      document.getElementsByClassName("activities")[0].getElementsByTagName("legend")[0].innerHTML
          = "Register for Activities";
    }
    var paymentLegend = document.getElementById("payment").parentNode.firstElementChild;
    if(document.getElementById("payment").value == "select_method"){
      paymentLegend.innerHTML = "Payment Info <br/> <span id='forgetPay'>Please select"
      + " a payment method </span>";
      document.getElementById("forgetPay").style.color = "red";
      event.preventDefault();
    }else{
      paymentLegend.innerHTML = "Payment Info";
    }
    if(document.getElementById("payment").value === "credit card"){
    checkEmpty("zip","Zip Code:","Zip Code:");
    checkEmpty("cc-num","Card Number:","Card Number:");
    checkEmpty("cvv","CVV:","CVV:");
  }
})
