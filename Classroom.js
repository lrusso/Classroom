var classroom_lastCurrentTime = -1;
var classroom_audioSeekMaxUpdate = false;

try
	{
	// GETTING ALL THE OBJECTS THAT MUST HAVE A FADE IN EFFECT
	var classroom_resources_array = document.getElementsByClassName("classroom_resource");

	// REVERSING THE TIME EVENT ARRAY
	var classroom_events_array = classroom_events.reverse();

	// SETTING THAT THE MAX AUDIO SEEK CONTROL WASN'T UPDATED YET
	classroom_audioSeekMaxUpdate = false;

	// CREATING THE AUDIO ELEMENT THAT WILL BE PLAYING THE MP3 FILE DURING THE CLASS
	parent.currentSlideAudio.src = classroom_audio_path;

	// SETTING WHAT WILL HAPPEN WHEN WHILE THE AUDIO IS PLAYING
	parent.currentSlideAudio.addEventListener("timeupdate",function()
		{
		// UPDATING THE AUDIO TIMER LABEL
		updateTimer();

		// CHECKING IF THE CURRENT TIME OF THE AUDIO IS 0
		if (parent.currentSlideAudio.currentTime==0)
			{
			// HIDING ALL THE OBJECT THAT MUST HAVE A FADE IN EFFECT
			for (var i=0;i<classroom_resources_array.length;i++)
				{
				try
					{
					classroom_resources_array[i].classList.add("classroom_resource_hidden");
					classroom_resources_array[i].classList.remove("classroom_resource_animation_visible");
					}
					catch(err)
					{
					}
				}
			}
			else
			{
			// CREATING THE VARIABLE THAT WILL CONTAIN THE ARRAY INDEX OF THE LAST ELEMENT THAT WAS DISPLAYED
			var classroom_location_latest = null;

			// CHECKING EVERY CLASSROOM FADE IN EVENT
			for (var i=0;i<classroom_events_array.length;i++)
				{
				// CHECKING IF THE CURRENT TIME OF THE AUDIO IS GREATER THAN THE TIME OF AN SPECIFIC FADE IN EVENT
				if (parent.currentSlideAudio.currentTime>classroom_events_array[i])
					{
					// CHECKING IF THE VARIABLE FOR THE LAST ELEMENT WAS USED
					if (classroom_location_latest==null)
						{
						// SETTING THE ARRAY INDEX OF THE LAST ELEMENT THAT WILL BE DISPLAYED
						classroom_location_latest = classroom_events_array.length - i - 1;

						// SHOWING THE ELEMENT AT THE LATEST LOCATION
						try
							{
							classroom_resources_array[classroom_location_latest].classList.add("classroom_resource_animation_visible");
							classroom_resources_array[classroom_location_latest].classList.remove("classroom_resource_hidden");
							}
							catch(err)
							{
							}
						}
					}
				}

			// CHECKING IF AN ELEMENT WAS DISPLAYED
			if (classroom_location_latest!=null)
				{
				for (var i=0;i<classroom_events_array.length;i++)
					{
					try
						{
						if (i>=classroom_location_latest+1)
							{
							// HIDING ALL ELEMENTS AFTER THE LATEST LOCATION
							classroom_resources_array[i].classList.add("classroom_resource_hidden");
							classroom_resources_array[i].classList.remove("classroom_resource_animation_visible");
							}
						else if (i<classroom_location_latest)
							{
							// SHOWING ALL ELEMENTS AFTER THE LATEST LOCATION
							classroom_resources_array[i].classList.add("classroom_resource_animation_visible");
							classroom_resources_array[i].classList.remove("classroom_resource_hidden");
							}
						}
						catch(err)
						{
						}
					}
				}
			}
		});
	}
	catch(err)
	{
	}

try
	{
	// CREATING AND SETTING THE INITIAL TEST RESULT
	var classroom_result = 0;

	// CHECKING IF THE CLASSROOM HAS AN ARRAY WITH QUESTIONS.
	// IF IT DOES, IT MEANS THAT CLASS IS ACTUALLY A TEST FOR THE STUDENT.
	if (classroom_questions_array)
		{
		// INSERTING THE FIRST QUESTION
		insertQuestionAt(0);
		}
	}
	catch(err)
	{
	}

