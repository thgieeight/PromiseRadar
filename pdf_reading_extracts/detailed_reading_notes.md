# Detailed Reading Notes

Read set: seven PDFs, 263 total pages, about 76,120 extracted words.

Extraction note: text was selectable in all files. Some PDF character encoding came through roughly, especially dashes, Greek symbols, and bullets, but the scientific content was readable.

## 1. `D:\OS numerical\main (13).pdf`

Title: PF2V-WM: Phase-Field Fracture Veil World Models

Core idea: The paper proposes treating latent inference as controlled fracture propagation in a spatial material. Instead of a conventional hidden vector/state, the model maintains fields for damage, potential, and memory. Observations inject forcing, and an unrolled variational solver evolves the state through phase-field fracture regularization, anisotropic transport, geometric priors, topological penalties, and material hardening.

Method: The architecture combines a damage field, potential field, memory field, anisotropic transport, geometric spiral alignment, topological simplicity penalties, and a neural readout. The main task family is synthetic route/path formation with obstacles, where the desired behavior is an obstacle-aware route rather than diffuse activation.

Main evidence: The strongest final focus run reaches hard IoU 0.2066 on the standard held-out split and 0.1866 on a harder obstacle split. Obstacle overlap is much lower than the soft-control baseline in the final comparisons. Earlier material-thin robustness checks show mean hard IoU 0.1244 +/- 0.0096 with obstacle overlap 0.1780 +/- 0.0141, versus soft-control hard IoU 0.0500 +/- 0.0027 with obstacle overlap 0.5888 +/- 0.0154.

Important caveat: Connectivity remains weak and threshold-sensitive. The outputs often show route-like mass but not a clean continuous binary corridor. Deeper solver steps reduce obstacle overlap but can erase the visible path. The paper is strongest as a prototype record and architectural argument, not as evidence of a solved planner.

My reading: This is the most ambitious and detailed paper in the set. Its strongest contribution is the careful systems-level framing plus honest experimental archaeology: the author documents what failed, why broad connectivity is misleading, and why obstacle overlap/route gap/threshold sensitivity must be reported together. The next technical bottleneck is route hardening: turning faint route mass into thin, connected, threshold-stable paths.

## 2. `D:\paper\main (10).pdf`

Title: Loose-Screw Activation Framework: Learnable Leak as a Controlled Auxiliary Signal Path

Core idea: Leak in activation functions is reframed as a bounded auxiliary signal path rather than a defect. The main studied form is Mixed Dual-Path Rattle: a clean ReLU branch plus a bounded pressure-aware leak branch mixed through learnable path weights.

Method: The paper studies pressure-aware leak, dual-path separation, mixed clean/leak weighting, dead-unit rates, robustness to input noise, learned path weights, and target leak sweeps. Datasets include Breast Cancer, Wine, Digits, Diabetes, plus supplementary 20 Newsgroups, CIFAR-10 deep stress tests, and MNIST corruption stress tests.

Main evidence: The mixed formulation usually learns a clean-dominant allocation, roughly 0.95-0.96 clean path and 0.04-0.05 leak path. It often keeps dead-unit rates near zero like Leaky ReLU. On 20 Newsgroups, depth 4 Mixed has clean accuracy 0.6179 versus ReLU 0.6097 and Leaky ReLU 0.6134, with zero dead rate. In a 25-layer non-residual CIFAR-10 MLP stress test, Mixed reaches about 0.4016 +/- 0.0099 versus Leaky ReLU 0.3858 +/- 0.0076 and ReLU 0.3840 +/- 0.0229, again with zero measured dead units.

Important caveat: It does not consistently beat standard activations. On some noisy settings and deeper CNN stress tests, Leaky ReLU or normalized ReLU variants are stronger. Batch normalization dominates the hardest deep-CNN outcome more than the activation family itself.

My reading: The strongest claim is conceptual and diagnostic: leak can be formalized as a controllable auxiliary channel, and useful leak lies in task-dependent bands rather than one magic value. The paper should avoid presenting this as a universal activation improvement.

## 3. `D:\paper\main (11).pdf`

Title: Hair as Memory: Retrieval Bottlenecks, Structural Gains, and Experimental Appendix

