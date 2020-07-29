from subprocess import PIPE, Popen
import sys

tests = [
    ("\n", "1 0 1"),
    ("hey", "0 1 3"),
    ("one two three\n", "1 3 14"),
    ("\n\n\n", "3 0 3"),
    
    # ("how many words is this? \t\t\n", "1 5 27")
]


# https://docs.python.org/2.7/library/subprocess.html
for test in tests:
    input_string = test[0]
    expected = test[1]
    echo_input = Popen(["printf", input_string], stdout=PIPE)
    count_cmd = Popen(["./count"], stdin=echo_input.stdout, stdout=PIPE)
    echo_input.stdout.close()
    output = count_cmd.communicate()[0]

    if output.strip() == expected:
        sys.stdout.write(".")
    else:
        sys.stdout.write("F")
    sys.stdout.flush()

sys.stdout.write("\n")
sys.stdout.flush()

    
