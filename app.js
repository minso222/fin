const STORE = "fin295-study-state-v1";

const formulas = [
  {
    id: "npv",
    chapter: "Chapter 11",
    source: "Chapter 11 slides 7-12; sample final Q1",
    title: "Net Present Value",
    tex: "NPV = \\sum_{t=0}^{N}\\frac{CF_t}{(1+r)^t}",
    plain: "Measures the dollar value added by a project after discounting every cash flow at the WACC.",
    variables: "CF_t = cash flow in year t; r = WACC or required return; N = final year.",
    when: "Use for capital budgeting project accept/reject decisions.",
    example: "For -$1,000 followed by $480 for 3 years at 15%: NPV = -1000 + 480/1.15 + 480/1.15^2 + 480/1.15^3 = $95.95."
  },
  {
    id: "payback",
    chapter: "Chapter 11",
    source: "Chapter 11 slides 30-33; sample final Q2",
    title: "Payback Period",
    tex: "Payback = Years\\ before\\ recovery + \\frac{Unrecovered\\ cost}{Next\\ cash\\ flow}",
    plain: "Shows how long it takes to recover the original project cost.",
    variables: "Unrecovered cost = remaining initial investment before the recovery year.",
    when: "Use for regular payback questions.",
    example: "After year 1, $850 - $540 = $310 remains. Payback = 1 + 310/540 = 1.57 years."
  },
  {
    id: "irr",
    chapter: "Chapter 11",
    source: "Chapter 11 slides 13-16; sample final Q3",
    title: "Internal Rate of Return",
    tex: "0 = \\sum_{t=0}^{N}\\frac{CF_t}{(1+IRR)^t}",
    plain: "The project return that makes NPV equal zero.",
    variables: "CF_t = project cash flow; IRR = solved discount rate.",
    when: "Use for project return questions; accept independent projects when IRR exceeds WACC.",
    example: "For -925, 395, 385, 375, 365, the rate that sets NPV to zero is 23.70%."
  },
  {
    id: "bond-price",
    chapter: "Chapter 7",
    source: "Chapter 7 slides 13-17 and 29-30; sample final Q6",
    title: "Bond Price",
    tex: "V_B = \\sum_{t=1}^{N}\\frac{INT}{(1+r_d)^t}+\\frac{M}{(1+r_d)^N}",
    plain: "Values a bond as the present value of coupon payments plus par value.",
    variables: "INT = coupon payment; M = par value; r_d = periodic market rate; N = number of periods.",
    when: "Use for coupon bond valuation, including semiannual bonds.",
    example: "A 7.35% semiannual bond pays $36.75 every half-year. Discount 30 payments plus $1,000 at 2.55% per half-year to get $1,233.90."
  },
  {
    id: "ytc",
    chapter: "Chapter 7",
    source: "Chapter 7 slides 31-34; sample final Q5",
    title: "Yield to Call",
    tex: "P_0 = \\sum_{t=1}^{N_c}\\frac{INT}{(1+YTC)^t}+\\frac{Call\\ Price}{(1+YTC)^{N_c}}",
    plain: "The return earned if a callable bond is called on its first call date.",
    variables: "N_c = periods until call; INT = coupon; P_0 = current price.",
    when: "Use for premium callable bonds when a call is likely.",
    example: "For price $1,330, $110 annual coupon, call price $1,130 in 4 years, YTC = 4.77%."
  },
  {
    id: "expected-return",
    chapter: "Chapter 8",
    source: "Chapter 8 slides 4 and 9-12; sample final Q9",
    title: "Expected Return",
    tex: "\\hat r = \\sum p_i r_i",
    plain: "Computes the probability-weighted average return.",
    variables: "p_i = probability of outcome i; r_i = return in outcome i.",
    when: "Use with probability distributions of returns.",
    example: "0.50(34%) + 0.30(9%) + 0.20(-20%) = 15.70%."
  },
  {
    id: "std-dev",
    chapter: "Chapter 8",
    source: "Chapter 8 slides 13-18; sample final Q21",
    title: "Standard Deviation of Returns",
    tex: "\\sigma = \\sqrt{\\sum p_i(r_i-\\hat r)^2}",
    plain: "Measures total stand-alone risk around expected return.",
    variables: "p_i = probability; r_i = outcome return; \\hat r = expected return.",
    when: "Use for stand-alone risk questions with probabilities.",
    example: "For returns 5%, 8%, 12%, 15%, 18% with probabilities .10, .20, .40, .20, .10, σ = 3.66%."
  },
  {
    id: "capm",
    chapter: "Chapters 8 and 10",
    source: "Chapter 8 slides 36-45; Chapter 10 slides 17-20; sample final Q15",
    title: "CAPM / SML",
    tex: "r_s = r_{RF} + (r_M-r_{RF})b",
    plain: "Estimates the required return on equity from market risk.",
    variables: "r_RF = risk-free rate; r_M-r_RF = market risk premium; b = beta.",
    when: "Use for cost of retained earnings or required stock return.",
    example: "5.00% + 8.00%(0.85) = 11.80%."
  },
  {
    id: "constant-growth",
    chapter: "Chapter 9",
    source: "Chapter 9 slides 9-16; Chapter 9_1 notes; sample final Q10-Q12",
    title: "Constant Growth Stock",
    tex: "P_0 = \\frac{D_1}{r_s-g}",
    plain: "Values a stock whose dividends grow forever at a constant rate.",
    variables: "D_1 = next dividend; r_s = required return; g = constant growth rate.",
    when: "Use only when r_s > g and growth is expected to remain constant.",
    example: "$0.65/(10.8% - 8.2%) = $25.00."
  },
  {
    id: "returns-breakout",
    chapter: "Chapter 9",
    source: "Chapter 9 slides 16-17; formula sheet; sample final Q11-Q12",
    title: "Dividend and Capital Gains Yield",
    tex: "Dividend\\ Yield = \\frac{D_1}{P_0},\\quad Capital\\ Gains\\ Yield = g",
    plain: "Breaks a constant-growth stock's total return into income and growth.",
    variables: "D_1 = next dividend; P_0 = current price; g = constant growth rate.",
    when: "Use for expected yield questions under constant growth.",
    example: "$1.90/$20.00 = 9.50%; with constant growth, capital gains yield equals g."
  },
  {
    id: "wacc",
    chapter: "Chapter 10",
    source: "Chapter 10 slides 4-7; Chapter 10 notes; sample final Q16",
    title: "Weighted Average Cost of Capital",
    tex: "WACC = w_d r_d(1-T) + w_p r_p + w_c r_s",
    plain: "Combines the after-tax costs of debt, preferred stock, and common equity.",
    variables: "w = target weights; r = component costs; T = tax rate.",
    when: "Use for capital budgeting discount rates and cost of capital questions.",
    example: "0.60(6.00%) + 0.15(9.00%) + 0.25(11.25%) = 7.76%."
  },
  {
    id: "preferred",
    chapter: "Chapters 9 and 10",
    source: "Chapter 9_3 notes; Chapter 10 slides 13-16",
    title: "Preferred Stock Value / Cost",
    tex: "V_p = \\frac{D}{r_p},\\quad r_p = \\frac{D_p}{P_p}",
    plain: "Treats preferred stock as a perpetuity because its dividend is fixed.",
    variables: "D or D_p = preferred dividend; P_p = preferred stock price.",
    when: "Use for preferred stock valuation or preferred component cost.",
    example: "$10 preferred dividend on a $111.10 price gives r_p = 9.00%."
  },
  {
    id: "tato",
    chapter: "Chapter 4 / Sample Final review",
    source: "Formula sheet; sample final Q17",
    title: "Total Assets Turnover",
    tex: "TATO = \\frac{Sales}{Total\\ Assets}",
    plain: "Measures how many dollars of sales are generated per dollar of assets.",
    variables: "Sales = annual sales; Total Assets = total assets.",
    when: "Use for ratio analysis questions.",
    example: "$23,000/$18,000 = 1.28."
  },
  {
    id: "fv",
    chapter: "Chapter 5 / Sample Final review",
    source: "Formula sheet; sample final Q20",
    title: "Future Value",
    tex: "FV_N = PV(1+I)^N",
    plain: "Compounds a present amount forward for N periods.",
    variables: "PV = starting amount; I = interest rate per period; N = number of periods.",
    when: "Use for lump-sum time value of money questions.",
    example: "$1,900(1.139)^{10} = $6,982.18."
  }
];

