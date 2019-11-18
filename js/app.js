// Global variables used by various functions
var counter = 0;
var firstCard_id;
var secondCard_id;
var firstCard;
var firstCard_full;
var secondCard_full;
var secondCard;
var matched_pairs = 0;
var timer_seconds = 0;
var min = 0;
var secs = 0;
var list_val;
var list_child;
var list_parent;
var moves = 0;
var flag = 0;
var restart_flag = 0;
var star = 3;
var match_flag;


function startGame() {
    // Timer initiation function
    timer_init();
    // Store all cards in an array
    let cards_ele= document.getElementsByClassName("card");
    let cards = [...cards_ele];

    // Shuffle cards by sending Cards array
    let shuffled_elements= shuffle(cards); 
    let shuffled_arr = [...shuffled_elements];

    // Add event listener for Restart Button
    let repeat_button= document.getElementById("restart_button");
    repeat_button.addEventListener('click',function() {restartGame(cards)});

    // Display newly shuffled cards
    for (var i=0; i<shuffled_arr.length; i++)
    {
        document.getElementById('deck-id').appendChild(shuffled_arr[i]);    
        
    }

    // Add event listener for all the shuffled cards
    for(var j=0; j<shuffled_arr.length;j++)
    {
        shuffled_arr[j].addEventListener('click',displayCard);
    }
}

// Invoke startGame function on page load
window.onload = startGame();

function timer_init() {
//  Call timer function every second to tick the clock
    time=setInterval(() => {
        timer();},1000);         
}
   

function timer() {
    // Tick the seconds and display on the screen
    timer_seconds++;
    document.getElementById("move_num").innerHTML= moves;
    // Minutes calc logic and display
    if(timer_seconds===60)
    {
        min++;
        timer_seconds=0;
    }
    
    //  Display time 
    document.getElementById("answer").innerHTML = min + "  mins: "+ timer_seconds + " secs";
    
}

//  On click of the Card display functionality
function displayCard() {
    // If Clicked Card is first card for comparison
    if(counter===0)
    {
        //  Open and Show the Card
        this.classList.add('open');
        this.classList.add('show');
        this.removeEventListener('click',displayCard);
                
        // Pick the testid attribute of the card for comparison
        firstCard_id=this.dataset.testid;
        firstCard_full=this.dataset.points;
        firstCard=document.getElementById(firstCard_full);
        counter++;
    }
            
    // If Clicked Card is second card for comparison
    else 
    {
        this.classList.add('open');
        this.classList.add('show');

        // Pick the testid attribute of the card for comparison
        secondCard_id=this.dataset.testid;
        secondCard_full=this.dataset.points;;
        secondCard=document.getElementById(secondCard_full);
            
        // Increment move value
        moves++;

        /* Star rating management.
        Show alert message only once between moves 11 to 15, by satisfying flag criteria. 
        Flag criteria can be met only once */

        if (moves > 11 && moves < 15 && flag===0)
        {
            list_child=document.getElementById("star3");
            alert("Your star rating is downgraded- Keep trying!");

            // Remove third star
            list_child.classList.toggle("fa-star-o");
            flag=1;
            star--;
        }

        if (moves >= 15 && moves < 18 && flag===1)
        {
            list_child=document.getElementById("star2");
            alert("Your star rating is downgraded- Keep trying!");

            // Remove second star
            list_child.classList.toggle("fa-star-o");
            flag=2;
            star--;
        }

        if (moves >= 18 && flag===2)
        {
            list_child=document.getElementById("star1");
            alert("Keep trying!");

            // Remove first star
            list_child.classList.toggle("fa-star-o");
            flag=3;
            star--;
        }


        // Card testid comparison   
        if(firstCard_id===secondCard_id)
        {
            card_display(true);
        }

        else
        {
            card_display(false);
        }
              
    }
       
}
    


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

        
    }

    return array;
}


// On click of restart button. Remove all matched cards property and hide cards to restart the game
function restartGame(restart_shuffled_arr)
{
    for (var j=0;j<restart_shuffled_arr.length;j++)
    {
        restart_shuffled_arr[j].classList.remove('open');
        restart_shuffled_arr[j].classList.remove('match');
        restart_shuffled_arr[j].classList.remove('show');
    } 
    window.location.reload(true);
   
}


function matched(){
    // Increment matched_pairs, till it reaches 8
    matched_pairs++;    
    
    firstCard.classList.remove('match_disp');
    firstCard.classList.add('card');
    firstCard.classList.add('match');

    secondCard.classList.add('card');
    secondCard.classList.add('match');
    secondCard.classList.remove('match_disp');
    
    //  Remove event listener to avoid user clicking already matched cards
    firstCard.removeEventListener('click',displayCard);
    secondCard.removeEventListener('click',displayCard);
    
    if(matched_pairs===8)
    {
        timer(); 

        // Message to display on modal
        document.getElementById("winning_msg").innerHTML= "Congratulations!!! You have completed the game.";
        document.getElementById("winning_time").innerHTML= "Time taken:" + " Minutes: " + min + "  " + " Seconds: " + timer_seconds;
        document.getElementById("winning_moves").innerHTML= "Moves taken: " + moves ;
        
        if (window.star===0)
        {
            document.getElementById("winning_stars").innerHTML= "Star Rating: No Star. Better luck next time";
        }
       
        else
        if (window.star===1)
        {
            document.getElementById("winning_stars").innerHTML= "Star Rating: 1 Star";
        }
       
        else
        if (window.star===2)
        {
            document.getElementById("winning_stars").innerHTML= "Star Rating: 2 Stars";
        }
       
        else
        if (window.star===3)
        {
            document.getElementById("winning_stars").innerHTML= "Star Rating: 3 Stars";
        }
        
        modal.style.display = "block";

        // Stop timer after user completes the game
        clearInterval(time);


    }

    // Reset the values for next pair comparison
    counter=0;
    firstCard="";
    secondCard="";
    firstCard_full="";
    firstCard_id="";
    secondCard_full="";
    secondCard_id="";

}

// If selected two cards are not matching
function unmatched() {
    firstCard.classList.remove('unmatched');
    firstCard.classList.remove('show');
    firstCard.classList.remove('open');
    firstCard.addEventListener('click',displayCard);
    counter=0;
    firstCard="";
    firstCard_full="";
    firstCard_id="";
    secondCard.classList.remove('unmatched');
    secondCard.classList.remove('show');
    secondCard.classList.remove('open');                
    secondCard_id="";
    secondCard_full="";
    secondCard="";
}

function card_display(match_flag)
{
    // If selected two cards are matching - Highlight background to show user the success
    if(match_flag===true)
    {
        firstCard.classList.add('match_disp');
        secondCard.classList.add('show');
        secondCard.classList.add('match_disp');

        // Short delay give for user to perceive cards are matching
        setTimeout(matched,201);
    }

    else 
   // If selected two cards are not matching - Highlight background to show user the failed attempt in Red
    if(match_flag===false)
    {
        firstCard.classList.add('unmatched');
        secondCard.classList.add('show');
        secondCard.classList.add('unmatched');
        
        // Short delay give for user to perceive cards are not matching and memorize the cards location
        setTimeout(unmatched,201);
    }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    var result=confirm("Do you want to replay?");
 
    if(result===true)
    {
        window.location.reload(true);
    }

}

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) 
        {
            modal.style.display = "none";
            var result= confirm("Do you want to replay?");
            if(result===true)
            {
                window.location.reload(true);
            }
        }
    }

