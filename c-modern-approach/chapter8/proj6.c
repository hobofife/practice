 /****************************************************************/
 /* Write a B1FF filter:                                         */
 /*   - Convert to upper-case letters                            */
 /*   - Subsitute A -> 4, B -> 8, E -> 3, I -> 1, O -> 0, S -> 5 */
 /*   - Append a bunch of exclamation marks                      */
 /****************************************************************/

#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_EXCLAMS 8
#define MSG_LENGTH 256
#define NUM_SUBS ((int) (sizeof(substitutes) / sizeof(substitutes[0])))

int main(void)
{
  int i, j, input_length = 0, sub;
  const char substitutes[] = {[4] = 'A', [8] = 'B', [3] = 'E', [1] = 'I', [0] = 'O', [5] = 'S' };
  char input;
  char msg[MSG_LENGTH] = {0};

  srand((unsigned) time(NULL));
  
  while ((input = getchar()) != '\n' && input_length < MSG_LENGTH) {
    msg[input_length] = input;
    input_length++;
  }
  
  for (i = 0; i < MSG_LENGTH; i++) {
    sub = -1;
    if (msg[i] != 0) {
      for (j = 0; j < NUM_SUBS; j++) {
        if (substitutes[j] == toupper(msg[i])) {
          sub = j;
        }
      }
      if (sub >= 0) {
        printf("%d", sub);
      } else {
        printf("%c", toupper(msg[i]));
      }
    }
  }

  printf("!!!"); // Print at least 3 exclamation marks.
  for (i = 0; i < rand() % MAX_EXCLAMS; i++) {
    printf("!");
  }

  printf("\n");
  
  return 0;
}
