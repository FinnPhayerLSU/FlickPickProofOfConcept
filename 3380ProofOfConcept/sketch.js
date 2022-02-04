let table;
let sugg;
let movies = [];
let a = [];
let suggestions = [];
let b = [];

function preload(){
  table = loadTable('moviespreadsheet.csv','csv');
  sugg = loadTable('suggestions.csv','csv');
}

function setup() {
  createCanvas(400, 400);
  print(table.getRowCount() + ' rows in spreadsheet');
  print(table.getColumnCount() + ' columns in spreadsheet');
  
  for(let r = 0; r < table.getRowCount(); r++){
    for(let c = 0; c < table.getColumnCount(); c++){
      a[c] = table.getString(r,c);
    }
    movies[r] = new Movie(a[0],a[1],a[2],a[3]);
  }
  
  for(let q = 0; q < sugg.getRowCount(); q++){
    for(let w = 0; w < sugg.getColumnCount(); w++){
      b[w] = sugg.getString(q,w);
      print(sugg.getString(q,w));
    }
    suggestions[q] = new Movie(b[0],b[1],b[2],b[3]);
  }
  text(findMovie(mode(getGenres(suggestions,movies)),mode(getDecades(suggestions,movies)),mode(getBudgets(suggestions,movies)),movies).name,200,200);
}

class Movie{
  constructor(name,genre,decade,budget){
    this.name = name;
    this.genre = genre;
    this.decade = decade;
    this.budget = budget;
  }
}

function getGenres(suggestions,movies){
  genres = [];
  for(let i = 0; i < suggestions.length; i++){
    for(let j = 0; j < movies.length; j++){
      if(suggestions[i].name == movies[j].name)
        genres[i] = movies[j].genre
    }
  }
  return genres;
}

function getDecades(suggestions,movies){
  decades = [];
  for(let i = 0; i < suggestions.length; i++){
    for(let j = 0; j < movies.length; j++){
      if(suggestions[i].name == movies[j].name)
        decades[i] = movies[j].decade
    }
  }
  return decades;
}

function getBudgets(suggestions,movies){
  budgets = [];
  for(let i = 0; i < suggestions.length; i++){
    for(let j = 0; j < movies.length; j++){
      if(suggestions[i].name == movies[j].name)
        budgets[i] = movies[j].budget
    }
  }
  return budgets;
}

function mode(array){
  let currentCount = 1;
  let maxCount = 1;
  let maxElement;
  let tieChecker = [];
  let tieCheckerCount = 0;
  array = sort(array,array.length);
  for(let i = 0; i < array.length-1;i++){
    currentCount = 1;
    if(array[i] == array[i+1]){
      currentCount++;
      if(currentCount > maxCount){
        maxElement = array[i];
        maxCount = currentCount;
      }
      if(currentCount == maxCount){
        tieChecker[tieCheckerCount] = array[i];
        tieCheckerCount++;
      }
    }
  }

  return random(tieChecker);
}

function findMovie(genre,decade,budget,movies){
  let score = 0;
  let scores = [];
  let topPicks = [];
  for(let i = 0; i < movies.length; i++){
    score = 0;
    if(movies[i].genre == genre)
      score++;
    if(movies[i].decade == decade)
      score++;
    if(movies[i].budget == budget)
      score++
    scores[i] = score;
  }
  for(let j = 0; j < movies.length; j++){
    if(scores[j] >= 3){
      append(topPicks, movies[j]);
    }
  }
  if(topPicks[0] == null){
    for(let j = 0; j < movies.length; j++){
      if(scores[j] == 2){
        append(topPicks, movies[j]);
      }
    }
  }
  if(topPicks[0] == null){
    for(let j = 0; j < movies.length; j++){
      if(scores[j] == 1){
        append(topPicks, movies[j]);
      }
    }
  }
  //for(let k = 0; k < topPicks.length; k++)
    //print(topPicks[k].name);
  return random(topPicks);
}

function draw() {      

}
