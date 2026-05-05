const STORE = "fin295-study-state-v1";
const FORMULA_PDF = "assets/fin-295-final-formula.pdf";

const timerDefaults = {
  work: 25,
  break: 5,
  alarm: "alarm-clock",
  floatingStarted: false,
  floatingEnabled: true,
  floatingMinimized: false,
  position: { x: null, y: null }
};

const alarmSounds = [
  {
    id: "alarm-clock",
    label: "Alarm clock",
    source: "Mathieu Kappler, CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Alarm_clock_-_01.ogg"
  },
  {
    id: "bright-bell",
    label: "Bright bell",
    source: "Achim55, CC0",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Synthetic_bell_sound.ogg"
  },
  {
    id: "door-bell",
    label: "Door bell",
    source: "Amada44, CC0",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sound_Effect_-_Door_Bell.ogg"
  },
  {
    id: "soft-gong",
    label: "Soft gong",
    source: "PDSounds, CC0",
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gong_or_bell_vibrant_(short).ogg"
  }
];

const formulas = [
  {
    id: "nwc",
    chapter: "Chapter 3",
    source: "Original formula sheet",
    title: "Net Working Capital",
    tex: "NWC = Current\\ Assets - Current\\ Liabilities",
    plain: "Measures the current assets left after covering current liabilities.",
    variables: "Current Assets = short-term assets; Current Liabilities = short-term liabilities.",
    when: "Use for liquidity and working-capital review.",
    example: "If current assets are $5,000 and current liabilities are $3,200, NWC = $1,800."
  },
  {
    id: "nowc-basic",
    chapter: "Chapter 3",
    source: "Original formula sheet",
    title: "Net Operating Working Capital",
    tex: "NOWC = Operating\\ Current\\ Assets - Operating\\ Current\\ Liabilities",
    plain: "Measures working capital tied directly to operations.",
    variables: "Operating current assets exclude excess cash; operating current liabilities exclude notes payable.",
    when: "Use when the question focuses on operating assets and liabilities.",
    example: "NOWC rises when operating current assets grow faster than operating current liabilities."
  },
  {
    id: "nowc-adjusted",
    chapter: "Chapter 3",
    source: "Original formula sheet",
    title: "Adjusted NOWC",
    tex: "NOWC = (Current\\ Assets - Excess\\ Cash) - (Current\\ Liabilities - Notes\\ Payable)",
    plain: "Computes operating working capital after removing financing and excess cash items.",
    variables: "Excess Cash = cash not needed for operations; Notes Payable = financing liability.",
    when: "Use when the balance sheet gives excess cash or notes payable.",
    example: "Subtract excess cash from current assets and notes payable from current liabilities before finding NOWC."
  },
  {
    id: "fcf",
    chapter: "Chapter 3",
    source: "Original formula sheet",
    title: "Free Cash Flow",
    tex: "FCF = [EBIT(1-T)+Depreciation\\ and\\ amortization] - [Capital\\ expenditures + NOWC]",
    plain: "Estimates cash flow available after operating taxes, reinvestment, and working capital needs.",
    variables: "EBIT = operating income; T = tax rate; NOWC = net operating working capital.",
    when: "Use for corporate cash-flow and valuation review.",
    example: "Start with after-tax EBIT, add depreciation, then subtract capital expenditures and NOWC."
  },
  {
    id: "mva",
    chapter: "Chapter 3",
    source: "Original formula sheet",
    title: "Market Value Added",
    tex: "MVA = (P_0 \\times Number\\ of\\ shares) - Book\\ value",
    plain: "Compares the market value of equity to its book value.",
    variables: "P_0 = stock price today; Book value = accounting equity value.",
    when: "Use to measure value created above book capital.",
    example: "If market equity is $12 million and book value is $8 million, MVA = $4 million."
  },
  {
    id: "eva",
    chapter: "Chapter 3",
    source: "Original formula sheet",
    title: "Economic Value Added",
    tex: "EVA = EBIT(1-T) - (Total\\ invested\\ capital \\times Cost\\ of\\ capital)",
    plain: "Measures operating profit after charging for the cost of invested capital.",
    variables: "Total invested capital = capital supplied to operations; Cost of capital = required return.",
    when: "Use to decide whether operations earned more than the required capital charge.",
    example: "Positive EVA means operating profit exceeded the dollar cost of capital."
  },
  {
    id: "current-ratio",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Current Ratio",
    tex: "Current\\ ratio = \\frac{Current\\ assets}{Current\\ liabilities}",
    plain: "Measures short-term liquidity.",
    variables: "Current assets = short-term assets; Current liabilities = short-term obligations.",
    when: "Use for liquidity ratio questions.",
    example: "$10,000 / $5,000 = 2.00."
  },
  {
    id: "quick-ratio",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Quick Ratio",
    tex: "Quick\\ ratio = \\frac{Current\\ assets - Inventories}{Current\\ liabilities}",
    plain: "Measures liquidity after removing inventory.",
    variables: "Inventories = inventory balance; current liabilities = short-term obligations.",
    when: "Use when the question asks for acid-test liquidity.",
    example: "($10,000 - $2,500) / $5,000 = 1.50."
  },
  {
    id: "cash-ratio",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Cash Ratio",
    tex: "Cash\\ ratio = \\frac{Cash}{Current\\ liabilities}",
    plain: "Measures the most conservative short-term liquidity position.",
    variables: "Cash = cash and cash equivalents; Current liabilities = short-term obligations.",
    when: "Use for strict cash-coverage questions.",
    example: "$2,000 / $5,000 = 0.40."
  },
  {
    id: "inventory-turnover",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Inventory Turnover",
    tex: "Inventory\\ turnover = \\frac{COGS}{Inventories}",
    plain: "Shows how many times inventory is sold and replaced during the period.",
    variables: "COGS = cost of goods sold; Inventories = inventory balance.",
    when: "Use for asset management efficiency questions.",
    example: "$60,000 / $10,000 = 6.00 times."
  },
  {
    id: "dso",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Days Sales Outstanding",
    tex: "DSO = \\frac{Receivables}{Average\\ sales\\ per\\ day}",
    plain: "Estimates the average collection period for receivables.",
    variables: "Average sales per day = annual sales divided by 365.",
    when: "Use for receivables collection questions.",
    example: "$8,000 / $400 = 20 days."
  },
  {
    id: "fa-turnover",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Fixed Assets Turnover",
    tex: "FA\\ turnover = \\frac{Sales}{Net\\ fixed\\ assets}",
    plain: "Measures sales generated per dollar of net fixed assets.",
    variables: "Sales = annual sales; Net fixed assets = net property, plant, and equipment.",
    when: "Use for fixed-asset efficiency questions.",
    example: "$100,000 / $50,000 = 2.00."
  },
  {
    id: "debt-capital",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Debt-to-Capital Ratio",
    tex: "Debt\\mbox{-}to\\mbox{-}capital = \\frac{Total\\ debt}{Total\\ invested\\ capital}",
    plain: "Measures how much invested capital is financed with debt.",
    variables: "Total invested capital = debt plus equity capital used by the firm.",
    when: "Use for financial leverage questions.",
    example: "$40,000 / $100,000 = 40.00%."
  },
  {
    id: "operating-margin",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Operating Margin",
    tex: "Operating\\ Margin = \\frac{EBIT}{Sales}",
    plain: "Measures operating income as a percentage of sales.",
    variables: "EBIT = earnings before interest and taxes; Sales = revenue.",
    when: "Use for operating profitability questions.",
    example: "$12,000 / $100,000 = 12.00%."
  },
  {
    id: "profit-margin",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Profit Margin",
    tex: "Profit\\ Margin = \\frac{Net\\ Income}{Sales}",
    plain: "Measures net income earned per dollar of sales.",
    variables: "Net Income = earnings after all expenses; Sales = revenue.",
    when: "Use for overall profitability questions.",
    example: "$8,000 / $100,000 = 8.00%."
  },
  {
    id: "bep",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Basic Earning Power",
    tex: "BEP = \\frac{EBIT}{Total\\ Assets}",
    plain: "Measures operating return on total assets before interest and taxes.",
    variables: "EBIT = operating income; Total Assets = asset base.",
    when: "Use to compare operating profitability independent of financing.",
    example: "$15,000 / $120,000 = 12.50%."
  },
  {
    id: "roa",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Return on Assets",
    tex: "ROA = \\frac{Net\\ Income}{Total\\ Assets}",
    plain: "Measures net income earned per dollar of assets.",
    variables: "Net Income = earnings after all expenses; Total Assets = asset base.",
    when: "Use for profitability relative to assets.",
    example: "$9,000 / $150,000 = 6.00%."
  },
  {
    id: "roe-basic",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Return on Equity",
    tex: "ROE = \\frac{Net\\ Income}{Total\\ Equity}",
    plain: "Measures net income earned per dollar of equity.",
    variables: "Total Equity = shareholders' equity.",
    when: "Use for profitability relative to equity.",
    example: "$9,000 / $75,000 = 12.00%."
  },
  {
    id: "pe",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Price/Earnings Ratio",
    tex: "P/E = \\frac{Price}{Earnings\\ per\\ share}",
    plain: "Shows how much investors pay for each dollar of earnings.",
    variables: "Price = market price per share; Earnings per share = EPS.",
    when: "Use for market value ratio questions.",
    example: "$40 / $4 = 10.00."
  },
  {
    id: "mb",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Market/Book Ratio",
    tex: "M/B = \\frac{Market\\ price}{Book\\ value\\ per\\ share}",
    plain: "Compares market price per share to accounting book value per share.",
    variables: "Book value per share = common equity divided by shares outstanding.",
    when: "Use for market value ratio questions.",
    example: "$30 / $15 = 2.00."
  },
  {
    id: "enterprise-value",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "Enterprise Value",
    tex: "Enterprise\\ Value = MVE + MVD + MVClaims - Cash\\ and\\ equivalents",
    plain: "Measures the market value of the firm's operating claims net of cash.",
    variables: "MVE = market value of equity; MVD = market value of debt; MVClaims = market value of other claims.",
    when: "Use for valuation and capital-structure questions.",
    example: "Add market equity, market debt, and other claims, then subtract cash."
  },
  {
    id: "dupont-roe",
    chapter: "Chapter 4",
    source: "Original formula sheet",
    title: "DuPont ROE",
    tex: "ROE = \\frac{NI}{Sales} \\times \\frac{Sales}{TA} \\times \\frac{TA}{Equity}",
    plain: "Breaks ROE into profit margin, total assets turnover, and equity multiplier.",
    variables: "NI = net income; TA = total assets; Equity = total equity.",
    when: "Use to analyze what drives return on equity.",
    example: "ROE improves when margins, turnover, or leverage rise."
  },
  {
    id: "pv",
    chapter: "Chapter 5",
    source: "Original formula sheet",
    title: "Present Value",
    tex: "PV = \\frac{FV_N}{(1+I)^N}",
    plain: "Discounts a future lump sum back to today.",
    variables: "FV_N = future value in period N; I = interest rate per period; N = number of periods.",
    when: "Use for lump-sum present value questions.",
    example: "$1,000 / 1.10^3 = $751.31."
  },
  {
    id: "eff",
    chapter: "Chapter 5",
    source: "Original formula sheet",
    title: "Effective Annual Rate",
    tex: "EFF\\% = \\left(1+\\frac{I_{NOM}}{M}\\right)^M - 1",
    plain: "Converts a nominal rate with compounding into an effective annual rate.",
    variables: "I_NOM = nominal annual rate; M = compounding periods per year.",
    when: "Use when compounding occurs more than once per year.",
    example: "(1 + 0.12/12)^12 - 1 = 12.68%."
  },
  {
    id: "nominal-rate",
    chapter: "Chapter 6",
    source: "Original formula sheet",
    title: "Nominal Interest Rate",
    tex: "r = r^* + IP + DRP + LP + MRP",
    plain: "Builds a quoted interest rate from the real risk-free rate and risk premiums.",
    variables: "r* = real risk-free rate; IP = inflation premium; DRP = default risk premium; LP = liquidity premium; MRP = maturity risk premium.",
    when: "Use for interest rate component questions.",
    example: "Add each premium to the real risk-free rate to estimate the nominal rate."
  },
  {
    id: "maturity-risk-premium",
    chapter: "Chapter 6",
    source: "Original formula sheet",
    title: "Maturity Risk Premium",
    tex: "MRP_t = 0.1\\%(t-1)",
    plain: "Estimates the maturity risk premium based on years to maturity.",
    variables: "t = years to maturity.",
    when: "Use when the formula sheet gives the maturity risk premium rule.",
    example: "For t = 6, MRP = 0.1%(5) = 0.50%."
  },
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
    chapter: "Chapter 10",
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
    chapter: "Chapter 9",
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
    chapter: "Chapter 4",
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
    chapter: "Chapter 5",
    source: "Formula sheet; sample final Q20",
    title: "Future Value",
    tex: "FV_N = PV(1+I)^N",
    plain: "Compounds a present amount forward for N periods.",
    variables: "PV = starting amount; I = interest rate per period; N = number of periods.",
    when: "Use for lump-sum time value of money questions.",
    example: "$1,900(1.139)^{10} = $6,982.18."
  }
];

