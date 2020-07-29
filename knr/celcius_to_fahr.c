#include <stdio.h>

float convert_to_fahr(float celcius) { return (9.0 / 5.0) * (celcius + 32.0); }

int main()
{
	float fahr, celcius;
	int lower, upper, step;

	lower = 0;
	upper = 300;
	step = 20;

	celcius = lower;

	printf("Celcius\tFahrenheit\n");
	printf("-------\t----------\n");

	while (celcius <= upper) {
		fahr = convert_to_fahr(celcius);
		printf("%7.0f\t%10.1f\n", celcius, fahr);
		celcius = celcius + step;
	}
}
