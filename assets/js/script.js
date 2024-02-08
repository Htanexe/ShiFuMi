//Initialisation des sections
let section = document.querySelectorAll('section');
let sectionAccueil = section[0];
let sectionPerso = section[1];
let sectionBattle = section[2];
let sectionRules = section[3];

//Initialisation du texte qui affiche le nombre de manche
let round = document.querySelector('.battle h1');

//Initialisation du texte qui affiche le score de l'ordinateur et du joueur
let playerScore = document.querySelector('.score h2');
let botScore = document.querySelectorAll('.score h2')[1];

//Initialisation des images qui seront les futurs choix
let allChoice = document.querySelectorAll('.choice');
let scissors = allChoice[0];
let rock = allChoice[1];
let paper = allChoice[2];

//Initialisation du texte qui affichera les résultats
let result = document.createElement('p');

//Initialisation des différents boutons
let playButton = sectionAccueil.querySelectorAll('h2')[0];
let persoButton = sectionAccueil.querySelectorAll('h2')[1];
let ruleButton = sectionAccueil.querySelectorAll('h2')[2];
let accueilButton = sectionPerso.querySelector('p');
let backRuleButton = sectionRules.querySelector('h3')

//Initialisation des images des skins disponibles
let skin = sectionPerso.querySelectorAll('img');
let steve = skin[0];
let alex = skin[1];
let herobrine = skin[2];
let zombie = skin[3];

//Initialisation des skins et scores du joueur et de l'ordinateur
let persoPlayer = sectionBattle.querySelector ('.Perso-player');
let persoBot = sectionBattle.querySelector ('.Perso-ordi');

//Initialisation de la saisie du pseudo
let pseudo = document.querySelector('input');

//Initialisation des différents bruitages
let Sound = document.querySelectorAll('audio');
let click = Sound[0]
let equalityGame = Sound[1]
let equalityRound = Sound[2]
let looseGame = Sound[3]
let looseRound = Sound[4]
let winGame = Sound[5]
let winRound = Sound[6]

//Initialisation d'une balise qui prendra la dernière section afficher
let lastSection = sectionAccueil;

//Création d'une fonction qui affiche la section en paramètres et cachent les restantes
let show = (sectionToShow) => {
    section.forEach(element => {
        element.style.display = 'none';
    });
    sectionToShow.style.display = 'flex';
    if (sectionToShow !== sectionRules){
        lastSection = sectionToShow
    }
};

//Création d'une balise img pour afficher l'avatar qui sera initialement celle de "steve"
let avatarPlayer = document.createElement('img'); //On crée la balise
persoPlayer.appendChild(avatarPlayer); //On dit qu'elle est l'enfant de notre section persoPlayer
avatarPlayer.style.height='8vh'; //On lui précise sa taille
avatarPlayer.src="./assets/media/steve.jpg"; //On lui donne la source de steve, celle par défaut

//Création d'une fonction qui changera la src du précédent avatar
let AddAvatar = (avatar) => { //le paramètre décidera de la source
    switch (avatar) {
        case 'steve': //Par exemple si en paramètre il y a steve...
            avatarPlayer.src="./assets/media/steve.jpg"; //...la src sera celle de Steve
            break; //Et on casse la boucle
        case 'alex':
            avatarPlayer.src="./assets/media/alex.jpg";
            break;
        case 'herobrine':
            avatarPlayer.src="./assets/media/herobrine.jpg";
            break;
        case 'zombie':
            avatarPlayer.src="./assets/media/zombie.png";
            break;
    };
};

//Création d'une fonction qui ajoute la class "select" à l'img mis en paramètre
let selectSkin = (skinChoose) => {
    skin.forEach(element => { //On parcours tous les skins (img)
        element.classList.remove('select'); //Et on leurs retirent la class pour partir de zéro
    });
    skinChoose.classList.add('select'); //Et on ajoute à la classe au skin choisis
};

//Création d'événement sur les skins
steve.addEventListener('click', () => { //Si le skin de steve est choisi
    selectSkin(steve); //On appelle la fonction de sélection avec steve en paramètre
    AddAvatar('steve'); //Et celle pour ajouter l'avatar sur l'écran de jeu
});
alex.addEventListener('click', () => { //La même chose pour les autres skins...
    selectSkin(alex);
    AddAvatar('alex');
});
herobrine.addEventListener('click', () => {
    selectSkin(herobrine);
    AddAvatar('herobrine');
});
zombie.addEventListener('click', () => {
    selectSkin(zombie);
    AddAvatar('zombie');
});

