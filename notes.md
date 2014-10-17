-- Thu Oct 16 21:27:01 CDT 2014 --

Committing this now in case I want to come back to anything here, but I'm going to change the approach to this now. 

I was thinking that since the program is just supposed to display games that I didn't need to track the game in anyway separate from the actual divs making up the board. But now thinking about animating pieces I think it'd be better to have a list of coordinates for the squares, instead of just calculating the coordinates as I place the divs. Right now the pieces are in a child node of each square, but that's not good if I want to animate them across squares.

Also, I might have to figure out a better way to do the piece images. I'm using the unicode for the pieces now which is cool because I didn't have to look for or create graphics, and I can resize the pieces easily by setting the font size for the div. The problem is that I'd like slightly better graphics (an outline would be nice) and I don't like how you can highlight pieces like text. Eventually it would be good if players could grab and move the pieces, instead of having the cursor change into a text input cursor when hovering over the pieces. 

So what I'm going to do now is create a board object to hold properties like square sizes and offsets, and then I can draw the squares and pieces at the same level of the DOM hierarchy and freely move the pieces around the screen.