import { useMemo } from "react";

/*export const createdPhotosGrid = useMemo(() => {
  return createPhotosGrid(props.items);
}, []);*/

export function createPhotosGrid(items) {
  let L = 1200;
  let array1 = [];
  let array2 = [];
  let widthSum = 0;
  let height = 0;
  let height2 = 0;
  let width2 = 0;
  let maxCol = 0;
  let nbCol = 0;
  let nbItem = 0;
  let currentRaw = 0;
  let heightSum = 0;
  let gap = 6;
  items.forEach((item) => {
    nbCol += 1;
    nbItem++;
    if (nbCol > maxCol) {
      maxCol = nbCol;
    }
    widthSum = widthSum + item.width;
    array1.push({ ...item, currentCol: nbCol });
    if (widthSum <= L * 1.2 && widthSum >= L * 0.8) {
      currentRaw += 1;
      let L1 = (maxCol - nbCol + 1) * gap + L;
      height = (L1 * item.height) / widthSum;
      heightSum += height + gap;
      array1 = array1.map((item) => {
        if (item.width > item.height) {
          height2 = (item.height * 552) / item.width;
          width2 = 552;
        } else {
          height2 = (item.height * 370) / item.width;
          width2 = 370;
        }
        return {
          ...item,
          height: height,
          heightSum: heightSum,
          L1: L1,
          height2: height2,
        };
      });
      array2.push(array1);
      array1 = [];
      widthSum = 0;
      nbCol = 0;
    } else if (item.width > L) {
      array1.pop();
      let L1 = (maxCol - 0) * gap + L;
      height = (L1 * item.height) / item.width;
      heightSum += height + gap;
      currentRaw += 1;
      array2.push([
        {
          ...item,
          height: height,
          currentCol: 1,
          heightSum: heightSum,
          L1: L1,
          height2: height2,
          width2: width2,
        },
      ]);
      widthSum = widthSum - item.width;
      nbCol -= 1;
    } else if (widthSum <= L * 0.8 && items.length === nbItem) {
      console.log("widthSum < L*0.8");
    }
  });
  console.log("array2 : ", array2);
  return array2.flat();
}
