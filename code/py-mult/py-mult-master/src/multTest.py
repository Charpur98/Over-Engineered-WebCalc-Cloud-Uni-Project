import mult
import unittest


class TestMult(unittest.TestCase):
    def test_mult(self):
        self.assertEqual(mult.str_mult(5, 6), 30)

    def test_multZero(self):
        self.assertEqual(mult.str_mult(5, 0), 0)

    def test_multZeros(self):
        self.assertEqual(mult.str_mult(0, 0), 0)

    def test_multMinus(self):
        self.assertEqual(mult.str_mult(-5, 2), -10)

    def test_multDouble(self):
        self.assertEqual(mult.str_mult(5.1, 2.2), 11.22)

    def test_multFraction(self):
        self.assertEqual(mult.str_mult(0.1, 100), 10)


if __name__ == 'main':
    unittest.main()