const formulaChapterOrder = ["Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11"];

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
  sampleFilter: null,
  sample: { index: 0, attempts: {}, solved: {}, wrong: {} },
  generated: null,
  generatedRun: { index: 0, attempts: {}, solved: {}, wrong: {} },
  timer: { ...timerDefaults },
  flashIndex: 0,
  flashOrder: [],
  flashBack: false,
  formulaOpen: {},
  quizFormulaOpen: false,
  contactRevealed: {},
  mobileMenuOpen: false,
  calc: { display: "0", expr: "", tvm: { N: null, IY: null, PV: null, PMT: null, FV: null } }
};

let activeTimer = null;
let timerRemaining = 25 * 60;
let timerMode = "work";
let timerRunning = false;
let dragTimer = null;
let alarmPreviewAudio = null;
let alarmPreviewContext = null;
let alarmPreviewPlaying = false;

function loadState() {
  const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
  Object.assign(state, saved);
  state.timer = {
    ...timerDefaults,
    ...(saved.timer || {}),
    position: { ...timerDefaults.position, ...(saved.timer?.position || {}) }
  };
  if (!state.sample || typeof state.sample.index !== "number") {
    state.sample = { index: 0, attempts: {}, solved: {}, wrong: {} };
  }
  if (!state.sample.wrong) state.sample.wrong = {};
  if (!state.generatedRun || typeof state.generatedRun.index !== "number") {
    state.generatedRun = { index: 0, attempts: {}, solved: {}, wrong: {} };
  }
  if (!state.generatedRun.wrong) state.generatedRun.wrong = {};
  if (state.sampleFilter === undefined) state.sampleFilter = null;
  if (!Array.isArray(state.flashOrder) || state.flashOrder.length !== flashcards.length) {
    state.flashOrder = flashcards.map((_, i) => i);
  }
  if (!state.formulaOpen || typeof state.formulaOpen !== "object") state.formulaOpen = {};
  state.quizFormulaOpen = !!state.quizFormulaOpen;
  if (!state.contactRevealed || typeof state.contactRevealed !== "object") state.contactRevealed = {};
  state.mobileMenuOpen = false;
  state.flashIndex = Math.max(0, Math.min(Number(state.flashIndex) || 0, flashcards.length - 1));
  timerRemaining = (timerMode === "work" ? state.timer.work : state.timer.break) * 60;
  document.body.classList.toggle("dark", !!state.dark);
}

