# 🐱🐭 Chat et Souris

Un jeu de stratégie classique implémenté en JavaScript, déployable sur GitHub Pages. Adaptation fidèle du cahier des charges original en version web interactive.

## 🎮 Aperçu du jeu

![Chat et Souris](https://img.shields.io/badge/Game-Chat%20et%20Souris-red?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**🚀 [Jouer maintenant](https://timso-dev.github.io/Jeu-de-chat-et-souris/)**

## 📋 Règles du jeu

### 🎯 **Objectifs**
- **🐭 Souris** : Faire entrer 9 souris dans le refuge (cases 33-41)
- **🐱 Chats** : Éliminer suffisamment de souris pour rendre impossible la victoire adverse

### 🏁 **Configuration initiale**
- **21 souris** placées sur les cases 1-21 (grenier)
- **2 chats** placés au choix sur la rangée 22-28
- **Refuge** : 9 cases sécurisées (33-41)

### 🎮 **Mécaniques de jeu**

#### **Déplacement des souris**
- Se déplacent sur les cases voisines libres
- **Ne peuvent pas reculer** (règle importante !)
- Objectif : atteindre le refuge

#### **Déplacement des chats**
- Se déplacent sur les cases voisines libres
- **Ne peuvent pas entrer dans le refuge**
- **Prise obligatoire** : doivent capturer une souris si possible
- Capture par **saut** (comme aux dames)
- **Règle du soufflage** : un chat qui ne prend pas quand il le peut est pénalisé

### 🏆 **Conditions de victoire**
- **Souris gagnent** : 9 souris dans le refuge OU chats bloqués
- **Chats gagnent** : moins de 9 souris restantes OU souris bloquées

## 🎯 Fonctionnalités

### ✨ **Interface utilisateur**
- Plateau interactif avec 41 cases numérotées
- Visualisation claire des connexions entre cases
- Indication visuelle des mouvements possibles
- Sélection intuitive par clic de souris

### 🧠 **Gestion du jeu**
- Validation automatique des règles
- Détection des prises obligatoires
- Vérification des conditions de victoire
- Historique complet des coups

### 💾 **Fonctionnalités avancées**
- **Sauvegarde/Chargement** de partie (localStorage)
- **Annulation** du dernier coup
- **Historique détaillé** des mouvements
- **Compteurs en temps réel** (souris, refuge, etc.)

## 🏗️ Structure du projet

```
chat-et-souris/
├── index.html          # Interface principale
├── style.css           # Styles et animations
├── script.js           # Logique de jeu complète
└── README.md           # Documentation
```

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique du plateau
- **CSS3** : Design responsive, animations, effets visuels
- **JavaScript ES6+** : Logique de jeu, validation des règles, IA
- **LocalStorage** : Sauvegarde des parties
- **GitHub Pages** : Hébergement gratuit

## 🚀 Installation et déploiement

### **Déploiement sur GitHub Pages**

1. **Créer un nouveau dépôt**
   ```bash
   # Sur GitHub, créez un dépôt nommé "chat-et-souris"
   ```

2. **Cloner et ajouter les fichiers**
   ```bash
   git clone https://github.com/votre-username/chat-et-souris.git
   cd chat-et-souris
   
   # Ajoutez les 3 fichiers : index.html, style.css, script.js
   ```

3. **Activer GitHub Pages**
   - Aller dans Settings → Pages
   - Source : "Deploy from a branch"
   - Branch : `main` → Folder : `/ (root)`

4. **Accéder au jeu**
   - URL : `https://votre-username.github.io/chat-et-souris/`

### **Test en local**

```bash
# Cloner le projet
git clone https://github.com/votre-username/chat-et-souris.git
cd chat-et-souris

# Ouvrir avec un serveur local (optionnel)
python -m http.server 8000
# ou
npx serve

# Ouvrir index.html dans le navigateur
```

## 🎯 Architecture technique

### **Classes principales**

#### **ChatSourisGame**
```javascript
class ChatSourisGame {
    constructor() {
        this.boardConnections = {}; // Topologie du plateau
        this.cellPositions = {};    // Positions visuelles
        this.gameState = {};        // État complet du jeu
    }
}
```

#### **Structure de données du plateau**
- **41 cases** numérotées (1-32 grenier, 33-41 refuge)
- **Graphe de connexions** définissant les mouvements possibles
- **Positions calculées** pour l'affichage responsive

#### **Gestion d'état**
```javascript
gameState = {
    currentPlayer: 'mouse',     // Tour actuel
    pieces: {},                 // Position des pièces
    selectedPiece: null,        // Pièce sélectionnée
    moveHistory: [],           // Historique complet
    gameStatus: 'playing',     // État de la partie
    mustCapture: false         // Prise obligatoire
}
```

### **Algorithmes clés**

#### **Validation des mouvements**
- Vérification des connexions topologiques
- Contrôle des règles spécifiques (recul, refuge)
- Détection des captures possibles

#### **Détection de capture**
- Calcul vectoriel pour la direction de saut
- Vérification de la case d'atterrissage
- Gestion des prises multiples

#### **Conditions de victoire**
- Comptage dynamique des pièces
- Vérification des mouvements possibles
- Détection des situations de blocage

## 🎨 Design et UX

### **Interface responsive**
- Adaptation automatique mobile/desktop
- Plateau redimensionnable
- Contrôles tactiles optimisés

### **Feedback visuel**
- **Cases sélectionnées** : surbrillance dorée
- **Mouvements possibles** : bordure bleue pulsante
- **Captures** : bordure rouge animée
- **Refuge** : fond vert distinctif

### **Animations**
- Transitions fluides pour les sélections
- Effets de capture avec rotation
- Messages contextuels temporisés

## 📊 Métriques du jeu

- **Complexité du plateau** : 41 cases, ~120 connexions
- **Espace d'état** : ~10^15 positions possibles
- **Profondeur moyenne** : 30-50 coups par partie
- **Facteur de branchement** : 2-8 mouvements par tour

## 🔄 Améliorations futures

### **Phase 1 : IA**
- [ ] Intelligence artificielle pour jouer contre l'ordinateur
- [ ] Algorithme minimax avec élagage alpha-beta
- [ ] Niveaux de difficulté progressifs
- [ ] Évaluation heuristique avancée

### **Phase 2 : Multijoueur**
- [ ] Mode en ligne avec WebSockets
- [ ] Salles de jeu privées
- [ ] Système de classement ELO
- [ ] Replay des parties

### **Phase 3 : Analytics**
- [ ] Statistiques détaillées des parties
- [ ] Analyse des ouvertures populaires
- [ ] Base de données des parties célèbres
- [ ] Tutoriel interactif

## 🐛 Debug et développement

### **Mode debug**
```javascript
// Activer le mode debug dans la console
game.debugMode = true;

// Afficher l'état complet
console.log(game.gameState);

// Forcer un mouvement
game.executeMove(from, {to: destination, type: 'move'});
```

### **Tests automatisés**
```javascript
// Tester les règles de base
function testBasicRules() {
    const game = new ChatSourisGame();
    // Tests unitaires des fonctions critiques
}
```

## 🤝 Contributions

Les contributions sont bienvenues ! 

### **Comment contribuer**
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

### **Standards de code**
- ES6+ moderne
- Documentation JSDoc
- Tests unitaires pour les fonctions critiques
- Code review obligatoire

## 📜 Licence

Ce projet est sous licence **MIT**. Voir [LICENSE](LICENSE) pour plus de détails.

## 🎓 Contexte académique

Projet développé dans le cadre d'un cours de programmation, adaptant un cahier des charges C original en application web moderne. Démonstration de :

- **Analyse de requirements** complexes
- **Architecture logicielle** modulaire  
- **Algorithmes de jeu** avancés
- **Interface utilisateur** intuitive
- **Déploiement web** professionnel

## 📞 Contact

- **GitHub** : [@votre-username](https://github.com/timso-dev)
- **Issues** : [Signaler un bug](https://github.com/timso-dev/Jeu-de-chat-et-souris/issues)

---

**⭐ N'hésitez pas à mettre une étoile si ce projet vous a plu !**

*Développé avec passion pour l'apprentissage* 🎯
