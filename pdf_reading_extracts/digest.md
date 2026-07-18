# main (13).pdf

Source: D:\OS numerical\main (13).pdf
Pages: 99 | Extracted words: 28058

Title guess: PF2V-WM: Phase-Field Fracture Veil World Models / Fracture as Latent Inference in a Multiscale Anisotropic Medium / Thgie Eight

## Abstract excerpt
Abstract
We propose thePhase-Field Fracture Veil World Model(PF 2V-WM), a world-modeling
architecture in which latent inference is implemented as controlled fracture propagation in a
structured medium. The model maintains spatial fields for damage, potential, and memory; ob-
servations inject forcing; and an unrolled variational solver evolves the latent state using fracture
regularization, anisotropic transport, geometric priors, and slow material hardening. The paper
is deliberately both constructive and empirical: it formalizes the energy-based latent dynamics,
describes a practical neural implementation, and records a sequence of prototype experiments
on synthetic path-formation and obstacle-bending tasks. Early runs mostly produced endpoint
blobs and diffuse bridges, but progressive changes—core–spread separation, material memory,
obstacle-conditioned evaluation, threshold sweeps, and a final focus model—improved obstacle-
aware route formation. The strongest final focus setting reaches hard IoU 0.2066 on a standard
1

===== PAGE 2 =====
held-out split and 0.1866 on a harder obstacle split, with obstacle overlap around 0.18 and
0.15, respectively. These results are not evidence of a solved planner: the learned paths remain
threshold-sensitive and often fragmentary. They do, however, support a narrower claim that
phase-field material dynamics can provide an interpretable substrate for partial, obstacle-aware
latent route formation. The novelty is therefore a systems-level synthesis of known phase-field
mechanics, latent world models, and energy-based inference, together with an honest empirical
account of where this substrate currently succeeds and fails.

## Introduction excerpt
1 Introduction
Modern world models usually perform inference through repeated dense updates of vectors or
feature maps. That is flexible, but it weakly constrains three properties that matter for world
modeling:adaptive compute,persistent structural memory, andgeometrically coherent internal
trajectories.
This paper proposes a different organizing principle:reasoning as controlled fracture propagation
in a latent material. Instead of a flat hidden state, PF 2V-WM uses a spatial latent medium
with tension, damage, anisotropy, and memory. A learned encoder injects forcing and boundary
information, and a differentiable variational solver relaxes the latent fields toward lower energy. In
principle, this gives adaptive computation, long-range spatial coupling, and slow path-dependent
memory within one substrate.
The proposed model, PF 2V-WM, combines five ingredients:
•adamage fieldrepresenting commitment or computational expenditure;
•apotential fieldwhose gradients carry latent stress and directional flow;
•amemory fieldthat hardens or softens previously used pathways;
•anisotropic transportthat encodes quad-directional or learned structural bias; and
•geometric and topological priorsthat favor coherent spiral-like trajectories and short suf-
ficient fracture paths.
The goal is not to claim that intelligence literally follows brittle fracture mechanics. The narrower
claim is that phase-field fracture dynamics can serve as a useful computational substrate for adaptive
latent inference.
This draft now includes a long prototype record rather than only a proposal. The empirical story
is mixed but informative: simple versions often collapse into blobs or broad corridors, whereas
later material-style variants become more obstacle-selective and the final focus model produces
the strongest visible route signal. The main open problem is no longer whether the model can
sense a route, but whether it can harden a faint route-like latent field into a thin, continuous,
threshold-stable path.

## Conclusion/results excerpt
conclusions.
For additional transparency, the author also provides supporting materials, including chat conver-
sations and code used to run the experiments.
•Original ChatGPT conversation:PLACEHOLDER-CHATGPT-LINK
•Original Gemini conversation:PLACEHOLDER-GEMINI-LINK
•Original Grok conversation:PLACEHOLDER-GROK-LINK
•Colab notebook:PLACEHOLDER-COLAB-LINK
Abstract
We propose thePhase-Field Fracture Veil World Model(PF 2V-WM), a world-modeling
architecture in which latent inference is implemented as controlled fracture propagation in a
structured medium. The model maintains spatial fields for damage, potential, and memory; ob-
servations inject forcing; and an unrolled variational solver evolves the latent state using fracture
regularization, anisotropic transport, geometric priors, and slow material hardening. The paper
is deliberately both constructive and empirical: it formalizes the energy-based latent dynamics,
describes a practical neural implementation, and records a sequence of prototype experiments
on synthetic path-formation and obstacle-bending tasks. Early runs mostly produced endpoint
blobs and diffuse bridges, but progressive changes—core–spread separation, material memory,
obstacle-conditioned evaluation, threshold sweeps, and a final focus model—improved obstacle-
aware route formation. The strongest final focus setting reaches hard IoU 0.2066 on a standard
1

===== PAGE 2 =====
held-out split and 0.1866 on a harder obstacle split, with obstacle overlap around 0.18 and
0.15, respectively. These results are not evidence of a solved planner: the learned paths remain
threshold-sensitive and often fragmentary. They do, however, support a narrower claim that
phase-field material dynamics can provide an interpretable substrate for partial, obstacle-aware
latent route formation. The novelty is therefore a systems-level synthesis of known phase-field
mechanics, latent world models, and energy-based inference, together with an honest empirical
account of where this substrate currently succeeds and fails.
1 Introduction
Modern world models usually perform inference through repeated dense updates of vectors or
feature maps. That is flexible, but it weakly constrains three properties that matter for world
modeling:adaptive compute,persistent structural memory, andgeometrically coherent internal
trajectories.
This paper proposes a different organizing principle:reasoning as controlled fracture propagation
in a latent material. Instead of a flat hidden state, PF 2V-WM uses a spatial latent medium
with tension, damage, anisotropy, and memory. A learned en

