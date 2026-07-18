# PF2V-WM main (13)

## Lines 354-466

354: 11 Experimental Program and Main Findings
355: A staged evaluation strategy is critical because the full model introduces several interacting mech-
356: anisms. The experiments in this draft should be read as prototype diagnostics rather than as
357: a mature benchmark claim. They ask a focused question: can phase-field latent dynamics form
358: sparse, obstacle-aware route structure, and how do solver depth, thresholding, memory, and readout
359: design affect that structure?
360: 11.1 Minimal Viable Prototype
361: The initial prototype used a single 64×64 latent grid with one damage field, one potential field,
362: one anisotropic stiffness mechanism, one spiral alignment prior, one total variation penalty, and one
363: task-specific readout head. This setup was sufficient to test whether fracture-style latent inference
364: could produce sparse, coherent trajectories in a controlled path-connection task.
365: 11.2 Observed Experimental Trajectory
366: The empirical trajectory was not monotonic. Early start–goal path runs showed decreasing loss but
367: mostly produced endpoint activation, diffuse bridges, or broad low-frequency blobs. Sharpening
368: the damage field, adding edge losses, and annealing the target width improved local contrast but
369: did not by themselves create thin connected paths. Later experiments introduced more structural
370: pressure: core–spread separation, obstacle-bending tasks, explicit route metrics, memory probes,
371: material-only inference, threshold sweeps, and soft shortest-path controls.
372: The most important negative result is that generic overlap and apparent connectivity can be mis-
373: leading. The soft-control baseline often produced high connectivity, but much of that connectivity
374: came from broad value-field activation that crossed obstacle regions. For this task, a useful route
375: model must balance hard IoU, route ratio, obstacle overlap, route gap, and connectivity rather
376: than optimizing any single metric.
377: 11.3 Final Prototype Summary
378: The final paper pack identified material-thin PF2V as the best current fracture-style variant before
379: the final focus run. In the three-seed robustness check, material-thin with threshold selection
380: reached mean hard IoU 0.1244±0.0096 on the standard split with obstacle overlap 0.1780±0.0141,
381: while the soft-control thresholded baseline reached hard IoU 0.0500±0.0027 with obstacle overlap
382: 0.5888±0.0154. This supports the claim that material-style dynamics are more obstacle-selective
383: than the broad soft-control solution.
384: The final focus run then warm-started from the material-thin model and added stronger core
385: commitment, endpoint pressure, centerline supervision, side suppression, and obstacle penalties.
386: Its best thresholded standard result reached hard IoU 0.2066, route ratio 0.7165, obstacle overlap
387: 0.1826, and connectivity 0.0665. On the harder obstacle split, the best thresholded result reached
388: hard IoU 0.1866, route ratio 0.7173, obstacle overlap 0.1470, and connectivity 0.0795. These are the
389: strongest results in the manuscript, but they remain prototype-level: the outputs are route-aware
390: and obstacle-selective, not yet clean binary corridors.
391: 8
393: ===== PAGE 9 =====
394: Setting Hard IoU Route Ratio ObsOverlap Conn.
395: material-thin robust std 0.1244±0.0096 0.7946±0.0163 0.1780±0.0141 0.0727±0.0098
396: soft-control robust std 0.0500±0.0027 0.9652±0.0051 0.5888±0.0154 1.0395±0.0060
397: final focus std 0.2066 0.7165 0.1826 0.0665
398: final focus hard 0.1866 0.7173 0.1470 0.0795
399: Table 1: Main empirical summary from the final robustness and focus runs. Material-style PF 2V
400: variants are more obstacle-selective than soft-control, and the final focus run gives the strongest
401: hard-IoU results, but connectivity remains weak and threshold-sensitive.
402: 11.4 Recommended Next Experiments
403: The next experiments should focus less on proving route awareness and more onroute hardening:
404: converting faint route-like probability mass into a thin, continuous, threshold-stable path. Useful
405: next steps include continuity losses on skeletons or differentiable graph connectivity, learned post-
406: solvers that harden only the core path, stronger obstacle penalties applied directly to the final
407: prediction, and comparisons against obstacle-conditioned CNN and differentiable-planning baselines
408: under identical metrics.
409: Key evaluation axes should include predictive accuracy, obstacle overlap, start-to-goal connectivity,
410: route gap, threshold sensitivity, number of inner solver steps, spatial sparsity, and interpretability
411: of the damage and potential fields.
412: 12 Scientific Positioning and Claims
413: The strongest defensible claims of PF 2V-WM are architectural and algorithmic rather than biolog-
414: ical. Specifically, the model suggests that:
415: 1. variable-depth computation can emerge from a latent variational medium without a separate
416: routing controller;
417: 2. geometric priors such as spiral structure and directional anisotropy can be encoded directly in
418: the latent physics;
419: 3. memory can be represented structurally through material-property updates rather than opaque
420: recurrent state alone; and
421: 4. multiscale fracture dynamics may improve coherence on tasks requiring long-range dependency
422: tracking.
423: At the same time, the honest novelty claim is limited in scope. PF 2V-WM does not introduce an
424: entirely new class of phase-field mathematics; rather, it repurposes and recombines known ingre-
425: dients into a new computational interpretation. Its strongest claim is therefore that a multiscale
426: phase-field latent medium can serve as an adaptive inference substrate in which fracture propa-
427: gation, anisotropy, geometric priors, and hardening jointly implement reasoning. This framing is
428: more original than any individual equation viewed in isolation.
429: These claims are testable through ablation and comparative experiments. They do not require any
430: assertion that natural intelligence literally implements fracture physics. They also do not imply that
431: 9
433: ===== PAGE 10 =====
434: PF2V-WM is already better than established alternatives. Until validated, it should be regarded
435: as an interpretable, high-risk, potentially high-reward alternative to standard latent world models
436: and hybrid neural–physics systems.
437: 13 Limitations and Open Questions
438: Several challenges remain before this proposal can be considered a mature model class.
439: •Optimization difficulty:unrolled variational solvers may be expensive and sensitive to hy-
440: perparameters.
441: •Discretization choices:stability depends on finite-difference stencils, boundary conditions,
442: and the parameterization of bounded damage fields.
443: •Interpretability versus flexibility:strong geometric priors can improve structure but may
444: overspecialize the model.
445: •Benchmark selection:tasks should genuinely reward adaptive internal computation rather
446: than merely spatial inductive bias.
447: •Current prototype weakness:the final focus model improves hard IoU and obstacle selec-
448: tivity, but the visible routes remain threshold-sensitive and often fragmentary rather than clean
449: binary corridors.
450: •Evaluation mismatch:generic overlap and raw connectivity metrics can overstate progress
451: on path tasks, especially when broad value fields cross obstacles; route gap, obstacle overlap,
452: and threshold sensitivity must be reported together.
453: Future work may investigate implicit differentiation, learned preconditioners, richer anisotropy
454: families, partial crack healing, improved path-specific objectives, connectivity-aware losses, and
455: extensions to 3D or non-Euclidean latent domains.
456: 14 Conclusion
457: PF2V-WM reframes world modeling as inference in a structured latent material governed by phase-
458: field fracture dynamics. The framework replaces a monolithic hidden state with fields for damage,
459: potential, and memory, and it embeds geometric and topological biases directly into an energy
460: functional. Across the prototype sequence, the idea proves neither trivial nor solved: early models
461: mostly formed blobs, while later material-style variants became more obstacle-selective and the
462: final focus model achieved the strongest path-overlap results.
463: The final empirical conclusion is therefore cautious. PF 2V-WM is not yet a robust planner, and the
464: current implementation does not reliably materialize clean connected binary paths. However, the
465: final experiments show that material-style phase-field dynamics can encode partial obstacle-aware
466: route structure more selectively than a broad soft-control baseline. The next technical bottleneck

## Lines 2590-2775

2590: steps, with hard IoU 0.0526, but it has higher obstacle overlap at 0.1970. The additive and material-memory
2591: variants are more conservative, but their hard IoU is lower at the same step.
2592: Model / setting Soft Hard Ratio ObsOverlap Gap Conn.
2593: base, steps 4 0.0374 0.0526 0.8566 0.1970 0.8992 0.0329
2594: additive, steps 4 0.0377 0.0034 0.8805 0.1402 0.9937 0.0000
2595: material, steps 4 0.0351 0.0070 0.8915 0.1345 0.9930 0.0002
2596: material-thin, steps 4 0.0393 0.0710 0.7455 0.1673 0.9117 0.0067
2597: material-thin, steps 8 0.0219 0.0000 0.7551 0.0369 1.0000 0.0000
2598: material-thin, steps 16 0.0070 0.0000 0.8904 0.0046 1.0000 0.0000
2599: Table 35: Final paper-pack standard held-out comparison. The material-thin model gives the best
2600: visible PF2V hard IoU at four steps, but deeper steps suppress the path while improving obstacle
2601: avoidance.
2602: The threshold sweep confirms that this final material-thin result is not merely a low-threshold artifact. At the
2603: best step, threshold 0.35 is also the best overall threshold, with hard IoU 0.0710. Lowering to 0.25 increases
2604: connectivity to 0.0866 and reduces route gap to 0.8078, but hard IoU falls slightly to 0.0612. Raising to 0.50
2605: leaves only a tiny fragment, with hard IoU 0.0444 and connectivity 0.0012.
2606: X.3 Harder Generalization and Soft Control
2607: The harder generalization set tells a similar story. The material-thin model again performs best at four
2608: steps, with hard IoU 0.0636, soft IoU 0.0466, route ratio 0.8518, obstacle overlap 0.1785, and connectivity
2609: 0.0178. At threshold 0.25, the hard-generalization hard IoU rises to 0.0848 and connectivity rises to 0.1484,
2610: but this comes with the usual lower-threshold tradeoff: a less selective, more permissive visible mask.
2611: 91
2613: ===== PAGE 92 =====
2614: The soft shortest-path control is worse as a route-valid solution. Its best step is 8, with hard IoU 0.0479,
2615: route ratio 0.9557, obstacle overlap 0.5814, and connectivity 1.3847. The high connectivity is misleading:
2616: the control creates broad connected activation through obstacle regions rather than a selective detour. Its
2617: best threshold, 0.50 at eight steps, improves hard IoU only to 0.0528 while obstacle overlap remains 0.5814.
2618: Setting Soft Hard Ratio ObsOverlap Gap Conn. Threshold
2619: thin standard best step 0.0393 0.0710 0.7455 0.1673 0.9117 0.0067 0.3500
2620: thin hard-gen best step 0.0466 0.0636 0.8518 0.1785 0.9148 0.0178 0.3500
2621: thin hard-gen best threshold 0.0466 0.0848 0.8518 0.1785 0.7117 0.1484 0.2500
2622: soft control best step 0.0482 0.0479 0.9557 0.5814 0.0227 1.3847 0.3500
2623: soft control best threshold 0.0482 0.0528 0.9557 0.5814 0.1727 1.0285 0.5000
2624: Table 36: Final paper-pack comparison between material-thin PF 2V, harder generalization, and
2625: the soft-control baseline. Material-thin has lower connectivity but far lower obstacle overlap; the
2626: soft control is connected mainly because it is broad and obstacle-overlapping.
2627: X.4 What We Learn from the Final Pack
2628: The final pack supports a cautious paper claim. The material-thin PF 2V model is not yet a robust route
2629: solver, but it is the best current compromise between path visibility and obstacle selectivity. It produces
2630: faint, fragmentary route mass that can sometimes survive thresholding, while keeping obstacle overlap far
2631: below the soft-control baseline. The key limitation remains the same: the model has partial route logic, but
2632: it still fails to materialize a connected corridor.
2633: The harder generalization result is encouraging in a narrow sense. The model does not collapse completely
2634: when obstacles are larger and the bend is stronger. However, the hard path is still weak, and the visible
2635: route requires the shallow four-step regime. Deeper schedules continue to clean up obstacle overlap at the
2636: cost of erasing the path.
2637: The soft-control result helps position the contribution. A more planning-like value-field baseline can produce
2638: high connectivity, but it does so by lighting up broad regions and overlapping obstacles. This makes it a
2639: useful negative control: connectivity alone is not evidence of good routing. For this task, selective visibility
2640: and obstacle avoidance matter together.
2641: X.5 Recommended Final Framing
2642: The final manuscript should frame the empirical evidence as a prototype study, not as a solved benchmark:
2643: •present material-thin PF 2V as the strongest current fracture-style variant;
2644: •emphasize the tradeoff between shallow visible paths and deeper obstacle suppression;
2645: •use the soft-control baseline as evidence that broad connectivity is not enough;
2646: •state that the main remaining problem is connected path materialization;
2647: •propose future work on stronger core commitment, continuity losses, and hybrid planners that harden
2648: only thin corridors.
2649: X.6 Qualitative Figures from the Final Pack
2650: Figures 42, 43, and 44 show the final qualitative comparison. The standard material-thin example contains
2651: a localized but fragmented route signal. The hard-generalization example shows that the model retains
2652: 92
2654: ===== PAGE 93 =====
2655: Figure 42: Twenty-fourth prototype final-pack standard material-thin result. The model localizes
2656: route-like mass in the core and prediction, but the thresholded outputs remain fragmented and
2657: sparse.
2658: Figure 43: Twenty-fourth prototype final-pack hard-generalization result. The material-thin model
2659: retains structured activation under a harder obstacle layout, but it still does not yield a clean
2660: connected binary path.
2661: some structured activation under a harder obstacle layout, but it still lacks a clean binary corridor. The
2662: soft-control example shows the opposite failure mode: broad value-field activation with poor selectivity.
2663: X.7 Seed Robustness and Paper Summary Plots
2664: After the final-pack comparison, an additional robustness evaluation was run over three random held-out
2665: batches using seeds 0, 1, and 2. The evaluation reused the already-trained material-thin PF 2V model and
2666: the soft-control baseline, and swept solver steps and thresholds on both the standard held-out setting and
2667: the harder generalization setting. The purpose was not to retrain the models, but to check whether the final
2668: qualitative conclusion survives modest batch-level randomness.
2669: Table 37 summarizes the robustness run. The material-thin model remains clearly more obstacle-selective
2670: 93
2672: ===== PAGE 94 =====
2673: Figure 44: Twenty-fourth prototype final-pack soft-control result. The soft-control baseline pro-
2674: duces broad value-field activation and high apparent connectivity, but its prediction is not a selective
2675: obstacle-avoiding corridor.
2676: than the soft-control baseline. On the standard setting, material-thin with threshold selection reaches mean
2677: hard IoU 0.1244±0.0096 with obstacle overlap 0.1780±0.0141, while soft-control with threshold selection
2678: reaches only 0.0500±0.0027 hard IoU and much higher obstacle overlap 0.5888±0.0154. On the hard setting,
2679: material-thin again improves hard IoU relative to soft-control and keeps obstacle overlap near 0.18, whereas
2680: soft-control remains near 0.45 obstacle overlap. The tradeoff is still visible: soft-control has much larger
2681: apparent connectivity, but that connectivity is coupled to broad obstacle-overlapping activation.
2682: Model Set Hard IoU Route Ratio ObsOverlap Conn.
2683: material-thin hard 0.0982±0.0239 0.8376±0.0274 0.1807±0.0143 0.0283±0.0134
2684: material-thin std 0.0788±0.0095 0.7946±0.0163 0.1780±0.0141 0.0074±0.0024
2685: material-thin-thresh hard 0.1106±0.0248 0.8376±0.0274 0.1807±0.0143 0.1580±0.0384
2686: material-thin-thresh std 0.1244±0.0096 0.7946±0.0163 0.1780±0.0141 0.0727±0.0098
2687: soft-control hard 0.0489±0.0062 1.0241±0.0155 0.4514±0.0070 1.2645±0.0086
2688: soft-control std 0.0452±0.0020 0.9652±0.0051 0.5888±0.0154 1.3786±0.0130
2689: soft-control-thresh hard 0.0492±0.0064 1.0241±0.0155 0.4514±0.0070 1.0212±0.2180
2690: soft-control-thresh std 0.0500±0.0027 0.9652±0.0051 0.5888±0.0154 1.0395±0.0060
2691: Table 37: Three-seed robustness summary for the final paper pack. Values report mean±standard
2692: deviation over seeds 0, 1, and 2. Threshold selection improves material-thin hard IoU and con-
2693: nectivity while preserving low obstacle overlap; soft-control remains highly connected but obstacle-
2694: overlapping.
2695: A compact paper-summary extraction was also generated from the saved final-pack JSON files. Table 38
2696: records the best single-row comparison used for the summary plots. This table reinforces the same inter-
2697: pretation: material-thin is the best current PF 2V variant for visible path recovery, while soft-control has
2698: superficially high connectivity but poor obstacle selectivity.
2699: Model Hard IoU Route Ratio ObsOverlap Conn.
2700: base 0.0526 0.8566 0.1970 0.0329
2701: additive 0.0034 0.8805 0.1402 0.0000
2702: material 0.0070 0.8915 0.1345 0.0002
2703: material-thin 0.0710 0.7455 0.1673 0.0067
2704: soft-control 0.0528 0.9557 0.5814 1.0285
2705: Table 38: Compact paper-summary table extracted from the saved final-pack results. Material-
2706: thin has the best PF 2V hard IoU, while soft-control has high connectivity but much worse obstacle
2707: overlap.
2708: 94
2710: ===== PAGE 95 =====
2711: Figures 45, 46, and 47 show the generated paper-summary plots. The bar summary makes the main contrast
2712: visually explicit: soft-control connectivity is high, but this coincides with high obstacle overlap. The material-
2713: thin step sweep shows the same shallow-depth tradeoff identified above: early steps preserve visible route
2714: mass, while deeper steps increasingly suppress the path. The threshold sweep shows that threshold 0.35
2715: is the best operating point for hard IoU in the final material-thin summary, while lower thresholds trade
2716: selectivity for connectivity.
2717: Figure 45: Final paper-summary bar plots comparing hard IoU, route ratio, obstacle overlap,
2718: and connectivity across the main model variants. The soft-control baseline has high apparent
2719: connectivity, but also the largest obstacle overlap.
2720: X.8 Final Focus Run and Combined Conclusion
2721: A final focus run was then performed to combine the lessons from the final-pack comparison and the subse-
2722: quent robustness check. This run warm-started from the previous material-thin model and trained a stronger
2723: material-memory variant with more explicit core commitment, endpoint pressure, centerline supervision, ob-
2724: stacle avoidance, side suppression, and thinness regularization. The aim was to test whether the previous
2725: obstacle-selective but fragmented route signal could be made more visible without returning to the broad
2726: obstacle-overlapping behavior of the soft-control baseline.
2727: During training, the focus model showed intermittent but meaningful gains in visible path recovery. By
2728: epoch 25, the monitored batch reached hard IoU 0.1813, soft IoU 0.0786, route ratio 0.7424, obstacle overlap
2729: 0.2252, and connectivity 0.1289. This is not a fully solved routing model, but it is a stronger result than
2730: the earlier final-pack material-thin snapshot: the model can now reach substantially higher hard IoU while
2731: retaining lower obstacle overlap than the soft-control baseline.
2732: Table 39 summarizes the step sweep. On the standard held-out batch, the best step-only hard IoU occurs
2733: at 8 steps, with hard IoU 0.1860 and connectivity 0.1511, but obstacle overlap is still high at 0.4114. At 12
2734: steps, hard IoU remains high at 0.1766 while obstacle overlap falls to 0.1826, showing a better selectivity
2735: 95
2737: ===== PAGE 96 =====
2738: Figure 46: Material-thin step sweep from the final paper pack. The strongest visible path signal
2739: appears at shallow solver depth, while additional steps reduce obstacle overlap but also erase the
2740: already-fragile path.
2741: Figure 47: Material-thin threshold sweep at the best final-pack step. Threshold 0.35 gives the best
2742: hard IoU, while lower thresholding increases connectivity and reduces route gap at the cost of less
2743: selective activation.
2744: 96
2746: ===== PAGE 97 =====
2747: tradeoff. At 16 steps, obstacle overlap improves further to 0.0752, but the visible path weakens. The hard-
2748: generalization batch follows the same pattern: 12 steps gives the best step-only compromise, with hard IoU
2749: 0.1680 and obstacle overlap 0.1470.
2750: Split Setting Soft Hard Ratio ObsOverlap Conn.
2751: standard steps 4 0.0705 0.1047 0.8796 0.6892 0.8144
2752: standard steps 8 0.0876 0.1860 0.7700 0.4114 0.1511
2753: standard steps 12 0.0829 0.1766 0.7165 0.1826 0.0273
2754: standard steps 16 0.0648 0.1104 0.7365 0.0752 0.0054
2755: hard steps 4 0.0757 0.0949 0.9271 0.7002 0.9579
2756: hard steps 8 0.0927 0.1652 0.8190 0.3973 0.2914
2757: hard steps 12 0.0823 0.1680 0.7173 0.1470 0.0441
2758: hard steps 16 0.0582 0.1082 0.6662 0.0480 0.0055
2759: Table 39: Final focus run step sweep. The focus model improves visible hard IoU, especially at
2760: 8–12 steps, but retains the depth tradeoff: shallow steps are connected and broad, while deeper
2761: steps are obstacle-selective but fragmentary.
2762: The threshold sweep gives the strongest single numbers from the final focus run. On the standard batch,
2763: the best thresholded setting is step 12 at threshold 0.20, reaching hard IoU 0.2066, route ratio 0.7165,
2764: obstacle overlap 0.1826, and connectivity 0.0665. On the harder batch, the best thresholded setting is step
2765: 12 at threshold 0.25, reaching hard IoU 0.1866, route ratio 0.7173, obstacle overlap 0.1470, and connectivity
2766: 0.0795. These values represent the clearest final evidence that the material focus model improves path
2767: visibility relative to the earlier material-thin result while avoiding the large obstacle overlap of soft-control.
2768: Split Threshold Step Threshold Hard IoU Route Ratio ObsOverlap Conn.
2769: standard 12 0.20 0.2066 0.7165 0.1826 0.0665
2770: hard 12 0.25 0.1866 0.7173 0.1470 0.0795
2771: Table 40: Final focus paper summary. Values report the best thresholded focus-model outputs,
2772: so the threshold step can differ from the best fixed-threshold step sweep. These settings give the
2773: strongest final hard-IoU results while keeping obstacle overlap below the broad soft-control baseline.
2774: Figures 48, 49, and 50 show the final focus visuals. The standard and hard examples show stronger route-
2775: like activation than the earlier material-thin outputs, though neither forms a perfectly continuous binary


