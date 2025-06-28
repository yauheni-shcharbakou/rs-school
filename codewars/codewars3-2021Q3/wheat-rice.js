/*
I assume most of you are familiar with the ancient legend of the rice (but I see
wikipedia suggests wheat, for some reason) problem, but a quick recap for you:
a young man asks as a compensation only 1 grain of rice for the first square, 2
grains for the second, 4 for the third, 8 for the fourth and so on, always
doubling the previous.

Your task is pretty straightforward (but not necessarily easy): given an amount
of grains, you need to return up to which square of the chessboard one should
count in order to get at least as many.

https://www.codewars.com/kata/the-wheat-slash-rice-and-chessboard-problem
 */

const squaresNeeded = (grains) => (grains ? grains.toString(2).length : 0)

// console.log(squaresNeeded(3))
