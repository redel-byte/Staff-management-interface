Staff Management Interface – Front-End Project

Optimisation de l’interface utilisateur d’une application web

Description du projet

Ce projet consiste à développer une interface web moderne, intuitive et responsive permettant la gestion visuelle des employés au sein des locaux d’une entreprise.
L’utilisateur peut ajouter, déplacer, affecter et retirer les employés sur un plan d’étage interactif, tout en respectant des règles métiers strictes basées sur les rôles.

Le projet doit être conçu pour offrir une expérience utilisateur fluide, un design moderne, et une gestion centralisée des informations du personnel.

Objectifs généraux

Ajouter, déplacer et supprimer des employés depuis une interface graphique.

Appliquer automatiquement les règles métiers d’accès selon le rôle.

Assurer une interface responsive (Desktop, Tablet, Mobile).

Intégrer un design moderne basé sur Flexbox, Grid, des formes arrondies, et des codes couleurs intuitifs.

Centraliser les données du personnel dans une plateforme unique.

 User Stories
 Concepteur UI/UX

Je conçois une interface intuitive, fluide et cohérente.

Je définis une palette de couleurs harmonieuse et des icônes compréhensibles.

Je crée les versions Desktop & Mobile en utilisant Flexbox, Grid, et un style moderne.

 Développeur Front-End
Je crée l’HTML complet avec une sidebar “Unassigned Staff” + bouton Add New Worker.

    J’implémente une modale d’ajout avec :

Nom
Rôle
Photo (URL) + prévisualisation
Email
Téléphone
Expériences professionnelles (formulaire dynamique)
J’affiche le plan d’étage avec 6 zones :
Salle de conférence
Réception
Salle des serveurs
Salle de sécurité
Salle du personnel
Salle d’archives

    J’intègre les règles métier :

Réception → Réceptionnistes uniquement
Salle des serveurs → Techniciens IT
Salle de sécurité → Agents de sécurité
Manager → accès partout
Nettoyage → partout sauf salle d’archives
Autres rôles → accès libre sauf zones restreintes
J’ajoute un bouton X pour retirer un employé d’une zone.
Je permets l’ouverture d’un profil détaillé d’un employé.
J’intègre un bouton + dans chaque zone pour ajouter un employé éligible.
Je mets en rouge pâle les zones vides obligatoires.
Je limite le nombre d’employés par zone.
Je rends l’interface responsive avec animations CSS.
Je valide le code HTML & CSS via W3C Validator.
Je publie le projet sur GitHub Pages ou Vercel.

    Scrum Master

Je planifie les tâches (Trello, Jira ou GitHub Projects).
Je gère les branches Git (optionnel).
Je réalise une démonstration claire du projet final.

    Tailles d’écrans à gérer

Portrait
1280px : Grand écran
1024–1279px : Petit écran
768–1023px : Tablette
<767px : Mobile
Paysage
768–1023px : Mobile
1024–1279px : Tablette

    Bonus optionnels

Drag & Drop entre zones
Bouton Edit pour modifier un employé
Recherche et filtrage par nom/rôle
Sauvegarde automatique avec localStorage
Mode “Réorganisation automatique”
Photo par défaut si aucune image fournie

    Technologies utilisées

HTML5 / CSS3
JavaScript
Flexbox & CSS Grid
Modales dynamiques
LocalStorage (optionnel)
Git & GitHub
GitHub Pages / Vercel

    Structure du projet
/assets
    /img
    /css
    /js
index.html
README.md

    Installation & Lancement

Cloner le repo
git clone https://github.com/redel-byte/Staff-management-interface
Ouvrir le fichier
index.html

    Validation W3C

HTML validator : https://validator.w3.org/
CSS validator : https://jigsaw.w3.org/css-validator/