#include <stdio.h>

int main()
{
	int c;

	do {
		c = getchar();
		if (c == ' ') {
			putchar('\n');
		} else {
			putchar(c);
		}

	} while (c != EOF);
}
