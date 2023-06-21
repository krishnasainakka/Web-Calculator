document.addEventListener('DOMContentLoaded', () => {
    let display = document.querySelector('.display');
    let buttons = document.querySelectorAll('.button'); 
    let exp = "";
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
          const buttonValue = e.target.innerHTML;
          processButton(buttonValue);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Shift' && !e.repeat) {
        e.preventDefault();
        return;
      }
      
      if (e.shiftKey && e.key === '9') {
        processButton('(');
      } else if (e.shiftKey && e.key === '0') {
        processButton(')');
      } else {
        const key = e.key;
        processButton(key);
      }
    });

    function processButton(buttonValue) {
          switch(buttonValue){
            case 'CE': 
            case 'Delete':
              exp = "";
              break;
            case 'DE':
            case 'Backspace':
              exp = exp.slice(0,-1);
              break;
            case '^':
              exp = Math.pow(parseFloat(exp),2).toString();
              break;          
            case '\u221A':
              exp += '\u221A';
              display.value = exp;
              break;
            case 'log':
              exp+= 'log(';
              display.value = exp;
              break;
            case 'ln':
              exp+= 'ln(';
              display.value = exp;
              break;
            case '!':
              exp+= '!';
              display.value = exp;              
              break;
            case 'sin':
              exp+='sin(';
              display.value = exp;
              break;
            case 'cos':
              exp+='cos(';
              display.value = exp;
              break;
            case 'tan':
              exp+='tan(';
              display.value = exp;
              break;
            case '=':
            case 'Enter':
              calculate();
              break;
            default:
              exp += buttonValue;
              break;
          }
          display.value = exp;
          
      }

    function factorial(n) {
      if (n === 0 || n === 1) {
        return 1;
      } else {
        return n * factorial(n - 1);
      }
    }

    function calculate() {
      if (exp.includes('\u221A')) {
        exp = exp.replace('\u221A', 'Math.sqrt(') + ')';
      }
      
      else if (exp.includes('sin(')) {
        const match = exp.match(/sin\((-?\d+(\.\d+)?)((deg)|(rad))?\)/i);
        const value = parseFloat(match[1]);
        const unit = match[3];
      
        let radiansValue;
        if (unit === 'deg') {
          console.log(unit);
          radiansValue = (value * Math.PI) / 180;
        } else if (unit === 'rad' || !unit) {
          console.log(unit);
          radiansValue = value;
        } else {
          exp = "ERROR"
        }
        exp = exp.replace(`sin(${match[1]}${match[3]})`, `Math.sin(${radiansValue})`);
      }
      
      else if (exp.includes('cos(')) {
        const match = exp.match(/cos\((-?\d+(\.\d+)?)(deg|rad)?\)/i);
        if (match) {
          const value = parseFloat(match[1]);
          const unit = match[3];
          let radiansValue;
          if (unit === 'deg') {
            radiansValue = (value * Math.PI) / 180;
          } else if (unit === 'rad' || !unit) {
            radiansValue = value;
          } else {
            exp = "ERROR";
          }
          exp = exp.replace(`cos(${match[1]}${match[3]})`, `Math.cos(${radiansValue})`);
        } else {
          exp = "ERROR";
        }
      }

      else if (exp.includes('tan(')) {
        const match = exp.match(/tan\((-?\d+(\.\d+)?)((deg)|(rad))?\)/i);
        const value = parseFloat(match[1]);
        const unit = match[3];
      
        let radiansValue;
        if (unit === 'deg') {
          radiansValue = (value * Math.PI) / 180;
        } else if (unit === 'rad' || !unit) {
          console.log(unit);
          radiansValue = value;
        } else {
          exp = "ERROR"
        }
        exp = exp.replace(`tan(${match[1]}${match[3]})`, `Math.tan(${radiansValue})`);
      }

      else if (exp.includes('log(')) {
        const match = exp.match(/log\(([^)]+)\)/i);
        if (match) {
          const value = match[1];
          exp = exp.replace(match[0], `Math.log10(${value})`);
        } else {
          exp = 'ERROR';
        }
      }

      else if (exp.includes('ln(')) {
        exp = exp.replace('ln(', 'Math.log(') + ')';
      }
      
      else if (exp.includes('!')) {
        const match = exp.match(/(\d+)!/);
        if (match) {
          const num = parseInt(match[1]);
          if (!isNaN(num)) {
            exp = exp.replace(match[0], factorial(num));
          } else {
            exp = 'ERROR';
          }
        } else {
          exp = 'ERROR';
        }
      }
      else if (exp.includes('e')) {
        exp = exp.replace('e', Math.E);
      }
      else if (exp.includes('\u03C0')) {
        exp = exp.replace('\u03C0', Math.PI);
      }


      exp = eval(exp).toString();
    }
})