---

# Loose-Screw main (10)

## Lines 116-183

116: 4 Main Results
117: The main benchmark combines four real datasets: Wisconsin Breast Cancer, Wine, Digits, and
118: Diabetes. Across three random seeds, the mixed formulation is competitive in several classification
119: settings, especially where dead units matter, but it is not uniformly best. Its strongest results are
120: not raw accuracy wins; they are stable training behavior, very low dead-unit rates, and consis-
121: tent evidence that useful leak values occupy a task-dependent band rather than a single universal
122: optimum.
123: The most important pattern is therefore not that Mixed Dual-Path Rattle beats every baseline
124: everywhere. It is that the model usually preserves activity, remains trainable, and learns a small
125: auxiliary contribution rather than collapsing the leak path to zero. On classification tasks, the
126: mixed model is often close to the strongest baseline. On regression and deeper settings, the advan-
127: tage is weaker and sometimes absent.
128: 4.1 Dead units and stability
129: One of the clearest results is the dead-unit comparison. ReLU shows noticeable dead-unit rates
130: that increase with depth, especially on Breast Cancer, Wine, Digits, and Diabetes. Leaky ReLU
131: maintains essentially zero dead units throughout. Mixed Dual-Path Rattle behaves much closer to
132: Leaky ReLU than to ReLU: on most runs its dead-unit rate is exactly zero, and even when nonzero
133: it remains small relative to ReLU.
134: The important point is that the mixed formulation appears to preserve the activity-protection
135: benefit of having a nonzero auxiliary path, even when that path receives only a small learned
136: weight.
137: 4
139: ===== PAGE 5 =====
140: 4.2 Robustness to input noise
141: Under additive test-time input noise, Mixed Dual-Path Rattle is sometimes competitive but not
142: uniformly more robust. On Breast Cancer, mean noisy accuracy is slightly better than Leaky ReLU
143: at moderate noise and remains close to the baselines at larger noise. On Wine and Digits, the mixed
144: model often trails Leaky ReLU once noise is added. On Diabetes, all methods change only slightly
145: under the tested noise levels, and Mixed Dual-Path Rattle remains worse than Leaky ReLU.
146: So the present evidence supports a narrower claim: the mixed formulation can remain stable under
147: noise, but the current implementation does not establish a general noise-robustness advantage over
148: simpler baselines.
149: 4.3 Learned path mixtures
150: The learned mixture weights are especially informative. Across all four datasets and all tested
151: depths, the mixed model consistently assigns the vast majority of weight to the clean path and
152: only a small but nonzero weight to the leak path. The clean-path weight is typically around 0.95–
153: 0.96 on the classification datasets and about the same on Diabetes, leaving only a few percent for
154: the leak path.
155: This is important because it gives a concrete interpretation of the framework: in the unconstrained
156: mixed model, the leak path is used consistently, but sparingly. Validation loss decreases steadily
157: while the learned mixture remains nearly flat, with the clean weight staying near 0.95 and the leak
158: weight near 0.04–0.05 throughout training. Meanwhile,λstays close to 0.10 and the average gate
159: valueαrises gradually over training, indicating that the model mainly adjusts the gate statistics
160: while preserving a strongly clean-dominant mixture.
161: At the same time, the broader forced-leak experiments show that this natural small-leak preference
162: should not be interpreted as a universal optimum. When the leak level is fixed externally and
163: swept over a wide range, performance often remains competitive well beyond the natural 4–5%
164: setting. The more defensible interpretation is therefore two-part: unconstrained optimization tends
165: to settle on a small auxiliary leak, but the family as a whole appears to operate within a broader
166: task-dependent leak band rather than around a single magic value.
167: 4.4 Task summary
168: The overall pattern is cautious rather than dramatic. Mixed Dual-Path Rattle is viable and often
169: competitive, but it is not uniformly best. On Breast Cancer it essentially ties the strongest baselines
170: while almost eliminating dead units. On Digits it is competitive at shallow depth but loses ground
171: at depth 6. On Wine it matches the baselines at depth 2 but degrades more strongly with additional
172: depth. On Diabetes regression it underperforms Leaky ReLU across all depths, although it still
173: preserves very low dead-unit rates.
174: These numbers suggest a modest but fairly consistent picture. The mixed formulation looks most
175: promising on shallow-to-medium-depth classification settings, but it is not yet a reliable drop-in
176: 5
178: ===== PAGE 6 =====
179: replacement for standard activations across all tasks. Its clearest empirical profile is competitive
180: behavior in some regimes, very low dead-unit rates, and evidence that useful leak values occupy a
181: task-dependent band rather than a single universal optimum. Read conservatively, the benchmark
182: supports viability and interpretability more strongly than it supports raw across-the-board gains.
183: 4.5 Breast Cancer ablation: natural vs. forced leak weight

## Lines 256-360

256: 4.7 Target-leak sweep across real datasets
257: We then ran a broader additive-leak benchmark across Breast Cancer, Wine, Digits, and Diabetes.
258: In this setting the activation again takes the form
259: clean(x) +w l leak(x),
260: 11
262: ===== PAGE 12 =====
263: but now the target leak was swept over 0.05, 0.20, 0.35, and 0.50, while the penalty strength was
264: swept over 0.0, 0.1, 0.5, and 1.0. This lets us separate two questions: whether the framework
265: benefits from different leak bands, and whether stronger penalties substantially change the learned
266: leak within a chosen band.
267: The clearest result is that the penalty strength mattered much less than the target leak itself.
268: Within a fixed target, the learned leak means stayed extremely close to that target across seeds
269: and datasets. For example, Breast Cancer settled near the target values across the sweep; Digits
270: behaved similarly; and comparable behavior appeared on Wine and Diabetes. So in this benchmark
271: the penalty mainly holds the system inside a chosen leak band rather than creating strong additional
272: adaptation by itself.
273: The task-level behavior is also informative. On Breast Cancer and Wine, the strongest forced
274: configurations were shallow models with very small target leak, typically around 0.05, and they
275: matched or slightly exceeded the standard baselines while keeping dead-unit rates at zero. On
276: Digits, larger target leaks were often better: for the full dataset at depth 4, the best mean forced
277: result was above both ReLU and Leaky ReLU, and on the smaller setting at depth 8 the best forced
278: results were around the upper end of the tested band. On Diabetes regression, the picture was again
279: different: moderate or small target leaks performed best, and the strongest forced configurations
280: were competitive with the standard baselines.
281: The noise sweeps reinforce the same idea. Higher evaluation noise did not fundamentally reorder
282: the preferred leak band within each task. Instead, configurations that were already strong at
283: zero noise usually remained strong under noise, which suggests that the target leak is acting more
284: like a structural bias on representation than like a separate robustness knob that can be tuned
285: independently through penalty strength.
286: The main lesson from these benchmarks is that the loose-screw family does not appear to have a
287: single universal best leak value. Rather, different tasks prefer different leak bands: very small leak
288: for some tabular classification settings, moderate leak for some Breast Cancer settings, and larger
289: leak values can remain viable on Digits without causing collapse. This strengthens the framework
290: interpretation considerably. The useful question is no longer simply whether leak should be near
291: zero, but which controlled leak band is most appropriate for a given regime.
292: 5 Interpretation and Scope
293: The central empirical finding of this study is that the leak-aware family exhibits a broad, task-
294: dependent operating region rather than a single privileged leak value. In unconstrained mixed
295: models, optimization naturally settles on a small auxiliary leak of roughly 4–5%. But when the
296: leak is fixed externally and swept across a much wider range, performance often remains strong
297: over a broad interval instead of collapsing away from that natural equilibrium. This makes the
298: main significance of the work more specific than a broad performance claim. Its value is that it
299: identifies and formalizes a design pattern in which leak is treated as a bounded auxiliary signal
300: path rather than only as an error term.
301: The strongest current claim should therefore be limited and defensible. The mathematical ingre-
302: 12
304: ===== PAGE 13 =====
305: dients are familiar: ReLU, sigmoid gating, hyperbolic tangent saturation, additive side paths, and
306: softmax mixing. What is new here is their arrangement into a leak-aware activation family in which
307: pressure-aware leak is explicitly modeled, separated, and then mixed with the primary path in a
308: learnable way.
309: A defensible description is the following: this is anovel activation-family directionin which leak
310: is elevated from a passive residual effect to a controlled auxiliary channel, and in which the mixed
311: and additive formulations let the network regulate how much of that auxiliary channel should be
312: used. Empirically, the clearest current result is not universal superiority, but the combination of two
313: behaviors: a natural tendency toward small learned leak under unconstrained mixing, and a broader
314: leak band within which forced leak remains viable. The supplementary deep-CNN and MNIST
315: follow-ups fit that interpretation as diagnostic evidence rather than as headline wins: they mainly
316: indicate that once optimization is stabilized, especially by normalization, the mixed formulation
317: remains viable in harder regimes without clearly surpassing the strongest baseline.
318: This avoids overclaiming. It does not say that every component is individually unprecedented, nor
319: does it claim universal superiority over standard activations. Instead, it claims that the family
320: perspective, the progression of variants, and the observed leak-band behavior together constitute a
321: real and testable contribution.
322: 6 Limitations
323: The current evidence is useful but not complete. The benchmarks are still limited in scope, and the
324: strongest results are not consistently better than strong baselines. The mixed formulation is best
325: viewed as an interpretable and empirically testable family rather than as a universal replacement
326: for standard activations.
327: Three limitations matter most. First, the evaluation is broad enough to reveal patterns, but
328: still too small to support claims about modern large-scale training regimes. Second, the paper
329: compares against strong baseline activations but not against a wider set of modern gated or adaptive
330: alternatives. Third, several of the most interesting observations—especially the broader leak-band
331: behavior and the deep-network diagnostics—are empirical regularities rather than consequences of
332: a formal theory.
333: The current results also suggest that a better empirical question is not simply whether leak helps,
334: but when and how much leak helps. That is why the leak-band view is central: the family appears
335: to admit a useful operating region rather than a single best value.
336: 7 Next Experimental Direction
337: The next research question is no longer whether the idea can be written down mathematically. It
338: is whether the leak-aware family has a useful operating region and whether that region remains
339: stable in harder settings.
340: 13
342: ===== PAGE 14 =====
343: The most useful next steps are:
344: •sweep the target leak level directly, from very small to moderately large values, to test whether
345: the framework has a useful leak band rather than a single universal optimum;
346: •compare fixed, learnable, and per-neuron leak settings;
347: •test deeper networks and harder datasets, especially noisy-label and small-data regimes;
348: •track the learned values ofa,b,λ, and the path weights throughout training; and
349: •extend the framework beyond activations into leak-aware blocks or lightweight residual-style
350: modules.
351: This progression keeps the work grounded: formalize the variants that were actually run, report
352: what the benchmark really shows, and use the current results as a base for more targeted experi-
353: ments.
354: 8 Conclusion
355: The current paper does not establish a universally superior activation. Instead, it establishes a
356: more limited but still meaningful result: leak can be treated as a bounded auxiliary signal path,
357: and the resulting family behaves in a controlled and task-dependent way.
358: The strongest current evidence is that the mixed dual-path formulation naturally learns a small
359: leak contribution, while forced leak-band sweeps show that performance can remain stable across a
360: broad range of leak values. The supplementary deep-network diagnostics point in the same direction

