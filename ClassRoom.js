var classroom_resources_array = document.getElementsByClassName("classroom_resource");
var classroom_events_array = classroom_events.reverse();

var classroom_audio = new Audio(classroom_audio_path);
classroom_audio.addEventListener("timeupdate",function()
	{
	updateTimer();

	if (classroom_audio.currentTime<1)
		{
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
		var classroom_location_latest = null;

		for (var i=0;i<classroom_events_array.length;i++)
			{
			if (classroom_audio.currentTime>classroom_events_array[i])
				{
				if (classroom_location_latest==null)
					{
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