document.addEventListener("DOMContentLoaded", () => {
  const nodeData = {
    A: {
      title: "A",
      type: "conclusion",
      typeLabel: "Conclusion",
      description: "The GenDiE model's self-evolving capability, driven by a self-scoring component that assesses sentence faithfulness during data construction, enables it to improve iteratively. This is reflected in its top-tier performance on both ASQA and ConFiQA benchmarks, where hierarchical inference decoding achieves the highest scores in faithfulness (AlignScore and T5NLI) and correctness (EM Rec. and Hit) across both in-domain and out-of-domain settings. Real-time verification systems, which check the accuracy of generated answers by retrieving and cross-referencing source materials before output, can further enhance reliability and user trust, complementing the model’s inherent self-evolving design."
    },
    C1: {
      title: "C1",
      type: "claim",
      typeLabel: "Claim",
      description: "The GenDiE model employs a self-scoring component during data construction to assess sentence faithfulness, which is critical for enabling its self-evolving capability."
    },
    C2: {
      title: "C2",
      type: "claim",
      typeLabel: "Claim",
      description: "Hierarchical inference decoding in the GenDiE model achieves the highest performance on both ASQA and ConFiQA benchmarks, with top scores in faithfulness (AlignScore and T5NLI) and correctness (EM Rec. and Hit) across both in-domain and out-of-domain settings."
    },
    C3: {
      title: "C3",
      type: "claim",
      typeLabel: "Claim",
      description: "Real-time verification mechanisms can be implemented in LLM systems to check the accuracy of generated answers by retrieving and cross-referencing source materials before output, thereby enhancing user trust and answer reliability."
    },
    E2: {
      title: "E2",
      type: "evidence",
      typeLabel: "Evidence",
      description: "Table 1: Performance results of different methods on ASQA (in-domain) and ConFiQA (out-of-domain) benchmarks. Bold and underline numbers denote the best and second-best performance. Note that Extractive Sentence Selection directly uses input passage sentences as answers, making its faithfulness inherently \\(100\\%\\). Consequently, the performance is referred to as “-” to indicate that faithfulness evaluation is not applicable when compared to other generative approaches.",
      image: "./static/images/case_img.jpg"
    },
    E1: {
      title: "E1",
      type: "evidence",
      typeLabel: "Evidence",
      description: "For data construction in self-evolving stage (§2.2.2), GenDiE relies the built-in scoring component to assess the faithfulness degrees of sentences, which is necessary for enabling self-evolving. To study the effectiveness of the self-scoring component, we replace it with the NLI-trained T5-11B model for evaluating sentence faithfulness during data construction. The NLI-trained TS is also used as the evaluation tool to measure faithfulness in previous experiments. With these self-generated but T5-scored data, we train GenDiE\\(_{TS}\\) from GenDiE\\(_{inter1}\\) checkpoint for one iteration, employing the same training objective (Eq. 1). We then compare it with GenDiE\\(_{inter2}\\). Note that two methods score and select contrastive pairs from the same collection of sentence pairs sampled from GenDiE\\(_{inter1}\\). We assess their performances after just one iteration of training, in order to exclude the effect brought by the different self-generated training data at following iterations."
    },
    E3: {
      title: "E3",
      type: "evidence",
      typeLabel: "Evidence",
      description: "Beyond initial submission verification, our system implements continuous error monitoring that occurs at query time. When the main LLM formulates an answer for a user, a secondary process can verify the answer before it's shown. For example, if the LLM produces a summary of results, a retrieval step can pull the original sources of those statements and ensure the answer hasn't deviated from the source content. If the LLM says, \"Study X found Y,\" the system can double-check that Study X indeed contains the same text as the query. The answer is then sent to a second step to confirm the answer using the knowledge base or by requiring the LLM itself to output supporting references for each claim (and then validating those references exist and are relevant). Such real-time verification builds user trust – the system essentially peer-reviews its answers on the fly."
    }
  };

  const nodes = document.querySelectorAll(".node");
  const card = document.getElementById("info-card");
  const cardContent = document.getElementById("info-card-content");
  const reportBtn = document.getElementById("report-btn");
  const scoreBtn = document.getElementById("score-btn");

  const expandBtn = document.getElementById("expand-card-btn");
  const infoModal = document.getElementById("info-modal");
  const infoModalBody = document.getElementById("info-modal-body");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalBackdrop = document.getElementById("info-modal-backdrop");

  const fullReportHtml = `
  <div class="report-html">
    <div class="report-cover">
      <h1>Mechanisms of GenDiE: Self-Evolving Capabilities and Faithfulness Scoring</h1>
    </div>

    <div class="report-section">
      <h2>Architecture of GenDiE Self-Evolving Inference</h2>
      <p>GenDiE (Generate, Discriminate, Evolve) is a framework designed to enhance the context faithfulness of large language models through fine-grained, sentence-level optimization [5, 6]. Unlike traditional answer-level training paradigms, GenDiE treats each sentence within a response as an independent unit for optimization [5, 6]. The framework employs a unified training strategy that integrates generative and discriminative capabilities, allowing the model to produce context-grounded content while simultaneously learning to distinguish between faithful and unfaithful responses [5].</p>
      <p>During self-evolving stages, the model utilizes a tree-structured sampling method to generate candidate sentences [9]. In this process, an n-ary tree represents the generation path, where the root is an empty string and each subsequent node represents a sentence sampled based on its prefix path [9]. This structure allows the model to explore diverse reasoning paths and construct contrastive pairs to iteratively improve performance [5, 10].</p>
    </div>

    <div class="report-section">
      <h2>Role of Self-Scoring Faithfulness in Output Optimization</h2>
      <p>The self-scoring component is central to GenDiE's ability to self-evolve [2, 3]. By assessing the faithfulness of generated sentences, the model can identify and select optimal candidates during training and inference [2, 4]. This component ensures that the model maintains a high degree of alignment with retrieved information, effectively mitigating hallucinations [3, 6]. Research indicates that this self-scoring mechanism is robust, providing a reliable way to evaluate sentence pairs even when compared to external NLI-trained models [1]. This internal evaluation capability allows for precise control over faithfulness, which is critical for constructing high-quality training data during the self-evolving stages [2, 5].</p>
    </div>

    <div class="report-section">
      <h2>Comparative Analysis of GenDiE Performance on ASQA and ConFiQA Benchmarks</h2>
      <img src="./static/images/case_img.jpg" alt="Benchmark table">
      <figcaption>Table 1: Performance results of different methods on ASQA (in-domain) and ConFiQA (out-of-domain) benchmarks. Bold and underline numbers denote the best and second-best performance.</figcaption>
      <p>As shown in the performance results, GenDiE achieves superior faithfulness and correctness metrics compared to both training-free and standard training-based baselines. By utilizing hierarchical inference, the model leverages its learned scoring capacity to navigate candidate sentences, consistently outperforming methods like standard SFT or in-context prompting. This indicates that the self-evolving design effectively optimizes for both in-domain (ASQA) and out-of-domain (ConFiQA) scenarios.</p>
    </div>

    <div class="report-section">
      <h2>Impact of Hierarchical Inference on Faithfulness and Correctness Metrics</h2>
      <p>Hierarchical inference significantly enhances the model's performance by utilizing both generative and discriminative capabilities [5]. By first generating candidate sentences through standard methods and then applying the learned scoring capacity to select the best output, the model achieves a more refined and faithful response [5]. This two-stage process allows GenDiE to surpass conventional single-stage decoding methods, which often neglect the potential of discriminative evaluation [5]. As shown in the benchmark results, this strategy leads to marked improvements in both faithfulness scores and correctness metrics.</p>
    </div>

    <div class="report-section">
      <h2>Integrating Real-Time Verification Systems for Enhanced Reliability</h2>
      <p>Real-time verification systems further bolster the reliability of LLM-based generation by performing continuous error monitoring at query time [7]. By implementing a secondary process that verifies answers against original source content before they are presented to the user, systems can ensure that the model has not deviated from the retrieved information [7]. This "peer-review" approach, which may involve requiring the model to output supporting references for each claim, builds user trust and provides a proactive defense against hallucinations [7]. Such frameworks complement GenDiE's internal self-evolution by providing an external layer of validation, ensuring that the final output remains grounded in factual evidence [7, 8].</p>
    </div>

    <div class="report-summary">
      <h2>Synthesis of GenDiE Evolving Strategies and Future Reliability Frameworks</h2>
      <p>GenDiE represents a significant advancement in creating trustworthy retrieval-augmented generation (RAG) systems [3]. By integrating fine-grained sentence-level optimization with a self-scoring mechanism, the framework enables models to iteratively improve their faithfulness and correctness [5, 6]. The combination of GenDiE's internal self-evolving capabilities and external real-time verification systems offers a comprehensive solution to the challenge of LLM hallucinations, paving the way for more reliable and accurate AI-driven information retrieval [3, 7, 8].</p>
    </div>
  </div>
`;
  let currentExpandedHtml = "";
  let currentExpandedTitle = "Expanded View";

  function clearActiveStates() {
    document.querySelectorAll(".node").forEach(n => n.classList.remove("active"));
    if (reportBtn) reportBtn.classList.remove("active-action");
    if (scoreBtn) scoreBtn.classList.remove("active-action");
  }

  function setCardContent(html) {
    if (!cardContent) return;
    cardContent.innerHTML = html;
  }

  function renderDefaultCard() {
    currentExpandedHtml = "";
    currentExpandedTitle = "Expanded View";

    setCardContent(`
      <h2>Question</h2>
      <div class="desc" style="margin-top: 10px; font-size: 14px;">
        How does the GenDiE model's self-evolving capability, supported by its self-scoring faithfulness component, contribute to its superior performance on ASQA and ConFiQA benchmarks, and how can real-time verification systems further enhance its reliability, as shown in &lt;image&gt;?
      </div>
      <img class="card-image" src="./static/images/case_img.jpg" alt="question image">
      <div class="placeholder" style="margin-top: 30px; font-size: 0.9rem; font-style: italic;">
        Click any node on the left to display its corresponding information here.
      </div>
    `);
  }

  function renderNodeCard(data) {
    if (!data) return;

    currentExpandedHtml = "";
    currentExpandedTitle = "Expanded View";

    let imageHtml = "";
    if (data.image) {
      imageHtml = `<img class="card-image" src="${data.image}" alt="${data.title} image">`;
    }

    let fontSize = "14px";
    if (data.type === "evidence") {
      fontSize = "12px";
    }

    setCardContent(`
      <h2>${data.title}</h2>
      <div class="type ${data.type}">${data.typeLabel}</div>
      <div class="desc" style="font-size: ${fontSize};">${data.description}</div>
      ${imageHtml}
    `);
  }

  function renderReportCard() {
    currentExpandedTitle = "Deep Research Report Generated By Gemini-3.1-Flash-Lite-Preview";
    currentExpandedHtml = fullReportHtml;

    setCardContent(`
      <h2>Deep Research Report</h2>

      <div class="report-preview-shell">
        <div class="report-preview">
          ${fullReportHtml}
        </div>
        <div class="report-preview-fade"></div>
      </div>

      <div class="placeholder report-hint" style="margin-top: 14px; font-size: 0.9rem; font-style: italic;">
        Click the expand button in the top-right corner to view the full report.
      </div>
    `);
  }

  function renderScoreCard() {
    currentExpandedHtml = "";
    currentExpandedTitle = "Expanded View";

    setCardContent(`
      <h2>Evaluation Scores</h2>
      <img class="card-image" src="./static/images/case_score.jpg" alt="evaluation image">
      <div class="desc" style="margin-top: 14px;">
        Total Score: 91.07 / 100
      </div>
    `);
  }

  function openInfoModal() {
    if (!infoModal || !infoModalBody) return;
    const modalTitle = document.getElementById("info-modal-title");
    if (modalTitle) modalTitle.textContent = currentExpandedTitle;

    if (currentExpandedHtml) {
      infoModalBody.innerHTML = `
        <div class="report-modal-wrapper">
          ${currentExpandedHtml}
        </div>
      `;
    } else {
      infoModalBody.innerHTML = `<div class="card-content">${cardContent.innerHTML}</div>`;
    }

    infoModal.classList.add("is-open");
    infoModal.setAttribute("aria-hidden", "false");
  }

  function closeInfoModal() {
    if (!infoModal) return;
    infoModal.classList.remove("is-open");
    infoModal.setAttribute("aria-hidden", "true");
  }

  nodes.forEach(node => {
    node.addEventListener("click", () => {
      const id = node.dataset.id;

      clearActiveStates();
      node.classList.add("active");

      if (id === "DEFAULT") {
        renderDefaultCard();
        return;
      }

      const data = nodeData[id];
      renderNodeCard(data);
    });
  });

  if (reportBtn) {
    reportBtn.addEventListener("click", () => {
      clearActiveStates();
      reportBtn.classList.add("active-action");
      renderReportCard();
    });
  }

  if (scoreBtn) {
    scoreBtn.addEventListener("click", () => {
      clearActiveStates();
      scoreBtn.classList.add("active-action");
      renderScoreCard();
    });
  }

  if (expandBtn) {
    expandBtn.addEventListener("click", openInfoModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeInfoModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeInfoModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && infoModal && infoModal.classList.contains("is-open")) {
      closeInfoModal();
    }
  });

  renderDefaultCard();
});