(() => {
  const HOST_ID = 'boiMockTestsRoot';
  const STORAGE_KEY = 'boiMockTestSessions_v1';
  const DURATION_MS = 100 * 60 * 1000;
  const LETTERS = ['A', 'B', 'C', 'D', 'E'];
  const host = document.createElement('div');
  host.id = HOST_ID;
  host.hidden = true;
  document.getElementById('boiQuizContent').after(host);

  const subnav = document.querySelector('#boiQuizView .boi-quiz-subnav');
  const mockTab = document.createElement('button');
  mockTab.type = 'button';
  mockTab.id = 'boiQuizMockTestsTab';
  mockTab.className = 'boi-quiz-subtab';
  mockTab.textContent = 'Mock Tests';
  mockTab.setAttribute('aria-pressed', 'false');
  subnav.append(mockTab);

  const saved = readSaved();
  let tests = [];
  let activeTestId = null;
  let tickHandle = null;

  function readSaved() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return data && typeof data === 'object' ? data : {};
    } catch { return {}; }
  }
  function writeSaved() { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }
  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function testState(id) {
    saved[id] ||= { attempts: [], active: null };
    return saved[id];
  }
  function openMockMode() {
    document.getElementById('boiQuizPracticeTab').classList.remove('active');
    document.getElementById('boiQuizLearnTab').classList.remove('active');
    document.getElementById('boiQuizBookmarksTab').classList.remove('active');
    mockTab.classList.add('active');
    mockTab.setAttribute('aria-pressed', 'true');
    document.querySelector('.boi-quiz-topic-filter').hidden = true;
    document.getElementById('boiQuizTopicTitle').textContent = 'BOI Mock Tests';
    document.querySelector('#boiQuizView .boi-quiz-heading p').textContent = 'Four full-length practice sessions · 75 questions each · 100 minutes per attempt.';
    document.getElementById('boiQuizProgress').parentElement.hidden = true;
    document.getElementById('boiQuizContent').hidden = true;
    document.querySelector('#boiQuizView .boi-quiz-footer').hidden = true;
    host.hidden = false;
    renderList();
  }
  function returnToPractice() {
    stopTimer();
    mockTab.classList.remove('active');
    mockTab.setAttribute('aria-pressed', 'false');
    document.querySelector('.boi-quiz-topic-filter').hidden = false;
    document.getElementById('boiQuizTopicTitle').textContent = 'Locators';
    document.querySelector('#boiQuizView .boi-quiz-heading p').textContent = 'Choose the answer. After a correct answer, review points 2–7 appear below the question.';
    document.getElementById('boiQuizProgress').parentElement.hidden = false;
    document.getElementById('boiQuizContent').hidden = false;
    document.querySelector('#boiQuizView .boi-quiz-footer').hidden = false;
    host.hidden = true;
    document.getElementById('boiQuizPracticeTab').click();
  }
  function renderList() {
    activeTestId = null;
    host.innerHTML = `<div class="boi-mock-list-intro"><div><span class="pill">FULL-LENGTH PRACTICE</span><h3>Choose a mock test</h3><p>Each session includes all 75 questions. Your time and progress save automatically on this device.</p></div><div class="boi-mock-rule">100 min <span>·</span> 75 questions <span>·</span> retake anytime</div></div><div class="boi-mock-test-grid">${tests.map((test, index) => {
      const state = testState(test.id);
      const last = state.attempts[state.attempts.length - 1];
      const active = state.active && Date.now() - state.active.startedAt < DURATION_MS;
      return `<article class="boi-mock-test-card"><div class="boi-mock-card-top"><span class="pill">MOCK ${index + 1}</span><span class="boi-mock-duration">100 MINUTES</span></div><h4>${esc(test.title)}</h4><p>25 English questions · 50 Professional Knowledge questions</p><div class="boi-mock-card-score">${last ? `Last score <strong>${last.totalScore.toFixed(2)} / 125</strong>` : 'Not attempted yet'}</div><div class="boi-mock-card-actions">${active ? `<button type="button" class="boi-quiz-next" data-continue="${esc(test.id)}">Continue attempt</button>` : ''}<button type="button" class="boi-quiz-next" data-start="${esc(test.id)}">${active ? 'Start again' : state.attempts.length ? 'Reattempt' : 'Start mock'}</button></div><small>${state.attempts.length} completed attempt${state.attempts.length === 1 ? '' : 's'} · unlimited reattempts</small></article>`;
    }).join('')}</div>`;
    host.querySelectorAll('[data-start]').forEach(button => button.onclick = () => beginTest(button.dataset.start));
    host.querySelectorAll('[data-continue]').forEach(button => button.onclick = () => resumeTest(button.dataset.continue));
  }
  function beginTest(id) {
    const test = tests.find(item => item.id === id);
    if (!test) return;
    const state = testState(id);
    state.active = { startedAt: Date.now(), answers: {}, index: 0 };
    writeSaved();
    activeTestId = id;
    renderQuestion();
  }
  function resumeTest(id) {
    const state = testState(id);
    if (!state.active) return renderList();
    if (Date.now() - state.active.startedAt >= DURATION_MS) return finishTest(id, true);
    activeTestId = id;
    renderQuestion();
  }
  function current() {
    const test = tests.find(item => item.id === activeTestId);
    const state = test && testState(test.id);
    return test && state && state.active ? { test, state, attempt: state.active } : null;
  }
  function stopTimer() { if (tickHandle) clearInterval(tickHandle); tickHandle = null; }
  function remainingMs(attempt) { return Math.max(0, DURATION_MS - (Date.now() - attempt.startedAt)); }
  function clockText(ms) {
    const secs = Math.ceil(ms / 1000);
    return `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
  }
  function renderQuestion() {
    stopTimer();
    const ctx = current();
    if (!ctx) return renderList();
    const {test, attempt} = ctx;
    if (remainingMs(attempt) <= 0) return finishTest(test.id, true);
    const q = test.questions[attempt.index];
    const chosen = attempt.answers[q.id] || '';
    const sectionStart = q.section === 'English Language' ? 1 : 26;
    const sectionEnd = q.section === 'English Language' ? 25 : 75;
    host.innerHTML = `<div class="boi-mock-exam-head"><button type="button" class="boi-mock-back">← All mock tests</button><div class="boi-mock-timer-wrap"><span>TIME REMAINING</span><strong id="boiMockTimer">${clockText(remainingMs(attempt))}</strong></div><button type="button" class="boi-mock-submit">Submit test</button></div><div class="boi-mock-exam-progress"><div><span>${esc(test.title)}</span><strong>Question ${attempt.index + 1} of 75</strong></div><div class="exam-progress-track"><i style="width:${(attempt.index + 1) / 75 * 100}%"></i></div></div><section class="boi-mock-question-card"><div class="boi-mock-question-kicker"><span class="pill">${esc(q.section.toUpperCase())}</span><span>${attempt.index + 1 <= 25 ? '1 mark · no penalty for a blank answer' : '2 marks · no penalty for a blank answer'}</span></div><h3>${esc(q.question)}</h3><div class="boi-mock-options">${q.options.map(([letter, text]) => `<button type="button" class="boi-mock-option ${chosen === letter ? 'is-selected' : ''}" data-answer="${letter}" aria-pressed="${chosen === letter}"><span>${letter}</span><span>${esc(text)}</span></button>`).join('')}</div><div class="boi-mock-question-footer"><span>Section ${q.section === 'English Language' ? 'A' : 'B'} · ${attempt.index + 1 - sectionStart + 1} of ${sectionEnd - sectionStart + 1}</span><div><button type="button" class="boi-quiz-subtab" data-prev ${attempt.index === 0 ? 'disabled' : ''}>Previous</button><button type="button" class="boi-quiz-next" data-next>${attempt.index === 74 ? 'Review answers' : 'Next question'}</button></div></div></section><div class="boi-mock-nav-wrap"><h4>Question navigator</h4><div class="boi-mock-question-nav">${test.questions.map((item, index) => `<button type="button" data-jump="${index}" class="${index === attempt.index ? 'is-current' : ''} ${attempt.answers[item.id] ? 'is-answered' : ''}" aria-label="Question ${index + 1}${attempt.answers[item.id] ? ', answered' : ', unanswered'}">${index + 1}</button>`).join('')}</div><p><i class="answered"></i> Answered <i class="unanswered"></i> Not answered</p></div>`;
    host.querySelector('.boi-mock-back').onclick = () => { stopTimer(); renderList(); };
    host.querySelector('.boi-mock-submit').onclick = () => reviewSubmit();
    host.querySelectorAll('[data-answer]').forEach(button => button.onclick = () => { attempt.answers[q.id] = button.dataset.answer; writeSaved(); renderQuestion(); });
    host.querySelector('[data-prev]').onclick = () => { if (attempt.index > 0) { attempt.index--; writeSaved(); renderQuestion(); } };
    host.querySelector('[data-next]').onclick = () => { if (attempt.index < 74) { attempt.index++; writeSaved(); renderQuestion(); } else reviewSubmit(); };
    host.querySelectorAll('[data-jump]').forEach(button => button.onclick = () => { attempt.index = Number(button.dataset.jump); writeSaved(); renderQuestion(); });
    tickHandle = setInterval(() => {
      const timer = document.getElementById('boiMockTimer');
      if (!timer) return stopTimer();
      const left = remainingMs(attempt);
      timer.textContent = clockText(left);
      timer.classList.toggle('is-low', left < 5 * 60 * 1000);
      if (left <= 0) finishTest(test.id, true);
    }, 500);
  }
  function reviewSubmit() {
    const ctx = current();
    if (!ctx) return;
    const blank = ctx.test.questions.filter(q => !ctx.attempt.answers[q.id]).length;
    host.innerHTML = `<section class="boi-mock-submit-check"><span class="pill">READY TO SUBMIT?</span><h3>Review your attempt</h3><p>${75 - blank} of 75 answered · ${blank} left blank.</p><div><button type="button" class="boi-quiz-subtab" data-back>Keep working</button><button type="button" class="boi-quiz-next" data-finish>Submit test</button></div></section>`;
    host.querySelector('[data-back]').onclick = renderQuestion;
    host.querySelector('[data-finish]').onclick = () => finishTest(ctx.test.id, false);
  }
  function finishTest(id, timedOut) {
    stopTimer();
    const state = testState(id);
    const attempt = state.active;
    const test = tests.find(item => item.id === id);
    if (!attempt || !test) return renderList();
    const breakdown = ['English Language', 'Professional Knowledge'].map(section => {
      const questions = test.questions.filter(q => q.section === section);
      let correct = 0, wrong = 0, blank = 0, score = 0;
      for (const q of questions) {
        const answer = attempt.answers[q.id];
        if (!answer) blank++;
        else if (answer === q.answer) { correct++; score += q.marks; }
        else { wrong++; score -= q.penalty; }
      }
      return {section, correct, wrong, blank, score, maximum: questions.reduce((sum, q) => sum + q.marks, 0)};
    });
    const result = { finishedAt: Date.now(), totalScore: breakdown.reduce((sum, row) => sum + row.score, 0), breakdown, answers: {...attempt.answers}, timedOut };
    state.attempts.push(result);
    state.active = null;
    writeSaved();
    activeTestId = null;
    renderResult(test, result);
  }
  function renderResult(test, result) {
    host.innerHTML = `<section class="boi-mock-results"><div class="boi-mock-results-heading"><span class="pill">${result.timedOut ? 'TIME EXPIRED' : 'TEST COMPLETE'}</span><h3>${esc(test.title)} · Results</h3><p>Answers are saved on this device. You can review this attempt or start another one whenever you like.</p></div><div class="boi-mock-total-score"><span>TOTAL SCORE</span><strong>${result.totalScore.toFixed(2)} <small>/ 125</small></strong></div><div class="boi-mock-score-grid">${result.breakdown.map(row => `<article><h4>${esc(row.section)}</h4><strong>${row.score.toFixed(2)} <small>/ ${row.maximum}</small></strong><p>${row.correct} correct · ${row.wrong} wrong · ${row.blank} blank</p>${row.section === 'English Language' ? '<small>Qualifying section · 0.25 mark deducted per wrong answer</small>' : '<small>Merit section · 0.5 mark deducted per wrong answer</small>'}</article>`).join('')}</div><div class="boi-mock-result-actions"><button type="button" class="boi-quiz-subtab" data-list>All mock tests</button><button type="button" class="boi-quiz-next" data-review>Review answers</button><button type="button" class="boi-quiz-next" data-retry>Reattempt</button></div><div class="boi-mock-review" hidden></div></section>`;
    host.querySelector('[data-list]').onclick = renderList;
    host.querySelector('[data-retry]').onclick = () => beginTest(test.id);
    host.querySelector('[data-review]').onclick = () => {
      const review = host.querySelector('.boi-mock-review');
      review.hidden = false;
      review.innerHTML = `<h4>Question review</h4>${test.questions.map((q, index) => {
        const given = result.answers[q.id] || '';
        const isCorrect = given === q.answer;
        return `<article class="boi-mock-review-item ${isCorrect ? 'correct' : 'incorrect'}"><span class="pill">${esc(q.section)} · Q${index + 1}</span><h5>${esc(q.question)}</h5><p>Your answer: ${given ? `${given}. ${esc(q.options.find(x => x[0] === given)?.[1] || '')}` : 'Not answered'}</p><p>Correct answer: ${q.answer}. ${esc(q.options.find(x => x[0] === q.answer)?.[1] || '')}</p></article>`;
      }).join('')}</div>`;
      review.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
  }
  mockTab.onclick = async () => {
    if (!tests.length) {
      mockTab.disabled = true;
      mockTab.textContent = 'Loading…';
      try {
        const response = await fetch('./boi-mock-tests.json', {cache: 'no-cache'});
        if (!response.ok) throw new Error(`Could not load mock tests (${response.status}).`);
        tests = await response.json();
        if (tests.length !== 4 || tests.some(t => t.questions.length !== 75)) throw new Error('The mock-test data did not pass its structure check.');
      } catch (error) {
        host.hidden = false;
        host.innerHTML = `<p class="boi-mock-error">${esc(error.message || 'Could not load the mock tests.')}</p>`;
      } finally {
        mockTab.disabled = false;
        mockTab.textContent = 'Mock Tests';
      }
    }
    openMockMode();
  };
  document.getElementById('boiQuizPracticeTab').addEventListener('click', () => {
    if (!host.hidden) returnToPractice();
  });
})();
