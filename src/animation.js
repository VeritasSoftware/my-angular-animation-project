export function triggerAnimation(id, animation)  {
    var animateMe = document.getElementById(id);
        
    if (animateMe != null) {
        animateMe.classList.remove(...animateMe.classList);
        
        setTimeout(function () {
            animateMe.classList.add(animation);
        }, 0);
    }
}

export function hideContent(id) {
    var animateMe = document.getElementById(id);

    if (animateMe != null) {
        animateMe.classList.remove(...animateMe.classList);

        setTimeout(function () {
            animateMe.classList.add("hidden");
        }, 0);        
    }
}

var myExtObject = (function() {

    return {
      triggerAnimation: function(id, animation) {
        alert('triggerAnimation called');
        var animateMe = document.getElementById(id);
        
        if (animateMe != null) {
            animateMe.classList.remove(...animateMe.classList);
            
            setTimeout(function () {
                animateMe.classList.add(animation);
            }, 0);
        }
      },
      func2: function() {
        alert('function 2 called');
      }
    }
  
  })(myExtObject||{})