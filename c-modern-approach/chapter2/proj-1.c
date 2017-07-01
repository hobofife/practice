/**********************************************************************/
/* Write a program that uses printf to display the following picture: */
/*                                                                    */
/*                                                                    */
/*         *                                                          */
/*        *                                                           */
/*       *                                                            */
/* *    *                                                             */
/*   * *                                                              */
/*    *                                                               */
/**********************************************************************/




#include <stdio.h>

int main(void)
{
  int columns = 9, rows = 6, iter_cols, iter_rows, iter_spaces;
  int image_coords_by_row[6][9] = { {9}, {8}, {7}, {1, 5}, {3,2}, {4} };
  
  for (iter_rows = 0; iter_rows < rows; iter_rows++){
    for (iter_cols = 0; iter_cols < columns; iter_cols++){
      if (image_coords_by_row[iter_rows][iter_cols] > 0){
        for (iter_spaces = 0; iter_spaces < image_coords_by_row[iter_rows][iter_cols] - 1; iter_spaces++) {
          printf(" ");
        }
        printf("*");
      }
    }
    printf("\n");
  }
  return 0;
}