function saveState() {
  localStorage.setItem(STORE, JSON.stringify({
    dark: state.dark,
    sampleFilter: state.sampleFilter,
    sample: state.sample,
    generated: state.generated,
    generatedRun: state.generatedRun,
    timer: state.timer,
    flashIndex: state.flashIndex,
    flashOrder: state.flashOrder,
    formulaOpen: state.formulaOpen,
    quizFormulaOpen: state.quizFormulaOpen,
    contactRevealed: state.contactRevealed
  }));
}

const money = n => `$${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = n => `${Number(n).toFixed(2)}%`;
const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(v => v[1]);
const escAttr = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escHtml = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const formatText = s => escHtml(s)
  .replace(/\\\((.*?)\\\)/g, (_, math) => `\\(${math}\\)`)
  .replace(/\b([A-Za-z]+)_([A-Za-z0-9]+)\b/g, (_, base, sub) => `${base}<sub>${sub}</sub>`);

const contactLinks = {
  email: { label: "School Email", text: "m.tumbahangphe@my.ccsu.edu", href: "mailto:m.tumbahangphe@my.ccsu.edu", icon: "@" },
  linkedin: { label: "LinkedIn", text: "linkedin.com/in/minsot13", href: "https://www.linkedin.com/in/minsot13", icon: "in" },
  github: { label: "GitHub", text: "github.com/minso222", href: "https://github.com/minso222", icon: "gh" }
};

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

  const waccBlend = 0.35 * 5.4 + 0.1 * 8.2 + 0.55 * 10.8;
  const q16 = makeQ("g16", "wacc", "Chapter 10 slides 4-7", ["wacc"], `A firm uses 35% after-tax debt at 5.40%, 10% preferred at 8.20%, and 55% equity at 10.80%. What is WACC?`, waccBlend, pct, `\\(WACC=.35(5.40\\%)+.10(8.20\\%)+.55(10.80\\%)=${pct(waccBlend)}\\).`);

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

function getQuestionsForKind(kind) {
  if (kind === "generated") return state.generated;
  if (state.sampleFilter) return sampleQuestions.filter(q => q.source.includes(state.sampleFilter));
  return sampleQuestions;
}

function setSampleFilter(value) {
  state.sampleFilter = value || null;
  state.sample = { index: 0, attempts: {}, solved: {}, wrong: {} };
  saveState();
  render();
}

function startChapterPractice(chapterLabel) {
  const subset = sampleQuestions.filter(q => q.source.includes(chapterLabel));
  if (!subset.length) return;
  state.sampleFilter = chapterLabel;
  state.sample = { index: 0, attempts: {}, solved: {}, wrong: {} };
  saveState();
  routeTo("sample");
}

function routeTo(route) {
  if (document.activeElement?.closest?.(".sidebar, .mobile-menu")) {
    document.activeElement.blur();
  }
  state.route = route;
  state.mobileMenuOpen = false;
  syncNavigation();
  syncMobileMenu();
  saveState();
  render();
}

function syncNavigation() {
  const awayFromHome = state.route !== "home";
  document.body.classList.toggle("route-home", !awayFromHome);
  document.body.classList.toggle("nav-collapsed", awayFromHome);
  document.querySelectorAll(".nav-link").forEach(b => {
    const active = b.dataset.route === state.route;
    b.classList.toggle("active", active);
    if (active) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
}

function setTheme(dark) {
  state.dark = !!dark;
  document.body.classList.toggle("dark", state.dark);
  document.querySelectorAll("[data-theme-icon]").forEach(node => {
    node.textContent = state.dark ? "☾" : "☀";
  });
  document.querySelectorAll("[data-theme-label]").forEach(node => {
    node.textContent = state.dark ? "Light Mode" : "Dark Mode";
  });
  document.querySelectorAll("#themeToggle, #mobileThemeToggle").forEach(node => {
    node.setAttribute("aria-pressed", state.dark ? "true" : "false");
    if (node.id === "themeToggle") node.setAttribute("aria-label", state.dark ? "Switch to light mode" : "Switch to dark mode");
  });
  saveState();
}

function toggleTheme() {
  setTheme(!state.dark);
}

function syncMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const toggle = document.getElementById("mobileMenuToggle");
  if (menu) menu.hidden = !state.mobileMenuOpen;
  if (toggle) {
    toggle.classList.toggle("open", state.mobileMenuOpen);
    toggle.setAttribute("aria-expanded", state.mobileMenuOpen ? "true" : "false");
    toggle.setAttribute("aria-label", state.mobileMenuOpen ? "Close menu" : "Open menu");
  }
}

function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  syncMobileMenu();
}

function formulaLinks(ids) {
  if (!ids || !ids.length) return "";
  return `<p><strong>Formula link:</strong> ${ids.map(id => {
    const f = formulas.find(x => x.id === id);
    return `<button type="button" class="small-button" onclick="routeTo('formulas'); setTimeout(()=>openFormulaFor('${id}'), 40)">${f?.title || id}</button>`;
  }).join(" ")}</p>`;
}

function formulasByChapter() {
  const grouped = formulas.reduce((acc, formula) => {
    if (!acc[formula.chapter]) acc[formula.chapter] = [];
    acc[formula.chapter].push(formula);
    return acc;
  }, {});
  return formulaChapterOrder.filter(ch => grouped[ch]).map(ch => [ch, grouped[ch]]);
}

function toggleFormulaChapter(chapter) {
  state.formulaOpen[chapter] = !state.formulaOpen[chapter];
  saveState();
  render();
}

function openFormulaFor(id) {
  const formula = formulas.find(f => f.id === id);
  if (!formula) return;
  state.formulaOpen[formula.chapter] = true;
  saveState();
  render();
  setTimeout(() => document.getElementById(`formula-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
}

