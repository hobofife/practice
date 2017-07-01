/*****************************************************/
/* Combining projects 2 & 3                          */
/*                                                   */
/* Compute the volume of a sphere using the formula: */
/*                                                   */
/*   v = (4/3 * PI * r^3)                            */
/*****************************************************/

#include <stdio.h>

int main(void)
{
  float radius;

  printf("Input radius: ");
  scanf("%f", &radius);
  printf("Radius: %.2f\n", radius);
  printf("Volume: %.2f\n", 4.0/3.0 * 3.14 * (radius * radius * radius));

  return 0;
}