//On oublie pas d'ajouter un avatar pour l'ordinateur comme pour le joueur
let avatarOrdi = document.createElement('img');
persoBot.appendChild(avatarOrdi);
avatarOrdi.style.height='8vh';

let rand = Math.floor(Math.random() * skin.length); //On prends aléatoirement un skin
avatarOrdi.src=(skin[rand].src); //Et on lui prends sa source pour l'ajouter à celle crée précédemment

//Création de tous les boutons
//Le bouton du menu pour jouer
playButton.addEventListener('click', () => { //Si le bouton pour jouer est cliquer...
    click.play() //On lance l'audio du click
    winPlayer = 0; //On réintialise la variable des manches gagner du joueur
    winBot = 0; //On réintialise la variable des manches gagner de l'ordinateur
    numberRound = 0; //On réintialise la variable du nombre de manche
    if (pseudo.value === ''){ //Si la valeur du pseudo n'as pas était saisie
        pseudo.value = 'Joueur'; //Le pseudo par défaut sera "joueur"
    };
    hideElement('show'); //On affiche les éléments de la page
    round.textContent = 'Manche 1'; //On affiche la première manche
    playerScore.textContent = "Score " + pseudo.value + " : 0"; //On affiche le score du joueur avec son pseudo
    botScore.textContent = "Score Ordinateur : 0"; //Ainsi que celui de l'ordinateur
    result.style.display = 'none'; //On n'affiche pas encore la page du résultat

    show(sectionBattle); //Et on affiche la page du jeu
});
//Le bouton du menu pour personnaliser son avatar et son pseudo
persoButton.addEventListener('click', () => {
    click.play() //Lance l'audio du bouton cliquer de minecraft
    show(sectionPerso); //Affiche la section en question
    pseudo.value = ''; //Efface la value du pseudo pour laisser le joueur l'utiliser
});

//Le bouton du menu pour voir les règles
ruleButton.addEventListener('click', () => {
    click.play()
    show(sectionRules);
});

//Le bouton de retour des règles
backRuleButton.addEventListener('click', () => {
    click.play()
    show(sectionAccueil)
})

//Le bouton de la page personnaliser pour aller à l'accueil
accueilButton.addEventListener('click', () => {
    click.play()
    show(sectionAccueil);
});

//-------------------------------------------------- L'algorithme du jeu ! --------------------------------------------------
//On crée une fonction pour le choix de l'ordinateur qui sera aléatoire
let choiceBot = () => {
    let choice = ['Ciseaux', 'Pierre', 'Papier']; //On crée une liste avec toutes les choix
    let rand = Math.floor(Math.random() * choice.length); //On saisi un élément aléatoirement dans la liste
    return choice[rand]; //Et on le renvoie !
};
//On établit le choix du joueur
let choicePlayer; //On initialise une variable qui stockera le choix du joueur
scissors.addEventListener('click', () => { //Si l'image de la cisaille sera cliquer...
    choicePlayer = 'Ciseaux'; //Le choix du joueur sera les "ciseaux"
    compareChoice(choicePlayer, choiceBot()); //Et on lance la fonction qui compare le choix de l'ordinateur et du joueur
});
rock.addEventListener('click', () => { //De même pour la pierre
    choicePlayer = 'Pierre';
    compareChoice(choicePlayer, choiceBot());
});
paper.addEventListener('click', () => { //De même pour le papier
    choicePlayer = 'Papier';
    compareChoice(choicePlayer, choiceBot());
});


//On initialise les valeurs affichées...
let winPlayer; //Le nombre de manche gagner par le joueur
let winBot; //Le nombre de manche gagner par l'ordinateur
let numberRound; //Le nombre de manche

