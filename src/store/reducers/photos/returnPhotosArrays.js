// Constants
const HEIGHT_RATIO = 300;
const WIDTH_LARGE = 552;
const WIDTH_SMALL = 370;
const CART_WIDTH_LARGE = 170;
const CART_WIDTH_SMALL = 134;
const WIDTH_RATIO_UPPER = 1.2;
const WIDTH_RATIO_LOWER = 0.8;
const DISTRICT_COUNT = 20;

// Helper function to calculate scaled sizes
/*function calculateScaledSizes(item, largeWidth, smallWidth) {
    let scaledWidth;
    let scaledHeight;
    let cartScaledWidth;
    let cartScaledHeight;
    if (item.width > item.height) {
        scaledHeight = (HEIGHT_RATIO * largeWidth) / item.width;
        scaledWidth = largeWidth;
        cartScaledWidth = smallWidth;
        cartScaledHeight = (HEIGHT_RATIO * smallWidth) / item.width;
    } else {
        scaledHeight = (HEIGHT_RATIO * smallWidth) / item.width;
        scaledWidth = smallWidth;
        cartScaledHeight = HEIGHT_RATIO;
        cartScaledWidth = (HEIGHT_RATIO * smallWidth) / item.height;
    }
    return { scaledWidth, scaledHeight, cartScaledWidth, cartScaledHeight };
}*/

// Main function
function returnPhotosArrays(photoItems, windowSize) {
    let photoItemsCopy = JSON.parse(JSON.stringify(photoItems));
    let GRID_WIDTH = windowSize;
    const districtsPhotos = [];
    const neighborhoodPhotos = [];
    const adminPhotos = [];
    const ParisPhotos = [];
    let isFirstIteration = true;

    for (let i = 1; i <= DISTRICT_COUNT; i++) {
        let districtPhotos = [];
        photoItemsCopy.forEach((item) => {
            if (item.arrond === i) {
                districtPhotos.push(item);
            }
            if (item.quartier && isFirstIteration) {
                neighborhoodPhotos.push(item);
            }
            if (item.bat && isFirstIteration) {
                adminPhotos.push(item);
            }
            isFirstIteration && ParisPhotos.push(item);
        });
        isFirstIteration = false;
        let districtPhotosCopy = JSON.parse(JSON.stringify(districtPhotos));
        districtsPhotos.push(createPhotoGrid(districtPhotosCopy, GRID_WIDTH));
    }

    const photosObject = {
        ParisPhotos: createPhotoGrid(JSON.parse(JSON.stringify(ParisPhotos)), GRID_WIDTH),
        districtsPhotos: districtsPhotos,
        adminPhotos: createPhotoGrid(adminPhotos, GRID_WIDTH),
        neighborhoodPhotos: createPhotoGrid(neighborhoodPhotos, GRID_WIDTH),
    };

    return photosObject;
}


function createPhotoGrid(photoItems, GRID_WIDTH) {
    let currentRow = [];
    let allRows = [];
    let currentWidthSum = 0;
    let currentHeight = 0;
    let scaledHeight = 0;
    let scaledWidth = 0;
    let cartScaledHeight = 0;
    let cartScaledWidth = 0;
    let maxColumns = 0;
    let currentColumns = 0;
    let previousMaxColumns = 0;
    let currentItem = 0;
    let currentRowNumber = 0;
    let totalHeight = 0;

    function calculateScaledSizes(item) {
        if (item.width > item.height) {
            scaledHeight = (HEIGHT_RATIO * WIDTH_LARGE) / item.width;
            scaledWidth = WIDTH_LARGE;
            cartScaledWidth = CART_WIDTH_LARGE;
            cartScaledHeight = (HEIGHT_RATIO * CART_WIDTH_LARGE) / item.width;
        } else {
            scaledHeight = (HEIGHT_RATIO * WIDTH_SMALL) / item.width;
            scaledWidth = WIDTH_SMALL;
            cartScaledHeight = (HEIGHT_RATIO * CART_WIDTH_SMALL) / item.width;
            cartScaledWidth = (HEIGHT_RATIO * CART_WIDTH_SMALL) / item.height;
        }
    }

    const handleLargeItem = (photoItem) => {
        currentRow.pop();
        console.log('photoItem.width photoItem.height', photoItem.width, photoItem.height)
        let aspectRatio = photoItem.width / photoItem.height;
        currentHeight = GRID_WIDTH / aspectRatio;
        totalHeight += currentHeight;
        currentRowNumber += 1;
        scaledHeight = (HEIGHT_RATIO * WIDTH_LARGE) / photoItem.width;
        scaledWidth = WIDTH_LARGE;
        cartScaledHeight = (HEIGHT_RATIO * CART_WIDTH_LARGE) / photoItem.width;
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
                cartScaledHeight: cartScaledHeight,
                cartScaledWidth: CART_WIDTH_LARGE,
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
        photoItems.splice(i - 1, 1);
        console.log('photoItem', photoItem);
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
            // Calculate scaled sizes for the presentation item page
            calculateScaledSizes(item);

            // Calculate smaller scaled sizes for the shopping cart page
            calculateScaledSizes(item);

            return {
                ...item,
                currentHeight: currentHeight,
                totalHeight: totalHeight,
                gridWidth: GRID_WIDTH,
                scaledHeight: scaledHeight,
                scaledWidth: scaledWidth,
                cartScaledHeight: cartScaledHeight,
                cartScaledWidth: cartScaledWidth,
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
            // Calculate scaled sizes for the presentation item page
            calculateScaledSizes(item);

            // Calculate smaller scaled sizes for the shopping cart page
            calculateScaledSizes(item);

            return {
                ...item,
                currentHeight: currentHeight,
                totalHeight: totalHeight,
                gridWidth: GRID_WIDTH,
                scaledHeight: scaledHeight,
                scaledWidth: scaledWidth,
                cartScaledHeight: cartScaledHeight,
                cartScaledWidth: cartScaledWidth,
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
            handleOvershootRow(photoItem)
        }

        if (currentWidthSum < GRID_WIDTH * WIDTH_RATIO_LOWER && i === photoItems.length - 1) {
            handleUnderflow();
        }
    }
    console.log('allRows.flat', allRows.flat)
    return allRows.flat();
}

export { returnPhotosArrays };
