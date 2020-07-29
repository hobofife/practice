#include <stdio.h>

#define LOWER 0
#define UPPER 300
#define STEP 20

int main()
{
	int fahr;
	for (fahr = UPPER; fahr >= LOWER; fahr -= STEP) {
		printf("%3d\t%6.1f\n", fahr, (fahr - 32.0) * (5.0 / 9.0));
	}
}
