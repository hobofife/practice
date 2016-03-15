// Dup1 prints the text of each line that appears more than
// once in the standard input, along with it's count
// run `dup1` then enter lines in the terminal, hit ctrl-D (on Linux)
// to end the bufio scanner and print the output.
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	counts := make(map[string]int)
	input := bufio.NewScanner(os.Stdin)
	for input.Scan() {
		counts[input.Text()]++
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}
