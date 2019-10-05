try
	{
	// GETTING ALL THE OBJECTS THAT MUST HAVE A FADE IN EFFECT
	var classroom_resources_array = document.getElementsByClassName("classroom_resource");

	// REVERSING THE TIME EVENT ARRAY
	var classroom_events_array = classroom_events.reverse();

	// CREATING THE AUDIO ELEMENT THAT WILL BE PLAYING THE MP3 FILE DURING THE CLASS
	var classroom_audio = new Audio(classroom_audio_path);

	// SETTING WHAT WILL HAPPEN WHEN WHILE THE AUDIO IS PLAYING
	classroom_audio.addEventListener("timeupdate",function()
		{
		// UPDATING THE AUDIO TIMER LABEL
		updateTimer();

		// CHECKING IF THE CURRENT TIME OF THE AUDIO IS LESS THAN 1
		if (classroom_audio.currentTime<1)
			{
			// HIDDING ALL THE OBJECT THAT MUST HAVE A FADE IN EFFECT
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
				if (classroom_audio.currentTime>classroom_events_array[i])
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

			if (classroom_location_latest!=null)
				{
				// HIDDING ALL ELEMENTS AFTER THE LATEST LOCATION
				for (var j=classroom_location_latest+1;j<classroom_events_array.length;j++)
					{
					try
						{
						classroom_resources_array[j].classList.add("classroom_resource_hidden");
						classroom_resources_array[j].classList.remove("classroom_resource_animation_visible");
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
	var classroom_result = 0;

	if (classroom_questions_array)
		{
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
		classroom_audio.currentTime = classroom_audio.currentTime - 2;
		}
		catch(err)
		{
		}
	}

function audioForward()
	{
	try
		{
		classroom_audio.currentTime = classroom_audio.currentTime + 2
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
		parent.document.getElementsByClassName("classroom_timer")[0].innerHTML = toTimeString(classroom_audio.currentTime) + "/" + toTimeString(classroom_audio.duration);
		}
		catch(err)
		{
		}
	}

function insertQuestionAt(arrayIndex)
	{
	try
		{
		if (arrayIndex<classroom_questions_array.length)
			{
			var classroom_question = classroom_questions_array[arrayIndex];
			insertQuestion(arrayIndex,"classroom_questions",classroom_question[0],classroom_question[1],classroom_question[2],classroom_question[3],classroom_question[4]);
			}
			else
			{
			var classroom_result_percentage = Math.floor(classroom_result * 100 / classroom_questions_array.length);
			var classroom_result_label = document.createElement("div");
			classroom_result_label.className = "classroom_result_label classroom_question_fadein";
			if (classroom_result_percentage>=60)
				{
				classroom_result_label.innerHTML = classroom_questions_result_text + " <span style='color:green'>" + classroom_result_percentage + " " + classroom_questions_result_pointsof + " 100</span>.";
				}
				else
				{
				classroom_result_label.innerHTML = classroom_questions_result_text + " <span style='color:red'>" + classroom_result_percentage + " " + classroom_questions_result_pointsof + " 100</span>.";
				}

			setTimeout(function()
				{
				document.getElementById("classroom_questions").appendChild(classroom_result_label);
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
		var classroom_question_container = document.createElement("div");
		classroom_question_container.className = "classroom_question_container classroom_question_fadein";

		var classroom_question_question = document.createElement("div");
		classroom_question_question.className = "classroom_question_question";
		classroom_question_question.innerHTML = question;
		classroom_question_container.appendChild(classroom_question_question);

		var classroom_question_answer1 = document.createElement("div");
		classroom_question_answer1.className = "classroom_question_answer";
		classroom_question_answer1.innerHTML = answer1;
		classroom_question_answer1.onclick = function()
			{
			if (!classroom_question_answer1.tag)
				{
				if (answervalid==1)
					{
					classroom_question_answer1.style.backgroundColor = "#3D8B37";
					classroom_question_answer1.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_correct";
					classroom_question_status.innerHTML = classroom_questions_correct;
					classroom_result = classroom_result + 1;
					}
				else if (answervalid==2)
					{
					classroom_question_answer1.style.backgroundColor = "firebrick";
					classroom_question_answer1.style.color  = "white";
					classroom_question_answer2.style.backgroundColor = "#3D8B37";
					classroom_question_answer2.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				else if (answervalid==3)
					{
					classroom_question_answer1.style.backgroundColor = "firebrick";
					classroom_question_answer1.style.color  = "white";
					classroom_question_answer3.style.backgroundColor = "#3D8B37";
					classroom_question_answer3.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				classroom_question_answer1.tag = "answered";
				classroom_question_answer2.tag = "answered";
				classroom_question_answer3.tag = "answered";
				insertQuestionAt(arrayIndex+1);
				}
			};

		if (answer1!="")
			{
			classroom_question_container.appendChild(classroom_question_answer1);
			}

		var classroom_question_answer2 = document.createElement("div");
		classroom_question_answer2.className = "classroom_question_answer";
		classroom_question_answer2.innerHTML = answer2;
		classroom_question_answer2.onclick = function()
			{
			if (!classroom_question_answer2.tag)
				{
				if (answervalid==1)
					{
					classroom_question_answer1.style.backgroundColor = "#3D8B37";
					classroom_question_answer1.style.color  = "white";
					classroom_question_answer2.style.backgroundColor = "firebrick";
					classroom_question_answer2.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				else if (answervalid==2)
					{
					classroom_question_answer2.style.backgroundColor = "#3D8B37";
					classroom_question_answer2.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_correct";
					classroom_question_status.innerHTML = classroom_questions_correct;
					classroom_result = classroom_result + 1;
					}
				else if (answervalid==3)
					{
					classroom_question_answer2.style.backgroundColor = "firebrick";
					classroom_question_answer2.style.color  = "white";
					classroom_question_answer3.style.backgroundColor = "#3D8B37";
					classroom_question_answer3.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				classroom_question_answer1.tag = "answered";
				classroom_question_answer2.tag = "answered";
				classroom_question_answer3.tag = "answered";
				insertQuestionAt(arrayIndex+1);
				}
			};

		if (answer2!="")
			{
			classroom_question_container.appendChild(classroom_question_answer2);
			}

		var classroom_question_answer3 = document.createElement("div");
		classroom_question_answer3.className = "classroom_question_answer";
		classroom_question_answer3.innerHTML = answer3;
		classroom_question_answer3.onclick = function()
			{
			if (!classroom_question_answer3.tag)
				{
				if (answervalid==1)
					{
					classroom_question_answer1.style.backgroundColor = "#3D8B37";
					classroom_question_answer1.style.color  = "white";
					classroom_question_answer3.style.backgroundColor = "firebrick";
					classroom_question_answer3.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				else if (answervalid==2)
					{
					classroom_question_answer2.style.backgroundColor = "#3D8B37";
					classroom_question_answer2.style.color  = "white";
					classroom_question_answer3.style.backgroundColor = "firebrick";
					classroom_question_answer3.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_incorrect";
					classroom_question_status.innerHTML = classroom_questions_incorrect;
					}
				else if (answervalid==3)
					{
					classroom_question_answer3.style.backgroundColor = "#3D8B37";
					classroom_question_answer3.style.color  = "white";
					classroom_question_status.className = "classroom_question_status_correct";
					classroom_question_status.innerHTML = classroom_questions_correct;
					classroom_result = classroom_result + 1;
					}
				classroom_question_answer1.tag = "answered";
				classroom_question_answer2.tag = "answered";
				classroom_question_answer3.tag = "answered";
				insertQuestionAt(arrayIndex+1);
				}
			};

		if (answer3!="")
			{
			classroom_question_container.appendChild(classroom_question_answer3);
			}

		var classroom_question_status = document.createElement("div");
		classroom_question_container.appendChild(classroom_question_status);

		setTimeout(function()
			{
			document.getElementById(containerID).appendChild(classroom_question_container);
			window.scrollTo(0,document.body.scrollHeight);
			}, 1000);
		}
		catch(err)
		{
		}
	}

window.onload = function()
	{
	// WHEN THE WEB PAGE IS LOADED, THE AUDIO FILE WILL PLAY
	try
		{
		classroom_audio.play();
		}
		catch(err)
		{
		}

	// WHEN THE AUDIO FILE ENDS, THE USER WILL BE REDIRECTED TO THE BOARD
	try
		{
		classroom_audio.onended = function()
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
	}