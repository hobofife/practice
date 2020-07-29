#include <stdio.h>

/* Version 1 */
/*
int main()
{
	int c;
	c = getchar();
	while (c != EOF) {
		putchar(c);
		c = getchar();
	}
}
*/

/* Version 2 */

/*
int main()
{
	int c;
	while ((c = getchar()) != EOF) {
		putchar(c);
	}
	putchar(c);
}
*/

/* Version 3 */

int main()
{
	int c;
	do {
		c = getchar();
		putchar(c);
	} while (c != EOF);
}
