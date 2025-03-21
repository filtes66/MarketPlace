import { GALLERY_NAMES } from "./galleryNames";

const criteria = [
    { name: GALLERY_NAMES.PARIS, subCriteria: null },
    { name: GALLERY_NAMES.BUILDINGS, subCriteria: null },
    { name: GALLERY_NAMES.NEIGHBORHOODS, subCriteria: null },
    {
        name: GALLERY_NAMES.DISTRICTS,
        subCriteria: [
            { name: GALLERY_NAMES.FIRST },
            { name: GALLERY_NAMES.SECOND },
            { name: GALLERY_NAMES.THIRD },
            { name: GALLERY_NAMES.FOURTH },
            { name: GALLERY_NAMES.FIFTH },
            { name: GALLERY_NAMES.SIXTH },
            { name: GALLERY_NAMES.SEVENTH },
            { name: GALLERY_NAMES.EIGHTH },
            { name: GALLERY_NAMES.NINTH },
            { name: GALLERY_NAMES.TENTH },
            { name: GALLERY_NAMES.ELEVENTH },
            { name: GALLERY_NAMES.TWELFTH },
            { name: GALLERY_NAMES.THIRTEENTH },
            { name: GALLERY_NAMES.FOURTEENTH },
            { name: GALLERY_NAMES.FIFTEENTH },
            { name: GALLERY_NAMES.SIXTEENTH },
            { name: GALLERY_NAMES.SEVENTEENTH },
            { name: GALLERY_NAMES.EIGHTEENTH },
            { name: GALLERY_NAMES.NINETEENTH },
            { name: GALLERY_NAMES.TWENTIETH },
        ],
    },
    { name: GALLERY_NAMES.TOUR_EIFFEL, subCriteria: null },
    { name: GALLERY_NAMES.CHAMPS_ELYSEES, subCriteria: null },
    { name: GALLERY_NAMES.LOUVRE, subCriteria: null },
    { name: GALLERY_NAMES.ARC_DE_TRIOMPHE, subCriteria: null },
    { name: GALLERY_NAMES.PONT_NEUF, subCriteria: null },
    { name: GALLERY_NAMES.CENTRE_POMPIDOU, subCriteria: null },
    { name: GALLERY_NAMES.MUSEE_D_ORSAY, subCriteria: null },
    { name: GALLERY_NAMES.MONTMARTRE, subCriteria: null }
];

export default criteria;