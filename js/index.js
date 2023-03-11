// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "оранжевый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);


/*** ОТОБРАЖЕНИЕ ***/
let color;
// отрисовка карточек
const display = () => {


  // TODO: очищаем fruitsList от вложенных элементов,
  const oldList = document.querySelectorAll('.fruit__item');
   oldList.forEach((name) => {
          fruitsList.removeChild(name);
   });

  // чтобы заполнить актуальными данными из fruits
  for (let i = 0; i < fruits.length; i++) {

    if(fruits[i].color == "фиолетовый"){
      color = 'fruit_violet';

    } else if (fruits[i].color == "зеленый") {
      color = 'fruit_green';

    } else if (fruits[i].color == "розово-красный") {
      color = 'fruit_carmazin';

    } else if (fruits[i].color == "желтый") {
      color = 'fruit_yellow';

    } else if (fruits[i].color == "оранжевый") {
      color = 'fruit_lightbrown';

    } else if (
      fruits[i].color == 'синий') {
      color = 'fruit_blue'

    }  else if (fruits[i].color == 'голубой') {
      color = 'fruit_lightblue '
    }

    // TODO: формируем новый элемент <li> при помощи document.createElement,
    let newLi = document.createElement('li');
    newLi.innerHTML = `<div class="fruit__info">
                          <div>
                            index: ${i}
                          </div>
                          <div>
                            kind: ${fruits[i].kind}
                          </div>
                          <div>
                            color: ${fruits[i].color}
                          </div>
                          <div>
                            weight (кг): ${fruits[i].weight}
                          </div>
                        </div>`;

    newLi.setAttribute('class', `fruit__item ${color}`);
    
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    fruitsList.appendChild(newLi);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleFruits = () => {
  let cloneFruits = [];
  fruits.map(function callback(element) {
    cloneFruits.push(element);
  });

  // перемешивание массива
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {

    // TODO: допишите функцию перемешивания массива
  let fruit = fruits.splice(getRandomInt(0, fruits.length - 1), 1);
      // вырезаем его из fruits и вставляем в result.
    result.push(fruit[0]);
    // (массив fruits будет уменьшатся, а result заполняться)
  };

    result.forEach((el, i) => {

      if (cloneFruits[cloneFruits.indexOf(el)+1] === result[i+1]){
        alert(`Не перемешались два рядом стоящих елемента`);
      } else {
          fruits = result;
        }
    });
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {

  let weightMin = parseInt(document.querySelector('.minweight__input').value);
  let weightMax = parseInt(document.querySelector('.maxweight__input').value);

  if (isNaN(weightMin) || isNaN(weightMax)) {

    alert('Введите пожалуйсто число');
    document.querySelector('.maxweight__input').value = '';
    document.querySelector('.minweight__input').value = '';
    display();

  } else {
    fruits = fruits.filter(fruit => fruit.weight >= weightMin  && fruit.weight <= weightMax);
    document.querySelector('.maxweight__input').value = '';
    document.querySelector('.minweight__input').value = '';
  } 
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
    // TODO: допишите функцию сравнения двух элементов по цвету
  const colorsList = ["розово-красный", "оранжевый", "желтый", "зеленый", 'голубой', 'синий', "фиолетовый"];
  let aLength = colorsList.indexOf(a.color);
  let bLength = colorsList.indexOf(b.color);
  return aLength > bLength ? true: false;
  };

const sortAPI = {
  bubbleSort(arr, comparation){ 
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparation(arr[j], arr[j+1])) { 
                // делаем обмен элементов
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp; 
            }
        }
    }                    

  },

  quickSort(arr, comparation) {
      if (arr.length <= 1) {
          return arr;
      }
   
      const temp = arr[arr.length - 1];
      const leftList = [];
      const rightList = [];
  
      for (let i = 0; i < arr.length - 1; i++) {
          if (comparation(temp, arr[i])) {
              leftList.push(arr[i]);
          } 
          else {
              rightList.push(arr[i]);
          }
      }
  
     return [...sortAPI.quickSort(leftList,comparation), temp, ...sortAPI.quickSort(rightList,comparation)];
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },

};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

let sortChenge = false;

sortChangeButton.addEventListener('click', () => {
  if ( sortKind == 'bubbleSort') {
    sortChenge = true;
    sortKind = 'quickSort';
    sortTimeLabel.textContent = sortTime = '-'
      // TODO: вывести в sortTimeLabel значение 'sorting...'
    sortKindLabel.textContent = sortKind;

  } else if (sortKind == 'quickSort') {
    sortChenge = false;
    sortKind = 'bubbleSort';
      // TODO: вывести в sortTimeLabel значение 'sorting...'
    sortKindLabel.textContent = sortKind;
    sortTimeLabel.textContent = sortTime = '-'
  }
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  if ( sortKind === 'quickSort') {
    // производит замер времени вне функции startSort
    const start = new Date();

    const resullt = sortAPI.quickSort(fruits, comparationColor);

    const end = new Date();
    sortTime = `${(end.getTime() - start.getTime())} ms`;

    fruits = resullt;

    sortTimeLabel.textContent = sortTime;
      // TODO: вывести в sortTimeLabel значение sortTime
    sortChenge = false;

  } else if (sortKind === 'bubbleSort') {
      // производит замер времени в функции startSort
      sortAPI.startSort(sortAPI.bubbleSort, fruits, comparationColor);

      // TODO: вывести в sortTimeLabel значение sortTime
      sortTimeLabel.textContent = sortTime;
      sortChenge = true;
  }
  display();
});

  /*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits (ok)
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (isNaN(weightInput.value)){
    alert('Введите число  в поле weight');
  } else if (weightInput.value.length > 0 && kindInput.value.length > 0 && colorInput.value.length > 0 ) {
  fruits.push({"kind": `${kindInput.value}`, "color": `${colorInput.value}`, "weight": `${weightInput.value}`});
  } else {
    alert('Проверьте поля для ввода kind, color и weight');
  }
  console.log();

  weightInput.value ='';
  kindInput.value ='';
  colorInput.value = '';

  display();
});
