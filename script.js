const data = [
  {
    word: 'checked in',
    prompt: 'We had already ___ at the airport when it started raining.',
    answer: 'checked in',
    hint: 'We registered for the flight.'
  },
  {
    word: 'boarding pass',
    prompt: 'Don’t forget your ___ before going to the gate.',
    answer: 'boarding pass',
    hint: 'A ticket you show to board the plane.'
  },
  {
    word: 'rented',
    prompt: 'They ___ a car for their trip last week.',
    answer: 'rented',
    hint: 'They paid to use a car for a short time.'
  },
  {
    word: 'steep',
    prompt: 'The road was much more ___ than we expected.',
    answer: 'steep',
    hint: 'Difficult to climb because it goes up quickly.'
  },
  {
    word: 'abroad',
    prompt: 'She has never travelled ___.',
    answer: 'abroad',
    hint: 'To a country outside your own.'
  },
  {
    word: 'hiking',
    prompt: 'We were ___ in the forest when the rain started.',
    answer: 'hiking',
    hint: 'Walking long distances in nature.'
  },
  {
    word: 'passport',
    prompt: 'He couldn’t find his ___ at the border.',
    answer: 'passport',
    hint: 'Official document for travel.'
  },
  {
    word: 'secluded',
    prompt: 'They found a ___ beach with no people around.',
    answer: 'secluded',
    hint: 'Very quiet and private.'
  },
  {
    word: 'explored',
    prompt: 'We have ___ every part of the city on foot.',
    answer: 'explored',
    hint: 'We visited and looked at different areas.'
  },
  {
    word: 'to hit the road',
    prompt: 'We packed our bags and got ready ___ early in the morning.',
    answer: 'to hit the road',
    hint: 'To start a journey.'
  }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp || fb.textContent) return; // prevent double scoring

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);