## Lines 487-633

487: Table 1: Supplementary 20 Newsgroups summary from the stress-test benchmark. Values are
488: three-seed means for the full-data setting.
489: Depth Activation Clean acc. Noisy acc. Dead rate
490: 2 ReLU 0.6371 0.6179 0.0020
491: 2 Leaky ReLU 0.6374 0.6176 0.0000
492: 2 Mixed 0.6368 0.6183 0.0000
493: 4 ReLU 0.6097 0.5911 0.0825
494: 4 Leaky ReLU 0.6134 0.5944 0.0000
495: 4 Mixed 0.6179 0.5943 0.0000
496: Table 1 makes the omitted text benchmark concrete. At depth 2, all three activations are essentially
497: tied on clean accuracy, while at depth 4 the mixed model is marginally best on clean accuracy and
498: remains tied with Leaky ReLU under the noisy condition. The dead-rate pattern is the same as in
499: the other experiments: ReLU begins to lose active units with depth, whereas Leaky ReLU and the
500: mixed formulation remain effectively at zero.
501: Figure 6: CIFAR-10 deep-CNN accuracy versus depth for ReLU, Leaky ReLU, and Mixed Dual-
502: Path Rattle. The mixed model remains competitive but does not consistently beat the strongest
503: baseline.
504: 18
506: ===== PAGE 19 =====
507: Figure 7: CIFAR-10 leak-band sweep at depth 4 under three evaluation noise levels. The forced leak
508: weight tracks the target band without causing collapse, and test accuracy remains in a relatively
509: narrow range from target leak 0.00 to 0.50.
510: D.1 Deep non-residual MLP stress test
511: We also ran a harder supplementary stress test on CIFAR-10 using a 25-layer non-residual multilayer
512: perceptron with hidden width 128, trained for 5 epochs on a 50% stratified subset of the training
513: set. This setting is intentionally harsh: it removes convolutional inductive bias, removes residual
514: connections, and pushes depth high enough that dead-unit behavior becomes easier to detect.
515: Across three seeds, the mixed formulation achieved mean test accuracy about 0.4016±0.0099,
516: compared with about 0.3858±0.0076 for Leaky ReLU and about 0.3840±0.0229 for ReLU. The
517: dead-unit pattern was sharper: ReLU reached mean dead-unit rate about 0.1376, whereas both
518: Leaky ReLU and the mixed formulation remained at 0.0000 under the same threshold. In the
519: mixed model, the learned path weights again stayed strongly clean-dominant, with mean clean-
520: path weight about 0.9455 and mean leak-path weight about 0.0545.
521: This result should still be interpreted cautiously. It does not show universal superiority, but it does
522: strengthen one narrower part of the framework claim: in this very deep non-residual setting, the
523: mixed auxiliary-path formulation remains trainable, preserves activity across all layers, and stays
524: competitive with the standard baselines.
525: D.2 Breaking-point deep CNN stress test
526: We also ran a deeper supplementary breaking-point experiment on CIFAR-10 using plain convolu-
527: tional networks without residual connections at depths 25 and 50. This test should be interpreted
528: primarily as a failure-mode diagnostic rather than as a headline performance result. Its value is
529: that it helps separate two questions: whether the mixed auxiliary-path activation remains stable
530: 19
532: ===== PAGE 20 =====
533: Figure 8: Layerwise summary from the 25-layer non-residual CIFAR-10 MLP stress test. The top
534: panel shows that the mixed model keeps a strongly clean-dominant allocation with a small but
535: persistent leak weight across depth. The bottom panel shows that ReLU accumulates dead units
536: progressively with depth, while Leaky ReLU and the mixed formulation remain effectively at zero
537: throughout the network.
538: 20
540: ===== PAGE 21 =====
541: in very deep settings, and whether that stability alone is sufficient to rescue an otherwise difficult
542: architecture.
543: The empirical pattern is clear. At depth 25, Leaky ReLU was the strongest and most stable of the
544: three activations, with mean test accuracy about 0.2213±0.0300, while the mixed model reached
545: about 0.1705±0.1221 and ReLU reached about 0.1537±0.0930. At depth 50, all three activations
546: collapsed to chance-level accuracy near 0.10, indicating that the architecture itself had become the
547: dominant bottleneck. In other words, this experiment does not show that the mixed formulation
548: solves extreme depth by itself.
549: The diagnostic plots are still informative. ReLU and the mixed formulation accumulated large dead-
550: unit rates as depth increased in this specific setup, whereas Leaky ReLU remained substantially
551: lower. For the mixed model, the learned path allocation stayed almost entirely clean-dominant,
552: with clean weight near 0.9975 and leak weight near 0.0025 across layers at both depths. That
553: behavior is consistent with a very strongly suppressed auxiliary path in this run. It may reflect
554: an initialization effect, but this experiment alone does not prove that the initialization is the sole
555: cause of failure; a simpler and safer conclusion is that the very deep plain CNN is unstable for all
556: three activations under the chosen training setup.
557: Figure 9: Breaking-point deep CNN stress test on CIFAR-10: test accuracy versus depth. Perfor-
558: mance drops sharply from depth 25 to depth 50, where all three activations collapse to chance-level
559: accuracy.
560: 21
562: ===== PAGE 22 =====
563: Figure 10: Breaking-point deep CNN stress test on CIFAR-10: dead-unit rate versus depth. ReLU
564: and the mixed formulation accumulate substantial inactive units in this setup, while Leaky ReLU
565: remains lower, though not zero at depth 50.
566: Figure 11: Breaking-point deep CNN stress test on CIFAR-10: gradient norm versus depth. The
567: gradients shrink substantially by depth 50 for all three activations, supporting the interpretation
568: that optimization difficulty is a major contributor to failure in this regime.
569: 22
571: ===== PAGE 23 =====
572: Figure 12: Layerwise clean versus leak weights for the mixed model at depth 25 in the breaking-
573: point CNN experiment. The allocation remains overwhelmingly clean-dominant, with the leak path
574: contributing only a very small fraction throughout the network.
575: Figure 13: Layerwise clean versus leak weights for the mixed model at depth 50 in the breaking-
576: point CNN experiment. The learned allocation is again almost entirely clean-dominant, indicating
577: that the auxiliary path remains strongly suppressed in this failed-depth regime.
578: D.3 Depth-25CNN follow-up: initialization versus normalization
579: To probe the breaking-point result more directly, we ran a focused follow-up at depth 25 on the
580: same plain non-residual CNN, now comparing eight variants: ReLU, Leaky ReLU, and the mixed
581: activation with either a roughly 95/5 clean–leak initialization or a 50/50 initialization, each with
582: and without batch normalization. The question was narrower than in the earlier appendix exper-
583: iment: is the poor depth-25 behavior mainly a consequence of the mixed-path initialization, or is
584: normalization the larger factor?
585: The answer from this run is suggestive rather than definitive. Without batch normalization, all
586: 23
588: ===== PAGE 24 =====
589: four plain variants remained weak and unstable. Mean test accuracy was about 0.1801±0.0717
590: for ReLU, 0.2164±0.1065 for Leaky ReLU, 0.1416±0.0721 for the mixed 95/5 model, and exactly
591: chance-level 0.1000 for the mixed 50/50 model. Dead-unit rates were also substantial in the plain
592: setting, especially for the 50/50 mixed initialization, which reached mean dead rate about 0.4000.
593: So changing the initial clean–leak balance alone does not rescue the deep plain CNN; in fact, the
594: symmetric initialization makes the no-batch-norm case worse.
595: With batch normalization, however, the picture changes materially. All four normalized variants
596: trained reliably, all reached zero measured dead units under the same threshold, and their accuracies
597: clustered in a much narrower band: about 0.4617±0.0121 for ReLU, 0.4374±0.0213 for Leaky
598: ReLU, 0.4309±0.0185 for mixed 95/5, and 0.4364±0.0258 for mixed 50/50. This does not make the
599: mixed formulation the best performer in the normalized regime, but it does suggest that the depth-
600: 25 failure mode is driven much more by optimization and normalization than by the auxiliary-path
601: idea itself.
602: The learned mixtures add a useful qualification. In the no-batch-norm runs, the mixed 95/5 model
603: stayed essentially fixed at its initial allocation, while the 50/50 model remained near parity and
604: drifted slightly toward the leak path in later layers, yet still failed completely. In the batch-
605: normalized runs, the mixed 95/5 model again stayed strongly clean-dominant, whereas the mixed
606: 50/50 model learned a broader layerwise redistribution while still training successfully. That com-
607: bination supports a narrower interpretation than a strong causal claim: batch normalization is the
608: main stabilizer here, while the mixed activation remains viable once the surrounding optimization
609: problem is made tractable.
610: The noise sweep is consistent with that reading. Over test-time Gaussian noise levels from 0.0 to
611: 0.2, each variant changed only modestly relative to its own clean baseline. The normalized models
612: remained stronger than the plain ones throughout, and there was no evidence that the mixed
613: variants gained a unique robustness advantage in this particular follow-up.
614: Figure 14: Depth-25 CIFAR-10 follow-up on the plain deep CNN: test accuracy across activation
615: and normalization variants. The main separation is between no-batch-norm and batch-normalized
616: models rather than between the mixed initializations themselves.
617: 24
619: ===== PAGE 25 =====
620: Figure 15: Depth-25 follow-up: mean dead-unit rate by variant. Batch normalization eliminates
621: the dead-rate problem in this setting, while the plain 50/50 mixed initialization is the most fragile
622: of the unnormalized models.
623: Figure 16: Depth-25 follow-up: test accuracy under added input noise. The relative ranking changes
624: little across noise levels 0.0–0.2, and the normalized variants remain clearly stronger than the plain
625: ones throughout.
626: 25
628: ===== PAGE 26 =====
629: Figure 17: Layerwise clean versus leak weights for the mixed 95/5 initialization without batch
630: normalization (left) and with batch normalization (right). In both cases the learned allocation
631: stays strongly clean-dominant, so the main difference between failure and success is not a collapse
632: of the path mixture itself.
633: Figure 18: Layerwise clean versus leak weights for the mixed 50/50 initialization without batch


---

# Hair Memory main (11)

## Lines 87-275

87: 3 Results and Interpretation
88: The current results support five main takeaways.
89: Table 1 gives the full run-by-run map near the beginning of the paper, so a reviewer can see the
90: whole project arc before reaching the appendix details. The main story is still the same: retrieval
91: 2
93: ===== PAGE 3 =====
94: coverage is the strongest lever, geometry matters because it shapes coverage, spiral placement
95: becomes competitive only when the projection is good, and QDMN helps mainly as a last-mile
96: refinement in ambiguous cases.
97: # Experiment name What we did What we got / what it means
98: 1M-CLTR controller base-
99: line
100: Added continue, overwrite, and
101: restart on a small synthetic mem-
102: ory task.
103: Accuracy reached about 0.89. The controller
104: helped, but the main win was still retrieval
105: quality.
106: 2Overlap roots + tiny
107: cache grid
108: Sweptoverlap k,topk root,
109: guard margin,overwrite alpha,
110: and cache size.
111: Overlap and larger root fan-out helped a lot.
112: Cache barely changed anything.
113: 3Best low-noise setting
114: check
115: Looked at the top rows from the
116: grid.
117: Some settings reached nearly perfect accuracy
118: at low noise. That showed the pipeline can
119: work, but the task was too easy there.
120: 4Paired best-recipe bench-
121: mark
122: Fixed the best retrieval recipe and
123: used the exact same query bank for
124: every method.
125: Many methods collapsed to similar behavior.
126: This showed the judge was not yet the main
127: bottleneck in easy settings.
128: 5Hard-noise fixed-recipe
129: test
130: Kept retrieval fixed and increased
131: noise.
132: Accuracy dropped quickly as noise rose. Ro-
133: bustness to noise became the main stress point.
134: 6Controller / guard sweepSwept guard margins and overwrite
135: strengths on the hard setting.
136: Gains were small. Adaptive control helped a
137: bit, but not enough to be the main story.
138: 7Confusion benchmarkIncreased group and cluster overlap
139: to force ambiguity.
140: This created the first setting where judge qual-
141: ity started to matter more.
142: 8Hard-negative trainingTrained judges using hard negatives
143: drawn from the candidate pool.
144: Learned judges improved somewhat, but not
145: enough to close the oracle gap.
146: 9Overlap / top-ksweep
147: under hard noise
148: Tested overlap and root fan-out
149: while keeping the hard benchmark
150: fixed.
151: More overlap and largertopk rootimproved
152: coverage strongly. Retrieval coverage was con-
153: firmed as a major lever.
154: 10Controller sweep under
155: hard noise
156: Compared guarded, adaptive, and
157: QDMN-style controllers on the
158: same hard setting.
159: Adaptive control sometimes helped, but the
160: gains stayed small and unstable.
161: 11Ambiguity / margin-
162: binned test
163: Split queries by judge margin into
164: low-, mid-, and high-ambiguity
165: bins.
166: QDMN helped most in low-margin cases, which
167: makes it a last-mile refinement tool rather than
168: a global fix.
169: 12Best method per ambigu-
170: ity bin
171: Checked which method wins in each
172: margin bin.
173: No method dominated everywhere. The oracle
174: remained above everything, and practical meth-
175: ods became close only when the query was easy.
176: 13Placement debug: ran-
177: dom vs. spiral bad vs.
178: spiral ortho
179: Measured root spread, nearest-
180: neighbor cosine, and root assign-
181: ment entropy.
182: Random covered space better than the bad spi-
183: ral variants. The projection was the main prob-
184: lem, not the idea of structure itself.
185: 14Case sweep across data
186: regimes
187: Tested separated, clustered, shared-
188: core, and latent-manifold data.
189: Random usually won overall. Spiral was some-
190: times competitive, but not consistently better.
191: 15Spiral geometry refine-
192: ment
193: Addedspiral pcaand com-
194: pared it againstspiral badand
195: spiral ortho.
196: spiral pcabecame the best spiral version and
197: the first genuinely competitive one.
198: 16Full case + placement +
199: noise sweep
200: Ran all cases and placements across
201: the full noise range.
202: The cleanest overall story emerged: random
203: stayed best on average,spiral pcawas the
204: strongest spiral, and QDMN helped mainly in
205: the ambiguous tail.
206: 17Final QDMN gain checkCompared QDMN against flat and
207: guarded methods only in the hard-
208: est ambiguous queries.
209: QDMN gave small but real gains in low-margin
210: bins. That supports a last-mile refinement
211: claim, not a replacement-for-retrieval claim.
212: 18Final matched-budget
213: scale sweep
214: Scaled the strongest current recipe
215: from 256 to 2048 items under
216: matched budget while comparing
217: random andspiral pcaagainst
218: flat, judge-based, adaptive, QDMN,
219: and oracle methods.
220: The sharpest negative result arrived here: ran-
221: dom stayed stronger thanspiral pca, practical
222: judges remained tightly clustered, and runtime
223: rose quickly. That weakens confidence in the
224: current implementation more than it rules out
225: the broader idea.
226: Table 1: Full project overview placed near the beginning of the paper. The table summarizes the eighteen
227: major experiments behind the final claims before the reader reaches the appendix.
228: The table gives the full experimental map; the five takeaways below explain the highest-level lessons
229: that remain stable across that map.
230: 1. Root quality is still the first-order constraint.Across both the early sweeps and the later
231: 3
233: ===== PAGE 4 =====
234: diagnostics, performance rises strongly with root dimension and falls sharply with query noise.
235: When leak is removed, spiral and random placement become essentially identical, which shows that
236: the dominant early failure is not geometry by itself but information loss in the compressed root.
237: The later oracle-control split makes this even clearer: passive top-1 remains near 0.25–0.26 item
238: accuracy in the main setting, the candidate oracle jumps to about 0.52, and the local oracle rises
239: further to about 0.55. Root compression and root ranking therefore account for the largest share
240: of lost accuracy, while neighborhood selection contains a smaller but still recoverable contribution.
241: 2. Structured placement changes geometry reliably, but only weakly improves retrieval
242: unless the search rule uses that structure directly.The spiral layout consistently produces
243: cleaner spacing and lower interference than random placement. That structural advantage is real,
244: but most passive retrieval rules do not convert it into much end-to-end gain. The first clear signal
245: appears only once retrieval becomes locality-aware: the v3 two-stage reranker gives spiral a small
246: but repeatable edge over random, the v4 spatial-window variant removes that gap, and the v5
247: active-local follicle restores a modest spiral advantage under several settings. The right claim is
248: therefore limited but meaningful: spatial regularity helps only when retrieval explicitly exposes
249: local structure, and even then the effect remains modest.
250: 3. Multi-root retrieval and overlap are the strongest practical advances so far.The
251: biggest change in belief across the project is that candidate discovery is no longer the main weakness
252: in the same way it was earlier. Query-based reranking already helps substantially, and the later
253: multi-root union experiments are the largest practical jump: at the main operating point, retrieval
254: rises to about 0.77 item accuracy, while the oracle union reaches about 0.90. Overlapping root
255: assignment and larger root shortlists improve coverage further, with overlapk= 3 and top-k= 10
256: clearly outperforming narrower settings on average. These results make the architecture look more
257: viable than the early single-root experiments suggested. The system can now expose a strong
258: candidate set; it just does not yet score that set well enough.
259: 4. The dominant unresolved problem has shifted to within-pool judgment.Once the
260: candidate pool becomes strong, the practical system still usually trails a flat key nearest-neighbor
261: baseline. In the main scale comparison, flat search reaches about 0.80 item accuracy while multi-
262: root reranking remains near 0.77, even though the oracle union is far higher. Later judge-stage
263: experiments all reinforce the same point. Soft local smoothing is at best marginally helpful, naive
264: averaging is destructive, shallow learned judges do not close the gap, guarded variants improve
265: stability but not enough strength, adaptive shortlist sizing helps only slightly, and controller-style
266: overwrite or restart mechanisms do not materially change the ranking. The clearest updated
267: conclusion of the paper is therefore that exposing better candidates is no longer enough: the
268: system still lacks a stable, expressive scorer inside the discovered pool.
269: 5. The remaining ambiguity is now about the selector, and the spiral story is still in-
270: complete.The newer hard-confusion benchmark confirms that oracle-pool performance remains
271: well above every practical judge, so the shortlist is often already good enough and the remain-
272: ing failure is concentrated in selection under ambiguity. At the same time, the paired best-recipe
273: evaluation surfaced an implementation warning: the current spiral root construction can perform
274: dramatically worse than random in some settings, which makes any strong geometric claim prema-
275: ture. The follow-up Part 16B spiral-debug run strengthens that caution rather than removing it: an

