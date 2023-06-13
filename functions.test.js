// const returnObj = (_values) => {
//   console.log(_values);
// };
// /**
//  * object를 인자로 넣으면 value를 문자로 하나씩 뱉어주는 함수
//  * @param {object} obj : key와 value를 가진 object와 문자배열이 합쳐진 object
//  * @returns : null
//  */
// const extractValues = (obj) => {
//   const extract = (obj) => {
//     if (typeof obj === "object") {
//       if (Array.isArray(obj)) {
//         obj.forEach((item) => extract(item));
//       } else {
//         for (let key in obj) {
//           extract(obj[key]);
//         }
//       }
//     } else {
//       returnObj(obj);
//     }
//   };
//   extract(obj);
// };

// const obj = [{ a: ["a-1", "a-2"] }, "b", "c", "d"];
// console.log(extractValues(obj));

// 배열로 뱉음
const extractValues = (obj) => {
  const values = [];

  const extract = (obj) => {
    if (typeof obj === "object") {
      if (Array.isArray(obj)) {
        obj.forEach((item) => extract(item));
      } else {
        for (let key in obj) {
          extract(obj[key]);
        }
      }
    } else {
      values.push(obj);
    }
  };

  extract(obj);
  return values;
};

const obj = [{ a: ["a-1", "a-2"] }, "b", "c", "d"];
const extractedValues = extractValues(obj);
console.log(extractedValues);
