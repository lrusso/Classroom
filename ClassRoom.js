var classResourcesArray = document.getElementsByClassName("classroom_resource");
var classInvertedArray = classroom_events.reverse();

var classroom_audio = new Audio(classroom_audio_path);
classroom_audio.addEventListener("timeupdate",function()
	{
	updateTimer();

	if (classroom_audio.currentTime<1)
		{
		for (var i=0;i<classResourcesArray.length;i++)
			{
			try
				{
				classResourcesArray[i].classList.add("classroom_resource_hidden");
				classResourcesArray[i].classList.remove("classroom_resource_animation_visible");
				}
				catch(err)
				{
				}
			}
		}
		else
		{
		var latestLocation = null;

		for (var i=0;i<classInvertedArray.length;i++)
			{
			if (classroom_audio.currentTime>classInvertedArray[i])
				{
				if (latestLocation==null)
					{
					latestLocation = classInvertedArray.length - i - 1;

					// SHOWING THE ELEMENT AT THE LATEST LOCATION
					try
						{
						classResourcesArray[latestLocation].classList.add("classroom_resource_animation_visible");
						classResourcesArray[latestLocation].classList.remove("classroom_resource_hidden");
						}
						catch(err)
						{
						}
					}
				}
			}

		if (latestLocation!=null)
			{
			// HIDDING ALL ELEMENTS AFTER THE LATEST LOCATION
			for (var j=latestLocation+1;j<classInvertedArray.length;j++)
				{
				try
					{
					classResourcesArray[j].classList.add("classroom_resource_hidden");
					classResourcesArray[j].classList.remove("classroom_resource_animation_visible");
					}
					catch(err)
					{
					}
				}
			}
		}
	});

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

window.onload = function()
	{
	try
		{
		classroom_audio.play();
		}
		catch(err)
		{
		}

	classroom_audio.onended = function(){setTimeout(function(){parent.goBack()},1500)};
	document.addEventListener("click",parent.goBackButtonResetIncrement,false);
	document.addEventListener("dblclick",parent.goBackButtonResetIncrement,false);
	document.addEventListener("mousemove",parent.goBackButtonResetIncrement,false);
	}