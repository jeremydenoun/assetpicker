module.exports = {
    header: {
        title: {
            en: 'Explorer',
            de: 'Explorer',
            fr: 'Explorer'
        },
        search: {
            en: 'Search',
            de: 'Suchen',
            fr: 'Rechercher'
        },
        minimize: {
            en: 'Minimize',
            de: 'Verkleinern',
            fr: 'Minimiser'
        },
        maximize: {
            en: 'Maximize',
            de: 'Maximieren',
            fr: 'Maximiser'
        }
    },
    login: {
        username: {
            en: 'User name',
            de: 'Benutzername',
            fr: 'Nom d\'utilisateur'
        },
        password: {
            en: 'Password',
            de: 'Passwort',
            fr: 'Mot de passe'
        },
        login: {
            en: 'Login',
            de: 'Anmelden',
            fr: 'Identifiant'
        },
        failure: {
            en: 'Your username or password were wrong',
            de: 'Benutzername oder Passwort sind falsch',
            fr: 'Votre identifiant ou mot de passe est incorret'
        }
    },
    types: {
        file: {
            en: 'File',
            de: 'Datei',
            fr: 'Fichiers'
        },
        dir: {
            en: 'Directory',
            de: 'Verzeichnis',
            fr: 'Dossiers'
        },
        category: {
            en: 'Category',
            de: 'Kategorie',
            fr: 'Catégories'
        }
    },
    descriptor: {
        type: {
            en: 'Item type',
            de: 'Elementtyp',
            fr: 'Type d\'éléments'
        },
        path: {
            en: 'Path',
            de: 'Pfad',
            fr: 'Chemin'
        },
        id: {
            en: 'ID',
            de: 'ID',
            fr: 'ID'
        },
        dimensions: {
            en: 'Dimensions',
            de: 'Abmessungen',
            fr: 'Dimensions'
        },
        created: {
            en: 'Creation date',
            de: 'Erstellungsdatum',
            fr: 'Date de création'
        },
        modified: {
            en: 'Modification date',
            de: 'Änderungsdatum',
            fr: 'Date de modification'
        },
        length: {
            en: 'Length',
            de: 'Länge',
            fr: 'Durée'
        },
        pages: {
            en: 'Pages',
            de: 'Seiten',
            fr: 'Pages'
        }
    },
    link: {
        download: {
            en: 'Download',
            de: 'Herunterladen',
            fr: 'Télécharger'
        },
        open: {
            en: 'Open',
            de: 'Öffnen',
            fr: 'Ouvrir'
        }
    },
    stage: {
        nothingFound: {
            en: 'No proper results found',
            de: 'Keine passenden Ergebnisse gefunden',
            fr: 'Aucun résultat trouvé'
        },
        showAll: {
            en: 'Show all...',
            de: 'Show all...',
            fr: 'Voir tous...'
        },
        noItems: {
            en: 'No items',
            de: 'Keine Elemente',
            fr: 'Pas d\'élements'
        }
    },
    footer: {
        pick: {
            en: 'Select',
            de: 'Auswählen',
            fr: 'Sélectionner'
        },
        cancel: {
            en: 'Cancel',
            de: 'Abbrechen',
            fr: 'Annuler'
        },
        loading: {
            en: 'Loading...',
            de: 'Lade...',
            fr: 'Chargement...'
        },
        searching: {
            en: 'Searching...',
            de: 'Suche...',
            fr: 'Recherche...'
        },
        items: {
            en: '{{summary.numItems}} item{{summary.numItems !== 1 ? "s" : ""}}',
            de: '{{summary.numItems}} Element{{summary.numItems !== 1 ? "e" : ""}}',
            fr: '{{summary.numItems}} élement{{summary.numItems !== 1 ? "s" : ""}}',
        },
        results: {
            en: '{{summary.numItems}} result{{summary.numItems !== 1 ? "s" : ""}}',
            de: '{{summary.numItems}} Ergebnis{{summary.numItems !== 1 ? "se" : ""}}',
            en: '{{summary.numItems}} résultat{{summary.numItems !== 1 ? "s" : ""}}',
        },
        storages: {
            en: '{{numStorages}} Storages',
            de: '{{numStorages}} Speicher',
            en: '{{numStorages}} Stockages'
        },
        picked: {
            en: '{{picked.length}} item{{picked.length !== 1 ? "s" : ""}} picked',
            de: '{{picked.length}} Element{{picked.length !== 1 ? "e" : ""}} ausgewählt',
            fr: '{{picked.length}} élement{{picked.length !== 1 ? "s" : ""}} sélectionné{{picked.length !== 1 ? "s" : ""}}',
        },
        resultsOverview: {
            en: '{{$interpolate(t("footer.results")) + " in " + summary.numStorages + " storage" + (summary.numStorages !== 1 ? "s" : "")}}',
            de: '{{$interpolate(t("footer.results")) + " in " + summary.numStorages + " Speicher" + (summary.numStorages !== 1 ? "n" : "")}}',
            en: '{{$interpolate(t("footer.results")) + " dans " + summary.numStorages + " stockage" + (summary.numStorages !== 1 ? "s" : "")}}',
        }
    },
    date: {
        // https://github.com/taylorhakes/fecha#formatting-tokens
        full: {
            en: 'MM/DD/YYYY HH:mm',
            de: 'DD.MM.YYYY HH:mm',
            en: 'DD/MM/YYYY HH:mm',
        }
    }
};
