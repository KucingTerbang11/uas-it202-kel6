//  Nama  : Yafi Irsyad Ramadhan
//  NIM   : 220401010239
//  Kelas : IT202
//  Kel   : 6
//  Prodi : Pemograman Web 1

(function () {
  let questions = [
    {
      //Soal 1
      question: "Ada Berapa Rukun Islam?", //Penulisan soal
      choices: [2, 5, 10, 15, 20], //Array pilihan jawaban
      correctAnswer: 1, //Pilihan array jawaban yang benar
    },
    {
      //Soal 2
      question: "Ada Berapa Rukun Iman?", ///Penulisan soal
      choices: [3, 5, 9, 6, 18], //Array pilihan jawaban
      correctAnswer: 3, //Pilihan array jawaban yang benar
    },
    {
      //Soal 3
      question: "Pengganti Wudhu Disebut?", //Penulisan soal
      choices: ["Tayamum", "Mandi", "Thaharah", "Masbuk", "Istinjak"], //Array pilihan jawaban
      correctAnswer: 0, //Pilihan array jawaban yang benar
    },
    {
      //Soal 4
      question: "Berapa Total Rakaat Shalat wajib?", //Penulisan soal
      choices: [4, 5, 6, 17, 8], //Array pilihan jawaban
      correctAnswer: 3,
    },
    {
      //Soal 5
      question: "Ada Berapa Rukun Wudhu?", //Penulisan soal
      choices: [7, 1, 3, 9, 6], //Array pilihan jawaban
      correctAnswer: 4, //Pilihan array jawaban yang benar
    },
  ];

  let questionCounter = 0; //Melacak No Soal
  let selections = []; //Array yang berisi pilihan pengguna
  let quiz = $("#quiz"); //Objek id div quiz

  //Tampilkan pertanyaan awal
  displayNext();

  //Klik penangan untuk tombol 'Next'
  $("#next").on("click", function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(":animated")) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert("Please make a selection!");
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $("#prev").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $("#start").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $("#start").hide();
  });

  // Animates buttons on hover
  $(".button").on("mouseenter", function () {
    $(this).addClass("active");
  });
  $(".button").on("mouseleave", function () {
    $(this).removeClass("active");
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    let qElement = $("<div>", {
      id: "question",
    });

    let header = $(
      '<h2 class="text-center"><b>Soal ke ' + (index + 1) + " :</b></h2>"
    );
    qElement.append(header);

    let question = $('<p class="text-center">').append(
      questions[index].question
    );
    qElement.append(question);

    let radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    let radioList = $("<ul>");
    let item;
    let input = "";
    for (let i = 0; i < questions[index].choices.length; i++) {
      item = $("<li>");
      input = '<input type="radio" name="answer" value=' + i + " />";
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function () {
      $("#question").remove();

      if (questionCounter < questions.length) {
        let nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!isNaN(selections[questionCounter])) {
          $("input[value=" + selections[questionCounter] + "]").prop(
            "checked",
            true
          );
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $("#prev").show();
        } else if (questionCounter === 0) {
          $("#prev").hide();
          $("#next").show();
        }
      } else {
        let scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $("#next").hide();
        $("#prev").hide();
        $("#start").show();
      }
    });
  }

  //Menghitung skor dan mengembalikan elemen paragraf untuk ditampilkan
  function displayScore() {
    let score = $("<p>", { id: "question" });

    let numCorrect = 0;
    for (let i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    let tquestion = questions.length;
    let scoreH = (100 / tquestion) * numCorrect;

    score.append(
      "Kamu Benar " +
        numCorrect +
        " dari " +
        questions.length +
        " Pertanyaan" +
        ", Kamu mendapat Nilai :"
    );
    score.append(
      '<h1 class="text-center" style="color:red;"><b>' + scoreH + "</b></h1>"
    );
    return score;
  }
})();