## Lines 1260-1438

1260: must deliberately create confusion among plausible candidates. The run therefore points to two
1261: immediate next steps: build a harder ambiguity benchmark and audit the spiral root construction
1262: before treating placement comparisons as substantive scientific evidence.
1263: A.22 Run V: Confusion Benchmark with Hard Negatives (Part 16)
1264: What was tested.This run asks the question that the earlier paired benchmark could not answer
1265: cleanly: once the shortlist contains many plausible candidates, do richer judges and controllers actu-
1266: ally help under real ambiguity? The benchmark therefore deliberately introduces clustered groups,
1267: overlapping roots, and hard negatives so that the final decision stage must separate genuinely
1268: confusing candidates rather than simply select the obvious nearest neighbor.
1269: How it was done.The experiment used a confusion benchmark with 256 roots, 64 groups, four
1270: items per group, 32-dimensional vectors, and 16 shared clusters that make nearby groups intention-
1271: ally similar. The main retrieval setting fixed overlap atk= 3 and top-kroot at 10, then compared
1272: flat key nearest-neighbor, learned and guarded judges, M-CLTR controller variants, QDMN-style
1273: one- and two-step refinement, and an oracle-pool control. Training queries used moderate noise
1274: with hard negatives, while test queries swept harder noise from 0.18 to 0.48. Additional sweeps var-
1275: ied overlap count, root shortlist size, guard margin, overwrite strength, and refinement strength.
1276: Unlike the earlier easy paired run, this benchmark is designed to preserve ambiguity inside the
1277: candidate pool rather than remove it.
1278: What happened.The most important result is that the oracle pool now clearly separates from
1279: the practical methods. Mean item accuracy fororacle poolis about 0.568, while the best practical
1280: methods sit around 0.404–0.406. That gap is the clearest evidence so far that the correct item is
1281: often already present in the shortlist but the current selector cannot reliably recover it under hard
1282: confusion. Coverage still declines with noise and closely tracks difficulty, falling from about 0.808
1283: at noise 0.18 to about 0.412 at noise 0.48, which confirms that retrieval still matters. But because
1284: the oracle remains much better than the practical methods at the same coverage level, the selector
1285: is now unmistakably part of the problem rather than merely a spectator to retrieval failure.
1286: The method ranking is informative but not revolutionary. Flat key nearest-neighbor remains the
1287: strongest or tied practical baseline overall. Learned linear scoring and simple continue-style M-
1288: CLTR are effectively tied with it. Guarded linear judging and QDMN-style refinement are very
1289: close but do not create a decisive jump. At some mid-noise settings,mcltr adaptivebecomes the
1290: single best non-oracle method, which suggests that controller-style actions can help a little once
1291: ambiguity is real, but the effect is still modest. The broader structural levers remain stronger. In
1292: the hard-noise overlap/top-ksweep, increasing overlap and root shortlist size consistently improves
1293: both coverage and oracle accuracy. For example, with random placement at noise 0.48, oracle
1294: accuracy rises from about 0.097 at overlap 1, top-k= 3 to about 0.435 at overlap 3, top-k= 10.
1295: The practical methods rise with it, but still leave a large gap to the oracle. Random placement
1296: also continues to outperform spiral on average, though the gap is now smaller than in the Part 15
1297: run, which keeps the spiral implementation question open rather than resolved.
1298: Figure 34 summarizes the main confusion benchmark and the two supporting sweeps. Panels A and
1299: B show the same core pattern in both placements: as noise rises,oracle poolstays clearly above
1300: all practical methods, while the practical judges remain tightly clustered together. Panel C shows
1301: 39
1303: ===== PAGE 40 =====
1304: that overlap and larger root shortlist size are still the strongest retrieval-side levers under hard
1305: noise. Panel D shows that controller tuning changes results only modestly, with the best guarded
1306: and adaptive settings improving slightly but not closing the oracle gap.
1307: Figure 34: Run V summary figure for the confusion benchmark. Panels A and B show accuracy-versus-
1308: noise curves for random and spiral placement, where oracle-pool remains clearly above every practical judge.
1309: Panel C shows that increasing overlap and top-kroot improves hard-noise performance mainly through
1310: better candidate exposure. Panel D shows that controller and guard tuning only modestly changes end-to-
1311: end accuracy. Taken together, the figure reinforces that the shortlist is often strong enough, but the last-mile
1312: selector remains the main unresolved bottleneck under hard ambiguity.
1313: What we learned.Part 16 is the first benchmark in the recent series that cleanly exposes selector
1314: failure under ambiguity. That makes it a more decisive run than the earlier saturated paired
1315: benchmark. The paper can now state a stronger claim: multi-root retrieval and overlap create
1316: a substantially better pool, but better pool construction alone does not solve the task. Under
1317: hard negatives, the last-mile judge is genuinely limiting performance. M-CLTR and QDMN-style
1318: refinement are not useless, but they are not yet strong enough to turn that selector gap into a
1319: clear practical win. The next step is therefore better targeted than before: improve the within-pool
1320: judge under ambiguity, while separately debugging the spiral root construction and continuing to
1321: use overlap and larger top-kas the strongest retrieval-side levers.
1322: A.23 Run W: Spiral Debug, Ambiguity, Overlap, and Controller Cases (Part
1323: 16B)
1324: What was tested.This follow-up run asks two narrower questions left open by Part 16. First, was
1325: the earlier spiral underperformance mainly an artifact of a weak spiral root construction? Second,
1326: if the ambiguity benchmark is kept hard, do pairwise judges, QDMN-style refinement, or controller
1327: tuning begin to separate once the spiral map is repaired?
1328: 40
1330: ===== PAGE 41 =====
1331: How it was done.The experiment reused the Part 16B confusion framework with 256 roots, 64
1332: groups, four items per group, dimension 32, and 16 shared clusters, but explicitly compared three
1333: root layouts: random placement, the older weakspiral badmap, and a newspiral orthoconstruction
1334: that embeds the spiral into an orthonormal two-dimensional subspace with only small jitter. The
1335: analysis was split into four cases: a placement-debug noise sweep, an ambiguity sweep at fixed hard
1336: noise, an overlap/top-ksweep, and a controller sweep over guard margins, overwrite strengths, and
1337: refinement strengths. The main method set again included flat key nearest-neighbor, learned and
1338: guarded judges, M-CLTR variants, QDMN one- and two-step refinement, pairwise judging, and an
1339: oracle-pool control.
1340: What happened.The placement-debug result is the cleanest architectural finding. The old
1341: spiral badmap clearly underperforms, whilespiral orthorecovers much of that loss. In Panel A of
1342: Figure 35, the orthonormal spiral stays far above the old spiral at every noise level, which confirms
1343: that part of the earlier spiral failure was implementation-specific rather than a fundamental rejection
1344: of structured placement. But the repair is only partial: random placement still remains stronger
1345: thanspiral orthoacross the main practical and oracle curves.
1346: The ambiguity and controller cases sharpen the selector diagnosis rather than overturning it. In
1347: the ambiguity sweep, mean random-layoutoracle poolitem accuracy is about 0.513, compared
1348: with roughly 0.24 for the best practical judges; forspiral ortho, the oracle mean is about 0.437
1349: and the best practical methods are only about 0.20. So the shortlist still contains much more
1350: recoverable signal than the practical selector can extract. Pairwise judging, learned MLP scoring,
1351: guarded variants, M-CLTR actions, and QDMN refinement all remain in the same broad practical
1352: band rather than opening a decisive new gap. The overlap sweep again shows that retrieval-side
1353: structure matters more than judge tweaks: larger overlap and larger top-kroot raise both practical
1354: accuracy and oracle coverage, with the strongest gains appearing at overlapk= 3 and top-k= 10.
1355: By contrast, the controller sweep mainly changes results at the margins. The best tuned controller-
1356: style settings rise only into the low 0.20 range and still remain far below the oracle.
1357: Figure 35 collects those four cases. Panel A shows thatspiral orthois a real improvement over
1358: the old spiral implementation but still not competitive with random. Panel B shows that harder
1359: ambiguity keeps the oracle-practical gap wide for both placements. Panel C shows that overlap
1360: and wider root shortlists remain the strongest levers on the retrieval side. Panel D shows that
1361: controller tuning changes little relative to the larger selector gap.
1362: What we learned.Part 16B turns the spiral question from a red flag into a narrower debugging
1363: result. The earlier severe spiral failure was at least partly caused by the specific root construction,
1364: because the orthonormalized version is materially better. But the larger scientific conclusion does
1365: not change. Even after that repair, random placement still wins on average, and the strongest gains
1366: still come from overlap and wider root exposure rather than from any current judge or controller.
1367: So the paper can now state a more precise ending: the selector bottleneck is real, the spiral
1368: implementation is less broken than before but still not validated, and future progress will likely
1369: require both a stronger ambiguity-aware within-pool scorer and a better-motivated structured root
1370: map.
1371: 41
1373: ===== PAGE 42 =====
1374: Figure 35: Run W summary figure for the Part 16B follow-up. Panel A shows that the orthonormal spiral
1375: construction repairs much of the earlier collapse of the old spiral map, but random placement still remains
1376: stronger across the main curves. Panel B shows that increasing ambiguity preserves a large gap between
1377: oracle-pool and every practical selector. Panel C shows that larger overlap and top-kroot continue to
1378: provide the clearest retrieval-side gains. Panel D shows that controller and guard tuning change practical
1379: accuracy only modestly. Together, the figure suggests that spiral debugging helps the architecture look less
1380: pathological, but the main unresolved problem is still ambiguity-aware selection inside the pool.
1381: 42
1383: ===== PAGE 43 =====
1384: A.24 Run X: Ambiguity / Margin-Binned Judge Test (Part 17)
1385: What was tested.This run asks a narrower selector question than Parts 16 and 16B: once the
1386: retrieval recipe is held fixed and every method sees the same candidate pool, when do refinement or
1387: controller-style methods actually help? In particular, the run tests whether QDMN-style refinement
1388: or adaptive control becomes useful only in the genuinely ambiguous cases, rather than in the easy
1389: high-confidence cases where the shortlist is already effectively solved.
1390: How it was done.The experiment fixed the strongest recent retrieval recipe at overlapk= 3
1391: and top-kroot = 10, then compared seven methods: flat key nearest-neighbor, learned linear
1392: judging, guarded linear judging, adaptive M-CLTR, QDMN one-step and two-step refinement, and
1393: an oracle-pool control. Two placements were evaluated, random andspiral ortho. Ambiguity was
1394: swept across 0.10, 0.20, 0.30, and 0.40, while train and test queries reused the same general noise
1395: schedule as the recent confusion benchmarks. The key diagnostic addition is margin binning: each
1396: query was assigned to a low-, mid-, or high-margin bin based on the baseline shortlist cosine margin,
1397: so the paper could separate obviously easy cases from truly ambiguous ones while keeping candidate
1398: exposure fixed.
1399: What happened.The overall pattern is stable rather than dramatic. Averaged across settings,
1400: oracle poolreaches about 0.582 item accuracy, while the best practical methods cluster around
1401: 0.418–0.419. Random placement again outperformsspiral orthoon average, with mean item accu-
1402: racy about 0.454 versus 0.427, and also does so with a smaller mean pool size. Across ambiguity
1403: levels, the best non-oracle method changes only slightly: guarded linear judging is best at random
1404: placement with ambiguity 0.10, flat search is best at several intermediate settings, adaptive M-
1405: CLTR is best at random placement with ambiguity 0.40, and QDMN refinement becomes the best
1406: non-oracle method only in the harderspiral orthosettings at ambiguity 0.30 and 0.40. That is a
1407: useful nuance, but not a reversal of the overall ranking.
1408: The margin-bin split is the clearest new result. In the hardest random-placement setting, high-
1409: margin pools are almost solved:oracle poolreaches about 0.859, while every practical method sits
1410: tightly around 0.816–0.820. By contrast, low-margin pools remain genuinely hard: the oracle is only
1411: about 0.454, and the best practical method, adaptive M-CLTR, falls to about 0.215, only modestly
1412: above the rest. Mid-margin pools sit between those extremes and show very little separation among
1413: the practical judges. The clean interpretation is that current refinement and controller methods do
1414: not create a broad new advantage; they help, if at all, mainly in the narrow slice of queries where
1415: the shortlist is genuinely ambiguous and still far from oracle performance.
1416: Figure 36 summarizes this diagnosis. Panels A and B show that practical methods remain tightly
1417: bunched as ambiguity rises for both placements, even though the oracle stays clearly higher. Panel
1418: C shows that the hardest low-margin bin is where selector differences actually appear, whereas
1419: the high-margin bin is already close to saturated. Panel D shows that the oracle gap for the best
1420: non-oracle method remains substantial across all ambiguity settings and is consistently larger for
1421: spiral orthothan for random.
1422: What we learned.Part 17 makes the selector story more precise. The main question is no longer
1423: whether some judge variant can edge out another on average. It is which queries are still unsolved
1424: once retrieval is held fixed. The answer is now clear: high-margin pools are largely retrieval-
1425: dominated and nearly solved by any reasonable selector, while low-margin pools still contain a
1426: large oracle gap that current judges and refiners only chip away at. QDMN refinement is therefore
1427: not useless, but its benefit is narrow and conditional rather than broad. The paper can now sharpen
1428: its practical recommendation: future work should target low-margin, high-ambiguity within-pool
1429: 43
1431: ===== PAGE 44 =====
1432: Figure 36: Run X summary figure for the Part 17 ambiguity / margin-binned test. Panels A and B show that,
1433: under fixed retrieval, practical methods remain tightly clustered as ambiguity increases for both random and
1434: spiral orthoplacement, while oracle-pool stays clearly higher. Panel C shows that the real selector problem
1435: is concentrated in the low-margin queries; high-margin cases are already close to solved for every practical
1436: method. Panel D shows that the oracle gap of the best non-oracle method remains substantial across
1437: ambiguity settings and is consistently larger forspiral ortho. Together, the figure suggests that QDMN and
1438: controller-style refinement help only conditionally, while the main unresolved problem remains low-margin

## Lines 1470-1585