Core idea: A hair-like memory architecture separates compressed root summaries from detailed shaft content. A controller/scalp first searches root summaries, then retrieves from candidate shafts. The key question is whether structured placement improves retrieval over flat content-addressed matching.

Method: The paper runs a long synthetic sequence testing overlap, root top-k, random versus spiral placement, root dimensions, leakage/noise, candidate-pool oracles, local reranking, M-CLTR-style controllers, QDMN-style refinement, and scale sweeps.

Main evidence: Multi-root retrieval and larger root shortlists are the clearest practical improvement. Candidate exposure can become strong: the main operating point reports around 0.77 item accuracy for multi-root reranking with an oracle union around 0.90. But flat key search remains very hard to beat. In the final matched-budget scale sweep, random placement stays stronger than spiral PCA at every scale: about 0.690 vs 0.587 at 256 items, 0.558 vs 0.520 at 1024, and 0.528 vs 0.486 at 2048.

Important caveat: Better candidate pools do not reliably become better final retrieval because the within-pool selector is weak. Oracle-pool accuracy remains far above practical selectors. Spiral placement is only competitive when aligned to data geometry, and current spiral root maps are often too concentrated.

My reading: This is the clearest negative/diagnostic paper. It does not validate the current hair-memory implementation at scale, but it usefully narrows the failure: root lifting, candidate geometry, and ambiguity-aware within-pool scoring are the real bottlenecks. The idea is not ruled out, but random placement is currently the stronger scientific baseline.

## 4. `D:\paper\main (12).pdf`

Title: A Lightweight Selective-Routing Study for CPU-Only Inference

Core idea: A small guard model handles routine inputs, while stronger experts activate only when a routing signal says the sample is hard. The contribution is a model-agnostic orchestration layer rather than a new model family.

Method: The router uses scores such as margin, wobble under perturbation, confidence, combined margin/wobble, random, always-expert, and oracle. Thresholds are selected with a cost-aware objective: accuracy minus a penalty for trigger rate.

Main evidence: On Digits, routing becomes meaningful. Combined max-accuracy routing reaches 0.9756 accuracy at 49.17% trigger rate and cost 4.93, compared with always-expert 0.9711 at 100% trigger and cost 8.00. At roughly 40% expert usage, routed accuracy is 0.9550 on Digits versus guard 0.8266 and expert 0.9745. On credit-card fraud, the best deployable policy under a 0.1% cap is conservative: wobble reaches balanced accuracy 0.9288, positive recall 0.8606, trigger rate 0.0006, and cost 1.0048, essentially preserving guard-level performance.

Important caveat: The gains depend strongly on guard/expert headroom and budget. When the guard is already strong or the expert is not much better, escalation has little value. The experiments are small/classical and not direct embedded hardware power measurements.

My reading: This is a practical, well-scoped paper. Its strongest message is regime dependence: margin is best in balanced uncertainty regimes, wobble is safest for rare ultra-low-budget escalation, and routing should sometimes stay almost silent.

## 5. `D:\paper\main (16).pdf`

Title: Deterministic Spiral Sparsity as a Geometric Prior for Sparse Neural Networks

Core idea: Fixed sparse masks are generated by mapping Fermat/golden-angle spiral points onto weight matrices before training. The question is whether deterministic geometric sparsity beats matched random sparsity.

Method: The paper evaluates MLPs and CNN/ResNet-style settings across MNIST, Fashion-MNIST, CIFAR-10, CIFAR-100, density sweeps, angle ablations, pruning comparison, edge microbenchmarks, dead-neuron diagnostics, and mechanism ablations.

Main evidence: On MNIST at 5% density, phyllotactic sparse reaches 94.216 +/- 0.166% versus random sparse 93.740 +/- 0.265%, with dense at 97.730 +/- 0.209%. At MNIST 2% density, golden-angle sparse is much stronger than random in recovered results, 87.464% vs 74.864%. A final fair MNIST 2% rerun reports golden original 89.132 +/- 0.468% versus random 80.674 +/- 4.060%, but magnitude pruning is much stronger at 96.540 +/- 0.131%, with dense at 97.564 +/- 0.127%.

Harder results: On CIFAR-10 small CNN at 5%, spiral and random are essentially tied, 54.972% vs 54.856%, dense 72.120%. On CIFAR-100 Tiny ResNet at 10%, spiral loses to random, 27.187% vs 29.017%, dense 37.450%. A 10-epoch CIFAR-100 stress test confirms random pulls ahead over time rather than the spiral merely catching up slowly.

