import unittest
from mock import patch
from dna import DNA

class TestGetPair(unittest.TestCase):
    def setUp(self):
        self.dna = DNA()
    
    def test_lowercase(self):
        self.dna.to_pair = "a"
        self.dna.get_pair()
        self.assertEqual(self.dna.to_pair, "A")

    def test_a_t(self):
        self.dna.to_pair = "A"
        self.dna.get_pair()
        self.assertEqual(self.dna.pair, "T")

    def test_t_a(self):
        self.dna.to_pair = "T"
        self.dna.get_pair()
        self.assertEqual(self.dna.pair, "A")

    def test_g_c(self):
        self.dna.to_pair = "G"
        self.dna.get_pair()
        self.assertEqual(self.dna.pair, "C")

    def test_c_g(self):
        self.dna.to_pair = "C"
        self.dna.get_pair()xb
        self.assertEqual(self.dna.pair, "G")

class TestGetSequence(unittest.TestCase):
    def setUp(self):
        self.dna = DNA()

    def test_integration_normal(self):
        self.dna.in_sequence = "AATGACCT"
        expected = "TTACTGGA"
        self.dna.get_sequence()
        self.assertEqual(self.dna.out_sequence, expected)
                        
    def test_integration_mixed_case(self):
        self.dna.in_sequence = "aAtgAcCt"
        expected = "TTACTGGA"
        self.dna.get_sequence()
        self.assertEqual(self.dna.out_sequence, expected)

    def test_integation_bad_input(self):
        self.dna.in_sequence = "1234567"
        with self.assertRaises(Exception) as e:
            self.dna.get_sequence()
        self.assertEqual(e.exception.message, "Not a DNA base")

class TestGetOutput(unittest.TestCase):
    def setUp(self):
        self.dna = DNA()

    def test_output(self):
        self.dna.in_sequence = "1234"
        self.dna.out_sequence = "5678"
        self.dna.get_output()
        expected = "1234\n5678"
        self.assertEqual(self.dna.strand, expected)
