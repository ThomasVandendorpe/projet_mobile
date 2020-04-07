# Projet Mobile

> Groupe 1: Thomas Vandendorpe & Cyprien Eymond Laritaz

## Fonctionnalités implémentées

* TodoListe partagée en lecture et écriture
* Connexion avec Google (Desktop)
* Modification des droits d'accès pas le propriétaire de la liste
* Secouer le téléphone pour inverser l'ordre des items de la liste courante

## Fonctionnalités dont l'implémentation a échoué et la cause

* Connexion avec Facebook: on ne pouvait pas tester si elle fonctionnait avant de mettre en ligne l'application (à cause de la politique de sécurité de Facebook) ce qu'on a fait tard et qu'on n'a pas eu le temps de corriger

## Mode opératoire pour la compilation et le déploiement sur mobile

### Création depuis le dépot

#### Prérequis
1. Installer cordova `npm install -g cordova`
2. Installer ionic `npm install -g @ionic/cli`
3. Installer les dépendances `npm install`
4. Ajouter la plateforme android `ionic cordova platform add android@latest`
5. Ajouter les fichiers d'environnement

#### Build
1. Construire l'application `ionic cordova build android`

### Ou alors

1. Récupérer l'apk sur le dépot Git :)

Pour le déploiement sur mobile on installe l'application avec l'apk