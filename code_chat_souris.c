#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#define TAILLE_MAX 1000

typedef struct{
    int joueur;
    char pion;
}caseTab;

typedef struct{
    int y;
    int x;
}coord;

int score1 = 0, score2 = 0;
int turnGlobal = 0;

void initTablier(caseTab tab[7][7]){
    int caseChat;

    for(int i=0;i<7;i++){
        for(int j=0;j<7;j++){
            tab[i][j].joueur = 0;
            tab[i][j].pion = ' ';
        }
    }

    for(int i=0;i<3;i++){
        for(int j=0;j<7;j++){
            tab[i][j].joueur = 1;
            tab[i][j].pion = 'S';
        }
    }

    for(int i=5;i<7;i++){
        for(int j=0;j<7;j++){
            if(j==0 || j == 1 || j==5 || j==6){
                tab[i][j].joueur = 3;
                tab[i][j].pion = 'X';
            }
        }
    }

    for(int i=4;i<7;i++){
        for(int j=0;j<7;j++){
            if(j==2 || j == 3 || j==4){
                tab[i][j].joueur = 4;
                tab[i][j].pion = 'R';
            }
        }
    }

    printf("Le Joueur 'Chat' ! Quelle case pour emplacement du premier pion chat ? (1-7)\n\n");
    scanf("%i",&caseChat);
    while(caseChat<1 || caseChat>7){
        printf("Case entre 1-7 : \n\n");
        scanf("%i",&caseChat);
    }
    tab[3][caseChat-1].joueur = 2;
    tab[3][caseChat-1].pion = 'C';

    printf("Quelle case pour emplacement du deuxieme pion chat ? (1-7)\n\n");
    scanf("%i",&caseChat);
    while(caseChat<1 || caseChat>7 || tab[3][caseChat-1].joueur == 2){
        printf("Case entre 1-7 et non deja prise : \n\n");
        scanf("%i",&caseChat);
    }
    tab[3][caseChat-1].joueur = 2;
    tab[3][caseChat-1].pion = 'C';
}

void initTablierFirst(caseTab tab[7][7]){
    char number[2];
    for(int j=0;j<7;j++){
        sprintf (number, "%i", j+1);
        tab[3][j].pion = number[0];
    }

    for(int i=0;i<7;i++){
        if(i!=3){
            for(int j=0;j<7;j++){
                tab[i][j].joueur = 0;
                tab[i][j].pion = ' ';
            }
        }
    }
}

void affichDamier(caseTab tab[7][7]){
    int j;
    printf("\n\n                                 ++---------++\n                                 ||JOUEUR  S||\n                                 ++---------++\n");
    printf("                           1   2   3   4   5   6   7\n");
    printf("                        ++---+---+---+---+---+---+---++\n                      1 |");
    for(j=0;j<7;j++){
        printf("| %c ",tab[0][j].pion);
    }
    printf("||\n");
    printf("                        ++---+---+---+---+---+---+---++\n                      2 |");
    for(j=0;j<7;j++){
        printf("| %c ",tab[1][j].pion);
    }
    printf("|| L\n");
    printf("                        ++---+---+---+---+---+---+---++\nSCORE SOURIS : %2i     3 |",score2);
    for(j=0;j<7;j++){
        printf("| %c ",tab[2][j].pion);
    }
    printf("|| I\n");
    printf("                        ++---+---+---+---+---+---+---++\n                      4 |");
    for(j=0;j<7;j++){
        printf("| %c ",tab[3][j].pion);
    }
    printf("|| G\n");
    printf("                        ++---+---+---+---+---+---+---++\nSCORE CHATS : %2i      5 |",score1);
    for(j=0;j<7;j++){
        printf("| %c ",tab[4][j].pion);
    }
    printf("|| N\n");
    printf("                        ++---+---+---+---+---+---+---++\n                      6 |");
    for(j=0;j<7;j++){
        printf("| %c ",tab[5][j].pion);
    }
    printf("|| E\n");
    printf("                        ++---+---+---+---+---+---+---++\n                      7 |");
    for(j=0;j<7;j++){
        printf("| %c ",tab[6][j].pion);
    }
    printf("||\n");
    printf("                        ++---+---+---+---+---+---+---++\n");
    printf("                           C   O   L   O   N   N   E\n");
    printf("                                 ++---------++\n                                 ||JOUEUR  C||\n                                 ++---------++\n\n");
    printf("\n");
}

