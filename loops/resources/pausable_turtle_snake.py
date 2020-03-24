import turtle
import random

paused = True

def keyspace():
    global paused
    if paused:
        paused = False
        main()
    else:
        paused = True
        

def keyright():
    ''' what to do if we get a left keypress '''
    little_green_turtle.right(90)

def keyleft():
    ''' what to do if we get a right keypress '''
    little_green_turtle.left(90)

def eatfood(): # TODO
    ''' check if the turtle has eaten food.
        returns True if the turtle intersects food.
        returns False if not '''
    return False

def hitedge(): # TODO
    ''' check if the turtle has hit the edge.
        returns True if the turtle has hit the edge
        returns False if not '''
    return False

def main():
    ''' one "step" of the program '''
    global paused
    if not paused:
        little_green_turtle.forward(10)
        if hitedge(): # TODO
            # What happens if the turtle hits an edge?
            pass
        if eatfood(): # TODO
            # What happens if the turtle eats food?
            pass
        turtle.ontimer(main, 100) # <---- EVENT LOOP STUFF



width, height = turtle.screensize()


##### Set up the turtle
little_green_turtle = turtle.Turtle()
little_green_turtle.color("green")
little_green_turtle.shape("turtle")
little_green_turtle.speed(0)
little_green_turtle.pen(pendown=False)


##### Set up the food
food = turtle.Turtle()
food.color("red")
food.shape("circle")
food.shapesize(0.5)
food.speed(0)
food.pen(pendown=False)
# put the food at a random location
food.goto(random.randint(0,width), random.randint(0,height))


##### Keybinding
turtle.listen() # <---- EVENT LOOP STUFF
turtle.onkeypress(keyright, "Right") # <---- EVENT LOOP STUFF
turtle.onkeypress(keyleft, "Left") # <---- EVENT LOOP STUFF
turtle.onkeypress(keyspace, "space") # <---- EVENT LOOP STUFF


##### Start the game
main()
turtle.mainloop() # <---- EVENT LOOP STUFF