function renderQuizFormulaSheet() {
  return `
    <aside class="quiz-formula-sheet" aria-label="Original formula sheet">
      <div class="quiz-formula-head">
        <h3>Formula Sheet</h3>
        <span class="badge">Original PDF</span>
      </div>
      <iframe class="quiz-formula-pdf" title="FIN 295 Final Formula Sheet" src="${FORMULA_PDF}#toolbar=0&navpanes=0"></iframe>
    </aside>`;
}

function toggleQuizFormulaSheet() {
  state.quizFormulaOpen = !state.quizFormulaOpen;
  saveState();
  render();
}

function renderQuiz(kind) {
  const questions = getQuestionsForKind(kind);
  const run = kind === "sample" ? state.sample : state.generatedRun;
  if (!questions) {
    return `<section class="panel stack"><h2 class="page-title">Generate New Test</h2><p class="muted">Create a fresh exam mirrored from the original sample final.</p><button type="button" class="primary" onclick="startGenerated()">Generate test</button></section>`;
  }
  const q = questions[run.index];
  const attempts = run.attempts[q.id] || 0;
  const solved = run.solved[q.id] === true;
  const wrongPicks = run.wrong[q.id] || [];
  const correctCount = questions.filter(item => run.solved[item.id]).length;
  const formulaOpen = !!state.quizFormulaOpen;
  const filterRow = kind === "sample" ? `
    <div class="filter-row">
      <label class="filter-label" for="chapterFilter">Focus</label>
      <select id="chapterFilter" class="chapter-select" onchange="setSampleFilter(this.value)">
        <option value="" ${!state.sampleFilter ? "selected" : ""}>Full sample final (${sampleQuestions.length} questions)</option>
        ${["Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11"].map(ch => {
          const n = sampleQuestions.filter(x => x.source.includes(ch)).length;
          return `<option value="${ch}" ${state.sampleFilter === ch ? "selected" : ""}>${ch} drill (${n})</option>`;
        }).join("")}
      </select>
    </div>` : "";
  return `
    <section class="stack">
      ${filterRow}
      <div class="question-meta">
        <span class="badge">${kind === "sample" ? "Original Sample Final" : "Generated Practice"} · Question ${run.index + 1} of ${questions.length}</span>
        <span>Score ${correctCount}/${questions.length} · Attempts on this question ${attempts}</span>
      </div>
      <div class="action-row">
        <button type="button" class="secondary" onclick="toggleQuizFormulaSheet()" aria-expanded="${formulaOpen}">${formulaOpen ? "Close Formula Sheet" : "Open Formula Sheet"}</button>
      </div>
      <div class="quiz-workspace ${formulaOpen ? "with-formulas" : ""}">
        <div class="quiz-main">
          <article class="question-panel" aria-labelledby="questionHeading">
            <h2 id="questionHeading" class="visually-hidden">Question ${run.index + 1}</h2>
            <div class="question-meta"><span>${q.source}</span><span>${q.type}</span></div>
            <p class="question-text" id="qtext-${q.id}">${q.prompt}</p>
            <div class="choices" role="group" aria-label="Answer choices for this question" aria-labelledby="qtext-${q.id}">
              ${q.choices.map((choice, i) => {
                const letter = String.fromCharCode(97 + i);
                const isCorrect = solved && i === q.answer;
                const isWrong = !solved && wrongPicks.includes(i);
                const cls = ["choice", isCorrect ? "correct" : "", isWrong ? "wrong" : ""].filter(Boolean).join(" ");
                return `<button type="button" class="${cls}" onclick="chooseAnswer('${kind}', ${i})" aria-label="Choice ${letter}: ${escAttr(choice)}">${letter}. ${choice}</button>`;
              }).join("")}
            </div>
            ${solved ? `<div class="solution" role="region" aria-label="Worked solution"><h3>Worked Solution</h3>${formulaLinks(q.formulaIds)}<div class="solution-body"><p>${q.solution}</p></div><p class="muted">Source tag: ${q.source}</p></div>` : `<p class="muted">Incorrect selections stay marked until you choose the correct answer. The solution unlocks only after the right choice.</p>`}
          </article>
        </div>
        ${formulaOpen ? renderQuizFormulaSheet() : ""}
      </div>
      <div class="action-row">
        <button type="button" class="secondary" onclick="moveQuestion('${kind}', -1)">Back</button>
        <button type="button" class="primary" onclick="moveQuestion('${kind}', 1)">Next</button>
        <button type="button" class="secondary" onclick="resetQuiz('${kind}')">Reset this test</button>
        ${kind === "generated" ? `<button type="button" class="secondary" onclick="startGenerated()">Generate new set</button>` : ""}
      </div>
    </section>`;
}