function audioRewind()
	{
	try
		{
		parent.currentSlideAudio.currentTime = parent.currentSlideAudio.currentTime - 2;
		}
		catch(err)
		{
		}
	}


function audioForward()
	{
	try
		{
		parent.currentSlideAudio.currentTime = parent.currentSlideAudio.currentTime + 2
		}
		catch(err)
		{
		}
	}

function seekTo(a)
	{
	try
		{
		// UPDATING THE AUDIO CURREN TIME TO THE SELECTED TIME VALUE
		parent.currentSlideAudio.currentTime = a;
		}
		catch(err)
		{
		}
	}

function toTimeString(seconds)
	{
	try
		{
		return(new Date(seconds*1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
		}
		catch(err)
		{
		return "00:00:00";
		}
	}

function updateTimer()
	{
	try
		{
		// UPDATING THE CURRENT TIME LABEL
		parent.document.getElementsByClassName("classroom_currenttime")[0].innerHTML = toTimeString(parent.currentSlideAudio.currentTime);

		// UPDATING THE DURATION TIME LABEL
		parent.document.getElementsByClassName("classroom_duration")[0].innerHTML = toTimeString(parent.currentSlideAudio.duration);

		// CHECKING IF THE MAX AUDIO SEEK CONTROL WASN'T UPDATED YET
		if (classroom_audioSeekMaxUpdate==false)
			{
			// CHECKING IF THE AUDIO HAS A DURATION VALUE
			if (Number.isNaN(parent.currentSlideAudio.duration)==false)
				{
				// SETTING THE AUDIO DURATION IN THE SEEKER
				parent.updateSeekerMax(parent.currentSlideAudio.duration);

				// SETTING THAT THE MAX AUDIO SEEK CONTROL WAS UPDATED
				classroom_audioSeekMaxUpdate = true;
				}
			}

		// CHECKING IF AT LEAST ONE SECOND PASSED SINCE THE LAST SEEK UPDATE
		if (parent.currentSlideAudio.currentTime+1000>classroom_lastCurrentTime)
			{
			// UPDATING THE SEEK CONTROL
			parent.updateSeekerValue(parent.currentSlideAudio.currentTime);

			// UPDATING THE LAST CURRENT TIME VALUE
			classroom_lastCurrentTime = parent.currentSlideAudio.currentTime;
			}
		}
		catch(err)
		{
		}
	}

function insertQuestionAt(arrayIndex)
	{
	try
		{
		// CHECKING IF THERE IS A PENDING QUESTION TO BE DISPLAYED
		if (arrayIndex<classroom_questions_array.length)
			{
			// CREATING A VARIABLE AND GETTING WITH THE ARRAY VALUE
			var classroom_question = classroom_questions_array[arrayIndex];

			// CREATING VARIABLES AND GETTING ALL THE DATA FROM THE QUESTION VARIABLE
			var classroom_question_text_question = classroom_question[0]; // THE QUESTION - EX: THIS IS A TEST?
			var classroom_question_text_answer1 = classroom_question[1];  // POSSIBLE ANSWER 1 - EX: YES
			var classroom_question_text_answer2 = classroom_question[2];  // POSSIBLE ANSWER 2 - EX: NO
			var classroom_question_text_answer3 = classroom_question[3];  // POSSIBLE ANSWER 3 - EX: MAYBE
			var classroom_question_text_correct = classroom_question[4];  // CORRECT ANSWER - EX: 1

			// INSERTING THE QUESTION
			insertQuestion(arrayIndex,"classroom_questions",classroom_question[0],classroom_question[1],classroom_question[2],classroom_question[3],classroom_question[4]);
			}
			else
			{
			// CREATING A VARIABLE AND GETTING THE TEST RESULT (THE PERCENTAGE OF CORRECT ANSWERS)
			var classroom_result_percentage = Math.floor(classroom_result * 100 / classroom_questions_array.length);

			// CREATING THE CONTAINER FOR THE TEST RESULT
			var classroom_result_label = document.createElement("div");
			classroom_result_label.className = "classroom_result_label classroom_question_fadein";

			// CHECKING IF THE TEST RESULT IF GREATER THAN 60, THE STUDENT PASSED THE TEST AND THE RESULT WILL BE IN GREEN, OTHERWISE, IN RED.
			if (classroom_result_percentage>=60)
				{
				classroom_result_label.innerHTML = classroom_questions_result_text + " <span style='color:green'>" + classroom_result_percentage + " " + classroom_questions_result_pointsof + " 100</span>.";
				}
				else
				{
				classroom_result_label.innerHTML = classroom_questions_result_text + " <span style='color:red'>" + classroom_result_percentage + " " + classroom_questions_result_pointsof + " 100</span>.";
				}

			// WAITING A SECOND
			setTimeout(function()
				{
				// ADDING THE TEST RESULT TO THE WEB DOCUMENT
				document.getElementById("classroom_questions").appendChild(classroom_result_label);

				// SCROLLING DOWN
				window.scrollTo(0,document.body.scrollHeight);
				}, 1000);
			}
		}
		catch(err)
		{
		}
	}

function insertQuestion(arrayIndex, containerID, question,answer1,answer2,answer3,answervalid)
	{
	try
		{
		// CREATING THE MAIN CONTAINER
		var classroom_question_container = document.createElement("div");
		classroom_question_container.className = "classroom_question_container classroom_question_fadein";

		// CREATING THE CONTAINER FOR THE QUESTION
		var classroom_question_question = document.createElement("div");
		classroom_question_question.className = "classroom_question_question";
		classroom_question_question.innerHTML = question;
		classroom_question_container.appendChild(classroom_question_question);

		// CREATING THE CONTAINER FOR THE ANSWER 1
		var classroom_question_answer1 = document.createElement("a");
		classroom_question_answer1.className = "classroom_question_answer";
		classroom_question_answer1.href = "javascript:void(0)";
		classroom_question_answer1.innerHTML = answer1;

		// SETTING WHAT WILL HAPPEN WHEN THE STUDENT CLICKS ON THE ANSWER BUTTON
		classroom_question_answer1.onclick = function()
			{
			// CHECKING IF THE ANSWER BUTTON CAN BE CLICKEABLE BY CHECKING IF IT HAS A TAG. IF THERE ISN'T A TAG, IS CLICKEABLE.
			if (!classroom_question_answer1.tag)
				{
				// CHECKING IF THE ANSWER IS VALID
				if (answervalid==1)
					{
					// SELECTING THE ANSWER 1 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer1.style.backgroundColor = "#3D8B37";
					classroom_question_answer1.style.color  = "white";

					// SHOWING THE 'CORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_correct";
					classroom_question_status.innerHTML = classroom_questions_correct;

					// ADDING ONE POINT TO THE TEST RESULT
					classroom_result = classroom_result + 1;
					}
				else if (answervalid==2)
					{
					// SELECTING THE ANSWER 1 AS INCORRECT (RED BACKGROUND AND WHITE TEXT)
					classroom_question_answer1.style.backgroundColor = "#b22222";
					classroom_question_answer1.style.color  = "white";

					// SELECTING THE ANSWER 2 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer2.style.backgroundColor = "#3D8B37";
					classroom_question_answer2.style.color  = "white";

					// SHOWING THE 'INCORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				else if (answervalid==3)
					{
					// SELECTING THE ANSWER 1 AS INCORRECT (RED BACKGROUND AND WHITE TEXT)
					classroom_question_answer1.style.backgroundColor = "#b22222";
					classroom_question_answer1.style.color  = "white";

					// SELECTING THE ANSWER 3 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer3.style.backgroundColor = "#3D8B37";
					classroom_question_answer3.style.color  = "white";

					// SHOWING THE 'INCORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}

				// SETTING THAT THE ANSWERS FOR THIS QUESTION ARE NOT LONGER CLICKEABLES
				classroom_question_answer1.tag = "answered";
				classroom_question_answer2.tag = "answered";
				classroom_question_answer3.tag = "answered";

				// INSERTING THE NEXT QUESTION
				insertQuestionAt(arrayIndex+1);
				}
			};

		// CHECKING IF ANSWER HAS A TEXT
		if (answer1!="")
			{
			classroom_question_container.appendChild(classroom_question_answer1);
			}

		// CREATING THE CONTAINER FOR THE ANSWER 2
		var classroom_question_answer2 = document.createElement("a");
		classroom_question_answer2.className = "classroom_question_answer";
		classroom_question_answer2.href = "javascript:void(0)";
		classroom_question_answer2.innerHTML = answer2;

		// SETTING WHAT WILL HAPPEN WHEN THE STUDENT CLICKS ON THE ANSWER BUTTON
		classroom_question_answer2.onclick = function()
			{
			// CHECKING IF THE ANSWER BUTTON CAN BE CLICKEABLE BY CHECKING IF IT HAS A TAG. IF THERE ISN'T A TAG, IS CLICKEABLE.
			if (!classroom_question_answer2.tag)
				{
				if (answervalid==1)
					{
					// SELECTING THE ANSWER 1 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer1.style.backgroundColor = "#3D8B37";
					classroom_question_answer1.style.color  = "white";

					// SELECTING THE ANSWER 2 AS INCORRECT (RED BACKGROUND AND WHITE TEXT)
					classroom_question_answer2.style.backgroundColor = "#b22222";
					classroom_question_answer2.style.color  = "white";

					// SHOWING THE 'INCORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				else if (answervalid==2)
					{
					// SELECTING THE ANSWER 2 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer2.style.backgroundColor = "#3D8B37";
					classroom_question_answer2.style.color  = "white";

					// SHOWING THE 'CORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_correct";
					classroom_question_status.innerHTML = classroom_questions_correct;

					// ADDING ONE POINT TO THE TEST RESULT
					classroom_result = classroom_result + 1;
					}
				else if (answervalid==3)
					{
					// SELECTING THE ANSWER 2 AS INCORRECT (RED BACKGROUND AND WHITE TEXT)
					classroom_question_answer2.style.backgroundColor = "#b22222";
					classroom_question_answer2.style.color  = "white";

					// SELECTING THE ANSWER 3 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer3.style.backgroundColor = "#3D8B37";
					classroom_question_answer3.style.color  = "white";

					// SHOWING THE 'INCORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}

				// SETTING THAT THE ANSWERS FOR THIS QUESTION ARE NOT LONGER CLICKEABLES
				classroom_question_answer1.tag = "answered";
				classroom_question_answer2.tag = "answered";
				classroom_question_answer3.tag = "answered";

				// INSERTING THE NEXT QUESTION
				insertQuestionAt(arrayIndex+1);
				}
			};

		// CHECKING IF ANSWER HAS A TEXT
		if (answer2!="")
			{
			classroom_question_container.appendChild(classroom_question_answer2);
			}

		// CREATING THE CONTAINER FOR THE ANSWER 3
		var classroom_question_answer3 = document.createElement("a");
		classroom_question_answer3.className = "classroom_question_answer";
		classroom_question_answer3.href = "javascript:void(0)";
		classroom_question_answer3.innerHTML = answer3;

		// SETTING WHAT WILL HAPPEN WHEN THE STUDENT CLICKS ON THE ANSWER BUTTON
		classroom_question_answer3.onclick = function()
			{
			// CHECKING IF THE ANSWER BUTTON CAN BE CLICKEABLE BY CHECKING IF IT HAS A TAG. IF THERE ISN'T A TAG, IS CLICKEABLE.
			if (!classroom_question_answer3.tag)
				{
				if (answervalid==1)
					{
					// SELECTING THE ANSWER 1 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer1.style.backgroundColor = "#3D8B37";
					classroom_question_answer1.style.color  = "white";

					// SELECTING THE ANSWER 3 AS INCORRECT (RED BACKGROUND AND WHITE TEXT)
					classroom_question_answer3.style.backgroundColor = "#b22222";
					classroom_question_answer3.style.color  = "white";

					// SHOWING THE 'INCORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				else if (answervalid==2)
					{
					// SELECTING THE ANSWER 2 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer2.style.backgroundColor = "#3D8B37";
					classroom_question_answer2.style.color  = "white";

					// SELECTING THE ANSWER 3 AS INCORRECT (RED BACKGROUND AND WHITE TEXT)
					classroom_question_answer3.style.backgroundColor = "#b22222";
					classroom_question_answer3.style.color  = "white";

					// SHOWING THE 'INCORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				else if (answervalid==3)
					{
					// SELECTING THE ANSWER 3 AS CORRECT (GREEN BACKGROUND AND WHITE TEXT)
					classroom_question_answer3.style.backgroundColor = "#3D8B37";
					classroom_question_answer3.style.color  = "white";

					// SHOWING THE 'CORRECT' LABEL RIGHT NEXT TO THE ANSWERS
					classroom_question_status.className = "classroom_question_status_correct";
					classroom_question_status.innerHTML = classroom_questions_correct;

					// ADDING ONE POINT TO THE TEST RESULT
					classroom_result = classroom_result + 1;
					}

				// SETTING THAT THE ANSWERS FOR THIS QUESTION ARE NOT LONGER CLICKEABLES
				classroom_question_answer1.tag = "answered";
				classroom_question_answer2.tag = "answered";
				classroom_question_answer3.tag = "answered";

				// INSERTING THE NEXT QUESTION
				insertQuestionAt(arrayIndex+1);
				}
			};

		// CHECKING IF ANSWER HAS A TEXT
		if (answer3!="")
			{
			classroom_question_container.appendChild(classroom_question_answer3);
			}

		// CREATING AND ADDING THE CONTAINER FOR THE ANSWER RESULT
		var classroom_question_status = document.createElement("div");
		classroom_question_container.appendChild(classroom_question_status);

		// WAITING A SECOND
		setTimeout(function()
			{
			// ADDING THE QUESTION TO THE WEB DOCUMENT
			document.getElementById(containerID).appendChild(classroom_question_container);

			// SCROLLING DOWN
			window.scrollTo(0,document.body.scrollHeight);
			}, 1000);
		}
		catch(err)
		{
		}
	}

document.addEventListener("keydown", function(event)
	{
	try
		{
		// KEY LEFT
		if(event.keyCode == 37)
			{
			audioRewind();
			}
		// KEY RIGHT
		else if(event.keyCode == 39)
			{
			audioForward();
			}
		// KEY SPACE
		else if(event.keyCode == 32)
			{
			parent.audioPauseResume();
			}
		// KEY ESCAPE
		else if(event.keyCode == 27)
			{
			parent.goBack();
			}
		}
	catch(err)
		{
		}
	});

window.addEventListener("load", function()
	{
	// WHEN THE WEB PAGE IS LOADED, THE 'LOADING CLASS' SIGN WILL BE HIDDEN
	try
		{
		parent.hidePleaseWait();
		}
		catch(err)
		{
		}

	// WHEN THE WEB PAGE IS LOADED, THE AUDIO FILE WILL PLAY
	try
		{
		// RESETTING THE LAST CURRENT TIME
		classroom_lastCurrentTime = -1;

		// CHECKING IF AN AUDIO FILE MUST BE PLAYED
		if (classroom_audio_path !== undefined)
			{
			// PLAYING THE AUDIO
			parent.currentSlideAudio.play();
			}
		}
		catch(err)
		{
		console.log(err)
		}

	// WHEN THE AUDIO FILE ENDS, THE USER WILL BE REDIRECTED TO THE BOARD
	try
		{
		parent.currentSlideAudio.onended = function()
			{
			setTimeout(function()
				{
				parent.goBack();
				},1500)
			};
		}
		catch(err)
		{
		}

	document.addEventListener("click",parent.goBackButtonResetIncrement,false);
	document.addEventListener("dblclick",parent.goBackButtonResetIncrement,false);
	document.addEventListener("mousemove",parent.goBackButtonResetIncrement,false);
	document.addEventListener("touchstart",parent.goBackButtonResetIncrement,false);
	});