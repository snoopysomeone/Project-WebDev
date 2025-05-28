let current = 0;
let userAnswers = [];
let reponses = "";

function showQuestion() {
  const container = document.getElementById('quiz-container');
  if (current >= questions.length) {
    const page = `${reponses}.html`;
    fetch(page, { method: 'HEAD' })
      .then(resp => {
        if (resp.ok) {
          window.location.href = page;
        } else {
          container.innerHTML = `<div class='alert alert-error'>Suite à vos réponses, vous ne souhaitez pas être contacté.</div>`;
        }
      })
      .catch(() => {
        container.innerHTML = `<div class='alert alert-error'>Suite à vos réponses, vous ne souhaitez pas être contacté.</div>`;
      });
    return;
  }
  const q = questions[current];
  container.innerHTML = `
    <div class="card bg-base-100 shadow-xl mb-4">
      <div class="card-body">
        <h2 class="card-title">${q.qlabel}</h2>
        <div class="flex flex-col gap-2 mt-4">
          ${q.reponses.map(r => `
            <button class="btn btn-outline" onclick="answer(${q.qid}, ${r.rid})">${r.rlabel}</button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function answer(qid, rid) {
  userAnswers[current] = rid;
  reponses += `Q${qid}_${rid},`;
  current++;
  showQuestion();
}

function restartQuiz() {
  current = 0;
  userAnswers = [];
  reponses = "";
  showQuestion();
}

window.onload = showQuestion;