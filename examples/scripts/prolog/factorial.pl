factorial(0,1).
factorial(N,F) :- N > 0, N1 is - N 1, factorial(N1,F1), F is * N F1.

?- factorial(3,6).
?- factorial(5,2).
?- factorial(3,W).
?- factorial(4,X).
?- factorial(5,Y).
?- factorial(6,Z).
