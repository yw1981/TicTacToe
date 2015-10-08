describe("aiService", function() {

  it("case1. getPossibleMoves returns exactly one move", function() {
    console.log("case1");
    var board = gameLogic.getInitialBoard();
    var boardBeforeLastMove = angular.copy(board);
    //boardBeforeLastMove.isGameOver = false;
    boardBeforeLastMove.switchTurn = true;
    boardBeforeLastMove.sumAllEdges = 23;
    boardBeforeLastMove.score = [2, 6];
    boardBeforeLastMove.hor = [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 0]];
    boardBeforeLastMove.ver = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
    boardBeforeLastMove.color = [['ME', 'ME', 'ME'], ['ME', 'ME', 'ME'], ['YOU', 'YOU', '']];
    boardBeforeLastMove.sum = [[4, 4, 4], [4, 4, 4], [4, 4, 3]];
    var boardAfterLastMove = gameLogic.updateBoard(boardBeforeLastMove, 'hor', 3, 2, 0);
    let possibleMoves = aiService.getPossibleMoves(boardBeforeLastMove, 0);
    let expectedMove = [{endMatch: {endMatchScores: [3, 6]}},
        {set: {key: 'board', value: boardAfterLastMove}},
        {set: {key: 'delta', value: {dir: 'hor', row: 3, col: 2}}}];
    expect(angular.equals(possibleMoves, [expectedMove])).toBe(true);
  });

  it("case2. YOU/computer find an immediate winning move on top", function() {
    console.log("case2");
    var board = gameLogic.getInitialBoard();
    var boardBeforeMove = angular.copy(board);
    boardBeforeMove.switchTurn = true;
    boardBeforeMove.sumAllEdges = 19;
    boardBeforeMove.score = [0, 4];
    boardBeforeMove.hor = [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]];
    boardBeforeMove.ver = [[1, 1, 0, 1], [1, 1, 1, 1], [0, 0, 1, 1]];
    boardBeforeMove.color = [['ME', '', ''], ['ME', '', 'ME'], ['', '', 'ME']];
    boardBeforeMove.sum = [[4, 2, 3], [4, 2, 4], [2, 2, 4]];
    var boardAfterMove = angular.copy(boardBeforeMove);
    boardAfterMove.switchTurn = false;
    boardAfterMove.sumAllEdges = 20;
    boardAfterMove.score = [1, 4];
    boardAfterMove.hor = [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]];
    boardAfterMove.ver = [[1, 1, 1, 1], [1, 1, 1, 1], [0, 0, 1, 1]];
    boardAfterMove.color = [['ME', '', 'YOU'], ['ME', '', 'ME'], ['', '', 'ME']];
    boardAfterMove.sum = [[4, 3, 4], [4, 2, 4], [2, 2, 4]];
    gameLogic.printBoard(boardBeforeMove);
    // let possibleMoves = aiService.getPossibleMoves(boardBeforeMove, 0);
    // console.log("# of possible moves (expect 5) = " + possibleMoves.length);
    // for (let m in possibleMoves){
    //   console.log("%o", possibleMoves[m]);
    // }
    // expect(angular.equals(true, true)).toBe(true);
    let move = aiService.createComputerMove(boardBeforeMove, 0, {millisecondsLimit: 1000});
    gameLogic.printDelta(move[2].set.value);
    gameLogic.printBoard(move[1].set.value);
    let expectedMove = [{setTurn: {turnIndex : 0}},
      {set: {key: 'board', value: boardAfterMove}},
      {set: {key: 'delta', value: {dir: 'ver', row: 0, col: 2}}}];
    expect(angular.equals(move, expectedMove)).toBe(true);

  });

  it("case3. YOU/computer find an immediate winning move on the bottom", function() {
    var board = gameLogic.getInitialBoard();
    var boardBeforeMove = angular.copy(board);
    boardBeforeMove.switchTurn = true;
    boardBeforeMove.sumAllEdges = 19;
    boardBeforeMove.score = [0, 4];
    boardBeforeMove.hor = [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]];
    boardBeforeMove.ver = [[1, 1, 0, 0], [1, 1, 1, 1], [1, 0, 1, 1]];
    boardBeforeMove.color = [['ME', '', ''], ['ME', '', 'ME'], ['', '', 'ME']];
    boardBeforeMove.sum = [[4, 2, 2], [4, 2, 4], [3, 2, 4]];
    var boardAfterMove = angular.copy(boardBeforeMove);
    boardAfterMove.switchTurn = false;
    boardAfterMove.sumAllEdges = 20;
    boardAfterMove.score = [1, 4];
    boardAfterMove.hor = [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]];
    boardAfterMove.ver = [[1, 1, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1]];
    boardAfterMove.color = [['ME', '', ''], ['ME', '', 'ME'], ['YOU', '', 'ME']];
    boardAfterMove.sum = [[4, 2, 2], [4, 2, 4], [4, 3, 4]];
    let move = aiService.createComputerMove(boardBeforeMove, 0, {millisecondsLimit: 1000});
    gameLogic.printDelta(move[2].set.value);
    gameLogic.printBoard(move[1].set.value);
    let expectedMove = [{setTurn: {turnIndex : 0}},
      {set: {key: 'board', value: boardAfterMove}},
      {set: {key: 'delta', value: {dir: 'ver', row: 2, col: 1}}}];
    expect(angular.equals(move, expectedMove)).toBe(true);
  });

  it("case4. there are only cells with sum 4 and 2 ", function() {
    var board = gameLogic.getInitialBoard();
    var boardBeforeMove = angular.copy(board);
    boardBeforeMove.switchTurn = true;
    boardBeforeMove.sumAllEdges = 17;
    boardBeforeMove.score = [0, 3];
    boardBeforeMove.hor = [[1, 0, 0], [1, 1, 1], [1, 0, 0], [1, 1, 1]];
    boardBeforeMove.ver = [[1, 1, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]];
    boardBeforeMove.color = [['ME', '', ''], ['ME', '', ''], ['ME', '', '']];
    boardBeforeMove.sum = [[4, 2, 2], [4, 2, 2], [4, 2, 2]];
    var boardAfterMove = angular.copy(boardBeforeMove);
    boardAfterMove.switchTurn = true;
    boardAfterMove.sumAllEdges = 18;
    boardAfterMove.score = [0, 3];
    boardAfterMove.hor = [[1, 1, 0], [1, 1, 1], [1, 0, 0], [1, 1, 1]];
    boardAfterMove.ver = [[1, 1, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]];
    boardAfterMove.color = [['ME', '', ''], ['ME', '', ''], ['ME', '', '']];
    boardAfterMove.sum = [[4, 3, 2], [4, 2, 2], [4, 2, 2]];
    let move = aiService.createComputerMove(boardBeforeMove, 0, {millisecondsLimit: 1000});
    //gameLogic.printDelta(move[2].set.value);
    //gameLogic.printBoard(move[1].set.value);
    let expectedMove = [{setTurn: {turnIndex : 1}},
      {set: {key: 'board', value: boardAfterMove}},
      {set: {key: 'delta', value: {dir: 'hor', row: 0, col: 1}}}];
    //console.log(angular.equals(move, expectedMove));
    expect(angular.equals(move, expectedMove)).toBe(true);
  });

  it("case5. when board is empty, which move will computer choose?", function() {
    var board = gameLogic.getInitialBoard();
    var boardBeforeMove = angular.copy(board);
    var boardAfterMove = angular.copy(boardBeforeMove);
    boardAfterMove.hor[0][0] = 1;
    boardAfterMove.sum[0][0] = 1;
    boardAfterMove.sumAllEdges = 1;
    let move = aiService.createComputerMove(boardBeforeMove, 0, {millisecondsLimit: 1000});
    //gameLogic.printDelta(move[2].set.value);
    //gameLogic.printBoard(move[1].set.value);
    let expectedMove = [{setTurn: {turnIndex : 1}},
      {set: {key: 'board', value: boardAfterMove}},
      {set: {key: 'delta', value: {dir: 'hor', row: 0, col: 0}}}];
    expect(angular.equals(move, expectedMove)).toBe(true);
  });