int firstTurn(int min, int max){
    int turn;
    printf("Le premier joueur a commencer sera choisi au hasard ! Bonne chance !");
    printf("\n\n");
    static int rand_is_seeded = 0;
    if(!rand_is_seeded)
    {
        srand(time(NULL));
        rand_is_seeded = 1;
    }
    return rand()%(max-min+1) + min;
}

int testSiPionValide(caseTab tab[7][7], coord test){
    int i = test.y;
    int j = test.x;
    int pionValide = 0;

    if(turnGlobal%2 == 0){
        if(tab[i-1][j-1].joueur == 2){
            if((tab[i-2][j-2].joueur == 1 && tab[i-3][j-3].joueur == 0 && i!=1 && i!=2 && j!=1 && j!=2) || (tab[i-2][j-2].joueur == 0 && i!=1 && j!=1)){
                pionValide = 1;
            }
            else if((tab[i-2][j-1].joueur == 1 && tab[i-3][j-1].joueur == 0 && i!=1 && i!=2) || (tab[i-2][j-1].joueur == 0 && i!=1)){
                pionValide = 1;
            }
            else if((tab[i-2][j].joueur == 1 && tab[i-3][j+1].joueur == 0 && i!=1 && i!=2 && j!=6 && j!=7) || (tab[i-2][j].joueur == 0 && i!=1 && j!=7)){
                pionValide = 1;
            }
            else if((tab[i-1][j].joueur == 1 && tab[i-1][j+1].joueur == 0 && j!=6 && j!=7) || (tab[i-1][j].joueur == 0 && j!=7 )){
                pionValide = 1;
            }
            else if((tab[i][j].joueur == 1 && tab[i+1][j+1].joueur == 0 && i!=6 && i!=7 && j!=6 && j!=7) || (tab[i][j].joueur == 0 && i!=7 && j!=7)){
                pionValide = 1;
            }
            else if((tab[i][j-1].joueur == 1 && tab[i+1][j-1].joueur == 0 && i!=6 && i!=7) || (tab[i][j-1].joueur == 0 && i!=7)){
                pionValide = 1;
            }
            else if((tab[i][j-2].joueur == 1 && tab[i+1][j-3].joueur == 0 && i!=6 && i!=7 && j!=1 && j!=2) || (tab[i][j-2].joueur == 0 && i!=7 && j!=1)){
                pionValide = 1;
            }
            else if((tab[i-1][j-2].joueur == 1 && tab[i-1][j-2].joueur == 0 && j!=1 && j!=2) || (tab[i-1][j-2].joueur == 0 && j!=1)){
                pionValide = 1;
            }
        }
    }
    else{
        if(tab[i-1][j-1].joueur == 1){
            if((tab[i-1][j].joueur == 0 || tab[i-1][j].joueur == 4) && j!=7 ){
                pionValide = 1;
            }
            else if((tab[i][j].joueur == 0 || tab[i][j].joueur == 4) && i!=7 && j!=7){
                pionValide = 1;
            }
            else if((tab[i][j-1].joueur == 0 || tab[i][j-1].joueur == 4) && i!=7){
                pionValide = 1;
            }
            else if((tab[i][j-2].joueur == 0 || tab[i][j-2].joueur == 4) && i!=7 && j!=1){
                pionValide = 1;
            }
            else if((tab[i-1][j-2].joueur == 0 || tab[i-1][j-2].joueur == 4) && j!=1){
                pionValide = 1;
            }
        }
    }
    return pionValide;
}

