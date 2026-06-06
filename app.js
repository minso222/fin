const STORE = "fin295-study-state-v1";
const FORMULA_PDF = "assets/fin-295-final-formula.pdf";
const GA_MEASUREMENT_ID = "G-9QBNY7JDGE";
const COOKIE_CONSENT_NAME = "fin295_cookie_consent";
const pageTitles = {
  home: "Home",
  sample: "Sample Test",
  generate: "Practice Test",
  formulas: "Formula Sheet",
  tools: "Study Tools",
  "ac300-review": "AC 300 Review Tests"
};

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
    id: "inflation-premium-n",
    chapter: "Chapter 6",
    source: "Chapter 6 notes",
    title: "Inflation Premium for N-Year Security",
    tex: "IP_N = \\frac{IP_1 + IP_2 + \\cdots + IP_N}{N}",
    plain: "Estimates the inflation premium as the average expected inflation rate over the security's life.",
    variables: "IP_N = inflation premium for an N-year security; IP_t = expected inflation in year t.",
    when: "Use when expected inflation varies across future years.",
    example: "If expected inflation is 4%, 5%, and 6%, IP_3 = (4% + 5% + 6%) / 3 = 5.00%."
  },
  {
    id: "corporate-bond-yield-spread",
    chapter: "Chapter 6",
    source: "Chapter 6 notes",
    title: "Corporate Bond Yield Spread",
    tex: "Spread = Corporate\\ bond\\ yield - Treasury\\ bond\\ yield",
    plain: "Measures the extra yield investors require for a corporate bond relative to a Treasury bond with similar maturity.",
    variables: "Corporate bond yield = yield on the risky bond; Treasury bond yield = yield on a comparable default-free bond.",
    when: "Use to isolate the risk premium over Treasury securities.",
    example: "If a corporate bond yields 8.2% and a comparable Treasury yields 5.4%, the spread is 2.8%."
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
    id: "current-yield",
    chapter: "Chapter 7",
    source: "Chapter 7 notes",
    title: "Current Yield",
    tex: "Current\\ Yield = \\frac{Annual\\ coupon\\ payment}{Current\\ bond\\ price}",
    plain: "Measures the annual coupon income as a percentage of the bond's current market price.",
    variables: "Annual coupon payment = yearly interest paid; Current bond price = market price today.",
    when: "Use when the question asks for the bond's income yield.",
    example: "A $90 annual coupon on a $1,125 bond gives current yield = 90 / 1125 = 8.00%."
  },
  {
    id: "bond-capital-gains-yield",
    chapter: "Chapter 7",
    source: "Chapter 7 notes",
    title: "Capital Gains Yield",
    tex: "Capital\\ Gains\\ Yield = \\frac{P_1-P_0}{P_0}",
    plain: "Measures the percentage price change expected over the holding period.",
    variables: "P_0 = current bond price; P_1 = expected bond price at the end of the period.",
    when: "Use when a bond price is expected to move toward par or another future price.",
    example: "If a bond rises from $960 to $980, capital gains yield = 20 / 960 = 2.08%."
  },
  {
    id: "expected-total-return-ytm",
    chapter: "Chapter 7",
    source: "Chapter 7 notes",
    title: "Expected Total Return / YTM",
    tex: "Expected\\ Total\\ Return = Current\\ Yield + Capital\\ Gains\\ Yield \\approx YTM",
    plain: "Adds coupon income yield and expected price-change yield to approximate the bond's total return.",
    variables: "Current yield = coupon income / price; Capital gains yield = expected price change / price.",
    when: "Use to connect the components of bond return with yield to maturity.",
    example: "If current yield is 7.5% and capital gains yield is 1.2%, expected total return is about 8.7%."
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
    id: "dcf-cost-of-equity",
    chapter: "Chapter 10",
    source: "Chapter 10 notes",
    title: "DCF Cost of Equity",
    tex: "r_s = \\frac{D_1}{P_0} + g",
    plain: "Estimates the cost of common equity as dividend yield plus constant growth.",
    variables: "D_1 = next expected dividend; P_0 = current stock price; g = constant growth rate.",
    when: "Use the discounted cash flow approach when dividends and growth are given.",
    example: "If D1 = $2.40, P0 = $40, and g = 5%, r_s = 2.40 / 40 + 5% = 11.00%."
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
    id: "bond-yield-plus-risk-premium",
    chapter: "Chapter 10",
    source: "Chapter 10 notes",
    title: "Bond-Yield-Plus-Risk-Premium",
    tex: "r_s = Bond\\ yield + Risk\\ premium",
    plain: "Estimates the cost of common equity by adding an equity risk premium to the firm's long-term bond yield.",
    variables: "Bond yield = yield on the firm's long-term debt; Risk premium = extra return required for equity risk.",
    when: "Use when the bond-yield-plus-risk-premium approach is specified.",
    example: "If the firm's bond yield is 7% and the risk premium is 4%, r_s = 11%."
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

const ac300Questions = [
  // ─── Chapter 1 ───────────────────────────────────────────────────────────────
  { id: "ac1_01", chapter: "Chapter 1", type: "tf", source: "Spiceland Ed.11 T/F Q9",
    prompt: "The income statement summarizes the operating activity of a company at a particular point in time.",
    choices: ["True.", "False."],
    answer: 1, solution: "False. The income statement covers a PERIOD of time (e.g., 'For the Year Ended December 31'). The balance sheet is the snapshot at a specific point in time; the income statement spans a reporting period." },
  { id: "ac1_02", chapter: "Chapter 1", type: "tf", source: "Spiceland Ed.11 T/F Q10",
    prompt: "Operating items include revenues and expenses directly related to the primary revenue-generating activities of the company.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. Operating items on the income statement include revenues and expenses from the company's central, ongoing operations—those directly tied to delivering its primary goods or services. Non-operating items (interest, gains/losses on peripheral activities) are presented separately." },
  { id: "ac1_03", chapter: "Chapter 1", type: "tf", source: "Spiceland Ed.11 T/F Q12",
    prompt: "The statement of cash flows summarizes transactions that caused cash to change during a reporting period.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. The statement of cash flows explains how the cash balance changed from the beginning to the end of the period by classifying all cash receipts and payments into operating, investing, and financing activities." },
  { id: "ac1_04", chapter: "Chapter 1", type: "tf", source: "Spiceland Ed.11 T/F Q13",
    prompt: "The statement of shareholders' equity discloses the changes in the temporary shareholders' equity accounts.",
    choices: ["True.", "False."],
    answer: 1, solution: "False. Shareholders' equity accounts (common stock, additional paid-in capital, retained earnings) are PERMANENT accounts—they carry forward and are never closed at year-end. The statement of shareholders' equity shows changes in these permanent equity components." },

  // ─── Chapter 2 ───────────────────────────────────────────────────────────────
  { id: "ac2_01", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q1",
    prompt: "Shareholders' equity can be expressed as assets minus liabilities.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. The basic accounting equation is Assets = Liabilities + Shareholders' Equity. Rearranging: Shareholders' Equity = Assets − Liabilities. Equity represents the owners' residual interest after all obligations are satisfied." },
  { id: "ac2_02", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q2",
    prompt: "Debits increase asset accounts and decrease liability accounts.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. Debits (left-side entries) increase assets and expenses, and decrease liabilities, equity, and revenues. Credits do the opposite. This is the foundation of double-entry accounting." },
  { id: "ac2_03", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q4",
    prompt: "After an unadjusted trial balance is prepared, the next step in the accounting processing cycle is the preparation of financial statements.",
    choices: ["True.", "False."],
    answer: 1, solution: "False. The next step after the unadjusted trial balance is to record ADJUSTING JOURNAL ENTRIES. Only after adjusting entries are posted and an adjusted trial balance is prepared can financial statements be prepared." },
  { id: "ac2_04", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q5",
    prompt: "Adjusting journal entries are recorded at the end of any period when financial statements are prepared.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. Adjusting entries are made at the end of each accounting period to ensure revenues are recognized when earned and expenses when incurred under the accrual basis, regardless of cash flow timing." },
  { id: "ac2_05", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q6",
    prompt: "Accruals occur when the cash flow precedes either revenue or expense recognition.",
    choices: ["True.", "False."],
    answer: 1, solution: "False. This describes DEFERRALS (prepayments), not accruals. Accruals occur when revenue is earned or an expense is incurred BEFORE cash changes hands (e.g., accrued wages payable, accrued interest receivable)." },
  { id: "ac2_06", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q7",
    prompt: "Some companies prefer to record external transactions involving prepayments directly into an expense or revenue account rather than creating an asset or liability at the time of the prepayment.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. Both approaches are acceptable under GAAP. A company may debit an expense account instead of a prepaid asset when paying for a future benefit; a year-end adjusting entry then shifts the unexpired portion to a prepaid asset. Reversing entries at the start of the next period are commonly used with this approach." },
  { id: "ac2_07", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q8",
    prompt: "The adjusted trial balance contains only permanent accounts.",
    choices: ["True.", "False."],
    answer: 1, solution: "False. The ADJUSTED trial balance contains both temporary accounts (revenues, expenses, dividends) and permanent accounts (assets, liabilities, equity). It is the POST-CLOSING trial balance that contains only permanent accounts, after temporary accounts are closed." },
  { id: "ac2_08", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q14",
    prompt: "The post-closing trial balance contains only permanent accounts.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. After closing entries zero out all temporary accounts (revenues, expenses, dividends), only the permanent accounts (assets, liabilities, retained earnings, and other equity) remain with balances, forming the post-closing trial balance." },
  { id: "ac2_09", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q15",
    prompt: "The closing process brings all temporary accounts to a zero balance and updates the balance in the retained earnings account.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. Closing entries transfer the balances of all temporary accounts (revenues, expenses, dividends declared) to Retained Earnings, resetting them to zero so each new period begins fresh." },
  { id: "ac2_10", chapter: "Chapter 2", type: "tf", source: "Spiceland Ed.11 T/F Q16",
    prompt: "A reversing entry at the beginning of a period for salaries would include a debit to salaries expense.",
    choices: ["True.", "False."],
    answer: 0, solution: "True. When a company uses the approach of initially recording prepayments directly to an expense account, the year-end adjusting entry shifts the unexpired amount to a prepaid asset (crediting the expense). The reversing entry at the start of the next period debits salaries expense and credits the prepaid asset, restoring the original approach." },
  { id: "ac2_11", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q19",
    prompt: "The accounting equation can be stated as:",
    choices: ["A + L - SE = 0.", "A - L + SE = 0.", "-A + L - SE = 0.", "A - L - SE = 0."],
    answer: 3, solution: "Starting from A = L + SE, rearranging: A − L − SE = 0. This is the only option that correctly reduces to 0 when the equation is in balance." },
  { id: "ac2_12", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q20",
    prompt: "The accounting equation can be stated as:",
    choices: ["A - L = -SE.", "A + L = SE.", "A - L = SE.", "A = L - SE."],
    answer: 2, solution: "From A = L + SE, subtracting L from both sides gives A − L = SE. Shareholders' equity equals the excess of assets over liabilities—the owners' residual interest." },
  { id: "ac2_13", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q21",
    prompt: "The equation that shows a company's total economic resources equal claims to those resources by creditors and owners is:",
    choices: ["Revenues - Expenses = Net Income.", "Cash Increases - Cash Decreases = Change in Cash.", "Common Stock + Retained Earnings = Shareholders' Equity.", "Assets = Liabilities + Shareholders' Equity."],
    answer: 3, solution: "Assets = Liabilities + Shareholders' Equity is the accounting equation. Assets represent total economic resources; liabilities are creditors' claims and shareholders' equity represents owners' claims on those resources." },
  { id: "ac2_14", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q22",
    prompt: "When a company pays employees' salaries for the current period, how will the basic accounting equation be affected?",
    choices: ["Shareholders' equity decreases.", "Revenues decrease.", "Expenses decrease.", "Liabilities increase."],
    answer: 0, solution: "Paying salaries: Dr. Salaries Expense, Cr. Cash. The expense reduces net income, which reduces Retained Earnings—a shareholders' equity component. Revenues and liabilities are unaffected." },
  { id: "ac2_15", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q23",
    prompt: "When a company declares and then pays shareholders a dividend on the same date, what is the effect on the accounting equation for that company?",
    choices: ["Decrease shareholders' equity and increase assets.", "Increase liabilities and increase assets.", "Decrease assets and decrease liabilities.", "Decrease assets and decrease shareholders' equity."],
    answer: 3, solution: "Dr. Retained Earnings (decreases SE), Cr. Cash (decreases assets). There is no effect on liabilities. Both assets and shareholders' equity decrease by the same amount." },
  { id: "ac2_16", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q24",
    prompt: "A company sold $500 in inventory to a customer on account on January 1. On January 11, the company collected the cash from that customer. What is the impact on the accounting equation from the collection of cash on January 11?",
    choices: ["No net effect to the accounting equation.", "Decrease assets and increase liabilities.", "Increase assets and increase liabilities.", "Decrease assets and decrease liabilities."],
    answer: 0, solution: "Dr. Cash (+asset), Cr. Accounts Receivable (−asset). One asset increases while another decreases by the same amount—no net change to total assets, liabilities, or equity." },
  { id: "ac2_17", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q25",
    prompt: "Which of the following would increase assets and increase liabilities?",
    choices: ["Provide services to customers on account.", "Purchase office supplies on account.", "Pay dividends to shareholders.", "Receive a utility bill for the current month, which is set aside for payment next month."],
    answer: 1, solution: "Purchasing supplies on account: Dr. Supplies (+asset), Cr. Accounts Payable (+liability). Providing services on account increases assets and equity (revenue). Paying dividends decreases assets and equity. Accruing a utility bill increases expenses (reduces equity) and liabilities—not assets." },
  { id: "ac2_18", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q26",
    prompt: "An expense has what effect on the accounting equation?",
    choices: ["Decrease liabilities.", "Decrease shareholders' equity.", "Increase assets.", "No effect on the accounting equation."],
    answer: 1, solution: "Expenses reduce net income, which reduces Retained Earnings—a component of shareholders' equity. They do not directly decrease liabilities or increase assets." },
  { id: "ac2_19", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q27",
    prompt: "Revenues have what effect on the accounting equation?",
    choices: ["Increase liabilities.", "Decrease assets.", "Increase shareholders' equity.", "No effect."],
    answer: 2, solution: "Revenues increase net income, which increases Retained Earnings—a component of shareholders' equity. Revenues also typically increase assets (cash or receivables) to keep the equation balanced." },
  { id: "ac2_20", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q28",
    prompt: "Investments by shareholders have what effect on the accounting equation?",
    choices: ["Assets increase and liabilities increase.", "Expenses increase and liabilities increase.", "Assets increase and revenues increase.", "Assets increase and shareholders' equity increases."],
    answer: 3, solution: "When shareholders invest, the company receives cash (Dr. Cash = +asset) and records paid-in capital (Cr. Common Stock/APIC = +SE). No liability or revenue is affected." },
  { id: "ac2_21", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q29",
    prompt: "Providing services and receiving cash concurrently will:",
    choices: ["increase assets and increase shareholders' equity.", "increase assets and increase liabilities.", "decrease assets and increase liabilities.", "decrease liabilities and increase shareholders' equity."],
    answer: 0, solution: "Dr. Cash (+asset), Cr. Service Revenue (+SE via retained earnings). Assets increase (cash) and shareholders' equity increases (revenue recognized). No liability is involved." },
  { id: "ac2_22", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q30",
    prompt: "Borrowing cash from the bank would have what effect on the accounting equation?",
    choices: ["Assets increase and shareholders' equity increases.", "Assets increase and liabilities increase.", "Liabilities increase and shareholders' equity decreases.", "Liabilities decrease and shareholders' equity increases."],
    answer: 1, solution: "Dr. Cash (+asset), Cr. Notes Payable (+liability). Borrowing increases assets (cash received) and liabilities (obligation to repay) by equal amounts. Shareholders' equity is unaffected." },
  { id: "ac2_23", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q31",
    prompt: "Paying for supplies previously purchased would have what effect on the accounting equation?",
    choices: ["Assets decrease and shareholders' equity decreases.", "Assets increase and liabilities increase.", "Liabilities decrease and shareholders' equity increases.", "Assets decrease and liabilities decrease."],
    answer: 3, solution: "If supplies were bought on account previously (Dr. Supplies, Cr. A/P), paying now is: Dr. Accounts Payable (−liability), Cr. Cash (−asset). Assets and liabilities both decrease; equity is unchanged." },
  { id: "ac2_24", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q32",
    prompt: "Purchasing office equipment on account has what impact on the accounting equation?",
    choices: ["Shareholders' equity decreases and assets increase.", "Liabilities increase and assets increase.", "Assets decrease and liabilities decrease.", "Assets increase and shareholders' equity increases."],
    answer: 1, solution: "Dr. Equipment (+asset), Cr. Accounts Payable (+liability). Both assets and liabilities increase by the same amount; shareholders' equity is not affected." },
  { id: "ac2_25", chapter: "Chapter 2", type: "computational", source: "Spiceland Ed.11 MC Q33",
    prompt: "Following are transactions of a new company during January: Issued 11,900 shares of common stock for $23,800 cash. Purchased land for $13,900 by signing a note payable for the full amount. Purchased office equipment for $3,100 cash. Received cash of $15,900 for services provided to customers. Purchased $400 of office supplies on account. Paid employees $11,900 for work during the period. What is the total amount of liabilities following these six transactions?",
    choices: ["$26,600.", "$19,400.", "$38,100.", "$14,300."],
    answer: 3, solution: "Liabilities arise from two transactions: note payable for land = $13,900 and accounts payable for supplies = $400. Total = $13,900 + $400 = $14,300. The stock issuance, cash purchases, revenue, and salary payment do not create liabilities." },
  { id: "ac2_26", chapter: "Chapter 2", type: "computational", source: "Spiceland Ed.11 MC Q34",
    prompt: "Following are transactions of a new company during January: Issued 10,000 shares of common stock for $15,000 cash. Purchased land for $12,000 by signing a note payable for the full amount. Purchased office equipment for $1,200 cash. Received cash of $14,000 for services provided to customers. Purchased $300 of office supplies on account. Paid employees $10,000 for work during the period. What is the total amount of liabilities following these six transactions?",
    choices: ["$12,300.", "$27,300.", "$22,600.", "$15,500."],
    answer: 0, solution: "Note payable for land = $12,000; accounts payable for supplies = $300. Total liabilities = $12,000 + $300 = $12,300. All other transactions affect cash and equity without creating liabilities." },
  { id: "ac2_27", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q35",
    prompt: "How many of the following transactions would increase total assets in the current period? (1) Collect cash from customer prior to providing service. (2) Provide services to customer and receive cash at time of service. (3) Provide services on account to customer. (4) Collect cash from customer for services provided previously on account.",
    choices: ["One.", "Two.", "Three.", "Four."],
    answer: 2, solution: "Transactions 1–3 all increase total assets: (1) Cash+, Unearned Revenue+; (2) Cash+, Revenue+; (3) A/R+, Revenue+. Transaction (4) swaps A/R for Cash—assets reclassify, no net increase." },
  { id: "ac2_28", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q36",
    prompt: "How many of the following transactions would increase total shareholders' equity in the current period? (1) Declare and pay dividends to shareholders on the same date. (2) Delay payment on supplies purchased until the following period. (3) Provide services on account to customers. (4) Borrow cash from a local bank.",
    choices: ["One.", "Two.", "Three.", "Four."],
    answer: 0, solution: "Only (3) increases SE by recognizing service revenue → Retained Earnings. (1) Dividends decrease SE. (2) Supplies on account: assets+, liabilities+, no SE effect. (4) Borrow cash: assets+, liabilities+, no SE effect." },
  { id: "ac2_29", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q37",
    prompt: "How many of the following transactions would decrease total shareholders' equity in the current period? (1) Declare and pay dividends to shareholders on the same date. (2) Delay payment on supplies purchased until the following period. (3) Provide services on account to customers. (4) Borrow cash from a local bank.",
    choices: ["One.", "Two.", "Three.", "Four."],
    answer: 0, solution: "Only (1) decreases SE—paying dividends reduces Retained Earnings. (2) No SE effect. (3) Increases SE via revenue. (4) Assets and liabilities both increase, no SE effect." },
  { id: "ac2_30", chapter: "Chapter 2", type: "computational", source: "Spiceland Ed.11 MC Q38",
    prompt: "If the liabilities of a company increased by $77,000 during a month and the shareholders' equity decreased by $41,000 during that same month, did assets increase or decrease and by how much?",
    choices: ["$36,000 increase.", "$77,000 increase.", "$118,000 increase.", "$36,000 decrease."],
    answer: 0, solution: "From A = L + SE: ΔAssets = ΔLiabilities + ΔSE = +$77,000 + (−$41,000) = +$36,000 increase." },
  { id: "ac2_31", chapter: "Chapter 2", type: "computational", source: "Spiceland Ed.11 MC Q39",
    prompt: "If the liabilities of a company increased by $55,000 during a month and the shareholders' equity decreased by $21,000 during that same month, did assets increase or decrease and by how much?",
    choices: ["$34,000 increase.", "$55,000 increase.", "$34,000 decrease.", "$76,000 increase."],
    answer: 0, solution: "ΔAssets = ΔLiabilities + ΔSE = +$55,000 + (−$21,000) = +$34,000 increase." },
  { id: "ac2_32", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q40",
    prompt: "Examples of external transactions include all of the following except:",
    choices: ["Paying employee salaries.", "Purchasing equipment.", "Depreciating equipment.", "Collecting a receivable."],
    answer: 2, solution: "Depreciating equipment is an INTERNAL event—no exchange with an outside party. It is recorded via an adjusting entry. Paying salaries, purchasing equipment, and collecting receivables all involve external parties." },
  { id: "ac2_33", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q41",
    prompt: "Which of the following is true about a 'debit'? I. It is part of the double-entry system. II. It represents an increase to asset account balances. III. It represents a decrease to liability account balances. IV. It is on the right side of an account.",
    choices: ["I and II.", "IV only.", "I, II, and III.", "I, II, III, and IV."],
    answer: 2, solution: "Statements I, II, and III are all true. Statement IV is FALSE—debits are on the LEFT side of a T-account. Credits are on the right side." },
  { id: "ac2_34", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q42",
    prompt: "Which of the following is true about a 'credit'? I. It is part of the double-entry system. II. It represents a decrease to asset account balances. III. It represents an increase to liability account balances. IV. It is on the right side of an account.",
    choices: ["I and II.", "IV only.", "I, II, and III.", "I, II, III, and IV."],
    answer: 3, solution: "All four statements are TRUE. Credits are on the RIGHT side of a T-account (IV), decrease assets (II), increase liabilities (III), and are part of the double-entry system (I)." },
  { id: "ac2_35", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q43",
    prompt: "An asset account increases with a _____________; a liability account increases with a _____________.",
    choices: ["debit; debit.", "credit; debit.", "debit; credit.", "credit; credit."],
    answer: 2, solution: "Assets are on the left side of the equation and increase with debits. Liabilities are on the right side and increase with credits. Normal debit balances: assets, expenses, dividends. Normal credit balances: liabilities, equity, revenues." },
  { id: "ac2_36", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q44",
    prompt: "An expense account increases with a _____________; a revenue account increases with a _____________.",
    choices: ["debit; debit.", "debit; credit.", "credit; debit.", "credit; credit."],
    answer: 1, solution: "Expense accounts (which reduce equity) increase with debits—same side as assets. Revenue accounts (which increase equity) increase with credits—same side as liabilities and equity." },
  { id: "ac2_37", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q45",
    prompt: "An asset account increases with a _____________ and decreases with a _____________.",
    choices: ["debit; debit.", "credit; debit.", "debit; credit.", "credit; credit."],
    answer: 2, solution: "Asset accounts have normal debit balances: they INCREASE with debits and DECREASE with credits. This is opposite to liability and equity accounts, which have normal credit balances." },
  { id: "ac2_38", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q46",
    prompt: "The accounting processing cycle is best described as:",
    choices: ["A three-wheeled vehicle used to deliver audit papers to clients.", "A process that deals only with internal transactions.", "The process of bringing the company's financial information up to date before preparing the financial statements.", "The process used to identify, analyze, record, and summarize transactions and prepare financial statements."],
    answer: 3, solution: "The accounting processing cycle covers all steps from identifying transactions through preparing financial statements and closing: analyze → journalize → post → trial balance → adjust → adjusted trial balance → financial statements → close." },
  { id: "ac2_39", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q47",
    prompt: "External transactions include all of the following except:",
    choices: ["paying rent.", "purchasing equipment.", "using office supplies.", "collecting an account receivable."],
    answer: 2, solution: "Using (consuming) office supplies is an INTERNAL event recorded via an adjusting entry—no outside party is involved. Paying rent (landlord), purchasing equipment (supplier), and collecting receivables (customer) all involve external parties." },
  { id: "ac2_40", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q48",
    prompt: "Which step in the process of measuring external transactions involves assessing the equality of total debits and total credits for the period?",
    choices: ["Obtain information from source documents.", "Prepare an unadjusted trial balance.", "Analyze the transaction.", "Post from the journal to the general ledger accounts."],
    answer: 1, solution: "The unadjusted trial balance lists all accounts and balances to verify total debits = total credits. It is prepared after all external transactions are journalized and posted, but before adjusting entries." },
  { id: "ac2_41", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q49",
    prompt: "Which step in the process of measuring external transactions involves determining the effect on assets, liabilities, and shareholders' equity?",
    choices: ["Obtain information about external transactions from source documents.", "Prepare an unadjusted trial balance.", "Analyze the transaction.", "Post from journal to the general ledger accounts."],
    answer: 2, solution: "Analyzing the transaction means determining which accounts are affected, whether each is debited or credited, and by how much—assessing the impact on A, L, and SE before recording the journal entry." },
  { id: "ac2_42", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q50",
    prompt: "Which of the following is a source document for gathering information about a transaction?",
    choices: ["Trial balance.", "Income statement.", "Sales invoice.", "General ledger."],
    answer: 2, solution: "A sales invoice is generated when goods or services are sold and serves as a source document. Trial balances, financial statements, and the general ledger are accounting records derived from source documents, not source documents themselves." },
  { id: "ac2_43", chapter: "Chapter 2", type: "theory", source: "Spiceland Ed.11 MC Q51",
    prompt: "Which of the following best describes a purpose of source documents?",
    choices: ["Provide information related to external transactions, such as date and amount.", "Used by accountants to record transactions in specific accounts.", "Keep a record of transactions between the company and its vendors, customers, and other parties.", "All of the other answers provide a correct statement."],
    answer: 3, solution: "All three descriptions are accurate purposes of source documents: they provide transaction details, guide accountants in recording entries, and serve as the evidentiary record for transactions with external parties." },

  // ─── Chapter 3 ───────────────────────────────────────────────────────────────
  { id: "ac3_01", chapter: "Chapter 3", type: "tf", source: "Spiceland Ed.11 T/F Q3",
    prompt: "Balance sheet accounts are referred to as temporary accounts because their balances are always changing.",
    choices: ["True.", "False."],
    answer: 1, solution: "False. Balance sheet accounts (assets, liabilities, stockholders' equity) are PERMANENT accounts—their balances carry forward from period to period and are never closed. Temporary accounts are income statement accounts (revenues, expenses) and dividends, which are zeroed out each period." },
  { id: "ac3_02", chapter: "Chapter 3", type: "tf", source: "Spiceland Ed.11 T/F Q11",
    prompt: "The balance sheet can be considered a change or flow statement.",
    choices: ["True.", "False."],
    answer: 1, solution: "False. The balance sheet is a POINT-IN-TIME (stock) statement, not a flow statement. It reports financial position as of a specific date. The income statement and statement of cash flows are flow statements that cover a period of time." }
];

const state = {
  route: "home",
  dark: false,
  sampleFilter: null,
  sample: { index: 0, attempts: {}, solved: {}, wrong: {} },
  generated: null,
  generatedCount: 22,
  generatedRun: { index: 0, attempts: {}, solved: {}, wrong: {}, first: {} },
  timer: { ...timerDefaults },
  flashIndex: 0,
  flashOrder: [],
  flashBack: false,
  formulaOpen: {},
  formulaSearch: "",
  bookmarkedFormulas: {},
  weakQuestions: {},
  quizFormulaOpen: false,
  formulaReturn: null,
  contactRevealed: {},
  mobileMenuOpen: false,
  calc: { display: "0", expr: "", tvm: { N: null, IY: null, PV: null, PMT: null, FV: null } },
  ac300: { chapter: null, run: { index: 0, attempts: {}, solved: {}, wrong: {}, first: {} } }
};

let activeTimer = null;
let timerRemaining = 25 * 60;
let timerMode = "work";
let timerRunning = false;
let dragTimer = null;
let alarmPreviewAudio = null;
let alarmPreviewContext = null;
let alarmPreviewPlaying = false;
let animateNextRender = true;

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
    state.generatedRun = { index: 0, attempts: {}, solved: {}, wrong: {}, first: {} };
  }
  if (!state.generatedRun.wrong) state.generatedRun.wrong = {};
  if (!state.generatedRun.first) state.generatedRun.first = {};
  state.generatedCount = Math.max(5, Math.min(32, Number(state.generatedCount) || 22));
  if (state.sampleFilter === undefined) state.sampleFilter = null;
  if (!Array.isArray(state.flashOrder) || state.flashOrder.length !== flashcards.length) {
    state.flashOrder = flashcards.map((_, i) => i);
  }
  if (!state.formulaOpen || typeof state.formulaOpen !== "object") state.formulaOpen = {};
  if (typeof state.formulaSearch !== "string") state.formulaSearch = "";
  if (!state.bookmarkedFormulas || typeof state.bookmarkedFormulas !== "object") state.bookmarkedFormulas = {};
  if (!state.weakQuestions || typeof state.weakQuestions !== "object") state.weakQuestions = {};
  state.quizFormulaOpen = !!state.quizFormulaOpen;
  if (!["sample", "generated"].includes(state.formulaReturn)) state.formulaReturn = null;
  if (!state.contactRevealed || typeof state.contactRevealed !== "object") state.contactRevealed = {};
  state.mobileMenuOpen = false;
  state.ac300 = {
    chapter: saved.ac300?.chapter ?? null,
    run: { index: 0, attempts: {}, solved: {}, wrong: {}, first: {}, ...(saved.ac300?.run || {}) }
  };
  if (typeof state.ac300.run.index !== "number") state.ac300.run.index = 0;
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
    generatedCount: state.generatedCount,
    generatedRun: state.generatedRun,
    timer: state.timer,
    flashIndex: state.flashIndex,
    flashOrder: state.flashOrder,
    formulaOpen: state.formulaOpen,
    formulaSearch: state.formulaSearch,
    bookmarkedFormulas: state.bookmarkedFormulas,
    weakQuestions: state.weakQuestions,
    quizFormulaOpen: state.quizFormulaOpen,
    formulaReturn: state.formulaReturn,
    contactRevealed: state.contactRevealed,
    ac300: state.ac300
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

