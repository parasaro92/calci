var calculator = {

  init: function() {
    $('#calculator .input').click(function() {

      if(this.dataset.keyType == "digit") {
        calculator.handleInput(this.dataset.digit);
      } else if (this.dataset.keyType == "operator") {
        calculator.handleInput(this.dataset.operator);
      } else if (this.dataset.keyType == "delete") {
        calculator.handleDelete();
      } else if (this.dataset.keyType == "equals") {
        calculator.evaluateResult();
      }
    });

    $('#calculator #delete').dblclick(function() {
        calculator.clearResult();
    });

    ['0','1','2','3','4','5','6','7','8','9','/','*','+','-'].forEach(function(digit) {
      $(document).bind('keyup', digit ,function() {
        calculator.handleInput(digit);
      });
    });

    $(document).bind('keyup', '.' , function() {
      lastNumber = calculator.getLastNumber();
      if(lastNumber.indexOf('.') == -1) {
        if(lastNumber.length == 0) {
          calculator.handleInput(0);
        }
        calculator.handleInput('.');
      }
    });
    
    $(document).bind('keyup', 'backspace' ,function() {
        calculator.handleDelete();
      });
    $(document).bind('keyup', 'shift+=' ,function() {
        calculator.handleInput('+');
      });
    ['=','return'].forEach(function(key) {
    $(document).bind('keyup', key ,function() {
        calculator.evaluateResult();
      });
    });
  },
  /*
  handleInput: function(input) {
    $('#preview').html($('#preview').html() + input);  
  },
  */
  handleInput: function(input) {
    $('#preview').html($('#preview').html() + input);
  },
  
  handleDelete: function() {
      $('#preview').html($('#preview').html().slice(0, -1));
      if($('#preview').html().length == 0) {
        calculator.clearResult();
      }
  },
  
  evaluateResult: function() {
      $('#result').html(eval($('#preview').html()));
  },
  
  clearResult: function() {
      $('#result').html('');
  },
  getLastNumber: function() {
    str = $('#preview').html();
    regexp = /[+\-*\/]?([0-9.])*$/
    matches = str.match(regexp);
    if(matches == null) {
      return str;
    } else {
      return matches[0].slice(1);
    }
  }
}

$(document).ready(function() {
  calculator.init();
});