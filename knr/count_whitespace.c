#include <stdio.h>

int main()
{
	int c, ws;

	ws = 0;
	while ((c = getchar()) != EOF) {
		if (c == '\n') {
			++ws;
		}
		if (c == '\t') {
			++ws;
		}
		if (c == ' ') {
			++ws;
		}
	}
	printf("%d\n", ws);
}
