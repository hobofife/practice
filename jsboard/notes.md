-- Thu Oct 16 21:27:01 CDT 2014 --

Committing this now in case I want to come back to anything here, but I'm going to change the approach to this now. 

I was thinking that since the program is just supposed to display games that I didn't need to track the game in anyway separate from the actual divs making up the board. But now thinking about animating pieces I think it'd be better to have a list of coordinates for the squares, instead of just calculating the coordinates as I place the divs. Right now the pieces are in a child node of each square, but that's not good if I want to animate them across squares.

Also, I might have to figure out a better way to do the piece images. I'm using the unicode for the pieces now which is cool because I didn't have to look for or create graphics, and I can resize the pieces easily by setting the font size for the div. The problem is that I'd like slightly better graphics (an outline would be nice) and I don't like how you can highlight pieces like text. Eventually it would be good if players could grab and move the pieces, instead of having the cursor change into a text input cursor when hovering over the pieces. 

So what I'm going to do now is create a board object to hold properties like square sizes and offsets, and then I can draw the squares and pieces at the same level of the DOM hierarchy and freely move the pieces around the screen.

--

So what does the board assoc array need?

width, height, top, left, squaresize, 
a1:{left:, top:, piece:DOM Element of piece}

-- Fri Oct 17 09:17:54 CDT 2014 --

Ok, now that I have nice ways of placing pieces with setPiece, movePiece, etc, it's time to start parsing PGN.

Nope! First I need some testing.

`movePiece('e5', 'c6')` (with a knight on each square) fails. It moves the white knight to c7 and remove both black pieces from the board. When I move it manually with $().animate({top:,left:}) it works fine.

I need to test that I'm producing the correct "-=" kind of string for different movements. I don't know how the black king could be disappearing though.

-----

Huh, it is only moving to the c6 square that causes problems... And apparently only when there is already a piece on c6?

Nope the problem is not the square, it is when I take the black knight, it happens on a6 to. The white knight is placed one square above where it should be, and both black pieces disappear. But taking the black king, everything works like it should. What is different about the code placing the knight?

And when the black knight takes the white knight, the black king disappears, but the knight does land on the correct square.

Commenting out `removePiece` seems to solve the problem, I wonder what those three lines of code could be messing up? Instead of removing the child node, I'll just log the node to the console to see what's happening.

This must be a relative positioning thing, that's what I suspected. Removing a piece from the edge of the board is fine, but other squares shift things around.

*Setting `position:absolute;` for the squares and pieces fixed everything.


-- Mon Oct 20 08:30:21 CDT 2014 --

Uses SVG pieces now. Next thing is to make it read FEN and setup the board from that. Actually, no. Next I want to make draggable pieces snap to a square position when dropped and `movePiece()` to that square.

--

I need to change the movePiece animation... it currently calculates relative movement based on square positions, which isn't helpful if I've clicked and moved the image for the piece.

Cool, that was easy.

--

Now, FEN.

--

Word. So one bug that I've been watching for a minute now is that pieces can capture themselves. I'll deal with that later, for now I want to add features for setting up the board through the UI.

1. place new pieces on the board
2. remove pieces from board
3. export position to FEN

--

Ok, so I have a box that holds extra pieces drawn on the side of the board (I anticipate options on how to draw the box). I have separate draggable callbacks to handle adding new pieces. I modified most of the orignal functions for drawing squares and pieces to let me pass in a object containing squares, where before I was just using the global `board` object. So whatever I can do to the chessboard, I can also do to the pieces box. Now I need some code to get the 'from' square when pulling a new piece out of the box, but I don't really feel like doing that just yet, so I'm gonna stop here for now and come back to it later.