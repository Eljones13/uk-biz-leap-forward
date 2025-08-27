
import fs from 'fs-extra';
import path from 'path';

const blogPosts = [
  {
    filename: 'hello-world.mdx',
    content: `---
title: "Welcome to BusinessBuilder Pro"
description: "Your comprehensive guide to UK business formation and growth."
date: "2024-01-15"
author: "BusinessBuilder Pro"
category: "Company News"
tags: ["welcome", "business formation", "uk"]
---

# Welcome to BusinessBuilder Pro

Starting a business in the UK has never been easier. Our platform guides you through every step of the process, from initial registration to scaling your company.

## What We Offer

- **Company Formation**: Complete Companies House registration
- **Banking Solutions**: Connect with top UK business banks
- **Credit Building**: Establish and grow your business credit
- **Compliance Management**: Stay on top of your obligations

Ready to get started? [Begin your journey](/wizard) today.
`
  },
  {
    filename: 'register-limited-company.mdx',
    content: `---
title: "How to Register a Limited Company in the UK: Complete Guide 2024"
description: "Step-by-step guide to registering your limited company with Companies House, including costs, requirements, and timelines."
date: "2024-02-01"
author: "BusinessBuilder Pro"
category: "Company Formation"
tags: ["limited company", "companies house", "registration", "uk business"]
---

# How to Register a Limited Company in the UK

Registering a limited company is one of the most popular ways to start a business in the UK. Here's everything you need to know.

## Requirements

Before you start, you'll need:

- A company name that's available
- At least one director (16 or older)
- A registered office address in the UK
- Details of shares and shareholders

## The Registration Process

1. **Choose a company name** - Check availability on Companies House
2. **Prepare your paperwork** - Articles of association and memorandum
3. **Submit your application** - Online through Companies House
4. **Pay the fee** - £12 online or £40 by post

## Timeline

Most applications are processed within 24 hours when submitted online.

[Start your registration](/wizard) with BusinessBuilder Pro today.
`
  },
  {
    filename: 'business-bank-accounts-uk.mdx',
    content: `---
title: "Best UK Business Bank Accounts 2024: Complete Comparison"
description: "Compare the top UK business bank accounts including fees, features, and application requirements for new companies."
date: "2024-02-10"
author: "BusinessBuilder Pro"
category: "Banking"
tags: ["business banking", "bank accounts", "uk banks", "small business"]
---

# Best UK Business Bank Accounts 2024

Choosing the right business bank account is crucial for your company's financial management. Here's our comprehensive comparison.

## Top Providers

### Barclays Business
- Monthly fee: £5-£25
- Free transactions: 100-300 per month
- Best for: Established businesses

### Tide
- Monthly fee: £0-£39
- Free transactions: Unlimited on some plans
- Best for: Digital-first companies

### Starling Bank
- Monthly fee: £2
- Free transactions: Unlimited
- Best for: Small businesses and startups

## What to Consider

- Monthly fees and transaction costs
- Online and mobile banking features
- Integration with accounting software
- Customer support quality

[Compare accounts](/banking) and apply through BusinessBuilder Pro.
`
  },
  {
    filename: 'build-business-credit.mdx',
    content: `---
title: "How to Build Business Credit in the UK: Essential Guide"
description: "Learn how to establish and build your business credit score with UK credit agencies like Experian and Equifax."
date: "2024-02-15"
author: "BusinessBuilder Pro"
category: "Credit & Funding"
tags: ["business credit", "credit score", "funding", "experian", "equifax"]
---

# How to Build Business Credit in the UK

Building business credit is essential for accessing funding and better terms from suppliers. Here's how to do it right.

## Why Business Credit Matters

- Access to business loans and credit cards
- Better payment terms with suppliers
- Separate your personal and business finances
- Build credibility with potential partners

## Steps to Build Credit

1. **Register with Credit Agencies**
   - Experian Business
   - Equifax Business
   - Creditsafe

2. **Establish Credit Accounts**
   - Business credit cards
   - Trade credit with suppliers
   - Business loans

3. **Pay on Time, Every Time**
   - Set up automatic payments
   - Pay early when possible
   - Monitor your credit reports regularly

## Timeline

Building good business credit typically takes 6-12 months of consistent payment history.

[Learn more about credit building](/credit-funding) with BusinessBuilder Pro.
`
  },
  {
    filename: 'articles-of-association-template.mdx',
    content: `---
title: "Articles of Association Template for UK Limited Companies"
description: "Free template and guide for creating Articles of Association for your UK limited company, with standard clauses explained."
date: "2024-02-20"
author: "BusinessBuilder Pro"
category: "Legal Documents"
tags: ["articles of association", "company documents", "legal", "templates"]
---

# Articles of Association Template

Your Articles of Association set out the rules for running your limited company. Here's what you need to know.

## What are Articles of Association?

Articles of Association are legal documents that define:
- How your company is run
- The rights and responsibilities of directors and shareholders
- How decisions are made
- How shares can be transferred

## Standard vs Custom Articles

**Model Articles** (default):
- Provided by Companies House
- Suitable for most small companies
- Free to use

**Custom Articles**:
- Tailored to your specific needs
- Required for complex ownership structures
- May need legal review

## Key Sections

1. **Directors' Powers** - What directors can and cannot do
2. **Shareholders' Rights** - Voting and dividend rights
3. **Share Transfers** - How shares can be bought and sold
4. **Meetings** - How and when meetings are held

[Generate your documents](/documents) with BusinessBuilder Pro's templates.
`
  },
  {
    filename: 'confirmation-statement-guide.mdx',
    content: `---
title: "Confirmation Statement Guide: UK Company Filing Requirements"
description: "Everything you need to know about filing your annual confirmation statement with Companies House, including deadlines and penalties."
date: "2024-02-25"
author: "BusinessBuilder Pro"
category: "Compliance"
tags: ["confirmation statement", "companies house", "annual filing", "compliance"]
---

# Confirmation Statement Guide

Every UK limited company must file an annual confirmation statement with Companies House. Here's your complete guide.

## What is a Confirmation Statement?

The confirmation statement is an annual filing that confirms your company's details are correct, including:
- Company name and address
- Directors and shareholders
- Share capital information
- People with significant control (PSC)

## When to File

- **Deadline**: 14 days after your review date
- **Review Date**: 12 months after incorporation, then annually
- **Cost**: £13 online, £40 by post

## What Information is Required

1. **Company Details**
   - Registered office address
   - Business address (if different)
   - Company name

2. **People Information**
   - Directors' details
   - Shareholders' information
   - People with significant control

3. **Share Capital**
   - Number and value of shares
   - Share classes

## Penalties for Late Filing

- **Late fee**: £150-£750 depending on how late
- **Court action**: Possible if very late
- **Company strike-off**: Ultimate penalty

[Stay compliant](/compliance) with BusinessBuilder Pro's automated reminders.
`
  }
];

