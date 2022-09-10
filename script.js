const themeStyle=document.getElementById('themeStyle');
const themeToggleBtns=document.getElementsByClassName('radio-btn');
const currentTheme = localStorage.getItem('theme')||getDefaultTheme();

const operatorBtns=document.querySelectorAll('button');
let screenDisplay=document.getElementById("screen-display");

//If there are no theme saved on the currentTheme it selects one based on the users choice
function getDefaultTheme(){
    if(window.matchMedia('(prefers-color-scheme: light').matches){
        return 'light';
    }else if(window.matchMedia('(prefers-color-scheme: no-preference').matches){
        return 'no-preference-theme';
    }else{
        return 'dark';
    }
}

console.log('Theme = '+currentTheme)

//This is the function that initialized the theme
function initTheme(){
    

    for(let i=0; i<themeToggleBtns.length;i++){
        themeToggleBtns[i].addEventListener('change', function(){
            activateTheme(this.value);
            
        localStorage.setItem('theme', this.value);
        })
    }
    
    document.getElementById(currentTheme).checked=true;
    activateTheme(currentTheme);
    
}

initTheme();

//Activates the theme 
function activateTheme(themeMode){
    themeStyle.setAttribute('href', `css/themes/${themeMode}.css`);

}


for(let i=0; i<operatorBtns.length;i++){
    operatorBtns[i].addEventListener("click", function(){
        let input=this.innerText;
       evaluate(input);
    })
}

//A function to listen to keypress and make sure only valid keys are accepted on the scree

document.addEventListener('keypress',function(event){
    if ((event.keyCode >= 42 && event.keyCode <=57) || event.keyCode === 13) {
        evaluate(event.key)
      } 
})


//This is the method that does all the work related to calculating values

function evaluate(input){
    switch(input){
        case 'RESET':
            screenDisplay.innerText='';
            break;
        case 'DEL':
            screenDisplay.innerText= screenDisplay.innerText.slice(0,-1);
            break;
        case '=' && 'Enter':
            try{
                screenDisplay.innerText=eval(screenDisplay.innerText);
            }catch{
                screenDisplay.innerText='Mathimatical error';
            }
            break;
          
       default:
        if(input==='x'){
            screenDisplay.innerText+='*';
            break;
        }
        screenDisplay.innerText+=input;
    }
}