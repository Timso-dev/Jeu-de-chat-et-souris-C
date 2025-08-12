class ChatSourisGame {
    constructor() {
        // Configuration du plateau selon le cahier des charges
        this.boardConnections = {
            // Première rangée (1-7)
            1: [2, 8], 2: [1, 3, 8, 9], 3: [2, 4, 9, 10], 4: [3, 5, 10, 11], 
            5: [4, 6, 11, 12], 6: [5, 7, 12, 13], 7: [6, 13, 14],
            
            // Deuxième rangée (8-14)
            8: [1, 2, 9, 15], 9: [2, 3, 8, 10, 15, 16], 10: [3, 4, 9, 11, 16, 17],
            11: [4, 5, 10, 12, 17, 18], 12: [5, 6, 11, 13, 18, 19], 
            13: [6, 7, 12, 14, 19, 20], 14: [7, 13, 20, 21],
            
            // Troisième rangée (15-21)
            15: [8, 9, 16, 22], 16: [9, 10, 15, 17, 22, 23], 17: [10, 11, 16, 18, 23, 24],
            18: [11, 12, 17, 19, 24, 25], 19: [12, 13, 18, 20, 25, 26], 
            20: [13, 14, 19, 21, 26, 27], 21: [14, 20, 27, 28],
            
            // Quatrième rangée (22-28) - Position initiale des chats
            22: [15, 16, 23, 29], 23: [16, 17, 22, 24, 29, 30], 24: [17, 18, 23, 25, 30, 33],
            25: [18, 19, 24, 26, 33, 34], 26: [19, 20, 25, 27, 34, 35], 
            27: [20, 21, 26, 28, 35, 31], 28: [21, 27, 31, 32],
            
            // Cinquième rangée (29-32)
            29: [22, 23, 30], 30: [23, 24, 29, 33], 31: [27, 28, 32, 35], 32: [28, 31],
            
            // Refuge (33-41)
            33: [24, 25, 30, 34, 36], 34: [25, 26, 33, 35, 36, 37], 35: [26, 27, 31, 34, 37, 38],
            36: [33, 34, 37, 39], 37: [34, 35, 36, 38, 39, 40], 38: [35, 37, 40, 41],
            39: [36, 37, 40], 40: [37, 38, 39, 41], 41: [38, 40]
        };

        // Positions des cellules pour l'affichage (x, y en pourcentage)
        this.cellPositions = {
            // Première rangée
            1: {x: 15, y: 10}, 2: {x: 25, y: 10}, 3: {x: 35, y: 10}, 4: {x: 45, y: 10},
            5: {x: 55, y: 10}, 6: {x: 65, y: 10}, 7: {x: 75, y: 10},
            
            // Deuxième rangée
            8: {x: 15, y: 25}, 9: {x: 25, y: 25}, 10: {x: 35, y: 25}, 11: {x: 45, y: 25},
            12: {x: 55, y: 25}, 13: {x: 65, y: 25}, 14: {x: 75, y: 25},
            
            // Troisième rangée
            15: {x: 15, y: 40}, 16: {x: 25, y: 40}, 17: {x: 35, y: 40}, 18: {x: 45, y: 40},
            19: {x: 55, y: 40}, 20: {x: 65, y: 40}, 21: {x: 75, y: 40},
            
            // Quatrième rangée
            22: {x: 15, y: 55}, 23: {x: 25, y: 55}, 24: {x: 35, y: 55}, 25: {x: 45, y: 55},
            26: {x: 55, y: 55}, 27: {x: 65, y: 55}, 28: {x: 75, y: 55},
            
            // Cinquième rangée
            29: {x: 20, y: 70}, 30: {x: 30, y: 70}, 31: {x: 60, y: 70}, 32: {x: 70, y: 70},
            
            // Refuge
            33: {x: 35, y: 80}, 34: {x: 45, y: 80}, 35: {x: 55, y: 80},
            36: {x: 35, y: 90}, 37: {x: 45, y: 90}, 38: {x: 55, y: 90},
            39: {x: 35, y: 100}, 40: {x: 45, y: 100}, 41: {x: 55, y: 100}
        };

        this.gameState = {
            currentPlayer: 'mouse', // 'mouse' ou 'cat'
            pieces: {},
            selectedPiece: null,
            moveHistory: [],
            gameStatus: 'playing', // 'playing', 'mice_win', 'cats_win'
            mustCapture: false,
            captureableCat: null
        };

        this.initializeDOM();
        this.setupEventListeners();
        this.initializeGame();
    }

    initializeDOM() {
        this.gameBoard = document.getElementById('gameBoard');
        this.currentPlayerSpan = document.getElementById('currentPlayer');
        this.miceCountSpan = document.getElementById('miceCount');
        this.refugeCountSpan = document.getElementById('refugeCount');
        this.catCountSpan = document.getElementById('catCount');
        this.historyList = document.getElementById('historyList');
        this.messageDiv = document.getElementById('message');
        
        this.newGameBtn = document.getElementById('newGameBtn');
        this.saveGameBtn = document.getElementById('saveGameBtn');
        this.loadGameBtn = document.getElementById('loadGameBtn');
        this.undoBtn = document.getElementById('undoBtn');
    }

    setupEventListeners() {
        this.newGameBtn.addEventListener('click', () => this.initializeGame());
        this.saveGameBtn.addEventListener('click', () => this.saveGame());
        this.loadGameBtn.addEventListener('click', () => this.loadGame());
        this.undoBtn.addEventListener('click', () => this.undoMove());
    }

    initializeGame() {
        // Réinitialiser l'état du jeu
        this.gameState = {
            currentPlayer: 'mouse',
            pieces: {},
            selectedPiece: null,
            moveHistory: [],
            gameStatus: 'playing',
            mustCapture: false,
            captureableCat: null
        };

        // Placer les souris (cases 1-21)
        for (let i = 1; i <= 21; i++) {
            this.gameState.pieces[i] = {
                type: 'mouse',
                id: `mouse_${i}`,
                position: i,
                previousPositions: []
            };
        }

        // Demander à l'utilisateur de placer les chats
        this.showMessage('Cliquez sur deux cases de la rangée 22-28 pour placer les chats', 'info');
        this.placingCats = true;
        this.catsToPlace = 2;

        this.createBoard();
        this.updateDisplay();
    }

    createBoard() {
        this.gameBoard.innerHTML = '';
        
        // Créer les connexions d'abord (arrière-plan)
        this.createConnections();
        
        // Créer les cellules
        for (let i = 1; i <= 41; i++) {
            this.createCell(i);
        }
    }

    createConnections() {
        for (let from in this.boardConnections) {
            const fromPos = this.cellPositions[from];
            const connections = this.boardConnections[from];
            
            connections.forEach(to => {
                if (to > from) { // Éviter les doublons
                    const toPos = this.cellPositions[to];
                    this.createConnectionLine(fromPos, toPos);
                }
            });
        }
    }

    createConnectionLine(fromPos, toPos) {
        const line = document.createElement('div');
        line.className = 'connection';
        
        const deltaX = toPos.x - fromPos.x;
        const deltaY = toPos.y - fromPos.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        
        line.style.left = `${fromPos.x}%`;
        line.style.top = `${fromPos.y}%`;
        line.style.width = `${distance}%`;
        line.style.transform = `rotate(${angle}deg)`;
        
        this.gameBoard.appendChild(line);
    }

    createCell(cellNumber) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${cellNumber}`;
        
        // Position de la cellule
        const pos = this.cellPositions[cellNumber];
        cell.style.left = `${pos.x}%`;
        cell.style.top = `${pos.y}%`;
        
        // Marquer les cellules du refuge
        if (cellNumber >= 33 && cellNumber <= 41) {
            cell.classList.add('refuge');
        }
        
        // Numéro de la cellule (pour debug)
        const cellLabel = document.createElement('span');
        cellLabel.textContent = cellNumber;
        cellLabel.style.fontSize = '8px';
        cellLabel.style.position = 'absolute';
        cellLabel.style.bottom = '-15px';
        cellLabel.style.left = '50%';
        cellLabel.style.transform = 'translateX(-50%)';
        cell.appendChild(cellLabel);
        
        // Gestionnaire de clic
        cell.addEventListener('click', () => this.handleCellClick(cellNumber));
        
        this.gameBoard.appendChild(cell);
        this.updateCellDisplay(cellNumber);
    }

    updateCellDisplay(cellNumber) {
        const cell = document.getElementById(`cell-${cellNumber}`);
        const piece = this.gameState.pieces[cellNumber];
        
        // Retirer les anciennes classes et pièces
        cell.classList.remove('selected', 'possible-move', 'capture-move');
        const oldPiece = cell.querySelector('.piece');
        if (oldPiece) {
            oldPiece.remove();
        }
        
        // Ajouter la pièce si présente
        if (piece) {
            const pieceElement = document.createElement('div');
            pieceElement.className = `piece ${piece.type}`;
            pieceElement.textContent = piece.type === 'cat' ? 'C' : 's';
            cell.appendChild(pieceElement);
        }
        
        // Marquer la pièce sélectionnée
        if (this.gameState.selectedPiece === cellNumber) {
            cell.classList.add('selected');
        }
    }

    handleCellClick(cellNumber) {
        if (this.gameState.gameStatus !== 'playing') return;

        // Phase de placement des chats
        if (this.placingCats) {
            this.handleCatPlacement(cellNumber);
            return;
        }

        const clickedPiece = this.gameState.pieces[cellNumber];
        const selectedPiece = this.gameState.selectedPiece ? this.gameState.pieces[this.gameState.selectedPiece] : null;

        // Si on clique sur une pièce
        if (clickedPiece) {
            // Vérifier si c'est le bon joueur
            if (clickedPiece.type === this.gameState.currentPlayer) {
                this.selectPiece(cellNumber);
            } else {
                this.showMessage(`C'est au tour des ${this.gameState.currentPlayer === 'mouse' ? 'souris' : 'chats'}`, 'warning');
            }
        }
        // Si on clique sur une case vide avec une pièce sélectionnée
        else if (selectedPiece) {
            this.attemptMove(this.gameState.selectedPiece, cellNumber);
        }
    }

    handleCatPlacement(cellNumber) {
        // Vérifier que c'est dans la rangée 22-28
        if (cellNumber < 22 || cellNumber > 28) {
            this.showMessage('Les chats doivent être placés sur la rangée 22-28', 'error');
            return;
        }

        // Vérifier que la case est libre
        if (this.gameState.pieces[cellNumber]) {
            this.showMessage('Cette case est déjà occupée', 'error');
            return;
        }

        // Placer le chat
        this.gameState.pieces[cellNumber] = {
            type: 'cat',
            id: `cat_${this.catsToPlace}`,
            position: cellNumber,
            previousPositions: []
        };

        this.catsToPlace--;
        this.updateCellDisplay(cellNumber);

        if (this.catsToPlace === 0) {
            this.placingCats = false;
            this.showMessage('Chats placés ! Les souris commencent.', 'success');
            this.updateDisplay();
        } else {
            this.showMessage(`Placez le chat n°${3 - this.catsToPlace}`, 'info');
        }
    }

    selectPiece(cellNumber) {
        // Déselectionner l'ancienne pièce
        if (this.gameState.selectedPiece) {
            this.updateCellDisplay(this.gameState.selectedPiece);
            this.clearPossibleMoves();
        }

        // Sélectionner la nouvelle pièce
        this.gameState.selectedPiece = cellNumber;
        this.updateCellDisplay(cellNumber);
        this.showPossibleMoves(cellNumber);
    }

    showPossibleMoves(fromPosition) {
        const piece = this.gameState.pieces[fromPosition];
        const possibleMoves = this.getPossibleMoves(fromPosition);

        possibleMoves.forEach(move => {
            const cell = document.getElementById(`cell-${move.to}`);
            if (move.type === 'capture') {
                cell.classList.add('capture-move');
            } else {
                cell.classList.add('possible-move');
            }
        });
    }

    clearPossibleMoves() {
        for (let i = 1; i <= 41; i++) {
            const cell = document.getElementById(`cell-${i}`);
            cell.classList.remove('possible-move', 'capture-move');
        }
    }

    getPossibleMoves(fromPosition) {
        const piece = this.gameState.pieces[fromPosition];
        const moves = [];

        if (!piece) return moves;

        const connections = this.boardConnections[fromPosition] || [];

        for (let toPosition of connections) {
            if (piece.type === 'mouse') {
                // Les souris ne peuvent pas reculer
                if (this.isBackwardMove(piece, fromPosition, toPosition)) continue;
                
                // Les souris ne peuvent aller que sur des cases libres
                if (!this.gameState.pieces[toPosition]) {
                    moves.push({to: toPosition, type: 'move'});
                }
            } else if (piece.type === 'cat') {
                // Les chats ne peuvent pas entrer dans le refuge
                if (toPosition >= 33 && toPosition <= 41) continue;
                
                // Mouvement normal
                if (!this.gameState.pieces[toPosition]) {
                    moves.push({to: toPosition, type: 'move'});
                }
                // Capture possible
                else if (this.gameState.pieces[toPosition] && this.gameState.pieces[toPosition].type === 'mouse') {
                    const captureMove = this.getCaptureMove(fromPosition, toPosition);
                    if (captureMove) {
                        moves.push(captureMove);
                    }
                }
            }
        }

        return moves;
    }

    getCaptureMove(catPosition, mousePosition) {
        // Calculer la position d'atterrissage après capture
        const deltaX = this.cellPositions[mousePosition].x - this.cellPositions[catPosition].x;
        const deltaY = this.cellPositions[mousePosition].y - this.cellPositions[catPosition].y;
        
        // Trouver la case d'atterrissage dans la même direction
        for (let position in this.cellPositions) {
            const pos = parseInt(position);
            if (pos === catPosition || pos === mousePosition) continue;
            
            const posX = this.cellPositions[pos].x;
            const posY = this.cellPositions[pos].y;
            const mouseX = this.cellPositions[mousePosition].x;
            const mouseY = this.cellPositions[mousePosition].y;
            
            // Vérifier si c'est dans la bonne direction et connecté à la souris
            const deltaX2 = posX - mouseX;
            const deltaY2 = posY - mouseY;
            
            // Même direction approximative
            if (Math.abs(deltaX - deltaX2) < 5 && Math.abs(deltaY - deltaY2) < 5) {
                // Vérifier la connexion
                const mouseConnections = this.boardConnections[mousePosition] || [];
                if (mouseConnections.includes(pos) && !this.gameState.pieces[pos]) {
                    // Les chats ne peuvent pas atterrir dans le refuge
                    if (pos >= 33 && pos <= 41) continue;
                    return {to: pos, type: 'capture', capturedPiece: mousePosition};
                }
            }
        }
        
        return null;
    }

    isBackwardMove(piece, fromPosition, toPosition) {
        // Les souris ne peuvent pas reculer (se rapprocher de leur position de départ)
        if (piece.type !== 'mouse') return false;
        
        // Calculer la distance par rapport au "bas" du plateau (rangées 1-7)
        const fromY = this.cellPositions[fromPosition].y;
        const toY = this.cellPositions[toPosition].y;
        
        // Si on va vers une rangée plus "haute" (y plus petit), c'est reculer
        return toY < fromY;
    }

    attemptMove(fromPosition, toPosition) {
        const possibleMoves = this.getPossibleMoves(fromPosition);
        const move = possibleMoves.find(m => m.to === toPosition);
        
        if (!move) {
            this.showMessage('Mouvement invalide', 'error');
            return;
        }

        this.executeMove(fromPosition, move);
    }

    executeMove(fromPosition, move) {
        const piece = this.gameState.pieces[fromPosition];
        
        // Sauvegarder l'état pour l'historique
        const moveRecord = {
            from: fromPosition,
            to: move.to,
            piece: piece.type,
            player: this.gameState.currentPlayer,
            capturedPiece: null
        };

        // Exécuter la capture si nécessaire
        if (move.type === 'capture') {
            const capturedPiece = this.gameState.pieces[move.capturedPiece];
            moveRecord.capturedPiece = {
                position: move.capturedPiece,
                piece: capturedPiece
            };
            
            // Supprimer la souris capturée
            delete this.gameState.pieces[move.capturedPiece];
            this.updateCellDisplay(move.capturedPiece);
            
            this.showMessage(`Chat capture une souris en ${move.capturedPiece}!`, 'success');
        }

        // Déplacer la pièce
        piece.previousPositions.push(fromPosition);
        piece.position = move.to;
        delete this.gameState.pieces[fromPosition];
        this.gameState.pieces[move.to] = piece;

        // Mettre à jour l'affichage
        this.updateCellDisplay(fromPosition);
        this.updateCellDisplay(move.to);
        
        // Ajouter à l'historique
        this.gameState.moveHistory.push(moveRecord);
        
        // Désélectionner
        this.gameState.selectedPiece = null;
        this.clearPossibleMoves();

        // Vérifier les prises obligatoires pour les chats
        if (this.gameState.currentPlayer === 'cat') {
            const mustCapture = this.checkMandatoryCaptures();
            if (mustCapture.length > 0 && move.type !== 'capture') {
                this.showMessage('Prise obligatoire! Le chat qui aurait dû prendre est soufflé.', 'warning');
                // Implémenter la règle du "soufflage" si nécessaire
            }
        }

        // Changer de joueur
        this.switchPlayer();
        
        // Vérifier les conditions de victoire
        this.checkWinConditions();
        
        this.updateDisplay();
    }

    checkMandatoryCaptures() {
        const captures = [];
        
        // Vérifier tous les chats
        for (let position in this.gameState.pieces) {
            const piece = this.gameState.pieces[position];
            if (piece.type === 'cat') {
                const moves = this.getPossibleMoves(parseInt(position));
                const captureMoves = moves.filter(m => m.type === 'capture');
                if (captureMoves.length > 0) {
                    captures.push({cat: position, captures: captureMoves});
                }
            }
        }
        
        return captures;
    }

    switchPlayer() {
        this.gameState.currentPlayer = this.gameState.currentPlayer === 'mouse' ? 'cat' : 'mouse';
        
        // Vérifier les prises obligatoires pour les chats
        if (this.gameState.currentPlayer === 'cat') {
            const mandatoryCaptures = this.checkMandatoryCaptures();
            if (mandatoryCaptures.length > 0) {
                this.gameState.mustCapture = true;
                this.showMessage('Prise obligatoire pour les chats!', 'warning');
            } else {
                this.gameState.mustCapture = false;
            }
        }
    }

    checkWinConditions() {
        const miceInRefuge = this.countMiceInRefuge();
        const totalMice = this.countTotalMice();
        
        // Victoire des souris : 9 souris dans le refuge
        if (miceInRefuge >= 9) {
            this.gameState.gameStatus = 'mice_win';
            this.showMessage('🎉 Victoire des souris! 9 souris ont atteint le refuge!', 'success');
            return;
        }
        
        // Victoire des chats : trop peu de souris restantes
        if (totalMice < 9) {
            this.gameState.gameStatus = 'cats_win';
            this.showMessage('🎉 Victoire des chats! Pas assez de souris pour remplir le refuge!', 'success');
            return;
        }
        
        // Vérifier si les souris peuvent encore bouger
        if (this.gameState.currentPlayer === 'mouse') {
            const canMove = this.canPlayerMove('mouse');
            if (!canMove) {
                this.gameState.gameStatus = 'cats_win';
                this.showMessage('🎉 Victoire des chats! Les souris ne peuvent plus bouger!', 'success');
                return;
            }
        }
        
        // Vérifier si les chats peuvent encore bouger
        if (this.gameState.currentPlayer === 'cat') {
            const canMove = this.canPlayerMove('cat');
            if (!canMove) {
                this.gameState.gameStatus = 'mice_win';
                this.showMessage('🎉 Victoire des souris! Les chats ne peuvent plus bouger!', 'success');
                return;
            }
        }
    }

    canPlayerMove(playerType) {
        for (let position in this.gameState.pieces) {
            const piece = this.gameState.pieces[position];
            if (piece.type === playerType) {
                const moves = this.getPossibleMoves(parseInt(position));
                if (moves.length > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    countMiceInRefuge() {
        let count = 0;
        for (let i = 33; i <= 41; i++) {
            if (this.gameState.pieces[i] && this.gameState.pieces[i].type === 'mouse') {
                count++;
            }
        }
        return count;
    }

    countTotalMice() {
        let count = 0;
        for (let position in this.gameState.pieces) {
            if (this.gameState.pieces[position].type === 'mouse') {
                count++;
            }
        }
        return count;
    }

    countTotalCats() {
        let count = 0;
        for (let position in this.gameState.pieces) {
            if (this.gameState.pieces[position].type === 'cat') {
                count++;
            }
        }
        return count;
    }

    updateDisplay() {
        // Mettre à jour les compteurs
        this.currentPlayerSpan.textContent = this.gameState.currentPlayer === 'mouse' ? 'Souris' : 'Chats';
        this.miceCountSpan.textContent = this.countTotalMice();
        this.refugeCountSpan.textContent = this.countMiceInRefuge();
        this.catCountSpan.textContent = this.countTotalCats();
        
        // Mettre à jour l'historique
        this.updateHistory();
        
        // Activer/désactiver les boutons
        this.undoBtn.disabled = this.gameState.moveHistory.length === 0;
    }

    updateHistory() {
        this.historyList.innerHTML = '';
        
        this.gameState.moveHistory.forEach((move, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            
            let moveText = `${index + 1}. ${move.piece === 'mouse' ? 'Souris' : 'Chat'} `;
            moveText += `${move.from} → ${move.to}`;
            
            if (move.capturedPiece) {
                moveText += ` (capture en ${move.capturedPiece.position})`;
            }
            
            item.textContent = moveText;
            this.historyList.appendChild(item);
        });
        
        // Scroller vers le bas
        this.historyList.scrollTop = this.historyList.scrollHeight;
    }

    undoMove() {
        if (this.gameState.moveHistory.length === 0) return;
        
        const lastMove = this.gameState.moveHistory.pop();
        
        // Remettre la pièce à sa position précédente
        const piece = this.gameState.pieces[lastMove.to];
        delete this.gameState.pieces[lastMove.to];
        this.gameState.pieces[lastMove.from] = piece;
        piece.position = lastMove.from;
        
        // Restaurer la pièce capturée si nécessaire
        if (lastMove.capturedPiece) {
            this.gameState.pieces[lastMove.capturedPiece.position] = lastMove.capturedPiece.piece;
        }
        
        // Changer de joueur
        this.gameState.currentPlayer = lastMove.player;
        
        // Réinitialiser la sélection
        this.gameState.selectedPiece = null;
        this.gameState.gameStatus = 'playing';
        
        // Mettre à jour l'affichage
        this.updateCellDisplay(lastMove.from);
        this.updateCellDisplay(lastMove.to);
        if (lastMove.capturedPiece) {
            this.updateCellDisplay(lastMove.capturedPiece.position);
        }
        this.clearPossibleMoves();
        this.updateDisplay();
        
        this.showMessage('Coup annulé', 'info');
    }

    saveGame() {
        const saveData = {
            gameState: this.gameState,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('chatSourisGame', JSON.stringify(saveData));
        this.showMessage('Partie sauvegardée!', 'success');
    }

    loadGame() {
        const saveData = localStorage.getItem('chatSourisGame');
        if (!saveData) {
            this.showMessage('Aucune partie sauvegardée trouvée', 'error');
            return;
        }
        
        try {
            const data = JSON.parse(saveData);
            this.gameState = data.gameState;
            
            // Recréer le plateau
            this.createBoard();
            this.updateDisplay();
            
            this.showMessage('Partie chargée!', 'success');
        } catch (error) {
            this.showMessage('Erreur lors du chargement', 'error');
        }
    }

    showMessage(text, type = 'info') {
        this.messageDiv.textContent = text;
        this.messageDiv.className = `message ${type} show`;
        
        setTimeout(() => {
            this.messageDiv.classList.remove('show');
        }, 3000);
    }
}

// Initialiser le jeu quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new ChatSourisGame();
});
