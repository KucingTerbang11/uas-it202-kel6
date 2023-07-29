//  Nama  : Achmad Dwi Prasetyo
//  NIM   : 220401010168
//  Kelas : IT202
//  Kel   : 6
//  Prodi : Pemograman Web 1

(function() {
    var questions = [{ //Soal 1
      question: "Berapa hasil 2 x 5 =", //Penulisan soal
      choices: [2, 5, 10, 15, 20], //Array pilihan jawaban 
      correctAnswer: 2 //Pilihan array jawaban yang benar
    }, { //Soal 2
      question: "Berapa hasil 3 x 6 =", ///Penulisan soal
      choices: [3, 6, 9, 12, 18], //Array pilihan jawaban
      correctAnswer: 4 //Pilihan array jawaban yang benar
    }, { //Soal 3
      question: "Berapa Hasil dari 8 x 9 =", //Penulisan soal
      choices: [72, 99, 108, 134, 156], //Array pilihan jawaban
      correctAnswer: 0 //Pilihan array jawaban yang benar
    }, { //Soal 4
      question: "Berapa Hasil dari (1 x 7 + 1) =", //Penulisan soal
      choices: [4, 5, 6, 7, 8], //Array pilihan jawaban
      correctAnswer: 4
    }, { //Soal 5
      question: "Berapa Hasil 8 x 8 = ", //Penulisan soal
      choices: [20, 30, 40, 50, 64], //Array pilihan jawaban
      correctAnswer: 4 //Pilihan array jawaban yang benar
    }];
    
    var questionCounter = 0; //Melacak No Soal
    var selections = []; //Array yang berisi pilihan pengguna
    var quiz = $('#quiz'); //Objek id div quiz
    
    //Tampilkan pertanyaan awal
    displayNext();
    
    //Klik penangan untuk tombol 'Next'
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2 class="text-center"><b>Soal ke ' + (index + 1) + ' :</b></h2>');
      qElement.append(header);
      
      var question = $('<p class="text-center">').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
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
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    //Menghitung skor dan mengembalikan elemen paragraf untuk ditampilkan
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      var tquestion = questions.length;
      var scoreH = (100/tquestion) * numCorrect;

      score.append('Kamu Benar ' + numCorrect + ' dari ' +
                   questions.length + ' Pertanyaan' + ', Kamu mendapat Nilai :');
      score.append('<h1 class="text-center" style="color:red;"><b>' + scoreH + '</b></h1>');
      return score;
    }
  })();