const learnTutorials = [
  {
    category: 'company-formation',
    filename: 'register-company.mdx',
    content: `---
title: "Register Your Company: Step-by-Step Tutorial"
description: "Complete walkthrough of registering a UK limited company, from name checks to receiving your certificate."
date: "2024-01-20"
lastUpdated: "2024-02-28"
author: "BusinessBuilder Pro"
tags: ["registration", "companies house", "tutorial", "step-by-step"]
---

# Register Your Company: Complete Tutorial

This tutorial will walk you through every step of registering your UK limited company.

## Before You Start

Gather these items:
- ✅ Chosen company name (have 3 options ready)
- ✅ Registered office address
- ✅ Director details (name, address, date of birth)
- ✅ Shareholder information
- ✅ Share capital amount

## Step 1: Check Company Name Availability

1. Visit the Companies House website
2. Use the company name checker
3. Ensure your name isn't too similar to existing companies
4. Avoid restricted words without proper authorization

## Step 2: Prepare Your Application

### Required Information:
- **Company Name**: Your chosen name
- **Registered Office**: UK address for official correspondence
- **Directors**: At least one director aged 16+
- **Shareholders**: Who owns the company shares
- **Share Capital**: Nominal value (can be £1)

## Step 3: Submit Online Application

1. Go to Companies House WebFiling service
2. Complete the registration form (IN01)
3. Pay the £12 fee
4. Submit your application

## Step 4: Receive Your Documents

Within 24 hours you'll receive:
- Certificate of Incorporation
- Company number
- Authentication code

## Next Steps

After registration:
1. Set up business bank account
2. Register for taxes (Corporation Tax, VAT if needed)
3. Get business insurance
4. Set up accounting system

> **Pro Tip**: BusinessBuilder Pro automates this entire process and handles post-registration setup too.

[Start Your Registration](/wizard) with guided assistance.
`
  },
  {
    category: 'banking',
    filename: 'open-business-account.mdx',
    content: `---
title: "How to Open a UK Business Bank Account"
description: "Step-by-step guide to opening a business bank account for your UK company, including required documents and comparison tips."
date: "2024-01-25"
lastUpdated: "2024-02-28"
author: "BusinessBuilder Pro"
tags: ["business banking", "bank account", "documents", "requirements"]
---

# How to Open a UK Business Bank Account

Opening a business bank account is essential for your UK company. Here's how to do it efficiently.

## Required Documents

### Company Documents:
- ✅ Certificate of Incorporation
- ✅ Articles of Association
- ✅ Confirmation Statement (if company is over 1 year old)

### Director/Signatory Documents:
- ✅ Passport or driving license
- ✅ Proof of address (utility bill, bank statement)
- ✅ Proof of business address

### Additional Requirements:
- ✅ Business plan (for some banks)
- ✅ Proof of income/funding source
- ✅ Expected monthly turnover

## Step-by-Step Process

### Step 1: Choose Your Bank
Compare features:
- Monthly fees
- Transaction limits
- Online banking features
- Integration with accounting software
- Customer support

### Step 2: Prepare Your Application
- Complete the application form
- Gather all required documents
- Prepare answers about your business

### Step 3: Submit Application
- Online application (fastest)
- Branch visit (if required)
- Phone application (some banks)

### Step 4: Account Verification
- Identity verification
- Document checks
- Credit checks
- Business verification

## Timeline Expectations

- **Challenger banks**: 1-3 days
- **Traditional banks**: 7-14 days
- **Complex applications**: Up to 4 weeks

## Common Reasons for Rejection

- Incomplete documentation
- Poor personal credit history
- High-risk business sector
- Insufficient business planning

## Tips for Success

1. **Complete Documentation**: Have everything ready before applying
2. **Professional Presentation**: Present your business professionally
3. **Multiple Applications**: Apply to several banks simultaneously
4. **Be Honest**: Provide accurate information

[Compare Business Banks](/banking) and get personalized recommendations.
`
  },
  {
    category: 'credit-funding',
    filename: 'build-credit.mdx',
    content: `---
title: "Building Business Credit: Complete Roadmap"
description: "Comprehensive guide to establishing and building your UK business credit profile with step-by-step actions."
date: "2024-01-30"
lastUpdated: "2024-02-28"
author: "BusinessBuilder Pro"
tags: ["business credit", "funding", "credit agencies", "credit building"]
---

# Building Business Credit: Your Complete Roadmap

Build a strong business credit profile to access better funding options and terms.

## Understanding UK Business Credit

### Credit Agencies:
- **Experian Business**: Largest UK credit agency
- **Equifax Business**: Comprehensive business reports  
- **Creditsafe**: European coverage
- **Dun & Bradstreet**: Global database

### Credit Scores Range:
- **0-25**: Very Poor
- **26-50**: Poor  
- **51-75**: Fair
- **76-90**: Good
- **91-100**: Excellent

## Phase 1: Foundation (Months 1-2)

### Register with Credit Agencies
1. **Experian Business**:
   - Create business profile
   - Verify company details
   - Add contact information

2. **Equifax Business**:
   - Submit company registration
   - Provide financial information
   - Set up monitoring

3. **Creditsafe**:
   - Register company profile
   - Add business details
   - Verify information

### Establish Business Banking
- Open business current account
- Set up business savings account
- Use accounts regularly for business transactions

## Phase 2: Building (Months 3-6)

### Obtain Trade Credit
1. **Office Suppliers**: Staples, Viking, etc.
2. **Telecoms**: BT Business, Virgin Business
3. **Utilities**: British Gas Business, EDF Business
4. **Fuel Cards**: Shell Business, BP Business

### Business Credit Cards
Start with:
- **Starter cards**: Capital One, Aqua Business
- **Cashback cards**: American Express Business
- **Rewards cards**: Barclaycard Business

### Key Rules:
- ✅ Pay before due date
- ✅ Keep utilization under 30%
- ✅ Use cards regularly
- ✅ Pay in full each month

## Phase 3: Growth (Months 6-12)

### Expand Credit Facilities
- Business overdraft facility
- Asset finance agreements
- Invoice financing
- Business loans

### Monitor and Optimize
- Check credit reports monthly
- Dispute any errors immediately
- Monitor for fraud
- Track score improvements

## Phase 4: Maintenance (Ongoing)

### Best Practices:
1. **Payment History** (35% of score):
   - Never miss payments
   - Pay early when possible
   - Set up automatic payments

2. **Credit Utilization** (30% of score):
   - Keep below 30% of limits
   - Don't max out cards
   - Increase limits annually

3. **Credit Age** (15% of score):
   - Keep oldest accounts open
   - Build long-term relationships
   - Don't close accounts unnecessarily

4. **Credit Mix** (10% of score):
   - Mix of cards, loans, trade credit
   - Show you can manage different types
   - Don't take on too much variety

5. **New Credit** (10% of score):
   - Limit new applications
   - Space out credit applications
   - Only apply when necessary

## Common Mistakes to Avoid

❌ **Mixing Personal and Business Finances**
❌ **Missing Payment Deadlines**
❌ **Maxing Out Credit Cards**
❌ **Not Monitoring Credit Reports**
❌ **Closing Old Credit Accounts**

## Timeline Expectations

- **Month 1-3**: Establish foundation
- **Month 3-6**: First credit score appears
- **Month 6-12**: Score stabilization
- **Month 12+**: Access to better terms

[Track Your Progress](/credit-funding) with BusinessBuilder Pro's credit monitoring.
`
  },
  {
    category: 'legal-compliance',
    filename: 'confirmation-statement-steps.mdx',
    content: `---
title: "Filing Your Confirmation Statement: Step by Step"
description: "Detailed tutorial on completing and submitting your annual confirmation statement to Companies House."
date: "2024-02-05"
lastUpdated: "2024-02-28"
author: "BusinessBuilder Pro"
tags: ["confirmation statement", "annual filing", "companies house", "compliance"]
---

# Filing Your Confirmation Statement: Complete Tutorial

Learn how to complete and file your confirmation statement accurately and on time.

## What is a Confirmation Statement?

The confirmation statement replaces the annual return and must be filed every 12 months. It confirms your company's details are up to date.

## Before You Start

### Information You'll Need:
- ✅ Company authentication code
- ✅ Current company details
- ✅ Director information
- ✅ Shareholder details
- ✅ People with significant control (PSC) information
- ✅ Share capital details

### Key Dates:
- **Made-up Date**: Your review date (usually incorporation anniversary)
- **Filing Deadline**: 14 days after made-up date
- **Cost**: £13 online, £40 by post

## Step-by-Step Filing Process

### Step 1: Access Companies House WebFiling

1. Go to Companies House website
2. Click "File company information"
3. Select "Confirmation statement"
4. Enter company number and authentication code

### Step 2: Review Company Details

**Company Information**:
- ✅ Company name
- ✅ Registered office address
- ✅ Business address (if different)
- ✅ Company type
- ✅ Company status

**Service Address**: Where documents are sent if different from registered office.

### Step 3: Update Director Information

For each director, confirm:
- ✅ Full name
- ✅ Service address
- ✅ Country of residence
- ✅ Nationality
- ✅ Business occupation
- ✅ Date of birth

**New Directors**: Add any new appointments since last filing.
**Resigned Directors**: Confirm any resignations.

### Step 4: Update Shareholder Information

**Individual Shareholders**:
- ✅ Full name
- ✅ Service address
- ✅ Number of shares held
- ✅ Share class

**Corporate Shareholders**:
- ✅ Company name
- ✅ Registered office
- ✅ Company number (if UK company)
- ✅ Number of shares held

### Step 5: People with Significant Control (PSC)

Identify anyone who:
- Owns more than 25% of shares
- Has more than 25% of voting rights
- Has right to appoint/remove majority of directors
- Has significant influence or control

**Required Information**:
- ✅ Full name
- ✅ Service address
- ✅ Date of birth
- ✅ Nationality
- ✅ Nature of control

### Step 6: Share Capital Information

**Share Details**:
- ✅ Total number of shares
- ✅ Aggregate nominal value
- ✅ Currency
- ✅ Share classes and rights

**Changes**: Report any share issues, transfers, or redemptions.

### Step 7: Review and Submit

1. **Review All Information**: Check everything is accurate
2. **Make Changes**: Update any incorrect details
3. **Pay Filing Fee**: £13 online payment
4. **Submit**: File your confirmation statement

## After Filing

### What Happens Next:
- **Immediate Confirmation**: Electronic receipt
- **Processing**: Usually instant for online filings
- **Public Record**: Information becomes publicly available
- **Next Due Date**: 12 months from made-up date

### Keep Records:
- Filing receipt
- Copy of submitted information
- Note next filing deadline

## Common Mistakes to Avoid

❌ **Filing Late**: Penalties start immediately after deadline
❌ **Incorrect PSC Information**: Must be accurate and complete
❌ **Wrong Share Details**: Check calculations carefully
❌ **Missing Director Changes**: Report all appointments/resignations
❌ **Incomplete Addresses**: All addresses must be complete UK addresses

## Penalties for Late Filing

- **Up to 1 month late**: £150
- **1-3 months late**: £375
- **3-6 months late**: £750
- **Over 6 months late**: £750 + potential prosecution

## Getting Help

**If You're Stuck**:
- Companies House helpline: 0303 1234 500
- Professional advisor
- BusinessBuilder Pro compliance support

[Set Up Automated Reminders](/compliance) to never miss a deadline again.
`
  },
  {
    category: 'general-support',
    filename: 'welcome.mdx',
    content: `---
title: "Welcome to BusinessBuilder Pro Learning Hub"
description: "Get started with our comprehensive guides and tutorials for UK business formation and growth."
date: "2024-01-10"
lastUpdated: "2024-02-28"
author: "BusinessBuilder Pro"
tags: ["welcome", "getting started", "overview", "introduction"]
---

# Welcome to the BusinessBuilder Pro Learning Hub

Your comprehensive resource for UK business formation, compliance, and growth strategies.

## What You'll Find Here

### 🏢 Company Formation
Learn everything about setting up your UK limited company:
- Step-by-step registration guides
- Choosing the right company structure
- Understanding legal requirements
- Post-registration essentials

### 🏦 Banking & Finance
Master business banking and financial management:
- Opening business bank accounts
- Comparing banking providers
- Understanding business finance options
- Managing cash flow effectively

### 💳 Credit & Funding
Build credit and access funding:
- Building business credit from scratch
- Understanding UK credit agencies
- Accessing loans and funding
- Managing credit relationships

### ⚖️ Legal & Compliance
Stay compliant with UK regulations:
- Annual filing requirements
- Understanding company law
- Director duties and responsibilities
- Document management

### 🎯 General Support
Get help with common questions:
- Troubleshooting guides
- Best practices
- Industry insights
- Platform tutorials

## How to Use This Hub

### 📚 **Browse by Category**
Use the tabs above to find tutorials in your area of interest.

### 🔍 **Search Content**
Use the search bar to find specific topics quickly.

### 🏷️ **Filter by Tags**
Click on tags to find related content across categories.

### 📱 **Mobile Friendly**
All tutorials are optimized for reading on any device.

## Learning Path Recommendations

### 🚀 **New Business Owners**
1. Start with Company Formation basics
2. Learn about banking requirements
3. Understand compliance obligations
4. Explore credit building strategies

### 💼 **Existing Business Owners**
1. Review compliance requirements
2. Optimize banking arrangements
3. Build business credit profile
4. Explore growth funding options

### 🎯 **Specific Goals**
- **Need funding?** Focus on Credit & Funding section
- **Compliance concerns?** Check Legal & Compliance
- **Banking issues?** Review Banking & Finance

## Getting Started

1. **Choose Your Path**: Select the category most relevant to your current needs
2. **Start with Basics**: Begin with introductory tutorials
3. **Progress Systematically**: Follow our recommended sequences
4. **Apply Learning**: Implement what you learn step by step
5. **Get Support**: Use our platform tools to put knowledge into practice

## Need Hands-On Help?

While these tutorials provide comprehensive guidance, BusinessBuilder Pro offers:

- **Automated Workflows**: Let our platform handle the complex processes
- **Document Generation**: Generate required legal documents
- **Compliance Monitoring**: Automated reminders and tracking
- **Expert Support**: Get help when you need it

[Start Your Business Journey](/wizard) with guided assistance.

## Stay Updated

Our learning hub is constantly updated with:
- New tutorials and guides
- Latest regulatory changes
- Industry best practices
- User-requested content

Bookmark this page and check back regularly for new content!

---

**Need immediate help?** [Contact our support team](/contact) or [start your business setup](/wizard) with guided assistance.
`
  }
];