## Detected headings
- result selection, and final framing were determined and verified by the author.
- Abstract
- 1 Introduction
- 2 Relation to Prior Work and Novelty Positioning
- 3 Conceptual Overview
- 4 Latent State and Multiscale Representation
- 5 Energy-Based Formulation
- 5.1 Degraded Anisotropic Elastic Energy
- 5.2 Fracture Surface Energy and Double-Well Potential
- 5.3 Spiral Alignment Prior
- 5.4 Topological Simplicity Penalty
- 6 Memory as Slow Material Hardening
- 7 Latent Dynamics and Inference
- 8 Architecture
- 9 Training Objective
- 10 Algorithmic Summary
- 11 Experimental Program and Main Findings
- 11.1 Minimal Viable Prototype
- 11.2 Observed Experimental Trajectory
- model must balance hard IoU, route ratio, obstacle overlap, route gap, and connectivity rather
- 11.3 Final Prototype Summary
- 11.4 Recommended Next Experiments
- 12 Scientific Positioning and Claims
- 13 Limitations and Open Questions
- 14 Conclusion
- Model Soft Hard Mass Sharp Conn. Src. Goal Compact
- model was rewarded for bending around the obstacle rather than cutting through it.
- experiments showed centerline continuity and width control; this one adds early signs of route preference
- model can prefer the obstacle-avoiding route, but it still struggles to avoid the obstacle sharply while keeping
- model trained on the same routing task.
- Model Soft Hard RouteMean DirectMean Ratio ObsOverlap Gap Sharp Conn.
- Model Soft Hard Ratio ObsOverlap Gap Sharp Conn. Compact
- model, whereas the CNN behaves like a smoother painter of dense fields. The contribution is not that
- model does not. But that effect is not yet useful by the metrics that matter. The model does not become
- model still uses the full four-step budget every time. So memory now helps the direction of the solution, but
- model reduces diffuse obstacle-overlapping activation and shifts the prediction toward the bent route more
- model, and a material-memory model;
- appendix runs;
- model is strongest on these soft metrics at every step count, climbing from route ratio 1.0314 atsteps 2to
- appendix update.
- model achieved soft IoU 0.0413, hard IoU 0.1600, route ratio 0.8593, obstacle overlap 0.3476, route gap
- model remains the only variant that produces any meaningful hard IoU on this held-out example. That
- model is reasoning better.
- 0.0000. This suggests that longer relaxation suppresses obstacle activation, but also suppresses the useful
- model solves the previous invisibility problem by becoming too loud and too diffuse.
- Model / setting Soft Hard Ratio ObsOverlap Gap Conn.
- Model Set Hard IoU Route Ratio ObsOverlap Conn.
- Model Hard IoU Route Ratio ObsOverlap Conn.


---

# main (10).pdf

Source: D:\paper\main (10).pdf
Pages: 30 | Extracted words: 7465

Title guess: Loose-Screw Activation Framework: Learnable Leak as a / Controlled Auxiliary Signal Path / Thgie Eight

## Abstract excerpt
Abstract
We study a family of neural activations built around a simple idea: leak need not be treated
only as an error to suppress, but can be used as a bounded auxiliary signal path. The main
formulation is a mixed dual-path activation in which a clean ReLU branch is combined with a
bounded pressure-aware leak branch through learnable path weights. Across the current real-
dataset benchmarks, the mixed formulation is competitive in several settings and consistently
maintains very low dead-unit rates, but it does not uniformly outperform standard baselines. A
focused leak-band sweep further suggests that performance remains stable across a broad range
of target leak values rather than depending on one exact optimum. We therefore present the
paper as an empirical study of controlled auxiliary leak paths: the central claim is not universal
superiority, but that leak can be formalized, learned, and stress-tested as a small auxiliary
computation channel.

## Introduction excerpt
1 Introduction
The loose-screw project starts from a simple premise: leak in an activation function need not be
treated only as a flaw. If the leak is bounded, controlled, and learnable, it can be studied as a small
auxiliary signal path rather than as a defect to remove.
The main question in this paper is therefore narrow: can a model use a small leak channel as a
stable helper without losing the benefits of a clean primary path? The main formulation studied
here, Mixed Dual-Path Rattle, is built around that question. Earlier variants such as Pressure
Rattle and Dual-Path Rattle are retained because they explain how the framework developed, but
they are not the main result.
The framework evolves through three steps:
1. a pressure-aware negative-branch prototype,
2. a dual-path formulation with separate clean and leak channels, and
3. a mixed formulation in which the model learns how much each path should contribute.
The contribution is not any single primitive in isolation. ReLU, sigmoid gating, hyperbolic tangent
saturation, and learned weights are all familiar components. The contribution is the way they are
arranged into a leak-aware activation family whose behavior can be measured across real datasets,
depth settings, noise levels, and leak-band sweeps.
More specifically, the paper makes four contributions:
•it defines a leak-aware activation family that progresses from a pressure-aware prototype to
a mixed dual-path formulation with learnable clean and leak contributions;

## Conclusion/results excerpt
Conclusion
The current paper does not establish a universally superior activation. Instead, it establishes a
more limited but still meaningful result: leak can be treated as a bounded auxiliary signal path,
and the resulting family behaves in a controlled and task-dependent way.
The strongest current evidence is that the mixed dual-path formulation naturally learns a small
leak contribution, while forced leak-band sweeps show that performance can remain stable across a
broad range of leak values. The supplementary deep-network diagnostics point in the same direction
but should be read more cautiously: they mainly show that the formulation remains analyzable in
harder regimes, and that optimization choices such as normalization can dominate outcomes there.
Taken together, these results support treating the loose-screw family not as a single magical acti-
vation, but as a structured framework for studying how small auxiliary signal channels behave in
neural networks. The main takeaway is therefore conceptual as much as empirical: a leak channel
can be present, bounded, and useful without becoming the dominant path, and that controlled
auxiliary role is measurable across both unconstrained training and forced leak sweeps.
A Appendix A: Earlier activation variants
This appendix collects the earlier designs that motivated the main mixed dual-path formulation.
14

