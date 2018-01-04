(function () {
'use strict';

const createElement = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer;
};

const main = document.getElementById(`main`);

const changeView = (view) => {
  main.innerHTML = ``;
  main.appendChild(view.element);
};

class AbstractView {

  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    return createElement(this.template.trim());
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

}

const ENTER_KEYCODE = 13;
const START_COMMAND = `start`;

class WelcomeView extends AbstractView {

  get template() {
    return `
<div class="quest">
  <p class="title">С У П Е Р К В Е С Т</p>
  <p class="text">Это игра, где вы — главное действующее лицо. И от ваших действий зависит успех и победа в этой игре.
  Ознакомиться с таблицей победителей можно <a href="#score">здесь.</a></p>
  <p class="text">Набери в поле ввода <b>${START_COMMAND}</b>, чтобы начать игру!"</p>
  <input type="text">
</div>`.trim();
  }

  bind() {
    const input = this.element.querySelector(`input`);
    input.onkeydown = (evt) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        const value = input.value || ``;
        if (value.toLowerCase() === START_COMMAND) {
          this.onStart();
        }
      }
    };
  }

  onStart() {

  }
}

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      Application.startGame();
    };
  }
}

var welcomeScreen = new WelcomeScreen();

const initialGame = {
  level: 0,
  lives: 3,
  time: 0
};

const setLives = (game, lives) => {
  if (lives < 0) {
    throw new RangeError(`Can't set negative lives`);
  }
  game = Object.assign({}, game);
  game.lives = lives;
  return game;
};

const tick = (game) => {
  game = Object.assign({}, game);
  game.time++;
  return game;
};

const getLevel = (num, data = quest) => data[`level-${num}`];

const nextLevel = (state, data = quest) => {
  const next = state.level + 1;
  if (!getLevel(next, data)) {
    throw new RangeError(`Can't find level ${next}`);
  }
  state = Object.assign({}, state);
  state.level = next;
  return state;
};

const LEFT = `LEFT`;
const RIGHT = `RIGHT`;
const JUMP = `JUMP`;
const ONE = `1`;
const TWO = `2`;
const THREE = `3`;


const Result = {
  DIE: `die`,
  NOOP: `noop`,
  NEXT: `next`,
  WIN: `win`
};

const quest = {
  'level-0': {
    text: `Вас зовут Луиджи Марио, вы водопроводчик, но сейчас перед вами стоит очень важная миссия — спасти принцессу 
    Грибного Королевства Тоадстул Пич. Её похитил злой повелитель черепах Боузер и вы отправились в Грибное Королевство, 
    чтобы победить Боузера и освободить принцессу. Вы отправляетесь в первый замок, но, чтобы в него попасть нужно 
    преодолеть несколько препятствий. Вы стоите посреди на одной из равнин Грибного Королевства и видите как на вас 
    стремительно несется хмурый гриб вашего роста. Нужно срочно что-то предпринять`,
    answers: {
      [LEFT]: {
        result: Result.DIE,
        description: `Вы побежите влево, от гриба`
      },
      [RIGHT]: {
        result: Result.NEXT,
        description: `Вы побежите вправо, прямо на гриб`
      },
      [JUMP]: {
        result: Result.DIE,
        description: `Вы прыгнете вверх`
      }
    }
  },
  'level-1': {
    text: `Теперь, когда угроза быть убитым грибом миновала, вы можете спокойно оглядеться по сторонам. Вы видите что 
    над вами прямо в двумерном небе висят кирпичные блоки, которые перемежаются с непонятными металлическими 
    конструкциями. Что вы предпримете?`,
    answers: {
      [JUMP]: {
        result: Result.NEXT,
        description: `Как что, конечно же подпрыгну и со всей силы ударюсь головой о железяку!`
      }
    }
  },
  'level-2': {
    text: `Вы проохите немного вперед и снова видите над головой кирпичную кладку. Вы хотите проверить свои новые 
    силы и со всего размаху бъетесь об нее головой. На этот раз кирпичи разлетаются во все стороны. Вы начинаете 
    радостно прыгать и разносить головой все кирпичи, но случайно ударяетесь о еще одну металлическую штуку и видите 
    как из нее вырастает цветок. Ваши действия?`,
    answers: {
      [ONE]: {
        description: `Конечно же съесть его!`,
        result: Result.WIN
      },
      [TWO]: {
        description: `Растоптать цветок!`,
        result: Result.DIE
      },
      [THREE]: {
        description: `В панике убежать...`,
        result: Result.DIE
      }
    }
  }
};

