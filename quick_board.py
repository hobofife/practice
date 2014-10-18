files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
ranks = ['1', '2', '3', '4', '5', '6', '7', '8']

squares = []

for f in files:
    if f in "aceg": color = 0
    else: color = 1
    for rank in ranks:
        squares.append((f + rank, color%2))
        color += 1
        
js = ""
for square in squares:
    js += "%s:{left:0,top:0,color:%s,piece:null}," % (square[0], square[1])

js = "var board = {" + js + "}"
print js
    
