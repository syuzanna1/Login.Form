const usernameEl = document.querySelector('#username');
const userSurnameEl = document.querySelector('#userSurname');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isPasswordSecure = (password) => {
       const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      return re.test(password);
       };
class SignupValidation {
     
    constructor(username,userSurname,email,password,confirmPassword,message, isRequired,isBetween,isPasswordSecure,isFormValid){
        this.username=username
        this.userSurname= userSurname
        this.email=email
        this.password=password
        this.confirmPassword=confirmPassword
        this.isRequired=isRequired
        this.isBetween=isBetween
        this.isPasswordSecure= isPasswordSecure
        this.isFormValid = isFormValid ;
        this.message = message
        
    }
    showSuccess = (input) => {
           
        const formField = input.parentElement;
        
        formField.classList.remove('error');
          formField.classList.add('success');
        
            const error = formField.querySelector('small');
            error.textContent = '';
         }
    
     
    



    checkUsername(){
        let valid = false;
        const min= 3;
        max = 25;
        username = usernameEl.value.trim();
        userSurname = userSurnameEl.value.trim();
        if (!isRequired(username) || !isRequired(userSurname)){
           throw new errBlank(usernameEl, 'Username cannot be blank.'); 
        }else if( !isBetween(username.length, min, max) || !isBetween(userSurname.length, min, max)){
            throw new errLenght(usernameEl, `Username must be between ${min} and ${max} characters.`);
        }else {
            showSuccess(usernameEl,userSurnameEl);
                    valid = true;
                }
                return valid;

    }


    checkEmail = () => {
        isEmailValid = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };
        let valid = false;
        const email = emailEl.value.trim();
        if (!isRequired(email)) {
            throw new errBlank(emailEl, 'Email cannot be blank.');
        } else if (!isEmailValid(email)) {
            throw new errValid(emailEl, 'Email is not valid.')
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    };

    checkPassword(password) {
        let valid = false;
        
       password = passwordEl.value.trim();
    
        if (!isRequired(password)) {
            throw new errBlank(passwordEl, 'Password cannot be blank.');
        } else if (!isPasswordSecure(password)) {
            throw new errValid(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
        } else {
            showSuccess(passwordEl);
            valid = true;
        }
    
        return valid;

    }
    checkConfirmPassword = () => {
        let valid = false;
        
        const confirmPassword = confirmPasswordEl.value.trim();
        const password = passwordEl.value.trim();
    
        if (!isRequired(confirmPassword)) {
            throw new errBlank(confirmPasswordEl, 'Please enter the password again');
        } else if (password !== confirmPassword) {
            throw new errBlank(confirmPasswordEl, 'The password does not match');
        } else {
            showSuccess(confirmPasswordEl);
            valid = true;
        }
    
        return valid;
    };
    
    
    main() {

        // showError = (input, message) => {
        
        //     const formField = input.parentElement;
        //     formField.classList.remove('success');
        //     formField.classList.add('error');
        //     const error = formField.querySelector('small');
        //     error.textContent = message;
        // };


        try{
            this.checkUsername(); this.checkEmail(); this.checkPassword(); this.confirmPassword()
        }catch (err){
            err.message
        }
        







        form.addEventListener('submit', function (e) {
                            e.preventDefault();
                
            //         // validate fields
                    isUsernameValid = checkUsername(),
                        isEmailValid = checkEmail(),
                        isPasswordValid = checkPassword(),
                        isConfirmPasswordValid = checkConfirmPassword();
                
            //         let isFormValid = isUsernameValid &&
            //             isEmailValid &&
            //             isPasswordValid &&
            //             isConfirmPasswordValid;
           
            let   isFormValid = 'false'
            // let isUsernameValid = 1;
            if(isUsernameValid && isEmailValid  && isPasswordValid && isConfirmPasswordValid){
                 isFormValid = 'succses'
            }
            
                if(isFormValid=='succses'){
                    // console.log( username,userSurname,email,)
                    console.log('ok');
                }
                
    })

    }
}

const signup = new SignupValidation();

signup.main();