function chooseAnswer(kind, index) {
  const questions = getQuestionsForKind(kind);
  const run = kind === "sample" ? state.sample : state.generatedRun;
  const q = questions[run.index];
  run.attempts[q.id] = (run.attempts[q.id] || 0) + 1;
  if (index === q.answer) {
    run.solved[q.id] = true;
    delete run.wrong[q.id];
  } else {
    const prev = run.wrong[q.id] || [];
    if (!prev.includes(index)) run.wrong[q.id] = [...prev, index];
  }
  saveState();
  render();
}

function moveQuestion(kind, delta) {
  const questions = getQuestionsForKind(kind);
  const run = kind === "sample" ? state.sample : state.generatedRun;
  run.index = Math.max(0, Math.min(questions.length - 1, run.index + delta));
  saveState();
  render();
}

function resetQuiz(kind) {
  if (kind === "sample") state.sample = { index: 0, attempts: {}, solved: {}, wrong: {} };
  else state.generatedRun = { index: 0, attempts: {}, solved: {}, wrong: {} };
  saveState();
  render();
}

function startGenerated() {
  state.generated = shuffle(generateTest());
  state.generatedRun = { index: 0, attempts: {}, solved: {}, wrong: {} };
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
          <button type="button" class="primary" onclick="routeTo('sample')">Start sample test</button>
          <button type="button" class="secondary" onclick="startGenerated()">Generate practice test</button>
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
  const chapters = formulasByChapter();
  return `
    <section class="stack">
      <div>
        <h2 class="page-title">Formula Sheet</h2>
        <p class="muted">All formulas from the original formula sheet, grouped by chapter. Click a chapter to open or close its formulas.</p>
      </div>
      <div class="formula-chapters">
        ${chapters.map(([chapter, items]) => {
          const isOpen = !!state.formulaOpen[chapter];
          const panelId = `formula-panel-${chapter.replace(/[^A-Za-z0-9]/g, "-")}`;
          return `
            <section class="formula-chapter ${isOpen ? "open" : ""}">
              <button type="button" class="formula-chapter-toggle" aria-expanded="${isOpen}" aria-controls="${panelId}" onclick="toggleFormulaChapter('${chapter}')">
                <span>${chapter}</span>
                <span class="badge">${items.length} formulas</span>
              </button>
              <div id="${panelId}" class="formula-chapter-panel" ${isOpen ? "" : "hidden"}>
                <div class="grid">
                  ${items.map(f => `
                    <article id="formula-${f.id}" class="formula-card">
                      <span class="badge">${f.source}</span>
                      <h3>${f.title}</h3>
                      <div class="formula">\\(${f.tex}\\)</div>
                      <p>${formatText(f.plain)}</p>
                      <p><strong>Variables:</strong> ${formatText(f.variables)}</p>
                      <p><strong>When to use:</strong> ${formatText(f.when)}</p>
                      <p><strong>Worked example:</strong> ${formatText(f.example)}</p>
                    </article>`).join("")}
                </div>
              </div>
            </section>`;
        }).join("")}
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
  if (!state.flashOrder.length) state.flashOrder = flashcards.map((_, i) => i);
  const flashPosition = state.flashIndex % state.flashOrder.length;
  const f = flashcards[state.flashOrder[flashPosition]];
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
            ${["N","I/Y","PV","PMT","FV","CPT","CE/C","2nd CLR TVM","+/-","÷","7","8","9","×","-","4","5","6","+","=","1","2","3","0","."].map(k => `<button type="button" class="${["N","I/Y","PV","PMT","FV","CPT"].includes(k) ? "accent" : ""}" onclick="calcPress('${k.replace("'", "\\'")}')">${k}</button>`).join("")}
          </div>
          <p class="muted">Enter a number, press a TVM key to store it, then press CPT and the missing TVM key. Use negative PV for investments/outflows.</p>
        </article>
        <article class="tool-panel">
          <h3>Pomodoro Timer</h3>
          <div id="timerFace" class="timer-face" data-timer-face>25:00</div>
          <div class="field-row">
            <label>Work minutes<input id="workLen" type="number" min="1" max="120" value="${state.timer.work}" onchange="setTimerPref('work', this.value)"></label>
            <label>Break minutes<input id="breakLen" type="number" min="1" max="60" value="${state.timer.break}" onchange="setTimerPref('break', this.value)"></label>
          </div>
          <div class="alarm-row">
            <label>Alarm sound
              <select id="alarmSound" onchange="setAlarmSound(this.value)">
                ${alarmSounds.map(sound => `<option value="${sound.id}" ${state.timer.alarm === sound.id ? "selected" : ""}>${sound.label}</option>`).join("")}
              </select>
            </label>
            <button id="alarmPreviewButton" type="button" class="secondary" onclick="previewAlarm()">Preview</button>
          </div>
          <p id="alarmCredit" class="muted mini-copy">${alarmSounds.find(sound => sound.id === state.timer.alarm)?.source || ""}</p>
          ${state.timer.floatingStarted ? `
            <label class="toggle-line">
              <input id="floatingTimerToggle" type="checkbox" ${state.timer.floatingEnabled ? "checked" : ""} onchange="setFloatingTimerEnabled(this.checked)">
              Floating timer
            </label>` : ""}
          <div class="action-row" style="margin-top:.8rem">
            <button type="button" class="primary" onclick="toggleTimer()"><span data-timer-running>Start</span></button>
            <button type="button" class="secondary" onclick="resetTimer()">Reset</button>
          </div>
          <p id="timerCue" class="muted" aria-live="polite">Ready for a focused study interval.</p>
        </article>
      </div>
      <div class="grid">
        <article class="tool-panel">
          <h3>Flashcards</h3>
          <button type="button" class="flashcard" onclick="flipFlash()">${state.flashBack ? f[1] : f[0]}</button>
          <div class="action-row" style="margin-top:.8rem">
            <button type="button" class="secondary" onclick="previousFlash()">Back</button>
            <button type="button" class="secondary" onclick="shuffleFlashcards()">Shuffle</button>
            <button type="button" class="secondary" onclick="nextFlash()">Next card</button>
          </div>
        </article>
        <article class="tool-panel">
          <h3>Chapter drills</h3>
          <p class="muted">Jump to the sample final filtered by the slides your professor emphasized.</p>
          <div class="chapter-drills">
            ${["Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11"].map(ch => {
              const n = sampleQuestions.filter(q => q.source.includes(ch)).length;
              return `<button type="button" class="secondary chapter-pill" onclick="startChapterPractice('${ch}')">${ch} · ${n}</button>`;
            }).join("")}
          </div>
        </article>
        <article class="tool-panel">
          <h3>Progress Dashboard</h3>
          <div class="grid">${byChapter}</div>
        </article>
      </div>
    </section>`;
}