//On crée une fonction qui vas comparer les 2 choix (celui du joueur et celui du bot)
let compareChoice = (choice_player,choice_bot) => {
    sectionBattle.appendChild(result); //On ajoute result comme enfant à la page de jeu
    result.style.display = 'flex'; //On l'affiche
    result.style.textAlign = 'center'; //On le centre
    result.style.color='white'; //On le coloris en blanc

    //Si il y a le même choix dans les 2 camps
    if (choice_player === choice_bot){
        result.style.color='yellow'; //On affiche le texte en jaune
        result.innerHTML = `${pseudo.value} : ${choice_player}  |  Ordinateur : ${choice_bot} <br> Égalité ?!`; //On affiche le message d'égalité
        equalityRound.play() //Et on joue le son d'égalité du round
    }
    //Si il y a une victoire pour le joueur (donc si l'ordinateur n'as pas eu le choix qui bats celui du joueur)
    else if ((choice_player === 'Ciseaux' && choice_bot !== 'Pierre') || (choice_player === 'Pierre' && choice_bot !== 'Papier') || (choice_player === 'Papier' && choice_bot !== 'Ciseaux')){  
        result.innerHTML = `${pseudo.value} : ${choice_player}  |  Ordinateur : ${choice_bot} <br> Vous avez gagné la manche !`; //On affiche le message de victoire
        winPlayer++; //On incrémente les victoires du joueur
        result.style.color='#4eff4e'; //On affiche le texte en vert
        playerScore.textContent = "Score " + pseudo.value + " : " + winPlayer; //On change le score du joueur avec ces victoires
        winRound.play() //Et on joue le son de la victoire de la manche
    //Sinon, il y a une défaite donc..
    }else {
        result.innerHTML = `${pseudo.value} : ${choice_player}  |  Ordinateur : ${choice_bot} <br> Vous avez perdu la manche...`; //On affiche le message de défaite
        result.style.color='#ff2828'; //On affiche le texte en rouge
        winBot++; //On incrémente les victoires de l'ordinateur
        botScore.textContent = "Score Ordinateur : " + winBot; //On change le score de l'ordinateur avec ces victoires
        looseRound.play() //Et on joue le son de défaite de la manche
    }
    numberRound++; //Dans tous les cas on incrémente le nombre de manche
    round.textContent = 'Manche ' + numberRound; //Et on y modifie son affiche avec
    if (numberRound === 10){ //Si le nombre de manches atteint 10 alors...
        endGame(); //On lance la fonction qui arrêtera la partie
    };
};

//Voici une fonction qui cache ou affiche les éléments du jeux pour afficher l'écran de fin de partie
let hideElement = (option) => {
    if (option === 'hide'){ //Si en paramètres il y a "hide"
        //On cache les différents éléments
        round.style.display='none';

        scissors.style.display='none';
        rock.style.display='none';
        paper.style.display='none';

        botScore.style.display='none';
        playerScore.style.display='none';

        avatarPlayer.style.display='none';
        avatarOrdi.style.display='none';

        result.style.fontSize='15vh'; //Et on aggrandis le résultat
    }else { //Si en paramètres il y a autre chose comme Show par exemple
        //On affiche les différents éléments
        round.style.display='flex';

        scissors.style.display='flex';
        rock.style.display='flex';
        paper.style.display='flex';

        botScore.style.display='flex';
        playerScore.style.display='flex';

        avatarPlayer.style.display='flex';
        avatarOrdi.style.display='flex';

        result.style.fontSize='5vh'; //Et on réduis le résultat
    };

};
//La fonction de fin de partie
let endGame = () => { 
    hideElement('hide'); //Elle cache les éléments
    if (winPlayer > winBot){ //Si le joueur a plus de victoire que celle de l'ordinateur
        winGame.play() //On joue le son de victoire
        result.style.color='#4eff4e'; //On affiche le texte en vert
        result.innerHTML = pseudo.value + ' a gagné !'; //On change le message pour annoncer la victoire
    }else if (winBot > winPlayer){ //Si le joueur a moins de victoire que celle de l'ordinateur
        looseGame.play() //On joue le son de défaite
        result.style.color='#ff2828'; //On affiche le texte en rouge
        result.textContent = 'Vous avez perdu...'; //On change le message pour annoncer la défaite
    }else { //Sinon, il y a égalité...
        equalityGame.play()  //On joue le son d'égalité'
        result.style.color='yellow'; //On affiche le texte en jaune
        result.textContent = 'Égalité !'; //On change le message pour annoncer l'égalité
    };
    setTimeout(() => { //On lance un décompte
        show(sectionAccueil); //où on retournera à l'écran d'accueil après 3 secondes
    },3000);
}


// ---------------------------------------------------------------------------------------------------
document.addEventListener('keypress',(key) => { //Si à tous moments une touche est pressée...
    if (key.code === 'KeyE'){ //Et que cette touche est la touche E (comme pour ouvrir son inventaire dans minecraft)
        if (sectionRules.style.display === 'none'){ //Si la page des règles n'est pas afficher..
            show(sectionRules); //On l'affiche
        }else { //Sinon..
            show(lastSection); //On affiche la dernière section afficher
        };
    };
});