const sampleQuestions = [
  // Source: Chapter 11 slides 7-12; sample final Q1.
  { id: "s1", type: "npv", source: "Chapter 11 slides 7-12", formulaIds: ["npv"], prompt: "Anderson Systems is considering a project with WACC 15.00% and cash flows: Year 0 = -$1,000; Years 1-3 = $480 each. What is the project's NPV?", choices: ["$83.43", "$95.95", "$440.00", "$260.34", "$916.82"], answer: 1, solution: "Use \\(NPV=\\sum CF_t/(1+r)^t\\). Calculation: \\(-1000 + 480/1.15 + 480/1.15^2 + 480/1.15^3 = 95.95\\). The NPV is positive, so the project adds value under the Chapter 11 NPV rule." },
  // Source: Chapter 11 slides 30-33; sample final Q2.
  { id: "s2", type: "payback", source: "Chapter 11 slides 30-33", formulaIds: ["payback"], prompt: "Taggart Inc. has cash flows: Year 0 = -$850; Years 1-3 = $540 each. What is the project's payback?", choices: ["1.91 years", "1.43 years", "1.29 years", "1.57 years", "2.29 years"], answer: 3, solution: "After year 1, unrecovered cost is \\(850-540=310\\). Payback is \\(1+310/540=1.57\\) years. This follows the Chapter 11 method of adding inflows until the cost is recovered." },
  // Source: Chapter 11 slides 13-16; sample final Q3.
  { id: "s3", type: "irr", source: "Chapter 11 slides 13-16", formulaIds: ["irr"], prompt: "Simkins Renovations has cash flows: Year 0 = -$925; Year 1 = $395; Year 2 = $385; Year 3 = $375; Year 4 = $365. What is the project's IRR?", choices: ["16.08%", "64.32%", "13.22%", "23.70%", "50.24%"], answer: 3, solution: "IRR solves \\(0=-925+395/(1+r)+385/(1+r)^2+375/(1+r)^3+365/(1+r)^4\\). Solving gives \\(r=23.70\\%\\), the project return described in Chapter 11." },
  // Source: Chapter 7 slides 31-34; sample final Q4.
  { id: "s4", type: "concept", source: "Chapter 7 slides 31-34", formulaIds: ["ytc"], prompt: "Which event would make it more likely that a company would call its outstanding callable bonds?", choices: ["Market interest rates rise sharply.", "The company's bonds are downgraded.", "Inflation increases significantly.", "The company's financial situation deteriorates significantly.", "Market interest rates decline sharply."], answer: 4, solution: "Chapter 7 says issuers can refund callable bonds if rates decline. Lower market rates let the firm replace high-coupon debt with cheaper new debt, so a sharp decline makes a call more likely." },
  // Source: Chapter 7 slides 31-34; sample final Q5.
  { id: "s5", type: "ytc", source: "Chapter 7 slides 31-34", formulaIds: ["ytc"], prompt: "Sadik Inc.'s bonds sell for $1,330, par is $1,000, annual coupon is $110, maturity is 10 years, and they can be called in 4 years at $1,130. What is the YTC?", choices: ["7.19%", "4.77%", "6.43%", "5.23%", "8.27%"], answer: 1, solution: "Use the call date cash flows: \\(1330=110/(1+r)+110/(1+r)^2+110/(1+r)^3+1240/(1+r)^4\\). Solving gives \\(r=4.77\\%\\). Since this is a premium callable bond, Chapter 7 points to YTC as the likely yield." },
  // Source: Chapter 7 slides 13-17 and 29-30; sample final Q6.
  { id: "s6", type: "bond", source: "Chapter 7 slides 13-17, 29-30", formulaIds: ["bond-price"], prompt: "Moerdyk Corporation's bonds have 15-year maturity, 7.35% semiannual coupon, $1,000 par, and rd = 5.10% with semiannual compounding. What is the bond price?", choices: ["$1,253.39", "$1,231.97", "$1,138.78", "$1,270.62", "$1,233.90"], answer: 4, solution: "Semiannual setup: \\(N=30\\), \\(I=5.10\\%/2=2.55\\%\\), \\(PMT=1000(7.35\\%)/2=36.75\\), \\(FV=1000\\). Present value of coupons plus par equals $1,233.90." },
  // Source: Chapter 8 slides 18 and 35-38; sample final Q7.
  { id: "s7", type: "concept", source: "Chapter 8 slides 18, 35-38", formulaIds: ["std-dev"], prompt: "Which is the best measure of risk for a single asset held in isolation, and which is best for an asset held in a diversified portfolio?", choices: ["Beta; beta.", "Beta; variance.", "Variance; correlation coefficient.", "Coefficient of variation; beta.", "Standard deviation; correlation coefficient."], answer: 3, solution: "For stand-alone comparisons, Chapter 8 uses dispersion measures such as coefficient of variation for risk per unit of return. For diversified portfolios, relevant risk is market risk, measured by beta." },
  // Source: Chapter 8 slides 35-38; sample final Q8.
  { id: "s8", type: "concept", source: "Chapter 8 slides 35-38", formulaIds: ["capm"], prompt: "Inflation, recession, and high interest rates are best characterized as:", choices: ["Systematic risk factors that can be diversified away.", "Among the factors responsible for market risk.", "Risks beyond investor control and therefore ignored.", "Relevant only to governmental authorities.", "Company-specific risk factors that can be diversified away."], answer: 1, solution: "Chapter 8 separates diversifiable risk from market risk. Economy-wide forces such as inflation, recession, and interest rates affect many firms and are part of market risk." },
  // Source: Chapter 8 slides 4 and 9-12; sample final Q9.
  { id: "s9", type: "expected-return", source: "Chapter 8 slides 4, 9-12", formulaIds: ["expected-return"], prompt: "Taggart Inc.'s stock has a 50% chance of 34%, a 30% chance of 9%, and a 20% chance of -20%. What is the expected return?", choices: ["18.30%", "23.00%", "21.00%", "19.70%", "15.70%"], answer: 4, solution: "\\(\\hat r=0.50(34\\%)+0.30(9\\%)+0.20(-20\\%)=15.70\\%\\). This is the probability-weighted return from Chapter 8." },
  // Source: Chapter 9 slides 9-16; sample final Q10.
  { id: "s10", type: "stock", source: "Chapter 9 slides 9-16", formulaIds: ["constant-growth"], prompt: "A stock will pay D1 = $0.65. Required return is 10.8%, and constant growth is 8.2%. What is the current price?", choices: ["$27.05", "$27.70", "$25.00", "$6.02", "$7.93"], answer: 2, solution: "Use the constant growth model: \\(P_0=D_1/(r_s-g)=0.65/(0.108-0.082)=25.00\\). Chapter 9 notes require \\(r_s>g\\), which holds here." },
  // Source: Chapter 9 slide 16; sample final Q11.
  { id: "s11", type: "yield", source: "Chapter 9 slide 16", formulaIds: ["returns-breakout"], prompt: "If D1 = $1.90, constant g = 4.7%, and P0 = $20.00, what is the expected dividend yield?", choices: ["9.95%", "9.50%", "10.50%", "9.07%", "8.68%"], answer: 1, solution: "Dividend yield is \\(D_1/P_0=1.90/20.00=9.50\\%\\). Growth affects total return, but this question asks only dividend yield." },
  // Source: Chapter 9 slide 16; sample final Q12.
  { id: "s12", type: "yield", source: "Chapter 9 slide 16", formulaIds: ["returns-breakout"], prompt: "If D1 = $1.50, constant g = 5.1%, and P0 = $57, what is the stock's expected capital gains yield?", choices: ["2.47%", "2.63%", "5.10%", "2.77%", "7.73%"], answer: 2, solution: "Under the constant growth model, Chapter 9 states that capital gains yield equals \\(g\\). Therefore the expected capital gains yield is 5.10%." },
  // Source: Chapter 10 slides 3-5; sample final Q13.
  { id: "s13", type: "concept", source: "Chapter 10 slides 3-5", formulaIds: ["wacc"], prompt: "Which is NOT a capital component when calculating WACC for capital budgeting?", choices: ["Long-term debt.", "Accounts payable.", "Retained earnings.", "Common stock.", "Preferred stock."], answer: 1, solution: "Chapter 10 capital components are debt, preferred stock, and common equity. Accounts payable is an operating liability, not an investor-supplied capital component for WACC." },
  // Source: Chapter 8 slides 37-45; sample final Q14.
  { id: "s14", type: "concept", source: "Chapter 8 slides 37-45", formulaIds: ["capm"], prompt: "When working with CAPM, which factor can be determined with the most precision?", choices: ["The beta coefficient of the market, which is the same as an average stock.", "The most appropriate risk-free rate.", "The market risk premium.", "The beta of a relatively safe stock.", "The expected return on the market."], answer: 0, solution: "Chapter 8 defines the market beta as 1.0. Other CAPM inputs require estimation, so the market beta is the most precise." },
  // Source: Chapter 10 slides 17-20; sample final Q15.
  { id: "s15", type: "capm", source: "Chapter 10 slides 17-20", formulaIds: ["capm"], prompt: "O'Brien Inc. has rRF = 5.00%, RPM = 8.00%, and b = 0.85. What is the cost of equity from retained earnings using CAPM?", choices: ["13.00%", "11.05%", "12.25%", "11.80%", "13.85%"], answer: 3, solution: "\\(r_s=r_{RF}+RPM(b)=5.00\\%+8.00\\%(0.85)=11.80\\%\\). This is the Chapter 10 CAPM approach to retained earnings." },
  // Source: Chapter 10 slides 4-7; sample final Q16.
  { id: "s16", type: "wacc", source: "Chapter 10 slides 4-7", formulaIds: ["wacc"], prompt: "Giambono's target capital structure is 60% debt, 15% preferred, 25% common. Costs are 6.00% after-tax debt, 9.00% preferred, and 11.25% retained earnings. What is WACC?", choices: ["4.16%", "4.95%", "7.76%", "6.41%", "8.75%"], answer: 2, solution: "\\(WACC=0.60(6.00\\%)+0.15(9.00\\%)+0.25(11.25\\%)=7.76\\%\\). Debt is already after tax, matching the prompt." },
  // Source: formula sheet; sample final Q17.
  { id: "s17", type: "ratio", source: "Formula sheet Chapter 4", formulaIds: ["tato"], prompt: "Ryngard Corp's sales were $23,000 and total assets were $18,000. What was TATO?", choices: ["0.64", "0.44", "0.56", "0.78", "1.28"], answer: 4, solution: "\\(TATO=Sales/Total\\ Assets=23000/18000=1.28\\). The formula appears on the final formula sheet." },
  // Source: sample final scope; corporate form review.
  { id: "s18", type: "tf", source: "Sample final corporate organization review", formulaIds: [], prompt: "One advantage of the corporate form of organization is that it avoids double taxation.", choices: ["True", "False"], answer: 1, solution: "False. The sample final tests that corporations do not avoid double taxation; corporate income and shareholder distributions can both be taxed." },
  // Source: formula sheet Chapter 3; sample final Q19.
  { id: "s19", type: "tf", source: "Formula sheet Chapter 3 FCF/CFO review", formulaIds: [], prompt: "To estimate cash flow from operations, depreciation must be added back to net income because depreciation is a non-cash charge deducted in net income.", choices: ["True", "False"], answer: 0, solution: "True. Depreciation reduces accounting income but is not a cash outflow, so it is added back in cash-flow calculations." },
  // Source: formula sheet Chapter 5; sample final Q20.
  { id: "s20", type: "fv", source: "Formula sheet Chapter 5", formulaIds: ["fv"], prompt: "You have $1,900 and buy a 10-year CD paying 13.9% compounded annually. How much will you have at maturity?", choices: ["$6,130.09", "$8,486.37", "$2,164.10", "$7,283.99", "$6,982.18"], answer: 4, solution: "Use \\(FV=PV(1+I)^N\\): \\(1900(1.139)^{10}=6982.18\\). This is the Chapter 5 future value formula from the formula sheet." },
  // Source: Chapter 8 slides 13-18; sample final Q21.
  { id: "s21", type: "std-dev", source: "Chapter 8 slides 13-18", formulaIds: ["expected-return", "std-dev"], prompt: "A portfolio has returns 5%, 8%, 12%, 15%, 18% with probabilities 0.10, 0.20, 0.40, 0.20, 0.10. What is the standard deviation?", choices: ["2.97%", "3.66%", "4.12%", "5.60%"], answer: 1, solution: "Expected return is \\(11.8\\%\\). Variance is \\(.10(5-11.8)^2+.20(8-11.8)^2+.40(12-11.8)^2+.20(15-11.8)^2+.10(18-11.8)^2=13.40\\). \\(\\sigma=\\sqrt{13.40}=3.66\\%\\)." },
  // Source: Chapter 9 slide 4; sample final Q22.
  { id: "s22", type: "concept", source: "Chapter 9 slide 4", formulaIds: [], prompt: "A startup has Class A shares with 1/10 vote and full dividends, and Class B shares with 10 votes and limited dividends. Why choose this classified stock structure?", choices: ["To give outside investors more voting power while founders focus on dividends.", "To let founders and early executives maintain control through superior voting rights while new investors receive full dividends.", "To guarantee equal dividends and voting rights for all classes.", "To reduce cost of capital by eliminating voting rights for all shareholders."], answer: 1, solution: "Chapter 9 explains that classified stock often separates voting and dividend rights. Founders' shares commonly preserve control through stronger voting rights, while IPO/new shares may carry full dividend rights." }
];