function renderContactSection() {
  const renderContactAction = key => {
    const item = contactLinks[key];
    if (key === "email") {
      if (state.contactRevealed.email) {
        return `<div class="contact-action revealed copyable" tabindex="0"><span class="contact-icon">${item.icon}</span><span>${item.text}</span></div>`;
      }
      return `<button type="button" class="contact-action" onclick="revealContact('email')"><span class="contact-icon">${item.icon}</span>${item.label}</button>`;
    }
    return `<a class="contact-action" href="${item.href}" target="_blank" rel="noopener noreferrer"><span class="contact-icon">${item.icon}</span>${item.label}</a>`;
  };
  return `
    <section class="contact-section" aria-labelledby="contactHeading">
      <p class="eyebrow">Contact</p>
      <h2 id="contactHeading">Found this helpful?</h2>
      <p class="contact-copy">Connect with me on LinkedIn to collaborate on future projects, or just to chat.</p>
      <div class="contact-actions">
        ${renderContactAction("email")}
        ${renderContactAction("linkedin")}
        ${renderContactAction("github")}
      </div>
    </section>`;
}

function revealContact(key) {
  const item = contactLinks[key];
  if (!item) return;
  state.contactRevealed[key] = true;
  saveState();
  render();
  if (key === "email") window.open(item.href, "_blank", "noopener,noreferrer");
}

