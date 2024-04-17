const GRID_WIDTH = 1200;
const HEIGHT_RATIO = 300;
const WIDTH_LARGE = 552;
const WIDTH_SMALL = 370;
const WIDTH_RATIO_UPPER = 1.2;
const WIDTH_RATIO_LOWER = 0.8;

function returnPhotosArrays(photoItems) {
    const districtsPhotos = [];
    const neighborhoodPhotos = [];
    const adminPhotos = [];
    const ParisPhotos = [];
    let cond = true;
    for (let i = 1; i <= 20; i++) {
        let districtPhotos = [];
        photoItems.forEach((item) => {
            if (item.arrond === i) {
                districtPhotos.push(item);
            }
            if (item.quartier && cond) {
                neighborhoodPhotos.push(item);
            }
            if (item.bat && cond) {
                adminPhotos.push(item);
            }
            cond && ParisPhotos.push(item);
        });
        cond = false;
        let districtPhotosCopy = JSON.parse(JSON.stringify(districtPhotos));
        districtsPhotos.push(createPhotoGrid(districtPhotosCopy));

    }
    const photosObject = {
        ParisPhotos: createPhotoGrid(JSON.parse(JSON.stringify(ParisPhotos))),
        districtsPhotos: districtsPhotos,
        adminPhotos: createPhotoGrid(adminPhotos),
        neighborhoodPhotos: createPhotoGrid(neighborhoodPhotos),

    };
    return photosObject
}

function createPhotoGrid(photoItems) {
    let currentRow = [];
    let allRows = [];
    let currentWidthSum = 0;
    let currentHeight = 0;
    let scaledHeight = 0;
    let scaledWidth = 0;
    let maxColumns = 0;
    let currentColumns = 0;
    let previousMaxColumns = 0;
    let currentItem = 0;
    let currentRowNumber = 0;
    let totalHeight = 0;

    const handleLargeItem = (photoItem) => {
        currentRow.pop();
        console.log('photoItem.width photoItem.height', photoItem.width, photoItem.height)
        let aspectRatio = photoItem.width / photoItem.height;
        currentHeight = GRID_WIDTH / aspectRatio;
        totalHeight += currentHeight;
        currentRowNumber += 1;
        scaledHeight = (HEIGHT_RATIO * WIDTH_LARGE) / photoItem.width;
        scaledWidth = WIDTH_LARGE;
        console.log('currentHeight, currentWidth', currentHeight, GRID_WIDTH);
        allRows.push([
            {
                ...photoItem,
                currentHeight: currentHeight,
                currentCol: 1,
                totalHeight: totalHeight,
                gridWidth: GRID_WIDTH,
                scaledHeight: scaledHeight,
                scaledWidth: scaledWidth,
                currentWidth: GRID_WIDTH
            },
        ]);
        currentWidthSum = currentWidthSum - photoItem.width;
        currentColumns -= 1;
        maxColumns = previousMaxColumns;
        currentItem -= 1;
    }

    function handleOvershootRow(photoItem) {
        let poppedItem = currentRow.pop();
        photoItems.push(poppedItem);
        //  photoItems.splice(i - 1, 1);
        currentWidthSum = currentWidthSum - photoItem.width;
        currentColumns -= 1;
        maxColumns = previousMaxColumns;
        currentItem -= 1;
    }

    function handleIdealWidth() {
        currentRowNumber += 1;
        currentHeight = (GRID_WIDTH * HEIGHT_RATIO) / currentWidthSum;
        totalHeight += currentHeight;
        currentRow = currentRow.map((item) => {
            let aspectRatio = item.width / item.height;
            let currentWidth = currentHeight * aspectRatio;
            if (item.width > item.height) {
                scaledHeight = (HEIGHT_RATIO * WIDTH_LARGE) / item.width;
                scaledWidth = WIDTH_LARGE;
            } else {
                scaledHeight = (HEIGHT_RATIO * WIDTH_SMALL) / item.width;
                scaledWidth = WIDTH_SMALL;
            }
            return {
                ...item,
                currentHeight: currentHeight,
                totalHeight: totalHeight,
                gridWidth: GRID_WIDTH,
                scaledHeight: scaledHeight,
                scaledWidth: scaledWidth,
                currentWidth: currentWidth
            };
        });
        allRows.push([...currentRow]);
        currentRow = [];
        currentWidthSum = 0;
        currentColumns = 0;
    }

    function handleUnderflow() {
        currentRowNumber += 1;
        currentHeight = HEIGHT_RATIO;
        totalHeight += currentHeight;
        currentRow = currentRow.map((item) => {
            let aspectRatio = item.width / item.height;
            let currentWidth = currentHeight * aspectRatio;
            if (item.width > item.height) {
                scaledHeight = (HEIGHT_RATIO * WIDTH_LARGE) / item.width;
                scaledWidth = WIDTH_LARGE;
            } else {
                scaledHeight = (HEIGHT_RATIO * WIDTH_SMALL) / item.width;
                scaledWidth = WIDTH_SMALL;
            }
            return {
                ...item,
                currentHeight: currentHeight,
                totalHeight: totalHeight,
                gridWidth: GRID_WIDTH,
                scaledHeight: scaledHeight,
                scaledWidth: scaledWidth,
                currentWidth: currentWidth
            };
        });
        allRows.push(currentRow);
        currentRow = [];
        currentWidthSum = 0;
        currentColumns = 0;
    }

    let i = 0;
    let photoItem;

    while (photoItems[i]) {
        photoItem = photoItems[i];
        i++;
        photoItem.width = photoItem.width / photoItem.height * HEIGHT_RATIO;
        photoItem.height = HEIGHT_RATIO;
        currentColumns += 1;
        currentItem++;
        if (currentColumns > maxColumns) {
            previousMaxColumns = maxColumns;
            maxColumns = currentColumns;
        } else { previousMaxColumns = maxColumns };
        currentWidthSum = currentWidthSum + photoItem.width;
        currentRow.push({ ...photoItem, currentCol: currentColumns });

        if (photoItem.width >= GRID_WIDTH) {
            handleLargeItem(photoItem)
        }
        if (currentWidthSum <= GRID_WIDTH * WIDTH_RATIO_UPPER && currentWidthSum >= GRID_WIDTH * WIDTH_RATIO_LOWER) {
            handleIdealWidth()
        }
        if (currentWidthSum > GRID_WIDTH * WIDTH_RATIO_UPPER) {
            handleOvershootRow()
        }

        if (currentWidthSum < GRID_WIDTH * WIDTH_RATIO_LOWER && i === photoItems.length - 1) {
            handleUnderflow();
        }
    }
    return allRows.flat();
}

export { returnPhotosArrays };