async function seedContent() {
  console.log('🌱 Seeding content if needed...');
  
  let seededCount = 0;
  
  // Check and seed blog posts
  const blogDir = 'src/content/blog';
  await fs.ensureDir(blogDir);
  
  const existingBlogFiles = await fs.readdir(blogDir).catch(() => []);
  const blogCount = existingBlogFiles.filter(file => file.endsWith('.mdx')).length;
  
  if (blogCount < 6) {
    console.log(`Found ${blogCount} blog posts, seeding to 6...`);
    
    for (const post of blogPosts) {
      const filePath = path.join(blogDir, post.filename);
      if (!(await fs.pathExists(filePath))) {
        await fs.writeFile(filePath, post.content);
        console.log(`✅ Created ${post.filename}`);
        seededCount++;
      }
    }
  }
  
  // Check and seed learn tutorials
  for (const tutorial of learnTutorials) {
    const tutorialDir = `src/content/learn/${tutorial.category}`;
    await fs.ensureDir(tutorialDir);
    
    const filePath = path.join(tutorialDir, tutorial.filename);
    if (!(await fs.pathExists(filePath))) {
      await fs.writeFile(filePath, tutorial.content);
      console.log(`✅ Created ${tutorial.category}/${tutorial.filename}`);
      seededCount++;
    }
  }
  
  console.log(`🌱 Seeded ${seededCount} content files`);
  return seededCount;
}

seedContent().catch(console.error);