function makeConceptQ(id, type, source, formulaIds, prompt, choices, answer, solution) {
  return { id, type, source, formulaIds, prompt, choices, answer, solution };
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

  const extraBondRate = 0.071, extraMarket = 0.063, extraYears = 9, extraPmt = 1000 * extraBondRate;
  const q33 = makeQ("g33", "bond", "Chapter 7 bond valuation practice", ["bond-price"], `A ${extraYears}-year bond has a ${pct(extraBondRate * 100)} annual coupon, $1,000 par, and rd = ${pct(extraMarket * 100)}. What is its price?`, pvAnnuity(extraMarket, extraYears, extraPmt, 1000), money, `Value the bond as the present value of ${extraYears} coupon payments plus par.`);

  const extraD1 = 1.35, extraRs = 0.104, extraG = 0.058;
  const q34 = makeQ("g34", "stock", "Chapter 9 constant growth practice", ["constant-growth"], `A stock will pay D1 = ${money(extraD1)}. Required return is ${pct(extraRs * 100)} and constant growth is ${pct(extraG * 100)}. What is P0?`, extraD1 / (extraRs - extraG), money, `Use \\(P_0=D_1/(r_s-g)\\).`);

  const extraCapm = 4.6 + 6.8 * 0.9;
  const q35 = makeQ("g35", "capm", "Chapter 10 CAPM practice", ["capm"], `Using CAPM, rRF = 4.60%, RPM = 6.80%, and beta = 0.90. What is rs?`, extraCapm, pct, `\\(r_s=4.60\\%+6.80\\%(0.90)=${pct(extraCapm)}\\).`);

  const extraWacc = 0.45 * 5.8 + 0.05 * 8.5 + 0.50 * 11.2;
  const q36 = makeQ("g36", "wacc", "Chapter 10 WACC practice", ["wacc"], `A firm uses 45% after-tax debt at 5.80%, 5% preferred at 8.50%, and 50% equity at 11.20%. What is WACC?`, extraWacc, pct, `\\(WACC=.45(5.80\\%)+.05(8.50\\%)+.50(11.20\\%)=${pct(extraWacc)}\\).`);

  const fixed = [
    { ...sampleQuestions[3], id: "g4" }, { ...sampleQuestions[6], id: "g7" }, { ...sampleQuestions[7], id: "g8" },
    { ...sampleQuestions[12], id: "g13" }, { ...sampleQuestions[13], id: "g14" }, { ...sampleQuestions[17], id: "g18" },
    { ...sampleQuestions[18], id: "g19" }, { ...sampleQuestions[21], id: "g22" }
  ];

  const commonEquity = 4200000, shares = 400000, marketPrice = 24.75;
  const bookValue = commonEquity / shares;
  const q23 = makeQ("g23", "midterm-market-book", "Midterm sample test Q4", ["mb"], `A firm has total common equity of ${money(commonEquity)} and ${shares.toLocaleString()} shares outstanding. If the stock sells for ${money(marketPrice)} per share, by how much do market value and book value per share differ?`, marketPrice - bookValue, money, `Book value per share is ${money(commonEquity)}/${shares.toLocaleString()}=${money(bookValue)}. Difference = ${money(marketPrice)} - ${money(bookValue)} = ${money(marketPrice - bookValue)}.`);

  const mvaShares = 3, mvaPrice = 16, mvaBook = 9100000;
  const q24 = makeQ("g24", "midterm-mva", "Midterm sample test Q5", ["mva"], `A company has ${mvaShares} million common shares outstanding selling for ${money(mvaPrice)} each. If common equity on the balance sheet is ${money(mvaBook)}, what is MVA?`, mvaShares * 1000000 * mvaPrice - mvaBook, money, `MVA = market value of equity - book value = ${mvaShares} million x ${money(mvaPrice)} - ${money(mvaBook)}.`);

  const evaEbit = 1420000, evaTax = 0.24, evaCapital = 9200000, evaCost = 0.095;
  const eva = evaEbit * (1 - evaTax) - evaCapital * evaCost;
  const q25 = makeQ("g25", "midterm-eva", "Midterm sample test Q6", ["eva"], `A company reports EBIT of ${money(evaEbit)}, tax rate ${pct(evaTax * 100)}, total invested capital of ${money(evaCapital)}, and after-tax cost of capital of ${pct(evaCost * 100)}. What is EVA?`, eva, money, `EVA = EBIT(1-T) - invested capital × cost of capital = ${money(eva)}.`);

  const roeNi = 84000, roeEquity = 480000;
  const q26 = makeQ("g26", "midterm-roe", "Midterm sample test Q10", ["roe-basic"], `A firm's total common equity was ${money(roeEquity)} and net income was ${money(roeNi)}. What was ROE?`, roeNi / roeEquity * 100, pct, `ROE = Net Income / Total Equity = ${money(roeNi)} / ${money(roeEquity)} = ${pct(roeNi / roeEquity * 100)}.`);

  const annuityN = 8, annuityPmt = 6200, annuityRate = 0.052;
  const q27 = makeQ("g27", "midterm-pv-annuity", "Midterm sample test Q14", ["pv"], `What is the present value of an ordinary annuity with ${annuityN} payments of ${money(annuityPmt)} if the appropriate interest rate is ${pct(annuityRate * 100)}?`, pvAnnuity(annuityRate, annuityN, annuityPmt), money, `Discount the ordinary annuity payments at ${pct(annuityRate * 100)} for ${annuityN} periods.`);

  const perpPmt = 95, perpPrice = 1760;
  const q28 = makeQ("g28", "midterm-perpetuity", "Midterm sample test Q15", [], `What rate of return would you earn if you paid ${money(perpPrice)} for a perpetuity that pays ${money(perpPmt)} per year?`, perpPmt / perpPrice * 100, pct, `Perpetuity return = payment / price = ${money(perpPmt)} / ${money(perpPrice)}.`);

  const pvRate = 0.128, stream = [650, 1850, 2900, 4100];
  const streamPv = npv(pvRate, stream);
  const q29 = makeQ("g29", "midterm-cash-flow-pv", "Midterm sample test Q16", ["pv"], `What is the present value of cash flows Year 0 = ${money(stream[0])}, Year 1 = ${money(stream[1])}, Year 2 = ${money(stream[2])}, and Year 3 = ${money(stream[3])} at ${pct(pvRate * 100)}?`, streamPv, money, `Discount each cash flow at ${pct(pvRate * 100)} and sum the present values.`);

  const q30 = makeConceptQ("g30", "midterm-concept", "Midterm sample test Q1-Q3", [], "Which item is NOT normally considered a current asset?", ["Inventory.", "Cash.", "Bonds.", "Accounts receivable.", "Short-term marketable securities."], 2, "Bonds are generally long-term financial assets, while the other listed items are normally current assets.");
  const q31 = makeConceptQ("g31", "midterm-concept", "Midterm sample test Q2", [], "Money markets are markets for:", ["Long-term bonds.", "Short-term debt securities such as Treasury bills and commercial paper.", "Common stocks.", "Consumer automobile loans.", "Foreign currencies."], 1, "Money markets trade short-term debt securities.");
  const q32 = makeConceptQ("g32", "midterm-concept", "Midterm sample test Q7", ["current-ratio"], "Considered alone, which action would increase a company's current ratio?", ["An increase in notes payable.", "An increase in accounts payable.", "An increase in accounts receivable.", "An increase in accrued liabilities.", "An increase in net fixed assets."], 2, "Accounts receivable increases current assets, which can raise current ratio if current liabilities are unchanged.");

  return [q1, q2, q3, fixed[0], q5, q6, fixed[1], fixed[2], q9, q10, q11, q12, fixed[3], fixed[4], q15, q16, q17, fixed[5], fixed[6], q20, q21, fixed[7], q33, q34, q35, q36, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32];
}

