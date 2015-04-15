from dna import DNA

def test():
    test_input = "A A T G C C T A T G G C"
    expected_output = "A A T G C C T A T G G C\nT T A C G G A T A C C G"
    dna = DNA()
    strand = dna.get_strand(test_input)
    print "Output:\n%s" % (strand)
    print "Expected:\n%s" % (expected_output)
    if strand == expected_output: print "PASS"
    else: print "FAIL"

test()        

