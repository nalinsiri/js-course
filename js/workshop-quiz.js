var index = 0;
var previousLength = 0;
var questionTitle = [];
var selected = [];
var point = 0;

// init tbody as global
var tbody = document.getElementsByTagName('tbody')[0];

// function for showing questions
function showQuestion()
{
    // init questionArea for div=content
    var questionArea = document.getElementsByClassName('question')[0];

    // create question title
    var questionTitle = document.createElement('h2');
    var text = document.createTextNode(quiz.questions[index].title);

    if(index > 0)
    {
        var h2 = document.getElementsByTagName('h2')[0];
        h2.replaceChild(text, h2.childNodes[0]);
        questionArea.replaceChild(h2, questionArea.childNodes[0]);
    }
    else
    {
        questionTitle.appendChild(text);
        questionArea.appendChild(questionTitle);
    }

    for (var j = 0; j < quiz.questions[index].choices.length; j++)
    {
        // create label
        var label = document.createElement('p');

        // create radio button with it's attributes
        var choice = document.createElement('input');
        choice.setAttribute('type', 'radio');
        choice.setAttribute('name', 'q');
        choice.setAttribute('value', quiz.questions[index].choices[j])
        choice.setAttribute('onchange', 'selectAnswer(this.value)');

        // create choice text and tag br
        var choiceText = document.createTextNode(quiz.questions[index].choices[j]);
        var lineBreak = document.createElement('br');



        if(index > 0)
        {
            var label = document.getElementsByTagName('p')[j];
            label.replaceChild(choice, label.childNodes[0]);
            label.replaceChild(choiceText, label.childNodes[1]);
            label.replaceChild(lineBreak, label.childNodes[2]);

            questionArea.replaceChild(label, questionArea.childNodes[j + 1]);
        }
        else
        {
            // append radio button and text to label
            label.appendChild(choice);
            label.appendChild(choiceText);
            label.appendChild(lineBreak);

            // append label to div=question
            questionArea.appendChild(label);
        }
    }

    index++;

    document.getElementsByName('next-question')[0].setAttribute('disabled', true);

    // for last question, there will enable a button to check the taken answers
    if(index == quiz.questions.length)
    {
        // init check button
        var checkButton = document.getElementsByName('check')[0];
        checkButton.setAttribute('class', 'visible box-effects');
        checkButton.setAttribute('disabled', true);
    }
}

// function for selecting question
function selectAnswer(val)
{
    if(val !== '')
    {
        // add selected value to arrays
        selected[index-1] = val;

        // add question title to arrays
        questionTitle[index-1] = quiz.questions[index-1].title;

        if(index !== quiz.questions.length)
        {
            document.getElementsByName('next-question')[0].removeAttribute("disabled");
        }
        else if(index === quiz.questions.length)
        {
            document.getElementsByName('check')[0].removeAttribute('disabled');
        }
    }
}

function resultDetails(index, result)
{
    // create new table row
    var trow = document.createElement('tr');

    // create first column for question
    var tdQuestion = document.createElement('td');
    var txtQuestion = document.createTextNode(questionTitle[index]);
    // append txtQuestion to tdQuestion
    tdQuestion.appendChild(txtQuestion);

    // create second column for the taken answer
    var tdAnswer = document.createElement('td');
    var txtAnswer = document.createTextNode(selected[index]);
    //append txtAnswer to tdAnswer
    tdAnswer.appendChild(txtAnswer);

    // create third column for the results
    var tdResult = document.createElement('td');
    // set class for result column
    tdResult.setAttribute('class', 'h-center');
    var iconResult = document.createElement('i');
    if(result)
    {
        // set class for icon
        iconResult.setAttribute('class', 'fas fa-check');
    }
    else
    {
        // set class for icon
        iconResult.setAttribute('class', 'fas fa-times');
    }

    //append iconResult to tdResult
    tdResult.appendChild(iconResult);

    // append all created columns to table row
    trow.appendChild(tdQuestion);
    trow.appendChild(tdAnswer);
    trow.appendChild(tdResult);

    // append trow to tbody instance
    tbody.appendChild(trow);
}

// function for check the taken answers
function checkAnswers()
{
    // visible the result details table
    document.getElementsByClassName('result-details')[0].removeAttribute('class', 'invisible');
    
    for (var i = 0; i < quiz.questions.length; i++)
    {
        if (selected[i] === quiz.questions[i].correct)
        {
            // add point for this correct answer
            point++;

            resultDetails(i, true);
        }
        else
        {
            resultDetails(i, false);
        }
    }

    // output the user's points
    var pointText = document.createTextNode('You got ' + point + ' point(s) from ' + index + ' question(s)');
    document.getElementById('point').appendChild(pointText);

    // disable the "check answer" button
    document.getElementsByName('check')[0].setAttribute('disabled', true);
}