const state = {
  route: "home",
  dark: false,
  sample: { index: 0, attempts: {}, solved: {} },
  generated: null,
  generatedRun: { index: 0, attempts: {}, solved: {} },
  timer: { work: 25, break: 5 },
  flashIndex: 0,
  flashBack: false,
  calc: { display: "0", expr: "", tvm: { N: null, IY: null, PV: null, PMT: null, FV: null } }
};

let activeTimer = null;
let timerRemaining = 25 * 60;
let timerMode = "work";
let timerRunning = false;

function loadState() {
  const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
  Object.assign(state, saved);
  document.body.classList.toggle("dark", !!state.dark);
}

function saveState() {
  localStorage.setItem(STORE, JSON.stringify({
    dark: state.dark,
    sample: state.sample,
    generated: state.generated,
    generatedRun: state.generatedRun,
    timer: state.timer,
    flashIndex: state.flashIndex
  }));
}

const money = n => `$${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = n => `${Number(n).toFixed(2)}%`;
const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(v => v[1]);

function npv(rate, cfs) {
  return cfs.reduce((sum, cf, i) => sum + cf / Math.pow(1 + rate, i), 0);
}

function irr(cfs) {
  let lo = -0.99, hi = 1;
  for (let i = 0; i < 120; i++) {
    const mid = (lo + hi) / 2;
    if (npv(mid, cfs) > 0) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

function pvAnnuity(rate, n, pmt, fv = 0) {
  if (Math.abs(rate) < 1e-9) return pmt * n + fv;
  return pmt * (1 - Math.pow(1 + rate, -n)) / rate + fv / Math.pow(1 + rate, n);
}

function choiceSet(correct, formatter, spreads = [-0.18, -0.09, 0.12, 0.22]) {
  const values = [correct, ...spreads.map(s => correct * (1 + s))];
  const labels = [...new Set(values.map(formatter))];
  while (labels.length < 5) labels.push(formatter(correct + labels.length * 1.17));
  const shuffled = shuffle(labels);
  return { choices: shuffled, answer: shuffled.indexOf(formatter(correct)) };
}

function makeQ(id, type, source, formulaIds, prompt, correct, formatter, solution, spreads) {
  const made = choiceSet(correct, formatter, spreads);
  return { id, type, source, formulaIds, prompt, choices: made.choices, answer: made.answer, solution };
}

function generateTest() {
  const invest = 800 + Math.round(Math.random() * 6) * 50;
  const cf = 360 + Math.round(Math.random() * 5) * 30;
  const wacc = 0.10 + Math.random() * 0.07;
  const q1npv = npv(wacc, [-invest, cf, cf, cf]);
  const q1 = makeQ("g1", "npv", "Chapter 11 slides 7-12", ["npv"], `A project requires ${money(invest)} today and returns ${money(cf)} each year for 3 years. If WACC is ${pct(wacc * 100)}, what is NPV?`, q1npv, money, `\\(NPV=-${invest}+${cf}/(1+${wacc.toFixed(3)})+${cf}/(1+${wacc.toFixed(3)})^2+${cf}/(1+${wacc.toFixed(3)})^3=${money(q1npv)}\\). Positive NPV means value is added.`);

  const cost = 750 + Math.round(Math.random() * 6) * 50;
  const inflow = 420 + Math.round(Math.random() * 5) * 30;
  const pb = 1 + (cost - inflow) / inflow;
  const q2 = makeQ("g2", "payback", "Chapter 11 slides 30-33", ["payback"], `A project costs ${money(cost)} and pays ${money(inflow)} per year. What is the payback period?`, pb, n => `${n.toFixed(2)} years`, `After year 1, ${money(cost - inflow)} remains. Payback \\(=1+${cost - inflow}/${inflow}=${pb.toFixed(2)}\\) years.`);

  const cfs = [-900, 380, 370, 360, 350];
  const q3irr = irr(cfs) * 100;
  const q3 = makeQ("g3", "irr", "Chapter 11 slides 13-16", ["irr"], `A project has cash flows ${cfs.map((v, i) => `Year ${i}: ${money(v)}`).join("; ")}. What is the IRR?`, q3irr, pct, `Solve \\(0=\\sum CF_t/(1+IRR)^t\\). The IRR is ${pct(q3irr)}, the rate that makes NPV equal zero.`);

  const price = 1260, coupon = 105, callPrice = 1105, callYears = 4;
  const ytc = irr([-price, coupon, coupon, coupon, coupon + callPrice]) * 100;
  const q5 = makeQ("g5", "ytc", "Chapter 7 slides 31-34", ["ytc"], `A premium callable bond sells for ${money(price)}, pays a ${money(coupon)} annual coupon, and can be called in ${callYears} years at ${money(callPrice)}. What is its YTC?`, ytc, pct, `Use call-date cash flows. \\(${price}=\\sum ${coupon}/(1+r)^t+${callPrice}/(1+r)^4\\). Solving gives ${pct(ytc)}.`);

  const bondRate = 0.062, market = 0.048, years = 12, semiPmt = 1000 * bondRate / 2;
  const q6price = pvAnnuity(market / 2, years * 2, semiPmt, 1000);
  const q6 = makeQ("g6", "bond", "Chapter 7 slides 13-17, 29-30", ["bond-price"], `A ${years}-year bond has a ${pct(bondRate * 100)} semiannual coupon, $1,000 par, and rd = ${pct(market * 100)} with semiannual compounding. What is its price?`, q6price, money, `Semiannual inputs: \\(N=${years * 2}\\), \\(I/Y=${pct(market * 50)}\\), \\(PMT=${money(semiPmt)}\\), \\(FV=1000\\). Price = ${money(q6price)}.`);

  const pReturns = [[0.4, 30], [0.35, 12], [0.25, -8]];
  const er = pReturns.reduce((s, [p, r]) => s + p * r, 0);
  const q9 = makeQ("g9", "expected-return", "Chapter 8 slides 4, 9-12", ["expected-return"], `A stock has a 40% chance of 30%, 35% chance of 12%, and 25% chance of -8%. What is expected return?`, er, pct, `\\(0.40(30\\%)+0.35(12\\%)+0.25(-8\\%)=${pct(er)}\\).`);

  const d1 = 0.84, rs = 0.115, g = 0.075, stockPrice = d1 / (rs - g);
  const q10 = makeQ("g10", "stock", "Chapter 9 slides 9-16", ["constant-growth"], `A stock will pay D1 = ${money(d1)}. Required return is ${pct(rs * 100)} and constant growth is ${pct(g * 100)}. What is P0?`, stockPrice, money, `\\(P_0=${d1}/(${rs}-${g})=${money(stockPrice)}\\).`);

  const dy = 2.1 / 28 * 100;
  const q11 = makeQ("g11", "yield", "Chapter 9 slide 16", ["returns-breakout"], `If D1 = $2.10, g = 4.3%, and P0 = $28.00, what is dividend yield?`, dy, pct, `Dividend yield \\(=D_1/P_0=2.10/28.00=${pct(dy)}\\).`);

  const q12 = makeQ("g12", "yield", "Chapter 9 slide 16", ["returns-breakout"], `If constant growth is 6.20%, what is the expected capital gains yield?`, 6.2, pct, `In the constant growth model, capital gains yield equals \\(g\\), so it is 6.20%.`);

  const capm = 4.2 + 7.5 * 1.1;
  const q15 = makeQ("g15", "capm", "Chapter 10 slides 17-20", ["capm"], `Using CAPM, rRF = 4.20%, RPM = 7.50%, and beta = 1.10. What is rs?`, capm, pct, `\\(r_s=4.20\\%+7.50\\%(1.10)=${pct(capm)}\\).`);

  const wacc = 0.35 * 5.4 + 0.1 * 8.2 + 0.55 * 10.8;
  const q16 = makeQ("g16", "wacc", "Chapter 10 slides 4-7", ["wacc"], `A firm uses 35% after-tax debt at 5.40%, 10% preferred at 8.20%, and 55% equity at 10.80%. What is WACC?`, wacc, pct, `\\(WACC=.35(5.40\\%)+.10(8.20\\%)+.55(10.80\\%)=${pct(wacc)}\\).`);

  const tato = 31500 / 24500;
  const q17 = makeQ("g17", "ratio", "Formula sheet Chapter 4", ["tato"], `Sales are $31,500 and total assets are $24,500. What is TATO?`, tato, n => n.toFixed(2), `\\(TATO=31500/24500=${tato.toFixed(2)}\\).`);

  const fv = 1600 * Math.pow(1.118, 9);
  const q20 = makeQ("g20", "fv", "Formula sheet Chapter 5", ["fv"], `You invest $1,600 for 9 years at 11.8% compounded annually. What is the future value?`, fv, money, `\\(FV=1600(1.118)^9=${money(fv)}\\).`);

  const returns = [4, 9, 13, 16, 20], probs = [.1, .2, .4, .2, .1];
  const mean = returns.reduce((s, r, i) => s + r * probs[i], 0);
  const sd = Math.sqrt(returns.reduce((s, r, i) => s + probs[i] * Math.pow(r - mean, 2), 0));
  const q21 = makeQ("g21", "std-dev", "Chapter 8 slides 13-18", ["expected-return", "std-dev"], `Returns are 4%, 9%, 13%, 16%, 20% with probabilities .10, .20, .40, .20, .10. What is standard deviation?`, sd, pct, `Mean return is ${pct(mean)}. \\(\\sigma=\\sqrt{\\sum p_i(r_i-\\hat r)^2}=${pct(sd)}\\).`);

  const fixed = [
    { ...sampleQuestions[3], id: "g4" }, { ...sampleQuestions[6], id: "g7" }, { ...sampleQuestions[7], id: "g8" },
    { ...sampleQuestions[12], id: "g13" }, { ...sampleQuestions[13], id: "g14" }, { ...sampleQuestions[17], id: "g18" },
    { ...sampleQuestions[18], id: "g19" }, { ...sampleQuestions[21], id: "g22" }
  ];
  return [q1, q2, q3, fixed[0], q5, q6, fixed[1], fixed[2], q9, q10, q11, q12, fixed[3], fixed[4], q15, q16, q17, fixed[5], fixed[6], q20, q21, fixed[7]];
}

function routeTo(route) {
  state.route = route;
  document.querySelectorAll(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.route === route));
  render();
}

function formulaLinks(ids) {
  if (!ids || !ids.length) return "";
  return `<p><strong>Formula link:</strong> ${ids.map(id => {
    const f = formulas.find(x => x.id === id);
    return `<button class="small-button" onclick="routeTo('formulas'); setTimeout(()=>document.getElementById('formula-${id}')?.scrollIntoView({behavior:'smooth'}), 40)">${f?.title || id}</button>`;
  }).join(" ")}</p>`;
}

function renderQuiz(kind) {
  const questions = kind === "sample" ? sampleQuestions : state.generated;
  const run = kind === "sample" ? state.sample : state.generatedRun;
  if (!questions) {
    return `<section class="panel stack"><h2 class="page-title">Generate New Test</h2><p class="muted">Create a fresh exam mirrored from the original sample final.</p><button class="primary" onclick="startGenerated()">Generate test</button></section>`;
  }
  const q = questions[run.index];
  const attempts = run.attempts[q.id] || 0;
  const solved = run.solved[q.id] === true;
  const correctCount = questions.filter(item => run.solved[item.id]).length;
  return `
    <section class="stack">
      <div class="question-meta">
        <span class="badge">${kind === "sample" ? "Original Sample Final" : "Generated Practice"} · Question ${run.index + 1} of ${questions.length}</span>
        <span>Score ${correctCount}/${questions.length} · Attempts on this question ${attempts}</span>
      </div>
      <article class="question-panel">
        <div class="question-meta"><span>${q.source}</span><span>${q.type}</span></div>
        <p class="question-text">${q.prompt}</p>
        <div class="choices" role="group" aria-label="Answer choices">
          ${q.choices.map((choice, i) => `<button class="choice ${solved && i === q.answer ? "correct" : ""}" onclick="chooseAnswer('${kind}', ${i})">${String.fromCharCode(97 + i)}. ${choice}</button>`).join("")}
        </div>
        ${solved ? `<div class="solution"><h3>Worked Solution</h3>${formulaLinks(q.formulaIds)}<p>${q.solution}</p><p class="muted">Source tag: ${q.source}</p></div>` : `<p class="muted">Incorrect attempts stay open. Keep working until the correct answer clicks into place.</p>`}
      </article>
      <div class="action-row">
        <button class="secondary" onclick="moveQuestion('${kind}', -1)">Back</button>
        <button class="primary" onclick="moveQuestion('${kind}', 1)">Next</button>
        <button class="secondary" onclick="resetQuiz('${kind}')">Reset this test</button>
      </div>
    </section>`;
}

function chooseAnswer(kind, index) {
  const questions = kind === "sample" ? sampleQuestions : state.generated;
  const run = kind === "sample" ? state.sample : state.generatedRun;
  const q = questions[run.index];
  run.attempts[q.id] = (run.attempts[q.id] || 0) + 1;
  if (index === q.answer) {
    run.solved[q.id] = true;
  } else {
    setTimeout(() => {
      const buttons = [...document.querySelectorAll(".choice")];
      buttons[index]?.classList.add("wrong");
    }, 0);
  }
  saveState();
  render();
}

function moveQuestion(kind, delta) {
  const questions = kind === "sample" ? sampleQuestions : state.generated;
  const run = kind === "sample" ? state.sample : state.generatedRun;
  run.index = Math.max(0, Math.min(questions.length - 1, run.index + delta));
  saveState();
  render();
}

function resetQuiz(kind) {
  if (kind === "sample") state.sample = { index: 0, attempts: {}, solved: {} };
  else state.generatedRun = { index: 0, attempts: {}, solved: {} };
  saveState();
  render();
}

function startGenerated() {
  state.generated = generateTest();
  state.generatedRun = { index: 0, attempts: {}, solved: {} };
  saveState();
  routeTo("generate");
}

function renderHome() {
  const sampleDone = sampleQuestions.filter(q => state.sample.solved[q.id]).length;
  const genDone = state.generated ? state.generated.filter(q => state.generatedRun.solved[q.id]).length : 0;
  return `
    <section class="hero">
      <div class="panel">
        <h2>Practice the final like it talks back.</h2>
        <p class="muted">This site turns the FIN 295 Chapters 7-11 materials, formula sheet, and sample final into an interactive study system. Choose an answer, keep trying if it is wrong, and unlock the worked solution only when you land on the correct choice.</p>
        <div class="action-row">
          <button class="primary" onclick="routeTo('sample')">Start sample test</button>
          <button class="secondary" onclick="startGenerated()">Generate practice test</button>
        </div>
      </div>
      <div class="panel stack">
        <div class="stat"><strong>Sample progress</strong><br>${sampleDone}/${sampleQuestions.length} solved</div>
        <div class="stat"><strong>Generated progress</strong><br>${genDone}/${state.generated?.length || 22} solved</div>
        <div class="stat"><strong>Scope</strong><br>Bond valuation, risk/return, stock valuation, cost of capital, capital budgeting, and selected formula-sheet review.</div>
      </div>
    </section>
    <section class="grid" style="margin-top:1rem">
      <div class="panel"><h3>How to Use</h3><p>Work the original sample final first. Use the formula sheet when a solution cites a formula. Then generate a new test to practice the same structure with fresh numbers.</p></div>
      <div class="panel"><h3>Study Flow</h3><p>Use Study Tools for BAII Plus-style TVM practice, timed Pomodoro blocks, flashcards, and per-chapter practice filters.</p></div>
      <div class="panel"><h3>Source Discipline</h3><p>Each question carries a chapter/slide/note source tag in the data and on screen. Generated questions mirror the original sample final and stay inside the supplied materials.</p></div>
    </section>`;
}

function renderFormulas() {
  return `
    <section class="stack">
      <div>
        <h2 class="page-title">Formula Sheet</h2>
        <p class="muted">Clean formulas, plain-English meanings, variables, use cases, and examples tied to your source materials.</p>
      </div>
      <div class="grid">
        ${formulas.map(f => `
          <article id="formula-${f.id}" class="formula-card">
            <span class="badge">${f.chapter}</span>
            <h3>${f.title}</h3>
            <div class="formula">\\(${f.tex}\\)</div>
            <p>${f.plain}</p>
            <p><strong>Variables:</strong> ${f.variables}</p>
            <p><strong>When to use:</strong> ${f.when}</p>
            <p><strong>Worked example:</strong> ${f.example}</p>
            <p class="muted">${f.source}</p>
          </article>`).join("")}
      </div>
    </section>`;
}

const flashcards = [
  ["Callable bond", "Issuer can refund/call the bond when rates decline; investors often expect YTC on premium callable bonds. Source: Ch 7 slides 31-34."],
  ["Standard deviation", "Total stand-alone risk; larger σ means returns are less likely to be close to expected return. Source: Ch 8 slides 13-18."],
  ["Beta", "Market risk relative to the average stock; relevant for diversified investors. Source: Ch 8 slides 35-38."],
  ["Constant growth model", "Use \\(P_0=D_1/(r_s-g)\\) only when \\(r_s>g\\) and growth is constant forever. Source: Ch 9 slides 9-16."],
  ["WACC", "Weighted average of after-tax debt, preferred, and common equity costs. Source: Ch 10 slides 4-7."],
  ["NPV", "Present value of project inflows and outflows; accept independent projects with NPV > 0. Source: Ch 11 slides 7-12."]
];

function renderTools() {
  const f = flashcards[state.flashIndex % flashcards.length];
  const byChapter = ["Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11"].map(ch => {
    const count = sampleQuestions.filter(q => q.source.includes(ch)).length;
    const solved = sampleQuestions.filter(q => q.source.includes(ch) && state.sample.solved[q.id]).length;
    return `<div class="stat"><strong>${ch}</strong><br>${solved}/${count} sample questions solved</div>`;
  }).join("");
  return `
    <section class="stack">
      <h2 class="page-title">Study Tools</h2>
      <div class="tools-grid">
        <article class="tool-panel">
          <h3>BAII Plus TVM Calculator</h3>
          <div class="tvm-values" id="tvmValues"></div>
          <div id="calcDisplay" class="calc-display" aria-live="polite">0</div>
          <div class="calc-grid" aria-label="Calculator buttons">
            ${["N","I/Y","PV","PMT","FV","CPT","CE/C","2nd CLR TVM","+/-","÷","7","8","9","×","-","4","5","6","+","=","1","2","3","0","."].map(k => `<button class="${["N","I/Y","PV","PMT","FV","CPT"].includes(k) ? "accent" : ""}" onclick="calcPress('${k.replace("'", "\\'")}')">${k}</button>`).join("")}
          </div>
          <p class="muted">Enter a number, press a TVM key to store it, then press CPT and the missing TVM key. Use negative PV for investments/outflows.</p>
        </article>
        <article class="tool-panel">
          <h3>Pomodoro Timer</h3>
          <div id="timerFace" class="timer-face">25:00</div>
          <div class="field-row">
            <label>Work minutes<input id="workLen" type="number" min="1" max="120" value="${state.timer.work}" onchange="setTimerPref('work', this.value)"></label>
            <label>Break minutes<input id="breakLen" type="number" min="1" max="60" value="${state.timer.break}" onchange="setTimerPref('break', this.value)"></label>
          </div>
          <div class="action-row" style="margin-top:.8rem">
            <button class="primary" onclick="toggleTimer()">Start/Pause</button>
            <button class="secondary" onclick="resetTimer()">Reset</button>
          </div>
          <p id="timerCue" class="muted" aria-live="polite">Ready for a focused study interval.</p>
        </article>
      </div>
      <div class="grid">
        <article class="tool-panel">
          <h3>Flashcards</h3>
          <button class="flashcard" onclick="flipFlash()">${state.flashBack ? f[1] : f[0]}</button>
          <div class="action-row" style="margin-top:.8rem"><button class="secondary" onclick="nextFlash()">Next card</button></div>
        </article>
        <article class="tool-panel">
          <h3>Progress Dashboard</h3>
          <div class="grid">${byChapter}</div>
        </article>
      </div>
    </section>`;
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = {
    home: renderHome,
    sample: () => renderQuiz("sample"),
    generate: () => renderQuiz("generated"),
    formulas: renderFormulas,
    tools: renderTools
  }[state.route]();
  if (state.route === "tools") {
    syncCalc();
    syncTimer();
  }
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise([app]);
}

function calcPress(key) {
  const c = state.calc;
  const num = Number(c.display);
  if (["N", "I/Y", "PV", "PMT", "FV"].includes(key)) {
    if (c.pendingCpt) computeTVM(key);
    else c.tvm[key.replace("/", "")] = num;
    c.display = "0";
    c.expr = "";
  } else if (key === "CPT") {
    c.pendingCpt = true;
  } else if (key === "CE/C") {
    c.display = "0"; c.expr = ""; c.pendingCpt = false;
  } else if (key === "2nd CLR TVM") {
    c.tvm = { N: null, IY: null, PV: null, PMT: null, FV: null };
  } else if (key === "+/-") {
    c.display = String(-Number(c.display || 0));
  } else if (key === "=") {
    try {
      const safe = c.expr.replaceAll("×", "*").replaceAll("÷", "/").replace(/[^0-9+\-*/.()]/g, "");
      c.display = String(Function(`return (${safe})`)());
      c.expr = c.display;
    } catch { c.display = "Error"; c.expr = ""; }
  } else if ("0123456789.".includes(key)) {
    c.display = c.display === "0" || c.display === "Error" ? key : c.display + key;
    c.expr += key;
  } else {
    c.expr += key;
    c.display = c.expr;
  }
  saveState();
  syncCalc();
}

function computeTVM(target) {
  const t = state.calc.tvm;
  const key = target.replace("/", "");
  const N = Number(t.N), I = Number(t.IY) / 100, PV = Number(t.PV), PMT = Number(t.PMT), FV = Number(t.FV);
  let result = 0;
  if (key === "PV") result = -pvAnnuity(I, N, PMT, FV);
  if (key === "FV") result = -(PV * Math.pow(1 + I, N) + PMT * ((Math.pow(1 + I, N) - 1) / I));
  if (key === "PMT") result = -(PV + FV / Math.pow(1 + I, N)) * I / (1 - Math.pow(1 + I, -N));
  if (key === "N") result = Math.log((-FV * I + PMT) / (PV * I + PMT)) / Math.log(1 + I);
  if (key === "IY") {
    const cfs = [PV, ...Array(Math.round(N)).fill(PMT)];
    cfs[cfs.length - 1] += FV;
    result = irr(cfs) * 100;
  }
  t[key] = result;
  state.calc.display = Number.isFinite(result) ? String(Number(result.toFixed(6))) : "Error";
  state.calc.pendingCpt = false;
}

function syncCalc() {
  const display = document.getElementById("calcDisplay");
  const values = document.getElementById("tvmValues");
  if (!display || !values) return;
  display.textContent = state.calc.display;
  values.innerHTML = Object.entries(state.calc.tvm).map(([k, v]) => `<span>${k}: ${v === null ? "—" : Number(v).toFixed(4)}</span>`).join("");
}

function setTimerPref(kind, value) {
  state.timer[kind] = Math.max(1, Number(value));
  saveState();
  resetTimer();
}

function syncTimer() {
  const face = document.getElementById("timerFace");
  if (!face) return;
  const m = Math.floor(timerRemaining / 60).toString().padStart(2, "0");
  const s = Math.floor(timerRemaining % 60).toString().padStart(2, "0");
  face.textContent = `${m}:${s}`;
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(activeTimer);
    timerRunning = false;
    return;
  }
  timerRunning = true;
  activeTimer = setInterval(() => {
    timerRemaining -= 1;
    if (timerRemaining <= 0) {
      timerMode = timerMode === "work" ? "break" : "work";
      timerRemaining = (timerMode === "work" ? state.timer.work : state.timer.break) * 60;
      const cue = document.getElementById("timerCue");
      if (cue) cue.textContent = timerMode === "work" ? "Break complete. Back to work." : "Work interval complete. Take a break.";
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.start();
        setTimeout(() => { osc.stop(); ctx.close(); }, 180);
      } catch {}
    }
    syncTimer();
  }, 1000);
}

function resetTimer() {
  clearInterval(activeTimer);
  timerRunning = false;
  timerMode = "work";
  timerRemaining = state.timer.work * 60;
  syncTimer();
}

function flipFlash() {
  state.flashBack = !state.flashBack;
  render();
}

function nextFlash() {
  state.flashIndex = (state.flashIndex + 1) % flashcards.length;
  state.flashBack = false;
  saveState();
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  document.querySelectorAll(".nav-link").forEach(b => b.addEventListener("click", () => routeTo(b.dataset.route)));
  document.getElementById("themeToggle").addEventListener("click", () => {
    state.dark = !state.dark;
    document.body.classList.toggle("dark", state.dark);
    saveState();
  });
  render();
});