/*  it("YOU/computer find an immediate move that can close a cell", function() {
    var board = gameLogic.getInitialBoard();
    var boardBeforeMove = angular.copy(board);
    boardBeforeMove.switchTurn = true;
    boardBeforeMove.sumAllEdges = 6;
    boardBeforeMove.score = [0, 0];
    boardBeforeMove.hor = [[1, 0, 0], [1, 0, 0], [0, 0, 1], [0, 0, 0]];
    boardBeforeMove.ver = [[1, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    boardBeforeMove.color = [['', '', ''], ['', '', ''], ['', '', '']];
    boardBeforeMove.sum = [[3, 0, 0], [0, 0, 2], [0, 0, 0]];
    var boardAfterMove = angular.copy(boardBeforeMove);
    boardAfterMove.switchTurn = false;
    boardAfterMove.sumAllEdges = 7;
    boardAfterMove.score = [1, 0];
    boardAfterMove.hor = [[1, 0, 0], [1, 0, 0], [0, 0, 1], [0, 0, 0]];
    boardAfterMove.ver = [[1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    boardAfterMove.color = [['YOU', '', ''], ['', '', ''], ['', '', '']];
    boardAfterMove.sum = [[4, 0, 0], [0, 0, 2], [0, 0, 0]];
    let move = aiService.createComputerMove(boardBeforeMove, 0, {maxDepth: 5});
    let expectedMove = [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value: boardAfterMove}},
        {set: {key: 'delta', value: {dir: 'ver', row: 0, col: 1}}}];
    expect(angular.equals(move, [expectedMove])).toBe(true);
  }); */

