/**getting all elements we have to target in DOM by quering/traversing the dom*/
/**form element */
const form=document.querySelector(".form");
/**input elements */
const userName=document.querySelector("#userNameId");
const email=document.querySelector("#emailId");
const password=document.querySelector("#passwordId");
const confirmPassword=document.querySelector("#confirmPasswordId");


/**disable button  */
// document.getElementById("buttonId").disabled=false;

/**array which containing the input elements */
const inputElementsArray=[userName,email,password,confirmPassword];

// Add the event listener to each input element
inputElementsArray.forEach((inputElement) => {
    inputElement.addEventListener('keyup', (e) => {
      showLiveFeedback(inputElement);
    });
  });

/**when form will be submitted by user following event will trigure that we are going to add in eventlistner
 * have two arguments one is that event which will trigure and the other one is call back primarily act as 
 * event handler
 * we are adding this to prevent user from submitting empty form
*/


form.addEventListener('submit',(e)=>{
    /**this will prevent page reloading */
    e.preventDefault();
    /**validate user data */
    // (validateData()) ? alert("form has submitted successfuly") : alert("Please fill your form")
    validateData();

})

/**Live feedback to user when user fills input fields to facilitate user in a context of form fillup process
 * as far as user target an individual input
*/
const showLiveFeedback=(inputElement)=>{

/**get values from input Elements  */
const UserNameValue=userName.value.trim();
const UserEmailValue=email.value.trim();
const UserPasswordValue=password.value.trim();
const UserConfirmPasswordValue=confirmPassword.value.trim();

/**apply vaildations for showing live feedback to user */
if(inputElement===userName){
    (UserNameValue==="" || UserNameValue.length<6) ? 
    (setError(userName,"Enter Valid UserName it cannot blank AND cannot less than 6 chracters")):
    (setSuccess(userName));
}
else if(inputElement===email){
    (validateEmail(UserEmailValue)) ? 
    (setSuccess(email)) :
    (setError(email,"Not a valid email"));
}
else if(inputElement===password){
    (validatePassword(UserPasswordValue) && UserPasswordValue!=="") ? 
    (setSuccess(password)) : 
    ((setError(password,"enter strong password")));
}
else {
    (matchPasswordConfirmPassword(UserConfirmPasswordValue) && UserConfirmPasswordValue!=="") ?
    (setSuccess(confirmPassword)) :
    ((setError(confirmPassword,"Password does't match")));
}

}


/**if valid data inputs will be given by user then success message will be provided to user as response
 * otherwise will be an error message in form of input border color changing around respective input
*/
const validateData=()=>{
/**get values from input Elements  */

const UserNameValue=userName.value.trim();
const UserEmailValue=email.value.trim();
const UserPasswordValue=password.value.trim();
const UserConfirmPasswordValue=confirmPassword.value.trim();

(UserNameValue === "" || UserEmailValue === "" || UserPasswordValue === "" || UserConfirmPasswordValue ==="") ?
// (console.log("fill your form first")) :(console.log("sucess"))
(setErrorButton()): (setSuccessButton())
}

const setSuccess=(input)=>{
    /**form-control is div */
const formControl=input.parentElement;
formControl.className="form-control success"
const small=formControl.querySelector("small")
small.innerText=""



}

const setError=(input,errorMessage)=>{
   /**form-control is div and small is child tag present in it*/
   const formControl=input.parentElement;
   const small=formControl.querySelector("small")
   formControl.className="form-control error"
   small.style.visibility='visible'
   small.innerText=errorMessage
   
}

/**Email Validation using regx */
const validateEmail=(UserEmailValue)=>{
const emailRegx=/^[A-Za-z0-9+_.-]+@(.+)$/
return emailRegx.test(UserEmailValue) /**will return true or false */
}

/**Password validation using regx */
const validatePassword=(UserPasswordValue)=>{
    const passwordRegx=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    return passwordRegx.test(UserPasswordValue)

}
/**Confirm password */
const matchPasswordConfirmPassword=(UserConfirmPasswordValue)=>{
    const UserPasswordValue=password.value.trim();
    return (UserPasswordValue===UserConfirmPasswordValue)? true : false

}
const setErrorButton=()=>{
    console.log("error");
    // document.getElementById("buttonId").disabled=true;
    alert("form submission failed! Please fill up the form completely")


    
}
    



const setSuccessButton=()=>{
    // document.getElementById("buttonId").disabled=false;
    console.log("sucess");
    
    alert("form has submitted successfuly")

}