1470: In the separated case, random reaches about 0.542, above bothspiral orthoandspiral bad. In the
1471: shared-core case, random again leads at about 0.517, and in the latent-manifold case—the regime
1472: most favorable in principle to a structured root map—random still remains best at about 0.453,
1473: while QDMN refinement becomes the strongest practical method but does not reverse the place-
1474: ment ranking. Coverage follows the same pattern: random has the highest mean coverage and the
1475: smallest average pool size, while both spiral variants tend to expose larger, less selective pools.
1476: The hard-noise margin-bin diagnostic adds one useful refinement. In the shared-core case at noise
1477: 0.48, random still dominatesspiral orthoinside every reported bin. For example, in the low-margin
1478: bin the oracle is about 0.392 for random but only about 0.294 forspiral ortho, and the best practical
1479: method rises only to about 0.157 for random while remaining near 0.039 forspiral ortho. So the
1480: spiral deficit is not just that practical judges fail to use a good pool. The accessible pool itself is
1481: often weaker.
1482: What we learned.Part 18 makes the placement story much less ambiguous. The current spiral
1483: constructions are not merely under-optimized versions of a competitive idea; they are measurably
1484: more concentrated, use roots less uniformly, and produce worse candidate exposure across every
1485: synthetic regime tested here. The orthonormalized spiral is a real improvement over the old spiral
1486: map, but not enough to change the ranking against random placement. At the same time, the run
1487: gives a more nuanced positive result: QDMN-style refinement is most competitive in the latent-
1488: 45
1490: ===== PAGE 46 =====
1491: Figure 37: Part 18 summary across multiple synthetic regimes. Panels A and B show that random placement
1492: produces less concentrated root geometry and more uniform root usage than either spiral construction,
1493: including the orthonormalized version. Panels C and D show the corresponding shared-core and latent-
1494: manifold accuracy-versus-noise curves: random placement remains the strongest overall placement baseline,
1495: while the oracle pool stays well above all practical judges and QDMN refinement is most competitive in the
1496: latent-manifold regime without reversing the placement ranking.
1497: 46
1499: ===== PAGE 47 =====
1500: manifold case, which suggests that geometry-aware refinement is not hopeless, only mismatched to
1501: the current spiral root maps. The paper can therefore sharpen its architectural conclusion again:
1502: until the root map itself is redesigned to avoid concentration and poor coverage, random placement
1503: remains the stronger baseline and the safer scientific reference point.
1504: A.26 Run Z: Spiral Geometry + QDMN Last-Mile Test (Part 19)
1505: What was tested.This run extends the placement audit one step further by adding a PCA-aligned
1506: spiral construction and by testing whether QDMN-style refinement helps mainly in genuinely am-
1507: biguous, low-margin cases rather than as a broad global improvement.
1508: How it was done.The experiment compared four placements—random,spiral bad,spiral ortho,
1509: andspiral pca—across the separated, clustered, shared-core, and latent-manifold synthetic regimes.
1510: It retained the current overlap and shortlist settings, evaluated flat key nearest-neighbor, learned
1511: and guarded judges, adaptive M-CLTR, one- and two-step QDMN refinement, and the oracle pool,
1512: and added a margin-bin analysis at the hardest shared-core noise level to isolate true last-mile
1513: ambiguity.
1514: What happened.The new figure shows a more nuanced version of the Part 18 story. Random
1515: placement still has the least concentrated roots in the generic regimes and remains the strongest
1516: average baseline across the separated, clustered, and shared-core cases. But the newspiral pcacon-
1517: struction is the first spiral variant that becomes genuinely competitive, and in the latent-manifold
1518: regime it is the strongest placement overall. At the same time, the selector result remains narrow:
1519: QDMN’s gain over flat search is small and is concentrated mainly in the low-margin shared-core
1520: slice rather than appearing across all bins.
1521: What we learned.Part 19 adds the first real positive exception without overturning the larger
1522: conclusion. A spiral map can help when it is aligned to the data geometry, but current spiral
1523: constructions are still not a robust improvement over random placement across the broader sweep.
1524: QDMN refinement is likewise best understood as a conditional last-mile aid rather than a full
1525: solution to the within-pool judgment bottleneck.
1526: 47
1528: ===== PAGE 48 =====
1529: Figure 38: Part 19 summary figure. Panels A and B compare root concentration and usage entropy across
1530: placements, showing that random remains the least concentrated baseline in the generic regimes whilespi-
1531: ral pcaimproves alignment substantially. Panel C shows the shared-core accuracy-versus-noise curves, where
1532: the oracle remains well above all practical methods. Panel D shows that QDMN’s gain over flat search is
1533: small and concentrated mainly in the lowest-margin ambiguity slice.
1534: 48
1536: ===== PAGE 49 =====
1537: A.27 Run AA: Final Matched-Budget Scale Sweep (Part 20)
1538: What was tested.This final run asks the most practical scaling question in the project: if com-
1539: pute budget is matched and the number of stored items grows substantially, does the strongest
1540: current hair-style recipe finally produce a robust advantage over a strong flat baseline? The com-
1541: parison therefore focuses on the two placements that matter most after Part 19—random and
1542: spiral pca—and asks whether the geometry story improves or deteriorates with scale.
1543: How it was done.The experiment fixed 256 roots, overlapk= 3, root top-k= 10, and a
1544: shared-core synthetic regime, then swept total memory scale across 256, 1024, and 2048 items.
1545: Each setting was repeated across multiple seeds with matched train/test fractions and matched
1546: query budgets. The practical methods were flat key nearest-neighbor, learned and guarded linear
1547: judges, adaptive M-CLTR, QDMN two-step refinement, and an oracle-pool control. In addition to
1548: accuracy, the run tracked coverage, candidate-pool size, runtime, and root diagnostics.
1549: What happened.The result is unfavorable to the current recipe, but scientifically clarifying.
1550: Random placement remains stronger thanspiral pcaat every tested scale: mean item accuracy
1551: is about 0.690 versus 0.587 at 256 items, about 0.558 versus 0.520 at 1024 items, and about 0.528
1552: versus 0.486 at 2048 items. Coverage shows the same ordering, and the root diagnostics continue
1553: to explain part of the gap: random roots keep mean nearest-neighbor cosine near 0.478, while
1554: spiral pcaremains highly concentrated near 0.942 across scales.
1555: The judge story also fails to improve with scale. Across the full sweep, flat search, learned and
1556: guarded judges, adaptive M-CLTR, and QDMN refinement all cluster very tightly around 0.525–
1557: 0.527 item accuracy on average, while the oracle remains much higher at about 0.738. Runtime
1558: rises sharply with scale, especially for QDMN refinement, but that extra cost does not buy a clear
1559: practical gain. Figure 39 summarizes this pattern: random placement keeps the better coverage
1560: profile, the oracle gap remains large, and the practical methods remain tightly bunched even as
1561: cost increases.
1562: This is therefore the strongest negative result in the paper. Under matched budget, the current
1563: scalable recipe does not convert multi-root structure into a practical end-to-end advantage. At
1564: the same time, the run still supports a careful interpretive distinction. What is currently failing
1565: is the implemented recipe, not necessarily the broader idea of structured multi-root memory itself.
1566: The result is still compatible with implementation-level bottlenecks in root lifting, candidate-pool
1567: geometry, and within-pool scoring.
1568: What we learned.Part 20 is the clearest final stress test of the current implementation, and
1569: it does not rescue the present recipe. Random remains the stronger baseline,spiral pcais still
1570: not competitive enough at scale, and the practical judges remain too close to one another relative
1571: to the oracle. But the run still supports a constructive scientific conclusion: the idea has not yet
1572: been tested in its strongest possible form. Better root lifting, less concentrated assignment, and a
1573: stronger ambiguity-aware scorer are still needed before the core hypothesis can be judged decisively.
1574: 49
1576: ===== PAGE 50 =====
1577: Figure 39: Part 20 matched-budget scale sweep. Panel A shows that random placement remains stronger
1578: thanspiral pcaacross scale for practical accuracy, while the oracle stays substantially higher. Panel B
1579: shows the corresponding coverage advantage for random placement. Panel C shows that the oracle gap
1580: remains large and tends to worsen with scale. Panel D shows that runtime grows quickly with scale and that
1581: QDMN-style refinement is the most expensive practical method without opening a clear accuracy gap.
1582: 50
1584: ===== PAGE 51 =====
1585: B Appendix Summary


---

# Selective Routing main (12)

## Lines 88-203