My reading: The paper’s best claim is narrow: deterministic non-repeating geometry can be a useful fixed sparse prior in extreme low-density/simple regimes. It is not a replacement for dense connectivity or magnitude pruning, and the golden angle itself is not uniquely validated. The mechanism remains open.

## 6. `D:\paper\main.pdf`

Title: QDMN: Quad-Directional Modular Networks as Explicit Multi-Route Processing Fabrics

Core idea: QDMN makes semantic processing directions first-class route symbols: Forward, Backward/refinement, Up/compression, and Down/reconstruction. A CoreNode holds state, and explicit routes such as `[F,U,D,B,H]` compose registered modules.

Method: The framework defines a dimension-typed module registry and route execution over feature dimensions. Experiments are small synthetic demonstrations: 8x8 image classification, noisy sine regression, sequence parity, depth generalization, and semantic compositionality.

Main evidence: The framework can express direct prediction, compression/reconstruction, and iterative refinement. On sine regression, naive depth scaling degrades badly when route depth grows, while stable multi-depth training keeps errors bounded through moderate depths. Multi-seed results show MLP depth 1 test MSE 0.015340 +/- 0.001809, QDMN naive depth 1 0.019220 +/- 0.001577, and stable QDMN improving from depth 1 0.099328 to depth 8 0.059372, though still not beating the MLP in that table.

Important caveat: QDMN is mainly an interface/framework paper. Performance depends on module choices, training objectives, route controllers, and stability mechanisms. Longer routes are not automatically better.

My reading: The useful contribution is the routing abstraction, not benchmark superiority. It gives vocabulary and software structure for route-as-program neural computation, but it needs stronger tasks and controllers to become more than a compositional scaffold.

## 7. `D:\paper\M-CLTR.pdf`

Title: M-CLTR: Measurable Controlled Latent Trajectory Reasoning

Core idea: M-CLTR separates knowledge quality from control over iterative latent computation. It uses a small action space: continue, overwrite, restart. The goal is to log and diagnose reasoning control rather than claim solved reasoning.

Method: A base model produces knowledge and an initial latent state. A reasoning update proposes a next latent state, an evaluator scores it, and a controller picks continue/overwrite/restart. Experiments vary knowledge quality, recipe visibility, controller mode, and corruption level.

Main evidence: Perfect knowledge saturates performance at 1.000 across modes, showing the pipeline can work when knowledge is ideal. Under normal knowledge, performance is much lower and recipe visibility barely changes outcomes. In the controller-only stress test, oracle usually beats practical controllers, showing the action space contains real signal. In the final hidden-recipe diagnostic, accuracy rises monotonically with knowledge strength: continue 0.344/0.498/0.975 for alpha 0.00/0.33/0.66, while oracle reaches 0.374/0.566/0.986.

Important caveat: The learned/heuristic controller is brittle, often overuses restart, and does not reliably beat continue. Overwrite is not clearly the main repair operation.

My reading: This is a diagnostic framework paper. Its core success is measurability: it shows control choices matter and oracle control has headroom. Its core failure is learned control: current policies do not exploit the headroom reliably.

## Cross-Paper Reading

The set has a consistent research style: each paper proposes a structural or geometric alternative to a standard neural computation pattern, then gradually narrows the claim after experiments. The strongest recurring themes are controlled auxiliary paths, structured routing, explicit geometry, and measurable internal computation.

The strongest empirical papers are the selective-routing paper and the spiral-sparsity paper, because they have comparatively clean baselines and interpretable numeric outcomes. The most ambitious paper is PF2V-WM, but it remains prototype-level. Hair Memory and M-CLTR are mostly bottleneck-diagnosis papers. QDMN is primarily a framework/interface paper.

The biggest shared risk is overclaiming from synthetic or small-scale experiments. The best framing across the set is not "these architectures beat standard methods," but "these architectures expose measurable mechanisms and useful bottlenecks that standard black-box formulations hide."

Recommended next step across the whole bundle: turn each paper’s narrowest defensible claim into a one-paragraph abstract and a reviewer-facing limitations paragraph. That will make the collection much stronger and harder to dismiss.
