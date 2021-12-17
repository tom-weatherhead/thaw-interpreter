; #!/usr/bin/env intrprtr

; Note: This is a pseudo-Scheme file.
; Labyrinth in Scheme - November 21, 2013

loadPreset assoc
loadPreset filter
loadPreset queue
loadPreset set
loadPreset stack
loadPreset sublist

; **** class RoomInfo ****

; A room is a 2-list: (level-number room-number)
(set levelNumber car)
(set roomNumber cadr)

; (to 0 5) yields (0 1 2 3 4 5)
(set to (lambda (start end) (if (> start end) '() (cons start (to (+1 start) end)))))

(set generatePossibleNeighboursOnLevel (lambda (room newLevel numberOfRoomsPerLevel)
    (let ((rn (roomNumber room)) (centreRoomNumber (- numberOfRoomsPerLevel 1)))
        (if (= rn centreRoomNumber)
	        (mapcar (lambda (i) (list newLevel i)) (to 0 (- numberOfRoomsPerLevel 2)))
		    (list
		        (list newLevel (mod (+1 rn) centreRoomNumber))
		        (list newLevel (mod (- (+ rn centreRoomNumber) 1) centreRoomNumber))
		        (list newLevel centreRoomNumber)
			)
		)
	)
))

(set generatePossibleNeighbours (lambda (room numberOfLevels numberOfRoomsPerLevel)
    (let ((levNum (levelNumber room)))
        (append
	        (if (> levNum 0) (generatePossibleNeighboursOnLevel room (- levNum 1) numberOfRoomsPerLevel) '())
	        (if (< levNum (- numberOfLevels 1)) (generatePossibleNeighboursOnLevel room (+1 levNum) numberOfRoomsPerLevel) '())
		)
    )
))

; **** class LabyrinthGenerator ****

(set constructor (lambda (l r) (begin
	(set numberOfLevels l)
	(set numberOfRoomsPerLevel r)
	(set numberOfExtraConnections 0)
	(set numberOfExtraConnectionsAdded 0)
	(set extraConnections '())
	(set rooms '())
	(set roomLabels '())
	(set connections '())
	(set openList '()) ; Is this a queue, a set, or a stack?
	(set numberOfDifferentLabels 0)
	(set roomGoal '())
	(set booksInRooms '())
	(set numberOfAttemptsToRefactor 0)
	(set maximumNumberOfAttemptsToRefactor 100)
	(set currentRoom '())
	(set visitedRooms '()) ; This is a set.
	(set JorgesRoom '())
	(set JorgesPath '())
)))

(set roomListContainsRoom (lambda (roomList room) ; For an alternative, see "member?" in the "set" preset.
	(find ((curry =) room) roomList)
))

(set areConnected (lambda (room1 room2)
	(member? room2 (assoc room1 connections))
))

(set findConflictingConnections (lambda (room1 room2)
	(let* (
		(l1 (levelNumber room1))
		(r1 (roomNumber room1))
		(l2 (levelNumber room2))
		(r2 (roomNumber room2))
		(room3 (list l1 r2))
		(room4 (list l2 r1))
		(l5 (- (* 2 l1) l2))
		(room5 (list l5 r2))
		(l6 (- (* 2 l2) l1))
		(room6 (list l6 r1))
		)
		(any (list
			(areConnected room3 room4)
			(areConnected room1 room5)
			(areConnected room2 room6)
		))
	)
))

(set labelIsUsed (lambda (label)
	(find
		(lambda (key-value-pair) (= (cadr key-value-pair) label))
		roomLabels
	)
))

(set findUnusedLabel (lambda ()
	(let ((result 0))
		(begin
			(while (labelIsUsed result)
				(set result (+1 result))
			)
			result
		)
	)
))

(set propagateNewLabel (lambda (room newLabel addRoomsToOpenList)
	(let (
		(openListStackLocal (list room))
		(closedListSet '())
		(roomFromOpenList '())
		)
		(while (not (empty? openListStackLocal)) (begin
			(set roomFromOpenList (peek openListStackLocal))
			(set openListStackLocal (pop openListStackLocal))
			(rplac-assoc roomFromOpenList newLabel roomLabels)
			(set closedListSet (addelt roomFromOpenList closedListSet))

			(if addRoomsToOpenList
				(set openList (addelt roomFromOpenList openList))
				'()
			)

			; foreach
			(mapcar
				(lambda (room2)
					(if (not (or (member? room2 openListStackLocal) (member? room2 closedListSet)))
						(set openListStackLocal (push room2 openListStackLocal))
						'()
					)
				)
				(assoc roomFromOpenList connections)
			)
		))
	)
))

(set findPossibleNeighboursWithDifferentLabels (lambda () ; Returns a list (room1 room2) or throws an exception.
	(let
		(
			(openListLocal rooms)
			(r 0) ; A random number
			(room1 '())
			(room2 '())
			(possibleNeighbours '())
		)
		(call/cc (lambda (exit) (begin
			(while (not (empty? openListLocal)) (begin
				(set r (random (length openListLocal)))
				(set room1 (nth r openListLocal))
				(set openListLocal (removesublist openListLocal r 1))
				(set possibleNeighbours (generatePossibleNeighbours room1 numberOfLevels numberOfRoomsPerLevel))

				(while (not (empty? possibleNeighbours)) (begin
					(set r (random (length possibleNeighbours)))
					(set room2 (nth r possibleNeighbours))
					(set possibleNeighbours (removesublist possibleNeighbours r 1))

					(if (<> (assoc room1 roomLabels) (assoc room2 roomLabels))
						(exit (list room1 room2))
						'()
					)
				))
			))
			(throw "Unable to find possible neighbours with different labels.")
		)))
	)
))

(set removeOneConnection (lambda (room1 room2)
	(rplac-assoc
		room1
		(remove room2 (assoc room1 connections))
		connections
	)
))

(set removeBothConnection (lambda (room1 room2)
	(begin
		(removeOneConnection room1 room2)
		(removeOneConnection room2 room1)
	)
))

(set numberOfUniqueRoomLabels (lambda ()
	(letrec ((loop (lambda (alist resultSet) (if (null? alist) (length resultSet) (loop (cdr alist) (addelt (cadar alist) resultSet))))))
		(loop roomLabels nullset)
	)
))

(set refactor (lambda ()
	(let* (
		(roomsOfInterest (findPossibleNeighboursWithDifferentLabels))
		(room1 (car roomsOfInterest))
		(room2 (cadr roomsOfInterest))
		(l1 (levelNumber room1))
		(r1 (roomNumber room1))
		(l2 (levelNumber room2))
		(r2 (roomNumber room2))
		(room3 (list l1 r2))
		(room4 (list l2 r1))
		(l5 (- (* 2 l1) l2))
		(room5 (list l5 r2))
		(l6 (- (* 2 l2) l1))
		(room6 (list l6 r1))
		)
		(begin
			(if (areConnected room3 room4)
				(begin
					(print "Found a Type 1 conflict.")
					(removeBothConnection room3 room4)
					(propagateNewLabel room3 (findUnusedLabel) 'T)
					(propagateNewLabel room4 (findUnusedLabel) 'T)
				)
				'()
			)
			(if (areConnected room1 room5)
				(begin
					(print "Found a Type 2 conflict.")
					(removeBothConnection room1 room5)
					(propagateNewLabel room5 (findUnusedLabel) 'T)
				)
				'()
			)
			(if (areConnected room2 room6)
				(begin
					(print "Found a Type 3 conflict.")
					(removeBothConnection room2 room6)
					(propagateNewLabel room6 (findUnusedLabel) 'T)
				)
				'()
			)

			; Connect room1 and room2.
			(propagateNewLabel room2 (assoc room1 roomLabels) '())
			(rplac-assoc room1 (cons room2 (assoc room1 connections)) connections)
			(rplac-assoc room2 (cons room1 (assoc room2 connections)) connections)

			(set numberOfDifferentLabels (numberOfUniqueRoomLabels))
		)
	)
))

(set finalValidityCheck (lambda ()
	(begin
		(propagateNewLabel '(0 0) (findUnusedLabel) '())

		(if (> (numberOfUniqueRoomLabels) 1)
			(throw "The labyrinth is in multiple blobs.")
			'()
		)

		(print "The labyrinth is a single blob.")
	)
))

(set generateRoomList (lambda (numberOfLevels numberOfRoomsPerLevel)
	((combine
		(lambda (l) (mapcar (lambda (r) (list l r)) (to 0 (- numberOfRoomsPerLevel 1))))
	append '()) (to 0 (- numberOfLevels 1)))
))

(set generateRoomLabelsList (lambda (rl n)
	(if (null? rl)
		'()
		(cons (list (car rl) n) (generateRoomLabelsList (cdr rl) (+1 n)))
	)
))

(set report (lambda () (begin
	(mapcar (lambda (room1)
		(mapcar (lambda (room2)
			(print (listtostring (list "Room " room1 " is connected to Room " room2 ".")))
		) (assoc room1 connections))
	) rooms)

	(cond
		((= numberOfAttemptsToRefactor 1) (print "The labyrinth was refactored 1 time."))
		((> numberOfAttemptsToRefactor 0) (print (listtostring (list "The labyrinth was refactored " numberOfAttemptsToRefactor " times."))))
		('T '())
	)

    (finalValidityCheck)
)))

(set findShortestPathBetweenRooms (lambda (room roomGoalLocal) ; roomGoalLocal may be null.
	(let (
		(openListLocal (list room)) ; This is a queue.
		(paths (list (list room (list room)))) ; This is a dictionary/association list; the keys are rooms, and the values are lists of rooms.
		(pathToRoom '())
		)
		(if (= room roomGoalLocal)
			(assoc room paths)
			(call/cc (lambda (exit) (begin
				(while (not (null? openListLocal)) (begin
					(set room (front openListLocal))
					(set openListLocal (rm-front openListLocal))
					(set pathToRoom (assoc room paths))
					(mapcar (lambda (room2)
						(if (not (assoc-contains-key room2 paths))
							(begin
								(set openListLocal (enqueue room2 openListLocal))
								(set paths (cons (list room2 (append pathToRoom (list room2))) paths))
								(if (= room2 roomGoalLocal)
									(exit (assoc room2 paths))
									'()
								)
							)
							'()
						)
					) (assoc room connections))
				))
				(assoc room paths) ; Or just pathToRoom ?
			)))
		)
	)
))

(set findLongestPathFromRoom (lambda (room) (findShortestPathBetweenRooms room '())))

(set printLongestPath (lambda ()
	(let* (
		(path1 (findLongestPathFromRoom (list (- numberOfLevels 1) (- numberOfRoomsPerLevel 1))))
		(longestPath (findLongestPathFromRoom (car (reverse path1))))
		)
		(begin
			;(print (cons "Longest path: " longestPath))
			(print (listtostring (list "The longest path contains " (length longestPath) " rooms.")))
			(set roomGoal (car (reverse longestPath)))
			;(print (listtostring (list "Aristotle's Second Book of the Poetics is in Room " roomGoal ".")))
			(print (listtostring (list "The path from Room (0 0) to the goal contains " (length (findShortestPathBetweenRooms '(0 0) roomGoal)) " rooms.")))
		)
	)
))

(set placeBooksInRooms (lambda () ; A room can contain multiple books.
	(let (
		(books (list
			"The First Book of the Poetics of Aristotle"
			"The Iliad by Homer"
			"The Odyssey by Homer"
			"The Republic by Plato"
			"Categories by Aristotle"
			"Physics by Aristotle"
			"Nicomachean Ethics by Aristotle"
			"The Aeneid by Virgil"
			"The Old Testament in Hebrew"
			"The New Testament in Greek"
			"Strong's Hebrew Dictionary"
			"Strong's Greek Dictionary"
		))
		(r 0)
		(numRooms (length rooms))
		(room '())
		)
		(begin
			(set booksInRooms (list (list roomGoal (list "The Second Book of the Poetics of Aristotle"))))
			(mapcar (lambda (book) (begin
				(set r (random numRooms))
				(set room (nth r rooms))
				(if (assoc-contains-key room booksInRooms)
					(rplac-assoc room (cons book (assoc room booksInRooms)) booksInRooms)
					(set booksInRooms (cons (list room (list book)) booksInRooms))
				)
			)) books)
		)
	)
))

(set reportProximityToJorge (lambda ()
	(let* (
		(path (findShortestPathBetweenRooms currentRoom JorgesRoom))
		(distance (- (length path) 1))
		)
		(cond
			((= distance 0) (begin
				(print "* You and the Venerable Jorge are in the same room! *")
				(print "'Good evening, Venerable Jorge.'")
			))
			((<= distance 2) (print "The Venerable Jorge is very near."))
			((<= distance 4) (print "The Venerable Jorge is near."))
			('T '())
		)
	)
))

(set constructJorgesPath (lambda () ; This returns Jorge's new path.
	(let ((JorgesGoal '()))
		(call/cc (lambda (exit)
			(while 'T (begin
				(set JorgesGoal (nth (random (length rooms)) rooms))
				(if (<> JorgesRoom JorgesGoal)
					(exit (cdr (findShortestPathBetweenRooms JorgesRoom JorgesGoal))) ; Use cdr because the first room is Jorge's current room.
					'()
				)
			))
		))
	)
))

(set printAdjacentRooms (lambda (n adjacentRooms)
	(if (null? adjacentRooms)
		'()
		(begin
			(print (listtostring (list n ": " (car adjacentRooms) (if (roomListContainsRoom visitedRooms (car adjacentRooms)) " Visited" ""))))
			(printAdjacentRooms (+1 n) (cdr adjacentRooms))
		)
	)
))

(set moveToRoom (lambda (room) (begin
	; Move the player to the given room.
	(set currentRoom room)
	(set visitedRooms (addelt room visitedRooms))
	(print (listtostring (list "You are in Room " room ".")))
	(reportProximityToJorge)
	(if (assoc-contains-key room booksInRooms)
		(mapcar (lambda (book)
			(print (listtostring (list "This room contains the book '" book "'.")))
		) (assoc room booksInRooms))
		'()
	)
	(if (= room roomGoal)
		(print "**** Congratulations!  You have reached the goal! ****")
		'()
	)

	; Move Jorge.
	(print "Jorge moves.")
	(if (null? JorgesPath)
		(set JorgesPath (constructJorgesPath))
		'()
	)
	(set JorgesRoom (car JorgesPath))
	(set JorgesPath (cdr JorgesPath))
	;(print (listtostring (list "The Venerable Jorge is in Room " JorgesRoom ".")))
	(reportProximityToJorge)

	(printAdjacentRooms 0 (assoc room connections))
)))

(set generate (lambda (numberOfLevels numberOfRoomsPerLevel)
	(let (
		(room1Index 0)
		(room1 '())
		(possibleNeighbours '())
		(room2 '())
		(room2Index 0)
		(room2Temp '())
		(label1 0)
		(label2 0)
		(minLabel 0)
		(maxLabel 0)
		)
		(begin
			(constructor numberOfLevels numberOfRoomsPerLevel)
			(set rooms (generateRoomList numberOfLevels numberOfRoomsPerLevel))
			(set connections (mapcar (lambda (r) (list r '())) rooms))
			(set numberOfDifferentLabels (length rooms))
			(set openList rooms)
			(set roomLabels (generateRoomLabelsList rooms 0))

			(while (> numberOfDifferentLabels 1) (call/cc (lambda (continue) (begin

				(if (null? openList)
					(begin

						(if (>= numberOfAttemptsToRefactor maximumNumberOfAttemptsToRefactor)
							(throw "Attempted to refactor too many times.")
							'()
						)

						(set numberOfAttemptsToRefactor (+1 numberOfAttemptsToRefactor))
						(refactor)
					)
					'()
				)

				(set room1Index (random (length openList)))
				(set room1 (nth room1Index openList))
				(set possibleNeighbours (generatePossibleNeighbours room1 numberOfLevels numberOfRoomsPerLevel))
				(set room2 (call/cc (lambda (exit) (begin
					(while (not (null? possibleNeighbours)) (begin
						(set room2Index (random (length possibleNeighbours)))
						(set room2Temp (nth room2Index possibleNeighbours))

						(if (and
							(<> (assoc room1 roomLabels) (assoc room2Temp roomLabels))
							(not (findConflictingConnections room1 room2Temp))
							)
							(exit room2Temp)
							'()
						)

						(set possibleNeighbours (removesublist possibleNeighbours room2Index 1))
					))
					(set openList (removesublist openList room1Index 1))
					(continue '())
				))))

				; We have now chosen room1 and room2.
				(rplac-assoc room1 (cons room2 (assoc room1 connections)) connections)
				(rplac-assoc room2 (cons room1 (assoc room2 connections)) connections)

				; Join the two "blobs" to which the two rooms belong, by modifying room labels.
				(set label1 (assoc room1 roomLabels))
				(set label2 (assoc room2 roomLabels))
				(set minLabel (if (< label1 label2) label1 label2))
				(set maxLabel (if (< label1 label2) label2 label1))
				(set roomLabels (mapcar (lambda (x)
					(if (= (cadr x) maxLabel) (list (car x) minLabel) x)
				) roomLabels))
				(set numberOfDifferentLabels (- numberOfDifferentLabels 1))
			))))
			(print "Labyrinth generation is complete.")
			(report)
			(printLongestPath)	; This sets roomGoal.
			(placeBooksInRooms) ; This uses roomGoal.
			(set JorgesRoom (nth (random (length rooms)) rooms))
			(print "") ; Print a blank line.
			(moveToRoom '(0 0))
		)
	)
))

; **** Application Commands ****

(set gen (lambda () (generate 15 7)))

(set move (lambda (n)
	(let ((adjacentRooms (assoc currentRoom connections)))
		(if (< n (length adjacentRooms))
			(moveToRoom (nth n adjacentRooms))
			(throw "Error: Input is out of range.")
		)
	)
))

(set help (lambda ()
	(findShortestPathBetweenRooms currentRoom roomGoal)
))

; End of File.