function render() {
  const app = document.getElementById("app");
  const page = {
    home: renderHome,
    sample: () => renderQuiz("sample"),
    generate: () => renderQuiz("generated"),
    formulas: renderFormulas,
    tools: renderTools
  }[state.route]();
  app.innerHTML = `${page}${renderContactSection()}`;
  if (state.route === "tools") {
    syncCalc();
    syncTimer();
    syncAlarmPreview();
  }
  renderFloatingTimer();
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
  const m = Math.floor(timerRemaining / 60).toString().padStart(2, "0");
  const s = Math.floor(timerRemaining % 60).toString().padStart(2, "0");
  const label = timerMode === "work" ? "Focus" : "Break";
  document.querySelectorAll("[data-timer-face]").forEach(face => {
    face.textContent = `${m}:${s}`;
  });
  document.querySelectorAll("[data-timer-mode]").forEach(node => {
    node.textContent = label;
  });
  document.querySelectorAll("[data-timer-running]").forEach(node => {
    node.textContent = timerRunning ? "Pause" : "Start";
  });
  renderFloatingTimer();
}

function syncAlarmPreview() {
  const button = document.getElementById("alarmPreviewButton");
  if (button) button.textContent = alarmPreviewPlaying ? "Pause" : "Preview";
}

function setAlarmSound(value) {
  if (!alarmSounds.some(sound => sound.id === value)) return;
  stopAlarmPreview();
  state.timer.alarm = value;
  saveState();
  const credit = document.getElementById("alarmCredit");
  const sound = alarmSounds.find(item => item.id === value);
  if (credit) credit.textContent = sound?.source || "";
}

function previewAlarm() {
  if (alarmPreviewPlaying) {
    stopAlarmPreview();
    return;
  }
  const selected = alarmSounds.find(sound => sound.id === state.timer.alarm) || alarmSounds[0];
  stopAlarmPreview();
  alarmPreviewAudio = new Audio(selected.url);
  alarmPreviewAudio.volume = 0.72;
  alarmPreviewAudio.addEventListener("ended", stopAlarmPreview, { once: true });
  const preview = alarmPreviewAudio;
  alarmPreviewAudio.play()
    .then(() => {
      if (alarmPreviewAudio !== preview) return;
      alarmPreviewPlaying = true;
      syncAlarmPreview();
    })
    .catch(() => playFallbackAlarm(true));
}

function stopAlarmPreview() {
  if (alarmPreviewAudio) {
    alarmPreviewAudio.pause();
    alarmPreviewAudio.currentTime = 0;
    alarmPreviewAudio = null;
  }
  if (alarmPreviewContext) {
    alarmPreviewContext.close().catch(() => {});
    alarmPreviewContext = null;
  }
  alarmPreviewPlaying = false;
  syncAlarmPreview();
}

function playAlarm() {
  const selected = alarmSounds.find(sound => sound.id === state.timer.alarm) || alarmSounds[0];
  const audio = new Audio(selected.url);
  audio.volume = 0.72;
  audio.play().catch(playFallbackAlarm);
}

function playFallbackAlarm(isPreview = false) {
  try {
    const ctx = new AudioContext();
    if (isPreview) {
      alarmPreviewContext = ctx;
      alarmPreviewPlaying = true;
      syncAlarmPreview();
    }
    const notes = [880, 1046, 1318];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.16);
      gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + index * 0.16 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.16 + 0.14);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + index * 0.16);
      osc.stop(ctx.currentTime + index * 0.16 + 0.15);
    });
    setTimeout(() => {
      ctx.close().catch(() => {});
      if (isPreview && alarmPreviewContext === ctx) {
        alarmPreviewContext = null;
        alarmPreviewPlaying = false;
        syncAlarmPreview();
      }
    }, 720);
  } catch {}
}

function setFloatingTimerEnabled(enabled) {
  state.timer.floatingEnabled = !!enabled;
  if (enabled) state.timer.floatingMinimized = false;
  saveState();
  const toggle = document.getElementById("floatingTimerToggle");
  if (toggle) toggle.checked = state.timer.floatingEnabled;
  renderFloatingTimer();
}

function setFloatingTimerMinimized(minimized) {
  state.timer.floatingMinimized = !!minimized;
  saveState();
  renderFloatingTimer();
}

