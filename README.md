# Qiyue-Wang_qwan0249_Creative-coding-major-project
# Personal Code

## Interactions & Changes

My code is mainly through keyboard and mouse to interact, control some keys input some dynamic.

This code is changed from the static code of our group, where we consisted of a white dot in the background and a circle with overlapping loops, which gave us a static pattern element. In my code, I kept the white dots, but increased the divergence of the dots, and added changes to the zoom and position control of the circles, as well as a controllable brush.

## Inspiration
First, the animation was largely continued from the group code, which I took inspiration from the video of Yayoi Kusama's Infinity Mirrored Room. The exhibition was set up in a dark room, where different colors of light would stand out in the dark environment, and reflected through multiple mirrors, making it look like the room was covered in colored starlight.

I therefore decided to remove the white dots on the background in the group code and replace them with colored dots. Additionally, to increase the contrast between the background color of the image and the circle, I changed the background color to a dark purple, which looks relatively dark but not overly rigid like black. Meanwhile, this color can bring more visual appeal and create a feeling of mystery.

### Infinity Mirrored Room
- Screentshot from YouTube video

![Infinity Mirrored Room](readmeImages\Infinity_Mirrored_Room.jpg)
  
[Infinity Mirrored Room Video](https://www.youtube.com/watch?app=desktop&v=vebDk7xQmCw)


But just the above changes are not enough to reflect the effect I want, I think these elements can create a sense of flow if they are moved. I searched for some artwork on the web using flow as a keyword to find a suitable source of inspiration. Some of the drawings created by Gabbi Kitchener gave me great ideas, and I like the long lines drawn in white that show the flow well. I also feel the same way about the artwork created by Tyler Hobbs, who specializes in generative arts using long curves of different colors to create a perfect flow.

I thus recalled the trace an ellipse we made in the week 10 tutorial, where we made a dot that moves in an elliptical orbit, where the dot leaves a trace of its movement as it moves. I then decided to create something similar in my code, where the dots would follow the noise and leave a trace of their movement, which I thought would be a good representation of the flow I expected.
 

### Examples of flow
- Gabbi Kitchener 

![Gabbi Kitchener ](readmeImages\Gabbi_Kitchener.jpg)

- Tyler Hobbs

![Unfenced Existence](readmeImages\Unfenced_Existence.jpg)

![Detail from Fragments of Thought D](readmeImages\Detail_from_Fragments_of_Thought_D.jpg)
  

## Technical Explanation
My personal code is created based on the group code.

I first deleted the white dots on the background and changed the background color.

Then, I created a new variable noiseOffset to control the offset of the noise, and created a coloredDots array to save the colored dots.

I also created a new class called ColoredDot, which contains the position, radius and random color of the colored dots. By using the update method to update the position of the dots which changes with the noice.

In both the ColoredCircle and ColoredDot classes, I used the map function to map the noise values from the （0, 1） range to （-2, 2）to make the magnitude of the movement more apparent.

After that, I created new functions updateCirclesPosition and updateDotsPosition, they offset circles and dots by gradually increasing the noise offset. These two functions are called in the draw function.

In the drawCircles function, a for loop is also added to randomly get 100 random x and y positions for colored dots.

In the drawBackground function, I add an alpha value to the background so that all elements can leave trails as they move.