int testSiCaseValide(caseTab tab[7][7],coord test, coord pion){
    int i = pion.y-1;
    int j = pion.x-1;
    int valideOrNot = 0;
    test.y = test.y-1;
    test.x = test.x-1;
    int compteur = 0;

    if(turnGlobal%2 == 0){
        if((test.y == i-1 && test.x == j-1 && i!=0 && j!=0) || (test.y == i-1 && test.x == j && i!=0) || (test.y == i && test.x == j+1 && j!=6) || (test.y == i && test.x == j-1 && j!=0) || (test.y == i+1 && test.x == j && i!=6) || (test.y == i+1 && test.x == j-1 && i!=6 && j!=0) || (test.y == i-1 && test.x == j+1 && i!=0 && j!=6) || (test.y == i+1 && test.x == j+1 && i!=6 && j!=6)){
            if(tab[i][j].joueur == 2){
                if(tab[test.y][test.x].joueur == 0){
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
            }
        }
        else if((test.y == i-2 && test.x == j-2 && i!=1 && j!=1) || (test.y == i+2 && test.x == j-2 && i!=8 && j!=1) || (test.y == i-2 && test.x == j+2 && i!=1 && j!=8) || (test.y == i+2 && test.x == j+2 && i!=8 && j!=8)){
            if(tab[test.y][test.x].joueur == 0){
                if(test.y == i-2 && test.x == j-2 && tab[i-1][j-1].joueur == 1){
                    tab[i-1][j-1].joueur = 0;
                    tab[i-1][j-1].pion = ' ';
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    score1 ++;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
                else if(test.y == i-2 && test.x == j && tab[i-1][j].joueur == 1){
                    tab[i-1][j].joueur = 0;
                    tab[i-1][j].pion = ' ';
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    score1 ++;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
                else if(test.y == i+2 && test.x == j-2 && tab[i+1][j-1].joueur == 1){
                    tab[i+1][j-1].joueur = 0;
                    tab[i+1][j-1].pion = ' ';
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    score1 ++;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
                else if(test.y == i+2 && test.x == j && tab[i+1][j].joueur == 1){
                    tab[i+1][j].joueur = 0;
                    tab[i+1][j].pion = ' ';
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    score1 ++;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
                else if(test.y == i-2 && test.x == j+2 && tab[i-1][j+1].joueur == 1){
                    tab[i-1][j+1].joueur = 0;
                    tab[i-1][j+1].pion = ' ';
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    score1 ++;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
                else if(test.y == i && test.x == j+2 && tab[i][j+1].joueur == 1){
                    tab[i][j+1].joueur = 0;
                    tab[i][j+1].pion = ' ';
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    score1 ++;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
                else if(test.y == i+2 && test.x == j+2 && tab[i+1][j+1].joueur == 1){
                    tab[i+1][j+1].joueur = 0;
                    tab[i+1][j+1].pion = ' ';
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    score1 ++;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
                else if(test.y == i && test.x == j-2 && tab[i][j-1].joueur == 1){
                    tab[i][j-1].joueur = 0;
                    tab[i][j-1].pion = ' ';
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    score1 ++;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    valideOrNot = 1;
                    affichDamier(tab);
                }
            }
        }
    }
    else{
        if((test.y == i && test.x == j+1 && j!=6) || (test.y == i && test.x == j-1 && j!=0) || (test.y == i+1 && test.x == j && i!=6) || (test.y == i+1 && test.x == j-1 && i!=6 && j!=0) || (test.y == i+1 && test.x == j+1 && i!=6 && j!=6)){
            if(tab[i][j].joueur == 1){
                if(tab[test.y][test.x].joueur == 0 || tab[test.y][test.x].joueur == 4){
                    tab[test.y][test.x].joueur = tab[i][j].joueur;
                    tab[test.y][test.x].pion = tab[i][j].pion;
                    tab[i][j].joueur = 0;
                    tab[i][j].pion = ' ';
                    if((i==6 || i==5 || i==4) && (j==2 || j==3 || j==4)){
                        tab[i][j].joueur = 4;
                        tab[i][j].pion = 'R';
                    }
                    for(int n=2;n<4;n++){
                        for(int v=4;v<6;v++){
                            if(tab[v][n].joueur == 1){
                                compteur ++;
                            }
                        }
                    }
                    score2 = compteur;
                    valideOrNot = 1;
                    affichDamier(tab);
                }
            }
        }
    }
    return valideOrNot;
}

int finDePartie(caseTab tab[7][7]){
    int gagnant = 0;
    int compteur = 0;

    for(int i=0;i<7;i++){
        for(int j=0;j<7;j++){
            if(tab[i][j].joueur == 1){
                compteur++;
            }
        }
    }

    if(score2 == 9){
        gagnant = 2;
    }
    else if(score1 == 21 || compteur < 9){
        gagnant = 1;
    }
    return gagnant;
}

void choixCase(caseTab tab[7][7], coord piontest){
    int valide = 0;
    char joueur;
    coord coordonneeCase;

    if(turnGlobal%2 == 0){
        joueur = 'C';
    }
    else{
        joueur = 'S';
    }
    printf("Selection Case Joueur %c :\n\n", joueur);
    printf("Colonne : ");
    scanf("%i", &coordonneeCase.x);
    while(coordonneeCase.x < 1 || coordonneeCase.x > 7){
        printf("ERREUR CHOIX\n");
        printf("Colonne : ");
        scanf("%i", &coordonneeCase.x);
    }
    printf("Ligne : ");
    scanf("%i", &coordonneeCase.y);
    while(coordonneeCase.y < 1 || coordonneeCase.y > 7){
        printf("ERREUR CHOIX\n");
        printf("Ligne : ");
        scanf("%i", &coordonneeCase.y);
    }
    printf("\n\n");

    valide = testSiCaseValide(tab,coordonneeCase,piontest);

    if(valide == 0){
        printf("Impossible de jouer cette case ! \n\n");
        choixCase(tab,piontest);
    }
    else if(valide == 1){
        turnGlobal ++;
    }
}

void saveGame(char *s, caseTab tab[7][7]) {
   FILE *file;
   char *element = malloc(sizeof(char));
   file = fopen(s, "w+");
   for(int i = 0; i<7 ; i++) {
        for(int j = 0; j<7 ; j++) {
            sprintf(element, "%i", tab[i][j].joueur);
            element[1] = '\0';
            fprintf(file, element);
            if(j+1<7)
                fprintf(file, ";");
        }
        fprintf(file, "\n");
   }
   fclose(file);
}

void choixPion(caseTab tab[7][7]){
    coord coordonnee;
    char joueur;
    int valideOrNot;
    int gagnant = 0;

    if(turnGlobal%2 == 0){
        joueur = 'C';
    }
    else{
        joueur = 'S';
    }
    printf("Selection Pion Joueur %c :\n", joueur);
    printf("(Taper 0 pour enregistrer la partie et quitter)\n\n");
    printf("Colonne : ");
    scanf("%i", &coordonnee.x);
    if(coordonnee.x==0){
        saveGame("C:\\Users\\will_\\Desktop\\CHATSOURIS\\TP1_BE.txt",tab);
        return;
    }
    while(coordonnee.x < 1 || coordonnee.x > 7){
        printf("ERREUR CHOIX\n");
        printf("Colonne : ");
        scanf("%i", &coordonnee.x);
    }
    printf("Ligne : ");
    scanf("%i", &coordonnee.y);
    while(coordonnee.y < 1 || coordonnee.y > 7){
        printf("ERREUR CHOIX\n");
        printf("Ligne : ");
        scanf("%i", &coordonnee.y);
    }
    printf("\n\n");

    valideOrNot = testSiPionValide(tab,coordonnee);

    if(valideOrNot == 0){
        printf("Impossible de jouer ce pion !\n\n");
        choixPion(tab);
    }

    choixCase(tab, coordonnee);
    gagnant = finDePartie(tab);
    if(gagnant == 1){
        printf("Le Joueur C gagne la partie avec : %i pions\n\n",score1);
        return;
    }
    else if(gagnant == 2){
        printf("Le Joueur S gagne la partie avec : %i pions\n\n",score2);
        return;
    }
    choixPion(tab);
}

char joueurToPion(int joueur) {
    switch(joueur){
        case 1:
            return 'S';
            break;
        case 2:
            return 'C';
            break;
        case 3:
            return 'X';
            break;
        case 4:
            return 'R';
            break;
        default:
            return ' ';
    }
}


/*void getSavedGame(char *s, caseTab tab[7][7]) {
    FILE * fp;

    fp = fopen(s, "r");
    if (fp == NULL){
        printf("%s", "Impossible de recuperer la sauvegarde \n");
        return;
    }
    int i = 0, j = 0, max = 15;
    char * buffer = (char *) malloc( max );
    while ( ! feof( fp ) ) {
        fgets( buffer, max, fp );
        if (ferror( fp )) {
            fprintf( stderr, "Reading error with code %d\n", errno );
            break;
        }
        puts( buffer );
        j = 0;
        for(int k = 0; k<max ; k++) {
            if(buffer[k] != ';' && buffer[k] != ' ' && buffer[k] != '\0' && j<7 && i<7){
                tab[i][j].joueur = buffer[k] - '0';
                tab[i][j].pion = joueurToPion(tab[i][j].joueur);
                j++;
            }
        }
        i++;
    }
    fclose(fp);
}*/

int main() {
    system("color F4");
    int choix;
    int turn;

    char regles[TAILLE_MAX] = "";
    caseTab damier[7][7];
    FILE* fichier = NULL;

    printf("CHATS ET SOURIS\n\nMenu\n\n1.Jouer\n2.Reprendre une partie\n3.Instructions\n4.Quitter\n\n");
    scanf("%i",&choix);
    printf("\n\n");

    while(choix < 1 || choix > 4){
        printf("Erreur de choix !\n\n");
        printf("1.Jouer\n2.Reprendre une partie\n3.Instructions\n4.Quitter\n\n");
        scanf("%i",&choix);
        printf("\n\n");
    }

    while(choix==1 || choix==2 || choix==3){
        switch(choix){
        case 1:
            initTablierFirst(damier);
            affichDamier(damier);
            initTablier(damier);
            affichDamier(damier);
            turn=firstTurn(1, 2);
            if(turn == 1){
                turnGlobal = 0;
                printf("les chats commencent !\n");
            }
            else{
                turnGlobal = 1;
                printf("les souris commencent !\n");
            }
            choixPion(damier);
            printf("1.Jouer\n2.Reprendre une partie\n3.Instructions\n4.Quitter\n\n");
            scanf("%i",&choix);
            printf("\n\n");
            break;
        case 2:
            //getSavedGame("C:\\Users\\will_\\Desktop\\CHATSOURIS\\TP1_BE.txt",damier);
            affichDamier(damier);
            turn = firstTurn(1, 2);
            if(turn == 1){
                turnGlobal = 0;
                printf("les chats commencent !\n");
            }
            else{
                turnGlobal = 1;
                printf("les souris commencent !\n");
            }
            choixPion(damier);
            printf("1.Jouer\n2.Reprendre une partie\n3.Instructions\n4.Quitter\n\n");
            scanf("%i",&choix);
            printf("\n\n");
            break;
        case 3:
            fichier = fopen("\\Users\\will_\\Desktop\\CHATSOURIS\\regles.txt", "r");
            while (fgets(regles, TAILLE_MAX, fichier) != NULL)
            printf(" %s\n", regles);
            fclose(fichier);
            printf("1.Jouer\n2.Reprendre une partie\n3.Instructions\n4.Quitter\n\n");
            scanf("%i",&choix);
            printf("\n\n");
            break;
        case 4:
            return 0;
            break;
        default:
            printf("Erreur de choix !\n\n");
            printf("1.Jouer\n2.Reprendre une partie\n3.Instructions\n4.Quitter\n\n");
            scanf("%i",&choix);
            printf("\n\n");
            break;
        }
    }
    return 0;
}