/*  it("X finds an immediate winning move", function() {
    let move = aiService.createComputerMove(
        [['', '', 'O'],
         ['O', 'X', 'X'],
         ['O', 'X', 'O']], 0, {maxDepth: 1});
    let expectedMove =
        [{endMatch: {endMatchScores: [1, 0]}},
          {set: {key: 'board', value:
              [['', 'X', 'O'],
               ['O', 'X', 'X'],
               ['O', 'X', 'O']]}},
          {set: {key: 'delta', value: {row: 0, col: 1}}}];
    expect(angular.equals(move, expectedMove)).toBe(true);
  });

  it("O finds an immediate winning move", function() {
    let move = aiService.createComputerMove(
        [['', '', 'O'],
         ['O', 'X', 'X'],
         ['O', 'X', 'O']], 1, {maxDepth: 1});
    expect(angular.equals(move[2].set.value, {row: 0, col: 0})).toBe(true);
  });

  it("X prevents an immediate win", function() {
    let move = aiService.createComputerMove(
        [['X', '', ''],
         ['O', 'O', ''],
         ['X', '', '']], 0, {maxDepth: 2});
    expect(angular.equals(move[2].set.value, {row: 1, col: 2})).toBe(true);
  });

  it("O prevents an immediate win", function() {
    let move = aiService.createComputerMove(
        [['X', 'X', ''],
         ['O', '', ''],
         ['', '', '']], 1, {maxDepth: 2});
    expect(angular.equals(move[2].set.value, {row: 0, col: 2})).toBe(true);
  });

  it("O prevents another immediate win", function() {
    let move = aiService.createComputerMove(
        [['X', 'O', ''],
         ['X', 'O', ''],
         ['', 'X', '']], 1, {maxDepth: 2});
    expect(angular.equals(move[2].set.value, {row: 2, col: 0})).toBe(true);
  });

  it("X finds a winning move that will lead to winning in 2 steps", function() {
    let move = aiService.createComputerMove(
        [['X', '', ''],
         ['O', 'X', ''],
         ['', '', 'O']], 0, {maxDepth: 3});
    expect(angular.equals(move[2].set.value, {row: 0, col: 1})).toBe(true);
  });

  it("O finds a winning move that will lead to winning in 2 steps", function() {
    let move = aiService.createComputerMove(
        [['', 'X', ''],
         ['X', 'X', 'O'],
         ['', 'O', '']], 1, {maxDepth: 3});
    expect(angular.equals(move[2].set.value, {row: 2, col: 2})).toBe(true);
  });

  it("O finds a cool winning move that will lead to winning in 2 steps", function() {
    let move = aiService.createComputerMove(
        [['X', 'O', 'X'],
         ['X', '', ''],
         ['O', '', '']], 1, {maxDepth: 3});
    expect(angular.equals(move[2].set.value, {row: 2, col: 1})).toBe(true);
  });

  it("O finds the wrong move due to small depth", function() {
    let move = aiService.createComputerMove(
        [['X', '', ''],
         ['', '', ''],
         ['', '', '']], 1, {maxDepth: 3});
    expect(angular.equals(move[2].set.value, {row: 0, col: 1})).toBe(true);
  });

  it("O finds the correct move when depth is big enough", function() {
    let move = aiService.createComputerMove(
        [['X', '', ''],
         ['', '', ''],
         ['', '', '']], 1, {maxDepth: 6});
    expect(angular.equals(move[2].set.value, {row: 1, col: 1})).toBe(true);
  });

  it("X finds a winning move that will lead to winning in 2 steps", function() {
    let move = aiService.createComputerMove(
        [['', '', ''],
         ['O', 'X', ''],
         ['', '', '']], 0, {maxDepth: 5});
    expect(angular.equals(move[2].set.value, {row: 0, col: 0})).toBe(true);
  });
*/
});