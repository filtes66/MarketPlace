import { useEffect, useRef } from 'react';

const useSliderLogic = (refRightButton, refLeftButton, refsItems, criteria) => {

    const indexNext = useRef(0); const indexPrev = useRef(1);
    const coordCriteria = useRef([]);
    const coordLeftButton = useRef({});
    const coordRightButton = useRef({});
    const isTranslateActive = useRef(false);
    const isActiveNext = useRef(true);
    const isActivePrev = useRef(true);
    const hasFirstRendered = useRef(false);

    useEffect(() => {
        // criteria items position
        coordCriteria.current = refsItems.current.map((ref) =>
            ref.current.getBoundingClientRect(),
        );
        // button position
        coordRightButton.current = refRightButton.current.getBoundingClientRect();
        coordLeftButton.current = refLeftButton.current.getBoundingClientRect();
        // Index of first criteria item located just after right button
        indexNext.current = coordCriteria.current.findIndex((rect) => {
            return rect.right > coordRightButton.current.left;
        });
        indexNext.current += 1;
        hasFirstRendered.current = true;
    }, [criteria]);

    const nextTranslationSlider = (nbSlides) => {
        // Next criteria item belongs to the criteria list - Next and Previous item caculated
        if (coordCriteria.current.length - indexNext.current - nbSlides >= 0) {
            isTranslateActive.current = true;
            isActivePrev.current = true;
            indexNext.current += nbSlides;
            indexPrev.current += nbSlides;
            // Next criteria item outside the criteria list - Next and Previous item caculated
        } else if (isActiveNext.current) {
            indexPrev.current = indexPrev.current + coordCriteria.current.length - indexNext.current;
            indexNext.current = coordCriteria.current.length;
            isActiveNext.current = false;
        }
        // Slider translatation value calculated
        if (isTranslateActive.current) {
            const delta =
                coordCriteria.current[indexNext.current - 1].right - coordRightButton.current.left;

            if (indexNext.current === coordCriteria.current.length) { isTranslateActive.current = false }
            return -delta;
        }
    }

    const prevTranslationSlider = (nbSlides) => {
        // previous criteria item belongs to the criteria list - Next and Previous item caculated
        if (indexPrev.current - nbSlides > 0) {
            isTranslateActive.current = true;
            isActiveNext.current = true;
            indexPrev.current -= nbSlides;
            indexNext.current -= nbSlides;
            //  Previous criteria item outside the criteria list - Next and Previous item caculated
        } else if (isActivePrev.current) {
            indexNext.current = indexNext.current - indexPrev.current + 1;
            indexPrev.current = 1;
            isActivePrev.current = false;
        }
        // Slider translatation value calculated
        if (isTranslateActive.current) {
            const delta =
                coordLeftButton.current.right - coordCriteria.current[indexPrev.current - 1].left;

            if (indexPrev.current === 1) { isTranslateActive.current = false };
            return delta;
        }
    }
    return { nextTranslationSlider, prevTranslationSlider }
}

export { useSliderLogic }