function renderFloatingTimer() {
  let floating = document.getElementById("floatingTimer");
  const shouldShow = state.timer.floatingStarted && state.timer.floatingEnabled;
  if (!shouldShow) {
    if (floating) floating.hidden = true;
    return;
  }
  if (!floating) {
    floating = document.createElement("aside");
    floating.id = "floatingTimer";
    floating.className = "floating-timer";
    floating.setAttribute("aria-label", "Floating Pomodoro timer");
    document.body.appendChild(floating);
    floating.innerHTML = `
      <button type="button" class="floating-drag" aria-label="Move floating timer" title="Move timer">+</button>
      <div class="floating-copy">
        <span data-timer-mode></span>
        <strong data-timer-face></strong>
      </div>
      <div class="floating-actions">
        <button type="button" onclick="toggleTimer()" data-timer-running></button>
        <button type="button" onclick="setFloatingTimerMinimized(true)" data-timer-hide>Hide</button>
        <button type="button" onclick="setFloatingTimerMinimized(false)" data-timer-show>Show</button>
      </div>`;
  }
  const m = Math.floor(timerRemaining / 60).toString().padStart(2, "0");
  const s = Math.floor(timerRemaining % 60).toString().padStart(2, "0");
  floating.hidden = false;
  floating.classList.toggle("minimized", !!state.timer.floatingMinimized);
  floating.querySelector("[data-timer-mode]").textContent = timerMode === "work" ? "Focus" : "Break";
  floating.querySelector("[data-timer-face]").textContent = `${m}:${s}`;
  floating.querySelector("[data-timer-running]").textContent = timerRunning ? "Pause" : "Start";
  positionFloatingTimer(floating);
  wireFloatingDrag(floating);
}

function positionFloatingTimer(floating) {
  const x = Number.isFinite(state.timer.position.x) ? state.timer.position.x : window.innerWidth - 260;
  const y = Number.isFinite(state.timer.position.y) ? state.timer.position.y : window.innerHeight - 170;
  const clampedX = Math.max(12, Math.min(x, window.innerWidth - floating.offsetWidth - 12));
  const clampedY = Math.max(88, Math.min(y, window.innerHeight - floating.offsetHeight - 12));
  floating.style.left = `${clampedX}px`;
  floating.style.top = `${clampedY}px`;
}

function wireFloatingDrag(floating) {
  const handle = floating.querySelector(".floating-drag");
  if (!handle || handle.dataset.bound) return;
  handle.dataset.bound = "true";
  handle.addEventListener("pointerdown", event => {
    dragTimer = {
      offsetX: event.clientX - floating.offsetLeft,
      offsetY: event.clientY - floating.offsetTop
    };
    handle.setPointerCapture(event.pointerId);
    floating.classList.add("dragging");
  });
  handle.addEventListener("pointermove", event => {
    if (!dragTimer) return;
    state.timer.position.x = Math.max(12, Math.min(event.clientX - dragTimer.offsetX, window.innerWidth - floating.offsetWidth - 12));
    state.timer.position.y = Math.max(88, Math.min(event.clientY - dragTimer.offsetY, window.innerHeight - floating.offsetHeight - 12));
    floating.style.left = `${state.timer.position.x}px`;
    floating.style.top = `${state.timer.position.y}px`;
  });
  handle.addEventListener("pointerup", event => {
    if (!dragTimer) return;
    dragTimer = null;
    floating.classList.remove("dragging");
    handle.releasePointerCapture(event.pointerId);
    saveState();
  });
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(activeTimer);
    timerRunning = false;
    syncTimer();
    return;
  }
  if (state.route === "tools" && !state.timer.floatingStarted) {
    state.timer.floatingStarted = true;
    state.timer.floatingEnabled = true;
    saveState();
  }
  timerRunning = true;
  syncTimer();
  activeTimer = setInterval(() => {
    timerRemaining -= 1;
    if (timerRemaining <= 0) {
      timerMode = timerMode === "work" ? "break" : "work";
      timerRemaining = (timerMode === "work" ? state.timer.work : state.timer.break) * 60;
      const cue = document.getElementById("timerCue");
      if (cue) cue.textContent = timerMode === "work" ? "Break complete. Back to work." : "Work interval complete. Take a break.";
      playAlarm();
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

function previousFlash() {
  state.flashIndex = (state.flashIndex - 1 + flashcards.length) % flashcards.length;
  state.flashBack = false;
  saveState();
  render();
}

function nextFlash() {
  state.flashIndex = (state.flashIndex + 1) % flashcards.length;
  state.flashBack = false;
  saveState();
  render();
}

function shuffleFlashcards() {
  const currentCard = state.flashOrder[state.flashIndex % state.flashOrder.length];
  state.flashOrder = shuffle(flashcards.map((_, i) => i));
  if (state.flashOrder.length > 1 && state.flashOrder[0] === currentCard) {
    [state.flashOrder[0], state.flashOrder[1]] = [state.flashOrder[1], state.flashOrder[0]];
  }
  state.flashIndex = 0;
  state.flashBack = false;
  saveState();
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  const themeToggle = document.getElementById("themeToggle");
  const mobileThemeToggle = document.getElementById("mobileThemeToggle");
  document.getElementById("logoButton")?.addEventListener("click", () => routeTo("home"));
  document.querySelectorAll(".nav-link").forEach(b => b.addEventListener("click", () => routeTo(b.dataset.route)));
  document.querySelectorAll(".mobile-nav-link").forEach(b => b.addEventListener("click", () => routeTo(b.dataset.route)));
  themeToggle?.addEventListener("click", toggleTheme);
  mobileThemeToggle?.addEventListener("click", toggleTheme);
  document.getElementById("mobileMenuToggle")?.addEventListener("click", toggleMobileMenu);
  setTheme(state.dark);
  syncNavigation();
  syncMobileMenu();
  window.addEventListener("resize", () => renderFloatingTimer());
  render();
});
