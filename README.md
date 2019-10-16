# My Online Classroom

Online Classroom developed in HTML5 and CSS3.

![alt screenshot](https://raw.githubusercontent.com/lrusso/ClassRoom/master/ClassRoom.png)


## Web

https://lrusso.github.io/ClassRoom/ClassRoom.htm

## Video demo

https://www.youtube.com/watch?v=Xn7eAc09GAQ

## How to create your own classroom

In https://github.com/lrusso/ClassRoom/blob/master/ClassRoom_Class01.htm, you will see this two variables:

```
var classroom_events = [1,7,17,24,28];
var classroom_audio_path = "ClassRoom_Class01.mp3";
```

* The **classroom_events** variable is an array that sets how many seconds must pass for the next transition.

* The **classroom_audio_path** variable is the path to the MP3 audio file that has the voice of the teacher giving the class.

* Design your Web page for the classroom using as many HTML elements as you need.

## Handling transitions in your classroom

```
<table>
     <tr>
          <td colspan="2"><span class="classroom_resource classroom_resource_hidden">Introduction</span></td>
     </tr>
     <tr>
          <td><img alt="" class="classroom_resource classroom_resource_hidden" src="data:image/png;base64,iVBOR=="></td>
          <td><img alt="" class="classroom_resource classroom_resource_hidden" src="data:image/png;base64,iVBOR=="></td>
     <tr>
          <td><img alt="" class="classroom_resource classroom_resource_hidden" src="data:image/png;base64,iVBOR=="></td>
          <td><img alt="" class="classroom_resource classroom_resource_hidden" src="data:image/png;base64,iVBOR=="></td>
     </tr>
</table>
```

Every object that has the class **classroom_resource** will be considered for a fade-in transition effect, one by one, according to the order of insertion of those objects in the Web document.

Every object that has the class **classroom_resource_hidden** will be hidden by default.

## Creating a test for your classroom

In https://github.com/lrusso/ClassRoom/blob/master/ClassRoom_Class05.htm, you will see this four variables for text values that are going to used by the platform:

```
var classroom_questions_correct = "CORRECT";
var classroom_questions_incorrect = "INCORRECT";
var classroom_questions_result_text = "YOUR TEST RESULT IS:";
var classroom_questions_result_pointsof = "POINTS OF";
```

You will also see this array, that will contains all the questions and possible answers.

```
var classroom_questions_array = [
				["Question 1 - This is a Test?","Yes","No","Maybe",1],
				["Question 2 - How many available answers do you have now?","1","2","",2],
				["Question 3 - This <b><u><i>formatted text</i></u></b> was designed and inserted by using which technologies?","HTML and CSS","HTML, CSS and JavaScript","PHP & MySQL",2],
				];
```

This is an example of a question:
 
```
["This is my question?","Possible Answer 1","Possible Answer 2","Possible Answer 3", 2]
```

The last value that you see in this example, is a 2, and that means that the correct answer will be the second one.

You can also insert a question with only two possible answers by doing this:

```
["This is a test?","Yes","No","", 1]
```

## Accessibility

This platform has the following technical specifications, in order to be compatible with screen readers:

* Every link to a class is a A element.
* Every button in a test is a A element.
* Every image displayed during classes has a TAG property.

Also, there are some keys that can be used during the classes, in order to provide a compatible experience for the visually impaired:

* Left Key: Rewind class 5 seconds
* Right Key: Forward class 5 seconds
* Space Key: Pause or resume class
* Escape Key: Go back to the board
