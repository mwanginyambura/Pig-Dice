$(document).ready(function() {
      $("#new").click(function() {
        $("#new").hide();
        $(".hidden").fadeIn();
        })
      })


      //Business Logic

      var scores, currentScore, currentPlayer;
      var player = [];
      var currentSlide = 0;
      var rollBtn = $("#roll");
      var holdBtn = $("#hold");
      var newGame = $("#newGame");
      var letsPlay = $("#play");

      function init() {
        scores = [0, 0];
        currentScore = 0;
        currentPlayer = 0;

        rollBtn.removeAttr("disabled");
        holdBtn.removeAttr("disabled");

        $("#score0").text(0);
        $("#score1").text(0);
        $("#current0").text(0);
        $("#current1").text(0);
      }

      function roll() {
        var die = Math.floor(Math.random() * 6) + 1;

        $("#rollDice").text(die);

        if (die === 1) {
          alert("Sorry " + player[currentPlayer] + ", you rolled a one!");
          currentScore = 0;
          $("#current" + currentPlayer).text(currentScore);
          currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
        } else {
          currentScore += die;
          $("#current" + currentPlayer).text(currentScore);
        }
      }

      function hold() {
        scores[currentPlayer] += currentScore;
        $("#score" + currentPlayer).text(scores[currentPlayer]);

        if (scores[currentPlayer] >= 100) {
          alert(player[currentPlayer] + " is the WINNER!!!");
          rollBtn.attr("disabled", "disabled");
          holdBtn.attr("disabled", "disabled");
        } else {
          currentScore = 0;
          $("#current" + currentPlayer).text(currentScore);
          currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
        }
      }

      function slideQuestion(p) {
        $(".slide")
          .eq(currentSlide)
          .removeClass("slide-active");
        $(".slide")
          .eq(p)
          .addClass("slide-active");
        currentSlide = p;
      }

      slideQuestion(0);

      function nextsSlide() {
        slideQuestion(currentSlide + 1);
      }

      //User Interface Logic
      $(document).ready(function() {
        init();
        rollBtn.click(roll);
        holdBtn.click(hold);
        newGame.click(init);
        $("#next").click(nextsSlide);
        $("#playerName").submit(function(e) {
          player[0] = $("#playerName0").val();

          player[1] = $("#playerName1").val();
          $("#player0").text(player[0].toUpperCase());
          $("#player1").text(player[1].toUpperCase());

          if ($("#playerName0").val() === "" || $("#playerName1").val() === "") {
            alert("Please fill in your names to continue!");
          } else {
            $("#nameEnter").hide();
            $("#game").addClass("slide-active");
          }
          e.preventDefault();
        });

      });