===== PAGE 15 =====
A.1 Pressure Rattle Activation
The implementation that produced the reported sample outputs is thePressure Rattle Activa-
tion. For an inputx, define local pressure as
p=|x|.
The looseness gate is
α(p) =σ(ap+b),
whereσ(·) is the sigmoid function anda, bare learnable scalar parameters. A second bounded
learnable factor is
λ=σ(ℓ),
whereℓis a learnable scalar logit. Using this, define the rattle factor
r(x) =λ α(p) tanh(p).
The activation is then piecewise defined by
f(x) =
(
max(0, x) =x, x≥0,
x

1−r(x)

, x <0.
This version keeps the positive branch unchanged and contracts the negative side toward zero by
a pressure-aware bounded amount.
A.2 Universal Loose Screw family
A second code block explored a broader family calledUniversal Loose Screw, with three modes:
boring,safe, andrattle. In that family, one first defines
p=|x|, α(p) =σ(sp),
wheresis a learnable pressure sensitivity, and introduces a learnable looseness parameterL.
The three negative-branch variants are then:
boring:n(x) = 0.01x,
safe:n(x) =x

1−Lα(p) tanh(p)

,
rattle:n(x) =x+Lα(p) tanh(x 2).
The full activation in each case is
f(x) = ReLU(x) +1 {x<0} n(x).
Among these, thesafemode is the closest conceptual match to

## Detected headings
- Abstract
- 1 Introduction
- 2 Related Work
- 3 Main Method: Mixed Dual-Path Rattle
- 3.1 Why the design is stable
- 3.2 Interpretation
- 4 Main Results
- 4.1 Dead units and stability
- 4.2 Robustness to input noise
- model often trails Leaky ReLU once noise is added. On Diabetes, all methods change only slightly
- 4.3 Learned path mixtures
- 4.4 Task summary
- 4.6 Empirical mapping of the leak band
- 4.7 Target-leak sweep across real datasets
- result was above both ReLU and Leaky ReLU, and on the smaller setting at depth 8 the best forced
- results were around the upper end of the tested band. On Diabetes regression, the picture was again
- 5 Interpretation and Scope
- 6 Limitations
- 7 Next Experimental Direction
- 8 Conclusion


---

# main (11).pdf

Source: D:\paper\main (11).pdf
Pages: 53 | Extracted words: 19987

Title guess: Hair as Memory: Retrieval Bottlenecks, Structural Gains, and / Experimental Appendix / Thgie Eight

## Abstract excerpt
Abstract
This paper studies whether a hair-style memory architecture can use structured placement
to retrieve the right item more effectively than a strong flat content-addressed baseline. Across
a long sequence of synthetic experiments, the main positive result is that multi-root assignment
and larger root shortlists substantially improve candidate coverage. The main negative result
is that this stronger candidate exposure still does not reliably translate into better end-to-
end retrieval than flat key matching, because the final within-pool selector remains too weak
and current spiral root maps are often too concentrated. The later experiments sharpen both
points. A PCA-aligned spiral map is the first spiral variant in these experiments that becomes
reasonably competitive in a favorable latent-manifold regime, and QDMN-style refinement helps
mainly in low-margin ambiguous cases, but neither effect overturns the broader ranking against
random placement and strong flat baselines. A final matched-budget scale sweep makes the
caution sharper: the current implementation does not yet validate the architecture at scale.
1

===== PAGE 2 =====
The paper therefore argues for a narrower but more defensible conclusion: retrieval geometry
matters because it shapes candidate access, but practical success still depends on better root
lifting and a stronger ambiguity-aware within-pool scorer.
1 Problem and Claim
This paper studies a simple question: can a hair-like memory system use structured placement to
retrieve the right item more effectively than a flat content-addressed baseline? In the model, each
follicle stores aroot summary, which acts like a compressed retrieval key, and ashaft content, which
stores the detailed memory. A global controller—the “scalp”—first searches the root summaries
and then reads out the selected shaft.
The central claim is now narrower and clearer than in earlier drafts. Structured placement does
sometimes help, but only once retrieval explicitly exposes local or multi-root structure. The larger
lesson is that candidate discovery has improved substantially, whereas the remaining end-to-end
failure is concentrated in the final judgment stage: the system often surfaces a good pool and then
fails to choose correctly inside it. The main text therefore emphasizes the current mechanism, the
clearest empirical takeaways, and the updated bottleneck diagnosis. Detailed run-by-run history is
retained in the appendix.
2 Method
We model memory itemiwith a keyk i and a valuev i. The root summary is a compressed projection
ri = normalize(P ki),
wherePis a shared random projection matrix. At query time, the controller projects the query
into root space, scores every follicle with cosine similarity, and retrieves either the best follicle
or the to

## Conclusion/results excerpt
conclusions.
For additional transparency, the author also provides supporting materials, including chat conver-
sations and code used to run the experiments.
•Original ChatGPT conversation:https://chatgpt.com/share/69fb9c59-6a90-8324-a7b
5-e8877069364e
•Original Gemini conversation:https://gemini.google.com/share/6ea5706b5f64
•Original Grok conversation:https://grok.com/share/bGVnYWN5LWNvcHk_3bccc0c1-8faa-4
262-9e8b-d9a06d7c625a
•Colab notebook:https://colab.research.google.com/drive/1XW4GvLdr6K2mFZiZyYxGDiC
Yf2kvh6IS?usp=sharing
Abstract
This paper studies whether a hair-style memory architecture can use structured placement
to retrieve the right item more effectively than a strong flat content-addressed baseline. Across
a long sequence of synthetic experiments, the main positive result is that multi-root assignment
and larger root shortlists substantially improve candidate coverage. The main negative result
is that this stronger candidate exposure still does not reliably translate into better end-to-
end retrieval than flat key matching, because the final within-pool selector remains too weak
and current spiral root maps are often too concentrated. The later experiments sharpen both
points. A PCA-aligned spiral map is the first spiral variant in these experiments that becomes
reasonably competitive in a favorable latent-manifold regime, and QDMN-style refinement helps
mainly in low-margin ambiguous cases, but neither effect overturns the broader ranking against
random placement and strong flat baselines. A final matched-budget scale sweep makes the
caution sharper: the current implementation does not yet validate the architecture at scale.
1

===== PAGE 2 =====
The paper therefore argues for a narrower but more defensible conclusion: retrieval geometry
matters because it shapes candidate access, but practical success still depends on better root
lifting and a stronger ambiguity-aware within-pool scorer.
1 Problem and Claim
This paper studies a simple question: can a hair-like memory system use structured placement to
retrieve the right item more effectively than a flat content-addressed baseline? In the model, each
follicle stores aroot summary, which acts like a compressed retrieval key, and ashaft content, which
stores the detailed memory. A global controller—the “scalp”—first searches the root summaries
and then reads out the selected shaft.
The central claim is now narrower and clearer than in earlier drafts. Structured placement does
sometimes help, but only once retrieval explicitly exposes local or multi-root structure. The larger
lesson is that

## Detected headings
- result selection, and final framing were determined and verified by the author.
- Abstract
- 1 Problem and Claim
- 2 Method
- 3 Results and Interpretation
- 2. Structured placement changes geometry reliably, but only weakly improves retrieval
- experiments all reinforce the same point. Soft local smoothing is at best marginally helpful, naive
- conclusion of the paper is therefore that exposing better candidates is no longer enough: the
- conclusion is not a plotting accident. At the same time, the current local jury is still too noisy.
- method saturates. At moderate and high noise, the practical judges all fall well below the oracle,
- results slightly, suggesting that this stage is not especially sensitive to modest neighborhood-width
- method sees the same query set at each noise level, so any observed difference should come from
- result. The earlier severe spiral failure was at least partly caused by the specific root construction,
- method. Panel D shows that the oracle gap of the best non-oracle method remains substantial across
- method rises only to about 0.157 for random while remaining near 0.039 forspiral ortho. So the
- conclusion. A spiral map can help when it is aligned to the data geometry, but current spiral


---

# main (12).pdf

Source: D:\paper\main (12).pdf
Pages: 11 | Extracted words: 2708

Title guess: A Lightweight Selective-Routing Study for CPU-Only Inference / Thgie Eight / April 18, 2026

## Abstract excerpt
Abstract
This paper studies a lightweight selective-routing framework for CPU-only inference on
resource-constrained devices. The system keeps a small always-on guard active for routine
inputs and selectively activates stronger experts only when a routing signal indicates difficulty.
Rather than introducing a new model family, the work studies a model-agnostic routing policy
built around a guard, an expert stage, and a cost-aware trigger.
1

===== PAGE 2 =====
The main empirical finding is regime-dependent. In balanced settings such as digits, margin is
the strongest default routing signal and combined routing can slightly improve the accuracy–cost
frontier by adding a secondary notion of fragility. In the final real credit-card-fraud benchmark,
however, the best deployable policy is extremely conservative: under a 0.1% trigger-budget cap,
wobble preserves guard-level performance with mean balanced accuracy 0.9288, mean positive
recall 0.8606, and mean trigger rate 0.0006.
Overall, the paper characterizes when selective routing helps and when it should stay almost
silent. The results suggest that uncertainty signals dominate in balanced regimes, while stability
cues become most valuable when escalation must remain extremely rare.

## Introduction excerpt
1 Introduction
This paper explores a simple selective-inference idea: instead of relying on a single model for every
input, the system keeps a lightweight always-on controller and activates additional experts only
when the task appears harder. In this view, easy inputs are handled cheaply by the guard model,
while harder inputs trigger a short-lived burst of stronger computation. After the burst, the system
returns to a low-cost mode, similar to a temporary burst of extra computation followed by a return
to the low-cost path.
The central intuition is that not every example deserves the same amount of computation. A guard
can monitor confidence, trigger extra experts when uncertainty rises, aggregate their predictions,
and then deactivate them once the difficult region has passed. This creates a dynamic pipeline with
four ingredients: (i) an always-on guard, (ii) an expert stage that is invoked only when needed,
(iii) a routing signal that estimates hardness, and (iv) an explicit cost trade-off that prevents
constant escalation. Rather than redesigning models themselves, the paper studies a lightweight
orchestration layer that can wrap existing small classical models.
The main question is therefore not whether stronger experts can improve accuracy in principle, but
under what conditions a tiny routing policy can improve the accuracy–efficiency trade-off relative
to strong always-on baselines.
Contributions.This work makes three concrete contributions:
•It develops a lightweight, CPU-only selective routing framework that dynamically switches
between a guard model and stronger experts on a per-sample basis.
•It evaluates margin, wobble, combined, confidence, random, always-expert, and oracle base-
lines under repeated-seed and budget-constrained protocols.
•It shows that routing is regime-dependent: margin is the strongest default signal in balanced
settings, while wobble is the safest ultra-low-budget trigger under extreme class imbalance.

## Conclusion/results excerpt
Conclusion
The experiments in this paper support a simple but useful conclusion: a tiny CPU-only routing
controller can improve the accuracy–efficiency trade-off, but only when the guard, expert, and
trigger are well matched to the task. Raw margin is the best default signal, wobble is a useful
stability cue, and the combined signal is the most interesting frontier-improving variant. The
architecture is therefore viable as a lightweight orchestration layer, not as a new model family. Its
real value is in showing when to spend computation, when to save it, and how to make that choice
in a way that is interpretable, repeatable, and cheap enough to matter.
A Appendix: Full Experimental Details
A.1 Heart Disease MVP Results
The first prototype compared FP32, quantized-style, pure burst, and hybrid inference on the Cleve-
land heart disease dataset. It was useful as a diagnostic stage because it showed that weak helpers
can hurt predictive quality even when they reduce computation.
Table 1: Heart disease prototype summary.
Method Accuracy Macro F1 Wall ms/sample Trigger rate
FP32 baseline 0.877 0.8751 18.4064 –
Quantized-style wrapper 0.877 0.8751 13.4444 –
Pure Burst 0.833 0.8282 167.7704 0.487
Hybrid (quantized guard + burst) 0.821 0.8116 131.5921 0.387
6

===== PAGE 7 =====
Figure 2: Heart-disease prototype comparison used during the earliest development stage.
A.2 Light v2 Follow-Up
The lighter follow-up confirmed the same overall lesson: the control logic worked, but the helper
stage remained too weak to outperform the baseline in an accuracy-first setting.
Table 2: Light v2 follow-up summary.
Method Accuracy Runtime (s) Peak mem. (KB) Notes
Baseline 0.843 13.82 351.2 Reference model
Quantized 0.843 9.45 348.2 Same accuracy, lower time
Pure Burst 0.777 15.06 358.4 Disagreement = 0.229
Hybrid 0.744 6.03 360.2 Disagreement = 0.252
A.3 Light v3 Digits Results
The stronger digits setup made the routing story much clearer. The burst pathway became com-
petent, disagreement became rare, and the routing frontier became meaningful.
Table 3: Light v3 digits summary.
Method Accuracy Macro F1 Wall ms/sample Trigger rate Burst acc.
FP32 full 0.9611 0.9607 80.6982 – –
Quantized-style full 0.9611 0.9607 71.5888 – –
Pure Burst 0.9111 0.9090 42.0769 0.3000 0.9352
Hybrid 0.9083 0.9064 42.0267 0.3000 0.9352
7

===== PAGE 8 =====
Figure 3: Light v3 digits comparison showing the stronger expert pathway and the resulting routing
trade-off.
A.4 Guard Stress Test Diagnostics
The guard stress test showed that the guard was underconfident rather than overconfident, and
that the 

## Detected headings
- Experiment notebook / Colab
- Abstract
- 1 Introduction
- 2 Related Work
- 3 Method Overview
- 3.1 Cost-Aware Objective
- 3.2 Routing Signals
- 4 Experimental Progression
- appendix so that the main paper stays focused on the core routing lesson: the value of selectivity
- 4.1 Prototype Stage: Heart Disease
- 4.2 Digits Stage: When Routing Becomes Competitive
- 4.3 Signal Study: Margin, Wobble, and Combined Routing
- 4.4 Cross-Dataset Check
- 4.5 Final Rare-Event Benchmark
- 5 Discussion and Lessons Learned
- model, which is the right way to interpret the contribution.
- 6 Limitations and Future Work
- 7 Conclusion
- Method Accuracy Macro F1 Wall ms/sample Trigger rate
- Method Accuracy Runtime (s) Peak mem. (KB) Notes
- Method Accuracy Macro F1 Wall ms/sample Trigger rate Burst acc.


---

# main (16).pdf

Source: D:\paper\main (16).pdf
Pages: 33 | Extracted words: 9953

Title guess: Deterministic Spiral Sparsity as a Geometric Prior for Sparse / Neural Networks / Thgie Eight

## Abstract excerpt
Abstract
1

===== PAGE 2 =====
This paper studiesdeterministic spiral sparsity, a structured sparsity prior generated by
mapping points from a Fermat spiral onto a weight matrix before training begins. In the ex-
periments, the golden angle is used as one concrete instantiation of this broader deterministic
spiral construction. Unlike unstructured pruning, which removes parameters after optimization,
or random sparse initialization, which relies on stochastic placement, the proposed approach
uses a simple geometric rule to define which weights are trainable. We present the construc-
tion of the mask, describe masked linear and convolutional implementations, and report multi-
seed studies on MNIST, Fashion-MNIST, CIFAR-10, and CIFAR-100. In the matched-budget
MNIST comparison at 5% density, the recovered five-seed summary gives a final test accuracy
of 94.216±0.166% for the phyllotactic model, compared with 93.740±0.265% for a random
sparse baseline of matched density and 97.730±0.209% for a dense model. A broader den-
sity sweep shows that the golden-angle mask is competitive overall and particularly strong on
MNIST at 2% density, where it substantially outperforms the random sparse baseline, while
Fashion-MNIST results are more mixed. On CIFAR-10 with a small CNN at 5% density, the
golden-angle mask reaches 54.972±0.692% test accuracy versus 54.856±0.922% for matched
random sparsity and 72.120±0.617% for a dense baseline, indicating viability but no meaningful
advantage over random sparsity on that harder setting. On CIFAR-100 with a Tiny ResNet
at 10% density, the golden-angle mask reaches 27.187±2.120%, trailing both matched random
sparsity at 29.017±1.240% and a dense baseline at 37.450±1.205%. A follow-up training-budget
stress test on the same CIFAR-100 setting sharpens that conclusion: golden and random spar-
sity are nearly tied after one epoch, but random sparse pulls ahead by epoch 3 and finishes
2.690 percentage points higher after 10 epochs, suggesting that the geometric mask is learning
steadily but not catching up with training time alone. A revised CIFAR-10 edge microbench-
mark with a tiny sparse CNN, a dense baseline, only 20 training steps, and five seeds across
1%, 2%, and 5% density shows that the phyllotactic mask is helpful only in the tightest regime:
it beats random sparsity at 1% and 2% density, but loses at 5%. A companion dead-neuron
diagnostic shows that the deterministic masks do not avoid disconnected units in any dramatic
way. Follow-up causal and uniformity ablations on MNIST further show that neither maximiz-
ing coverage nor increasing entropy is sufficient to reproduce the small advantage of the original
phyllotactic mask. Taken together, the evidence supports a narrower claim than the original
golden-ratio hypothes

## Introduction excerpt
1 Introduction
Modern neural networks often achieve strong performance by using a large number of parameters,
even when many of those parameters may be redundant. This observation motivates the study of
sparse architectures, parameter pruning, and structured compression. Most existing approaches,
however, either begin from dense parameterizations and remove weights later, or impose sparsity
through random masks, thresholding, or hardware-driven structured blocks.
This work explores a different design principle: instead of viewing sparsity as a constraint imposed
after the fact, we treat it as ageometric priorspecified before training. The initial motivation
comes from phyllotaxis, but the experiments in this paper are better interpreted as a study of
deterministic spiral masks more generally. In practice, we sample points along a Fermat spiral and

## Conclusion/results excerpt
conclusion: golden and random spar-
sity are nearly tied after one epoch, but random sparse pulls ahead by epoch 3 and finishes
2.690 percentage points higher after 10 epochs, suggesting that the geometric mask is learning
steadily but not catching up with training time alone. A revised CIFAR-10 edge microbench-
mark with a tiny sparse CNN, a dense baseline, only 20 training steps, and five seeds across
1%, 2%, and 5% density shows that the phyllotactic mask is helpful only in the tightest regime:
it beats random sparsity at 1% and 2% density, but loses at 5%. A companion dead-neuron
diagnostic shows that the deterministic masks do not avoid disconnected units in any dramatic
way. Follow-up causal and uniformity ablations on MNIST further show that neither maximiz-
ing coverage nor increasing entropy is sufficient to reproduce the small advantage of the original
phyllotactic mask. Taken together, the evidence supports a narrower claim than the original
golden-ratio hypothesis: the useful property is structured, non-repeating connectivity geometry
rather than any specific constant such as the golden ratio or any simple scalar statistic. A final
fair MNIST 2% rerun that adds a magnitude-pruned baseline further sharpens that interpreta-
tion: the golden original mask clearly outperforms matched random sparsity (89.132±0.468%
versus 80.674±4.060%), but remains well below magnitude pruning (96.540±0.131%) and
the dense baseline (97.564±0.127%). At this stage, the contribution is best understood as a
promising architectural prior rather than a validated replacement for dense connectivity.
1 Introduction
Modern neural networks often achieve strong performance by using a large number of parameters,
even when many of those parameters may be redundant. This observation motivates the study of
sparse architectures, parameter pruning, and structured compression. Most existing approaches,
however, either begin from dense parameterizations and remove weights later, or impose sparsity
through random masks, thresholding, or hardware-driven structured blocks.
This work explores a different design principle: instead of viewing sparsity as a constraint imposed
after the fact, we treat it as ageometric priorspecified before training. The initial motivation
comes from phyllotaxis, but the experiments in this paper are better interpreted as a study of
deterministic spiral masks more generally. In practice, we sample points along a Fermat spiral and
2

===== PAGE 3 =====
project them onto the coordinates of a weight matrix to define a fixed sparse mask.
The resulting architectu

## Detected headings
- Abstract
- 1 Introduction
- 2 Conceptual Motivation
- 3 Related Work
- experiments. That is why the main empirical emphasis falls on density dependence, dead-neuron
- 4 Method
- 4.1 Deterministic Spiral Mask
- 5 Experimental Results
- Model Test Accuracy Noisy Test Accuracy Active Parameters
- 5.1 Density Sweep Across Datasets
- 5.2 Performance at the Edge of Sparsity
- 5.4 What the Results Do and Do Not Show
- 5.5 Angle Sensitivity Ablation
- Model / Angle Test Accuracy
- experiments. The safest synthesis across all experiments in this draft is therefore: structured deter-
- 5.6 Generalization to Fashion-MNIST
- model is only 0.048 percentage points below random sparsity on average in this Fashion-MNIST
- 5.7 CIF AR-10 Small CNN
- Model Test Accuracy Train Accuracy
- model remains clearly above both sparse curves throughout training, whereas the phyllotactic and
- 5.8 CIF AR-100 Tiny ResNet
- results.
- 5.9 CIF AR-100 Training-Budget Stress Test
- experiment on CIFAR-100 using the same 10% Tiny-ResNet setting but extending training to 10
- Model Epoch 1 Epoch 3 Epoch 5 Epoch 10
- 5.10 CIF AR-10 Edge Microbenchmark, Dense Baseline, and Dead-Neuron Di-
- model stays above random sparsity at steps 5, 10, and 20; at 2% density the ordering is mixed
- 6 Mechanism Analysis
- 6.1 Revisiting Coverage and Distribution Hypotheses
- 6.2 Evidence for Structured Non-Random Connectivity
- 6.3 What the Aspect-Aware Variant Shows
- 6.4 What Can and Cannot Be Claimed
- 6.5 Cross-Dataset Summary
- 7 Experimental Program
- 7.1 Baselines
- 7.2 Datasets
- 7.3 Metrics
- 7.4 Ablations
- 8 Discussion
- experiments add a second limitation: even when deterministic sparse masks remain viable, their
- 9 Conclusion
- experiments and help document how the final interpretation emerged.


---

# main.pdf

Source: D:\paper\main.pdf
Pages: 29 | Extracted words: 5511

Title guess: QDMN: Quad-Directional Modular Networks as Explicit / Multi-Route Processing Fabrics / Thgie Eight

## Abstract excerpt
Abstract
We introduceQuad-Directional Modular Networks(QDMN), an architecture-first framework
that treats computation as an explicit multi-directional fabric rather than a single feed-forward
pipeline. QDMN exposes four semantic processing directions—Forward (F), Backward (B), Up
1

===== PAGE 2 =====
(U), and Down (D)—implemented as registrable modules with declared input/output feature
dimensions. Aroute(e.g., [F,U,D]) deterministically advances a centralCoreNodestate through
compatible modules, enabling hand-designed or algorithmically selected multi-stage inference
and reconstruction cycles.
Contributions.
•A routing-and-registry abstraction for multi-directional module composition with dimension-
aware dispatch.
•A minimal PyTorch reference implementation (Appendix) suitable as a reproducibility
artifact.
•Suggested evaluation protocols for U-to-D reconstruction, F-to-B refinement/consistency,
and route-length adaptive compute.

## Introduction excerpt
1 Introduction
Neural networks are commonly described in terms of a forward pass (computing predictions) and
a backward pass (computing gradients). However, these notions conflate two distinct ideas: (i) the
semantic directionof information processing (e.g., refining, abstracting, reconstructing) and (ii) the
mathematical directionused by training algorithms (e.g., reverse-mode automatic differentiation).
This paper explores a framework question: can we make multiplesemanticprocessing directions
first-class primitives, so that inference is an explicit, programmable composition of directional
transformations?
We proposeQDMN(Quad-Directional Modular Network), a routing framework that:
•assigns modules to four direction symbols:F(forward/progression),B(backward/refinement
or consistency),U(up/compression or abstraction), andD(down/expansion or reconstruc-
tion);
•stores a mutable representation in a centralCoreNode;
•executes explicitroutes—sequences of direction symbols—with dimension-aware module dis-
patch.
What is new here (in this draft).The individual ideas of “up/down” (encoder–decoder pro-
cessing) and iterative refinement exist in many architectures. The intended novelty of QDMN is the
interface: a general, compositionalfabricin which multiple directional modules can be registered
and recombined. In particular:
•Up/Down as reusable primitives:“U” and “D” are not tied to one fixed encoder–decoder
graph; they are modules that can appear multiple times and interleave with refinement steps.
•Route-as-program:inference is controlled by an explicit route (e.g., [F,U,D,B,H]), en-
abling route switching at test time.
•Dimension-typed registry:modules are keyed by input feature dimension, making com-
patibility checks and multi-scale routing explicit.
•T oward grid-like composition:the same abstractions can be extended from 1-D routes
to 2-D “processing fabrics” (a grid of reusable directional transitions), although this draft
focuses on sequential routes.

## Conclusion/results excerpt
Conclusion
QDMN reframes neural computation as an explicit multi-directional program over a shared core
state. By making routing and directionality first-class, QDMN provides a compact scaffold for
experimentation with refinement, abstraction, reconstruction, and adaptive inference.
A Reproducibility Artifact (Single-Block Script)
We include a single-file benchmark script (data generation, baselines, QDMN variants, and the
route-switching diagnostic) as a reproducibility artifact.
"""
QDMN:␣Framework␣+␣Benchmark␣Single-Block␣Script
Paste␣in␣Colab␣(or␣run␣in␣any␣Python␣env␣with␣torch␣installed).
Purpose:
-␣Provide␣a␣concise,␣reproducible␣demonstration␣of␣QDMN␣(Quad-Directional␣Modular␣Network
)
␣␣as␣a␣general␣framework␣(register␣modules,␣run␣routes).
-␣Provide␣a␣set␣of␣benchmark␣experiments␣comparing␣QDMN␣to␣common␣baselines.
-␣Include␣the␣"Route-Switching / Novelty"␣test␣that␣shows␣QDMN’s␣runtime␣route␣
flexibility.
Notes:
-␣This␣is␣a␣compact␣demo␣for␣a␣paper.␣Increase␣model␣sizes␣/␣dataset␣sizes␣/␣epochs␣for␣
stronger␣claims.
-␣The␣QDMN␣framework␣operates␣on␣the␣*last*␣dimension␣of␣tensors.␣For␣structured␣data␣(
images),
␣␣we␣flatten␣or␣use␣Conv␣modules␣that␣respect␣channel/height/width␣␣examples␣provided.
Author:␣(You)␣␣include␣this␣cell␣as␣the␣reproducible␣artifact␣for␣your␣paper.
"""
import time, random, os
from typing import Dict, List, Optional
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import TensorDataset, DataLoader
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
# ------------------------
# Config (tweak as needed)
# ------------------------
SEED = 42
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Device:", DEVICE)
# Default hyperparameters (paper: report these)
EPOCHS_SMALL = 25 # small for quick runs; increase for stronger claims
8

===== PAGE 9 =====
EPOCHS_LARGE = 60 # for regression or when you need better fit
BATCH = 64
LR = 1e-3
# ------------------------
# QDMN Framework
# ------------------------
class CoreNode(nn.Module):
def __init__(self, initial_dim: int):
super().__init__()
self._state: Optional[torch.Tensor] = None
self._dim = initial_dim
def set(self, x: torch.Tensor):
if x.shape[-1] != self._dim and self._state is None:
# allow initial state to set dim if created differently, but prefer consistent
initial_dim
self._dim = x.shape[-1]
self._state = x
self._dim = x.shape[-1]
def get(self) -> torch.Tensor:
if self._state is None:
raise RuntimeError("CoreNode␣empty:␣call␣set(x)␣first")
r

## Detected headings
- Abstract
- 1 Introduction
- 2 Related Work (Positioning)
- 3 QDMN Framework
- 3.1 Core Abstractions
- 3.2 Routing Semantics
- 3.3 Design Notes
- 4 Reference Implementation
- 4.1 Complexity
- 5 Experiments
- 5.1 Goals
- model. Our experiments target three questions: (i) can QDMN express common computation
- 5.2 Tasks
- 5.3 Training setup
- 6 Results and Discussion
- 6.1 Benchmark summary
- 6.2 Depth generalization: naive vs stable refiners
- Model/setting Val. MSE (mean±std) Test MSE (mean±std)
- 6.3 Multi-seed results (paper-ready script)
- 7 Limitations
- 8 Conclusion
- model.to(device)
- model.train()
- model.eval()
- results = []
- results.append({
- model = QDMN_Master()


---

# M-CLTR.pdf

Source: D:\paper\M-CLTR.pdf
Pages: 8 | Extracted words: 2438

Title guess: M-CLTR: Measurable Controlled Latent Trajectory Reasoning / Thgie Eight / Transparency and Provenance Note

## Abstract excerpt
Abstract
We introduce M-CLTR, a measurable latent reasoning framework that separates knowledge
quality from control over iterative computation. The system operates over a small action
space—continue, overwrite, and restart—and logs internal signals to evaluate reasoning behavior.
Across a sequence of synthetic diagnostics, the control space contains real signal, as evidenced
by recurrent oracle improvements, but overall performance is dominated by knowledge quality.
Recipe visibility has only a small effect, and the learned controller remains brittle, often overusing
restart or failing to outperform simple baselines. In its current form, M-CLTR is best understood
as a diagnostic framework for studying latent reasoning control rather than as a complete
reasoning solution.

## Introduction excerpt
1 Introduction
Recent work on reasoning systems increasingly relies on latent computation rather than purely
left-to-right text generation. Yet most such systems treat their internal reasoning trajectories as
1

===== PAGE

## Conclusion/results excerpt
conclusions.
For additional transparency, the author also provides supporting materials, including chat
conversations and code used to run the experiments.
• Summarized ChatGPT conversation:https://chatgpt.com/share/69f20851-0c10-8322-b
59b-408d8ab4a9e8
•Original Gemini conversation:https://gemini.google.com/share/3cee19ece8bc
• Original Grok conversation:https://grok.com/share/bGVnYWN5LWNvcHk_4c490983-ae6f-4
dd5-a1c4-2f26aa3b420a
• Colab notebook: https://colab.research.google.com/drive/18Ya2CYoC0AxaX3NmjQ_VX
O2yp-YCT8oo?usp=sharing
Abstract
We introduce M-CLTR, a measurable latent reasoning framework that separates knowledge
quality from control over iterative computation. The system operates over a small action
space—continue, overwrite, and restart—and logs internal signals to evaluate reasoning behavior.
Across a sequence of synthetic diagnostics, the control space contains real signal, as evidenced
by recurrent oracle improvements, but overall performance is dominated by knowledge quality.
Recipe visibility has only a small effect, and the learned controller remains brittle, often overusing
restart or failing to outperform simple baselines. In its current form, M-CLTR is best understood
as a diagnostic framework for studying latent reasoning control rather than as a complete
reasoning solution.
1 Introduction
Recent work on reasoning systems increasingly relies on latent computation rather than purely
left-to-right text generation. Yet most such systems treat their internal reasoning trajectories as
1

===== PAGE 2 =====
opaque. M-CLTR asks a narrower question: can a latent reasoning trajectory be explicitly controlled,
internally measured, and corrected during execution?
The goal of this paper is not to claim a general reasoning breakthrough, but to test whether a
small set of control actions can reveal meaningful structure inside iterative latent computation. In
particular, we ask whether:
•control decisions are meaningful rather than arbitrary,
•internal evaluator signals correlate with downstream correctness, and
•reasoning failures can sometimes be detected and repaired by simple interventions.
M-CLTR therefore acts as a plug-in control layer over a base knowledge representation. Its action
space is deliberately small:
at ∈ {continue,overwrite,restart}.
This compact design makes the reasoning process measurable enough to study, even if it is not yet
strong enough to solve difficult tasks reliably.
2 Method
2.1 Framework
Given an inputx, a base model produces an initial knowledge representation,
k0 =K(x), z 0 =E(k 0),
whereEmaps knowledge into 

## Detected headings
- Abstract
- 1 Introduction
- 2 Method
- 2.1 Framework
- 2.2 Logged Metrics
- 3 Experimental Setup
- 3.1 Knowledge Diagnostic
- 3.2 Controller Comparison
- 3.3 Tasks
- 4 Results
- 4.1 Knowledge Isolation
- 4.2 Controller-Only Stress Test
- 4.3 Summary by Knowledge Strength
- 4.4 Key Observations
- 4.5 Action Behavior and Speed
- 5 Discussion
- 6 Conclusion
- experiments were unstable and highly seed-sensitive, so they were useful mainly for mechanism
- experiments could ask whether control quality improves smoothly as knowledge improves. This


---