class GameModel {
  constructor(data = quest) {
    this.data = data;
  }

  update(newState) {
    this.state = newState;
    return this.state;
  }

  getCurrentLevel() {
    return getLevel(this.state.level, this.data);
  }

  nextLevel() {
    this.update(nextLevel(this.state, this.data));
  }

  tick() {
    this.update(tick(this.state));
  }

  canDie() {
    return this.state.lives > 0;
  }

  die() {
    if (this.canDie()) {
      this.update(setLives(this.state, this.state.lives - 1));
    }
  }
}

const drawHeart = (full) => {
  return `<span class="heart__${full ? `full` : `empty`}">${full ? `&#9829;` : `&#9825;`}</span>`;
};

class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }


  get template() {
    return `
<header class="header">
  <div>Мир: ${this.state.level}</div>
  <div>Жизни: ${drawHeart(this.state.lives > 2)}
              ${drawHeart(this.state.lives > 1)}
              ${drawHeart(this.state.lives > 0)}
  </div>
  <div>Время: <span class="time">${this.state.time}</span></div>
</header>`;
  }
}

const ENTER_KEYCODE$1 = 13;


class LevelView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const level = this.level;

    const answerNames = Object.keys(level.answers);
    const answers = answerNames.map((key) => ({key, value: level.answers[key]}));

    return `
<div class="quest">
  <p class="text">${level.text}</p>
  <input type="text">
  <ul class="answers">
    ${answers.map(({key, value}) => `<li class="answer" data-key="${key}">${key}. ${value.description}</li>`).join(``)}
  </ul>  
</div>
<small>Для справки введите <i>help</i></small>`;
  }

  bind() {
    this.input = this.element.querySelector(`input`);
    this.input.onkeydown = (evt) => {
      if (evt.keyCode === ENTER_KEYCODE$1) {
        this.selectAnswer(this.input.value);
      }
    };

    const answersElement = this.element.querySelector(`.answers`);
    answersElement.onclick = (evt) => {
      const target = evt.target;
      if (target.tagName.toLowerCase() === `li`) {
        this.selectAnswer(target.dataset.key);
      }
    };
  }

  selectAnswer(answerKey = ``) {
    const level = this.level;
    const answer = level.answers[answerKey.toUpperCase()];

    if (answer) {
      this.onAnswer(answer);
    }
  }

  focus() {
    this.input.focus();
  }

  onAnswer(answer) {
    return answer;
  }

}

const update = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view.element);
};

class GameView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {
    return `
<div class="header-container"></div>
<div class="level-container"></div>`;
  }

  bind() {
    this.headerContainer = this.element.querySelector(`.header-container`);
    this.levelContainer = this.element.querySelector(`.level-container`);
    return super.bind();
  }

  updateLevel() {
    this.updateHeader();
    const level = new LevelView(this.model.getCurrentLevel());
    level.onAnswer = (answer) => this.onAnswer(answer);

    update(this.levelContainer, level);
    this.level = level;
  }

  updateHeader() {
    update(this.headerContainer, new HeaderView(this.model.state));
  }

  focus() {
    this.level.focus();
  }

  onAnswer(answer) {

  }
}

class GameScreen {
  constructor(data = quest) {
    this.model = new GameModel(data);
    this.view = new GameView(this.model);

    this.view.onAnswer = (answer) => this.onAnswer(answer);
  }

  init(state = initialGame) {
    this.model.update(state);
    changeView(this.view);
    this.changeLevel();
  }

  onAnswer(answer) {
    this.stopTimer();
    switch (answer.result) {
      case Result.DIE:
        this.model.die();
        Application.die(this.model.state);
        break;
      case Result.WIN:
        Application.win(this.model.state);
        break;
      case Result.NEXT:
        this.model.nextLevel();
        this.changeLevel();
        break;
      default:
        throw new Error(`Unknown result ${answer.result}`);
    }
  }

  changeLevel() {
    this.view.updateLevel();

    this.view.focus();
    this.tick();
  }

