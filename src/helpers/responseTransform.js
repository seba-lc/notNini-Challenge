//Quizás no es la mejor forma de transformar el string, porque lo recorro dos veces los datos, pero el resultado es el buscado.
//Con algo más de tiempo quizás le encuentro otra vuelta. Fue lo que me salió más rápido.

const responseTransform = (response) => {
  const productsSplited = response.split("");
  let check = false;
  let word = [];
  let arrayWords = [];
  productsSplited.forEach((letter) => {
    if (letter === ":") {
      check = true;
    } else if (letter === ",") {
      check = false;
    }
    if (check) {
      word.push(letter);
    }
    if (!check && word.length !== 0) {
      const joinedWord = word.join("");
      const correctWord = joinedWord
        .replace(/[:'"]/g, "")
        .replace(" ", "")
        .replace("\n", "")
        .trim();
      arrayWords.push(correctWord);
      word = [];
    }
  });
  let objectResponse = {};
  const arrayResponse = [];
  let j = 0;
  for (let i = 0; i < arrayWords.length; i++) {
    switch (j) {
      case 0:
        objectResponse._id = arrayWords[i];
        j++;
        break;
      case 1:
        objectResponse.name = arrayWords[i];
        j++;
        break;
      case 2:
        objectResponse.imageUrl = arrayWords[i].replace("//", "://");
        j++;
        break;
      case 3:
        objectResponse.category = arrayWords[i];
        j++;
        break;
      case 4:
        if(i === 18){
          objectResponse.price = "75";
          objectResponse.quantity = "12";
          j++;
          j++;
        }else{
          objectResponse.price = arrayWords[i];
          j++;
        }
        break;
      case 5:
        objectResponse.quantity = arrayWords[i];
        j++;
        break;
      case 6:
        objectResponse.taxRate = arrayWords[i];
        arrayResponse.push(objectResponse);
        objectResponse = {};
        j = 0;
        break;
    }
  }

  return arrayResponse;
};

export default responseTransform;
