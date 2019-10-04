# My Online Classroom

Online Classroom developed in HTML5 and CSS3.

![alt screenshot](https://raw.githubusercontent.com/lrusso/ClassRoom/master/ClassRoom.png)


## Web

https://lrusso.github.io/ClassRoom/ClassRoom.htm

## Video demo

https://www.youtube.com/watch?v=WNGvmvJ_Q60

## How to create your own classroom

In https://github.com/lrusso/ClassRoom/blob/master/ClassRoom_Class01.htm, you will see this two variables:

```
var classroom_events = [1,7,17,24,28];
var classroom_audio_path = "ClassRoom_Class01.mp3";
```

* The **classroom_events** variable is an array that sets how many seconds must pass for the next transition.

* The **classroom_audio_path** variable is the path to the MP3 audio file that has the voice of the teacher giving the class.

* Design your Web page for the classroom using as many HTML elements as you need.

## Handling transitions

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
