member(X, cons(X, L)).
member(X, cons(Y, M)) :- member(X, M).
?- member(3, cons(2, cons(3, nil))).
?- member(3, cons(2, cons(4, nil))).
