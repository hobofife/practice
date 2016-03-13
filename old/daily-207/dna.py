# http://www.reddit.com/r/dailyprogrammer/comments/2zyipu/20150323_challenge_207_easy_bioinformatics_1_dna/

class DNA:
    def __init__(self):
        self.pairs = {'A':'T', 'T':'A', 'G':'C', 'C':'G', ' ':' '}
        self.to_pair = None
        self.pair = None
        self.in_sequence = None
        self.out_sequence = None
        self.strand = None

    def check_base(self):
        self.to_pair = self.to_pair.upper()
        if self.to_pair not in self.pairs.keys():
            raise Exception("Not a DNA base")
        
    def get_pair(self):
        self.check_base()
        self.pair = self.pairs[self.to_pair]
                                        
    def get_sequence(self):
        out = ""
        for dna_base in self.in_sequence:
            self.to_pair = dna_base
            self.get_pair()
            out += self.pair
        self.out_sequence = out

    def get_output(self):
        self.strand = "%s\n%s" % (self.in_sequence, self.out_sequence)

    def get_strand(self, sequence):
        self.in_sequence = sequence
        self.get_sequence()
        self.get_output()
        return self.strand
        
