#!/bin/bash

gcc -o count count_words.c

input="how many words is this? \t\t\n"
expected="1 5 27"
output=`echo $input | ./count`

[[ "$expected" == "$output" ]] && echo "." || echo "F"