88: 3 Method Overview
89: The proposed system uses a small guard model to score every input first. If the routing score stays
90: below a threshold, the guard prediction is returned directly. If the score exceeds that threshold,
91: the system activates a stronger expert stage and then falls back to low-cost inference on the next
92: sample. In this sense, the method is best understood as a tiny control policy for selective expert
93: activation rather than as a new predictive architecture.
94: Letg(x) denote the guard prediction for inputx, lete(x) denote the prediction returned by the
95: stronger expert stage, and lets(x) denote a hardness score. The routing policy is
96: ˆy(x) =
97: (
98: e(x), s(x)> τ,
99: g(x),otherwise,
100: whereτis selected on validation data. The experiments study several forms ofs(x), including raw
101: margin, wobble-based instability, and a combined score that fuses uncertainty and fragility.
102: 3.1 Cost-Aware Objective
103: The system is trained and selected with a cost-sensitive validation objective. IfT(x)∈ {0,1}is the
104: trigger variable andP(T(x) = 1) is the observed trigger rate, then threshold selection maximizes
105: score = accuracy−λ·P(T(x) = 1),
106: whereλ >0 penalizes expensive escalation. This prevents the degenerate solution in which the
107: router simply calls the expert on almost every sample.
108: 3.2 Routing Signals
109: We evaluate three routing signals that estimate whether a sample should be escalated to the expert
110: stage.
111: Margin.Margin is defined as the difference between the guard’s top two predicted class proba-
112: bilities. Low margin indicates ambiguity and is treated as a signal of difficulty.
113: W obble.Wobble measures prediction instability under small input perturbations. For each sam-
114: ple, repeated noisy perturbations are applied and the fraction of prediction flips is recorded. Higher
115: wobble indicates greater fragility.
116: 3
118: ===== PAGE 4 =====
119: Combined Signal.To capture both ambiguity and fragility, the combined score fuses normalized
120: margin and wobble into a single hardness signal:
121: Scombined(x) =α·(1−margin norm(x)) + (1−α)·wobble norm(x),
122: withα= 0.65 in the reported experiments.
123: 4 Experimental Progression
124: This section summarizes the experimental path that led from the first prototype to the final routing
125: benchmark. The full tables, per-setting plots, and supporting diagnostics are collected in the
126: appendix so that the main paper stays focused on the core routing lesson: the value of selectivity
127: depends on the regime.
128: The appendix contains the full tables, plots, and seed-level diagnostics; the main text reports only
129: the central takeaway from each stage.
130: 4.1 Prototype Stage: Heart Disease
131: The first prototype on the Cleveland heart disease dataset established the basic guard–expert loop,
132: but it also showed the first failure mode: weak helpers can reduce latency without preserving
133: predictive quality. These results are kept mainly as a diagnostic starting point; the full numbers
134: are moved to Appendix A.
135: Inputx
136: Guard model
137: Margin / wobble
138: hardness score
139: Escalate?
140: Return
141: guard output
142: Activate
143: expert(s)
144: Aggregate /
145: select expert output
146: Final prediction ˆy(x)
147: No Yes
148: Figure 1: Hybrid burst orchestration pipeline. A lightweight guard processes every input and
149: triggers stronger experts only for cases that appear difficult under the routing signal.
150: 4
152: ===== PAGE 5 =====
153: 4.2 Digits Stage: When Routing Becomes Competitive
154: The digits dataset provided the first setting where routing became genuinely competitive. After
155: strengthening the burst stage, the expert pathway became competent, disagreement became rare,
156: and the guard stress test showed that the guard was the main bottleneck. This made digits the
157: cleanest place to study routing selectivity. The detailed diagnostics are in Appendix A.4.
158: 4.3 Signal Study: Margin, Wobble, and Combined Routing
159: The signal-ablation study isolated the routing rule itself. Margin remained the strongest general-
160: purpose trigger, wobble captured perturbation fragility, and the combined score slightly reshaped
161: the frontier in the balanced operating region. The full Pareto tables are in Appendix A.5.
162: 4.4 Cross-Dataset Check
163: A simple generalization test on digits, wine, and breast cancer showed that routing behavior depends
164: on guard headroom. Digits offered the clearest benefit, while wine and breast cancer were already
165: close to solved by the guard. The detailed budget curve is in Appendix A.6.
166: 4.5 Final Rare-Event Benchmark
167: The final benchmark used the real credit card fraud dataset to test the controller under extreme
168: class imbalance. The important result was not a dramatic gain over the guard, but that wobble
169: was the safest ultra-low-budget trigger: when escalation had to remain rare, wobble preserved
170: guard-level performance while avoiding unnecessary expert calls. Full results are in Appendix A.7.
171: 5 Discussion and Lessons Learned
172: The main conceptual lesson is simple: the architecture works as a division of labor. A small guard
173: handles routine cases, and stronger experts are used only when the routing signal suggests that an
174: input is genuinely difficult. That makes the system a routing layer rather than a new predictive
175: model, which is the right way to interpret the contribution.
176: The second lesson is that different signals matter in different regimes. In balanced tasks, margin
177: remains the strongest general-purpose trigger because it captures uncertainty near the decision
178: boundary. Wobble is weaker as a standalone signal, but it captures a different property — fragility
179: under perturbation — and therefore becomes useful as a modifier that can improve the balanced
180: part of the frontier. This is why the combined signal is interesting: it does not replace margin, but
181: it can reshape the trade-off curve.
182: The third lesson is that routing is regime-dependent. When the guard already leaves substantial
183: headroom, selective escalation can recover most of the expert benefit at lower cost. When the
184: guard is already strong and the budget is extremely tight, as in the fraud benchmark, the best
185: policy is often to stay almost silent. That boundary case is valuable because it shows the method
186: is not universally beneficial; it is beneficial only when the guard, expert, and budget regime are
187: well matched.
188: 5
190: ===== PAGE 6 =====
191: These results suggest a clear next step: instead of adding more signals for their own sake, future
192: work should focus on improving selectivity, calibration, and budget control. The appendix contains
193: the full tables and plots, while the main text keeps only the core takeaways.
194: 6 Limitations and Future Work
195: This work has several limitations. First, the experiments are conducted on relatively small datasets
196: and classical machine-learning models rather than on real embedded deployments with direct power
197: measurements. Second, routing gains depend strongly on the gap between guard and expert perfor-
198: mance; when experts are only marginally better, selective escalation offers limited benefit. Third,
199: even the best routing signals can still over-trigger under some settings, indicating that calibration
200: and explicit trigger-budget constraints remain open problems.
201: Future work should therefore focus on stronger hardness predictors, stricter cost constraints, better
202: guard calibration, and evaluation on genuine low-resource hardware.
203: 7 Conclusion

## Lines 216-314

216: Table 1: Heart disease prototype summary.
217: Method Accuracy Macro F1 Wall ms/sample Trigger rate
218: FP32 baseline 0.877 0.8751 18.4064 –
219: Quantized-style wrapper 0.877 0.8751 13.4444 –
220: Pure Burst 0.833 0.8282 167.7704 0.487
221: Hybrid (quantized guard + burst) 0.821 0.8116 131.5921 0.387
222: 6
224: ===== PAGE 7 =====
225: Figure 2: Heart-disease prototype comparison used during the earliest development stage.
226: A.2 Light v2 Follow-Up
227: The lighter follow-up confirmed the same overall lesson: the control logic worked, but the helper
228: stage remained too weak to outperform the baseline in an accuracy-first setting.
229: Table 2: Light v2 follow-up summary.
230: Method Accuracy Runtime (s) Peak mem. (KB) Notes
231: Baseline 0.843 13.82 351.2 Reference model
232: Quantized 0.843 9.45 348.2 Same accuracy, lower time
233: Pure Burst 0.777 15.06 358.4 Disagreement = 0.229
234: Hybrid 0.744 6.03 360.2 Disagreement = 0.252
235: A.3 Light v3 Digits Results
236: The stronger digits setup made the routing story much clearer. The burst pathway became com-
237: petent, disagreement became rare, and the routing frontier became meaningful.
238: Table 3: Light v3 digits summary.
239: Method Accuracy Macro F1 Wall ms/sample Trigger rate Burst acc.
240: FP32 full 0.9611 0.9607 80.6982 – –
241: Quantized-style full 0.9611 0.9607 71.5888 – –
242: Pure Burst 0.9111 0.9090 42.0769 0.3000 0.9352
243: Hybrid 0.9083 0.9064 42.0267 0.3000 0.9352
244: 7
246: ===== PAGE 8 =====
247: Figure 3: Light v3 digits comparison showing the stronger expert pathway and the resulting routing
248: trade-off.
249: A.4 Guard Stress Test Diagnostics
250: The guard stress test showed that the guard was underconfident rather than overconfident, and
251: that the high-recall operating point came at the cost of aggressive escalation.
252: Table 4: Digits guard stress test summary.
253: Setting Accuracy Confidence / ECE Trigger rate Cost
254: Guard only 0.8639 0.4681 / 0.3958 – 1.00
255: Expert only 0.9611 – 1.0000 9.00
256: Guard + expert at threshold 0.50 0.9611 – 0.6083 5.87
257: Figure 4: Guard stress-test diagnostics referenced in the main text.
258: A.5 Signal Ablation and Pareto Frontier
259: Margin remained the strongest default trigger, wobble remained the weakest standalone signal, and
260: the combined score was mainly useful as a frontier modifier.
261: 8
263: ===== PAGE 9 =====
264: Table 5: Digits Pareto frontier summary.
265: Routing SignalλPenalty Mean Acc Trigger % Hard Recall Cost (Units)
266: Wobble (Low Noise) 0.001 0.9078 3.06% 0.1240 1.24
267: Wobble (High Noise) 0.001 0.9378 13.44% 0.5024 2.07
268: Margin (Standard) 0.080 0.9706 33.72% 0.9411 3.69
269: Combined (Balanced) 0.050 0.9717 38.39% 0.9526 4.07
270: Combined (Max Acc) 0.001 0.9756 49.17% 0.9952 4.93
271: Always-On Expert — 0.9711 100% — 8.00
272: Figure 5: Signal-ablation diagnostics and trade-off visualization for the digits routing study.
273: A.6 Cross-Dataset Generalization
274: Table 6: Cross-dataset routing summary at roughly 40% expert usage.
275: Dataset Guard acc. Expert acc. Routed acc. Trigger rate
276: Breast cancer 0.9518 0.9591 0.9591 0.3830
277: Digits 0.8266 0.9745 0.9550 0.3996
278: Wine 0.9769 0.9815 0.9815 0.3981
279: Table 7: Budget curve across datasets.
280: Dataset Budget Accuracy Trigger
281: Cancer 0.1 0.9605 0.1009
282: Cancer 0.2 0.9591 0.1988
283: Cancer 0.3 0.9591 0.2997
284: Cancer 0.4 0.9591 0.3830
285: Cancer 0.5 0.9591 0.4371
286: Digits 0.1 0.8744 0.1001
287: Digits 0.2 0.9124 0.1980
288: Digits 0.3 0.9314 0.3004
289: Digits 0.4 0.9550 0.3996
290: Digits 0.5 0.9634 0.4979
291: Wine 0.1 0.9861 0.1111
292: Wine 0.2 0.9815 0.2083
293: Wine 0.3 0.9815 0.3056
294: Wine 0.4 0.9815 0.3981
295: Wine 0.5 0.9815 0.5000
296: 9
298: ===== PAGE 10 =====
299: Figure 6: Cross-dataset budget curve across breast cancer, digits, and wine.
300: A.7 Rare-Event Fraud Benchmark
301: Table 8: Final rare-event budget-sweep summary on the real credit card fraud benchmark.
302: Policy / Signal Balanced Acc. Pos. Recall Trigger Rate Cost
303: Guard only 0.9286 0.8606 0.0000 1.0000
304: Always expert 0.8968 0.7939 1.0000 9.0000
305: Oracle 0.9301 0.8606 0.0050 1.0402
306: Wobble (best, 0.1% cap) 0.9288 0.8606 0.0006 1.0048
307: Margin (best) 0.9287 0.8606 0.0001 1.0006
308: Confidence (best) 0.9287 0.8606 0.0001 1.0008
309: Combined (best) 0.9286 0.8606 0.0000 1.0002
310: Random (best) 0.9287 0.8606 0.0202 1.1616
311: 10
313: ===== PAGE 11 =====
314: Figure 7: Rare-event budget-sweep plots for balanced accuracy, positive recall, and cost under fixed


---

# Spiral Sparsity main (16)

## Lines 226-365

226: 5 Experimental Results
227: We conducted a multi-seed experiment on MNIST using the implementation provided in the project
228: context. Three multilayer perceptrons were trained for five epochs using Adam with learning rate
229: 10−3 and batch size 128:
230: •a phyllotactic sparse network using the proposed mask at density 0.05;
231: •a random sparse network with matched density;
232: •a standard dense network with the same layer widths.
233: The experimental protocol was designed to be deliberately fair. All three models used the same
234: multilayer perceptron topology, the same optimizer, the same training duration, and the same data
235: 6
237: ===== PAGE 7 =====
238: preprocessing. The sparse comparison was especially strict: the phyllotactic and random models
239: were matched for active connection count, and both used identical bias structure. The scientific
240: question being tested is therefore narrow and well-defined: whether a fixed geometric sparsity prior
241: is preferable to an equally sparse random prior under the same training budget.
242: The architectures used layer widths (784,256,128,10) and were evaluated over five random seeds
243: {0,1,2,3,4}. In addition to standard test accuracy, we evaluated robustness under additive Gaus-
244: sian input noise with standard deviationσ= 0.20. For the sparse models, the number of active
245: parameters in the forward pass was 12,131, including biases, compared with 235,146 active param-
246: eters for the dense network. Thus, the sparse models used only about 5.16% of the active forward
247: parameters of the dense baseline.
248: Ignoring biases, the active sparse weight count is approximately
249: 0.05·784·256 + 0.05·256·128 + 0.05·128·10≈11,737,(14)
250: compared with 234,752 dense weights in the corresponding fully connected model. This clarifies
251: that the phyllotactic and random models were matched not only in nominal density but also in
252: exact active parameter count.
253: Table 1 summarizes the final held-out results at epoch 5. In the recovered five-seed summary, the
254: phyllotactic model outperformed the random sparse baseline on both clean and noisy test accuracy.
255: On clean test data, the gain was 0.476 percentage points (94.216% versus 93.740%). Under noisy
256: evaluation, the gain was 0.474 percentage points (93.878% versus 93.404%). The dense model
257: remained clearly stronger overall, but did so with roughly nineteen times more active forward
258: parameters.
259: Table 1: Final MNIST performance at epoch 5 over five seeds. Values are mean±standard
260: deviation in percent.
261: Model Test Accuracy Noisy Test Accuracy Active Parameters
262: Phyllotactic Sparse 94.216±0.166 93.878±0.196 12,131
263: Random Sparse 93.740±0.265 93.404±0.184 12,131
264: Dense 97.730±0.209 97.656±0.186 235,146
265: Figure 1 shows the mean test-accuracy trajectories over training. The phyllotactic curve lies above
266: the random sparse curve at every epoch, indicating that the advantage is not limited to the final
267: checkpoint. Averaged over seeds, the phyllotactic model improved from 90.330% to 94.216% test
268: accuracy over five epochs, whereas the random sparse model improved from 89.990% to 93.740%.
269: 7
271: ===== PAGE 8 =====
272: Figure 1: Mean MNIST test accuracy over five seeds for phyllotactic sparse, random sparse, and
273: dense networks. Shaded bands indicate one standard deviation across seeds.
274: The central conclusion from this first multi-seed run is modest but encouraging: a fixed phyllotac-
275: tic mask can slightly and consistently outperform a random sparse mask at matched density on
276: both clean and noisy held-out evaluation, even though both sparse models remain behind a dense
277: baseline. Put differently, structured wiring helps a little, randomness is slightly worse, and full
278: density still wins clearly. This makes the idea more than a purely aesthetic construction, but not
279: yet a demonstrated advance over conventional dense architectures.
280: A useful secondary perspective is relative efficiency. The phyllotactic model reaches about 96.36%
281: of the dense model’s final clean test accuracy while using only about 5.16% of the active forward
282: parameters. That ratio does not make it superior to dense models in an absolute sense, but it does
283: support the claim that geometry-informed sparse connectivity is a legitimate efficiency-oriented
284: design direction.
285: 5.1 Density Sweep Across Datasets
286: To test whether the 5% result generalizes across sparsity levels, we added a density sweep comparing
287: golden-angle and random sparse masks at 1%, 2%, 5%, and 10% connectivity on MNIST, and
288: at 2%, 5%, and 10% connectivity on Fashion-MNIST. Table 2 reports the recovered summary
289: statistics. We omit Fashion-MNIST at 1% from the main table because only one valid run survived
290: in the recovered summary, yielding an undefined cross-seed standard deviation and therefore not
291: constituting a full multi-seed comparison.
292: 8
294: ===== PAGE 9 =====
295: Table 2: Recovered density-sweep results for golden-angle and random sparse masks. Values are
296: mean±standard deviation of final test accuracy in percent. Fashion-MNIST at 1% is omitted
297: because the recovered summary contains only one valid run.
298: Dataset Density Golden-angle sparse Random sparse
299: MNIST 1% 33.012±6.465 32.960±3.535
300: MNIST 2% 87.464±0.334 74.864±6.072
301: MNIST 5% 94.216±0.166 93.740±0.265
302: MNIST 10% 95.700±0.085 95.486±0.082
303: Fashion-MNIST 2% 75.162±8.328 74.238±6.909
304: Fashion-MNIST 5% 84.520±0.068 84.634±0.087
305: Fashion-MNIST 10% 85.546±0.410 85.732±0.261
306: The density sweep supports a more careful interpretation than the earliest draft. On MNIST, the
307: golden-angle mask is modestly ahead at 1%, 5%, and 10%, and dramatically ahead at 2%, where it
308: outperforms the matched random baseline by 12.600 percentage points. On Fashion-MNIST, the
309: recovered results are more mixed: golden-angle sparsity is slightly better at 2%, but slightly worse
310: at 5% and 10%. The cleanest synthesis is therefore not that golden-angle sparsity is uniformly
311: superior, but that it is a competitive deterministic sparse prior overall, with one especially strong
312: recovered advantage on MNIST at 2% density.
313: 5.2 Performance at the Edge of Sparsity
314: The 2% MNIST condition is the most informative regime in the current paper because it sits
315: near the edge where sparse connectivity becomes difficult to allocate well. At 10% density, both
316: deterministic and random masks have enough active connections that the performance gap becomes
317: small. At 2%, by contrast, the connection budget is tight enough that placement geometry matters
318: more strongly. The present evidence suggests that this regime is where deterministic design appears
319: most valuable, even though the exact causal mechanism is not captured by simple coverage or
320: entropy statistics alone.
321: The 1% MNIST condition adds an additional cautionary signal. Both methods perform poorly
322: there, and the recovered standard deviations are much larger than at higher densities, indicating
323: that extreme sparsity produces unstable training and strong seed sensitivity. Rather than weakening
324: the paper, this helps locate the practical boundary of the approach: below a certain connection
325: budget, neither structured nor random sparsity yields reliably strong performance with the current
326: architecture and training setup.
327: Two methodological cautions remain important. First, the present study is limited to MNIST and
328: Fashion-MNIST with shallow multilayer perceptrons, so the findings may not transfer to harder
329: datasets or convolutional and transformer architectures. Second, while several results now use
330: five seeds, that still constitutes a relatively small sample for strong statistical claims. Third,
331: the incomplete Fashion-MNIST 1% condition is a reminder that the recovered summaries are not
332: equally mature across all settings.
333: We therefore treat these statistics as descriptive rather than definitive. The tables report means and
334: 9
336: ===== PAGE 10 =====
337: standard deviations across seeds, and the paper now includes one small-sample paired significance
338: analysis for the CIFAR-10 edge microbenchmark, but it still does not provide confidence intervals or
339: broad formal testing across the main MNIST and Fashion-MNIST sweeps. Adding those analyses
340: would strengthen the claim that the 2% MNIST advantage reflects a robust effect rather than a
341: small-sample fluctuation.
342: 5.3 MNIST 2% Final Fair Comparison with Magnitude Pruning
343: To make the strongest low-density MNIST result as fair and interpretable as possible, we ran one
344: final controlled comparison entirely within a single script at 2% density over the same five seeds
345: {0,1,2,3,4}. The compared conditions were a dense multilayer perceptron, a matched random
346: sparse model, the original golden-angle sparse model, and a magnitude-pruned baseline. The
347: dense, random sparse, and golden original models were each trained for five epochs under the
348: same optimizer, batch size, data loaders, and seed handling. The magnitude-pruned baseline was
349: intentionally stronger: for each seed it was first pretrained densely for three epochs, then globally
350: pruned to the same 2% density, and finally fine-tuned for two additional epochs.
351: This experiment changes the interpretation of the 2% regime in an important way. Amongfixed-
352: from-initializationsparse models, the original golden mask remains clearly stronger than matched
353: random sparsity. The five-seed means are 89.132±0.468% for golden original versus 80.674±4.060%
354: for random sparse, a paired mean advantage of 8.458 percentage points with pairedt= 4.349,
355: p= 0.012, and Cohen’sd= 1.945. However, once a stronger pruning-based baseline is introduced,
356: magnitude pruning performs much better than either fixed sparse construction, reaching 96.540±
357: 0.131%, while the dense baseline reaches 97.564±0.127%.
358: Figure 2: Final fair MNIST 2% comparison over five seeds. Golden original clearly outperforms
359: matched random sparsity among fixed sparse masks, but both remain below magnitude pruning
360: and the dense baseline. Error bars show one standard deviation across seeds.
361: 10
363: ===== PAGE 11 =====
364: The fair-comparison figure makes the hierarchy clear. Dense remains best, magnitude pruning is a
365: very strong second, golden original is a solid third, and random sparse trails well behind. This is

## Lines 407-435

407: 5.5 Angle Sensitivity Ablation
408: To probe whether the observed effect is specific to the golden angle or reflects a broader property of
409: spiral-based deterministic sparsity, we ran a follow-up ablation over alternative angular increments.
410: The compared models were: golden angle,e,
411: √
412: 2, a seed-dependent random irrational angle,π/2
413: (listed asdeg90),π(listed as bothdeg180andpi), a random sparse baseline, and a dense baseline.
414: Each condition was trained for five epochs over five seeds on MNIST under the same 5% density
415: setting.
416: Table 3 reports the final test accuracy. Three patterns stand out. First, the dense model remains
417: the strongest overall. Second, several nontrivial spiral angles—golden,e,
418: √
419: 2, and the sampled
420: random-angle spiral—cluster closely together around 93.3–93.4% test accuracy, so no single angle
421: 12
423: ===== PAGE 13 =====
424: in this group is clearly dominant in the present experiment. Third, simple rational angles such
425: asπandπ/2 perform dramatically worse, withπcollapsing to near-chance performance andπ/2
426: producing unstable and highly variable results.
427: Table 3: Angle ablation on MNIST over five seeds. Values are mean±standard deviation of final
428: test accuracy in percent.
429: Model / Angle Test Accuracy
430: Dense 97.676±0.186
431: Random Sparse 93.768±0.176
432: espiral 93.442±0.097
433: Golden-angle spiral 93.440±0.139
434: Random irrational-angle spiral 93.386±0.284√
435: 2 spiral 93.276±0.211

## Lines 465-520

465: 5.6 Generalization to Fashion-MNIST
466: To test whether the angle-ablation pattern transfers to a harder dataset, we repeated the same
467: sparse-angle study on Fashion-MNIST using the same architecture, density, number of seeds, and
468: training duration. The resulting ranking is shown in Table 4. The dense model again performs best
469: overall, with mean test accuracy 87.892%. Among the sparse models, random sparsity is marginally
470: strongest at 84.512%, followed extremely closely by sampled random-angle spiral (84.502%), golden
471: angle (84.464%),e(84.356%), and
472: √
473: 2 (84.262%).
474: Table 4: Fashion-MNIST angle ablation over five seeds. Values are mean±standard deviation of
475: final test accuracy in percent.
476: Model / Angle Test Accuracy
477: Dense 87.892±0.415
478: Random Sparse 84.512±0.108
479: Sampled random-angle spiral 84.502±0.263
480: Golden-angle spiral 84.464±0.160
481: espiral 84.356±0.266√
482: 2 spiral 84.262±0.147
483: π/2 spiral 46.512±7.868
484: πspiral 10.000±0.000
485: 14
487: ===== PAGE 15 =====
488: Figure 5: Final Fashion-MNIST test accuracies across the angle ablation study. As on MNIST,
489: a high-performing cluster of non-degenerate spiral angles appears, while simple rational angles
490: degrade sharply.
491: This second dataset materially strengthens the interpretation of the earlier MNIST ablation. The
492: same qualitative structure reappears: a cluster of viable non-degenerate spiral angles, a weak and
493: unstableπ/2 condition, and a fully collapsedπcondition at chance level. At the same time, the gap
494: between golden angle and other good sparse baselines remains tiny. In particular, the golden-angle
495: model is only 0.048 percentage points below random sparsity on average in this Fashion-MNIST
496: run.
497: Taken together, the MNIST and Fashion-MNIST results support a more precise claim than the
498: original hypothesis. The evidence does not indicate that the golden ratio is uniquely optimal,
499: nor does it prove that irrationality by itself is the operative mechanism. Rather, it indicates that
500: deterministic sparse connectivity benefits from angular rules that avoid short-period repetition and
501: create broad layer coverage. The golden angle remains a natural and interpretable choice within
502: that family, but the broader phenomenon appears to be about non-degenerate geometric spreading
503: rather than golden-ratio exclusivity.
504: 5.7 CIF AR-10 Small CNN
505: To test whether the method transfers beyond small multilayer perceptrons, we evaluated 5% sparse
506: masks on CIFAR-10 using a small convolutional network with two convolutional layers, two linear
507: layers, batch normalization, and dropout. The sparse models again used matched active-connection
508: budgets, and all conditions were trained for five epochs over five seeds. Table 5 summarizes the
509: final results.
510: 15
512: ===== PAGE 16 =====
513: Table 5: CIFAR-10 small-CNN results at 5% density over five seeds. Values are mean±standard
514: deviation of final test accuracy in percent.
515: Model Test Accuracy Train Accuracy
516: Phyllotactic Sparse 54.972±0.692 46.073±0.599
517: Random Sparse 54.856±0.922 45.445±0.759
518: Dense 72.120±0.617 66.991±0.350
519: The CIFAR-10 result is useful precisely because it is not a dramatic win. The phyllotactic and
520: random sparse CNNs are essentially tied, with only a 0.116 percentage-point difference in mean

## Lines 543-662

543: 5.8 CIF AR-100 Tiny ResNet
544: We next tested a harder vision setting by moving to CIFAR-100 and replacing the small CNN with
545: a tiny residual network. In this experiment, the golden and random sparse models were both run
546: at 10% density, again under matched active-connection budgets, for five epochs over three seeds.
547: The goal was not to maximize absolute accuracy, but to determine whether the geometric prior
548: remains competitive as task complexity and architectural depth increase. Table 6 reports the final
549: results.
550: 17
552: ===== PAGE 18 =====
553: Table 6: CIFAR-100 Tiny-ResNet results at 10% density over three seeds. Values are mean±
554: standard deviation of final accuracy in percent.
555: Model Test Accuracy Train Accuracy
556: Phyllotactic Sparse 27.187±2.120 28.124±0.766
557: Random Sparse 29.017±1.240 29.243±0.249
558: Dense 37.450±1.205 40.219±0.209
559: Unlike the MNIST 2% result, the CIFAR-100 experiment does not favor the phyllotactic mask.
560: Random sparsity outperforms the golden-angle construction by 1.830 percentage points in mean
561: test accuracy, and the dense baseline remains substantially stronger than either sparse model. The
562: gap is not enormous, but it is directionally consistent with the learning curves: on this harder 100-
563: class task, the fixed spiral mask appears somewhat too rigid relative to a random sparse alternative.
564: This strengthens the paper’s central restraint. The geometric prior is not a universal winner; rather,
565: it seems most promising in regimes where coverage is scarce but the task and architecture are still
566: simple enough for deterministic structure to help rather than hinder learning.
567: Figure 9 shows the corresponding learning trajectories. The random sparse curve stays modestly
568: above the phyllotactic curve throughout training, while the dense model separates clearly from
569: both. Figures 10 and 11 show the stem-convolution masks used for the sparse Tiny-ResNet models.
570: Figure 9: CIFAR-100 Tiny-ResNet mean test accuracy over three seeds for phyllotactic sparse,
571: random sparse, and dense networks. Random sparsity stays slightly above the phyllotactic curve,
572: while the dense baseline separates clearly from both.
573: 18
575: ===== PAGE 19 =====
576: Figure 10: Flattened stem-convolution phyllotactic mask for the CIFAR-100 Tiny ResNet. The
577: spiral organization is still clearly visible in the first layer.
578: Figure 11: Flattened stem-convolution random sparse mask for the CIFAR-100 Tiny ResNet. The
579: pattern lacks the large-scale structure seen in the phyllotactic version.
580: 5.9 CIF AR-100 Training-Budget Stress Test
581: To distinguish between “golden is worse” and “golden is slower,” we ran a follow-up budget-stress
582: experiment on CIFAR-100 using the same 10% Tiny-ResNet setting but extending training to 10
583: epochs and recording checkpoints at epochs 1, 3, 5, and 10. This design keeps dataset, architecture,
584: seed, initialization, and data order fixed within each run, so the main changing variable is training
585: budget. Table 7 summarizes the checkpoint means across two seeds.
586: Table 7: CIFAR-100 Tiny-ResNet budget-stress results at 10% density over two seeds. Values are
587: mean test accuracy in percent at matched checkpoints.
588: Model Epoch 1 Epoch 3 Epoch 5 Epoch 10
589: Phyllotactic Sparse 11.890 18.395 24.470 32.235
590: Random Sparse 11.835 20.460 26.760 34.925
591: Dense 14.185 25.430 37.240 45.025
592: 19
594: ===== PAGE 20 =====
595: This stress test gives a clearer optimization picture than the earlier 5-epoch run alone. At epoch
596: 1, the phyllotactic and random sparse models are essentially tied, with the geometric mask holding
597: a trivial 0.055 percentage-point edge. By epoch 3, however, random sparsity has moved ahead by
598: 2.065 points; by epoch 5 the gap is 2.290 points; and by epoch 10 it widens slightly further to 2.690
599: points. The key implication is that the phyllotactic mask is not merely slower and then convergent
600: to the same solution. Instead, on this harder CIFAR-100 setting, extra training time does not erase
601: the deficit. The geometric prior remains viable and improves steadily, but random sparsity appears
602: to offer a modestly more favorable optimization path for this architecture and task.
603: Figure 12 shows the 10-epoch learning curves, and Figure 13 isolates the golden-versus-random
604: checkpoint comparison. Together they show that the gap is small at initialization but becomes
605: persistent once training begins in earnest. We also logged average gradient norms, but early au-
606: tomatic mixed-precision scaling occasionally producedNaNorinfsummary values in the first few
607: epochs, so we treat those diagnostics as exploratory rather than publication-grade evidence in the
608: current draft.
609: Figure 12: CIFAR-100 budget-stress learning curves over 10 epochs for phyllotactic sparse, random
610: sparse, and dense Tiny-ResNet models. Random sparsity remains modestly above the phyllotactic
611: curve throughout most of training, while the dense baseline separates clearly from both.
612: 20
614: ===== PAGE 21 =====
615: Figure 13: CIFAR-100 golden-versus-random checkpoint comparison under the training-budget
616: stress test. The models are nearly tied at epoch 1, after which random sparsity develops a small
617: but persistent advantage.
618: 5.10 CIF AR-10 Edge Microbenchmark, Dense Baseline, and Dead-Neuron Di-
619: agnostic
620: As a deliberately harsh sanity check, we also ran a tiny CIFAR-10 edge-style microbenchmark
621: designed to test whether a deterministic mask retains any advantage when both model capacity
622: and training budget are extremely constrained. In this setting, we used the same TinyEdgeCNN
623: architecture with three conditions: phyllotactic sparse, matched random sparse, and dense. All
624: models were trained on a fixed small subset of CIFAR-10 for only 20 optimization steps, with
625: checkpoints at steps 5, 10, and 20. We evaluated three densities, 1%, 2%, and 5%, and used
626: five seeds at each density. Because the same subset, seed, and data order were used for each
627: paired golden-versus-random run, the comparison isolates the effect of connectivity structure under
628: a severe edge-like budget. Table 8 summarizes the final step-20 accuracy, Table 9 reports the
629: paired golden-versus-random statistical tests, and Table 10 records the accompanying dead-neuron
630: diagnostic.
631: 21
633: ===== PAGE 22 =====
634: Table 8: CIFAR-10 edge microbenchmark final step-20 results over five seeds per density. Values
635: are mean±standard deviation of test accuracy in percent, with the last column reporting the
636: paired golden-minus-random difference in percentage points.
637: Density Model Step 20 Paired gap
638: 1% Dense 18.02±0.87 —
639: 1% Phyllotactic Sparse 11.56±1.59 +1.76
640: 1% Random Sparse 9.80±0.14 —
641: 2% Dense 18.02±0.87 —
642: 2% Phyllotactic Sparse 12.54±1.96 +0.66
643: 2% Random Sparse 11.88±1.56 —
644: 5% Dense 18.02±0.87 —
645: 5% Phyllotactic Sparse 12.26±1.68−1.94
646: 5% Random Sparse 14.20±0.97 —
647: These results should be interpreted cautiously. Even the dense model reaches only about 18% accu-
648: racy after 20 steps, so the microbenchmark is not evidence of practical competitiveness. However, it
649: is still informative because it probes an extreme regime with vanishingly small connection budgets
650: and almost no learning time. In that regime, the phyllotactic mask outperforms matched random
651: sparsity at 1% density by 1.76 percentage points on average and at 2% density by 0.66 points, but
652: loses by 1.94 points at 5%. This pattern fits the broader story of the paper more closely than the
653: earlier two-density run: geometric determinism appears most promising at the tightest budgets,
654: while random sparsity catches up or pulls ahead once the network is given a less severe connection
655: budget. Dense remains clearly stronger than both sparse variants at every density.
656: The paired significance tests reinforce the need for restraint. With only five seeds, none of the
657: golden-versus-random gaps are conventionally significant under a pairedt-test: thep-values are
658: 0.080 at 1%, 0.693 at 2%, and 0.155 at 5%. The corresponding Cohen’sdvalues, 1.167, 0.212, and
659: −0.874, suggest a potentially meaningful positive effect at 1%, a very weak effect at 2%, and a
660: moderate negative effect at 5%, but the sample is too small to treat those as settled conclusions.
661: The most defensible reading is therefore directional rather than confirmatory.
662: Table 9: Paired golden-versus-random statistical tests for the CIFAR-10 edge microbenchmark at

## Lines 774-884

774: Table 12 collects the main empirical message of the paper in one place. The most important pattern
775: is not that the deterministic spiral mask always wins, but that its behavior depends strongly on
776: regime. It is mildly favorable on the recovered MNIST matched-budget test, especially strong
777: on the recovered MNIST 2% density condition, roughly tied on CIFAR-10 with a small CNN
778: at 5% density, unfavorable on CIFAR-100, negative for the aspect-ratio-normalized variant, and
779: mixed in the edge microbenchmark where it helps at 1% and 2% density but loses at 5%. That
780: density dependence, together with the new mechanism ablations that rule out simple coverage and
781: uniformity explanations, is the cleanest high-level takeaway from the current draft.
782: Table 12: Cross-dataset summary of the main matched-budget comparisons in the paper. Accura-
783: cies are final test accuracies in percent. The takeaway column states the intended interpretation
784: rather than a claim of statistical significance.
785: Dataset Family Density Spiral Random Dense Takeaway
786: MNIST MLP 5% 94.216 93.740 97.730 Original golden helps; aspect-aware hurts in separate ablationMNIST MLP 2% 87.464 74.864 — Strongest regime for original goldenFashion-MNIST MLP 2–10% mixed mixed — Mixed overall; no consistent structured advantageCIFAR-10 small CNN 5% 54.972 54.856 72.120 Random and original are close; aspect-aware is worseCIFAR-100 Tiny ResNet 10% 27.187 29.017 37.450 Random wins; dense wins clearlyCIFAR-10 edge tiny CNN 1%, 2%, 5% 11.56 / 12.54 / 12.26 9.80 / 11.88 / 14.20 18.02 Original helps only at the tightest budgets
787: 7 Experimental Program
788: The next stage of this project should evaluate the method under controlled comparisons. A minimal
789: experimental matrix is as follows.
790: 7.1 Baselines
791: Each deterministic-spiral model should be compared against:
792: •a dense multilayer perceptron with the same layer widths;
793: •a random sparse network with the same number of active weights;
794: •a magnitude-pruned model compressed to the same final sparsity;
795: •optionally, a block-sparse or low-rank baseline if hardware efficiency becomes relevant.
796: 26
798: ===== PAGE 27 =====
799: 7.2 Datasets
800: MNIST now serves as the first proof-of-concept dataset for the method, and the current revision in-
801: cludes recovered density-sweep comparisons across multiple sparsity levels, five-seed angle-ablation
802: studies on MNIST and Fashion-MNIST, a five-seed fair MNIST 2% rerun that adds a magnitude-
803: pruned baseline, a five-seed CIFAR-10 small-CNN transfer experiment, a three-seed CIFAR-100
804: Tiny-ResNet study, a two-seed CIFAR-100 training-budget stress test, and a five-seed CIFAR-
805: 10 edge microbenchmark with dense, random-sparse, and phyllotactic models at 1%, 2%, and 5%
806: density, together with a dead-neuron diagnostic. Additional lightweight tabular or synthetic bench-
807: marks remain useful because they permit repeated runs, ablation studies, and uncertainty estimates
808: with low computational cost. The initial objective is not state-of-the-art performance, but a clean
809: comparison between geometric sparsity and standard alternatives.
810: 7.3 Metrics
811: Recommended evaluation metrics include:
812: •test accuracy and training loss;
813: •parameter count and effective sparsity ratio;
814: •convergence speed in steps or epochs;
815: •variance across random seeds;
816: •robustness under input noise, weight perturbation, or adversarial corruption.
817: The current manuscript now includes held-out test accuracy, repeated-seed variability, and one
818: small-sample paired significance analysis for the edge microbenchmark, but it still lacks confusion
819: matrices, confidence intervals across the broader experiment set, wall-clock time, and calibration
820: measures.
821: 7.4 Ablations
822: Several ablations naturally follow from the construction:
823: •replace the golden angle with other irrational or rational angular increments;
824: •vary the radial law from
825: √
826: ito linear or logarithmic growth;
827: •alter the number of seeds independently of min(d out, din);
828: •compare fixed phyllotactic masks with trainable or partially trainable masks;
829: •test Fibonacci-inspired width schedules such as (55,34,21) or deeper sequences.
830: These studies would help determine whether any observed benefit arises specifically from phyl-
831: lotaxis, from determinism alone, or simply from the regularizing effect of extreme sparsity.
832: 27
834: ===== PAGE 28 =====
835: 8 Discussion
836: The proposal can be interpreted in two complementary ways.
837: First, it is a compression prior. Because the mask is generated from a short rule, the architecture can
838: in principle be reconstructed without storing an arbitrary sparsity pattern. This may be attractive
839: in settings where reproducibility and compact architectural descriptions matter.
840: Second, it is a representational hypothesis. The mask imposes a non-random spatial ordering on
841: which interactions between input and output units are allowed. If learning benefits from structured
842: diversity rather than redundant connectivity, then a geometric prior could outperform a random
843: sparse pattern at the same parameter budget.
844: These results position deterministic spiral sparsity as an intermediate approach between random
845: initialization and learned sparsity methods. While it does not match the performance of magnitude
846: pruning, it provides a zero-additional-compute, deterministic alternative that significantly improves
847: over matched random sparsity in extreme low-density regimes. That makes it useful as a clean
848: architectural prior even when it is not the strongest overall route to final accuracy.
849: There are also clear limitations. The current mapping from spiral coordinates to matrix indices is
850: heuristic and sensitive to layer aspect ratio, yet the new aspect-ratio normalization ablation shows
851: that this issue is subtler than it first appeared: visible anisotropy alone is not the main problem,
852: because a direct normalization step degraded performance on both MNIST and CIFAR-10. Fu-
853: ture geometric corrections will therefore need to preserve the useful structured correlations of the
854: original mask rather than merely making it look more symmetric. The CIFAR-10 and CIFAR-100
855: experiments add a second limitation: even when deterministic sparse masks remain viable, their
856: advantage over random sparsity may shrink or reverse on harder datasets and convolutional archi-
857: tectures. The CIFAR-100 budget-stress result makes this sharper still: the geometric mask does
858: not simply lag early and then catch up with more epochs; rather, the random sparse advantage
859: persists as training budget increases. The revised CIFAR-10 edge microbenchmark adds a comple-
860: mentary nuance: under an intentionally harsh low-budget regime, the original phyllotactic mask
861: holds a small average edge at 1% and 2% density, but the effect reverses by 5%. The dead-neuron
862: diagnostic suggests that this is not simply because the original mask avoids disconnected units,
863: and the new causal and entropy ablations go further by showing that neither maximizing coverage
864: nor enforcing uniformity reproduces the phyllotactic advantage. The more plausible explanation
865: is therefore that the original spiral provides a structured non-random connectivity pattern whose
866: useful properties are not captured by simple scalar statistics alone. Moreover, ordinary weight ma-
867: trices do not possess an intrinsic Euclidean geometry in the same way that points in physical space
868: do. The usefulness of the induced structure must therefore be demonstrated empirically rather
869: than assumed from the biological metaphor. Finally, the sparse models still contain dense trainable
870: tensors under the hood, so true systems-level memory and compute savings would require a more
871: specialized implementation. The present evidence therefore speaks most directly to inductive bias
872: and matched-budget learning behavior, not yet to end-to-end deployment efficiency. The method
873: also appears to impose structural constraints that limit performance on more complex datasets
874: such as CIFAR-100.
875: 28
877: ===== PAGE 29 =====
878: 9 Conclusion
879: The revised evidence does not support a simple explanation based on input coverage or distribution
880: entropy. Instead, the results suggest that the advantage of deterministic spiral sparsity arises from
881: structured, deterministic connectivity patterns that differ fundamentally from random sparsity.
882: While the precise mechanism remains open, the experiments show that neither maximizing coverage
883: nor enforcing uniformity is sufficient to reproduce the observed gains. This shifts the interpreta-
884: tion of deterministic spiral sparsity away from scalar statistical properties and toward structured


---

# QDMN main

## Lines 100-242

100: 3 QDMN Framework
101: 3.1 Core Abstractions
102: Letx∈R ···×d denote a tensor whose last dimension is thefeature dimensiond. QDMN maintains
103: a mutable statesin aCoreNode, where dim(s) =d.
104: Adirectional moduleis a function (implemented as annn.Module)
105: mσ,d :R ···×d →R ···×d′
106: parameterized by adirection symbolσ∈ {F,B,U,D}and an input feature dimensiond. Each
107: module declares an output feature dimensiond ′.
108: QDMN maintains a registry keyed by input dimension, mapping direction symbols to modules:
109: R[d][σ]7→(m σ,d, d′).
110: 3.2 Routing Semantics
111: Arouteis a sequence of direction symbols
112: π= [σ 1, . . . , σT ].
113: Given an initial tensorxwith feature dimensiond 0, QDMN executes:
114: s0 =x
115: st =m σt,dim(s t−1)(st−1) fort= 1, . . . , T .
116: Execution fails if a required module is not registered for the current feature dimension.
117: 3
119: ===== PAGE 4 =====
120: Interpretation of directions.The direction symbols are semantic labels rather than mathe-
121: matical inverses:
122: •F (F orward):advance a representation (prediction, progression).
123: •B (Backward):refine, critique, or check consistency against constraints.
124: •U (Up):compress/abstract (reduce feature dimension or complexity).
125: •D (Down):expand/reconstruct (increase detail or feature dimension).
126: 3.3 Design Notes
127: Dimensional contracts.QDMN uses the last dimension of tensors as the routing “type”. This
128: supports vector, sequence, and image data, provided modules preserve all non-feature dimensions
129: (or do so intentionally).
130: Adapters.To connect incompatible feature dimensions across routes or across multiple QDMNs,
131: adapters (e.g., linear projections) can be inserted.
132: T raining.QDMN does not prescribe training. Common options include (i) route-conditioned
133: supervised loss, (ii) reconstruction losses for [U,D], and (iii) consistency losses for [F,B].
134: 4 Reference Implementation
135: We provide a minimal PyTorch implementation that supports: (i) aCoreNodethat stores the
136: current state, (ii) a registry of modules keyed by input feature dimension and direction symbol,
137: and (iii) an explicitroute(path, x)method that executes the route.
138: 4.1 Complexity
139: LetTbe route length and let each module costC t. Route execution costs PT
140: t=1 Ct withO(1)
141: registry lookup per step.
142: 5 Experiments
143: 5.1 Goals
144: We study QDMN primarily as an architectural abstraction rather than as a single task-specific
145: model. Our experiments target three questions: (i) can QDMN express common computation
146: motifs (direct prediction, compress–reconstruct, iterative refinement), (ii) can QDMN match simple
147: baselines on toy tasks under comparable training recipes, and (iii) what happens when we execute
148: longerroutes than those used during training (route switching / depth scaling).
149: 5.2 Tasks
150: We use three small synthetic tasks (chosen for fast iteration and clear diagnostics): (1) 8×8 image
151: classification, (2) 1-D noisy sine regression, and (3) sequence parity (length 10). Full data generation
152: and model definitions are provided in Appendix A.
153: 4
155: ===== PAGE 5 =====
156: Table 1: Benchmark summary (single-seed run). Replace values with the outputs produced by your
157: current run and report mean±std over multiple seeds in a final version.
158: Task Metric Baseline 1 Baseline 2 QDMN route Value
159: 8×8 image cls. Accuracy CNN MLP [F,H] 1.00
160: 8×8 image cls. Accuracy CNN MLP [U,D,H] 1.00
161: Sine regression MSE↓MLP — [F,B,D]0.013
162: Seq. parity (len=10) Accuracy MLP RNN [F,B,D,H] 0.60
163: Table 2: Depth generalization on sine regression. Naive depth-1 training exhibits deterioration at
164: larger depths (e.g., depth 8), while multi-depth training keeps performance bounded across depths
165: in this run.
166: DepthdQDMN (naive) MSE↓QDMN (multi-depth) MSE↓
167: 1 0.121418 0.169901
168: 2 0.104954 0.143478
169: 4 0.154913 0.112439
170: 8 0.658170 0.216256
171: 5.3 Training setup
172: Unless noted otherwise, models are trained with Adam (lr = 10 −3), batch size 64, and a fixed
173: random seed. We report accuracy for classification and mean-squared error (MSE) for regression.
174: 6 Results and Discussion
175: 6.1 Benchmark summary
176: Table 1 reports representative results from our reference script. These experiments are not intended
177: to establish state-of-the-art performance; they serve to validate that QDMN routes can be trained
178: end-to-end and to highlight route-dependent behavior.
179: 6.2 Depth generalization: naive vs stable refiners
180: A central motivation for QDMN is that inference depth is programmable via route length. However,
181: extending a route beyond its training depth is not guaranteed to improve performance. We therefore
182: evaluatedepth generalizationon a toy sine regression task by comparing: (i) anaiveQDMN trained
183: only at depth 1, and (ii) astableQDMN trained with a multi-depth objective.
184: Concretely, the model computes ˆy= D(Bd(ReLU(F(x)))) wheredis the inference depth (num-
185: ber of applications of B). We use a gated residual refiner with spectral normalization as a practical
186: stability mechanism.
187: Interpretation.The results support a conservative claim:depth generalization is conditional,
188: not automatic. When a refinement operator B is trained only for a single application, repeated
189: application can move the representation outside the manifold expected by the decoder. Multi-
190: depth training and gated residual refiners mitigate this by explicitly optimizing behavior across
191: multiple unroll depths.
192: 5
194: ===== PAGE 6 =====
195: Figure 1: Depth generalization behavior on sine regression (log-scaled depth axis). In this run, the
196: naive model diverges at larger depths, while multi-depth training keeps errors bounded.
197: Table 3: Multi-seed summary (validation/test MSE; lower is better).
198: Model/setting Val. MSE (mean±std) Test MSE (mean±std)
199: MLP (depth 1) 0.014721±0.002424 0.015340±0.001809
200: QDMN naive (depth 1) 0.018939±0.002827 0.019220±0.001577
201: QDMN stable (depth 1) 0.107850±0.046955 0.099328±0.042365
202: QDMN stable (depth 4) 0.072137±0.035018 0.064939±0.034157
203: QDMN stable (depth 8) 0.066954±0.010260 0.059372±0.014283
204: T akeaway .QDMN makes depth scaling a controllable variable and provides a clean testbed
205: for studying stability mechanisms (gating, contraction/regularization, and multi-depth objectives)
206: required for reliable iterative refinement.
207: 6.3 Multi-seed results (paper-ready script)
208: We additionally ran a larger multi-seed experiment on noisy sine regression using three random seeds
209: (42, 123, 999) and reported mean±standard deviation. The full script is included in Appendix D.
210: Depth sweep behavior.In this run, QDMN naive exhibits severe degradation as depth increases
211: (e.g., test MSE grows from≈0.019 at depth 1 to≈5594 at depth 32), while QDMN stable remains
212: comparatively bounded through moderate depths (e.g., best mean test MSE around depth 8) before
213: degrading at very large depths.
214: 6
216: ===== PAGE 7 =====
217: Figure 2: Semantic compositionality demo on noisy sine filtering. A deeper route [F,U,D,B 3,H]
218: can apply multiple refinement steps compared to a short route [F,H].
219: Statistical note.A paired t-test comparing QDMN stable at depth 4 versus the MLP baseline
220: (test MSE across the three seeds) yieldedp≈0.138 in this run; this small experiment is underpow-
221: ered and is included primarily to illustrate the evaluation workflow rather than to claim statistical
222: superiority.
223: 6.4 Semantic compositionality:[F,U,D,B n,H]
224: We include an additional toy experiment that composes multiple semantic directions to perform
225: noise filtering on a noisy sine signal. The model is trained on a specific route [F,U,D,B,H] and then
226: evaluated using different inference-time routes (e.g., a short route [F,H] versus a deeper refinement
227: route [F,U,D,B 3,H]). This experiment is intended as a qualitative demonstration of route-based
228: logic rather than a benchmark.
229: 7 Limitations
230: •QDMN is a compositional framework; performance depends on module choices and training
231: objectives.
232: •Explicit routing requires external logic (heuristics or a controller) and may be brittle without
233: careful design.
234: •Reusing the same refinement module multiple times at test time can be out-of-distribution
235: relative to training; without multi-depth training or a stopping rule, additional steps may
236: degrade performance.
237: •If modules change tensor shapes beyond the last dimension, additional bookkeeping is re-
238: quired.
239: 7
241: ===== PAGE 8 =====
242: 8 Conclusion


---

# M-CLTR

## Lines 55-201

55: 2 Method
56: 2.1 Framework
57: Given an inputx, a base model produces an initial knowledge representation,
58: k0 =K(x), z 0 =E(k 0),
59: whereEmaps knowledge into an initial latent reasoning state.
60: At each iteration, the reasoning layer proposes a candidate update,
61: ˜zt+1 =F(z t, k0),
62: and an evaluator assigns a scalar score,
63: et =V(˜zt+1).
64: A controller then selects one of three actions,
65: at ∈ {continue,overwrite,restart}.
66: The action semantics are:
67: •Continue:z t+1 = ˜zt+1,
68: •Overwrite:z t+1 =P(˜zt+1),
69: •Restart:z t+1 =z 0.
70: Conceptually, continue trusts the current latent trajectory, overwrite applies a corrective projec-
71: tion, and restart abandons the current path and returns to the initial state.
72: 2
74: ===== PAGE 3 =====
75: 2.2 Logged Metrics
76: The framework is designed to expose simple internal measurements rather than token-level traces.
77: The main logged metrics are:
78: •task accuracy,
79: •evaluator score,
80: •score gap between correct and incorrect outcomes,
81: •action frequencies, and
82: •runtime in milliseconds per example.
83: 3 Experimental Setup
84: 3.1 Knowledge Diagnostic
85: The core isolation experiment evaluates four conditions:
86: •normalk 0, hidden recipe,
87: •perfectk 0, hidden recipe,
88: •normalk 0, visible recipe,
89: •perfectk 0, visible recipe.
90: These conditions separate the effect of knowledge quality from the effect of recipe visibility.
91: 3.2 Controller Comparison
92: We compare six controller modes:
93: •continue,
94: •restart,
95: •fixed project overwrite,
96: •adaptive overwrite,
97: •heuristic controller,
98: •oracle controller.
99: The oracle is not a deployable controller; it serves as an upper bound on the usefulness of the action
100: space.
101: 3
103: ===== PAGE 4 =====
104: 3.3 Tasks
105: All experiments use synthetic rule-switching tasks with progressively harder corruption regimes:
106: •clean,
107: •mild corruption,
108: •medium corruption,
109: •strong corruption.
110: These tasks are intentionally simple so that failures can be attributed mainly to knowledge quality
111: and control behavior rather than to broad world knowledge.
112: 4 Results
113: 4.1 Knowledge Isolation
114: Condition Continue Restart Best fixed O/W Heuristic Oracle
115: Normalk 0, hidden recipe0.352 0.329 0.350 0.329 0.373
116: Perfectk 0, hidden recipe1.000 1.000 1.000 1.000 1.000
117: Normalk 0, visible recipe0.344 0.331 0.356 0.330 0.366
118: Perfectk 0, visible recipe1.000 1.000 1.000 1.000 1.000
119: Table 1: Four-condition controller-isolation diagnostic, averaged across seeds and levels.
120: Table 1 gives the first stable result. When the knowledge representation is made effectively
121: perfect, every mode reaches ceiling performance, regardless of whether the recipe is hidden or visible.
122: Those perfect-knowledge conditions are therefore best interpreted as wiring checks: they show that
123: the latent pipeline and control stack can function when the answer signal is ideal, but they do not
124: test controller quality in a meaningful way.
125: Under normal knowledge, visible recipe information changes the results only slightly. The main
126: bottleneck remains knowledge quality rather than recipe access. The oracle still outperforms the
127: heuristic controller in the non-ceiling settings, which shows that the action space contains useful
128: control signal even though the learned controller does not yet exploit it robustly.
129: 4.2 Controller-Only Stress Test
130: Level Continue Restart Project Adaptive Heuristic Oracle
131: Clean0.393 0.257 0.382 0.292 0.264 0.398
132: Mild corruption0.325 0.335 0.310 0.324 0.326 0.367
133: Medium corruption0.398 0.371 0.407 0.367 0.377 0.443
134: Strong corruption0.315 0.312 0.312 0.307 0.326 0.359
135: Table 2: Controller-only stress test on the hardest non-trivial setting: normalk0 with hidden recipe,
136: averaged across seeds.
137: Table 2 isolates the controller under the single most relevant regime for this paper: normalk0
138: with hidden recipe. The oracle again provides the clearest upper bound, while the heuristic controller
139: 4
141: ===== PAGE 5 =====
142: fails to deliver a reliable advantage over continue. Restart is often at least as competitive as overwrite,
143: and overwrite helps only modestly rather than emerging as the dominant recovery operator. This
144: suggests that the control problem is real and measurable, but that the current evaluator-based
145: controller is still too brittle to serve as the main empirical success case.
146: 4.3 Summary by Knowledge Strength
147: αContinue Heuristic Oracle
148: 0.00 0.344 0.333 0.374
149: 0.33 0.498 0.496 0.566
150: 0.66 0.975 0.973 0.986
151: Table 3: Final hidden-recipe diagnostic sweep, averaged across three seeds and all difficulty levels.
152: Table 3 is the clearest final result. Accuracy improves monotonically with knowledge strength. At
153: α = 0.00, the system remains strongly knowledge-limited. Atα = 0.33, the control problem becomes
154: most informative because all methods improve while the oracle gains the most. Byα = 0.66, the
155: task is already close to saturation, so the experiment begins to lose value as a control benchmark.
156: Figure 1: Accuracy versus knowledge strength for the final hidden-recipe sweep. The strongest
157: pattern is monotonic scaling with knowledge quality, while the oracle remains the best controller in
158: the informative non-ceiling regimes.
159: 4.4 Key Observations
160: 1. Knowledge dominates performance.
161: The strongest signal in the paper is the monotonic improvement with knowledge strength. Once
162: knowledge becomes strong, nearly all controller variants perform well.
163: 5
165: ===== PAGE 6 =====
166: 2. Oracle improvements show the action space is real.
167: The oracle controller consistently outperforms heuristic control in the weaker and intermediate
168: knowledge regimes. This demonstrates that continue, overwrite, and restart are meaningful actions
169: rather than arbitrary interventions.
170: 3. The learned controller remains weak.
171: The heuristic controller often overuses restart, is unstable across seeds, and rarely matches oracle
172: performance. In many settings it is only marginally better than continue, or not better at all.
173: 4. Recipe visibility has minimal impact.
174: Differences between hidden and visible recipe settings are small relative to the effect of knowledge
175: strength.
176: 5. Overwrite is secondary .
177: Overwrite provides modest gains in some regimes, but it is not yet more reliable than restart.
178: Restart often acts as the safer recovery move.
179: 4.5 Action Behavior and Speed
180: At low knowledge strength, restart is common. At intermediate knowledge strength, action behavior
181: becomes mixed and the oracle is most informative. At high knowledge strength, the heuristic
182: controller becomes almost pure continue because the task is already nearly solved.
183: The timing results are also consistent: continue is fastest, heuristic control adds moderate
184: overhead, and oracle control is slowest because it evaluates multiple futures. Any future learned
185: controller will therefore need to justify additional compute with substantially larger gains than those
186: observed here.
187: 5 Discussion
188: The results support a narrow but stable conclusion:
189: M-CLTR provides a measurable latent-control layer whose action space carries useful
190: signal, but on these toy tasks performance is dominated by knowledge quality and the
191: current learned controller remains brittle.
192: This reframes the contribution of the work. M-CLTR should not be read as a solved reasoning
193: system, and the present experiments do not show that overwrite is the main repair mechanism or
194: that the learned policy is already strong. Instead, the framework is useful because it makes latent
195: control measurable enough to diagnose where the bottlenecks actually are.
196: 6 Conclusion
197: M-CLTR demonstrates that:
198: •latent reasoning can be controlled and measured,
199: •control actions have real downstream impact,
200: •knowledge quality dominates outcomes on the current tasks, and
201: •learned control remains an open problem.


---