function getQuestionsForKind(kind) {
  if (kind === "generated") return state.generated;
  if (kind === "ac300") return ac300Questions.filter(q => q.chapter === "Chapter " + state.ac300.chapter);
  if (state.sampleFilter) return sampleQuestions.filter(q => q.source.includes(state.sampleFilter));
  return sampleQuestions;
}

function getRunForKind(kind) {
  if (kind === "sample") return state.sample;
  if (kind === "ac300") return state.ac300.run;
  return state.generatedRun;
}

function allKnownQuestions() {
  const generated = Array.isArray(state.generated) ? state.generated : [];
  return [...sampleQuestions, ...generated, ...ac300Questions];
}

function questionChapter(question) {
  const match = question?.source?.match(/Chapter\s+\d+/);
  return match ? match[0] : "Mixed Review";
}

function questionLabel(question) {
  if (!question) return "Question";
  const text = question.prompt.replace(/\s+/g, " ").trim();
  return text.length > 96 ? `${text.slice(0, 96)}...` : text;
}

function normalizeQuestionType(type) {
  return String(type || "Concept").split("-").map(part => part ? part[0].toUpperCase() + part.slice(1) : part).join(" ");
}

function typeMatchesQuestion(candidate, question) {
  if (candidate.type === question.type) return true;
  const overlap = candidate.formulaIds?.some(id => question.formulaIds?.includes(id));
  return !!overlap;
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

function routeTo(route, options = {}) {
  if (document.activeElement?.closest?.(".sidebar, .mobile-menu")) {
    document.activeElement.blur();
  }
  animateNextRender = true;
  if (!options.keepFormulaReturn) state.formulaReturn = null;
  state.route = route;
  state.mobileMenuOpen = false;
  syncNavigation();
  syncMobileMenu();
  saveState();
  render();
  trackPageView();
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(`${name}=`))
    ?.split("=")[1] || "";
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookieConsent() {
  const value = getCookie(COOKIE_CONSENT_NAME);
  return value === "accepted" || value === "declined" ? value : "";
}

function setGoogleAnalyticsConsent(consent) {
  if (typeof window.gtag !== "function") return;
  const granted = consent === "accepted";
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
}

function acceptCookies() {
  setCookie(COOKIE_CONSENT_NAME, "accepted", 180);
  setGoogleAnalyticsConsent("accepted");
  render();
  trackPageView();
}

function declineCookies() {
  setCookie(COOKIE_CONSENT_NAME, "declined", 180);
  setGoogleAnalyticsConsent("declined");
  render();
}

function trackPageView() {
  if (getCookieConsent() !== "accepted") return;
  if (typeof window.gtag !== "function") return;
  const route = state.route || "home";
  const pageTitle = pageTitles[route] || "FIN 295 Final Study Studio";
  const basePath = window.location.pathname.replace(/\/$/, "") || "/";
  const pagePath = route === "home" ? basePath : `${basePath}#${route}`;
  window.gtag("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_title: `FIN 295 Final Study Studio | ${pageTitle}`,
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`
  });
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

function formulaLinks(ids, returnKind = null) {
  if (!ids || !ids.length) return "";
  return `<p><strong>Formula link:</strong> ${ids.map(id => {
    const f = formulas.find(x => x.id === id);
    return `<button type="button" class="small-button" onclick="goToFormulaFromQuiz('${id}', '${returnKind || ""}')">${f?.title || id}</button>`;
  }).join(" ")}</p>`;
}

function renderCustomSelect(id, selectedLabel, options) {
  return `
    <details class="custom-select" id="${id}">
      <summary><span>${selectedLabel}</span></summary>
      <div class="custom-select-menu">
        ${options.map(option => `<button type="button" class="${option.selected ? "selected" : ""}" onclick="${option.action}">${option.label}</button>`).join("")}
      </div>
    </details>`;
}

function goToFormulaFromQuiz(id, returnKind) {
  state.formulaReturn = returnKind || null;
  routeTo("formulas", { keepFormulaReturn: true });
  setTimeout(() => openFormulaFor(id), 40);
}

function backToFormulaReturn() {
  const target = state.formulaReturn || "sample";
  state.formulaReturn = null;
  routeTo(target);
}

function formulasByChapter() {
  const query = state.formulaSearch.trim().toLowerCase();
  const grouped = formulas.reduce((acc, formula) => {
    const searchable = [formula.chapter, formula.source, formula.title, formula.plain, formula.variables, formula.when, formula.example, formula.tex].join(" ").toLowerCase();
    if (query && !searchable.includes(query)) return acc;
    if (!acc[formula.chapter]) acc[formula.chapter] = [];
    acc[formula.chapter].push(formula);
    return acc;
  }, {});
  return formulaChapterOrder.filter(ch => grouped[ch]).map(ch => [ch, grouped[ch]]);
}

function setFormulaSearch(value) {
  state.formulaSearch = value || "";
  saveState();
  render();
  setTimeout(() => {
    const input = document.getElementById("formulaSearch");
    if (!input) return;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }, 0);
}

function clearFormulaSearch() {
  state.formulaSearch = "";
  saveState();
  render();
}

function toggleFormulaBookmark(id) {
  if (state.bookmarkedFormulas[id]) delete state.bookmarkedFormulas[id];
  else state.bookmarkedFormulas[id] = true;
  saveState();
  render();
}

function goToBookmarkedFormula(id) {
  routeTo("formulas");
  setTimeout(() => openFormulaFor(id), 40);
}

function toggleFormulaChapter(chapter) {
  const isOpen = !state.formulaOpen[chapter];
  state.formulaOpen[chapter] = isOpen;
  saveState();
  const panelId = `formula-panel-${chapter.replace(/[^A-Za-z0-9]/g, "-")}`;
  const panel = document.getElementById(panelId);
  const section = panel?.closest(".formula-chapter");
  const button = section?.querySelector(".formula-chapter-toggle");
  section?.classList.toggle("open", isOpen);
  panel?.setAttribute("aria-hidden", String(!isOpen));
  button?.setAttribute("aria-expanded", String(isOpen));
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
      <div class="quiz-formula-scroll">
        <iframe class="quiz-formula-pdf" title="FIN 295 Final Formula Sheet" src="${FORMULA_PDF}#toolbar=0&navpanes=0"></iframe>
      </div>
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
    const countOptions = [5, 10, 15, 20, 25, 30, 32].map(n => ({ label: `${n} questions`, value: String(n) }));
    const activeCount = countOptions.find(option => Number(option.value) === state.generatedCount) || countOptions[3];
    return `<section class="panel stack"><h2 class="page-title">Practice Test</h2><p class="muted">Create a fresh exam mirrored from the original sample and midterm sample tests.</p><div class="filter-row"><span class="filter-label">Questions</span>${renderCustomSelect("generatedCountEmpty", activeCount.label, countOptions.map(option => ({ ...option, selected: Number(option.value) === state.generatedCount, action: `setGeneratedCount('${option.value}')` })))}</div><button type="button" class="primary" onclick="startGenerated()">Generate test</button></section>`;
  }
  const q = questions[run.index];
  const weak = !!state.weakQuestions[q.id];
  const attempts = run.attempts[q.id] || 0;
  const solved = run.solved[q.id] === true;
  const wrongPicks = run.wrong[q.id] || [];
  const correctCount = questions.filter(item => run.solved[item.id]).length;
  const firstAnswers = run.first || {};
  const firstTotal = Object.keys(firstAnswers).length;
  const firstCorrect = Object.values(firstAnswers).filter(Boolean).length;
  const firstAccuracyPct = firstTotal ? Math.round(firstCorrect / firstTotal * 100) : 0;
  const firstAccuracyRow = kind === "generated" ? `
    <div class="accuracy-widget" aria-label="First-try accuracy ${firstAccuracyPct}%">
      <div class="accuracy-label">Accuracy</div>
      <div class="accuracy-bar">
        <span class="accuracy-fill" style="width:${firstAccuracyPct}%"></span>
        <span class="accuracy-value">${firstAccuracyPct}%</span>
      </div>
    </div>` : "";
  const formulaOpen = !!state.quizFormulaOpen;
  const sampleFilterOptions = [
    { label: `Full sample final (${sampleQuestions.length} questions)`, value: "" },
    ...["Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11"].map(ch => ({
      label: `${ch} drill (${sampleQuestions.filter(x => x.source.includes(ch)).length})`,
      value: ch
    }))
  ];
  const activeSampleFilter = sampleFilterOptions.find(option => option.value === (state.sampleFilter || "")) || sampleFilterOptions[0];
  const countOptions = [5, 10, 15, 20, 25, 30, 32].map(n => ({
    label: `${n} questions`,
    value: String(n)
  }));
  const activeCount = countOptions.find(option => Number(option.value) === state.generatedCount) || countOptions[3];
  const filterRow = kind === "sample" ? `
    <div class="filter-row">
      <span class="filter-label">Focus</span>
      ${renderCustomSelect("chapterFilter", activeSampleFilter.label, sampleFilterOptions.map(option => ({
        ...option,
        selected: option.value === (state.sampleFilter || ""),
        action: `setSampleFilter('${option.value}')`
      })))}
    </div>` : kind === "generated" ? `
    <div class="filter-row">
      <span class="filter-label">Questions</span>
      ${renderCustomSelect("generatedCount", activeCount.label, countOptions.map(option => ({
        ...option,
        selected: Number(option.value) === state.generatedCount,
        action: `setGeneratedCount('${option.value}')`
      })))}
      <button type="button" class="secondary" onclick="startGenerated()">Generate set</button>
    </div>` : "";
  return `
    <section class="stack">
      ${filterRow}
      <div class="question-meta">
        <span class="badge">${kind === "sample" ? "Original Sample Final" : "Generated Practice"} · Question ${run.index + 1} of ${questions.length}</span>
        <span>Score ${correctCount}/${questions.length} · Attempts on this question ${attempts}</span>
      </div>
      ${firstAccuracyRow}
      <div class="action-row">
        <button type="button" class="secondary" onclick="toggleQuizFormulaSheet()" aria-expanded="${formulaOpen}">${formulaOpen ? "Close Formula Sheet" : "Open Formula Sheet"}</button>
      </div>
      <div class="quiz-workspace ${formulaOpen ? "with-formulas" : ""}">
        <div class="quiz-main">
          <article class="question-panel" aria-labelledby="questionHeading">
            <h2 id="questionHeading" class="visually-hidden">Question ${run.index + 1}</h2>
            <div class="question-meta"><span>${q.source}</span><span>${q.type}</span>${weak ? `<span class="badge">Review Queue</span>` : ""}</div>
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
            ${solved ? `<div class="solution" role="region" aria-label="Worked solution"><h3>Worked Solution</h3>${formulaLinks(q.formulaIds, kind)}<div class="solution-body"><p>${q.solution}</p></div><div class="action-row"><button type="button" class="secondary" onclick="showSimilarQuestions('${kind}')">Show me similar questions</button><button type="button" class="secondary" onclick="toggleWeakQuestion('${q.id}')">${weak ? "Remove from review" : "Bookmark for review"}</button></div><p class="muted">Source tag: ${q.source}</p></div>` : `<p class="muted">Incorrect selections stay marked until you choose the correct answer. The solution unlocks only after the right choice.</p>`}
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
  const run = getRunForKind(kind);
  const q = questions[run.index];
  run.attempts[q.id] = (run.attempts[q.id] || 0) + 1;
  if (!run.first) run.first = {};
  if (!(q.id in run.first)) run.first[q.id] = index === q.answer;
  if (index === q.answer) {
    run.solved[q.id] = true;
    delete run.wrong[q.id];
  } else {
    const prev = run.wrong[q.id] || [];
    if (!prev.includes(index)) run.wrong[q.id] = [...prev, index];
    state.weakQuestions[q.id] = true;
  }
  saveState();
  render();
}

function toggleWeakQuestion(id) {
  if (state.weakQuestions[id]) delete state.weakQuestions[id];
  else state.weakQuestions[id] = true;
  saveState();
  render();
}

function goToReviewQuestion(id) {
  const sampleIndex = sampleQuestions.findIndex(q => q.id === id);
  if (sampleIndex >= 0) {
    state.sampleFilter = null;
    state.sample.index = sampleIndex;
    routeTo("sample");
    return;
  }
  const generatedIndex = state.generated?.findIndex(q => q.id === id) ?? -1;
  if (generatedIndex >= 0) {
    state.generatedRun.index = generatedIndex;
    routeTo("generate");
    return;
  }
  const ac300Q = ac300Questions.find(q => q.id === id);
  if (ac300Q) {
    const chapter = ac300Q.chapter.replace("Chapter ", "");
    state.ac300.chapter = chapter;
    const chapterQs = ac300Questions.filter(q => q.chapter === ac300Q.chapter);
    state.ac300.run.index = chapterQs.findIndex(q => q.id === id);
    routeTo("ac300-review");
  }
}

function showSimilarQuestions(kind) {
  const questions = getQuestionsForKind(kind);
  const run = kind === "sample" ? state.sample : state.generatedRun;
  const current = questions?.[run.index];
  if (!current) return;
  const pool = generateTest();
  let similar = shuffle(pool.filter(q => typeMatchesQuestion(q, current) && q.id !== current.id)).slice(0, 5);
  if (!similar.length) {
    const chapter = questionChapter(current);
    similar = shuffle(pool.filter(q => q.source.includes(chapter))).slice(0, 5);
  }
  if (!similar.length) similar = shuffle(pool).slice(0, 5);
  state.generated = similar;
  state.generatedCount = similar.length;
  state.generatedRun = { index: 0, attempts: {}, solved: {}, wrong: {}, first: {} };
  saveState();
  routeTo("generate");
}

function moveQuestion(kind, delta) {
  const questions = getQuestionsForKind(kind);
  const run = getRunForKind(kind);
  run.index = Math.max(0, Math.min(questions.length - 1, run.index + delta));
  saveState();
  render();
}

function resetQuiz(kind) {
  if (kind === "sample") state.sample = { index: 0, attempts: {}, solved: {}, wrong: {} };
  else if (kind === "ac300") state.ac300.run = { index: 0, attempts: {}, solved: {}, wrong: {}, first: {} };
  else state.generatedRun = { index: 0, attempts: {}, solved: {}, wrong: {}, first: {} };
  saveState();
  render();
}

function setGeneratedCount(value) {
  state.generatedCount = Math.max(5, Math.min(32, Number(value) || 22));
  saveState();
  render();
}

function startGenerated() {
  const pool = generateTest();
  const midtermPool = pool.filter(q => q.source.startsWith("Midterm sample"));
  const finalPool = pool.filter(q => !q.source.startsWith("Midterm sample"));
  const midtermCount = Math.max(1, Math.round(state.generatedCount * 0.2));
  const finalCount = state.generatedCount - midtermCount;
  state.generated = shuffle([
    ...shuffle(finalPool).slice(0, finalCount),
    ...shuffle(midtermPool).slice(0, midtermCount)
  ]);
  state.generatedRun = { index: 0, attempts: {}, solved: {}, wrong: {}, first: {} };
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
    </section>
    ${renderPerformanceDashboard()}`;
}

function performanceRows() {
  const rows = {};
  const add = (question, run) => {
    const key = questionChapter(question);
    if (!rows[key]) rows[key] = { total: 0, solved: 0, attempts: 0 };
    rows[key].total += 1;
    rows[key].solved += run?.solved?.[question.id] ? 1 : 0;
    rows[key].attempts += run?.attempts?.[question.id] || 0;
  };
  sampleQuestions.forEach(q => add(q, state.sample));
  if (state.generated) state.generated.forEach(q => add(q, state.generatedRun));
  return Object.entries(rows).map(([label, row]) => ({ label, ...row }));
}

function typeRows() {
  const rows = {};
  const add = (question, run) => {
    const key = normalizeQuestionType(question.type);
    if (!rows[key]) rows[key] = { total: 0, solved: 0, attempts: 0 };
    rows[key].total += 1;
    rows[key].solved += run?.solved?.[question.id] ? 1 : 0;
    rows[key].attempts += run?.attempts?.[question.id] || 0;
  };
  sampleQuestions.forEach(q => add(q, state.sample));
  if (state.generated) state.generated.forEach(q => add(q, state.generatedRun));
  return Object.entries(rows).sort((a, b) => b[1].attempts - a[1].attempts).slice(0, 8).map(([label, row]) => ({ label, ...row }));
}

function renderPerformanceDashboard() {
  const chapterRows = performanceRows();
  const questionTypeRows = typeRows();
  const renderRows = rows => rows.map(row => {
    const pctDone = row.total ? Math.round(row.solved / row.total * 100) : 0;
    return `<div class="dashboard-row"><span>${row.label}</span><strong>${row.solved}/${row.total}</strong><small>${row.attempts} attempts</small><div class="mini-meter" aria-label="${pctDone}% solved"><span style="width:${pctDone}%"></span></div></div>`;
  }).join("");
  return `
    <section class="panel performance-dashboard" aria-labelledby="performanceHeading">
      <div>
        <p class="eyebrow">Progress</p>
        <h2 id="performanceHeading">Performance Dashboard</h2>
      </div>
      <div class="dashboard-grid">
        <div>
          <h3>By Chapter</h3>
          ${renderRows(chapterRows)}
        </div>
        <div>
          <h3>By Question Type</h3>
          ${renderRows(questionTypeRows)}
        </div>
      </div>
    </section>`;
}

function renderReviewQueue() {
  const weak = Object.keys(state.weakQuestions)
    .map(id => allKnownQuestions().find(q => q.id === id))
    .filter(Boolean);
  const bookmarked = Object.keys(state.bookmarkedFormulas)
    .map(id => formulas.find(f => f.id === id))
    .filter(Boolean);
  const weakList = weak.length ? weak.map(q => `
    <button type="button" class="review-item" onclick="goToReviewQuestion('${q.id}')">
      <span>${questionLabel(q)}</span>
      <small>${questionChapter(q)} - ${normalizeQuestionType(q.type)}</small>
    </button>`).join("") : `<p class="muted">Missed questions and bookmarked solved questions will appear here.</p>`;
  const formulaList = bookmarked.length ? bookmarked.map(f => `
    <button type="button" class="review-item" onclick="goToBookmarkedFormula('${f.id}')">
      <span>${f.title}</span>
      <small>${f.chapter} - ${f.source}</small>
    </button>`).join("") : `<p class="muted">Bookmark formulas from the Formula Sheet to keep them here.</p>`;
  return `
    <section class="panel review-queue" aria-labelledby="reviewHeading">
      <div>
        <p class="eyebrow">Review</p>
        <h2 id="reviewHeading">Weak Spots</h2>
      </div>
      <div class="dashboard-grid">
        <div>
          <h3>Missed Questions</h3>
          <div class="review-list">${weakList}</div>
        </div>
        <div>
          <h3>Bookmarked Formulas</h3>
          <div class="review-list">${formulaList}</div>
        </div>
      </div>
    </section>`;
}

function renderFormulas() {
  const chapters = formulasByChapter();
  const resultCount = chapters.reduce((sum, [, items]) => sum + items.length, 0);
  return `
    <section class="stack">
      <div>
        <h2 class="page-title">Formula Sheet</h2>
        <p class="muted">All formulas from the original formula sheet, grouped by chapter. Click a chapter to open or close its formulas.</p>
      </div>
      <div class="filter-row formula-search-row">
        <label class="filter-label" for="formulaSearch">Search formulas</label>
        <input id="formulaSearch" class="search-input" type="search" value="${escAttr(state.formulaSearch)}" placeholder="Search by keyword, chapter, variable, or formula" oninput="setFormulaSearch(this.value)">
        <span class="muted">${resultCount} matches</span>
        ${state.formulaSearch ? `<button type="button" class="secondary" onclick="clearFormulaSearch()">Clear</button>` : ""}
      </div>
      ${state.formulaReturn ? `<button type="button" class="formula-return-floating" onclick="backToFormulaReturn()">Back to ${state.formulaReturn === "generated" ? "Practice Test" : "Sample Test"}</button>` : ""}
      ${resultCount ? `<div class="formula-chapters">
        ${chapters.map(([chapter, items]) => {
          const isOpen = state.formulaSearch ? true : !!state.formulaOpen[chapter];
          const panelId = `formula-panel-${chapter.replace(/[^A-Za-z0-9]/g, "-")}`;
          return `
            <section class="formula-chapter ${isOpen ? "open" : ""}">
              <button type="button" class="formula-chapter-toggle" aria-expanded="${isOpen}" aria-controls="${panelId}" onclick="toggleFormulaChapter('${chapter}')">
                <span>${chapter}</span>
                <span class="formula-chapter-summary"><span class="badge">${items.length} formulas</span><span class="formula-chevron" aria-hidden="true">⌄</span></span>
              </button>
              <div id="${panelId}" class="formula-chapter-panel" aria-hidden="${!isOpen}">
                <div class="formula-chapter-inner">
                  <div class="grid">
                    ${items.map((f, index) => `
                      <article id="formula-${f.id}" class="formula-card" style="--stagger:${index * 60}ms">
                        <div class="formula-card-top"><span class="badge">${f.source}</span><button type="button" class="small-button" onclick="toggleFormulaBookmark('${f.id}')" aria-pressed="${state.bookmarkedFormulas[f.id] ? "true" : "false"}">${state.bookmarkedFormulas[f.id] ? "Bookmarked" : "Bookmark"}</button></div>
                        <h3>${f.title}</h3>
                        <div class="formula">\\(${f.tex}\\)</div>
                        <p>${formatText(f.plain)}</p>
                        <p><strong>Variables:</strong> ${formatText(f.variables)}</p>
                        <p><strong>When to use:</strong> ${formatText(f.when)}</p>
                        <p><strong>Worked example:</strong> ${formatText(f.example)}</p>
                      </article>`).join("")}
                  </div>
                </div>
              </div>
            </section>`;
        }).join("")}
      </div>` : `<div class="panel"><p>No formulas match that search.</p></div>`}
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
              <span class="select-shell">
                <select id="alarmSound" class="chapter-select" onchange="setAlarmSound(this.value)">
                  ${alarmSounds.map(sound => `<option value="${sound.id}" ${state.timer.alarm === sound.id ? "selected" : ""}>${sound.label}</option>`).join("")}
                </select>
              </span>
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
          <div class="action-row flashcard-controls" style="margin-top:.8rem">
            <button type="button" class="secondary icon-text-button" onclick="previousFlash()"><span aria-hidden="true">&larr;</span><span>Back</span></button>
            <button type="button" class="secondary icon-text-button" onclick="nextFlash()"><span>Next</span><span aria-hidden="true">&rarr;</span></button>
            <button type="button" class="secondary" onclick="shuffleFlashcards()">Shuffle</button>
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
      ${renderReviewQueue()}
      ${renderPerformanceDashboard()}
    </section>`;
}

function renderCitationSection() {
  return `
    <footer class="site-footer" aria-labelledby="citationHeading">
      <div class="citation-section">
        <p id="citationHeading" class="eyebrow">Attribution</p>
        <p>Website content, concepts, formulas, and educational material are based on <cite>Fundamentals of Financial Management, 16th Edition</cite> by Eugene F. Brigham and Joel F. Houston.</p>
        <p>Course materials, PowerPoints, and notes created by Dr. Xiaofeng Wang.</p>
      </div>
    </footer>`;
}

function renderCookieConsent() {
  if (getCookieConsent()) return "";
  return `
    <div class="cookie-consent" role="dialog" aria-live="polite" aria-labelledby="cookieConsentHeading" aria-describedby="cookieConsentCopy">
      <div>
        <h2 id="cookieConsentHeading">This site uses cookies</h2>
        <p id="cookieConsentCopy">I use Google Analytics to understand how visitors use this site. No personal data is sold or shared.</p>
      </div>
      <div class="cookie-actions">
        <button type="button" class="secondary" onclick="declineCookies()">Decline</button>
        <button type="button" class="primary" onclick="acceptCookies()">Accept</button>
      </div>
    </div>`;
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

function startAC300Quiz(chapter) {
  state.ac300.chapter = String(chapter);
  state.ac300.run = { index: 0, attempts: {}, solved: {}, wrong: {}, first: {} };
  saveState();
  render();
}

function backToAC300() {
  state.ac300.chapter = null;
  saveState();
  render();
}

function renderAC300Quiz() {
  const questions = getQuestionsForKind("ac300");
  if (!questions || !questions.length) {
    return `<section class="panel stack"><p class="muted">No questions found for this chapter.</p><button type="button" class="secondary" onclick="backToAC300()">Back to Chapters</button></section>`;
  }
  const run = state.ac300.run;
  const q = questions[run.index];
  const weak = !!state.weakQuestions[q.id];
  const attempts = run.attempts[q.id] || 0;
  const solved = run.solved[q.id] === true;
  const wrongPicks = run.wrong[q.id] || [];
  const correctCount = questions.filter(item => run.solved[item.id]).length;
  const firstAnswers = run.first || {};
  const firstTotal = Object.keys(firstAnswers).length;
  const firstCorrect = Object.values(firstAnswers).filter(Boolean).length;
  const firstAccuracyPct = firstTotal ? Math.round(firstCorrect / firstTotal * 100) : 0;
  const accuracyRow = firstTotal > 0 ? `
    <div class="accuracy-widget" aria-label="First-try accuracy ${firstAccuracyPct}%">
      <div class="accuracy-label">Accuracy</div>
      <div class="accuracy-bar"><span class="accuracy-fill" style="width:${firstAccuracyPct}%"></span><span class="accuracy-value">${firstAccuracyPct}%</span></div>
    </div>` : "";
  return `
    <section class="stack">
      <div class="question-meta">
        <span class="badge">AC 300 ${q.chapter} · Question ${run.index + 1} of ${questions.length}</span>
        <span>Score ${correctCount}/${questions.length} · Attempts on this question ${attempts}</span>
      </div>
      ${accuracyRow}
      <div class="quiz-workspace">
        <div class="quiz-main">
          <article class="question-panel" aria-labelledby="questionHeading">
            <h2 id="questionHeading" class="visually-hidden">Question ${run.index + 1}</h2>
            <div class="question-meta"><span>${q.source}</span><span>${q.type}</span>${weak ? `<span class="badge">Review Queue</span>` : ""}</div>
            <p class="question-text" id="qtext-${q.id}">${q.prompt}</p>
            <div class="choices" role="group" aria-label="Answer choices" aria-labelledby="qtext-${q.id}">
              ${q.choices.map((choice, i) => {
                const letter = String.fromCharCode(97 + i);
                const isCorrect = solved && i === q.answer;
                const isWrong = !solved && wrongPicks.includes(i);
                const cls = ["choice", isCorrect ? "correct" : "", isWrong ? "wrong" : ""].filter(Boolean).join(" ");
                return `<button type="button" class="${cls}" onclick="chooseAnswer('ac300', ${i})" aria-label="Choice ${letter}: ${escAttr(choice)}">${letter}. ${choice}</button>`;
              }).join("")}
            </div>
            ${solved ? `<div class="solution" role="region" aria-label="Explanation"><h3>Explanation</h3><div class="solution-body"><p>${q.solution}</p></div><div class="action-row"><button type="button" class="secondary" onclick="toggleWeakQuestion('${q.id}')">${weak ? "Remove from review" : "Bookmark for review"}</button></div><p class="muted">Source: ${q.source}</p></div>` : `<p class="muted">Incorrect selections stay marked. The explanation unlocks only after the correct choice.</p>`}
          </article>
        </div>
      </div>
      <div class="action-row">
        <button type="button" class="secondary" onclick="moveQuestion('ac300', -1)">Back</button>
        <button type="button" class="primary" onclick="moveQuestion('ac300', 1)">Next</button>
        <button type="button" class="secondary" onclick="resetQuiz('ac300')">Reset test</button>
        <button type="button" class="secondary" onclick="backToAC300()">All chapters</button>
      </div>
    </section>`;
}

function renderAC300Review() {
  if (state.ac300.chapter !== null) return renderAC300Quiz();
  const chapterMeta = [
    { num: "1", topics: "Purpose of accounting, GAAP, conceptual framework, financial statements, elements, auditor, disclosure notes." },
    { num: "2", topics: "Accounting equation, debits/credits, journal entries, accrual basis, adjusting entries, trial balance, closing entries." },
    { num: "3", topics: "Balance sheet purpose, benefits/limitations, asset and liability classification, operating cycle, cash equivalents, disclosure notes." }
  ];
  const cards = chapterMeta.map(ch => {
    const count = ac300Questions.filter(q => q.chapter === "Chapter " + ch.num).length;
    return `
      <div class="panel">
        <p class="eyebrow">AC 300 · Chapter ${ch.num}</p>
        <h3>Chapter ${ch.num}</h3>
        <p class="muted" style="font-size:0.85rem">${ch.topics}</p>
        <div class="action-row" style="margin-top:1.25rem;align-items:center">
          <button type="button" class="primary" onclick="startAC300Quiz('${ch.num}')">Start Test (${count} questions)</button>
        </div>
      </div>`;
  }).join("");
  return `
    <section class="hero" style="grid-template-columns:1fr">
      <div class="panel">
        <p class="eyebrow">Intermediate Accounting I</p>
        <h2>AC 300 — Review Tests</h2>
        <p class="muted">Select a chapter to start a practice test. Each question shows a worked explanation after the correct answer is chosen. Progress is saved automatically.</p>
      </div>
    </section>
    <section class="grid" style="margin-top:1rem">
      ${cards}
    </section>`;
}

function render() {
  const app = document.getElementById("app");
  document.body.classList.toggle("page-transition", animateNextRender);
  const page = {
    home: renderHome,
    sample: () => renderQuiz("sample"),
    generate: () => renderQuiz("generated"),
    formulas: renderFormulas,
    tools: renderTools,
    "ac300-review": renderAC300Review
  }[state.route]();
  app.innerHTML = `${page}${renderContactSection()}${renderCitationSection()}${renderCookieConsent()}`;
  if (state.route === "tools") {
    syncCalc();
    syncTimer();
    syncAlarmPreview();
  }
  renderFloatingTimer();
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise([app]);
  animateNextRender = false;
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
  setGoogleAnalyticsConsent(getCookieConsent());
  syncNavigation();
  syncMobileMenu();
  window.addEventListener("resize", () => renderFloatingTimer());
  render();
  trackPageView();
});