  tick() {
    this.model.tick();
    this.view.updateHeader();

    this.timer = setTimeout(() => this.tick(), 1000);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

class GameOverView extends AbstractView {
  constructor(isWin) {
    super();
    this.isWin = isWin;
  }

  get template() {
    let message;
    if (this.isWin) {
      message = `<p>УРА!</p><p>Победа!</p>`;
    } else {
      message = `<p>КОНЕЦ!</p><p>Повторим?!</p>`;
    }
    return `
<div class="end">
  ${message.trim()}
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</a></div>
</div>`;
  }

  bind() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();

      this.onRepeat();
    };
  }

  onRepeat() {

  }
}

class GameOverScreen {
  constructor(win) {
    this.isWin = win;
    this.view = new GameOverView(win);
  }

  init(state) {
    this.view.onRepeat = () => {
      if (this.isWin || state.lives < 0) {
        Application.startGame();
      } else {
        Application.startGame(state);
      }
    };

    changeView(this.view);
  }
}

class ScoreBoardView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
<div class="end">
  <div class="scoreboard">Загружаем данные</div>
  <br>
  <div class="repeat"><span class="repeat-action">Сыграть заново</span>&nbsp;|&nbsp;<span class="repeat-action">Выйти</a>🐌</div>
</div>`;
  }

  bind() {
    this.scoresElement = this.element.querySelector(`.scoreboard`);

    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();
      this.onRepeat();
    };
  }

  printScores(scores) {
    const content = scores.reverse().map((it, i) => `
<tr>
  <td><small>${i + 1}.</small></td>
  <td style="text-align: right;">${new Date(it.date).toDateString()}</td>
  <td style="text-align: right;">${it.time} сек</td>
  <td>${new Array(3 - it.lives).fill(`💔`).concat(new Array(it.lives).fill(`❤️`)).join(``)}</td>
</tr>`).join(``);

    this.scoresElement.innerHTML = `
<h1>Мои лучшие результаты</h1>
<table class="scores">
${content}
</table>`;
  }

  onRepeat() {

  }
}

const SERVER_URL = `https://es.dump.academy/text-quest`;

const DEFAULT_NAME = `zeckson`;

class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/quest`).then((res) => res.json());
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${name}`).then((res) => res.json());
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}

class ScoreBoardScreen {
  init() {
    const view = new ScoreBoardView();

    view.onRepeat = () => Application.showWelcome();
    changeView(view);

    Loader.loadResults().then((scores) => view.printScores(scores));
  }
}

var scoreboard = new ScoreBoardScreen();

class SplashScreen extends AbstractView {
  constructor() {
    super();
    this.cursor = 0;
    this.symbolsSeq = `/—\\|`;
  }

  get template() {
    return `<div></div>`;
  }

  start() {
    this.cursor = ++this.cursor >= this.symbolsSeq.length ? 0 : this.cursor;
    this.element.textContent = this.symbolsSeq[this.cursor];
    this.timeout = setTimeout(() => this.start(), 50);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}

const preprocessAnswers = (answers) => {
  const answersObj = {};

  for (const {action, result} of answers) {
    const [actionName, description] = action.split(`.`);
    answersObj[actionName] = {
      description,
      result
    };
  }

  return answersObj;
};


var adapt = (data) => {
  const adapted = {};

  Object.keys(data).forEach((it, i) => {
    adapted[`level-${i}`] = {
      text: data[it].text,
      answers: preprocessAnswers(data[it].answers)
    };
  });

  return adapted;
};

const dieScreen = new GameOverScreen(false);

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  SCORE: `score`
};

class Application {
  static init(questData) {
    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questData),
      [ControllerId.SCORE]: scoreboard
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      Application.changeHash(hashValue);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id) {
    const controller = Application.routes[id];
    if (controller) {
      controller.init();
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static startGame(state = initialGame) {
    Application.routes[ControllerId.GAME].init(state);
  }

  static die(state) {
    dieScreen.init(state);
  }

  static win(state) {
    Loader.saveResults(state).then(() => {
      location.hash = ControllerId.SCORE;
    });
  }
}

const splash = new SplashScreen();
changeView(splash);
splash.start();

Loader.loadData().
  then(adapt).
  then((questData) => Application.init(questData)).
  then(() => splash.stop()).
  catch(window.console.error);

}());
