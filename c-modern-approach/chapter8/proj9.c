/* Generate a random walk across a 10x10 array */

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define GRID_SIZE 10
#define LETTERS_SIZE 26
#define DIRECTIONS 4

int main(void)
{
  bool can_move, no_moves = false;
  bool blocked_directions[4];
  int i, j, current_row = 0, current_col = 0, direction, next_row, next_col;
  char grid[GRID_SIZE][GRID_SIZE];
  const char letters[] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                          'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

  // Initialize grid
  for (i = 0; i < GRID_SIZE; i++) {
    for (j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = '.';
    }
  }

  srand((unsigned) time(NULL));
  
  // Travel the grid 0-up, 1-down, 2-left, 3-right
  
  for (i = 0; i < LETTERS_SIZE; i++) {
    // Reset blocked directions
    for (j=0; j < DIRECTIONS; j++) {
      blocked_directions[j] = false;
    }
    
    // Add next letter to the grid
    grid[current_row][current_col] = letters[i];

    // Move to next location
    can_move = false;
    while(!can_move) {
      if (blocked_directions[0] && blocked_directions[1] && blocked_directions[2] && blocked_directions[3]) {
        no_moves = true;
        break;
      }
      
      direction = rand() % DIRECTIONS;
      if (!blocked_directions[direction]) {
        next_row = current_row;
        next_col = current_col;
        switch(direction) {
        case 0:
          next_row = current_row - 1;
          break;
        case 1:
          next_row = current_row + 1;
          break;
        case 2:
          next_col = current_col - 1;
          break;
        case 3:
          next_col = current_col + 1;
          break;
        }
        if (next_row < 0 || next_row > GRID_SIZE -1 || next_col < 0 || next_col > GRID_SIZE -1  ) {
          blocked_directions[direction] = true;
        } else {
          if (grid[next_row][next_col] != '.') {
            blocked_directions[direction] = true;
          } else {
            current_row = next_row;
            current_col = next_col;
            can_move = true;
          }  
        }
      }
    }
    if (no_moves) {
      break;
    }
  }


  // Print grid
  for (i = 0; i < GRID_SIZE; i++) {
    for (j = 0; j < GRID_SIZE; j++) {
      printf(" %c ", grid[i][j]);
    }
    printf("\n");
  }

  return 0;
}
